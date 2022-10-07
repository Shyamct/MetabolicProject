app.controller('problemVitalRelationCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var ProblemVitalRelationId = 0;
    var arr = [];
    $scope.vitalRelationList = [];
    $scope.btnAdd = false;

    $scope.genderList = [{ 'genderCode': "M", 'genderName': "Male" }, { 'genderCode': "F", 'genderName': "Female" }, { 'genderCode': "C", 'genderName': "Any" }];

    $scope.vitalList = function () {
        dataFactory.VitalMasterList().then(function (response) {
            var result = response.data;
            $scope.VitalMasterList = result.vitalMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.StatusList = function () {
        dataFactory.InvestigationStatusList().then(function (response) {
            var result = response.data;
            $scope.investigationStatus = result.investigationStatus;

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

    $scope.vRelationList = function () {
        dataFactory.ProblemVitalRelationList().then(function (response) {
            var result = response.data;
            $scope.ProblemVitalRelationList = result.problemVitalRelation;
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

    $scope.addVitalRelation = function () {

        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Problem');
            return false;
        }
        if ($scope.vitalRelationList.some(data => data.vitalId == $scope.ddlVital && data.statusID == $scope.ddlStatus && data.rangeFrom == $scope.txtRangeFrom && data.rangeTo == $scope.txtRangeTo && data.rangeUnitId == $scope.ddlRangeUnit)) {
            toaster.pop('error', "Error", 'Already Added');
            return false;
        }
        arr.push({
            vitalId: $scope.ddlVital,
            vitalName: $("#ddlVital option:selected").text().trim(),
            statusID: $scope.ddlStatus,
            statusName: $("#ddlStatus option:selected").text().trim(),
            rangeFrom: $scope.txtRangeFrom,
            rangeTo: $scope.txtRangeTo,
            rangeUnitId: $scope.ddlRangeUnit
        });
        $scope.vitalRelationList = arr;
    };

    $scope.deleteVitalRelationList = function (index) {
        $scope.vitalRelationList.splice(index, 1);
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

    $scope.SaveProblemVitalRelation = function () {
        if ($scope.ddlProblem == 0) {
            alert('Select Problem');
            return false;
        }
        if ($scope.ddlVital == 0) {
            alert('Select Vital');
            return false;
        }
        if ($scope.ddlStatus == 0) {
            alert('Select Vital Status');
            return false;
        }
        var params = {
            id: ProblemVitalRelationId,
            problemId: $scope.ddlProblem,
            vitalID: $scope.ddlVital,
            statusId: $scope.ddlStatus,
            vitalRelationList: JSON.stringify($scope.vitalRelationList),
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
        dataFactory.SaveProblemVitalRelation(params).then(function (response) {

            var message = ProblemVitalRelationId > 0 ? 'Update Problem Vital Relation' : 'Save Problem Vital Relation';
            $rootScope.activityLog(response, message, 'Problem Vital Relation', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.vRelationList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.DeleteProblemVitalRelation = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteProblemVitalRelation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.vRelationList();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Problem Vital Relation', ' Problem Vital Relation', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    
    $scope.edit = function (paramid) {
        ProblemVitalRelationId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.ProblemVitalRelationList(params).then(function (response) {
            var result = response.data;
            var list = result.problemVitalRelation;
            $scope.ddlProblem = list[0].problemID;
            $scope.GetAttributeList();
            $scope.ddlAttribute = list[0].attributeID;
            $scope.GetAttributeValueList();
            $scope.attributeValue = list[0].attributeValueID; 
            $scope.ddlVital = list[0].vitalId;
            $scope.ddlStatus = list[0].statusID;
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
        ProblemVitalRelationId = 0;
        $scope.ddlProblem = 0;
        $scope.ddlVital = 0;
        $scope.ddlStatus = 0;
        $scope.vitalRelationList = [];
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

    $scope.StatusList();
    $scope.vRelationList();
    $scope.pMasterList();
    $scope.vitalList();
    $scope.getUnitList();
});