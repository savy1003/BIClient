
app.controller('ctrlStoreMerch', ['$stateParams', '$state', '$http', '$scope', '$rootScope', 'GlobalHelper', 'HttpErrorService', 'HttpSuccessService',
function ($stateParams, $state, $http, $scope, $rootScope, GlobalHelper, Notification, HttpErrorService, $AspCookie) {
    var self = this;
    self.listStoreMerch = true;
    self.itemsPerPage = 8;
    self.currentPage = 1;
    self.isTrade = false;
    self.showPrompt = false;
    self.strSearch = "";
    self.siteList = [];
  
    //lupong access
    $rootScope.onInitMenu('1');

    var clStoreMerch = function () {
        return {
            "ID": null,
            "STRMRGRP_DATE": null,
            "STORE_CODE": null,
            "PROD_LEVEL1_CODE": null,
            "PROD_LEVEL2_CODE": null,
            "PROD_LEVEL3_CODE": null,
            "PROD_LEVEL4_CODE": null,
            "SELLING_AREA": null,
            "TOTAL_AREA": null,
            "PERMENANT_FTE": null,
            "CONTRACT_FTE": null,
            "OTH_DET1": null,
            "OTH_DET2": null,
            "OTH_DET3": null,
            "OTH_DET4": null,
            "OTH_DET5": null,
            "ARC_DATE": null,
        }
    }

    $("#datetimepicker1,#datetimepicker2").datepicker({});

    self.onInit = function (ipage) {
        GlobalHelper.StartSpin();
        self.currentPage = ipage;
        $http.get(biApi + 'StoreMerch/getMerch?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search).success(function (response, status, headers, config) {
                console.log(response);
                if (!response.hasError) {
                    //self.console.log;
                    self.StoreMerchList = response.data;
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



    self.onEditMst = function (StoreMerch) {
        //self.disabledUserName = true;
        self.viewOnly = false;
        self.btnSave = false;
        self.btnUpdate = true;
        self.objStoreMerch.ID = StoreMerch.ID;
        self.objStoreMerch.STRMRGRP_DATE = StoreMerch.STRMRGRP_DATE;
        self.objStoreMerch.STORE_CODE = StoreMerch.STORE_CODE;
        self.objStoreMerch.PROD_LEVEL1_CODE = StoreMerch.PROD_LEVEL1_CODE;
        self.objStoreMerch.PROD_LEVEL2_CODE = StoreMerch.PROD_LEVEL2_CODE;
        self.objStoreMerch.PROD_LEVEL3_CODE = StoreMerch.PROD_LEVEL3_CODE;
        self.objStoreMerch.PROD_LEVEL4_CODE = StoreMerch.PROD_LEVEL4_CODE;
        self.objStoreMerch.SELLING_AREA = StoreMerch.SELLING_AREA;
        self.objStoreMerch.TOTAL_AREA = StoreMerch.TOTAL_AREA;
        self.objStoreMerch.PERMENANT_FTE = StoreMerch.PERMENANT_FTE;
        self.objStoreMerch.CONTRACT_FTE = StoreMerch.CONTRACT_FTE;
        self.objStoreMerch.OTH_DET1 = StoreMerch.OTH_DET1;
        self.objStoreMerch.OTH_DET2 = StoreMerch.OTH_DET2;
        self.objStoreMerch.OTH_DET3 = StoreMerch.OTH_DET3;
        self.objStoreMerch.OTH_DET4 = StoreMerch.OTH_DET4;
        self.objStoreMerch.OTH_DET5 = StoreMerch.OTH_DET5;
        self.objStoreMerch.ARC_DATE = StoreMerch.ARC_DATE;
        $rootScope.openModalForm('#modal-panelMaintenance');
       // self.loadInv(1, '');
    }

    self.Update = function () {
        if (self.objStoreMerch.ID === null) {
            GlobalHelper.Error("Id is required");
            document.getElementById("idID").focus();
            return;
        }
        if (self.objStoreMerch.STRMRGRP_DATE === null) {
            GlobalHelper.Error("STRMRGRP DATE is required");
            document.getElementById("idPDated").focus();
            return;
        }

        if (self.objStoreMerch.STORE_CODE === null) {
            GlobalHelper.Error("Store Code is required");
            document.getElementById("idStorecode").focus();
            return;
        }

        if (self.objStoreMerch.PROD_LEVEL1_CODE === null) {
            GlobalHelper.Error("PROD LEVEL1 CODE is required");
            document.getElementById("idPProd1").focus();
            return;
        }
        if (self.objStoreMerch.PROD_LEVEL2_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL2_CODE is required");
            document.getElementById("idPProd2").focus();
            return;
        }
        if (self.objStoreMerch.PROD_LEVEL3_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL3_CODE is required");
            document.getElementById("idPProd3").focus();
            return;
        }
        if (self.objStoreMerch.PROD_LEVEL4_CODE === null) {
            GlobalHelper.Error("PROD_LEVEL4_CODE is required");
            document.getElementById("idPProd4").focus();
            return;
        }
        if (self.objStoreMerch.SELLING_AREA === null) {
            GlobalHelper.Error("SELLING_AREA is required");
            document.getElementById("idSellArea").focus();
            return;
        }
        if (self.objStoreMerch.TOTAL_AREA === null) {
            GlobalHelper.Error("TOTAL_AREA is required");
            document.getElementById("idTotArea").focus();
            return;
        }
        if (self.objStoreMerch.PERMENANT_FTE === null) {
            GlobalHelper.Error("PERMENANT_FTE is required");
            document.getElementById("idPermFte").focus();
            return;
        }
        if (self.objStoreMerch.CONTRACT_FTE === null) {
            GlobalHelper.Error("CONTRACT_FTE is required");
            document.getElementById("idContFte").focus();
            return;
        }
        if (self.objStoreMerch.OTH_DET1 === null) {
            GlobalHelper.Error("OTH_DET1 is required");
            document.getElementById("idOth1").focus();
            return;
        }
        if (self.objStoreMerch.OTH_DET2 === null) {
            GlobalHelper.Error("OTH_DET2 is required");
            document.getElementById("idOth2").focus();
            return;
        }
        if (self.objStoreMerch.OTH_DET3 === null) {
            GlobalHelper.Error("OTH_DET3 is required");
            document.getElementById("idOth3").focus();
            return;
        }
        if (self.objStoreMerch.OTH_DET4 === null) {
            GlobalHelper.Error("OTH_DET4 is required");
            document.getElementById("idOth4").focus();
            return;
        }
        if (self.objStoreMerch.OTH_DET5 === null) {
            GlobalHelper.Error("OTH_DET5 is required");
            document.getElementById("idOth5").focus();
            return;
        }
        if (self.objStoreMerch.ARC_DATE === null) {
            GlobalHelper.Error("ARC_DATE is required");
            document.getElementById("idPArcDate").focus();
            return;
        }
        $http.post(biApi + 'StoreMerch/updateStoreMerch', self.objStoreMerch).success(function (response, status, headers, config) {
            if (status == 200) {
                self.onInit(1); //retrieve
                GlobalHelper.Success('Store Merch Successfully Updated!');
                $rootScope.closeModalForm('#modal-panelMaintenance');
            }
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
            GlobalHelper.StopSpin();
        });
        scope.$apply();
    }



    //self.SelectedMonth = function (pStoreMerch) {
     
    //    self.objStoreMerch.STRMRGRP_DATE = pStoreMerch.STRMRGRP_DATE
    //    if ($("#datetimepicker1").datepicker().val() === "") {
    //        GlobalHelper.Error("PLAN DATE is required");
    //        self.objStoreMerch.STRMRGRP_DATE = null;
    //    } else {
    //        self.objStoreMerch.STRMRGRP_DATE = $("#datetimepicker1").datepicker().val();
    //    }
    //    //self.processSearch();
    //    $rootScope.closeModalForm('#modal-panelMaintenance');
    //}

    self.processSearch = function () {
        if (self.objStoreMerch.SiteDesc === null) {
            GlobalHelper.Error("Store Code is required");
            document.getElementById("idSite").focus();
            return;
        }
        if (self.objStoreMerch.STRMRGRP_DATE === null) {
            GlobalHelper.Error("STRMRGRP DATE is required");
            document.getElementById("footfalldate").focus();
            return;
        }
        $http.get(biApi + 'StoreMerch/getStoreMerchByDate?&pg=' + self.currentPage + '&tk=' + self.itemsPerPage + '&fnd=' + $rootScope.search + '&pSite=' + self.objStoreMerch.SiteCode + '&sStoreMerchdate=' + self.objStoreMerch.STRMRGRP_DATE)
        .success(function (response, status, headers, config) {
            console.log(response.data);
            if (!response.hasError) {
                
                self.StoreMerchList1 = response.data;
                self.totalmerch = response.totalCount;
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
    self.onAdd = function () {
        self.viewOnly = false;
        self.listStoreMerch = false;
        self.btnSave = true;
        self.btnUpdate = false;
        self.objStoreMerch = new clStoreMerch();
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
            url: biApi + "/StoreMerch/SaveData",
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
