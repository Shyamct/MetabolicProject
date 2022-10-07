app.controller('mergeFoodCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    $scope.fMasterList = function () {
        dataFactory.getFoodMaster().then(function (response) {
            var result = response.data;
            $scope.FoodMasterList = result.foodMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.updateFood = function () {
        if ($scope.ddlKeepFood == -1) {
            alert('Select Keep Food');
            return false;
        }
        if ($scope.ddlRemoveFood == -1) {
            alert('Select Remove Food');
            return false;
        }
        var params = {
            keepFoodId: $scope.ddlKeepFood,
            removeFoodId: $scope.ddlRemoveFood,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.MergeFood(params).then(function (response) {
            toaster.pop('success', "Success", 'Updated Successfully.');
            var message = 'MERGE Food';
            $rootScope.activityLog(response, message, 'MERGE Food', '');
            $scope.fMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.clr = function () {
        $scope.ddlKeepFood = -1;
        $scope.ddlRemoveFood = -1;
    };
    $scope.fMasterList();
});