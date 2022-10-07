app.controller('CalculatorFormulaControlCtrl', function ($scope, dataFactory, toaster) {
    var pkId = 0;   

    $scope.controlTypeList = [{ 'controlText': "text" },
    { 'controlText': "number" },
    { 'controlText': "radio" },
    { 'controlText': "checkbox" }];

    $scope.tableList = [{ 'tableName': "patientVital" },
    { 'tableName': "pathology" },
    { 'tableName': "Registration" }];

    $scope.initControls = function () {
        dataFactory.InitControlsFormulaControls().then(function (response) {
            var result = response.data;
            $scope.calculatorList = result.calculatorList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getParameters = function (operationType) {
        for (var i = 0; i< $scope.calculatorList.length; i++) {
            if ($scope.calculatorList[i].calculatorId == operationType) {
                $scope.controlParam = $scope.calculatorList[i].parameter;
                $scope.controlList = $scope.controlParam.split(","); 
            }
            $scope.ddlControl  = 0;
        }
    };

    $scope.getOtherParameters = function (para) {

        if (para == 'Registration') {
            $scope.otherParametersList = [{ 'parameterID': "Age", 'parameterName': "Age" },
            { 'parameterID': "Sex", 'parameterName': "Sex" }];
            return;
        }

        var params = {
            tableName: para           
        };
        dataFactory.CalculatorOtherParametersList(params).then(function (response) {
            var result = response.data;
            $scope.otherParametersList = result.otherParametersList;
            $scope.ddlParameter = 0;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.GetCalculatorControlList = function () {
        var params = {
            ctrlID: 0
        };
        dataFactory.CalculatorFormulaControlsList(params).then(function (response) {
            var result = response.data;
            $scope.calculatorControlList = result.calculatorFormulaControlList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveCalculatorControl = function () {

        if ($scope.ddlCalculator == 0) {
            toaster.pop('error', "Error", 'Please Select Calculator');
            return false;
        }
        if (isEmpty($scope.txtLabel)) {
            toaster.pop('error', "Error", 'Please Enter the Label');
            return false;
        }
        //if ($scope.ddlControl == 0) {
        //    toaster.pop('error', "Error", 'Please Select Control');
        //    return false;
        //}
        if ($scope.ddlControlType == 0) {
            toaster.pop('error', "Error", 'Please Select Control Type');
            return false;
        }
        var params = {
            ctrlID: pkId,
            calculatorID: $scope.ddlCalculator,
            labelName: $scope.txtLabel,
            controlId: $scope.ddlControl,
            controlType: $scope.ddlControlType,
            tableName: $scope.ddlTable,
            parameterID: $scope.ddlParameter,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveCalculatorFormulaControls(params).then(function (response) {
            $scope.GetCalculatorControlList();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        pkId = paramid;
        $('#ddlCalculator').prop('disabled', 'disabled');
        var params = {
            ctrlID: paramid
        };        
        dataFactory.CalculatorFormulaControlsList(params).then(function (response) {
            var result = response.data;
            var list = result.calculatorFormulaControlList;
            $scope.otherParametersList = result.otherParametersList;
            $scope.controlList = list[0].parameter.split(",");
            $scope.ddlCalculator = list[0].calculatorId;
            $scope.txtLabel = list[0].labelName;          
            $scope.ddlControl = list[0].controlId;           
            $scope.ddlControlType = list[0].controlType;
            if (list[0].tableName == null) {
                $scope.ddlTable = 0;
            }
            else {
                $scope.ddlTable = list[0].tableName;
            }
            if (list[0].tableName == 'Registration') {
                $scope.otherParametersList = [{ 'parameterID': "Age", 'parameterName': "Age" },
                { 'parameterID': "Sex", 'parameterName': "Sex" }];
            }  
            if (list[0].parameterID == null) {
                $scope.ddlParameter = 0;
            }
            else {
                $scope.ddlParameter = list[0].parameterID;
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.deleteCalculatorControl = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                ctrlID: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };

            dataFactory.DeleteCalculatorFormulaControls(params).then(function (response) {
                $scope.GetCalculatorControlList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {
        $scope.txtLabel = '';
        $scope.ddlControl = 0;
        $scope.ddlControlType = 0;
        $scope.ddlParameter = 0;
        $scope.ddlTable = 0;
        $('#ddlCalculator').removeAttr('disabled');
        pkId = 0;
    };

    $scope.initControls();
    $scope.GetCalculatorControlList();
});