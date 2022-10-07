app.controller('calculatorScoreCtrl', function ($scope, dataFactory, toaster, $state) {   
    var existId = 0;  
    var chk = 0;
    var qchk = 0;
    $scope.initControls = function () {
        dataFactory.InitControlsCalculatorScore().then(function (response) {
            var result = response.data;           
            $scope.calculatorList = result.calculatorList;  
            $scope.controlList = result.controlList;          
            $scope.problemList = result.problemMasterList;
            $scope.unitMasterList = result.unitMasterList;
            $scope.getColorList();

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };    
  

    $scope.GetCalculatorScoreList = function () {
        //$scope.clr();
        var params = {
            id: existId
        };
        dataFactory.CalculatorScoreList(params).then(function (response) {
            var result = response.data;
            $scope.calculatorScoreList = result.calucatorScoreList;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getColorList = function () {
        //$scope.clr();
        var params = {
        };
        dataFactory.getColorList(params).then(function (response) {
            var result = response.data;
            $scope.colorList = result.colorList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

   
    $scope.getSelectedCalculatorScoreList = function () {   
        $scope.getCalculatorControlMaster();
        $scope.calculatorScoreSelectedList = '';
        var params = {
            calculatorID: $scope.ddlCalculator
        };
        dataFactory.CalculatorScoreList(params).then(function (response) {
            var result = response.data;
            $scope.calculatorScoreSelectedList = result.calucatorScoreList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        }); 
    };

    $scope.getCalculatorControlMaster = function () {
       
        var params = {
            calculatorID: $scope.ddlCalculator
        };
        dataFactory.CalculatorControlMaster(params).then(function (response) {
            var result = response.data;
            $scope.calculatorControlList = result.calucatorControlMasterList;
            //$scope.checkCalculatorType();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    //$scope.checkCalculatorType = function () {
    //    var params = {
    //        calculatorID: $scope.ddlCalculator
    //    };
    //    dataFactory.checkCalculatorType(params).then(function (response) {
    //        var result = response.data;
    //        $scope.calculatorTypeList = result.calucatorType;
    //        angular.forEach($scope.calculatorTypeList, function (value, key) {
         
    //            if (value.scoreType == 'Text') {
    //                $scope.NM = true;
    //                $scope.Range = false;
    //                chk = 1;
    //            }
    //            else {
    //                $scope.Range = true;
    //                $scope.NM = false;
    //                chk = 0;
    //            }
    //        });
    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
        
       
    //};

    $scope.isScore = function (parameterID) {
        var params = {
            controlID: parameterID,
            calculatorID: $scope.ddlCalculator
        };
        dataFactory.getQuestionaireList(params).then(function (response) {
            var result = response.data;
            
            $scope.questionList = result.questionList;
            $scope.calculatorTypeList = result.calucatorType;
            log(result);
          

            if (($scope.questionList.length > 0)) {

                angular.forEach($scope.calculatorTypeList, function (value, key) {

                    if (value.scoreType == 'Text') {
                        $scope.NM = false;
                        $scope.Range = false;
                        $scope.QA = true;
                        qchk = 1;
                    }
                    else if (value.scoreType == 'Range') {
                        $scope.Range = true;
                        $scope.NM = false;
                        chk = 0;
                    }




                });

              
                
            }
            else if(($scope.questionList.length<=0)) {
                $scope.QA = false;
                angular.forEach($scope.calculatorTypeList, function (value, key) {

                    if (value.scoreType == 'Text') {
                        $scope.NM = true;
                        $scope.Range = false;
                        chk = 1;
                    }
                    else if (value.scoreType == 'Range') {
                        $scope.Range = true;
                        $scope.NM = false;
                        chk = 0;
                    }




                });
                qchk = 0;
            }
 //else {
 //               $scope.QA = false;
 //              $scope.Range = false;
 //               $scope.NM = true;
 //               qchk = 0;
 //           }
   
        }, function (error) {
            toaster.pop('error', "Error", error);
        });


    };

    $scope.saveCalculatorScore = function () {    

        if ($scope.ddlCalculator == 0) {
            toaster.pop('error', "Error", 'Please Select Calculator');
            return false;
        }
     /*   if ($scope.ddlControl == 0) {
            toaster.pop('error', "Error", 'Please Select Control');
            return false;
        }
        if ($scope.ddlCalculatorType == 0) {
            toaster.pop('error', "Error", 'Please Select Calculator Type');
            return false;
        }*/
        if (chk == 0) {
            $scope.txtNormal = '';
            if ($scope.txtRangeFrom == '') {
                toaster.pop('error', "Error", 'Please Enter Range From');
                return false;
            }
            if ($scope.txtRangeTo == '') {
                toaster.pop('error', "Error", 'Please Enter Range To');
                return false;
            }
        }
        else {
            if (qchk == 1) {
                $scope.txtNormal = $scope.ddlQuestionList;
            }
            
            if ($scope.txtNormal == '') {
                toaster.pop('error', "Error", 'Please Enter Parameter Text');
                $scope.txtRangeFrom = '';
                $scope.txtRangeTo = '';
                return false;
            }
          
        }
        //if ($scope.ddlProblem == 0) {
        //    toaster.pop('error', "Error", 'Please Select Problem');
        //    return false;
        //}
        if ($scope.txtScore == 0) {
            
        }
        else if($scope.txtScore == '') {
            toaster.pop('error', "Error", 'Please Enter Scores');
            return false;
        }
        var params = {
            id: existId,
            calculatorID: $scope.ddlCalculator,
            controlID: $scope.ddlControl,
           
            normalParameter: $scope.txtNormal,
            rangeFrom: $scope.txtRangeFrom,
            rangeTo: $scope.txtRangeTo,
            problemID: $scope.ddlProblem,
            score: $scope.txtScore,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid),
            colorId: $scope.ddlColor,
            ratio1: $scope.txtRatio1,
            ratio2: $scope.txtRatio2,

            ageFrom: $scope.txtAgeFrom,
            ageTo: $scope.txtAgeTo,
            ageUnitID: $scope.ddlAgeUnit,
            gender: $scope.ddlGender

        };
        dataFactory.SaveCalculatorScore(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.GetCalculatorScoreList();
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
            dataFactory.DeleteCalculatorScore(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.GetCalculatorScoreList();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        $scope.calculatorScoreSelectedList = '';
        existId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.CalculatorScoreList(params).then(function (response) {
            var result = response.data;           
            var list = result.calucatorScoreList;           
            $scope.ddlCalculator = list[0].calculatorID;  
            var params = {
                calculatorID: list[0].calculatorID
            };
            dataFactory.CalculatorControlMaster(params).then(function (response) {
                var result = response.data;
                $scope.calculatorControlList = result.calucatorControlMasterList;

            }, function (error) {
                toaster.pop('error', "Error", error);
            });


             $scope.ddlControl = list[0].controlID;
         //   $scope.ddlCalculatorType = list[0].calculatorType; 
         
            if (list[0].scoreType == 'Text') {
                $scope.NM = true;
                $scope.Range = false;
                chk = 1;
                $scope.isScore(list[0].controlID);
               
                   
              
            }
            else {
                $scope.Range = true;
                $scope.NM = false;
                chk = 0;
            }
            $scope.ddlQuestionList = list[0].parameterText;
            $scope.txtNormal = list[0].parameterText; 
            $scope.txtRangeFrom = list[0].rangeFrom;  
            $scope.txtRangeTo = list[0].rangeTo; 
            $scope.ddlProblem = list[0].problemID;
            $scope.txtScore = list[0].score;  
            $scope.txtRemark = list[0].remark;
            $scope.ddlColor = list[0].colorId;
            $scope.txtRatio1 = list[0].ratio1;
            $scope.txtRatio2 = list[0].ratio2;

            $scope.txtAgeFrom = list[0].ageFrom;
            $scope.txtAgeTo = list[0].ageTo;
            $scope.ddlAgeUnit = list[0].ageUnitID;
            $scope.ddlGender = list[0].g;

            $scope.isDisabled = true;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {  
        //$scope.ddlCalculator = -1;
        //$scope.ddlControl = 0;
        //$scope.ddlProblem = 0;
        //$scope.txtRangeFrom = '';
        //$scope.txtNormal = '';
        //$scope.txtRangeTo = '';
        //$scope.txtRangeTo = '';
        //$scope.txtScore = ''; 
        //$scope.txtRemark = ''; 
        //$scope.ddlColor = 0;
        //$scope.txtRatio1 = '';
        //$scope.txtRatio2 = '';
        existId = 0;
        chk = 0;
        qchk = 0;
        $scope.calculatorScoreSelectedList = '';
    };

    $scope.initControls();
    $scope.GetCalculatorScoreList();
   
});