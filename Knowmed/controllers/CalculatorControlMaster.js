app.controller('calculatorControlMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var controlID = 0;

    $scope.initControls = function () {
        dataFactory.calculatorControlMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.parameterList = result.parameterList;
            $scope.calculatorList = result.calculatorList;
            $scope.controlList = result.controlList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveCalculatorControlMaster = function () {

        if ($scope.ddlCalculator == -1) {
            toaster.pop('error', "Error", 'Please Select Calculator Name');
            return false;
        }
        if ($scope.ddlParameter == -1) {
            toaster.pop('error', "Error", 'Please Select Parameter Name');
            return false;
        }
        var params = {
            id: controlID,
            calculatorID: $scope.ddlCalculator,
            parameterID: $scope.ddlParameter,
            scoreType: $scope.txtScoreType,
            isScore: $scope.chkIsScore == true ? 1 : 0,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveCalculatorControlMaster(params).then(function (response) {
            if (controlID > 0) {
                $rootScope.activityLog(response, 'UPDATE Calculator Control Master', 'Calculator Control Master', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteCalculatorControlMaster = function (controlID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: controlID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteCalculatorControlMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Calculator Control Master', 'Calculator Control Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        controlID = row;
        var params = {
            id: row
        };
        dataFactory.calculatorControlMasterInitControl(params).then(function (response) {
           
            var result = response.data.controlList[0];
            $scope.ddlCalculator = result.calculatorId;
            //console.log(result.calculatorID);
            $scope.ddlParameter = result.parameterID;
            $scope.txtScoreType = result.scoreType;
            $scope.chkIsScore = result.isScore == 'YES' ? true : false;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {
        $scope.ddlCalculator = -1;
        $scope.ddlParameter = -1;
        $scope.txtScoreType = '';
        $scope.chkIsScore = 0;
        controlID = 0;
    };
    $scope.initControls();
});