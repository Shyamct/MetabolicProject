app.controller('medTroughValueCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var troughId = 0;
    $scope.initControls = function () {
        dataFactory.InitControlsMedSideEffect().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

        dataFactory.UnitMasterDoseList().then(function (response) {
            var result = response.data;
            $scope.unitList = result.unitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });


        dataFactory.UnitMasterOnlyTimeList().then(function (response) {
            var result = response.data;
            $scope.unitTimeList = result.unitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };


    $scope.pMasterList = function () {
        dataFactory.ProblemMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemMasterList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }

    $scope.CheckTroughMedicineExistence = function (id) {
        var params = {
            medicineId: id
        };
        dataFactory.CheckTroughMedicineExistence(params).then(function (response) {
        }, function (error) {
            alert(error.data);
            $scope.ddlMedicine = -1;
            //  toaster.pop('error', "Error", error);
        });
    };


    $scope.GetMedicineTroughValue = function () {
        dataFactory.MedicineTroughValueList().then(function (response) {
            var result = response.data;
            $scope.medicineTroughValueList = result.medicineTroughValue;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.SaveMedicineTroughValue = function () {
        if ($scope.ddlMedicine == -1) {
            alert('Please Select Medicine');
            return false;
        }
        //if ($scope.txtMinTroughValue == undefined || $scope.txtMinTroughValue == "") {
        //    alert('Enter Min Trough Value');
        //    return false;
        //}        
        //if ($scope.txtMaxTroughValue == undefined || $scope.txtMaxTroughValue == "") {
        //    alert('Enter Max Trough Value');
        //    return false;
        //}
        //if ($scope.ddlUnit == 0) {
        //    alert('Please Select Unit');
        //    return false;
        //}
        
        var params = {
            id: troughId,
            medicineId: $scope.ddlMedicine,
            minTroughValue: $scope.txtMinTroughValue,
            maxTroughValue: $scope.txtMaxTroughValue,
            unitId: $scope.ddlUnit,
            remark: $scope.txtRemark,
            bookId: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            problemId: $scope.ddlProblem,
            doseFrom: $scope.txtDoseFrom,
            doseTo: $scope.txtDoseTo,
            doseUnitID: $scope.ddlDoseUnit,
            timeFrom: $scope.txtTimeFrom,
            timeTo: $scope.txtTimeTo,
            timeUnitID: $scope.ddlTimeUnit,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineTroughValue(params).then(function (response) {
            var message = troughId > 0 ? 'Update Medicine Trough Value' : 'Save Medicine Trough Value';
            $rootScope.activityLog(response, message, 'Medicine Trough Value', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetMedicineTroughValue();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.deleteMedicineTroughValue = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineTroughValue(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetMedicineTroughValue();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Medicine Trough Value', ' Medicine Trough Value', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        troughId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MedicineTroughValueList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineTroughValue;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.txtMinTroughValue = list[0].minTroughValue;
            $scope.txtMaxTroughValue = list[0].maxTroughValue;
            $scope.ddlUnit = list[0].unitId;
            $scope.txtRemark = list[0].remark;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
            $scope.txtReference = list[0].reference;
            $scope.ddlProblem = list[0].problemID,
            $scope.txtDoseFrom = list[0].doseFrom,
            $scope.txtDoseTo = list[0].doseTo,
            $scope.ddlDoseUnit = list[0].doseUnitID,
            $scope.txtTimeFrom = list[0].timeFrom,
            $scope.txtTimeTo = list[0].timeTo,
            $scope.ddlTimeUnit = list[0].timeUnitID
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        troughId = 0;
      //  $scope.ddlMedicine = -1;
        $scope.txtMinTroughValue = "";
        $scope.txtMaxTroughValue = "";
        //$scope.ddlUnit = 0;
       // $scope.txtRemark = "";
        //$scope.ddlBook = 0;
       // $scope.txtPageNo = "";
       // $scope.txtEdition = "";
       // $scope.txtReference = "";
        $scope.ddlProblem = -1;
        $scope.txtDoseFrom = "";
        $scope.txtDoseTo = "";
       // $scope.ddlDoseUnit = -1;
        $scope.txtTimeFrom = "";
        $scope.txtTimeTo = "";
        //$scope.ddlTimeUnit = -1;
    };
    $scope.initControls();
    $scope.GetMedicineTroughValue();
    $scope.pMasterList();
});