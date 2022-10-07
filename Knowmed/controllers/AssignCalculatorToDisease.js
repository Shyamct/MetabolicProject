app.controller('assignCalculatorToDiseaseCtrl', function ($scope, dataFactory, toaster) {
    $scope.isDisabled = false;
    var assignCalcId = 0; 
    var arr = [];
    $scope.calculatorAssignedList = "";

    $scope.initControls = function () {
        dataFactory.InitControlsCalculatorToDisease().then(function (response) {
            var result = response.data;
            $scope.calculatorList = result.calculatorList;
            $scope.problemList = result.diseaseList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.GetAssignedCalculatorToDisease = function () {
        $scope.clr();
        var params = {
            id: assignCalcId
        };
        dataFactory.AssignedCalculatorToDiseaseList(params).then(function (response) {
            var result = response.data;
            $scope.calculatorAssignedToDiseaseList = result.assignedCalculatorToDiseaseList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddCalculators = function () {
        if ($scope.ddlCalculator == 0) {
            toaster.pop('error', "Error", 'Please Select Calculator');
            return false;
        }
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }   
       
        for (var i = 0; i < $scope.calculatorAssignedList.length; i++) {
            if ($scope.calculatorAssignedList[i].calculatorID == $scope.ddlCalculator && $scope.calculatorAssignedList[i].problemID == $scope.ddlProblem) {
                toaster.pop('error', "Error", 'Calculator Already Assigned To This Disease');
                return false;
            }
        }       

        arr.push({
            calculatorId: $("#ddlCalculator").val(),
            calculatorTitle: $("#ddlCalculator option:selected").text(),
            problemId: $("#ddlProblem").val(),
            problemName: $("#ddlProblem option:selected").text(),           
            remark: $scope.txtRemark
        });
        $scope.calculatorAssignedList = arr;

        $scope.ddlProblem = 0;
        $scope.txtRemark = '';
    };
    $scope.deleteAssignedCalculator = function (index) {
        $scope.calculatorAssignedList.splice(index, 1);
    };
    $scope.saveAssignedCalculator = function () { 

        if (assignCalcId == 0) {
            if ($scope.calculatorAssignedList.length < 1) {
                toaster.pop('error', "Error",  'Please Assign Calculator To Any Disease');
                return false;
            }
        }
        else {
            if ($scope.ddlCalculator == 0) {
                toaster.pop('error', "Error",  'Please Select Calculator');
                return false;
            }
            if ($scope.ddlProblem == 0) {
                toaster.pop('error', "Error", 'Please Select Disease');
                return false;
            }
        }
        var params = {
            id: assignCalcId,
            calculatorId: $scope.ddlCalculator,
            problemId: $scope.ddlProblem,
            remark: $scope.txtRemark,
            lstCalculatorToDisease: $scope.calculatorAssignedList,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveCalculatorToDisease(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetAssignedCalculatorToDisease();
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
            dataFactory.DeleteCalculatorToDisease(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetAssignedCalculatorToDisease();
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
        dataFactory.AssignedCalculatorToDiseaseList(params).then(function (response) {
            var result = response.data;           
            var list = result.assignedCalculatorToDiseaseList;
            $scope.ddlCalculator = list[0].calculatorId;
            $scope.ddlProblem = list[0].problemId;          
            $scope.txtRemark = list[0].remark;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {        
        $scope.calculatorAssignedList.length = 0;
        //$scope.ddlCalculator = 0;
        $scope.ddlProblem = 0;
        $scope.txtRemark = '';
        assignCalcId = 0;
        $scope.isDisabled = false;
    };
    $scope.initControls();
    $scope.GetAssignedCalculatorToDisease();
});