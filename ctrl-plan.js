
app.controller('ctrlPlan', ['$stateParams', '$state', '$http', '$scope', '$rootScope', 'GlobalHelper', 'HttpErrorService', 'HttpSuccessService',
function ($stateParams, $state, $http, $scope, $rootScope, GlobalHelper, Notification, HttpErrorService, $AspCookie) {
    var self = this;
    self.listPlan = true;
    self.listPlansearch = false;
    self.PlansearchList = true;
    self.itemsPerPage = 8;
    self.currentPage = 0;
    self.currentPageSearch = 1;
    self.isTrade = false;
    self.showPrompt = false;
    self.strSearch = "";
    self.siteList = [];
  
    //lupong access
    $rootScope.onInitMenu('1');

    var clPlan = function () {
        return {
            "ID":null,
            "PLAN_DATE": null,
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
            "PLAN_VERSION": null,
            "PLAN_SALE_QTY": null,
            "PLAN_SALE_VAL_AT_PRICE": null,
            "PLAN_SALE_VAL_AT_COST": null,
            "PLAN_MARKDOWN_QTY": null,
            "PLAN_MARKDOWN_VAL": null,
            "PLAN_SHRINKAGE_VAL": null,
            "PLAN_PURCHASE_QTY": null,
            "PLAN_PURCHASE_VAL": null,
            "PLAN_INV_OPENING_QTY": null,
            "PLAN_OPENING_VAL_AT_COST": null,
            "PLAN_OPENING_VAL_AT_PRICE": null,
            "PLAN_OTH1": null,
            "PLAN_OTH2": null,
            "PLAN_OTH3": null,
            "PLAN_OTH4": null,
            "PLAN_OTH5": null,
            "ARC_DATE": null,
        }
    }

    $("#datetimepicker1,#datetimepicker2").datepicker({});

    self.onInit = function (ipage) {
        GlobalHelper.StartSpin();
        self.currentPage = ipage;
        $http.get(biApi + 'Plan/getPlan?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search).success(function (response, status, headers, config) {
            console.log(response);
            if (!response.hasError) {
                //self.console.log;
                self.PlanList = response.data;
                self.totalCountAll = response.totalCount;
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
    }

    var Month = 
    {
        january: "2017-01-01T00:00:00",
        february: "2017-02-01T00:00:00",
        march: "2017-03-01T00:00:00",
        april: "2017-04-01T00:00:00",
        may: "2017-05-01T00:00:00",
        june: "2017-06-01T00:00:00",
        july: "2017-07-01T00:00:00",
        august: "2017-08-01T00:00:00",
        september: "2017-09-01T00:00:00",
        october: "2017-10-01T00:00:00",
        november: "2017-11-01T00:00:00",
        december: "2017-12-01T00:00:00",
    };
    $scope.Month = Month;

    self.onEditMst = function (pPlan) {
        //self.disabledUserName = true;
        self.viewOnly = false;
        self.btnSave = false;
        self.btnUpdate = true;
        self.objPlan.ID = pPlan.ID;
        self.objPlan.PLAN_DATE = pPlan.PLAN_DATE;
        self.objPlan.GEO_LEVEL1_CODE = pPlan.GEO_LEVEL1_CODE;
        self.objPlan.GEO_LEVEL2_CODE = pPlan.GEO_LEVEL2_CODE;
        self.objPlan.GEO_LEVEL3_CODE = pPlan.GEO_LEVEL3_CODE;
        self.objPlan.STORE_CODE = pPlan.STORE_CODE;
        self.objPlan.PROD_LEVEL1_CODE = pPlan.PROD_LEVEL1_CODE;
        self.objPlan.PROD_LEVEL2_CODE = pPlan.PROD_LEVEL2_CODE;
        self.objPlan.PROD_LEVEL3_CODE = pPlan.PROD_LEVEL3_CODE;
        self.objPlan.PROD_LEVEL4_CODE = pPlan.PROD_LEVEL4_CODE;
        self.objPlan.PROD_LEVEL5_CODE = pPlan.PROD_LEVEL5_CODE;
        self.objPlan.PRODUCT_CODE = pPlan.PRODUCT_CODE;
        self.objPlan.PLAN_VERSION = pPlan.PLAN_VERSION;
        self.objPlan.PLAN_SALE_QTY = pPlan.PLAN_SALE_QTY;
        self.objPlan.PLAN_SALE_VAL_AT_PRICE = pPlan.PLAN_SALE_VAL_AT_PRICE;
        self.objPlan.PLAN_SALE_VAL_AT_COST = pPlan.PLAN_SALE_VAL_AT_COST;
        self.objPlan.PLAN_MARKDOWN_QTY = pPlan.PLAN_MARKDOWN_QTY;
        self.objPlan.PLAN_MARKDOWN_VAL = pPlan.PLAN_MARKDOWN_VAL;
        self.objPlan.PLAN_SHRINKAGE_VAL = pPlan.PLAN_SHRINKAGE_VAL;
        self.objPlan.PLAN_PURCHASE_QTY = pPlan.PLAN_PURCHASE_QTY;
        self.objPlan.PLAN_PURCHASE_VAL = pPlan.PLAN_PURCHASE_VAL;
        self.objPlan.PLAN_INV_OPENING_QTY = pPlan.PLAN_INV_OPENING_QTY;
        self.objPlan.PLAN_OPENING_VAL_AT_COST = pPlan.PLAN_OPENING_VAL_AT_COST;
        self.objPlan.PLAN_OPENING_VAL_AT_PRICE = pPlan.PLAN_OPENING_VAL_AT_PRICE;
        self.objPlan.PLAN_OTH1 = pPlan.PLAN_OTH1;
        self.objPlan.PLAN_OTH2 = pPlan.PLAN_OTH2;
        self.objPlan.PLAN_OTH3 = pPlan.PLAN_OTH3;
        self.objPlan.PLAN_OTH4 = pPlan.PLAN_OTH4;
        self.objPlan.PLAN_OTH5 = pPlan.PLAN_OTH5;
        self.objPlan.ARC_DATE = pPlan.ARC_DATE;
        $rootScope.openModalForm('#modal-panelMaintenance');
        self.loadInv(1, '');
    }

    self.Update = function () {
        if (self.objPlan.ID === null) {
            GlobalHelper.Error("Id is required");
            document.getElementById("idID").focus();
            return;
        }
        if (self.objPlan.PLAN_DATE === null) {
            GlobalHelper.Error("Plan Date is required");
            document.getElementById("idPDate").focus();
            return;
        }

        if (self.objPlan.GEO_LEVEL1_CODE === null) {
            GlobalHelper.Error("Geo Level1 Code is required");
            document.getElementById("idPGeo1").focus();
            return;
        }

        if (self.objPlan.GEO_LEVEL2_CODE === null) {
            GlobalHelper.Error("Geo Level2 Code is required");
            document.getElementById("idPGeo2").focus();
            return;
        }

        if (self.objPlan.GEO_LEVEL3_CODE=== null) {
            GlobalHelper.Error("Geo Level3 Code is required");
            document.getElementById("idPGeo3").focus();
            return;
        }

        if (self.objPlan.STORE_CODE === null) {
            GlobalHelper.Error("Store Code is required");
            document.getElementById("idPStore").focus();
            return;
        }

        if (self.objPlan.PROD_LEVEL1_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL1_CODE is required");
            document.getElementById("idPProd1").focus();
            return;
        }
        if (self.objPlan.PROD_LEVEL2_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL2_CODE is required");
            document.getElementById("idPProd2").focus();
            return;
        }
        if (self.objPlan.PROD_LEVEL3_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL3_CODE is required");
            document.getElementById("idPProd3").focus();
            return;
        }
        if (self.objPlan.PROD_LEVEL4_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL4_CODE is required");
            document.getElementById("idPProd4").focus();
            return;
        }
        if (self.objPlan.PROD_LEVEL5_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL5_CODE is required");
            document.getElementById("idPProd5").focus();
            return;
        }
        if (self.objPlan.PRODUCT_CODE === null) {
            GlobalHelper.Error("PRODUCT_CODE is required");
            document.getElementById("idPProduct").focus();
            return;
        }
        if (self.objPlan.PLAN_VERSION === null) {
            GlobalHelper.Error("PLAN_VERSION is required");
            document.getElementById("idPProduct").focus();
            return;
        }
        if (self.objPlan.PLAN_SALE_QTY === null) {
            GlobalHelper.Error("PLAN_SALE_QTY is required");
            document.getElementById("idPSaleQty").focus();
            return;
        }
        if (self.objPlan.PLAN_SALE_VAL_AT_PRICE === null) {
            GlobalHelper.Error("PLAN_SALE_VAL_AT_PRICE is required");
            document.getElementById("idPSaleVatPrice").focus();
            return;
        }
        if (self.objPlan.PLAN_SALE_VAL_AT_COST === null) {
            GlobalHelper.Error("PLAN_SALE_VAL_AT_COST is required");
            document.getElementById("idPSaleVatCost").focus();
            return;
        }
        if (self.objPlan.PLAN_MARKDOWN_QTY === null) {
            GlobalHelper.Error("PLAN_MARKDOWN_QTY is required");
            document.getElementById("idPMarkdownQty").focus();
            return;
        }
        if (self.objPlan.PLAN_MARKDOWN_VAL === null) {
            GlobalHelper.Error("PLAN_MARKDOWN_VAL is required");
            document.getElementById("idPMarkdownVal").focus();
            return;
        }
        if (self.objPlan.PLAN_SHRINKAGE_VAL === null) {
            GlobalHelper.Error("PLAN_SHRINKAGE_VAL is required");
            document.getElementById("idPShrinkVal").focus();
            return;
        }
        if (self.objPlan.PLAN_PURCHASE_QTY === null) {
            GlobalHelper.Error("PLAN_PURCHASE_QTY is required");
            document.getElementById("idPPurchaseQty").focus();
            return;
        }
        if (self.objPlan.PLAN_PURCHASE_VAL === null) {
            GlobalHelper.Error("PLAN_PURCHASE_VAL is required");
            document.getElementById("idPPurchaseVal").focus();
            return;
        }
        if (self.objPlan.PLAN_INV_OPENING_QTY === null) {
            GlobalHelper.Error("PLAN_INV_OPENING_QTY is required");
            document.getElementById("idPInvOpenQty").focus();
            return;
        }
        if (self.objPlan.PLAN_OPENING_VAL_AT_COST === null) {
            GlobalHelper.Error("PLAN_OPENING_VAL_AT_COST is required");
            document.getElementById("idPOpenValCost").focus();
            return;
        }
        if (self.objPlan.PLAN_OPENING_VAL_AT_PRICE === null) {
            GlobalHelper.Error("PLAN_OPENING_VAL_AT_PRICE is required");
            document.getElementById("idPOpenValPrice").focus();
            return;
        }
        if (self.objPlan.PLAN_OTH1 === null) {
            GlobalHelper.Error("PLAN_OTH1 is required");
            document.getElementById("idPOth1").focus();
            return;
        }
        if (self.objPlan.PLAN_OTH2 === null) {
            GlobalHelper.Error("PLAN_OTH2 is required");
            document.getElementById("idPOth2").focus();
            return;
        }
        if (self.objPlan.PLAN_OTH3 === null) {
            GlobalHelper.Error("PLAN_OTH3 is required");
            document.getElementById("idPOth3").focus();
            return;
        }
        if (self.objPlan.PLAN_OTH4 === null) {
            GlobalHelper.Error("PLAN_OTH4 is required");
            document.getElementById("idPOth4").focus();
            return;
        }
        if (self.objPlan.PLAN_OTH5 === null) {
            GlobalHelper.Error("PLAN_OTH5 is required");
            document.getElementById("idPOth5").focus();
            return;
        }
        if (self.objPlan.ARC_DATE === null) {
            GlobalHelper.Error("ARC_DATE is required");
            document.getElementById("idPArcDate").focus();
            return;
        }
        $http.post(biApi + 'Plan/updatePlan', self.objPlan).success(function (response, status, headers, config) {
            if (status == 200) {
                self.onInit(1); //retrieve
                GlobalHelper.Success('Plan Successfully Updated!');
                $rootScope.closeModalForm('#modal-panelMaintenance');
            }
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
            GlobalHelper.StopSpin();
        });
    }


    //self.search = function () {
    //    //self.invListTxt = "";
    //    if ($("#datetimepicker1").datepicker().val() === "") {
    //        GlobalHelper.Error("PLAN DATE is required");
    //        self.objPlan.PLAN_DATE = null;
    //    } else {
    //        self.objPlan.PLAN_DATE = $("#datetimepicker1").datepicker().val();
    //    }
    //    $rootScope.openModalForm('#modal-panelMaintenance1');
    //    self.loadInv(1, '');
    //}
    self.SelectedMonth = function (pPlan) {
     
        self.objPlan.PLAN_DATE === pPlan.PLAN_DATE;
        if ($("#datetimepicker1").datepicker().val() === "") {
            GlobalHelper.Error("PLAN DATE is required");
            self.objPlan.PLAN_DATE = null;
        } else {
            self.objPlan.PLAN_DATE = $("#datetimepicker1").datepicker().val();
        }
        //self.processSearch();
        $rootScope.closeModalForm('#modal-panelMaintenance');
    }

    self.processSearch = function () {
        
        if (self.objPlan.SiteDesc === null) {
            GlobalHelper.Error("Store Code is required");
            document.getElementById("idSite").focus();
            return;
        }
        if (self.objPlan.PLAN_DATE === null) {
            GlobalHelper.Error("Plan Date is required");
            document.getElementById("footfalldate").focus();
            return;
        }
        //self.currentPage = ipage;
        $http.get(biApi + 'Plan/getPlanByDate?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&pSite=' + $rootScope.store + '&pPlandate=' + $rootScope.date)
        .success(function (response, status, headers, config) {
            console.log(response);
            if (!response.hasError) {
                //self.currentPage = 0;
                self.PlanList1 = response.data;
                self.totalCountPlan = response.total_Count;
                //self.listPlan = false;
                //self.sumInv = response.data2;
                
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

    self.SearchPlan = function () {
        $rootScope.date = self.objPlan.PLAN_DATE;
        $rootScope.store = self.objPlan.SiteCode;
        self.processSearch(self.currentPage);
    }
    self.refresh = function () {
        self.objPlan.PLAN_DATE = "";
        self.objPlan.PLAN_DATE = "";
        $rootScope.date = self.objPlan.PLAN_DATE;
        $rootScope.store = self.objPlan.SiteCode;
        self.onInit(self.currentPage);

    }

    self.SearchInv = function () {
        self.loadInv(1, self.invListTxt);
    }
    self.onAdd = function () {
        self.viewOnly = false;
        self.listPlan = false;
        self.listPlansearch = true
        //self.PlansearchList = true;
        self.btnSave = true;
        self.btnUpdate = false;
        self.objPlan = new clPlan();
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
        self.objPlan.SiteCode = site.SiteCode;
        self.objPlan.SiteDesc = site.Description;
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
            url: biApi + "/Plan/SaveData",
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
