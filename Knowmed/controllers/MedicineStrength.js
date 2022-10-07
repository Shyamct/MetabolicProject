app.controller('medicineStrengthCtrl', function ($scope, dataFactory, toaster, $rootScope) {   
    var existId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineStrength().then(function (response) {
            var result = response.data;           
            $scope.medicineList = result.medicineList;
            $scope.dosageFormList = result.dosageFormList;
            $scope.unitList = result.unitList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.getMedicineStrength = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.MedicineStrengthList(params).then(function (response) {
            var result = response.data;
            $scope.medicineStrengthList = result.medicineStrengthList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveMedicineStrength = function () {
       
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        //if ($scope.ddlDosageForm == 0) { 
        //    toaster.pop('error', "Error", 'Please Select Dosage Form');
        //    return false;
        //}
        //if (isEmpty($scope.txtStrengthValue)) {
        //    toaster.pop('error', "Error", 'Please Enter Value');
        //    return false;
        //}

        var params = {
            id: existId,
            medicineID: $scope.ddlMedicine,
            doseFormID: $scope.ddlDosageForm,
            unitMasterID: $scope.ddlUnit,
            strengthValue: $scope.txtStrengthValue,
            remark: $scope.txtRemark,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)            
        };
        dataFactory.SaveMedicineStrength(params).then(function (response) {
            var message = existId > 0 ? 'Update Medicine Strength' : 'Save Medicine Strength';
            $rootScope.activityLog(response, message, 'Medicine Strength', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.getMedicineStrength();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineStrength(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.getMedicineStrength();
                $rootScope.activityLog(response, 'Delete Medicine Strength', ' Medicine Strength', '');
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
        dataFactory.MedicineStrengthList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineStrengthList;  
            $scope.ddlMedicine = list[0].medicineID
            $scope.ddlDosageForm = list[0].formID
            $scope.ddlUnit = list[0].unitID
            $scope.txtStrengthValue = list[0].strengthValue
            $scope.txtRemark = list[0].remark
            $scope.ddlBook = list[0].bookID
            $scope.txtPageNo = list[0].pageNo
            $scope.txtEdition = list[0].edition
            $scope.txtReference = list[0].reference
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
       // $scope.ddlMedicine = 0;
       // $scope.ddlDosageForm = 0;
        $scope.ddlUnit = 0;
        $scope.txtStrengthValue = '';
        //$scope.txtRemark = '';
       // $scope.ddlBook = 0;
       // $scope.txtPageNo = '';
       // $scope.txtEdition = '';
       // $scope.txtReference = '';
        existId = 0;
    };

    $scope.initControls();
    $scope.getMedicineStrength();
});