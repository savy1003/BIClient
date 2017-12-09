
app.controller('ctrlFootfall', ['$stateParams', '$state', '$http', '$scope', '$rootScope', 'GlobalHelper', 'HttpErrorService', 'HttpSuccessService',
function ($stateParams, $state, $http, $scope, $rootScope, GlobalHelper, Notification, HttpErrorService, $AspCookie) {
    var self = this;
    self.listFootfall = true;
    self.itemsPerPage = 8;
    self.currentPage = 1;
    self.isTrade = false;
    self.showPrompt = false;
    self.strSearch = "";

  
    //lupong access
    $rootScope.onInitMenu('3');

    var clFootfall = function () {
        return { "STORE_CODE": null, "FOOTFALL_COUNT": null, "FOOTFALL_DATE": null, "ARC_DATE": null }
    }
    $("#datetimepicker1,#datetimepicker2").datepicker({});
    self.onInit = function (ipage) {
        GlobalHelper.StartSpin();
        self.currentPage = ipage;
        $http.get(biApi + 'Footfall/getFootfall?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search).success(function (response, status, headers, config) {
                console.log(response);
                if (!response.hasError) {

                    self.FootfallList = response.data;
                    self.totalCount = response.totalCount;
                    GlobalHelper.StopSpin();
                } else {
                    GlobalHelper.StopSpin();
                }
            })
            .error(function (data, status, headers, config) {
                HttpErrorService.getStatus(status, data);
                GlobalHelper.StopSpin();
            });
    }

    self.back = function () {
        self.listFootfall = true;
    }
    self.onAdd = function () {
        self.viewOnly = false;
        self.listFootfall = false;
        self.btnSave = true;
        self.btnUpdate = false;
        self.objFootfall = new clFootfall();
        self.disabledUserName = false;
        //enable only site for admin
        //if ($rootScope.userRoleId == $rootScope.SUPERADMIN || $rootScope.userRoleId == $rootScope.ADMINISTRATOR) {
        //    self.disabledSite = false;
        //} else {
        //    self.disabledSite = true;
        //    $http.get(carinaApi + 'Site/getSiteById/?&id=' + $rootScope.userSiteCode).success(function (response, status, headers, config) {
        //        self.objFootfall.SiteId = $rootScope.userSiteCode;
        //        self.objFootfall.SiteDesc = response.Description;
        //        GlobalHelper.StopSpin();
        //    }).error(function (data, status, headers, config) {
        //        HttpErrorService.getStatus(status, data);
        //        GlobalHelper.StopSpin();
        //    });
        //}
        //self.objFootfall.Status = 'A';
    }
    self.showSite = function (ipage) {
        if (self.disabledSite) { return; }
        self.SiteTxt = '';
        $rootScope.openModalForm('#modal-panelMaintenananceList');
        self.initSite(1);
    }

    self.initSite = function (ipage) {
        var sitePage = ipage;
        var txtSearch = '';
        GlobalHelper.StartSpin();
        $http.get(biApi + 'Store/getSite/').success(function (response, status, headers, config) {
            self.siteList = response;
            self.sitetotal_count = response.total_count;
            GlobalHelper.StopSpin();
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
            GlobalHelper.StopSpin();
        });
    }

    self.SelectedSite = function (site) {
        self.objFootfall.STORE_CODE = site.SiteCode;
        //self.objFootfall.SiteDesc = site.Description;
        $rootScope.closeModalForm('#modal-panelMaintenance');
    }
    self.ClosePass = function () {
        $rootScope.closeModalForm('#modal-panelMaintenance');
    }

    self.Save = function () {

        if ($("#datetimepicker1").datepicker().val() === "") {
            GlobalHelper.Error("FOOTFALL DATE is required");
            self.objFootfall.FOOTFALL_DATE = null;
        } else {
            self.objFootfall.FOOTFALL_DATE = $("#datetimepicker1").datepicker().val();
        }
        if (self.objFootfall.STORE_CODE === null) {
            GlobalHelper.Error("Store Code is required");
            document.getElementById("idSite").focus();
            return;
        }

        if (self.objFootfall.FOOTFALL_COUNT === null) {
            GlobalHelper.Error("FOOTFALL COUNT is required");
            document.getElementById("idFcount").focus();
            return;
        }
        self.Cancel = function () {
            $rootScope.closeModalForm('#modalPlan');
        }
     
        //if ($("#datetimepicker2").datepicker().val() === "") {
        //    GlobalHelper.Error("ARC_DATE is required");
        //    self.objFootfall.ARC_DATE = null;
        //} else {
        //    self.objFootfall.ARC_DATE = $("#datetimepicker2").datepicker().val();
        //}
        $http.post(biApi + 'Footfall/addFootfall', self.objFootfall).success(function (response, status, headers, config) {
            if (status == 201) {
                self.onInit(1); //retrieve
                GlobalHelper.Success('Footfall Successfully Save!');
                self.objFootfall = "";
            }
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
            GlobalHelper.StopSpin();
        })
        //self.objFootfall.Password = self.objFootfall.Name; //equate the password
        //$http.post(carinaApi + 'User/AddUser', self.objFootfall).success(function (response, status, headers, config) {
        //    if (status == 201) {
        //        //  self.onInit(1); //retrieve
        //        HttpSuccessService.getStatus(status, response);
        //    }
        //}).error(function (data, status, headers, config) {
        //    HttpErrorService.getStatus(status, data);
        //    GlobalHelper.StopSpin();
        .success(function (response) {
            //great, now reset the form
            //self.model = {}; // this resets the model
            self.formfootfall.$setPristine(); // this resets the form itself
        })
            .error(function (errorResponse) { });
        //});
    }
    /*
    self.search = function () {
        $http.get(biApi + 'Forcast/getForcast?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search).success(function (response, status, headers, config) {
     
            if (!response.hasError) {
                self.ForcastList = response.data;
                self.total_count = response.total_count;
                GlobalHelper.StopSpin();
            } else {
                GlobalHelper.StopSpin();
            }
        })
        .error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
            GlobalHelper.StopSpin();
        });
    }


    self.refresh = function () {
        self.strSearch = '';
        self.onInit(1);
    }
    */

    self.Cancel = function () {
        $rootScope.closeModalForm('#modalPlan');
    }

    $scope.SelectedFileForUpload = null;

    $scope.UploadFile = function (files) {
        $scope.$apply(function () { 
            $scope.Message = "";
            $scope.SelectedFileForUpload = files[0];
        })
    }

    //Parse Excel Data 
    $scope.ParseExcelDataAndSave = function () {
        var file = $scope.SelectedFileForUpload;
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
               
                var workbook = XLSX.read(data, { type: 'binary' });
                var sheetName = workbook.SheetNames[0];
                var excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                console.log(excelData);  
                if (excelData.length > 0) {
                    //Save data 
                    $scope.SaveData(excelData);
                }
                else {
                    $scope.Message = "No data found";
                }
            }
            reader.onerror = function (ex) {
                console.log(ex);
            }

            reader.readAsBinaryString(file);
        }
    }

    // Save excel data to our database
    //$http.post(biApi + 'Footfall/SaveData').success(function (response, status, headers, config)
    $scope.SaveData = function (excelData) {
        $http({
            method: "POST",
            url: biApi + "/Footfall/SaveData",
            data: JSON.stringify(excelData),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function (data) {
            if (data.status) {
                //$scope.Message = excelData.length + " record inserted";
                GlobalHelper.Success(excelData.length + ' ' + 'record inserted');
                angular.element("input[type='file']").val(null);
            }
            else {
                GlobalHelper.Error('Failed');
            }
        }, function (error) {
            GlobalHelper.Error('An error occurred while uploading.Please check your data!');
            angular.element("input[type='file']").val(null);
        })

    }

}]);
