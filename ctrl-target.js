
app.controller('ctrlTarget', ['$stateParams', '$state', '$http', '$scope', '$rootScope', 'GlobalHelper', 'HttpErrorService', 'HttpSuccessService',
function ($stateParams, $state, $http, $scope, $rootScope, GlobalHelper, Notification, HttpErrorService, $AspCookie) {
    var self = this;
    self.listTarget = true;
    self.itemsPerPage = 8;
    self.currentPage = 1;
    self.isTrade = false;
    self.showPrompt = false;
    self.strSearch = "";
  
    //lupong access
    $rootScope.onInitMenu('3');

    var clTarget = function () {
        return {
            "ID": null,
            "TARGET_DATE": null,
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
            "TARGET_SALE_QTY": null,
            "TARGET_SALE_VAL_AT_PRICE": null,
            "TARGET_SALE_VAL_AT_COST": null,
            "ARC_DATE": null,
        }
    }

    $("#datetimepicker1,#datetimepicker2").datepicker({});

    self.onInit = function (ipage) {
        GlobalHelper.StartSpin();
        self.currentPage = ipage;
        $http.get(biApi + 'Target/getTarget?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search).success(function (response, status, headers, config) {
                console.log(response);
                if (!response.hasError) {

                    self.TargetList = response.data;
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
        //self.listTarget = true;
    }

    self.onEditMst = function (pTarget) {
        //self.disabledUserName = true;
        self.viewOnly = false;
        self.btnSave = false;
        self.btnUpdate = true;
        self.objTarget.ID = pTarget.ID;
        self.objTarget.TARGET_DATE = pTarget.TARGET_DATE;
        self.objTarget.GEO_LEVEL1_CODE = pTarget.GEO_LEVEL1_CODE;
        self.objTarget.GEO_LEVEL2_CODE = pTarget.GEO_LEVEL2_CODE;
        self.objTarget.GEO_LEVEL3_CODE = pTarget.GEO_LEVEL3_CODE;
        self.objTarget.STORE_CODE = pTarget.STORE_CODE;
        self.objTarget.PROD_LEVEL1_CODE = pTarget.PROD_LEVEL1_CODE;
        self.objTarget.PROD_LEVEL2_CODE = pTarget.PROD_LEVEL2_CODE;
        self.objTarget.PROD_LEVEL3_CODE = pTarget.PROD_LEVEL3_CODE;
        self.objTarget.PROD_LEVEL4_CODE = pTarget.PROD_LEVEL4_CODE;
        self.objTarget.PROD_LEVEL5_CODE = pTarget.PROD_LEVEL5_CODE;
        self.objTarget.PRODUCT_CODE = pTarget.PRODUCT_CODE;
        self.objTarget.TARGET_SALE_QTY = pTarget.TARGET_SALE_QTY;
        self.objTarget.TARGET_SALE_VAL_AT_PRICE = pTarget.TARGET_SALE_VAL_AT_PRICE;
        self.objTarget.TARGET_SALE_VAL_AT_COST = pTarget.TARGET_SALE_VAL_AT_COST;
        self.objTarget.ARC_DATE = pTarget.ARC_DATE;
        $rootScope.openModalForm('#modal-panelMaintenance');
        // self.loadInv(1, '');

    }

    self.Update = function () {
        if (self.objTarget.ID === null) {
            GlobalHelper.Error("ID is required");
            document.getElementById("idID").focus();
            return;
        }
        if (self.objTarget.TARGET_DATE === null) {
            GlobalHelper.Error("TARGET_DATE is required");
            document.getElementById("idPDate").focus();
            return;
        }
        if (self.objTarget.GEO_LEVEL1_CODE === null) {
            GlobalHelper.Error("GEO_LEVEL1_CODE is required");
            document.getElementById("idGeo1").focus();
            return;
        }
        if (self.objTarget.GEO_LEVEL2_CODE === null) {
            GlobalHelper.Error("GEO_LEVEL2_CODE is required");
            document.getElementById("idGeo2").focus();
            return;
        }
        if (self.objTarget.GEO_LEVEL3_CODE === null) {
            GlobalHelper.Error("GEO_LEVEL3_CODE is required");
            document.getElementById("idGeo3").focus();
            return;
        }
        if (self.objTarget.STORE_CODE === null) {
            GlobalHelper.Error("STORE CODE is required");
            document.getElementById("idStorecode").focus();
            return;
        }
        if (self.objTarget.PROD_LEVEL1_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL1_CODE is required");
            document.getElementById("idPProd1").focus();
            return;
        }
        if (self.objTarget.PROD_LEVEL2_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL2_CODE is required");
            document.getElementById("idPProd2").focus();
            return;
        }
        if (self.objTarget.PROD_LEVEL3_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL3_CODE is required");
            document.getElementById("idPProd3").focus();
            return;
        }
        if (self.objTarget.PROD_LEVEL4_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL4_CODE is required");
            document.getElementById("idPProd4").focus();
            return;
        }
        if (self.objTarget.PROD_LEVEL5_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL5_CODE is required");
            document.getElementById("idPProd5").focus();
            return;
        }
        if (self.objTarget.PRODUCT_CODE === null) {
            GlobalHelper.Error("PRODUCT_CODE is required");
            document.getElementById("idProduct").focus();
            return;
        }
        if (self.objTarget.TARGET_SALE_QTY === null) {
            GlobalHelper.Error("TARGET_SALE_QTY is required");
            document.getElementById("idForecastQty").focus();
            return;
        }
        if (self.objTarget.TARGET_SALE_VAL_AT_PRICE === null) {
            GlobalHelper.Error("TARGET_SALE_VAL_AT_PRICE is required");
            document.getElementById("idForecastPrice").focus();
            return;
        }
        if (self.objTarget.TARGET_SALE_VAL_AT_COST === null) {
            GlobalHelper.Error("TARGET_SALE_VAL_AT_COST is required");
            document.getElementById("idForecastCost").focus();
            return;
        }
        if (self.objTarget.ARC_DATE === null) {
            GlobalHelper.Error("ARC_DATE is required");
            document.getElementById("idPArcDate").focus();
            return;
        }
        $http.post(biApi + 'Target/updateTarget', self.objTarget).success(function (response, status, headers, config) {
            if (status == 200) {
                self.onInit(1); //retrieve
                GlobalHelper.Success('Target Successfully Updated!');
                $rootScope.closeModalForm('#modal-panelMaintenance');
            }
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
            GlobalHelper.StopSpin();
        });
    }


    self.search = function () {
        //self.invListTxt = "";
        if ($("#datetimepicker1").datepicker().val() === "") {
            GlobalHelper.Error("PLAN DATE is required");
            self.objTarget.PLAN_DATE = null;
        } else {
            self.objTarget.PLAN_DATE = $("#datetimepicker1").datepicker().val();
        }
        $rootScope.openModalForm('#modal-panelMaintenance1');
        self.loadInv(1, '');
    }
    self.SelectedMonth = function (pTarget) {

        self.objTarget.PLAN_DATE = objTarget.PLAN_DATE
        if ($("#datetimepicker1").datepicker().val() === "") {
            GlobalHelper.Error("PLAN DATE is required");
            self.objTarget.PLAN_DATE = null;
        } else {
            self.objTarget.PLAN_DATE = $("#datetimepicker1").datepicker().val();
        }
        //self.processSearch();
        $rootScope.closeModalForm('#modal-panelMaintenance');
    }

    self.processSearch = function () {
        if (self.objTarget.SiteDesc === null) {
            GlobalHelper.Error("Store Code is required");
            document.getElementById("idSite").focus();
            return;
        }
        if (self.objTarget.TARGET_DATE === null) {
            GlobalHelper.Error("STRMRGRP DATE is required");
            document.getElementById("footfalldate").focus();
            return;
        }
        $http.get(biApi + 'Target/getTargetByDate?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search + '&pSite=' + self.objTarget.SiteCode + '&sTargetdate=' + self.objTarget.TARGET_DATE)
        .success(function (response, status, headers, config) {
            console.log(response.data);
            if (!response.hasError) {
               
                self.TargetList1 = response.data;
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
        self.listTarget = false;
        self.btnSave = true;
        self.btnUpdate = false;
        self.objTarget = new clTarget();
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
            GlobalHelper.Error("TARGET DATE is required");
            self.objTarget.TARGET_DATE = null;
        } else {
            self.objTarget.TARGET_DATE = $("#datetimepicker1").datepicker().val();
        }
        if (self.objTarget.STORE_CODE === null) {
            GlobalHelper.Error("STORE CODE is required");
            document.getElementById("idTCode").focus();
            return;
        }
        if (self.objTarget.PROD_LEVEL1_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL1_CODE is required");
            document.getElementById("idTprodlvl1code").focus();
            return;
        }
        if (self.objTarget.PROD_LEVEL2_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL2_CODE is required");
            document.getElementById("idTprodlvl2code").focus();
            return;
        }
        if (self.objTarget.TARGET_SALE_VAL_AT_PRICE === null) {
            GlobalHelper.Error("TARGET_SALE_VAL_AT_PRICE is required");
            document.getElementById("idTvalprice").focus();
            return;
        }


        //if ($("#datetimepicker2").datepicker().val() === "") {
        //    GlobalHelper.Error("ARC_DATE is required");
        //    self.objFootfall.ARC_DATE = null;
        //} else {
        //    self.objFootfall.ARC_DATE = $("#datetimepicker2").datepicker().val();
        //}
        $http.post(biApi + 'Target/addTarget', self.objTarget).success(function (response, status, headers, config) {
            if (status == 201) {
                self.onInit(1); //retrieve
                GlobalHelper.Success('Target Successfully Save!');
                self.objTarget = "";
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
        self.objTarget.SiteCode = site.SiteCode;
        self.objTarget.SiteDesc = site.Description;
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
            url: biApi + "/Target/SaveData",
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
