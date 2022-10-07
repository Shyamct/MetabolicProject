app.controller('medTHalfCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var tHalfId = 0;
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

    $scope.CheckTHalfMedicineExistence = function (id) {
        var params = {
            medicineId: id
        }
        dataFactory.CheckTHalfMedicineExistence(params).then(function (response) {
        }, function (error) {
            alert(error.data)
            $scope.ddlMedicine = -1;
        });
    }


    $scope.GetMedicineTHalf = function () {
        dataFactory.MedicineTHalfList().then(function (response) {
            var result = response.data;
            $scope.medicineTHalfList = result.medicineTHalf;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }


    $scope.SaveMedicineTHalf = function () {
        if ($scope.ddlMedicine == -1) {
            alert('Please Select Medicine');
            return false;
        }
        //if ($scope.txtMinTHalf == undefined || $scope.txtMinTHalf == "") {
        //    alert('Enter Min THalf Value');
        //    return false;
        //}
        //if ($scope.txtMaxTHalf == undefined || $scope.txtMaxTHalf == "") {
        //    alert('Enter Max THalf Value');
        //    return false;
        //}
        //if ($scope.ddlUnit == 0) {
        //    alert('Please Select Unit');
        //    return false;
        //}
        var params = {
            id: tHalfId,
            medicineId: $scope.ddlMedicine,
            minTHalf: $scope.txtMinTHalf,
            maxTHalf: $scope.txtMaxTHalf,
            unitId: $scope.ddlUnit,
            remark: $scope.txtRemark,
            bookId: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineTHalf(params).then(function (response) {
            var message = tHalfId > 0 ? 'Update Medicine THalf' : 'Save Medicine THalf';
            $rootScope.activityLog(response, message, 'Medicine THalf', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetMedicineTHalf();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.deleteMedicineTHalf = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineTHalf(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetMedicineTHalf();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Medicine THalf', 'Medicine THalf','');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        tHalfId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MedicineTHalfList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineTHalf;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.txtMinTHalf = list[0].minTHalf;
            $scope.txtMaxTHalf = list[0].maxTHalf;
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
        tHalfId = 0;
       // $scope.ddlMedicine = -1;
        $scope.txtMinTHalf = "";
        $scope.txtMaxTHalf = "";
        //$scope.ddlUnit = 0;
       // $scope.txtRemark = "";
        //$scope.ddlBook = 0;
        //$scope.txtPageNo = "";
       // $scope.txtEdition = "";
        //$scope.txtReference = "";
    };
    $scope.initControls();
    $scope.GetMedicineTHalf();
});