app.controller('medicineEliminationCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    $scope.isDisabled = false;
    var medicineEliminationId = 0;
    var arr = [];
    $scope.medicineEliminationList = "";
    $scope.addedMedicineEliminationList = "";
    $scope.initControls = function () {
        dataFactory.InitControlsMedicineElimination().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineMaster;
           
            $scope.bookList = result.bookMaster;
            $scope.eliminationList = result.eliminationMaster;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetMedicineElimination = function () {
        $scope.clr();
        var params = {
            id: medicineEliminationId
        };
        dataFactory.MedicineEliminationList(params).then(function (response) {
            var result = response.data;
            $scope.addedMedicineEliminationList = result.medicineMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AddMedicineElimination = function () {
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        //if ($scope.ddlElimination == 0) {
        //    toaster.pop('error', "Error", 'Please Select Elimination');
        //    return false;
        //}
        for (var i = 0; i < $scope.medicineEliminationList.length; i++) {
            if ($scope.medicineEliminationList[i].medicineId == $scope.ddlMedicine && $scope.medicineEliminationList[i].medicineEliminationID == $scope.ddlElimination) {
                toaster.pop('error', "Error", 'Elimination Already Added To This Medicine');
                return false;
            }          
        }
        for (var i = 0; i < $scope.addedMedicineEliminationList.length; i++) {
            if ($scope.addedMedicineEliminationList[i].medicineId == $scope.ddlMedicine && $scope.addedMedicineEliminationList[i].name == $scope.ddlElimination) {
                toaster.pop('error', "Error", 'Already Saved This Elimination  For This Medicine ');
                return false;
            }
        }
        arr.push({
            medicineId: $("#ddlMedicine").val(),
            medicineName: $("#ddlMedicine option:selected").text(),
            medicineEliminationID: $("#ddlElimination").val(),
            medicineEliminationName: $("#ddlElimination option:selected").text(),
        });
        $scope.medicineEliminationList = arr;
        $scope.medicineElimination = '';
    };
    $scope.deleteMedicineElimination = function (index) {
        $scope.medicineEliminationList.splice(index, 1);
    };
    $scope.saveMedicineElimination = function () {
       
        //if (medicineEliminationId > 0) {
        //    if ($scope.ddlMedicine == 0) {
        //        toaster.pop('error', "Error", 'Please Select Medicine');
        //        return false;
        //    }
        //    f($scope.ddlElimination == 0) {
        //        toaster.pop('error', "Error", 'Please Select Elimination');
        //        return false;
        //    }
        //}

        var params = {
            id: medicineEliminationId,
            medicineID: $scope.ddlMedicine,
            medicineEliminationID: $scope.ddlElimination,
            lstMedicineElimination: $scope.medicineEliminationList,
            bookID: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)           
        };       
        dataFactory.SaveMedicineElimination(params).then(function (response) {
            var message = medicineEliminationId > 0 ? 'Update Medicine Elimination' : 'Save Medicine Elimination';
            $rootScope.activityLog(response, message, 'Medicine Elimination', '');
            $scope.GetMedicineElimination();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
           
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
            dataFactory.DeleteMedicineElimination(params).then(function (response) {
                $scope.GetMedicineElimination();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Medicine Elimination', ' Medicine Elimination', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        $scope.medicineEliminationList.length = 0;
        $scope.medicineEliminationList = ''
        $scope.isDisabled = true;
        medicineEliminationId = paramid;
        var params = {
            id: paramid            
        };
        dataFactory.MedicineEliminationList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineMaster;
            $scope.ddlMedicine = list[0].medicineId;
            $scope.ddlElimination = list[0].eliminationId;
            $scope.ddlbookname = list[0].bookID;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.clr = function () {
       // $scope.medicineEliminationList.length = 0;
        $scope.medicineEliminationList=''
        $scope.medicineElimination = '';
        $scope.ddlElimination = 0;
        medicineEliminationId = 0;
        $scope.isDisabled = false;
    };
    $scope.initControls();
    $scope.GetMedicineElimination();
});