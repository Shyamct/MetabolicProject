app.controller('mergeGroupCtrl', function ($scope, dataFactory, $rootScope, toaster) {

   

    $scope.updateGroup = function () {
        if ($scope.ddlKeepGroup == -1) {
            alert('Select Keep Group');
            return false;
        }
        if ($scope.ddlRemoveGroup == -1) {
            alert('Select Remove Group');
            return false;
        }
        var params = {
            keepGroupId: $scope.ddlKeepGroup,
            removeGroupId: $scope.ddlRemoveGroup,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.MergeGroup(params).then(function (response) {
            toaster.pop('success', "Success", 'Updated Successfully.');
            var message = 'MERGE Group';
            $rootScope.activityLog(response, message, 'MERGE GROUP', '');
            $scope.clr();
            $scope.GetMedicineGroupMasterList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.GetMedicineGroupMasterList = function () {
        var params = {};
        dataFactory.GetMedicineGroup(params).then(function (response) {
            var result = response.data;
            $scope.MedicineMasterList = result.medicineGroupList;
            $scope.MergeGroupList = result.mergeGroupList;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.clr = function () {
        $scope.ddlKeepGroup = -1;
        $scope.ddlRemoveGroup = -1;        
    };
    $scope.GetMedicineGroupMasterList();
});