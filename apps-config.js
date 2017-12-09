(function (window, angular, undefined) {
    'use strict';
    var app = angular.module('apps.config', ['ng'])
    .config(['$stateProvider', '$urlRouterProvider', 
                        function ($stateProvider, $urlRouterProvider) {
                            $urlRouterProvider
	      .otherwise('/landing');
                            $stateProvider
                                .state('landing', {
                                    url: '/landing',
                                    templateUrl: '/Apps/landing',
                                    controller: 'ctrlLanding as ctrl',
                                    data: {
                                        pageTitle: 'BI',
                                        modulename: 'Home'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'Home'
                                    }
                                })
                                .state('store', {
                                    url: '/store',
                                    templateUrl: '/Apps/store',
                                    controller: 'ctrlStore as ctrl',
                                    data: {
                                        pageTitle: 'BI',
                                        modulename: 'Store'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'Store'
                                    }
                                })
                                .state('forecast', {
                                    url: '/forecast',
                                    templateUrl: '/Apps/forecast',
                                    controller: 'ctrlForecast as ctrl',
                                    data: {
                                        pageTitle: 'BI',
                                        modulename: 'Forecast'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'Forecast'
                                    }
                                })
                                .state('footfall', {
                                    url: '/footfall',
                                    templateUrl: '/Apps/footfall',
                                    controller: 'ctrlFootfall as ctrl',
                                    data: {
                                        pageTitle: 'BI',
                                        modulename: 'Footfall'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'Footfall'
                                    }
                                })
                                 .state('target', {
                                      url: '/target',
                                      templateUrl: '/Apps/target',
                                      controller: 'ctrlTarget as ctrl',
                                      data: {
                                          pageTitle: 'BI',
                                          modulename: 'Target'
                                      },
                                      ncyBreadcrumb: {
                                          label: 'Target'
                                      }
                                 })
                                .state('plan', {
                                    url: '/plan',
                                    templateUrl: '/Apps/plan',
                                    controller: 'ctrlPlan as ctrl',
                                    data: {
                                        pageTitle: 'BI',
                                        modulename: 'Plan'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'Plan'
                                    }
                                })
                                 .state('priceband', {
                                     url: '/priceband',
                                     templateUrl: '/Apps/priceband',
                                     controller: 'ctrlPriceBand as ctrl',
                                     data: {
                                         pageTitle: 'BI',
                                         modulename: 'PriceBand'
                                     },
                                     ncyBreadcrumb: {
                                         label: 'PriceBand'
                                     }
                                 })
                                 .state('stockageband', {
                                     url: '/stockageband',
                                     templateUrl: '/Apps/stockageband',
                                     controller: 'ctrlStockAgeBand as ctrl',
                                     data: {
                                         pageTitle: 'BI',
                                         modulename: 'StockAge Band'
                                     },
                                     ncyBreadcrumb: {
                                         label: 'StockAge Band'
                                     }
                                 })
                                .state('usermenu', {
                                    url: '/usermenu',
                                    templateUrl: '/Apps/usermenu',
                                    controller: 'ctrlUserMenu as ctrl',
                                    data: {
                                        pageTitle: 'BI',
                                        modulename: 'UserMenu'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'UserMenu'
                                    }
                                })
                                .state('user', {
                                    url: '/user',
                                    templateUrl: '/Apps/user',
                                    controller: 'ctrlUser as ctrl',
                                    data: {
                                        pageTitle: 'BI',
                                        modulename: 'User'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'User'
                                    }
                                })
                                .state('settings', {
                                    url: '/settings',
                                    templateUrl: '/Apps/settings',
                                    controller: 'ctrlSettings as ctrl',
                                    data: {
                                        pageTitle: 'Bi',
                                        modulename: 'Change Password'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'Change Password'
                                    }
                                })
                                .state('storemerchant', {
                                    url: '/storemerchant',
                                    templateUrl: '/Apps/storemerchant',
                                    controller: 'ctrlStoreMerchant as ctrl',
                                    data: {
                                        pageTitle: 'BI',
                                        modulename: 'Store Merchant'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'Store Merchant'
                                    }
                                })
                               .state('storemerch', {
                                   url: '/storemerch',
                                   templateUrl: '/Apps/storemerch',
                                   controller: 'ctrlStoreMerch as ctrl',
                                   data: {
                                       pageTitle: 'BI',
                                       modulename: 'Store Merch'
                                   },
                                   ncyBreadcrumb: {
                                       label: 'Store Merch'
                                   }
                               })
                        }]);
})(window, window.angular);