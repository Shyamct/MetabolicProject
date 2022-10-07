app.controller('medicineBrandCountryAssignCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    var updateBrandID = 0;
    $scope.models = {
        selected: null,
        lists: { "All": [], "Assigned": [] }
    };

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineBrandCountryAssign().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineMasterList;
            $scope.countryList = result.countryMasterList;
            $scope.bookList = result.bookMasterList;
            $scope.insert = true;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getBrands = function (a) {
        $scope.models.lists.All = [];
        if (a == '1') {
            $scope.models.lists.Assigned = [];
        }
        var params = {
            medicineID: $scope.ddlMedicine
        };
        dataFactory.GetAssignMedicineBrandList(params).then(function (response) {
            var result = response.data;
            $scope.medicineBrandList = result.medicineBrandList;
            if ($scope.medicineBrandList.length > 0) {

                for (var index = 0; index < $scope.medicineBrandList.length; index++) {
                    $scope.models.lists.All.push({
                        brandID: $scope.medicineBrandList[index].id,
                        brandName: $scope.medicineBrandList[index].brandName
                    });
                }
                if ($scope.models.lists.Assigned.length > 0) {
                    for (var j = 0; j < $scope.models.lists.Assigned.length; j++) {
                        if ($scope.models.lists.All.length > 0) {
                            for (var k = 0; k < $scope.models.lists.All.length; k++) {
                                if ($scope.models.lists.Assigned[j].brandName == $scope.models.lists.All[k].brandName) {
                                    $scope.models.lists.All.splice(k, 1);
                                }
                            }
                        }
                    }
                }
            }
            $scope.MedicineBrandCountryList();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getCountryMedicineBrands = function () {
        $scope.getBrands();
        $scope.models.lists.Assigned = [];
        $scope.models.lists.All = [];
        
        var params = {
            medicineID: $scope.ddlMedicine,
            countryID: $scope.ddlCountry
        };
        dataFactory.GetAssignMedicineBrandList(params).then(function (response) {
            var result = response.data;
            $scope.medicineBrandList = result.medicineBrandList;

            if ($scope.ddlCountry > 0) {
                if ($scope.medicineBrandList.length > 0) {                  
                    for (var j = 0; j < $scope.medicineBrandList.length; j++) {
                        $scope.models.lists.Assigned.push({
                            brandID: $scope.medicineBrandList[j].id,
                            brandName: $scope.medicineBrandList[j].brandName
                        });
                    }
                    if ($scope.models.lists.All.length > 0) {
                        for (var k = 0; k < $scope.medicineBrandList.length; k++) {
                            for (var l = 0; l < $scope.models.lists.All.length; l++) {
                                if ($scope.medicineBrandList[k].brandName == $scope.models.lists.All[l].brandName) {
                                    $scope.models.lists.All.splice(l, 1);
                                }
                            }
                        }
                    }
                }
            }
            else {
                $scope.models.lists.Assigned = [];
                $scope.models.lists.All = [];
               
                if ($scope.medicineBrandList.length > 0) {                     
                    for (var m = 0; m < $scope.medicineBrandList.length; m++) {
                        $scope.models.lists.All.push({
                            brandID: $scope.medicineBrandList[m].id,
                            brandName: $scope.medicineBrandList[m].brandName
                        });
                    }
                }
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.addMedicineBrand = function () {

        if (isEmpty($scope.txtBrandName)) {
            toaster.pop('error', "Error", 'Please Enter Brand Name');
            return false;
        }
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        for (var n = 0; n < $scope.models.lists.All.length; n++) {
            if ($scope.models.lists.All[n].brandName == $scope.txtBrandName) {
                toaster.pop('error', "Error", 'Already Saved This Brand Name For This Medicine !!');
                return false;
            }
        }
        var params = {
            medicineID: $scope.ddlMedicine,
            brandName: $scope.txtBrandName,
            remark: $scope.txtRemark,
            bookID: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineBrandList(params).then(function (response) {
            $scope.clearMedicineBrand();
            $scope.getBrands();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.updateMedicineBrand = function () {

        if (updateBrandID == 0) {
            toaster.pop('error', "Error", 'Please Select Brand Name');
            return false;
        }
        if (isEmpty($scope.txtBrandName)) {
            toaster.pop('error', "Error", 'Please Enter Brand Name');
            return false;
        }
        var params = {
            id: updateBrandID,
            medicineID: $scope.ddlMedicine,
            brandName: $scope.txtBrandName,
            remark: $scope.txtRemark,
            bookID: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.updateMedicineBrandList(params).then(function (response) {
            $scope.clearMedicineBrand();
            $scope.getBrands();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    //$scope.updateMedicineBrand = function () {

    //    if (updateBrandID == 0) {
    //        toaster.pop('error', "Error", 'Please Select Brand Name');
    //        return false;
    //    }
    //    if ($scope.txtBrandName == '') {
    //        toaster.pop('error', "Error", 'Please Enter Brand Name');
    //        return false;
    //    }

    //    var params = {
    //        updateBrandID: updateBrandID,
    //        brandName: $scope.txtBrandName,

    //        userID: Number(UtilsCache.getSession('USERDETAILS').userid)
    //    };
    //    dataFactory.updateMedicineBrandList(params).then(function (response) {
    //        $scope.clearMedicineBrand();
    //        $scope.getBrands();
    //        toaster.pop('success', "Success", 'Update Successfully.');
    //    }, function (error) {
    //        toaster.pop('error', "Error", error.data);
    //    });
    //};

    $scope.MedicineBrandCountryList = function () {

        var params = {
            medicineID: $scope.ddlMedicine,
            countryID: $scope.ddlCountry
        };
        dataFactory.MedicineBrandCountryDetailList(params).then(function (response) {
            var result = response.data;
            $scope.medicineBrandCountryDetailList = result.medicineBrandCountryDetailList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.Save = function () {
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        //if ($scope.ddlCountry == 0) {
        //    toaster.pop('error', "Error", 'Please Select Country');
        //    return false;
        //}
        if ($scope.models.lists.Assigned.length < 1) {
            toaster.pop('error', "Error", 'Please Assign Medicine Brand');
            return false;
        }
        var params = {
            medicineID: $scope.ddlMedicine,
            countryID: $scope.ddlCountry,
            lstAssignedMedicineBrand: $scope.models.lists.Assigned,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveAssignMedicineBrand(params).then(function (response) {
            var message = updateBrandID > 0 ? 'UPDATE Assign Medicine Brand ' : 'SAVE Assign Medicine Brand ';
            $rootScope.activityLog(response, message, 'Assign Medicine Brand ', '');
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.MedicineBrandCountryList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        updateBrandID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MedicineBrandList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineMaster;
            $scope.ddlMedicine = list[0].medicineId;
            $scope.txtBrandName = list[0].name;
            $scope.txtRemark = list[0].remark;
            $scope.ddlbookname = list[0].bookID;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;

            $scope.insert = false;
            $scope.update = true;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });


        //$scope.txtBrandName = paramName;
        //updateBrandID = paramid;
        //$scope.insert = false;
        //$scope.update = true;        
    };

    $scope.DeleteAssignMedicineBrand = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteAssignMedicineBrand(params).then(function (response) {
                $scope.clr();
                $scope.MedicineBrandCountryList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Assign Medicine Brand', 'Assign Medicine Brand', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.deleteMedicineBrand = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineBrand(params).then(function (response) {
                $scope.clearMedicineBrand();
                $scope.getBrands();
                $scope.MedicineBrandCountryList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Assign Medicine Brand 2', 'Assign Medicine Brand 2', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {
        $scope.models.lists.Assigned = [];
        $scope.ddlCountry = 0;
        $scope.txtBrandName = '';
        $scope.getBrands();
        updateBrandID = 0;
    };

    $scope.clearMedicineBrand = function () {
        $scope.txtBrandName = '';
        updateBrandID = 0;
        $scope.insert = true;
        $scope.update = false;
        $scope.txtRemark = '';
        // $scope.ddlbookname = 0;
        // $scope.txtpageno = '';
        // $scope.txtedition = '';
    };

    $scope.initControls();
    //$scope.MedicineBrandCountryList();
});