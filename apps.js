'use strict'
var app = angular.module('apps',
        ['ui.router',
    'ng-context-menu',
    'ui.bootstrap',
    'prince.cookie',
    'apps.global',
    'ngFileUpload',
    'angularUtils.directives.dirPagination',
    'ncy-angular-breadcrumb',
    'youtube-embed',
    'ui-notification',
    'angularjs-dropdown-multiselect',
    'apps.config',
    'color.picker',
    'ui.calendar',
    //'am.multiselect',
    'blockUI'
        ])

.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.headers.post = { 'Content-Type': 'application/json' };
    $httpProvider.defaults.headers.put = { 'Content-Type': 'application/json' };
    $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers.get = {};
  
})

.run(['$rootScope', '$http', '$state', '$stateParams','$AspCookie',
function ($rootScope, $http, $state, $stateParams,$AspCookie) {

    $rootScope.successMessage = "";
    $rootScope.canAdd = false;
    $rootScope.canEdit = false;
    $rootScope.canDelete = false;
    $rootScope.CanView = false;
    $rootScope.userId = $AspCookie.get('_214', 'id');
    $rootScope.UserCode = $AspCookie.get('_214', 'code');
    $rootScope.search = "";
    $rootScope.userFirstName = $AspCookie.get('_214', 'userFirstName');

    $rootScope.onInitMenu = function (p) {

        $http.get(biApi + 'User/getUserMenu?pUserCode=' + $rootScope.UserCode + '&pMenuId=' + p).success(function (data, status, headers, config) {
      
            if (data.CanAdd == 1) { $rootScope.canAdd = true }
            if (data.CanEdit == 1) { $rootScope.canEdit = true }
            if (data.CanDelete == 1) { $rootScope.canDelete = true }
            if (data.CanView == 1) { $rootScope.canView = true }
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
        });
    }

    $rootScope.onSignOut = function () {
        window.location.replace(u_account + 'Logout');//response redirect to logout page
    }

    $rootScope.openModalForm = function (panel) {
        $rootScope.isError = false;
        openModalPanel(panel);
    }

    //close modal form
    $rootScope.closeModalForm = function () {
        jQuery.magnificPopup.close();
        $rootScope.isError = false;
    }

}])












