app.controller('assignDiseaseDepartmentCtrl', function ($scope, dataFactory, toaster) {   
    var existID = 0;    
    $scope.isDisabled = false;
    var arr = [];
    $scope.addedProblemList = '';

    $scope.initControls = function () {
        dataFactory.InitControlsDiseaseDepartmentMaster().then(function (response) {
            var result = response.data;           
            $scope.diseaseList = result.diseaseList;
            $scope.departmentList = result.subDepartmentList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.getProblemDepartmentAssignList = function () {
        var params = {
            id: existID,
            diseaseDepartmentID: $scope.ddlDiseaseDepartment
        };  
        dataFactory.GetProblemDepartmentAssignList(params).then(function (response) {
            var result = response.data;
            $scope.problemDepartmentAssignList = result.problemDepartmentAssignList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddProblem = function () {

        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Problem');
            return false;
        }
        for (var i = 0; i < $scope.addedProblemList.length; i++) {
            if ($scope.addedProblemList[i].problemID == $scope.ddlProblem) {
                toaster.pop('error', "Error", " Already Added This Problem");
                return false;
            }
        }
        arr.push({
            problemID: $scope.ddlProblem,
            problemName: $("#ddlProblem option:selected").text().trim()
        });
        $scope.addedProblemList = arr;
    };
    $scope.deleteAddedProblemList = function (index) {
        $scope.addedProblemList.splice(index, 1);
    };
    
    $scope.saveDiseaseDepartmentAssign = function () {

        if (existID == 0) {
            if ($scope.addedProblemList.length < 1) {
                toaster.pop('error', "Error", 'Please Add Problem');
                return false;
            }
        } 
        if ($scope.ddlDiseaseDepartment == 0) {
            toaster.pop('error', "Error", 'Please Select Disease Department');
            return false;
        }
        var params = {
            id: existID,
            problemID: $scope.ddlProblem,
            diseaseDepartmentID: $scope.ddlDiseaseDepartment,
            problemList: JSON.stringify($scope.addedProblemList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveProblemDepartmentAssign(params).then(function (response) {
            $scope.clr();
            $scope.getProblemDepartmentAssignList();
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
        dataFactory.GetProblemDepartmentAssignList(params).then(function (response) {
            var result = response.data;           
            var list = result.problemDepartmentAssignList; 
            $scope.ddlProblem = list[0].problemID;    
            $scope.ddlDiseaseDepartment = list[0].departmentID;    
            $scope.isDisabled = true;
           
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
            dataFactory.DeleteProblemDepartmentAssign(params).then(function (response) {
                $scope.clr();
                $scope.getProblemDepartmentAssignList();
                toaster.pop('success', "Success", 'Deleted Successfully.');

            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {   
        existID = 0;
        $scope.ddlProblem = 0;
        $scope.isDisabled = false;
        $scope.addedProblemList = '';
        $scope.addedProblemList.length = 0;
        arr = [];
    };

    $scope.initControls();
    $scope.getProblemDepartmentAssignList();

});