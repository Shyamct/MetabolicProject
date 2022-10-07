app.controller('differentialDiagnosisNewCtrl', function ($scope, dataFactory, toaster) {
    var arr = [];
    var arrDD = [];
    var intakeId = 0;
    $scope.dtArrList = '';
    $scope.dtArrListDD = '';
    var arrInvestigation = [];
    var arrInvestigationDD = [];
    $scope.dtArrInvestigationList = [];
    //////  Start Diagnosis //////////////

    $scope.checkUncheckAllSign = function () {
        if ($scope.checkallSign) {
            $scope.checkallSign = true;
        } else {
            $scope.checkallSign = false;
        }
        angular.forEach($scope.dAttributeListSign, function (user) {
            user.checked = $scope.checkallSign;
        });
    };

    $scope.checkUncheckAllSymptom = function () {
        if ($scope.checkallSymptom) {
            $scope.checkallSymptom = true;
        } else {
            $scope.checkallSymptom = false;
        }
        angular.forEach($scope.dAttributeListSymptom, function (user) {
            user.checked = $scope.checkallSymptom;
        });
    };

    $scope.checkUncheckAllInvestigation = function () {
        if ($scope.checkallInvestigation) {
            $scope.checkallInvestigation = true;
        } else {
            $scope.checkallInvestigation = false;
        }
        angular.forEach($scope.dInvestigationList, function (user) {
            user.checked = $scope.checkallInvestigation;
        });
    };



    $scope.checkUncheckAllSignDD = function () {
        if ($scope.checkallSignDD) {
            $scope.checkallSignDD = true;
        } else {
            $scope.checkallSignDD = false;
        }
        angular.forEach($scope.dAttributeListSignDD, function (user) {
            user.checked = $scope.checkallSignDD;
        });
    };

    $scope.checkUncheckAllSymptomDD = function () {
        if ($scope.checkallSymptomDD) {
            $scope.checkallSymptomDD = true;
        } else {
            $scope.checkallSymptomDD = false;
        }
        angular.forEach($scope.dAttributeListSymptomDD, function (user) {
            user.checked = $scope.checkallSymptomDD;
        });
    };

    $scope.checkUncheckAllInvestigationDD = function () {
        if ($scope.checkallInvestigationDD) {
            $scope.checkallInvestigationDD = true;
        } else {
            $scope.checkallInvestigationDD = false;
        }
        angular.forEach($scope.dInvestigationListDD, function (user) {
            user.checked = $scope.checkallInvestigationDD;
        });
    };

    //$scope.updateCheckallSign = function ($index, user) {
    //    var userTotal = $scope.users.length;
    //    var count = 0;
    //    angular.forEach($scope.users, function (item) {
    //        if (item.checked) {
    //            count++;
    //        }
    //    });

    //    if (userTotal == count) {
    //        $scope.checkallSign = true;
    //    } else {
    //        $scope.checkallSign = false;
    //    }
    //};

    $scope.DiagnosisList = function () {
        var param = {
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.DiagnosisList(param).then(function (response) {
            var result = response.data;
            $scope.DiagnosisList = result.diseaseList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AttValueList = function (problemId, id) {
        var param = [];
        if (problemId) {
            intakeId = id;
            param = {
                problemMasterID: problemId
            };
        }
        else {
            param = {
                problemMasterID: $scope.ddlInputProblem
            };
        }
        dataFactory.DiseaseDepartmentAttributeValueListNew(param).then(function (response) {
            var result = response.data;
            if (problemId) {
                $scope.AttributeValueModelList = uniq(result.problemAttributeValue, 'attributeName');
            }
            else {
                $scope.AttributeValueList = uniq(result.problemAttributeValue, 'attributeName');
                $scope.AttributeValue = result.problemAttributeValue;
                $scope.ddlAttributeName = 0;
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AttributeValueList = function () {
        $scope.ddlAttributeValueModel = 0;
        var param = {
            diagnosisId: $scope.ddlAttributeNameModel
        };
        dataFactory.AttributeValueList(param).then(function (response) {
            var result = response.data;
            $scope.AttributeModelValue = result.attributeValueList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.diagnosisAttributeList = function () {
        $scope.dAttributeListSign = [];
        $scope.dAttributeListSymptom = [];
        var param = {
            diagnosisId: $scope.ddlDiagnosis,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.AttributeList(param).then(function (response) {
            var result = response.data;
            console.log(result.attributeList);
            //$scope.dAttributeList = result.attributeList;
            $.each(result.attributeList, function (i, list) {
                if (list.inputTypeId === 1) {
                    $scope.dAttributeListSign.push(list);
                }
                if (list.inputTypeId === 2) {
                    $scope.dAttributeListSymptom.push(list);
                }
            });
            $scope.dInvestigationList = result.investigationList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

        dataFactory.DiagnosisList(param).then(function (response) {
            var result = response.data;
            $scope.ProblemList = result.problemList;
            $scope.SubTestList = result.subTestList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.dDiagnosisAttributeList = function () {
        var param = {
            diagnosisId: $scope.ddlddDiagnosis,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.AttributeList(param).then(function (response) {
            var result = response.data;
            $scope.ddAttributeList = result.attributeList;
            $scope.ddInvestigationList = result.investigationList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.rpList = function (subTestId, resultPropertyID, resultPropertyValueID, id) {
        var param = [];
        intakeId = id;
        if (subTestId) {
            param = {
                diagnosisId: 185
            };
        }
        else {
            param = {
                diagnosisId: $scope.ddlTest
            };
        }
        dataFactory.ResultPropertyList(param).then(function (response) {
            var result = response.data;
            $scope.ResultPropertyList = result.resultPropertyList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.rpvList = function (id) {
        var param = [];
        if (id) {
            param = {
                diagnosisId: id
            };
        }
        else {
            param = {
                diagnosisId: $scope.ddlResultProperty
            };
        }
        dataFactory.ResultPropertyValueList(param).then(function (response) {
            var result = response.data;
            $scope.ResultPropertyValueList = result.resultPropertyValueList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.toggle = function (source) {
        checkboxes = document.getElementsByName('signCheck');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.currentTarget.checked;
        }
    };
    $scope.toggle2 = function (source) {
        checkboxes = document.getElementsByName('symptomCheck');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.currentTarget.checked;
        }
    };
    $scope.toggle3 = function (source) {
        checkboxes = document.getElementsByName('investigationCheck');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.currentTarget.checked;
        }
    };

    $scope.addAttribute = function () {
        arr = [];
        if ($scope.ddlInputType === -1) {
            alert('Please Select Input Type !!');
            return false;
        }
        if ($scope.ddlInputProblem === -1) {
            alert('Please Select Problem !!');
            return false;
        }
        if ($scope.ddlAttributeName > 0) {
            var isChecked = false;
            for (var i = 0; i < $scope.AttributeValue.length; i++) {
                if ($scope.ddlAttributeName == $scope.AttributeValue[i].attributeID) {
                    if ($scope.AttributeValue[i].Selected) {
                        isChecked = true;
                        arr.push({
                            inputTypeId: $scope.ddlInputType,
                            problemId: $scope.ddlInputProblem,
                            attributeId: $scope.ddlAttributeName,
                            attributeValueId: $scope.AttributeValue[i].problemAttributeValueId
                        });
                    }
                }
            }
            if (isChecked === false) {
                alert('Please Select Attribute !!');
                return false;
            }
        }
        else {
            arr.push({
                inputTypeId: $scope.ddlInputType,
                problemId: $scope.ddlInputProblem,
                attributeId: 0,
                attributeValueId: 0
            });
        }
        $scope.dtArrList = arr;
        var param = {
            dtDiagnosis: $scope.dtArrList,
            diagnosisId: $scope.ddlDiagnosis,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveAttribute(param).then(function (response) {
            $scope.diagnosisAttributeList();
            $scope.clearAttribute();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.addInvestigation = function () {
        arrInvestigation = [];
        if ($scope.ddlTest === -1) {
            alert('Please Select Test !!');
            return false;
        }
        if ($scope.ddlResultProperty === -1) {
            alert('Please Select Property !!');
            return false;
        }
        if ($scope.ddlResultPropertyValue === -1) {
            alert('Please Select Property Value !!');
            return false;
        }
        if ($scope.txtResultDetails == '' || $scope.txtResultDetails == undefined) {
            arrInvestigation.push({
                subTestID: $scope.ddlTest,
                resultPropertyID: $scope.ddlResultProperty,
                resultPropertyValueID: $scope.ddlResultPropertyValue,
                resultDetails: ''
            });
        }
        else {
            arrInvestigation.push({
                subTestID: $scope.ddlTest,
                resultPropertyID: $scope.ddlResultProperty,
                resultPropertyValueID: $scope.ddlResultPropertyValue,
                resultDetails: $scope.txtResultDetails
            });
        }

        $scope.dtArrInvestigationList = arrInvestigation;
        var param = {
            dtInvestigation: $scope.dtArrInvestigationList,
            diagnosisId: $scope.ddlDiagnosis,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveInvestigation(param).then(function (response) {
            $scope.diagnosisAttributeList();
            $scope.clearInvestigation();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DiagnosisList();
    $scope.clearAttribute = function () {
        $scope.ddlInputType = -1;
        $scope.ddlInputProblem = -1;
        $scope.ddlAttributeName = 0;
    };
    $scope.clearInvestigation = function () {
        $scope.ddlTest = -1;
        $scope.ddlResultProperty = -1;
        $scope.ddlResultPropertyValue = -1;
        $scope.txtResultDetails = '';
    };
    $scope.updateAttribute = function () {
        arr = [];
        if ($scope.ddlAttributeNameModel === 0) {
            alert('Please Select Attribute Name !!');
            return false;
        }
        if ($scope.ddlAttributeValueModel === 0) {
            alert('Please Select Attribute Value !!');
            return false;
        }
        arr.push({
            inputTypeId: 1,
            problemId: 0,
            attributeId: $scope.ddlAttributeNameModel,
            attributeValueId: $scope.ddlAttributeValueModel
        });
        $scope.list = arr;
        var param = {
            dtDiagnosis: $scope.list,
            diagnosisId: intakeId
        };
        dataFactory.UpdateAttribute(param).then(function (response) {
            $scope.diagnosisAttributeList();
            $scope.clearAttribute();
            $scope.ddlAttributeNameModel = 0;
            $scope.ddlAttributeValueModel = 0;
            angular.element(document.querySelector('#myModal')).modal('hide');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.updateProperty = function () {
        arr = [];
        if ($scope.ddlPropertyNameModel === 0) {
            alert('Please Select Property Name !!');
            return false;
        }
        if ($scope.ddlPropertyValueModel === 0) {
            alert('Please Select Property Value !!');
            return false;
        }
        arr.push({
            subTestID: 0,
            resultPropertyID: $scope.ddlPropertyNameModel,
            resultPropertyValueID: $scope.ddlPropertyValueModel,
            resultDetails: ''
        });
        $scope.list = arr;
        var param = {
            dtInvestigation: $scope.list,
            diagnosisId: intakeId
        };
        dataFactory.UpdateProperty(param).then(function (response) {
            $scope.diagnosisAttributeList();
            $scope.clearAttribute();
            $scope.ddlPropertyNameModel = 0;
            $scope.ddlPropertyValueModel = 0;
            angular.element(document.querySelector('#myModal1')).modal('hide');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    //////  End Diagnosis //////////////


    //////  Start Differential Diagnosis //////////////

    $scope.DiagnosisListDD = function () {
        dataFactory.DiagnosisList().then(function (response) {
            var result = response.data;
            $scope.DiagnosisListDD = result.diseaseList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AttValueListDD = function (problemId, id) {
        var param = [];
        if (problemId) {
            intakeId = id;
            param = {
                problemMasterID: problemId
            };
        }
        else {
            param = {
                problemMasterID: $scope.ddlInputProblemDD
            };
        }
        dataFactory.DiseaseDepartmentAttributeValueListNew(param).then(function (response) {
            var result = response.data;
            if (problemId) {
                $scope.AttributeValueModelListDD = uniq(result.problemAttributeValue, 'attributeName');
            }
            else {
                $scope.AttributeValueListDD = uniq(result.problemAttributeValue, 'attributeName');
                $scope.AttributeValueDD = result.problemAttributeValue;
                $scope.ddlAttributeNameDD = 0;
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AttributeValueListDD = function () {
        $scope.ddlAttributeValueModelDD = 0;
        var param = {
            diagnosisId: $scope.ddlAttributeNameModelDD
        };
        dataFactory.AttributeValueList(param).then(function (response) {
            var result = response.data;
            $scope.AttributeModelValueDD = result.attributeValueList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.diagnosisAttributeListDD = function () {

        $scope.dAttributeListSignDD = [];
        $scope.dAttributeListSymptomDD = [];
        var param = {
            diagnosisId: $scope.ddlDiagnosisDD,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.AttributeList(param).then(function (response) {
            var result = response.data;
            //$scope.dAttributeListDD = result.attributeList;

            $.each(result.attributeList, function (i, list) {
                if (list.inputTypeId === 1) {
                    $scope.dAttributeListSignDD.push(list);
                }
                if (list.inputTypeId === 2) {
                    $scope.dAttributeListSymptomDD.push(list);
                }
            });

            $scope.dInvestigationListDD = result.investigationList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

        dataFactory.DiagnosisList(param).then(function (response) {
            var result = response.data;
            $scope.ProblemListDD = result.problemList;
            $scope.SubTestListDD = result.subTestList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.dDiagnosisAttributeListDD = function () {
        var param = {
            diagnosisId: $scope.ddlddDiagnosisDD,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.AttributeList(param).then(function (response) {
            var result = response.data;
            $scope.ddAttributeListDD = result.attributeList;
            $scope.ddInvestigationListDD = result.investigationList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.rpListDD = function (subTestId, resultPropertyID, resultPropertyValueID, id) {
        var param = [];
        intakeId = id;
        if (subTestId) {
            param = {
                diagnosisId: subTestId
            };
        }
        else {
            param = {
                diagnosisId: $scope.ddlTestDD
            };
        }
        dataFactory.ResultPropertyList(param).then(function (response) {
            var result = response.data;
            $scope.ResultPropertyListDD = result.resultPropertyList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.rpvListDD = function (id) {
        var param = [];
        if (id) {
            param = {
                diagnosisId: id
            };
        }
        else {
            param = {
                diagnosisId: $scope.ddlResultPropertyDD
            };
        }
        dataFactory.ResultPropertyValueList(param).then(function (response) {
            var result = response.data;
            $scope.ResultPropertyValueListDD = result.resultPropertyValueList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.toggleDD = function (source) {
        checkboxes = document.getElementsByName('signCheckDD');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.currentTarget.checked;
        }
    };
    $scope.toggle2DD = function (source) {
        checkboxes = document.getElementsByName('symptomCheckDD');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.currentTarget.checked;
        }
    };
    $scope.toggle3DD = function (source) {
        checkboxes = document.getElementsByName('investigationCheckDD');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = source.currentTarget.checked;
        }
    };
    $scope.addAttributeDD = function () {
        arr = [];
        if ($scope.ddlInputTypeDD === -1) {
            alert('Please Select Input Type !!');
            return false;
        }
        if ($scope.ddlInputProblemDD === -1) {
            alert('Please Select Problem !!');
            return false;
        }
        if ($scope.ddlAttributeNameDD > 0) {
            var isChecked = false;
            for (var i = 0; i < $scope.AttributeValueDD.length; i++) {
                if ($scope.ddlAttributeNameDD == $scope.AttributeValueDD[i].attributeID) {
                    if ($scope.AttributeValueDD[i].Selected) {
                        isChecked = true;
                        arr.push({
                            inputTypeId: $scope.ddlInputTypeDD,
                            problemId: $scope.ddlInputProblemDD,
                            attributeId: $scope.ddlAttributeNameDD,
                            attributeValueId: $scope.AttributeValueDD[i].problemAttributeValueId
                        });
                    }
                }
            }
            if (isChecked === false) {
                alert('Please Select Attribute !!');
                return false;
            }
        }
        else {
            arr.push({
                inputTypeId: $scope.ddlInputTypeDD,
                problemId: $scope.ddlInputProblemDD,
                attributeId: 0,
                attributeValueId: 0
            });
        }
        $scope.dtArrList = arr;
        var param = {
            dtDiagnosis: $scope.dtArrList,
            diagnosisId: $scope.ddlDiagnosisDD,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveAttribute(param).then(function (response) {
            $scope.diagnosisAttributeListDD();
            $scope.clearAttributeDD();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.addInvestigationDD = function () {
        arrInvestigation = [];
        if ($scope.ddlTestDD === -1) {
            alert('Please Select Test !!');
            return false;
        }
        if ($scope.ddlResultPropertyDD === -1) {
            alert('Please Select Property !!');
            return false;
        }
        if ($scope.ddlResultPropertyValueDD === -1) {
            alert('Please Select Property Value !!');
            return false;
        }
        if ($scope.txtResultDetailsDD == '' || $scope.txtResultDetailsDD == undefined) {
            arrInvestigation.push({
                subTestID: $scope.ddlTestDD,
                resultPropertyID: $scope.ddlResultPropertyDD,
                resultPropertyValueID: $scope.ddlResultPropertyValueDD,
                resultDetails: ''
            });
        }
        else {
            arrInvestigation.push({
                subTestID: $scope.ddlTestDD,
                resultPropertyID: $scope.ddlResultPropertyDD,
                resultPropertyValueID: $scope.ddlResultPropertyValueDD,
                resultDetails: $scope.txtResultDetailsDD
            });
        }

        $scope.dtArrInvestigationList = arrInvestigation;
        var param = {
            dtInvestigation: $scope.dtArrInvestigationList,
            diagnosisId: $scope.ddlDiagnosisDD,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveInvestigation(param).then(function (response) {
            $scope.diagnosisAttributeListDD();
            $scope.clearInvestigationDD();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DiagnosisListDD();
    $scope.clearAttributeDD = function () {
        $scope.ddlInputTypeDD = -1;
        $scope.ddlInputProblemDD = -1;
        $scope.ddlAttributeNameDD = 0;
    };
    $scope.clearInvestigationDD = function () {
        $scope.ddlTestDD = -1;
        $scope.ddlResultPropertyDD = -1;
        $scope.ddlResultPropertyValueDD = -1;
        $scope.txtResultDetailsDD = '';
    };
    $scope.updateAttributeDD = function () {
        arr = [];
        if ($scope.ddlAttributeNameModelDD === 0) {
            alert('Please Select Attribute Name !!');
            return false;
        }
        if ($scope.ddlAttributeValueModelDD === 0) {
            alert('Please Select Attribute Value !!');
            return false;
        }
        arr.push({
            inputTypeId: 1,
            problemId: 0,
            attributeId: $scope.ddlAttributeNameModelDD,
            attributeValueId: $scope.ddlAttributeValueModelDD
        });
        $scope.list = arr;
        var param = {
            dtDiagnosis: $scope.list,
            diagnosisId: intakeId
        };
        dataFactory.UpdateAttribute(param).then(function (response) {
            $scope.diagnosisAttributeListDD();
            $scope.clearAttributeDD();
            $scope.ddlAttributeNameModelDD = 0;
            $scope.ddlAttributeValueModelDD = 0;
            angular.element(document.querySelector('#myModalDD')).modal('hide');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.updatePropertyDD = function () {
        arr = []; 
        if ($scope.ddlPropertyNameModelDD === 0) {
            alert('Please Select Property Name !!');
            return false;
        }
        if ($scope.ddlPropertyValueModelDD === 0) {
            alert('Please Select Property Value !!');
            return false;
        }
        arr.push({
            subTestID: 0,
            resultPropertyID: $scope.ddlPropertyNameModelDD,
            resultPropertyValueID: $scope.ddlPropertyValueModelDD,
            resultDetails: ''
        });
        $scope.list = arr;
        var param = {
            dtInvestigation: $scope.list,
            diagnosisId: intakeId
        };
        dataFactory.UpdateProperty(param).then(function (response) {
            $scope.diagnosisAttributeListDD();
            $scope.clearAttributeDD();
            $scope.ddlPropertyNameModelDD = 0;
            $scope.ddlPropertyValueModelDD = 0;
            angular.element(document.querySelector('#myModal1DD')).modal('hide');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.saveDifferentialDiagnosisNew = function () {
        arrInvestigationDD = [];
        arrInvestigation = [];
        $scope.dtArrListDD = [];
        $scope.dtArrInvestigationList = [];
        $scope.dtArrInvestigationListDD = [];
        $scope.dtArrList = [];
        var isChecked = false;
        var isCheckedDD = false;
        var isChecked1 = false;
        var isCheckedDD2 = false;
        arr = [];
        arrDD = [];
        if ($scope.ddlDiagnosis == -1) {
            alert('Please Select Diagnosis !!');
            return false;
        }
        if ($scope.dAttributeListSign.length > 0) {
            for (var i = 0; i < $scope.dAttributeListSign.length; i++) {
                if ($scope.dAttributeListSign[i].checked) {
                    isChecked = true;
                    arr.push({
                        inputTypeId: $scope.dAttributeListSign[i].inputTypeId,
                        problemId: $scope.dAttributeListSign[i].problemID,
                        attributeId: $scope.dAttributeListSign[i].attributeTypeID,
                        attributeValueId: $scope.dAttributeListSign[i].attributeValueID
                    });
                }
            }
        }
        if ($scope.dAttributeListSymptom.length > 0) {
            for (var i = 0; i < $scope.dAttributeListSymptom.length; i++) {
                if ($scope.dAttributeListSymptom[i].checked) {
                    isChecked = true;
                    arr.push({
                        inputTypeId: $scope.dAttributeListSymptom[i].inputTypeId,
                        problemId: $scope.dAttributeListSymptom[i].problemID,
                        attributeId: $scope.dAttributeListSymptom[i].attributeTypeID,
                        attributeValueId: $scope.dAttributeListSymptom[i].attributeValueID
                    });
                }
            }
        }
        //if (isChecked == false) {
        //    alert('Please Select Diagnosis Sign/Symtom !!');
        //    return false;
        //}
        if ($scope.dInvestigationList.length) {

            for (var i = 0; i < $scope.dInvestigationList.length; i++) {
                if ($scope.dInvestigationList[i].checked) {
                    isChecked1 = true;
                    arrInvestigation.push({
                        subTestID: $scope.dInvestigationList[i].subTestID,
                        resultPropertyID: $scope.dInvestigationList[i].resultPropertyID,
                        resultPropertyValueID: $scope.dInvestigationList[i].resultPropertyValueID,
                        resultDetails: $scope.dInvestigationList[i].resultDetails || ''
                    });
                }
            }
        }
        //if (isChecked1 == false) {
        //    alert('Please Select Diagnosis Investigation !!');
        //    return false;
        //}

        if ($scope.ddlDiagnosisDD == -1) {
            alert('Please Select Differential Diagnosis !!');
            return false;
        }
        if ($scope.dAttributeListSignDD.length > 0) {
            for (var i = 0; i < $scope.dAttributeListSignDD.length; i++) {
                if ($scope.dAttributeListSignDD[i].checked) {
                    isCheckedDD = true;
                    arrDD.push({
                        inputTypeId: $scope.dAttributeListSignDD[i].inputTypeId,
                        problemId: $scope.dAttributeListSignDD[i].problemID,
                        attributeId: $scope.dAttributeListSignDD[i].attributeTypeID,
                        attributeValueId: $scope.dAttributeListSignDD[i].attributeValueID
                    });
                }
            }
        }
        if ($scope.dAttributeListSymptomDD.length > 0) {
            for (var i = 0; i < $scope.dAttributeListSymptomDD.length; i++) {
                if ($scope.dAttributeListSymptomDD[i].checked) {
                    isCheckedDD = true;
                    arrDD.push({
                        inputTypeId: $scope.dAttributeListSymptomDD[i].inputTypeId,
                        problemId: $scope.dAttributeListSymptomDD[i].problemID,
                        attributeId: $scope.dAttributeListSymptomDD[i].attributeTypeID,
                        attributeValueId: $scope.dAttributeListSymptomDD[i].attributeValueID
                    });
                }
            }
        }
        //if (isCheckedDD == false) {
        //    alert('Please Select Differential Diagnosis Sign/Symtom !!');
        //    return false;
        //}

        if ($scope.dInvestigationListDD.length > 0) {
            for (var i = 0; i < $scope.dInvestigationListDD.length; i++) {
                if ($scope.dInvestigationListDD[i].checked) {
                    isCheckedDD2 = true;
                    arrInvestigationDD.push({
                        subTestID: $scope.dInvestigationListDD[i].subTestID,
                        resultPropertyID: $scope.dInvestigationListDD[i].resultPropertyID,
                        resultPropertyValueID: $scope.dInvestigationListDD[i].resultPropertyValueID,
                        resultDetails: $scope.dInvestigationListDD[i].resultDetails || ''
                    });
                }
            }
        }

        //if (isCheckedDD2 == false) {
        //    alert('Please Select Differential Diagnosis Investigation !!');
        //    return false;
        //}
        if ($scope.ddlDiagnosisType == '') {
            alert('Please Select Diagnosis Type !!');
            return false;
        }

        $scope.dtArrList = arr;
        $scope.dtArrListDD = arrDD;
        $scope.dtArrInvestigationList = arrInvestigation;
        $scope.dtArrInvestigationListDD = arrInvestigationDD;
        var param = {
            dtDiagnosis: $scope.dtArrList,
            dtDDdiagnosis: $scope.dtArrListDD,
            dtInvestigation: $scope.dtArrInvestigationList,
            dtDDinvestigation: $scope.dtArrInvestigationListDD,
            diagnosisId: $scope.ddlDiagnosis,
            diffDiagnosisId: $scope.ddlDiagnosisDD,
            diagnosisType: $scope.ddlDiagnosisType,
            reference: $scope.txtReference,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };   
        dataFactory.SavedifferentialDiagnosisNew(param).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            //$scope.diagnosisAttributeList();
            //$scope.clearAttribute();
            $scope.AllClear();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };


    $scope.AllClear = function () {
        $scope.ddlDiagnosis = -1;
        $scope.ddlDiagnosisDD = -1;
        $scope.ddlDiagnosisType = '';
        $scope.dAttributeListSign = [];
        $scope.dAttributeListSignDD = [];
        $scope.dAttributeListSymptom = [];
        $scope.dAttributeListSymptomDD = [];
        $scope.dInvestigationList = [];
        $scope.dInvestigationListDD = [];
        $scope.dtArrList = [];
        $scope.dtArrListDD = [];
        $scope.dtArrInvestigationList = [];
        $scope.dtArrInvestigationListDD = [];
    };
    //////  End Differential Diagnosis //////////////

});