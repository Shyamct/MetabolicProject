app.controller('diseaseClinicalFeatureCtrl', function ($scope, dataFactory, toaster, $state) {
    var pkId = 0;
    var arr = [];
    var vitalVariationIDList = [];
    var vitalVariationNameList = [];
    
    var arrAttributeID = [];
    var arrAttributeName = [];
    $scope.attributeList = "";
    var occList = [];
    var resultList = [];
    $scope.vitalResultList = '';
    $scope.vitalResultNameList = '';

    $scope.initControls = function () {
        var params = {
            departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID)
        };
        dataFactory.initControlsDiseaseClinicalFeature(params).then(function (response) {
            var result = response.data;
            $scope.diseaseList = result.diseaseList;
            if (!isEmpty($state.params.id)) {
                $scope.ddlDisease = $state.params.id;
            }
            $scope.problemMasterList = result.problemMasterList;
            occList = result.occurrenceList;
            $scope.vitalList = result.vitalList;
            resultList = result.resultList;

            
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
 




    //disease input attribute

    $scope.addAttribute = function () {
        var inputTypeID = 0;
        var inputTypeName = '';
        var occurrenceID = 0;
        var occurrenceName = '';
        var attID = 0;
        var attName = '';
        var attVID = 0;
        var attVName = '';
        var chk = 0;
        for (var i = 0; i < $scope.problemMasterList.length; i++) {
            if ($scope.problemMasterList[i].selected == true) {
               
                if (angular.isUndefined($scope.problemMasterList[i].ddlInputType == true || $scope.problemMasterList[i].ddlInputType == '' || $scope.problemMasterList[i].ddlInputType == null)) {
                    inputTypeID = 0;
                    inputTypeName = '';
                }
                else {
                    inputTypeID = $scope.problemMasterList[i].ddlInputType.id;
                    inputTypeName = $scope.problemMasterList[i].ddlInputType.inputType;
                }
                if (angular.isUndefined($scope.problemMasterList[i].ddlOccurrence == true) || $scope.problemMasterList[i].ddlOccurrence == '' || $scope.problemMasterList[i].ddlOccurrence == null) {
                    occurrenceID = 0;
                    occurrenceName = '';
                }
                else {
                    occurrenceID = $scope.problemMasterList[i].ddlOccurrence.occurrenceID;
                    occurrenceName = $scope.problemMasterList[i].ddlOccurrence.occurrenceName;
                }
                if (angular.isUndefined($scope.problemMasterList[i].ddlAttributeName == true) || $scope.problemMasterList[i].ddlAttributeName == '' || $scope.problemMasterList[i].ddlAttributeName == null) {
                    attID = 0;
                    attName = '';
                }
                else {
                    attID = $scope.problemMasterList[i].ddlAttributeName.attributeID;
                    attName = $scope.problemMasterList[i].ddlAttributeName.attributeName;
                }
                if (angular.isUndefined($scope.problemMasterList[i].ddlAttributeValue == true) || $scope.problemMasterList[i].ddlAttributeValue == '' || $scope.problemMasterList[i].ddlAttributeValue == null) {
                    attVID = 0;
                    attVName = '';
                }
                else {
                    attVID = $scope.problemMasterList[i].ddlAttributeValue.problemAttributeValueId;
                    attVName = $scope.problemMasterList[i].ddlAttributeValue.attributeValue;
                }



                for (var ii = 0; ii < $scope.attributeList.length; ii++) {
                    if ($scope.attributeList[ii].inputTypeId == inputTypeID && $scope.attributeList[ii].problemId == $scope.problemMasterList[i].problemID && $scope.attributeList[ii].attributeId == attID
                        && $scope.attributeList[ii].attributeValueId == attVID &&
                        $scope.attributeList[ii].occurenceId == occurrenceID) {
                        chk = 1;
                    }
                    else {
                        chk = 0;
                    }
                }
                if (chk == 0) {


                    arrAttributeID.push({
                        inputTypeId: inputTypeID,
                        problemId: $scope.problemMasterList[i].problemID,

                        attributeId: attID,
                        attributeValueId: attVID,
                        occurenceId: occurrenceID
                    });
                    arrAttributeName.push({
                        inputTypeName: inputTypeName,
                        problemName: $scope.problemMasterList[i].problemName,
                        attributeName: attName,
                        attributeValueName: attVName,
                        occurenceName: occurrenceName
                    });



                }
                else {
                    toaster.pop('error', "Error", 'Already Added');
                    return false;
                }

            }
           
            }
        $scope.attributeList = arrAttributeID;
        $scope.attributeNameList = arrAttributeName;
        
    };


    $scope.deleteAttribute = function (index) {
        $scope.attributeList.splice(index, 1);
        $scope.attributeNameList.splice(index, 1);
    };





    $scope.addVitalList = function () {

        var chk1 = 0;
        for (var i = 0; i < $scope.vitalList.length; i++) {
            if ($scope.vitalList[i].selected == true) {

                //if ($scope.vitalList[i].vitalID != $scope.vitalResultList[i].vitalID) {

                //alert($scope.vitalResultList.length);
                if ($scope.vitalResultList.length >= 0) {
                    if ($scope.vitalResultList.length != 0) {
                    for (var ii = 0; ii < $scope.vitalResultList.length; ii++) {
                        if ($scope.vitalResultList[ii].vitalID == $scope.vitalList[i].vitalID) {
                            chk1 = 1;

                        }
                        else {
                            chk1 = 0;
                        }
                    }
                    }
                    if (chk1 == 0) {
                        if (angular.isUndefined($scope.vitalList[i].ddlResult == true) || $scope.vitalList[i].ddlResult == '' || $scope.vitalList[i].ddlResult == null) {
                            resultID = 0;
                            resultName = '';
                        }
                        else {
                            resultID = $scope.vitalList[i].ddlResult.id;
                            resultName = $scope.vitalList[i].ddlResult.statusFor;
                        }
                        if (angular.isUndefined($scope.vitalList[i].txtRemark == true) || $scope.vitalList[i].txtRemark == '' || $scope.vitalList[i].txtRemark == null) {
                            remark = '';;
                        }
                        else {
                            remark = $scope.vitalList[i].txtRemark;
                        }

                        vitalVariationIDList.push({
                            vitalID: $scope.vitalList[i].vitalID,
                            resultID: resultID,
                            remark: remark
                        });
                        vitalVariationNameList.push({
                            vitalName: $scope.vitalList[i].vitalName,
                            resultName: resultName,
                            remark: remark
                        });
                        $scope.vitalList[i].selected = false;
                        $chk1 = 1;
                    }
                    
                }

            }

        }
        $scope.vitalResultList = vitalVariationIDList;
        $scope.vitalResultNameList = vitalVariationNameList;
    };

    $scope.deleteVitalResultList = function (index) {
        $scope.vitalResultList.splice(index, 1);
        $scope.vitalResultNameList.splice(index, 1);
    };

    $scope.saveDiseaseClinicalFeature = function () {
        var resultID = 0;
        var resultName = '';
        var remark = '';
        if ($scope.ddlDisease == '-1' ) {
                toaster.pop('error', "Error", 'Please Select Problem Reference');
                return false;
            }


     
     

            var obj = {
                problemReferenceID: $scope.ddlDisease,
                dtDiseaseInputNew: $scope.attributeList,
                lstVitalResult: $scope.vitalResultList,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid),
                
            };
    
        
      
        dataFactory.saveDiseaseClinicalFeature(obj).then(function (response) {
            
            $scope.initControls();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.vitalCheck = function () {
        for (var i = 0; i < $scope.vitalList.length; i++) {
            if ($scope.vitalList[i].selected == true) {
                $scope.vitalList[i].check = 1;
            }
            else {
                $scope.vitalList[i].check = 0;
            }
        }
        $scope.ResultList = resultList;
    }

    $scope.AttValueList = function (problemID) {
        //alert(problemID);
        var param = {
            problemMasterID: problemID
        };

        for (var i = 0; i < $scope.problemMasterList.length; i++) {
            if ($scope.problemMasterList[i].selected == true) {
                $scope.problemMasterList[i].check = 1;
            }
            else {
                $scope.problemMasterList[i].check = 0;
            }
        }

        dataFactory.DiseaseClinicalFeatureAttributeValueList(param).then(function (response) {
            var result = response.data;
            $scope.AttributeValueList = uniq(result.problemAttributeValue, 'attributeName');
            $scope.AttributeValue = result.problemAttributeValue;
            $scope.ddlAttributeName = 0;
            $scope.occurrenceList = occList;
            log($scope.AttributeValueList);
            log($scope.AttributeValue);
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetDiseaseClinicalFeatureList = function () {  
        //$scope.clr();
        var params = {
            problemReferenceID: $scope.ddlDisease
        };
        dataFactory.diseaseClinicalFeatureList(params).then(function (response) {
            var result = response.data;
            var ddClinicalFeatureList = [];
            var ddVitalResultList = [];
            ddClinicalFeatureList = result.diseaseClinicalFeatureList;
            ddVitalResultList = result.savedVitalResultList;
           log(ddClinicalFeatureList);
           
            if (ddClinicalFeatureList.length > 0) {
                arrAttributeID = [];
                arrAttributeName = [];
                for (var i = 0; i < ddClinicalFeatureList.length; i++) {
                    arrAttributeID.push({
                        inputTypeId: ddClinicalFeatureList[i].inputTypeID,
                        problemId: ddClinicalFeatureList[i].problemID,

                        attributeId: ddClinicalFeatureList[i].attributeTypeID,
                        attributeValueId: ddClinicalFeatureList[i].attributeValueID,
                        occurenceId: ddClinicalFeatureList[i].occurenceID
                    });
                    arrAttributeName.push({
                        inputTypeName: ddClinicalFeatureList[i].inputType,
                        problemName: ddClinicalFeatureList[i].problemName,
                        attributeName: ddClinicalFeatureList[i].attributeName,
                        attributeValueName: ddClinicalFeatureList[i].attributeValue,
                        occurenceName: ddClinicalFeatureList[i].occurenceName
                    });
                }
                $scope.attributeList = arrAttributeID;
                $scope.attributeNameList = arrAttributeName;
                //log(arrAttributeName);
            }
            else {
                $scope.attributeList = '';
                $scope.attributeNameList = '';
            }

            if (ddVitalResultList.length > 0) {
                vitalVariationIDList = [];
                vitalVariationNameList = [];
                for (var i = 0; i < ddVitalResultList.length; i++) {

                    vitalVariationIDList.push({
                        vitalID: ddVitalResultList[i].vitalID,
                        resultID: ddVitalResultList[i].resultID,
                        remark: ddVitalResultList[i].remark
                    });
                    vitalVariationNameList.push({
                        vitalName: ddVitalResultList[i].vitalName,
                        resultName: ddVitalResultList[i].resultName,
                        remark: ddVitalResultList[i].remark
                    });
                }
                $scope.vitalResultList = vitalVariationIDList;
                $scope.vitalResultNameList = vitalVariationNameList;
                //log(arrAttributeName);
            }
            else {
                $scope.vitalResultList = '';
                $scope.vitalResultNameList = '';
            }



            $scope.InputTypeList = result.iTypeList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  

    $scope.loadAttValue = function (attID) {
        //alert(problemID);

        
        var param = {
            attributeID: attID
        };

        
        dataFactory.DiseaseClinicalFeatureGetAttValueList(param).then(function (response) {
            var result = response.data;
            $scope.AttributeValue = result.attValueList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
   
 

 
    $scope.clr = function () {

        $scope.ddlDisease = -1;
        arrAttributeID = [];
         arrAttributeName = [];
        $scope.attributeList = '';
        $scope.attributeNameList = '';
        $scope.vitalResultList = '';
        $scope.vitalResultNameList = '';
     
    };
    $scope.initControls();
   
});
