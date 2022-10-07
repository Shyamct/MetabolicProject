app.controller('historyInputDepartmentAssignCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    var historyInputTypeId = 0;

    $scope.BindInputTypeMaster = function () {
        dataFactory.GetHistoryInputTypeList().then(function (response) {
            var result = response.data;
            $scope.InputTypeMasterList = result.historyInputTypeMaster;
            $scope.DepartmentList = result.department;
            $scope.historyInputDepartmentAssignList = result.historyInputDepartmentAssign;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    //$scope.BindDepartment = function () {
    //    dataFactory.GetDepartmentList().then(function (response) {
    //        var result = response.data;
    //        $scope.DepartmentList = result.department;
    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};

    $scope.GetAllList = function () {
        dataFactory.HistoryInputDepartmentAssignList().then(function (response) {
            var result = response.data;
            $scope.historyInputDepartmentAssignList = result.historyInputDepartmentAssign;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.DeleteHistoryInputDepartmentAssign(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetAllList();
                $rootScope.activityLog(response, 'DELETE History Input Department Assign', 'History Input Department Assign', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        historyInputTypeId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.HistoryInputDepartmentAssignList(params).then(function (response) {
            var result = response.data;
            var list = result.historyInputDepartmentAssign;
            $scope.ddlInputType = list[0].historyInputID;
            $scope.ddlDepartment = list[0].departmentID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clearControls = function () {
        problemMasterId = 0;
        $scope.ddlDepartment = '';
        $scope.ddlInputType = '';
        historyInputTypeId = 0;
    };

    $scope.SaveHistoryInputDepartmentAssign = function () {
        var params = {
            id: historyInputTypeId,
            historyInputID: $scope.ddlInputType,
            departmentID: $scope.ddlDepartment
        };
        dataFactory.SaveHistoryInputDepartmentAssign(params).then(function (response) {
            var message = historyInputTypeId > 0 ? 'UPDATE History Input Department Assign ' : 'SAVE History Input Department Assign ';
            $rootScope.activityLog(response, message, 'History Input Department Assign ', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetAllList();
            $scope.clearControls();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    //$scope.GetAllList();
    $scope.BindInputTypeMaster();
    //$scope.BindDepartment();
});