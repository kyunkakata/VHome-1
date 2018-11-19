'use strict';

const _ = require('lodash');
const React = require('react');
const ReactNative = require('react-native');

const PropTypes = require('prop-types');

const ImageCacheManagerOptionsPropTypes = require('./ImageCacheManagerOptionsPropTypes');

const flattenStyle = ReactNative.StyleSheet.flatten;
const Image = ReactNative.Image;
const Dimensions = ReactNative.Dimensions;

const ImageCacheManager = require('./ImageCacheManager');
const fsUtils = require('./utils/fsUtils');
import ImageResizer from 'react-native-image-resizer';
const SCREEN = Dimensions.get('window');

const {
    View,
    ImageBackground,
    ActivityIndicator,
    NetInfo,
    Platform,
    StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
    image: {
        backgroundColor: 'transparent'
    },
    loader: {
        backgroundColor: 'transparent',
    },
    loaderPlaceholder: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

function getImageProps(props) {
    return _.omit(props, ['source', 'defaultSource', 'fallbackSource', 'LoadingIndicator', 'activityIndicatorProps', 'style', 'useQueryParamsInCacheKey', 'renderImage', 'resolveHeaders']);
}

const CACHED_IMAGE_REF = 'cachedImage';

class CachedImage extends React.Component {

    static propTypes = {
        renderImage: PropTypes.func.isRequired,
        autoResize: PropTypes.bool,
        activityIndicatorProps: PropTypes.object.isRequired,

        // ImageCacheManager options
        ...ImageCacheManagerOptionsPropTypes,
    };

    static defaultProps = {
        renderImage: props => (<ImageBackground imageStyle={props.style} ref={CACHED_IMAGE_REF} {...props} />),
        autoResize: true,
        activityIndicatorProps: {},
    };

    static contextTypes = {
        getImageCacheManager: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            isCacheable: true,
            cachedImagePath: null,
            networkAvailable: true,
            resized: false
        };

        this.getImageCacheManagerOptions = this.getImageCacheManagerOptions.bind(this);
        this.getImageCacheManager = this.getImageCacheManager.bind(this);
        this.safeSetState = this.safeSetState.bind(this);
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
        this.processSource = this.processSource.bind(this);
        this.renderLoader = this.renderLoader.bind(this);
        this.saveUrl = null;
    }

    componentWillMount() {
        this._isMounted = true;
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        // initial
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                this.safeSetState({
                    networkAvailable: isConnected
                });
            });
    }

    componentWillUnmount() {
        if (this.state.resized && this.state.cachedImagePath) {
            fsUtils.deleteFile(this.state.cachedImagePath)
        }

        this._isMounted = false;
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.source, nextProps.source)) {
            this.processSource(nextProps.source);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.cachedImagePath !== nextState.cachedImagePath) {
            return true
        }

        if (this.state.isCacheable !== nextState.isCacheable) {
            return true
        }

        if (this.props.source !== nextProps.source) {
            return true
        }

        return false
    }

    setNativeProps(nativeProps) {
        try {
            this.refs[CACHED_IMAGE_REF].setNativeProps(nativeProps);
        } catch (e) {
            console.error(e);
        }
    }

    getImageCacheManagerOptions() {
        return _.pick(this.props, _.keys(ImageCacheManagerOptionsPropTypes));
    }

    getImageCacheManager() {
        // try to get ImageCacheManager from context
        if (this.context && this.context.getImageCacheManager) {
            return this.context.getImageCacheManager();
        }
        // create a new one if context is not available
        const options = this.getImageCacheManagerOptions();
        return ImageCacheManager(options);
    }

    safeSetState(newState) {
        if (!this._isMounted) {
            return;
        }
        return this.setState(newState);
    }

    handleConnectivityChange(isConnected) {
        this.safeSetState({
            networkAvailable: isConnected
        });
    }

    processSource(source) {
        const url = _.get(source, ['uri'], null);
        const options = this.getImageCacheManagerOptions();
        const imageCacheManager = this.getImageCacheManager();

        imageCacheManager.downloadAndCacheUrl(url, options)
            .then(cachedImagePath => {
                if (this.props.autoResize) {
                    let sourceImage = 'file://' + cachedImagePath
                    let imageUri = sourceImage
                    let newWidth = 0
                    let newHeight = 0
                    let compressFormat = 'JPEG'
                    let quality = 100
                    let rotation = 0
                    let outputPath = undefined

                    Image.getSize(url, (width, height) => {
                        if (width <= this.width * 3 || height <= this.height * 3) {
                            this.safeSetState({
                                cachedImagePath,
                                resized: false
                            });
                            return
                        } else {
                            newWidth = this.width * 3
                            newHeight = this.height * 3
                        }

                        if (newWidth === 0 && newHeight !== 0) {
                            newWidth = newHeight
                        } else if (newWidth !== 0 && newHeight === 0) {
                            newHeight = newWidth
                        } else if (newWidth === 0 && newHeight === 0) {
                            newWidth = SCREEN.width
                            newHeight = (width !== 0 && height !== 0) ? newWidth * height / width : SCREEN.height
                        }

                        let saveUrl = `${url}_${newWidth}_${newHeight}`

                        if (newWidth > SCREEN.width) {
                            saveUrl = `${url}_lagre_size`
                        }

                        if (this.saveUrl !== saveUrl) {
                            this.saveUrl = saveUrl
                        } else {
                            return
                        }

                        imageCacheManager.getImageResize(saveUrl, options)
                            .then(res => {
                                this.safeSetState({
                                    cachedImagePath: res
                                });
                                return
                            })
                            .catch(err => {
                                ImageResizer.createResizedImage(imageUri, newWidth, newHeight, compressFormat, quality, rotation, outputPath).then((response) => {
                                    // response.uri is the URI of the new image that can now be displayed, uploaded...
                                    // response.path is the path of the new image
                                    // response.name is the name of the new image with the extension
                                    // response.size is the size of the new image
                                    // console.log('ImageResizer', response, imageUri)
                                    let seedPath = response.path
                                    imageCacheManager.seedAndCacheUrl(saveUrl, seedPath, options)
                                        .then(res => {
                                            // console.log('seedAndCacheUrl', res)
                                        })
                                        .catch(err => {
                                            console.log('error copy file', err)
                                        })
                                    this.safeSetState({
                                        cachedImagePath: response.path,
                                        resized: true
                                    });
                                }).catch((err) => {
                                    console.log('catch', err)
                                });
                            });
                    });

                } else {
                    this.safeSetState({
                        cachedImagePath,
                        resized: false
                    });
                }
            })
            .catch(err => {
                console.log('errror', err);
                this.safeSetState({
                    cachedImagePath: null,
                    isCacheable: false
                });
            });
    }

    _onLayout = ({ width, height }) => {
        if (this.width && this.height) {
            if ((Math.abs(this.width - width) <= 2) && (Math.abs(this.height - height) <= 2)) {
                return
            }
        }

        this.width = width
        this.height = height

        this.processSource(this.props.source);
    }

    render() {
        if (this.state.isCacheable && !this.state.cachedImagePath) {
            return (
                <View
                    onLayout={(event) => this._onLayout({ width: Math.round(event.nativeEvent.layout.width), height: Math.round(event.nativeEvent.layout.height) })}
                    style={{ flex: 1, width: undefined, height: undefined }}
                >
                    {this.renderLoader()}
                </View>
            )
        }

        const props = getImageProps(this.props);
        const style = this.props.style || styles.image;
        const source = (this.state.isCacheable && this.state.cachedImagePath) ? {
            uri: 'file://' + this.state.cachedImagePath
        } : this.props.source;

        if (this.props.fallbackSource && !this.state.cachedImagePath) {
            return this.props.renderImage({
                ...props,
                key: `${props.key || source.uri}error`,
                style,
                source: this.props.fallbackSource
            })
        }
        return this.props.renderImage({
            ...props,
            key: props.key || source.uri,
            style,
            source
        })
    }

    renderLoader() {
        const imageProps = getImageProps(this.props);
        const imageStyle = [this.props.style, styles.loaderPlaceholder];

        const activityIndicatorProps = _.omit(this.props.activityIndicatorProps, ['style']);
        const activityIndicatorStyle = this.props.activityIndicatorProps.style || styles.loader;

        const LoadingIndicator = this.props.loadingIndicator;

        const source = this.props.defaultSource;

        // if the imageStyle has borderRadius it will break the loading image view on android
        // so we only show the ActivityIndicator
        if (!source || (Platform.OS === 'android' && flattenStyle(imageStyle).borderRadius)) {
            if (LoadingIndicator) {
                return (
                    <View style={[imageStyle, activityIndicatorStyle]}>
                        <LoadingIndicator {...activityIndicatorProps} />
                    </View>
                );
            }
            return (
                <ActivityIndicator
                    {...activityIndicatorProps}
                    style={[imageStyle, activityIndicatorStyle]} />
            );
        }
        // otherwise render an image with the defaultSource with the ActivityIndicator on top of it
        return this.props.renderImage({
            ...imageProps,
            style: imageStyle,
            key: source.uri,
            source,
            children: (
                LoadingIndicator
                    ? <View style={[imageStyle, activityIndicatorStyle]}>
                        <LoadingIndicator {...activityIndicatorProps} />
                    </View>
                    : <ActivityIndicator
                        {...activityIndicatorProps}
                        style={activityIndicatorStyle} />
            )
        });
    }

}

module.exports = CachedImage;
