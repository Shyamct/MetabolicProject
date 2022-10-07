app.controller('medicineSupplementCtrl', function ($scope, dataFactory, toaster, $state, $rootScope) {
    var existId = 0;
    var arr = [];
    $scope.addedNutrientList = [];

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineSupplement().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.unitList = result.unitList;
            $scope.nutrientList = result.nutrientList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.getMedicineSupplementList = function () {
        var params = {
            id: existId
        };
        dataFactory.MedicineSupplementList(params).then(function (response) {
            var result = response.data;
            $scope.medicineSupplementList = result.medicineSupplementList;
            for (var i = 0; i < result.medicineSupplementList.length; i++) {
                $scope.medicineSupplementList[i].nutrientList = JSON.parse(result.medicineSupplementList[i].nutrientList);
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getMedicineBrandList = function () {
        var params = {
            medicineID: $scope.ddlMedicine
        };
        dataFactory.GetMedicineBrandList(params).then(function (response) {
            var result = response.data;
            $scope.medicineBrandList = result.medicineBrandList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddNutrient = function () {
        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }       
        if (arr.length > 0) {
            //if (arr.some(data => (data.nutrientID == $scope.ddlNutrient && data.nutrientQuantity == $scope.txtNutrientQuantity && data.quantityUnitID == $scope.ddlQuantityUnitID))) {
            if (arr.some(data => (data.nutrientID == $scope.ddlNutrient))) {
                toaster.pop('error', "Error", 'Already Exists');
                return false;
            }
        }
        arr.push({
            nutrientID: $("#ddlNutrient").val(),
            nutrientName: $("#ddlNutrient option:selected").text().trim(),
            nutrientQuantity: $("#txtNutrientQuantity").val(),
            quantityUnitID: $("#ddlQuantityUnitID").val() == '0' ? null : $("#ddlQuantityUnitID").val(),
            quantityUnitName: $("#ddlQuantityUnitID").val() == '0' ? null : $("#ddlQuantityUnitID option:selected").text().trim(),
        });
        $scope.addedNutrientList = arr;

    }
    $scope.removeNutrient = function (index) {
        $scope.addedNutrientList.splice(index, 1);
    };

    $scope.saveMedicineSupplement = function () {

        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        var params = {
            id: existId,
            medicineID: $scope.ddlMedicine,
            medicineBrandID: $scope.ddlMedicineBrand,
            medicineDose: $scope.txtMedicineDose,
            doseUnitID: $scope.ddlDoseUnitID,
            nutrientID: $scope.ddlNutrient,
            nutrientQuantity: $scope.txtNutrientQuantity,
            quantityUnitID: $scope.ddlQuantityUnitID,
            nutrientList: JSON.stringify($scope.addedNutrientList),
            reference: $scope.txtReference,
            remark: $scope.txtRemark,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineSupplement(params).then(function (response) {


            var message = existId > 0 ? 'Update Medicine Supplement' : 'Save Medicine Supplement';
            $rootScope.activityLog(response, message, 'Medicine Supplement', '');

            $scope.clr();
            $scope.getMedicineSupplementList();
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
            dataFactory.DeleteMedicineSupplement(params).then(function (response) {
                $scope.clr();
                $scope.getMedicineSupplementList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Medicine Supplement', ' Medicine Supplement', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.deleteNutrient = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteNutrient(params).then(function (response) {
                $scope.clr();
                $scope.getMedicineSupplementList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        existId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MedicineSupplementList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineSupplementList;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.getMedicineBrandList();
            $scope.ddlMedicineBrand = list[0].brandID;
            $scope.txtMedicineDose = list[0].dose;
            $scope.ddlDoseUnitID = list[0].unitID;
            $scope.txtReference = list[0].reference;
            $scope.txtRemark = list[0].remark;

            for (var i = 0; i < result.medicineSupplementList.length; i++) {
                arr = JSON.parse(result.medicineSupplementList[i].nutrientList);
            }
            if (arr == null) {
                arr = [];
            }
            $scope.addedNutrientList = arr;

            $('#ddlNutrient').focus();

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {
        existId = 0;
        arr = [];
        arr.length = 0;
        $scope.addedNutrientList = [];
        $scope.ddlDoseUnitID = 0;
        $scope.ddlNutrient = 0;
        $scope.txtNutrientQuantity = '';
        $scope.ddlQuantityUnitID = 0;       
    };

    $scope.initControls();
    $scope.getMedicineSupplementList();
});