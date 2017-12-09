
app.controller('ctrlPriceBand', ['$stateParams', '$state', '$http', '$scope', '$rootScope', 'GlobalHelper', 'HttpErrorService', 'HttpSuccessService',
function ($stateParams, $state, $http, $scope, $rootScope, GlobalHelper, Notification, HttpErrorService, $AspCookie) {
    var self = this;
    self.listPrice = true;
    self.itemsPerPage = 8;
    self.currentPage = 1;
    self.isTrade = false;
    self.showPrompt = false;
    self.strSearch = "";
    self.siteList = [];

    //lupong access
    $rootScope.onInitMenu('1');

    var clPriceBand = function () {
        return {
            "ID": null,
            "PRICE_BAND_CODE": null,
            "PRICE_BAND_DESC": null,
            "PROD_LEVEL1_CODE": null,
            "PRICE_BAND_LOWER": null,
            "PRICE_BAND_UPPER": null,
            "PRICE_BAND_SEQ": null,
            "ARC_DATE": null,
        }
    }

    $("#datetimepicker1,#datetimepicker2").datepicker({});

    self.onInit = function (ipage) {
        GlobalHelper.StartSpin();
        self.currentPage = ipage;
        $http.get(biApi + 'PriceBand/getPrice?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search).success(function (response, status, headers, config) {
            console.log(response);
            if (!response.hasError) {
                //self.console.log;
                self.PriceList = response.data;
                self.totalCount = response.totalCount;
                //self.listPlan = true;
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
        //self.listStoreMerch = true;
    }



    self.onEditMst = function (PriceBand) {
        //self.disabledUserName = true;
        self.viewOnly = false;
        self.btnSave = false;
        self.btnUpdate = true;
        self.objPriceBand.ID = PriceBand.ID;
        self.objPriceBand.PRICE_BAND_CODE = PriceBand.PRICE_BAND_CODE;
        self.objPriceBand.PRICE_BAND_DESC = PriceBand.PRICE_BAND_DESC;
        self.objPriceBand.PROD_LEVEL1_CODE = PriceBand.PROD_LEVEL1_CODE;
        self.objPriceBand.PRICE_BAND_LOWER = PriceBand.PRICE_BAND_LOWER;
        self.objPriceBand.PRICE_BAND_UPPER = PriceBand.PRICE_BAND_UPPER;
        self.objPriceBand.PRICE_BAND_SEQ = PriceBand.PRICE_BAND_SEQ;
        self.objPriceBand.ARC_DATE = PriceBand.ARC_DATE;
        $rootScope.openModalForm('#modal-panelMaintenance');
        // self.loadInv(1, '');
    }


    self.Update = function () {
        if (self.objPriceBand.ID === null) {
            GlobalHelper.Error("PRICE_BAND_CODE is required");
            document.getElementById("idID").focus();
            return;
        }
        if (self.objPriceBand.PRICE_BAND_CODE === null) {
            GlobalHelper.Error("PRICE_BAND_CODE is required");
            document.getElementById("idCode").focus();
            return;
        }
        if (self.objPriceBand.PRICE_BAND_DESC === null) {
            GlobalHelper.Error("PRICE_BAND_DESC is required");
            document.getElementById("idPProd1").focus();
            return;
        }
        if (self.objPriceBand.PROD_LEVEL1_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL1_CODE is required");
            document.getElementById("idPProd2").focus();
            return;
        }
        if (self.objPriceBand.PRICE_BAND_LOWER === null) {
            GlobalHelper.Error("PRICE_BAND_LOWER is required");
            document.getElementById("idGeo2").focus();
            return;
        }
        if (self.objPriceBand.PRICE_BAND_UPPER === null) {
            GlobalHelper.Error("PRICE_BAND_UPPER is required");
            document.getElementById("idGeo3").focus();
            return;
        }
        if (self.objPriceBand.PRICE_BAND_SEQ === null) {
            GlobalHelper.Error("PRICE_BAND_SEQ is required");
            document.getElementById("priceseq").focus();
            return;
        }
        if (self.objPriceBand.ARC_DATE === null) {
            GlobalHelper.Error("ARC_DATE is required");
            document.getElementById("idPArcDate").focus();
            return;
        }
        $http.post(biApi + 'PriceBand/updatePriceBand', self.objPriceBand).success(function (response, status, headers, config) {
            if (status == 200) {
                self.onInit(1); //retrieve
                GlobalHelper.Success('Priceband Successfully Updated!');
                $rootScope.closeModalForm('#modal-panelMaintenance');
            }
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
            GlobalHelper.StopSpin();
        });
        scope.$apply();
    }

    self.KeyDownSearch = function (pSearch) {
        self.PricebandSearch();
    }
    self.search = function () {
        //self.invListTxt = "";
        if ($("#datetimepicker1").datepicker().val() === "") {
            GlobalHelper.Error("PLAN DATE is required");
            self.objPlan.PLAN_DATE = null;
        } else {
            self.objPlan.PLAN_DATE = $("#datetimepicker1").datepicker().val();
        }
        $rootScope.openModalForm('#modal-panelMaintenance1');
        self.loadInv(1, '');
    }
    self.SelectedMonth = function (pStoreMerch) {

        self.objStoreMerch.STRMRGRP_DATE = pStoreMerch.STRMRGRP_DATE
        if ($("#datetimepicker1").datepicker().val() === "") {
            GlobalHelper.Error("PLAN DATE is required");
            self.objStoreMerch.STRMRGRP_DATE = null;
        } else {
            self.objStoreMerch.STRMRGRP_DATE = $("#datetimepicker1").datepicker().val();
        }
        //self.processSearch();
        $rootScope.closeModalForm('#modal-panelMaintenance');
    }

    self.PricebandSearch = function (pCode) {
        self.objPriceBand.lCode = self.objPriceBand.lCode
        //$rootScope.brandCOde = self.pcode;
        self.processSearch(self.currentPage);
    }

    self.processSearch = function () {
        if (self.objPriceBand.lCode === null) {
            GlobalHelper.Error("Store Code is required");
            document.getElementById("idSite").focus();
            return;
        }

        $http.get(biApi + 'PriceBand/getPriceByDate?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search + '&pCode=' + self.objPriceBand.lCode)
        .success(function (response, status, headers, config) {
            console.log(response.data);
            if (!response.hasError) {

                self.PriceList1 = response.data;
                self.totalprice = response.totalCount;
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
    self.SearchInv = function () {
        self.loadInv(1, self.invListTxt);
    }
    self.onView = function () {
        self.viewOnly = false;
        self.listPrice = false;
        self.btnSave = true;
        self.btnUpdate = false;
        self.objPriceBand = new clPriceBand();
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
            GlobalHelper.Error("PLAN DATE is required");
            self.objPlan.PLAN_DATE = null;
        } else {
            self.objPlan.PLAN_DATE = $("#datetimepicker1").datepicker().val();
        }
        if (self.objPlan.STORE_CODE === null) {
            GlobalHelper.Error("STORE CODE is required");
            document.getElementById("idTCode").focus();
            return;
        }
        if (self.objPlan.PROD_LEVEL1_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL1_CODE is required");
            document.getElementById("idTprodlvl1code").focus();
            return;
        }
        if (self.objPlan.PROD_LEVEL2_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL2_CODE is required");
            document.getElementById("idTprodlvl2code").focus();
            return;
        }
        if (self.objPlan.PLAN_SALE_VAL_AT_PRICE === null) {
            GlobalHelper.Error("PLAN_SALE_VAL_AT_PRICE is required");
            document.getElementById("idTvalprice").focus();
            return;
        }


        //if ($("#datetimepicker2").datepicker().val() === "") {
        //    GlobalHelper.Error("ARC_DATE is required");
        //    self.objFootfall.ARC_DATE = null;
        //} else {
        //    self.objFootfall.ARC_DATE = $("#datetimepicker2").datepicker().val();
        //}
        $http.post(biApi + 'Plan/addPlan', self.objPLAN).success(function (response, status, headers, config) {
            if (status == 201) {
                self.onInit(1); //retrieve
                GlobalHelper.Success('PLAN Successfully Save!');
                self.objPLAN = "";
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
        self.objStoreMerch.SiteCode = site.SiteCode;
        self.objStoreMerch.SiteDesc = site.Description;
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
            url: biApi + "/PriceBand/SaveData",
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
