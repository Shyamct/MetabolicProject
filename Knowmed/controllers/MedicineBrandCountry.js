app.controller('medicineBrandCountryCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    $scope.isDisabled = false;
    var medicineBrandCountryId = 0;
    var arr = [];
    $scope.medicineBrandCountryList = "";
    $scope.addedmedicineBrandCountryList = "";
    $scope.initControls = function () {
        dataFactory.InitControlsMedicineBrandCountry().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineMaster;
            $scope.countryList = result.countryMaster;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getBrand = function (medicineID) {
       
        var params = {
            medicineID: medicineID
        };
        dataFactory.MedicineBrandGetList(params).then(function (response) {
            var result = response.data;
            $scope.brandList = result.medicineBrand;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.addedCountry = function (medicineID) {
        $scope.clr();
        var params = {
            medicineID: medicineID
        };
        dataFactory.MedicineBrandCountryList(params).then(function (response) {
            var result = response.data;
            $scope.addedmedicineBrandCountryList = result.medicineBrandCountry;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AddMedicineBrandCountry = function () {
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        if ($scope.ddlBrand == 0) {
            toaster.pop('error', "Error", 'Please Select Brand');
            return false;
        }
        if ($scope.ddlCountry == 0) {
            toaster.pop('error', "Error", 'Please Select Country');
            return false;
        }

        for (var i = 0; i < $scope.medicineBrandCountryList.length; i++) {
            if ($scope.medicineBrandCountryList[i].medicineID == $scope.ddlMedicine && $scope.medicineBrandCountryList[i].brandID == $scope.ddlBrand && $scope.medicineBrandCountryList[i].countryID == $scope.ddlCountry) {
                toaster.pop('error', "Error", "Country Already Added To This Medicine's Brand");
                return false;
            }
          
        }
        for (var i = 0; i < $scope.addedmedicineBrandCountryList.length; i++) {
            if ($scope.addedmedicineBrandCountryList[i].medicineID == $scope.ddlMedicine && $scope.addedmedicineBrandCountryList[i].brandID == $scope.ddlBrand && $scope.addedmedicineBrandCountryList[i].countryID == $scope.ddlCountry) {
                toaster.pop('error', "Error", 'Already Saved This Brand Name For This Medicine ');
                return false;
            }
        }
        arr.push({
            medicineID: $("#ddlMedicine").val(),
            medicineName: $("#ddlMedicine option:selected").text(),
            brandID: $("#ddlBrand").val(),
            brandName: $("#ddlBrand option:selected").text(),
            countryID: $("#ddlCountry").val(),
            countryName: $("#ddlCountry option:selected").text()
        });
        $scope.medicineBrandCountryList = arr;
    };
    $scope.deletemedicineBrandCountry = function (index) {
        $scope.medicineBrandCountryList.splice(index, 1);
    };
    $scope.saveMedicineBrandCountry = function () {

        if (medicineBrandCountryId == 0)
        {
            if ($scope.ddlMedicine == 0) {
                toaster.pop('error', "Error", 'Please Select Medicine');
                return false;
            }
            if ($scope.medicineBrand == '') {
                toaster.pop('error', "Error", 'Please Enter Brand Name');
                return false;
            }
        }
        var params = {
            id: medicineBrandCountryId,
            medicineID: $scope.ddlMedicine,
            brandID: $scope.ddlBrand,
            countryID: $scope.ddlCountry,
            remark: $scope.txtRemark,
            lstMedicineBrandCountry: $scope.medicineBrandCountryList,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
       
        dataFactory.SaveMedicineBrandCountry(params).then(function (response) {
            var message = medicineBrandCountryId > 0 ? 'UPDATE Medicine Brand Country' : 'SAVE Medicine Brand Country';
            $rootScope.activityLog(response, message, 'Medicine Brand Country', '');
            $scope.addedCountry($scope.ddlMedicine);
            toaster.pop('success', "Success", 'Saved Successfully.');           
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineBrandCountry(params).then(function (response) {
                $scope.addedCountry($scope.ddlMedicine);
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Medicine Brand Country', 'Medicine Brand Country', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        medicineBrandCountryId = paramid;
        $scope.isDisabled = true;
        var params = {
            id: paramid
        };
        dataFactory.MedicineBrandCountryList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineBrandCountry;           
            $scope.ddlMedicine = list[0].medicineID;
            $scope.getBrand($scope.ddlMedicine);
            $scope.ddlBrand = list[0].brandID;
            $scope.ddlCountry = list[0].countryID;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.medicineBrandCountryList.length = 0;
        $scope.ddlBrand = 0;
        $scope.ddlCountry = 0;
        $scope.txtRemark = '';
        medicineBrandCountryId = 0;
        $scope.isDisabled = false;
    };
    $scope.initControls();
    //$scope.addedCountry();
});