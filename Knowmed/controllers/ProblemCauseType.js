app.controller('problemCauseTypeCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var problemCauseTypeID = 0;
    $scope.initControls = function () {
        dataFactory.InitControlsProblemCauseType().then(function (response) {
            var result = response.data;
            $scope.tableList = result.problemCauseTypeList;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetProblemCauseType = function () {
        $scope.clr();
        var params = {
            id: problemCauseTypeID
        };
        dataFactory.ProblemCauseTypeList(params).then(function (response) {
            var result = response.data;
            $scope.problemCauseTypeList = result.problemCauseTypeList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetParameterProblemCauseType = function (tabelNames) {
       
        var params = {
            tableName: tabelNames
        };
        dataFactory.ProblemCauseTypeParameterList(params).then(function (response) {
            var result = response.data;
            $scope.parameterList = result.parameterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveProblemCauseType = function () {
       
        if (problemCauseTypeID == 0)
        {
            if ($scope.ddlTable == 0) {
                toaster.pop('error', "Error", 'Please Select Table');
                return false;
            }
            if ($scope.ddlParameter == 0) {
                toaster.pop('error', "Error", 'Please Select Parameter');
                return false;
            }
            if ($scope.txtCauseType == '') {
                toaster.pop('error', "Error", 'Please Enter Cause Type');
                return false;
            }
        }
        var params = {
            id: problemCauseTypeID,
            causeType: $scope.txtCauseType,
            tableName: $scope.ddlTable,
            parameterName: $scope.ddlParameter,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
       
        dataFactory.SaveProblemCauseType(params).then(function (response) {
            var message = problemCauseTypeID > 0 ? 'Update Problem Cause Type' : 'Save Problem Cause Type';
            $rootScope.activityLog(response, message, 'Problem Cause Type', '');
            $scope.initControls();
            $scope.GetProblemCauseType();
            toaster.pop('success', "Success", 'Saved Successfully.');
           
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteProblemCauseType(params).then(function (response) {
                $scope.GetProblemCauseType();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Problem Cause Type', ' Problem Cause Type', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        problemCauseTypeID = paramid;
        var params = {
            id: paramid
            
        };
        dataFactory.ProblemCauseTypeList(params).then(function (response) {
            var result = response.data;
            var list = result.problemCauseTypeList;
            $scope.txtCauseType = list[0].causeType;
            $scope.ddlTable = list[0].tableName;
            $scope.GetParameterProblemCauseType(list[0].tableName);
            $scope.ddlParameter = list[0].parameterName;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
       
        $scope.ddlTable = 0;
        problemCauseTypeID = 0;
        $scope.txtCauseType = '';
        $scope.ddlParameter = 0;
    };
    $scope.initControls();
    $scope.GetProblemCauseType();
});