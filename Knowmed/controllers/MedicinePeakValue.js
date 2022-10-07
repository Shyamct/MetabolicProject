app.controller('medPeakValueCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var PeakValueId = 0;
    $scope.initControls = function () {
        dataFactory.InitControlsMedSideEffect().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

        dataFactory.UnitMasterOnlyTimeList().then(function (response) {
            var result = response.data;
            $scope.unitList = result.unitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.CheckPeakValueMedicineExistence = function (id) {
        var params = {
            medicineId: id
        }
        dataFactory.CheckPeakValueMedicineExistence(params).then(function (response) {
        }, function (error) {
            alert(error.data)
            $scope.ddlMedicine = -1;
        });
    }

    $scope.GetMedicinePeakValue = function () {
        dataFactory.MedicinePeakValueList().then(function (response) {
            var result = response.data;
            $scope.medicinePeakValueList = result.medicinePeakValue;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }


    $scope.SaveMedicinePeakValue = function () {
        if ($scope.ddlMedicine == -1) {
            alert('Please Select Medicine');
            return false;
        }
        //if ($scope.txtMinPeakValue == undefined || $scope.txtMinPeakValue == "") {
        //    alert('Enter Min Peak Value');
        //    return false;
        //}
        //if ($scope.txtMaxPeakValue == undefined || $scope.txtMaxPeakValue == "") {
        //    alert('Enter Max Peak Value');
        //    return false;
        //}
        //if ($scope.ddlUnit == 0) {
        //    alert('Please Select Unit');
        //    return false;
        //}
        var params = {
            id: PeakValueId,
            medicineId: $scope.ddlMedicine,
            minPeakValue: $scope.txtMinPeakValue,
            maxPeakValue: $scope.txtMaxPeakValue,
            unitId: $scope.ddlUnit,
            remark: $scope.txtRemark,
            bookId: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicinePeakValue(params).then(function (response) {
            var message = PeakValueId > 0 ? 'Update Medicine Peak Value' : 'Save Medicine Peak Value';
            $rootScope.activityLog(response, message, 'Medicine Peak Value', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetMedicinePeakValue();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.deleteMedicinePeakValue = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicinePeakValue(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetMedicinePeakValue();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Medicine Peak Value', ' Medicine Peak Value', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        PeakValueId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MedicinePeakValueList(params).then(function (response) {
            var result = response.data;
            var list = result.medicinePeakValue;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.txtMinPeakValue = list[0].minPeakValue;
            $scope.txtMaxPeakValue = list[0].maxPeakValue;
            $scope.ddlUnit = list[0].unitID;
            $scope.txtRemark = list[0].remark;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
            $scope.txtReference = list[0].reference;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        PeakValueId = 0;
       // $scope.ddlMedicine = -1;
        $scope.txtMinPeakValue = "";
        $scope.txtMaxPeakValue = "";
       // $scope.ddlUnit = 0;
       // $scope.txtRemark = "";
       // $scope.ddlBook = 0;
       // $scope.txtPageNo = "";
       // $scope.txtEdition = "";
       // $scope.txtReference = "";
    };
    $scope.initControls();
    $scope.GetMedicinePeakValue();
});