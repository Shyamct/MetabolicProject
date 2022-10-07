app.controller('problemAttributeAssignCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var ProblemAttributeId = 0; 

    $scope.pMasterList = function () {
        dataFactory.ProblemMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemMasterList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.pAttributeMasterList = function () {
        dataFactory.ProblemAttributeMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemAttributeMasterList = result.problemAttributeMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.pAttributeAssignList = function () {        
        var params = {
            problemId: $scope.ddlProblem
        };
        dataFactory.ProblemAttributeAssignList(params).then(function (response) {
            var result = response.data;
            $scope.ProblemAttributeAssignList = result.problemAttributeAssign;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.SaveProblemAttributeAssign = function () {

        var isExists = false;
        var problem = "";

        angular.forEach($scope.visibleItems, function (item) {
            if (item.selected) {
                isExists = true;
                problem = problem + item.id + ",";
            }
        });
        
        if (isExists == false) {
            toaster.pop('error', "Error", 'Select atlease one Problem !!');
            return false;
        }


       
        if ($scope.ddlAttribute == -1) {
            toaster.pop('error', "Error", 'Select Attribute');
            return false;
        }
        var params = {
            id: ProblemAttributeId,
            problemId: problem,
            attributeId: $scope.ddlAttribute,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveProblemAttributeAssign(params).then(function (response) {
            var message = ProblemAttributeId > 0 ? 'Update Problem Attribute Assign' : 'Save Problem Attribute Assign';
            $rootScope.activityLog(response, message, 'Problem Attribute Assign', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.pAttributeAssignList(); 
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteProblemAttributeAssign = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteProblemAttributeAssign(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.pAttributeAssignList();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Problem Attribute Assign', ' Problem Attribute Assign', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        ProblemAttributeId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.ProblemAttributeAssignList(params).then(function (response) {
            var result = response.data;
            var list = result.problemAttributeAssign;
            $scope.ddlProblem = list[0].problemID;
            $scope.ddlAttribute = list[0].attributeID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.toggleSelect = function () {
       
        if ($scope.ddlAttribute != "-1") {
            angular.forEach($scope.ProblemMasterList, function (item) {                
                item.selected = !item.selected;
            });
        }
        else {
            toaster.pop('error', "Error", 'Select Attribute');
            $scope.selectAll = false;
        }
    };

    $scope.clr = function () {
        ProblemAttributeId = 0;
        //$scope.ddlProblem = -1;   
        $scope.ddlAttribute = -1;      
    };   
    $scope.pMasterList();
    $scope.pAttributeMasterList();
    $scope.pAttributeAssignList();
});