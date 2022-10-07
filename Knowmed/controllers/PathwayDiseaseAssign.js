app.controller('pathwayDiseaseAssignCtrl', function ($scope, dataFactory, toaster) {

    $scope.initControls = function () {
        dataFactory.pathwayDiseaseAssignInitControl().then(function (response) {
            var result = response.data;
          
            $scope.problemMaster = result.problemMaster;
            $scope.userLogin = result.userLogin;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.PathwayDiseaseAssign = function () {
        var params = {           
        }
        dataFactory.pathwayDiseaseAssign(params).then(function (response) {
            var result = response.data;
            $scope.pathwayDiseaseAssignList = result.pathwayDiseaseAssignList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.savePathwayDiseaseAssign = function () {
        
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Select Problem Name!!');
            return false;
        };
        if ($scope.ddlUserId == 0) {
            toaster.pop('error', "Error", 'Select User Name !!');
            return false;
        };
        var params = {
            headName: $('#ddlProblem option:selected').text().trim(),
            problemId: $scope.ddlProblem,
            userid: $scope.ddlUserId,
        };        
        dataFactory.savePathwayDiseaseAssign(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.PathwayDiseaseAssign();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    //$scope.clr = function () {
    //    $scope.ddlUser = 0
    //    $scope.ddlUserId = 0
    //};

    $scope.initControls();
    $scope.PathwayDiseaseAssign();
});