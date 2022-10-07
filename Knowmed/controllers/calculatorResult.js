app.controller('calculatorResultCtrl', function ($scope, dataFactory, toaster, $state) {   
    var existId = 0;  
    $scope.initControls = function () {
        dataFactory.InitControlsCalculatorResult().then(function (response) {
            var result = response.data;           
            $scope.calculatorList = result.calculatorList;  
            $scope.ageUnitList = result.ageUnitList;
            $scope.problemList = result.problemMasterList; 
          
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };    
  

    $scope.GetCalculatorResultList = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.CalculatorResultList(params).then(function (response) {
            var result = response.data;
            $scope.calculatorResultList = result.calucatorResultList;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
   
    $scope.getSelectedCalculatorResultList = function () {   
        $scope.calculatorResultSelectedList = '';
        var params = {
            calculatorID: $scope.ddlCalculator
        };
        dataFactory.CalculatorResultList(params).then(function (response) {
            var result = response.data;
            $scope.calculatorResultSelectedList = result.calucatorResultList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveCalculatorResult = function () {    

        if ($scope.ddlCalculator == 0) {
            toaster.pop('error', "Error", 'Please Select Calculator');
            return false;
        }
     /*   if ($scope.ddlControl == 0) {
            toaster.pop('error', "Error", 'Please Select Control');
            return false;
        }*/
        if ($scope.txtAgeFrom == '' || $scope.txtAgeTo=='' || $scope.ddlAgeUnit == 0) {
            toaster.pop('error', "Error", 'Please Select Age ');
            return false;
        }
        if ($scope.txtRangeFrom == '') {
            toaster.pop('error', "Error", 'Please Enter Range From');
            return false;
        }
        if ($scope.txtRangeTo == '') {
            toaster.pop('error', "Error", 'Please Enter Range To');
            return false;
        }
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Problem');
            return false;
        }
        if ($scope.txtResult == '') {
            toaster.pop('error', "Error", 'Please Enter Result');
            return false;
        }
        var params = {
            id: existId,
            calculatorID: $scope.ddlCalculator,
            gender: $scope.rdMale == 'Male' ? 'Male' : $scope.rdFemale == 'Female' ? 'Female' : $scope.rdBoth == 'Both' ? 'Both' : null,
            ageFrom: $scope.txtAgeFrom,
            ageTo: $scope.txtAgeTo,
            ageUnitID: $scope.ddlAgeUnit,
            rangeFrom: $scope.txtRangeFrom,
            rangeTo: $scope.txtRangeTo,
            problemID: $scope.ddlProblem,
            result: $scope.txtResult,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveCalculatorResult(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            
            $scope.GetCalculatorResultList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteCalculatorResult(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.GetCalculatorResultList();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        existId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.CalculatorResultList(params).then(function (response) {
            var result = response.data;           
            var list = result.calucatorResultList;           
            $scope.ddlCalculator = list[0].calculatorID;  
            $scope.rdMale = list[0].gender == 'Male' ? 'Male' : false;
            $scope.rdFemale = list[0].gender == 'Female' ? 'Female' : false;
            $scope.rdBoth = list[0].gender == 'Both' ? 'Both' : false;
            $scope.txtAgeFrom = list[0].ageFrom;
            $scope.txtAgeTo = list[0].ageTo;
            $scope.ddlAgeUnit = list[0].ageUnitID;  
            $scope.txtRangeFrom = list[0].rangeFrom;  
            $scope.txtRangeTo = list[0].rangeTo; 
            $scope.ddlProblem = list[0].problemID;
            $scope.txtResult = list[0].result;  
           
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {  
        $scope.ddlCalculator = -1;
        $scope.rdMale = 0;
        $scope.rdFemale = 0;
        $scope.rdBoth = 0;
        $scope.txtAgeFrom = '';
        $scope.txtAgeTo = '';
        $scope.ddlAgeUnit = 0;
        $scope.ddlProblem = 0;
        $scope.txtRangeFrom = '';
        $scope.txtRangeTo = '';
        $scope.txtRangeTo = '';
        $scope.txtResult = ''; 
       
        existId = 0;
    };
    $scope.initControls();
    $scope.GetCalculatorResultList();
   
});