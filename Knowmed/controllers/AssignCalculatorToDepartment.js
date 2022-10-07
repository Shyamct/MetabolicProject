app.controller('assignCalculatorToDepartmentCtrl', function ($scope, dataFactory, toaster) {
    $scope.isDisabled = false;
    var assignCalcId = 0; 
    var arr = [];
    $scope.calculatorAssignedList = "";
    $scope.initControls = function () {
        dataFactory.InitControlsCalculatorToDept().then(function (response) {
            var result = response.data;
            $scope.calculatorList = result.calculatorList;
            $scope.departmentList = result.departmentList;
        }, function (error) {
            toaster.pop('error', "Error", error); 
        });
    };
    
    $scope.GetAssignedCalculatorToDepartment = function () {
        $scope.clr();
        var params = {
            id: assignCalcId
        };
        dataFactory.AssignedCalculatorToDeptList(params).then(function (response) {
            var result = response.data;
            $scope.calculatorAssignedToDeptList = result.assignedCalculatorToDepartmentList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddCalculators = function () {
        if ($scope.ddlCalculator == 0) {
            toaster.pop('error', "Error", 'Please Select Calculator');
            return false;
        }
        if ($scope.ddlDepartment == 0) {
            toaster.pop('error', "Error", 'Please Select Department');
            return false;
        }       

        for (var i = 0; i < $scope.calculatorAssignedList.length; i++) {
            if ($scope.calculatorAssignedList[i].calculatorID == $scope.ddlCalculator && $scope.calculatorAssignedList[i].departmentID == $scope.ddlDepartment) {
                toaster.pop('error', "Error", 'Calculator Already Assigned To This Department');
                return false;
            }
        }     

        arr.push({
            calculatorID: $("#ddlCalculator").val(),
            calculatorTitle: $("#ddlCalculator option:selected").text(),
            departmentID: $("#ddlDepartment").val(),
            departmentName: $("#ddlDepartment option:selected").text(),           
            remark: $scope.txtRemark
        });
        $scope.calculatorAssignedList = arr;
    };
    $scope.deleteAssignedCalculator = function (index) {
        $scope.calculatorAssignedList.splice(index, 1);
    };
    $scope.saveAssignedCalculator = function () { 

        if (assignCalcId == 0) {
            if ($scope.calculatorAssignedList.length < 1) {
                toaster.pop('error', "Error", 'Please Assign Calculator To Any Department');
                return false;
            }
        }
        else {
            if ($scope.ddlCalculator == 0) {
                toaster.pop('error', "Error", 'Please Select Calculator');
                return false;
            }
            if ($scope.ddlDepartment == 0) {
                toaster.pop('error', "Error", 'Please Select Department');
                return false;
            }
        }
        var params = {
            id: assignCalcId,
            calculatorID: $scope.ddlCalculator,
            departmentID: $scope.ddlDepartment,
            remark: $scope.txtRemark,
            lstCalculatorToDepartment: $scope.calculatorAssignedList,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveCalculatorToDept(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetAssignedCalculatorToDepartment();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteCalculatorToDept(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetAssignedCalculatorToDepartment();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        $scope.isDisabled = true;
        assignCalcId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.AssignedCalculatorToDeptList(params).then(function (response) {
            var result = response.data;
            var list = result.assignedCalculatorToDepartmentList;
            $scope.ddlCalculator = list[0].calculatorId;
            $scope.ddlDepartment = list[0].departmentId;          
            $scope.txtRemark = list[0].remark;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {        
        $scope.calculatorAssignedList.length = 0;
        //$scope.ddlCalculator = 0;
        $scope.ddlDepartment = 0;
        $scope.txtRemark = '';
        assignCalcId = 0;
        $scope.isDisabled = false;
    };
    $scope.initControls();
    $scope.GetAssignedCalculatorToDepartment();
});