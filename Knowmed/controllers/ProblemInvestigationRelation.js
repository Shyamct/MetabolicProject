app.controller('problemInvestigationRelationCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var problemInvestigationRelationId = 0; 
    var arr = [];
    $scope.investigationRelationList = [];
    $scope.btnAdd = false;

    $scope.genderList = [{ 'genderCode': "M", 'genderName': "Male" }, { 'genderCode': "F", 'genderName': "Female" }, { 'genderCode': "C", 'genderName': "Any" }];

    $scope.stMasterList = function () {
        dataFactory.SubTestMasterList().then(function (response) {
            var result = response.data;
            $scope.SubTestMasterList = result.subTestMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.PropertyNameList = function () {
        var params = {
            subTestId: $scope.ddlSubTest
            
        };
        dataFactory.RelationPropertyNameList(params).then(function (response) {
            var result = response.data;
            $scope.propertyNameMasterList = result.propertyNameMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.PropertyValueList = function () {
        var params = {
            resultPropertyID: $scope.ddlPropertyName

        };
        dataFactory.RelationPropertyValueList(params).then(function (response) {
            var result = response.data;
            $scope.propertyValueMasterList = result.propertyValueMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.pMasterList = function () {
        dataFactory.ProblemMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemMasterList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.piRelationList = function () {
        dataFactory.ProblemInvestigationRelationList().then(function (response) {
            var result = response.data;
            $scope.ProblemInvestigationRelationList = result.problemInvestigation;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
       
    $scope.getUnitList = function () {
        var params = {
            id: 0
        };
        dataFactory.UnitList(params).then(function (response) {
            var result = response.data;
            $scope.unitList = result.unitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.addInvestigationRelation = function () {

        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Problem');
            return false;
        }
        if ($scope.investigationRelationList.some(data => data.subTestId == $scope.ddlSubTest && data.resultPropertyID == $scope.ddlPropertyName && data.resultPropertyValueID == $scope.ddlPropertyValue && data.rangeFrom == $scope.txtRangeFrom && data.rangeTo == $scope.txtRangeTo && data.rangeUnitId == $scope.ddlRangeUnit)) {
            toaster.pop('error', "Error", 'Already Added');
            return false;
        }
        arr.push({
            subTestId: $scope.ddlSubTest,
            subTestName: $("#ddlSubTest option:selected").text().trim(),
            resultPropertyID: $scope.ddlPropertyName,
            resultPropertyName: $("#ddlPropertyName option:selected").text().trim(),
            resultPropertyValueID: $scope.ddlPropertyValue,
            resultPropertyValueName: $("#ddlPropertyValue option:selected").text().trim(),
            rangeFrom: $scope.txtRangeFrom,
            rangeTo: $scope.txtRangeTo,
            rangeUnitId: $scope.ddlRangeUnit
        });
        $scope.investigationRelationList = arr;
    };

    $scope.deleteInvestigationRelationList = function (index) {
        $scope.investigationRelationList.splice(index, 1);
    };

    $scope.GetAttributeList = function () {
        var params = {
            effectID: $scope.ddlProblem
        };
        dataFactory.GetAttributeListNew(params).then(function (response) {
            var result = response.data;
            $scope.attributeList = result.attributeList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetAttributeValueList = function () {

        var params = {
            attributeTypeID: $scope.ddlAttribute
        };
        dataFactory.GetAttributeValueListNew(params).then(function (response) {
            var result = response.data;
            $scope.attributeValueList = result.attributeValueList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveProblemInvestigationRelation = function () {
        if ($scope.ddlProblem == 0) {
            alert('Select Problem');
            return false;
        }
        if ($scope.ddlSubTest == 0) {
            alert('Select Sub Test');
            return false;
        }
        if ($scope.ddlPropertyName == 0) {
            alert('Select Result Property Name');
            return false;
        }
        if ($scope.ddlPropertyValue == 0) {
            alert('Select Result Property Value');
            return false;
        }
        var params = {
            id: problemInvestigationRelationId,
            problemId: $scope.ddlProblem,
            subTestId: $scope.ddlSubTest,
            resultPropertyID: $scope.ddlPropertyName,
            resultPropertyValueID: $scope.ddlPropertyValue,
            investigationRelationList: JSON.stringify($scope.investigationRelationList),
            ageFrom: $scope.txtAgeFrom,
            ageTo: $scope.txtAgeTo,
            ageUnitID: $scope.ddlAgeUnit,
            gender: $scope.ddlGender,
            attributeID: $scope.ddlAttribute,
            attributeValueID: $("input[name='rdAttribute']:checked").val(),
            rangeFrom: $scope.txtRangeFrom,
            rangeTo: $scope.txtRangeTo,
            rangeUnitId: $scope.ddlRangeUnit,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveProblemInvestigationRelation(params).then(function (response) {
            var message = problemInvestigationRelationId > 0 ? 'Update Problem Investigation Relation' : 'Save Problem Investigation Relation';
            $rootScope.activityLog(response, message, 'Problem Investigation Relation', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.piRelationList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteProblemInvestigationRelation = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteProblemInvestigationRelation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.piRelationList();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Problem Investigation Relation', ' Problem Investigation Relation', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        problemInvestigationRelationId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.ProblemInvestigationRelationList(params).then(function (response) {
            var result = response.data;
            var list = result.problemInvestigation;
            $scope.ddlProblem = list[0].problemID;
            $scope.GetAttributeList();
            $scope.ddlAttribute = list[0].attributeID;
            $scope.GetAttributeValueList();
            $scope.attributeValue = list[0].attributeValueID; 
            $scope.ddlSubTest = list[0].subTestID;
            var params = {
                subTestId: list[0].subTestID
            };
            dataFactory.RelationPropertyNameList(params).then(function (response) {
                var result = response.data;
                $scope.propertyNameMasterList = result.propertyNameMasterList;
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
            $scope.ddlPropertyName = list[0].propertyNameID;
            var paramss = {
                resultPropertyID: list[0].propertyNameID
            };
            dataFactory.RelationPropertyValueList(paramss).then(function (response) {
                var result = response.data;
                $scope.propertyValueMasterList = result.propertyValueMasterList;
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
            $scope.ddlPropertyValue = list[0].propertyValueID;

            $scope.txtAgeFrom = list[0].ageFrom;
            $scope.txtAgeTo = list[0].ageTo;
            $scope.ddlAgeUnit = list[0].ageUnitID;
            $scope.ddlGender = list[0].gender;
            $scope.txtRangeFrom = list[0].rangeFrom;
            $scope.txtRangeTo = list[0].rangeTo;
            $scope.ddlRangeUnit = list[0].rangeUnitId;
            $scope.btnAdd = true;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        problemInvestigationRelationId = 0;
        $scope.ddlProblem = 0;
        $scope.ddlSubTest = 0;
        $scope.ddlPropertyName = 0;
        $scope.ddlPropertyValue = 0;
        $scope.investigationRelationList = [];
        arr = [];
        $scope.txtAgeFrom = '';
        $scope.txtAgeTo = '';
        $scope.ddlAgeUnit = 0;
        $scope.ddlGender = 0;
        $scope.ddlAttribute = 0;
        $scope.GetAttributeValueList();
        $scope.txtRangeFrom = '';
        $scope.txtRangeTo = '';
        $scope.ddlRangeUnit = 0;
        $scope.btnAdd = false;
    };
    
    $scope.piRelationList();
    $scope.pMasterList();
    $scope.stMasterList();
    $scope.getUnitList();
});