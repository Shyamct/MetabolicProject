app.controller('departmentCtrl', function ($scope, dataFactory, toaster) {

    var departmentID = 0;
    $scope.GetAllDepartmentList = function () {
        dataFactory.GetAllDepartmentList().then(function (response) {
            var result = response.data;
            $scope.departmentList = result.department;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.SaveDepartment = function () {
        var params = {
            id: departmentID,
            name: $scope.txtDepartment
        };
        dataFactory.SaveDepartment(params).then(function (response) {
            toaster.pop('success', "Success", 'Department Saved Successfully.');
            departmentID = 0;
            $scope.txtDepartment = '';
            $scope.GetAllDepartmentList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.DeleteDepartment(params).then(function (response) {
                toaster.pop('success', "Success", 'Department Deleted Successfully.');
                $scope.GetAllDepartmentList();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        departmentID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.GetAllDepartmentList(params).then(function (response) {
            var result = response.data;
            var list = result.department;
            $scope.txtDepartment = list[0].departmentName;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetAllDepartmentList();
});