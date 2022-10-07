app.controller('mergeNutrientCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    $scope.nMasterList = function () {
        dataFactory.NutrientMasterList().then(function (response) {
            var result = response.data;
            $scope.NutrientMasterList = result.nutrientMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.updateNutrient = function () {
        if ($scope.ddlKeepNutrient == -1) {
            alert('Select Keep Nutrient');
            return false;
        }
        if ($scope.ddlRemoveNutrient == -1) {
            alert('Select Remove Nutrient');
            return false;
        }
        var params = {
            keepNutrientId: $scope.ddlKeepNutrient,
            removeNutrientId: $scope.ddlRemoveNutrient,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.MergeNutrient(params).then(function (response) {
            toaster.pop('success', "Success", 'Updated Successfully.');
            var message = 'Merge Nutrient';
            $rootScope.activityLog(response, message, 'Merge Nutrient', '');
            $scope.nMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.clr = function () {
        $scope.ddlKeepNutrient = -1;
        $scope.ddlRemoveNutrient = -1;
    };
    $scope.nMasterList();
});