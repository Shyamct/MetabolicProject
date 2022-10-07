app.controller('calculatorPrameterMasterCtrl', function ($scope, dataFactory, toaster) {
    var cPId = 0;
    var arr = [];
    $scope.addedUnitList = '';
    var arr2 = [];
    $scope.addedUnitNameList = '';
    var arr3 = [];
    $scope.addedValueList = "";
    $scope.controlTypeList = [{ 'controlText': "text" },
    { 'controlText': "number" },
    { 'controlText': "radio" },
    { 'controlText': "checkbox" },
    { 'controlText': "dropdown" }];

    $scope.labelTypeList = [{ 'labelType': "Parameter" },
    { 'labelType': "Calculator" },
    { 'labelType': "Questionnaire" },
    { 'labelType': "LifeSupport" },
    { 'labelType': "Other" }];

    $scope.initTableList = [{ 'tableName': "patientVital" },
    { 'tableName': "pathology" },
    { 'tableName': "Registration" }];

    /*
     * 
     * 
     new code goes here
     * 
     * 
     * */



    $scope.addValueForDD = function () {
        if ($scope.txtValueForDD == '') {
            toaster.pop('error', "Error", 'Please Enter Value');
            return false;
        }

        for (var i = 0; i < $scope.addedValueList.length; i++) {
            if ($scope.addedValueList[i].values == $("#txtValueForDD").val()) {
                toaster.pop('error', "Error", 'Already Added this Value ');
                return false;
            }
        }
        arr.push({
            values: $("#txtValueForDD").val()
        });
        $scope.addedValueList = arr;
    };
    $scope.deleteValueList = function (index) {
        $scope.addedValueList.splice(index, 1);
    };



    /*
     * 
     * 
   new code here
     * 
     * 
     * 
     * 
     * */


    $scope.addUnit = function () {
        var isD = '';
        if ($scope.rdIsDefault == 1) {
            isD = 'Yes';

        }
        else {
            isD = 'No';
        }
        if ($scope.txtValueForDD == '') {
            toaster.pop('error', "Error", 'Please Select Unit');
            return false;
        }

        for (var i = 0; i < $scope.addedUnitList.length; i++) {
            if ($scope.addedUnitList[i].unitID == $("#ddlUnit").val()) {
                toaster.pop('error', "Error", 'Already Added this Unit ');
                return false;
            }
        }

        arr2.push({
            unitID: $scope.ddlUnit,
            isDefault: $scope.rdIsDefault
        });
        arr3.push({
            unit: $('#ddlUnit option:selected').text(),
            isDefault: isD
        });
        $scope.addedUnitList = arr2;
        $scope.addedUnitNameList = arr3;
    };
    $scope.deleteUnitList = function (index) {
        $scope.addedUnitList.splice(index, 1);
        $scope.addedUnitNameList.splice(index, 1);
    };

    $scope.getControlBind = function () {
        if ($scope.ddlLabelType === 'Parameter') {
            $scope.IsVisible = true;
            $scope.tableList = $scope.initTableList;
        }
        if ($scope.ddlLabelType === 'Calculator') {
            $scope.tableList = [{ 'tableName': "Calculator" }];
        }
        if ($scope.ddlLabelType === 'Questionnaire') {
            $scope.tableList = [{ 'tableName': "Questionnaire" }];
        }
        if ($scope.ddlLabelType === 'LifeSupport') {
            $scope.tableList = [{ 'tableName': "LifeSupport" }];
        }
        if ($scope.ddlLabelType === 'Other') {
            $scope.tableList = '';
        }
    };

    $scope.getOtherParameters = function (para) {

        if ($scope.ddlLabelType === 'Parameter') {
            if (para == 'Registration') {
                $scope.otherParametersList = [{ 'parameterID': "Age", 'parameterName': "Age" },
                { 'parameterID': "Sex", 'parameterName': "Sex" }];
                return;
            }
        }
        if ($scope.ddlLabelType === 'Calculator') {
            if (para == 'Calculator') {
                dataFactory.calculatorListP().then(function (response) {
                    var result = response.data;
                    $scope.otherParametersList = result.calculatorList;
                }, function (error) {
                    toaster.pop('error', "Error", error);
                });
                return;
            }
        }
        if ($scope.ddlLabelType === 'Questionnaire') {
            if (para == 'Questionnaire') {
                dataFactory.questionnaireList().then(function (response) {
                    var result = response.data;
                    $scope.otherParametersList = result.questionnaireList;
                }, function (error) {
                    toaster.pop('error', "Error", error);
                });
                return;
            }
        }
        var params = {
            tableName: para
        };
        dataFactory.calculatorOtherParameterListP(params).then(function (response) {
            var result = response.data;
            $scope.otherParametersList = result.otherParametersList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };



    $scope.GetCalculatorParameterMasterList = function () {
        var params = {
            id: 0
        };
        dataFactory.CalculatorParameterMasterList(params).then(function (response) {
            var result = response.data;
            $scope.calculatorParameterMasterList = result.calculatorParameterMasterList;
            $scope.unitList = result.unitList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveCalculatorParameter = function () {

        if ($scope.txtLabelToDisplay == '') {
            toaster.pop('error', "Error", 'Please Enter Label Display Name');
            return false;
        }
        if (isEmpty($scope.txtControlName)) {
            toaster.pop('error', "Error", 'Please Enter the Control Name');
            return false;
        }

        if ($scope.ddlLabelType == 0) {
            toaster.pop('error', "Error", 'Please Select Label Type');
            return false;
        }
        if ($scope.ddlLabelType != 'Other') {
            if ($scope.ddlTable == 0) {
                toaster.pop('error', "Error", 'Please Select Control Table');
                return false;
            }
            if ($scope.ddlParameter == 0) {
                toaster.pop('error', "Error", 'Please Select Parameter');
                return false;
            }
        }
        if ($scope.ddlControlType === 0) {
            toaster.pop('error', "Error", 'Please Select Control Type');
            return false;
        }

        var params = {
            id: cPId,
            labelDisplay: $scope.txtLabelToDisplay,
            controlName: $scope.txtControlName.replace(/ /g, ''),
            labelType: $scope.ddlLabelType,
            tableName: $scope.ddlTable,
            parameterID: $scope.ddlParameter,
            lstValueForDD: $scope.addedValueList,
            controlType: $scope.ddlControlType,
            lstcalculatorParameterUnit: $scope.addedUnitList,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveCalculatorParameterMaster(params).then(function (response) {
            $scope.GetCalculatorParameterMasterList();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        cPId = paramid;
        var params = {
            id: paramid
        };
        var disDefault = '';
        dataFactory.CalculatorParameterMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.calculatorParameterMasterList;
            var ddValueList = result.valueList;
            var ddUnitList = result.unitSavedList;
            $scope.txtLabelToDisplay = list[0].labelDisplay;
            $scope.txtControlName = list[0].controlName;
            $scope.ddlLabelType = list[0].labelType;

            if (list[0].tableName == 'Registration') {
                $scope.otherParametersList = [{ 'parameterID': "Age", 'parameterName': "Age" },
                { 'parameterID': "Sex", 'parameterName': "Sex" }];
                $scope.ddlTable = list[0].tableName;
            }
            if (list[0].tableName == 'Calculator') {
                $scope.tableList = [{ 'tableName': "Calculator" }];
                $scope.otherParametersList = result.otherParameterList;
                $scope.ddlTable = list[0].tableName;
            }
            if (list[0].tableName == 'Questionnaire') {
                $scope.tableList = [{ 'tableName': "Questionnaire" }];
                $scope.otherParametersList = result.otherParameterList;
                $scope.ddlTable = list[0].tableName;
            }
            if (list[0].labelType == 'Parameter') {
                $scope.tableList = $scope.initTableList;
                $scope.otherParametersList = result.otherParameterList;
                $scope.ddlTable = list[0].tableName;
            }

            $scope.ddlParameter = list[0].referenceID;
            $scope.ddlControlType = list[0].controlType;
            arr = [];
            if (ddValueList.length > 0) {
                for (var i = 0; i < ddValueList.length; i++) {


                    arr.push({
                        values: ddValueList[i].value
                    });
                }
            }
            $scope.addedValueList = arr;

            arr2 = [];
            arr3 = [];
            //log(ddUnitList);
            if (ddUnitList.length > 0) {
                for (var i = 0; i < ddUnitList.length; i++) {
                    if (ddUnitList[i].isDefault == true) {
                        disDefault = 'Yes';
                    }
                    else {
                        disDefault = 'No';
                    }

                    arr2.push({
                        unitID: ddUnitList[i].unitID,
                        isDefault: ddUnitList[i].isDefault
                    });
                    arr3.push({
                        unit: ddUnitList[i].unitName,
                        isDefault: disDefault
                    });
                }
            }
            $scope.addedUnitList = arr2;
            $scope.addedUnitNameList = arr3;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.deleteCalculatorParameterMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };

            dataFactory.deleteCalculatorParameterMaster(params).then(function (response) {
                $scope.GetCalculatorParameterMasterList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {
        $scope.txtLabelToDisplay = '';
        $scope.txtControlName = '';
        $scope.ddlLabelType = 0;
        $scope.ddlTable = 0;
        $scope.ddlParameter = 0;
        $scope.ddlControlType = 0;
        cPId = 0;
        $scope.addedValueList = '';
        $scope.addedUnitList = '';
        $scope.addedUnitNameList = '';
    };
    $scope.GetCalculatorParameterMasterList();

});