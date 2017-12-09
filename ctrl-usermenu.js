app.controller('ctrlUserMenu', ['$stateParams', '$state', '$http', '$scope', '$rootScope', 'GlobalHelper','HttpErrorService','HttpSuccessService',
function ($stateParams, $state, $http, $scope, $rootScope, GlobalHelper, HttpErrorService, HttpSuccessService) {
    var self = this;
    self.currentPage = 1;
    self.itemsPerPage = 8;
    self.fnd = "";
    self.totalCount = 0;
    self.showListUser = false;
    self.showFormUser = true;
    self.userList = [];
    self.Code = "";
    self.FirstName = "";
    self.LastName = "";
    self.menuList = [];

    self.allMenu = [];
    $rootScope.onInitMenu('4');

    var objMenu = { "Code": null, "canAdd": 0, "canEdit": 0, "canDelete": 0, "canView": 0 };

    self.onInit = function () {
        //get all menu
        GlobalHelper.StartSpin();
        $http.get(biApi + 'Menu/getAllMenu').success(function (response, status, headers, config) {
            if (!response.hasError) {
                self.allMenu = response;
                GlobalHelper.StopSpin();
            } else {
                console.log('error:UserSetCookie \n' + response.errorMessage);
            }

        }).error(function (data, status, headers, config) {
            $scope.hasError = true;
            $scope.errorMessage = data;
            GlobalHelper.StopSpin();
        });
    }

    self.selectUser = function () {
        GlobalHelper.StartSpin();
        $http.get(biApi + 'User/getUserActive').success(function (response, status, headers, config) {
            if (!response.hasError) {
                self.userList = response.data;
                $rootScope.openModalForm('#modalUser');
                GlobalHelper.StopSpin();
            } else {
                console.log('error:UserSetCookie \n' + response.errorMessage);
            }

        }).error(function (data, status, headers, config) {
            $scope.hasError = true;
            $scope.errorMessage = data;
            GlobalHelper.StopSpin();
        });
    }

    self.selectedUser = function (oUser) {
        GlobalHelper.StartSpin();
        self.Code = oUser.Code;
        self.FirstName = oUser.FirstName;
        self.LastName = oUser.LastName;

        //get the access of user
        $http.get(biApi + 'User/getUserMenuList?&pUserCode=' + self.Code).success(function (response, status, headers, config) {
            if (!response.hasError) {
                self.menuList = response;
                for (var h = 0; h < self.allMenu.length; h++) {
                    self.allMenu[h].canAdd = false;
                    self.allMenu[h].canEdit = false;
                    self.allMenu[h].canDelete = false;
                    self.allMenu[h].canView = false;
                }
                for (var i = 0; i < self.menuList.length; i++) {
                    for (var c = 0; c < self.allMenu.length; c++) {
                        if (self.menuList[i].Code === self.allMenu[c].Code) {
                            if (self.menuList[i].canAdd === 1) { self.allMenu[c].canAdd = true;}
                            if (self.menuList[i].canEdit === 1) { self.allMenu[c].canEdit = true }
                            if (self.menuList[i].canDelete === 1) { self.allMenu[c].canDelete = true }
                            if (self.menuList[i].canView === 1) { self.allMenu[c].canView = true }
                            break;
                        }
                    }
                }
                GlobalHelper.StopSpin();
                $rootScope.closeModalForm('#modalUser');
            } else {
                console.log('error:UserSetCookie \n' + response.errorMessage);
                $rootScope.closeModalForm('#modalUser');
            }
        }).error(function (data, status, headers, config) {
            $scope.hasError = true;
            $scope.errorMessage = data;
            GlobalHelper.StopSpin();
        });
    }

    self.Cancel = function () {
        $rootScope.closeModalForm('#modalUser');
    }

    self.saveUser = function () {
        for (var c = 0; c < self.allMenu.length; c++) {
            for (var i = 0; i < self.menuList.length; i++) {
                if (self.menuList[i].Code === self.allMenu[c].Code) {
                    if (self.allMenu[c].canAdd) {
                        self.menuList[i].canAdd = 1;
                    } else {
                        self.menuList[i].canAdd = 0;
                    }
                    if (self.allMenu[c].canEdit) {
                        self.menuList[i].canEdit = 1;
                    } else {
                        self.menuList[i].canEdit = 0;
                    }
                    if (self.allMenu[c].canDelete) {
                        self.menuList[i].canDelete = 1;
                    } else {
                        self.menuList[i].canDelete = 0;
                    }
                    if (self.allMenu[c].canView) {
                        self.menuList[i].canView = 1;
                    } else {
                        self.menuList[i].canView = 0;
                    }
                }
            }
        }

        GlobalHelper.StartSpin();

        $http.post(biApi + 'User/saveUserMenu', self.menuList ).success(function (response, status, headers, config) {
            if (!response.hasError) {
                $rootScope.successMessage = response;
                $rootScope.openModalForm('#modal-globalsuccess');
                GlobalHelper.StopSpin();
            } else {
                console.log('error:UserSetCookie \n' + response.errorMessage);
            }

        }).error(function (data, status, headers, config) {
            $scope.hasError = true;
            $scope.errorMessage = data;
            GlobalHelper.StopSpin();
        });
    }



  

}]);