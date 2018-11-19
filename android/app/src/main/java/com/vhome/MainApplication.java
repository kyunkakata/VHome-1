package com.vhome;

import android.app.Application;

import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactApplication;
import ui.bottomactionsheet.RNBottomActionSheetPackage;
import com.microsoft.codepush.react.CodePush;
import com.remobile.toast.RCTToastPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;
import co.twinger.location.RNAndroidLocationServicePackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.wix.interactable.Interactable;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativevietnam.RNNetworkStatePackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
    return CodePush.getJSBundleFile();
    }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MapsPackage(),
          new MainReactPackage(),
            new RNBottomActionSheetPackage(),
          new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
          new RCTToastPackage(),
          new FastImageViewPackage(),
          new RNGeocoderPackage(),
          new RNAndroidLocationServicePackage(),
          new RNAccountKitPackage(),
          new Interactable(),
          new AutoGrowTextInputPackage(),
          new PickerViewPackage(),
          new PickerPackage(),
          new ImageResizerPackage(),
          new RNFetchBlobPackage(),
          new LinearGradientPackage(),
          new RCTSplashScreenPackage(),
          new VectorIconsPackage(),
          new RNNetworkStatePackage(),
          new ReactMaterialKitPackage(),
          new ReactNativeLocalizationPackage(),
          new RNDeviceInfo()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
