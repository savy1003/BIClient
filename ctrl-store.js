
app.controller('ctrlStore', ['$stateParams', '$state', '$http', '$scope', '$rootScope', 'GlobalHelper','HttpErrorService','HttpSuccessService',
function ($stateParams, $state, $http, $scope, $rootScope, GlobalHelper, HttpErrorService, HttpSuccessService) {
    var self = this;
    self.listStore = false;
    self.currentPage = 1;
    self.itemsPerPage = 8;
    self.objStore = {
        "Id": null,
        "STORE_CODE": null,
        "STORE_DESCRIPTION": null,
        "STORE_LATITUDE": null,
        "STORE_LONGITUDE": null,
        "STORE_OPENING_HOUR": null,
        "STORE_CLOSING_HOUR": null,
        "SOM": null,
        "SOM_DESC": null,
        "AREA_MANAGER": null,
        "AREA_MANAGER_DESC": null,
        "REGIONAL_MANAGER": null,
        "REGIONAL_MANAGER_DESC": null,
        "SENIOR_SOM": null,
        "SENIOR_SOM_DESC": null,
        "DC_STORE_CODE":null,
        "DC_STORE_DESC":null
    };
    self.listDc = [];
    self.superiorList = [];
    self.isSelectedFieldSom = false;
    self.isSelectedFieldSeniorSom = false;
    self.isSelectedFieldAreaManager = false;
    self.isSelectedFieldRegionalManager = false;

    $rootScope.onInitMenu('1');
    $("#datepicker").datepicker({});
    self.onInit = function (ipage) {
        self.currentPage = ipage;
        GlobalHelper.StartSpin();
        $http.get(biApi + 'Store/getstore?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search).success(function (response, status, headers, config) {
            if (!response.hasError) {
                self.listStore = true;
                self.storeList = response.data;
                self.totalCount = response.totalCount;
                GlobalHelper.StopSpin();
            } else {
                console.log('error:UserSetCookie \n' + response.errorMessage);
            }
        }).error(function (data, status, headers, config) {
            $scope.hasError = true;
            $scope.errorMessage = data;
            GlobalHelper.StopSpin();
        });

        //init dropdownDc
        $http.get(biApi + 'Store/getstoreDc').success(function (response, status, headers, config) {
            if (!response.hasError) {
                self.listDc = response;
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

    self.onAdd = function () {
        self.listStore = false;
        self.displayEdit = false;
        self.displayAdd = true;
        self.objStore.Id = null;
        self.objStore.STORE_CODE = null;
        self.objStore.STORE_DESCRIPTION = null;
        self.objStore.STORE_LATITUDE = null;
        self.objStore.STORE_LONGITUDE = null;
        self.objStore.STORE_OPENING_HOUR = null;
        self.objStore.STORE_CLOSING_HOUR = null;
        self.objStore.SOM = null;
        self.objStore.SOM_DESC = null;
        self.objStore.AREA_MANAGER = null;
        self.objStore.AREA_MANAGER_DESC = null;
        self.objStore.REGIONAL_MANAGER = null;
        self.objStore.REGIONAL_MANAGER_DESC = null;
        self.objStore.SENIOR_SOM = null;
        self.objStore.SENIOR_SOM_DESC = null;
        self.objStore.DC_STORE_DESC = null;
    }

    self.onEdit = function (pstore) {
        self.objStore = pstore;
        self.listStore = false;
        self.displayEdit = true;
        self.displayAdd = false;
    }

    self.back = function () {
        self.listStore = true;
        self.displayAdd = false;
        self.displayEdit = false;
        self.onInit(1);
    }

    self.selectSuperior = function (pSuperior) {

        if (pSuperior == "SOM") {
            self.isSelectedFieldSom = true;
            self.isSelectedFieldSeniorSom = false;
            self.isSelectedFieldAreaManager = false;
            self.isSelectedFieldRegionalManager = false;
        } else if (pSuperior == "SENIORSOM") {
            self.isSelectedFieldSom = false;
            self.isSelectedFieldSeniorSom = true;
            self.isSelectedFieldAreaManager = false;
            self.isSelectedFieldRegionalManager = false;
        } else if (pSuperior == "AREAMANAGER") {
            self.isSelectedFieldSom = false;
            self.isSelectedFieldSeniorSom = false;
            self.isSelectedFieldAreaManager = true;
            self.isSelectedFieldRegionalManager = false;
        }
        else if (pSuperior == "REGIONALMANAGER") {
            self.isSelectedFieldSom = false;
            self.isSelectedFieldSeniorSom = false;
            self.isSelectedFieldAreaManager = false;
            self.isSelectedFieldRegionalManager = true;
        }

        GlobalHelper.StartSpin();
        $http.get(biApi + 'Superior/getSuperior').success(function (response, status, headers, config) {
            if (!response.hasError) {
                self.superiorList = response;
                $rootScope.openModalForm('#modalSuperior');
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

    self.selectedSuperior = function (pSuperior) {
        if (self.isSelectedFieldSom) {
            self.objStore.SOM = pSuperior.Id;
            self.objStore.SOM_DESC = pSuperior.Name;
        } else if (self.isSelectedFieldSeniorSom) {
            self.objStore.SENIOR_SOM = pSuperior.Id;
            self.objStore.SENIOR_SOM_DESC = pSuperior.Name;
        } else if (self.isSelectedFieldAreaManager) {
            self.objStore.AREA_MANAGER = pSuperior.Id;
            self.objStore.AREA_MANAGER_DESC = pSuperior.Name;
        } else if (self.isSelectedFieldRegionalManager) {
            self.objStore.REGIONAL_MANAGER = pSuperior.Id;
            self.objStore.REGIONAL_MANAGER_DESC = pSuperior.Name;
        }
        $rootScope.closeModalForm('#modalSuperior');
    }
    self.Cancel = function () {
        $rootScope.closeModalForm('#modalSuperior');
    }
    self.save = function () {
        $http.post(biApi + 'Store/updateStore', self.objStore).success(function (response, status, headers, config) {
            HttpSuccessService.getStatus(200, "Successfully Updated!");
            self.listStore = true;
            self.displayAdd = false;
            self.displayEdit = false;
            self.onInit(1);
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
            GlobalHelper.StopSpin();
        });
    }

    }]);

