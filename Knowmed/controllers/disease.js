app.controller('diseaseCtrl', function ($scope, dataFactory, toaster, $state) {
    var pkId = 0;
    var arr = [];
    var resultPropertyList = [];
    var resultPropertyValueList = [];
    var effectLevelList = [];

    var list4 = '';
    $scope.initControls = function () {
        var params = {
            departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID)
        };
        dataFactory.initControlsDisease(params).then(function (response) {
            var result = response.data;
            $scope.diseaseList = result.diseaseList;
            if (!isEmpty($state.params.id)) {
                $scope.ddlDisease = $state.params.id;
            }
            $scope.subTestList = result.subTestList;
            resultPropertyList = result.resultPropertyList;
            resultPropertyValueList = result.resultPropertyValueList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.problemLevelList = function () {
        dataFactory.ProblemLevelList().then(function (response) {
            var result = response.data;
            effectLevelList = result.problemLevel;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getResult = function (subtest) {
        subtest.resultPropertyList = resultPropertyList;
        subtest.resultPropertyValueList = resultPropertyValueList;
        subtest.effectLevelList = effectLevelList;
        //subtest.ddlResultProperty = 0;
        //subtest.ddlResultPropertyValue = 0;
        //var params = {
        //    subTestID: id
        //}
        //dataFactory.GetResultType(params).then(function (response) {
        //    var result = response.data;
        //    $scope.resultPropertyList = result.resultTypeList;
        //}, function (error) {
        //    toaster.pop('error', "Error", error);
        //});
    };
    //$scope.getResultValue = function (id) {       
    //    var params = {
    //        resultPropertyID: id
    //    }
    //    dataFactory.GetResultValue(params).then(function (response) {
    //        var result = response.data;
    //        $scope.resultPropertyValueList = result.resultValueList;
    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};

    $scope.saveDiseaseInvestigation = function () {
        if (pkId == 0) {
            if ($scope.ddlDisease == -1) {
                toaster.pop('error', "Error", 'Please Select Problem Reference');
                return false;
            }
            arr.length = 0;
            for (var ii = 0; ii < list4.length; ii++) {
                for (var i = 0; i < $scope.subTestList.length; i++) {
                    if ($scope.ddlDisease == -1) {
                        toaster.pop('error', "Error", 'Please Select Problem Reference');
                        return false;
                    }
                    if ($scope.subTestList[i].selected == true) {
                        if ($scope.subTestList[i].ddlResultProperty == 0) {
                            toaster.pop('error', "Error", 'Please Select Result Type For Selected Test');
                            return false;
                        }
                        if ($scope.subTestList[i].ddlResultPropertyValue == 0) {
                            toaster.pop('error', "Error", 'Please Select Result Selected Test');
                            return false;
                        }
                        arr.push({
                            problemReferenceID: list4[ii].id,
                            subTestID: $scope.subTestList[i].subTestID,
                            effectLevelID: $scope.subTestList[i].ddlEffectLevel,
                            resultPropertyID: $scope.subTestList[i].ddlResultProperty,
                            resultPropertyValueID: $scope.subTestList[i].ddlResultPropertyValue,
                            reason: $scope.subTestList[i].txtRemark,

                        });
                    }
                }
            }
            $scope.problemInvestigationList = arr;
            if (arr.length == 0) {
                toaster.pop('error', "Error", 'Please Select Any Test');
                return false;
            }
            var obj = {
                problemInvestigationId: pkId,
                problemReferenceID: $scope.ddlDisease,
                effectLevelID: $scope.ddlEffectLevel,
                lstProblemInvestigation: $scope.problemInvestigationList,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid),
                moduleType: 'problemInvestigation',
                referenceType: 'problemInvestigation',
                bookID: $scope.ddlBook,
                pageNo: $scope.txtPageNo,
                edition: $scope.txtEdition,
                reference: $scope.txtReference
            };
        }
        else if (pkId > 0) {
            if ($scope.ddlSubTest == 0) {
                toaster.pop('error', "Error", 'Please Select Test');
                return false;
            }
            if ($scope.ddlResultProperty == 0) {
                toaster.pop('error', "Error", 'Please Select Result Type');
                return false;
            }
            if ($scope.ddlResultPropertyValue == 0) {
                toaster.pop('error', "Error", 'Please Select Result');
                return false;
            }
            var obj = {
                problemInvestigationId: pkId,
                subTestID: $scope.ddlSubTest,
                effectLevelID: $scope.ddlEffectLevel,
                reason: $scope.txtRemark,
                resultPropertyID: $scope.ddlResultProperty,
                resultPropertyValueID: $scope.ddlResultPropertyValue,
                moduleType: 'problemInvestigation',
                referenceType: 'problemInvestigation',
                bookID: $scope.ddlBookEdit,
                pageNo: $scope.txtPageNoEdit,
                edition: $scope.txtEditionEdit,
                reference: $scope.txtReferenceEdit,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
        }
        dataFactory.saveDiseaseInvestigation(obj).then(function (response) {
            $scope.GetInvestigationDiseaseList();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetInvestigationDiseaseList = function () {
        $scope.clr();
        var params = {
            problemReferenceID: $scope.ddlDisease
        };
        dataFactory.investigationDiseaseList(params).then(function (response) {
            var result = response.data;
            $scope.investigationList = result.investigationList;
            list4 = result.otherDepartmentList;

            log(result.investigationList);

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.investigationDiseaseList = function () {
        var params = {
            id: null
        };
        dataFactory.investigationDiseaseList(params).then(function (response) {
            var result = response.data;
            $scope.investigationList = result.investigationList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    //$scope.saveDiseaseInvestigation = function (obj) {

    //    log(obj);
    //if ($scope.ddlDisease == -1) {
    //    alert('Please Select Problem Reference');
    //    return false;
    //}
    //if ($scope.ddlSubTest == 0) {
    //    alert('Please Select Sub Test');
    //    return false;
    //}
    //if ($scope.ddlSampleType == 0) {
    //    alert('Please Select Sample');
    //    return false;
    //}
    //if ($scope.ddlSampleType == 0) {
    //    alert('Please Select Sample');
    //    return false;
    //}
    //var params = {
    //    problemInvestigationId: pkId,
    //    problemReferenceID: $scope.ddlDisease,
    //    subTestID: $scope.ddlSubTest,
    //    sampleID: $scope.ddlSampleType,
    //    reason: $scope.txtReason,
    //    resultPropertyID: $scope.ddlResultProperty,
    //    resultPropertyValueID: $scope.ddlResultPropertyValue,
    //    resultDetails: $scope.txtResultDetail,
    //    userID: Number(UtilsCache.getSession('USERDETAILS').userid)
    //};

    //dataFactory.saveDiseaseInvestigation(params).then(function (response) {
    //    $scope.GetInvestigationDiseaseList();
    //    toaster.pop('success', "Success", 'Saved Successfully.');
    //    $scope.clr();
    //}, function (error) {
    //    toaster.pop('error', "Error", error);
    //});
    //};

    $scope.edit = function (paramid) {
        pkId = paramid;
        var params = {
            problemInvestigationId: paramid,
            problemReferenceID: $scope.ddlDisease,
        };
        dataFactory.investigationDiseaseList(params).then(function (response) {
            var result = response.data;
            var list = result.investigationList;

            if (list.length > 0) {
                $scope.resultPropertyList = resultPropertyList;
                $scope.resultPropertyValueList = resultPropertyValueList;
                $scope.effectLevelList = effectLevelList;
                $scope.ddlSubTest = list[0].subTestID;
                $scope.ddlEffectLevel = list[0].effectLevelID;
                $scope.txtRemark = list[0].remark;
                $scope.ddlResultProperty = list[0].resultPropertyID;
                $scope.ddlResultPropertyValue = list[0].resultPropertyValueID;
                $scope.ddlBookEdit = list[0].bookID;
                $scope.txtPageNoEdit = list[0].pageNo;
                $scope.txtEditionEdit = list[0].edition;
                $scope.txtReferenceEdit = list[0].reference;
                $('#myModal').modal('show');
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                problemInvestigationId: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteDiseaseInvestigation(params).then(function (response) {
                $scope.GetInvestigationDiseaseList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $(function () {
        // when the modal is closed
        $('#myModal').on('hidden.bs.modal', function () {
            pkId = 0;
            $scope.ddlSubTest = 0;
            $scope.ddlEffectLevel = 0;
            $scope.ddlResultProperty = 0;
            $scope.ddlResultPropertyValue = 0;
            $scope.txtRemark = '';
        });
    });
    $scope.clr = function () {
        pkId = 0;
        for (var i = 0; i < $scope.subTestList.length; i++) {
            $scope.subTestList[i].selected = false;
            $scope.subTestList[i].ddlResultProperty = 0;
            $scope.subTestList[i].ddlEffectLevel = 0;
            $scope.subTestList[i].ddlResultPropertyValue = 0;
            $scope.subTestList[i].txtRemark = '';
        }
    };
    $scope.initControls();
    $scope.problemLevelList();
    //$scope.investigationDiseaseList();
});
