/**
* Created by nghinv on Fri Nov 09 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

export const BASE_URL = {
  customer: 'http://customer.vhome.102vn.com',
  provider: 'http://provider.vhome.102vn.com'
}
export const API_KEY = '98CPB8ITIRGHVO3OJ5QT';
export const URL_API = {
  customer: {
    register: '/auth/register',
    login: '/auth/login',
    login_with_facebook: '/auth/login-facebook',
    update_user_infor: '/customer/update',
    user_detail: '/customer/detail',
    create_service_request: '/service-request/create',
    update_service_request: '/service-request/update',
    detail_service_request: '/service-request/detail',
    search_service_request: '/service-request/search',
    delete_service_request: '/service-request/delete',
    detail_coin: '/coin/detail-of-customer',
    notification_search: '/notify/search',
    get_all_provider: '/provider/search'
  },
  provider: {
    register: '/auth/register',
    login: '/auth/login',
    login_with_facebook: '/auth/login-facebook',
    update_user_infor: '/provider/update',
    user_detail: '/provider/detail',
    user_map_service: '/provider/map-service',
    create_catagory: '/service/create-category',
    update_catagory: '/service/update-category',
    detail_catagory: '/service/detail-category',
    search_catagory: '/service/search-category',
    delete_catagory: '/service/delete-category',
    create_service: '/service/create',
    update_service: '/service/update',
    detail_service: '/service/detail',
    search_service: '/service/search',
    delete_service: '/service/delete',
    service_request_search: '/service-request/search',
    service_rating_of_provider: '/service-rating/of-provider',
    service_request_receive: '/service-request/receive',
    service_request_reject: '/service-request/reject',
    detail_coin: '/coin/detail-of-provider',
    notification_search: '/notify/search'
  }
}
