app.controller('mergeMedicineCtrl', function ($scope, dataFactory, $rootScope, toaster) {



    $scope.updateMedicine = function () {
        if ($scope.ddlKeepMedicine == -1) {
            alert('Select Keep Medicine');
            return false;
        }
        if ($scope.ddlRemoveMedicine == -1) {
            alert('Select Remove Medicine');
            return false;
        }
        var params = {
            keepMedicineId: $scope.ddlKeepMedicine,
            removeMedicineId: $scope.ddlRemoveMedicine,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.MergeMedicine(params).then(function (response) {
            toaster.pop('success', "Success", 'Updated Successfully.');
            var message = 'MERGE Medicine';
            $rootScope.activityLog(response, message, 'MERGE Medicine', '');
            $scope.clr();
            $scope.GetMergeMedicineMasterList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.GetMergeMedicineMasterList = function () {
        var params = {};
        dataFactory.GetMergeMedicine(params).then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.MergeMedicineList = result.mergeMedicineList;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.clr = function () {
        $scope.ddlKeepMedicine = -1;
        $scope.ddlRemoveMedicine = -1;
    };
    $scope.GetMergeMedicineMasterList();
});