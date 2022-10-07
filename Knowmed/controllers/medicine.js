app.controller('medicineCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, ASSETS) {
    var medicineId = 0;

    $scope.initControls = function () {
        dataFactory.initControlsMedicine().then(function (response) {
            var result = response.data;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.GetMedicineMasterList = function () {
        var params = {
            //medicineName: $scope.txtMedicineName
        };
        dataFactory.medicineMasterList(params).then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.saveMedicineMaster = function () {
        if ($scope.txtMedicineName == null || $scope.txtMedicineName == "") {
            alert('Please Enter Medicine Name');
            return false;
        }
        var params = {
            medicineID: medicineId,
            medicineName: $scope.txtMedicineName,
            remark: $scope.txtRemark,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveMedicineMaster(params).then(function (response) {
            var message = medicineId > 0 ? 'UPDATE Medicine Master' : 'SAVE Medicine Master';
            $rootScope.activityLog(response, message, 'Medicine Master', '');

            $scope.GetMedicineMasterList();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.edit = function (indexVal1, paramid) {
        medicineId = paramid;
        var params = {
            medicineID: paramid
        };
        dataFactory.medicineMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineList;
            $scope.txtMedicineName = list[0].medicineName;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                medicineID: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteMedicineMaster(params).then(function (response) {
                $scope.GetMedicineMasterList();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Medicine Master', 'Medicine Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.clr = function () {
        // $scope.ddlBook = 0;
        // $scope.txtRemark = '';
        // $scope.txtMedicineName = '';
        // $scope.txtReference = '';
        // $scope.txtPageNo = '';
        // $scope.txtEdition = '';
    };
    $scope.initControls();
    $scope.GetMedicineMasterList();
    //$scope.nutrientMasterList();
});