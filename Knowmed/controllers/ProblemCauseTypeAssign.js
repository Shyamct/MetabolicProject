app.controller('problemCauseTypeAssignCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var problemCauseTypeAssignID = 0;
    var selectedID = 0;
    $scope.initControls = function () {
        dataFactory.InitControlsProblemCauseTypeAssign().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemMasterList;
            $scope.causeTypeList = result.causeTypeList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getParameterList = function (paramid) {
        
        var params = {
            causeTypeID: paramid

        };
        dataFactory.ProblemCauseTypeAssignParameterList(params).then(function (response) {
            var result = response.data;
            $scope.parameterList = result.parameterList;
            if (selectedID != 0) {
               
                $scope.ddlParameter = selectedID;
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };


    $scope.GetProblemCauseTypeAssign = function () {
        $scope.clr();
        var params = {
            id: problemCauseTypeAssignID
        };
        dataFactory.ProblemCauseTypeAssignList(params).then(function (response) {
            var result = response.data;
            $scope.problemCauseTypeAssignList = result.problemCauseTypeAssignList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.saveProblemCauseTypeAssign = function () {
       
        if (problemCauseTypeAssignID == 0)
        {
            if ($scope.ddlProblem == 0) {
                toaster.pop('error', "Error", 'Please Select Problem');
                return false;
            }
            if ($scope.ddlCauseType == 0) {
                toaster.pop('error', "Error", 'Please Select Cause Type');
                return false;
            }
            if ($scope.ddlParameter == '') {
                toaster.pop('error', "Error", 'Please Select Parameter');
                return false;
            }
        }
        var params = {
            id: problemCauseTypeAssignID,
            problemID: $scope.ddlProblem,
            causeTypeID: $scope.ddlCauseType,
            parameterID: $scope.ddlParameter,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
           
        };
       
        dataFactory.SaveProblemCauseTypeAssign(params).then(function (response) {
            var message = problemCauseTypeAssignID > 0 ? 'Update Problem Cause Type Assign' : 'Save Problem Cause Type Assign';
            $rootScope.activityLog(response, message, 'Problem Cause Type Assign', '');

            $scope.GetProblemCauseTypeAssign();
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
            dataFactory.DeleteProblemCauseTypeAssign(params).then(function (response) {
                $scope.GetProblemCauseTypeAssign();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Problem Cause Type Assign','Problem Cause Type Assign','');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        problemCauseTypeAssignID = paramid;
        var params = {
            id: paramid
            
        };
        dataFactory.ProblemCauseTypeAssignList(params).then(function (response) {
            var result = response.data;
            var list = result.problemCauseTypeAssignList;
            $scope.ddlProblem = list[0].problemID;
            $scope.ddlCauseType = list[0].causeTypeID;
            selectedID = list[0].parameterIDs;
            $scope.getParameterList(list[0].causeTypeID);
            
            
            //alert(list[0].parameterIDs);
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.ddlProblem = 0;
        $scope.ddlCauseType = 0;
        $scope.ddlParameter = 0;
        $scope.txtRemark = '';
        problemCauseTypeAssignID = 0;
        selectedID = 0;
    };
    $scope.initControls();
    $scope.GetProblemCauseTypeAssign();
});