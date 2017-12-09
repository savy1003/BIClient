
var app = angular.module("apps", [
        'LocalForageModule',
        'apps.global',
        'prince.cookie',
        'blockUI']
    );
app.controller('loginController', ['$scope', '$http', '$localForage', 'blockUI', '$window', '$AspCookie', function ($scope, $http, $localForage, blockUI, $window, $AspCookie) {

    $scope.hasError = false;
    $scope.showModal = false;

    //login event
    $scope.onLogin = function () {
        blockUI.start();
        var user =
        {
            "EmailAdd": $scope.emailAlias,
            "Password": $scope.pass,
            "Spin": $scope.spin
        };
     
        $http.post(biApi + 'User/Login', user).success(function (response, status, headers, config) {
            if (status == 202) {
                $http.get(u_account + 'SetCookie/?id=' + response.Id +  '&code=' + response.Code + '&userFirstName=' + response.FirstName + '&userLastName=' + response.LastName).success(function (data, status, headers, config) {
                    if (!data.hasError) {
                        window.location.replace(mainUrl + 'Index/' + response.Id);//redirect
                        blockUI.start();
                    } else {
                        console.log('error:UserSetCookie \n' + data.errorMessage);
                    }

                }).error(function (data, status, headers, config) {
                    $scope.hasError = true;
                    $scope.errorMessage = data;
                });
            }
        }).error(function (data, status, headers, config) {
            if (status == 401) {
                $scope.hasError = true;
                $scope.errorMessage = "System Message: Unauthorized";
            }
            else {
                $scope.hasError = true;
                $scope.errorMessage = "System Message:" + response.data;
            }
        });

        blockUI.stop();
    };

    // -------------------------------------------------------------------------//
    // Usage for spin.js
    var opts = {
        lines: 11, // The number of lines to draw
        length: 11, // The length of each line
        width: 4, // The line thickness
        radius: 11, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 46, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };
    var spinnerTarget = document.getElementById('spinnerTarget');

}]);