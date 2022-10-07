app.controller('CalculatorFormulaCtrl', function ($scope, dataFactory, toaster) {
    var pkId = 0; 
    $scope.addedCalculatorFormulaList = "";
    var arr = [];
    var str = "";
    var sam = "";
    $scope.initControls = function () {
      
        dataFactory.InitControlsFormula().then(function (response) {
         
            var result = response.data;
            $scope.CalculatorList = result.calculatorTitleList;        
            $scope.ParameterList = result.calculatorParameterList;        
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.changeYesRadio = function () {
        if ($scope.rdYes == 'Yes') {
            $scope.rdNo = 0;
            $scope.TypeShow = true;
           
        } else {
            $scope.rdYes = 0;
            $scope.TypeShow = false;
        }
    };
    $scope.changeNoRadio = function () {
        if ($scope.rdNo == 'No') {
            $scope.rdYes = 0;
            $scope.TypeShow = false;
        } else {
            $scope.rdNo = 0;
            $scope.TypeShow = true;
        }
    };

    //add to array
    $scope.AddCalculatorFormula = function () {
        if ($scope.ddlCalculator == -1) {
            toaster.pop('error', "Error", 'Please Select Calculator');
            return false;
        }
        if ($scope.ddlParameter == -1) {
            toaster.pop('error', "Error", 'Please Select Parameter');
            return false;
        }
        if ($scope.rdYes == 'Yes') {
            if ($scope.ddlCalculator == -1) {
                toaster.pop('error', "Error", 'Please Select Score Type');
                return false;
            }
        }
        if ($scope.rdYes != 'Yes') {
            sam = '';
        }
        else {
            sam = $scope.ddlType;
        }
        


        arr.push({
            calculatorID: $("#ddlCalculator").val(),
            parameterID: $("#ddlParameter").val(),
            calculatorName: $("#ddlCalculator option:selected").text(),
            parameterName: $("#ddlParameter option:selected").text(),
            isScore: $scope.rdYes == 'Yes' ? 'Yes' : $scope.rdNo == 'No' ? 'No' : null,
            scoreType: sam

        });
        $scope.addedCalculatorFormulaList = arr;
        $scope.BuildFormula();
        
    };
    $scope.deleteCalculatorFormulaList = function (index) {
        $scope.addedCalculatorFormulaList.splice(index, 1);
        $scope.BuildFormula();
    };

    $scope.BuildFormula = function () {
        str = "";
        for (var i = 0; i < $scope.addedCalculatorFormulaList.length; i++)
        {
            str = str.trim() + $scope.addedCalculatorFormulaList[i].parameterName.trim() + '_';
        }
        $scope.txtFormula = str;
    };



    //end add to array


    $scope.GetCalculatorFormulaList = function () {
        var params = {
            formulaID: 0
        };
        dataFactory.CalculatorFormulaList(params).then(function (response) {
            var result = response.data;
            $scope.calculatorFormulaList = result.calculatorFormulaList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.parameterList = function () {
        var params = {
            calculatorID: $scope.ddlCalculator
        };
        dataFactory.parameterList(params).then(function (response) {
            var result = response.data;
            $scope.savedParameterList = result.parameterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 
    $scope.SaveFormula = function () {

        if ($scope.ddlCalculator == -1) {
            toaster.pop('error', "Error",'Please Select Calculator');
            return false;
        }
        if (isEmpty($scope.txtFormula)) {            
            toaster.pop('error', "Error",'Please Enter the Formula');
            return false;
        }
      
        var params = {
            formulaID: pkId,        
            calculatorID: $scope.ddlCalculator,
            formula: $scope.txtFormula,
            parameter: $scope.txtParameter,
            unit: $scope.txtUnit,
            lstCalculatorControlMaster: $scope.addedCalculatorFormulaList,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveCalculatorFormula(params).then(function (response) {
            $scope.GetCalculatorFormulaList();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        $scope.savedParameterList = "";
        var chkID = 0;
        pkId = paramid;
        $('#ddlCalculator').prop('disabled', 'disabled');

        var params = {
            formulaID: paramid
        };
        dataFactory.CalculatorFormulaList(params).then(function (response) {
            var result = response.data;
            var list = result.calculatorFormulaList;
            $scope.ddlCalculator = list[0].calculatorId;
            chkID = list[0].calculatorId;
            $scope.txtFormula = list[0].formula;
            $scope.txtParameter = list[0].parameter; 
            $scope.txtUnit = list[0].unit; 
        }, function (error) {
            toaster.pop('error', "Error", error);
            });
        var paramss = {
            formulaID: paramid
        };
      
        dataFactory.CalculatorControlMasterParameterList(paramss).then(function (response) {
            var result = response.data;
            var list2 = result.calculatorControlMasterParameterList;
            arr = [];
            for (var i = 0; i < list2.length; i++) {
                arr.push({
                    calculatorID: list2[i].calculatorId,
                    parameterID: list2[i].parameterID,
                    calculatorName: list2[i].calculatorName,
                    parameterName: list2[i].parameterName,
                    isScore: list2[i].isScore,
                    scoreType: list2[i].scoreType

                });
            }
            $scope.addedCalculatorFormulaList = arr;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.deleteCalculatorFormula = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                formulaID: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };

            dataFactory.DeleteCalculatorFormula(params).then(function (response) {
                $scope.GetCalculatorFormulaList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }

    };   

    $scope.clr = function () {        
        $scope.ddlCalculator = -1;
        $scope.txtFormula = '';
        $scope.ddlParameter = -1;
        $scope.ddlType = -1;
        $scope.txtUnit = '';
        pkId = 0;
        sam = '';
        arr = [];
        str = '';
        chkID = 0;
        $scope.savedParameterList = "";
    };

    $scope.initControls();
    $scope.GetCalculatorFormulaList();
});