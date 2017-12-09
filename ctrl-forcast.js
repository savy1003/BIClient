
app.controller('ctrlForecast', ['$stateParams', '$state', '$http', '$scope', '$rootScope', 'GlobalHelper', 'HttpErrorService', 'HttpSuccessService',
function ($stateParams, $state, $http, $scope, $rootScope, GlobalHelper, Notification, HttpErrorService, $AspCookie, $route) {
    var self = this;
    self.listForecast = true;
    self.itemsPerPage = 8;
    self.currentPage = 1;
    self.isTrade = false;
    self.showPrompt = false;
    self.strSearch = "";
  
    //lupong access
    $rootScope.onInitMenu('3');

    var clForecast = function () {
        return {
            "ID": null,
            "FORECAST_DATE": null,
            "GEO_LEVEL1_CODE": null,
            "GEO_LEVEL2_CODE": null,
            "GEO_LEVEL3_CODE": null,
            "STORE_CODE": null,
            "PROD_LEVEL1_CODE": null,
            "PROD_LEVEL2_CODE": null,
            "PROD_LEVEL3_CODE": null,
            "PROD_LEVEL4_CODE": null,
            "PROD_LEVEL5_CODE": null,
            "PRODUCT_CODE": null,
            "FORECAST_SALE_QTY": null,
            "FORECAST_SALE_VAL_AT_PRICE": null,
            "FORECAST_SALE_VAL_AT_COST": null,
            "ARC_DATE": null,
        }
    }

    $("#datetimepicker1,#datetimepicker2").datepicker({});

    self.onInit = function (ipage) {
        GlobalHelper.StartSpin();
        self.currentPage = ipage;
        $http.get(biApi + 'Forcast/getForcast?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search).success(function (response, status, headers, config) {
                console.log(response);
                if (!response.hasError) {

                    self.ForecastList = response.data;
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
       // self.listForecast = true;
    }

    self.onEditMst = function (pForecast) {
        //self.disabledUserName = true;
        self.viewOnly = false;
        self.btnSave = false;
        self.btnUpdate = true;
        self.objForecast.ID = pForecast.ID;
        self.objForecast.FORECAST_DATE = pForecast.FORECAST_DATE;
        self.objForecast.GEO_LEVEL1_CODE = pForecast.GEO_LEVEL1_CODE;
        self.objForecast.GEO_LEVEL2_CODE = pForecast.GEO_LEVEL2_CODE;
        self.objForecast.GEO_LEVEL3_CODE = pForecast.GEO_LEVEL3_CODE;
        self.objForecast.STORE_CODE = pForecast.STORE_CODE;
        self.objForecast.PROD_LEVEL1_CODE = pForecast.PROD_LEVEL1_CODE;
        self.objForecast.PROD_LEVEL2_CODE = pForecast.PROD_LEVEL2_CODE;
        self.objForecast.PROD_LEVEL3_CODE = pForecast.PROD_LEVEL3_CODE;
        self.objForecast.PROD_LEVEL4_CODE = pForecast.PROD_LEVEL4_CODE;
        self.objForecast.PROD_LEVEL5_CODE = pForecast.PROD_LEVEL5_CODE;
        self.objForecast.PRODUCT_CODE = pForecast.PRODUCT_CODE;
        self.objForecast.FORECAST_SALE_QTY = pForecast.FORECAST_SALE_QTY;
        self.objForecast.FORECAST_SALE_VAL_AT_PRICE = pForecast.FORECAST_SALE_VAL_AT_PRICE;
        self.objForecast.FORECAST_SALE_VAL_AT_COST = pForecast.FORECAST_SALE_VAL_AT_COST;
        self.objForecast.ARC_DATE = pForecast.ARC_DATE;
        $rootScope.openModalForm('#modal-panelMaintenance');
        // self.loadInv(1, '');

    }

    self.Update = function () {
        if (self.objForecast.ID === null) {
            GlobalHelper.Error("FORECAST_DATE is required");
            document.getElementById("idID").focus();
            return;
        }
        if (self.objForecast.FORECAST_DATE === null) {
            GlobalHelper.Error("FORECAST_DATE is required");
            document.getElementById("idPDate").focus();
            return;
        }
        if (self.objForecast.GEO_LEVEL1_CODE === null) {
            GlobalHelper.Error("GEO_LEVEL1_CODE is required");
            document.getElementById("idGeo1").focus();
            return;
        }
        if (self.objForecast.GEO_LEVEL2_CODE === null) {
            GlobalHelper.Error("GEO_LEVEL2_CODE is required");
            document.getElementById("idGeo2").focus();
            return;
        }
        if (self.objForecast.GEO_LEVEL3_CODE === null) {
            GlobalHelper.Error("GEO_LEVEL3_CODE is required");
            document.getElementById("idGeo3").focus();
            return;
        }
        if (self.objForecast.STORE_CODE === null) {
            GlobalHelper.Error("STORE CODE is required");
            document.getElementById("idStorecode").focus();
            return;
        }
        if (self.objForecast.PROD_LEVEL1_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL1_CODE is required");
            document.getElementById("idPProd1").focus();
            return;
        }
        if (self.objForecast.PROD_LEVEL2_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL2_CODE is required");
            document.getElementById("idPProd2").focus();
            return;
        }
        if (self.objForecast.PROD_LEVEL3_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL3_CODE is required");
            document.getElementById("idPProd3").focus();
            return;
        }
        if (self.objForecast.PROD_LEVEL4_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL4_CODE is required");
            document.getElementById("idPProd4").focus();
            return;
        }
        if (self.objForecast.PROD_LEVEL5_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL5_CODE is required");
            document.getElementById("idPProd5").focus();
            return;
        }
        if (self.objForecast.PRODUCT_CODE === null) {
            GlobalHelper.Error("PRODUCT_CODE is required");
            document.getElementById("idProduct").focus();
            return;
        }
        if (self.objForecast.FORECAST_SALE_QTY === null) {
            GlobalHelper.Error("FORECAST_SALE_QTY is required");
            document.getElementById("idForecastQty").focus();
            return;
        }
        if (self.objForecast.FORECAST_SALE_VAL_AT_PRICE === null) {
            GlobalHelper.Error("FORECAST_SALE_VAL_AT_PRICE is required");
            document.getElementById("idForecastPrice").focus();
            return;
        }
        if (self.objForecast.FORECAST_SALE_VAL_AT_COST === null) {
            GlobalHelper.Error("FORECAST_SALE_VAL_AT_COST is required");
            document.getElementById("idForecastCost").focus();
            return;
        }
        if (self.objForecast.ARC_DATE === null) {
            GlobalHelper.Error("ARC_DATE is required");
            document.getElementById("idPArcDate").focus();
            return;
        }
        $http.post(biApi + 'Forcast/updateForecast', self.objForecast).success(function (response, status, headers, config) {
            if (status == 200) {
                self.onInit(1); //retrieve
                GlobalHelper.Success('Forecast Successfully Updated!');
                $rootScope.closeModalForm('#modal-panelMaintenance');
                $scope.Update();
            }
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
            GlobalHelper.StopSpin();
        });
     
    }


    self.SelectedMonth = function (pForecast) {

        self.objForecast.FORECAST_DATE = pForecast.FORECAST_DATE
        if ($("#datetimepicker1").datepicker().val() === "") {
            GlobalHelper.Error("PLAN DATE is required");
            self.objForecast.FORECAST_DATE = null;
        } else {
            self.objForecast.FORECAST_DATE = $("#datetimepicker1").datepicker().val();
        }
        //self.processSearch();
        $rootScope.closeModalForm('#modal-panelMaintenance');
    }

    self.processSearch = function () {
        if (self.objForecast.SiteDesc === null) {
            GlobalHelper.Error("Store Code is required");
            document.getElementById("idSite").focus();
            return;
        }
        if (self.objForecast.FORECAST_DATE === null) {
            GlobalHelper.Error("STRMRGRP DATE is required");
            document.getElementById("footfalldate").focus();
            return;
        }
        $http.get(biApi + 'Forcast/getForecastByDate?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search + '&pSite=' + self.objForecast.SiteCode + '&sForecastdate=' + self.objForecast.FORECAST_DATE)
        .success(function (response, status, headers, config) {
            console.log(response.data);
            if (!response.hasError) {
              
                self.ForecastList1 = response.data;
                self.totalCount1 = response.totalCount;
                self.sumInv = response.data2;
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


    self.onAdd = function () {
        self.viewOnly = false;
        self.listForecast = false;
        self.btnSave = true;
        self.btnUpdate = false;
        self.objForecast = new clForecast();
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
    self.Save = function () {

        if ($("#datetimepicker1").datepicker().val() === "") {
            GlobalHelper.Error("FORECAST DATE is required");
            self.objForecast.FORECAST_DATE = null;
        } else {
            self.objForecast.FORECAST_DATE = $("#datetimepicker1").datepicker().val();
        }
        if (self.objForecast.STORE_CODE === null) {
            GlobalHelper.Error("STORE CODE is required");
            document.getElementById("idFCode").focus();
            return;
        }
        if (self.objForecast.PROD_LEVEL1_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL1_CODE is required");
            document.getElementById("idFprodlvl1code").focus();
            return;
        }
        if (self.objForecast.PROD_LEVEL2_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL2_CODE is required");
            document.getElementById("idFprodlvl2code").focus();
            return;
        }
        if (self.objForecast.FORECAST_SALE_VAL_AT_PRICE === null) {
            GlobalHelper.Error("FORECAST_SALE_VAL_AT_PRICE is required");
            document.getElementById("idFvalprice").focus();
            return;
        }
      

        //if ($("#datetimepicker2").datepicker().val() === "") {
        //    GlobalHelper.Error("ARC_DATE is required");
        //    self.objFootfall.ARC_DATE = null;
        //} else {
        //    self.objFootfall.ARC_DATE = $("#datetimepicker2").datepicker().val();
        //}
        $http.post(biApi + 'Forcast/addForecast', self.objForecast).success(function (response, status, headers, config) {
            if (status == 201) {
                self.onInit(1); //retrieve
                GlobalHelper.Success('Forecast Successfully Save!');
                self.objForecast = "";
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
        self.objForecast.SiteCode = site.SiteCode;
        self.objForecast.SiteDesc = site.Description;
        //self.site = self.objPlan.SiteDesc
        $rootScope.closeModalForm('#modal-panelMaintenance');
    }

    self.ClosePass = function () {
        $rootScope.closeModalForm('#modal-panelMaintenance');
    }

    //upload excell here
   
    $scope.SelectedFileForUpload = null;

    $scope.UploadFile = function (files) {
        $scope.$apply(function () {
            $scope.Message = "";
            $scope.SelectedFileForUpload = files[0];
        })
    }

    $scope.reset = function () {
        angular.element("input[type='file']").val(null);
    };
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
            url: biApi + "/Forcast/SaveData",
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
