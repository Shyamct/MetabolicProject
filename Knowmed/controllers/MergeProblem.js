app.controller('mergeProblemCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    $scope.pMasterList = function () {
        dataFactory.ProblemMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemMasterList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.updateProblem = function () {
        if ($scope.ddlKeepProblem == -1) {
            alert('Select Keep Problem');
            return false;
        }
        if ($scope.ddlRemoveProblem == -1) {
            alert('Select Remove Problem');
            return false;
        }
        var params = {
            keepProblemId: $scope.ddlKeepProblem,
            removeProblemId: $scope.ddlRemoveProblem,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.MergeProblem(params).then(function (response) {
            toaster.pop('success', "Success", 'Updated Successfully.');
            var message = 'MERGE PROBLEM';
            $rootScope.activityLog(response, message, 'MERGE PROBLEM', '');
            $scope.pMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.clr = function () {
        $scope.ddlKeepProblem = -1;
        $scope.ddlRemoveProblem = -1;
    };
    $scope.pMasterList();
});