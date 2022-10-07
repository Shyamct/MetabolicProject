app.controller('problemNutrientRoleCtrl', function ($scope, dataFactory, toaster) { 

    $scope.initControls = function () {
        dataFactory.InitControlsProblemNutrientRole().then(function (response) {
            var result = response.data;
            $scope.diseaseList = result.diseaseList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetProblemNutrientRoleList = function (id) {

        var params = {
            problemID: id
        };
        dataFactory.ProblemNutrientRoleList(params).then(function (response) {
            var result = response.data;
            $scope.problemNutrientRoleList = result.problemNutrientRoleList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.assign = function (nutrientID) {
        //if (confirm("Are you sure want to delete?")) {
            var params = {
                nutrientID: nutrientID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            //dataFactory.DeleteCookingTemperatureEffect(params).then(function (response) {
            //    toaster.pop('success', "Success", 'Deleted Successfully.');
            //    $scope.GetCookingTemperatureEffectList();
            //}, function (error) {
            //    toaster.pop('error', "Error", error);
            //});
        //}
    };

    $scope.initControls();
});