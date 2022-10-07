app.controller('alterDiseaseDepartmentCtrl', function ($scope, dataFactory, toaster) {   
    var existID = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsDiseaseDepartmentMaster().then(function (response) {
            var result = response.data;           
            $scope.diseaseList = result.diseaseList;
            $scope.departmentList = result.departmentList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.getDiseaseDepartment = function () {      
        var params = {
            id: existID,
            diseaseDepartmentID: $scope.ddlDiseaseDepartment
        };
        dataFactory.AlterDiseaseDepartmentList(params).then(function (response) {
            var result = response.data;
            $scope.diseaseDepartmentList = result.diseaseDepartmentList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveDiseaseDepartment = function () {

        if (existID == 0) {
            toaster.pop('error', "Error", 'Select Item To Edit');
            return false;
        }
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        if ($scope.ddlDiseaseDepartment == 0) {
            toaster.pop('error', "Error", 'Please Select Disease Department');
            return false;
        }

        var params = {
            id: existID,
            problemID: $scope.ddlProblem,
            diseaseDepartmentID: $scope.ddlDiseaseDepartment,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveAlterDiseaseDepartment(params).then(function (response) {
            $scope.clr();
            $scope.getDiseaseDepartment();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    
    $scope.edit = function (paramid) {
        existID = paramid;
        var params = {
            id: paramid            
        };       
        dataFactory.AlterDiseaseDepartmentList(params).then(function (response) {
            var result = response.data;           
            var list = result.diseaseDepartmentList; 
            $scope.ddlProblem = list[0].diseaseID;    
            $scope.ddlDiseaseDepartment = list[0].departmentID;            
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (paramid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: paramid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteAlterDiseaseDepartment(params).then(function (response) {
                $scope.clr();
                $scope.getDiseaseDepartment();
                toaster.pop('success', "Success", 'Deleted Successfully.');

            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {   
        existID = 0;
        //$scope.ddlDiseaseDepartment = 0;
    };

    $scope.initControls();
    $scope.getDiseaseDepartment();
    
});