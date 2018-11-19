/**
* Created by nghinv on Mon Nov 12 2018
* Copyright (c) 2018 nghinv@luci.vn
*/

import { createSelector } from 'reselect';

const allCategorySelector = state => state.service.allCategory;
const allServiceSelector = state => state.service.allService;
const serviceRequestSelector = state => state.providerSevice.serviceRequest.data;
const categorySelector = (state, props) => props.category;
const propsSelect = (state, props) => props;

export const listCategorySelector = createSelector(
  allCategorySelector,
  (category) => {
    return category.data.sort((a, b) => (a.id - b.id))
  }
)

export const listServiceSelector = createSelector(
  allServiceSelector,
  (service) => {
    return service.data.sort((a, b) => (a.id - b.id))
  }
)

export const listServiceWithCategory = createSelector(
  listServiceSelector,
  categorySelector,
  (services, category) => {
    return services.filter(service => service.services_category_id == category.id)
  }
)

export const getServiceRequestFromServiceId = createSelector(
  serviceRequestSelector,
  propsSelect,
  (serviceRequest, props) => {
    return serviceRequest.find(service => service.id == props.job.id)
  }
)
