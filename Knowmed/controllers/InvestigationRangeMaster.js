app.controller('investigationRangeMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existId = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsInvestigationRangeMaster().then(function (response) {
            var result = response.data;
            $scope.investigationSubTest = result.investigationSubTest;
            $scope.countryMaster = result.countryMaster;
            $scope.machineMaster = result.machineMaster;
            $scope.bodyOrganRegion = result.bodyOrganRegion;
            $scope.labMaster = result.labMaster;
            $scope.unitMaster = result.unitMaster;
            $scope.unitMaster2 = result.unitMaster2;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.InvestigationRangeList = function () {
        $scope.clr();
        var params = {
            id: existId,
            subTestID: $scope.ddlSubTest
        };
        dataFactory.InvestigationRangeList(params).then(function (response) {
            var result = response.data;
            $scope.investigationRangeList = result.investigationRangeList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveInvestigationRangeMaster = function () {

        if ($scope.ddlSubTest == 0) {
            toaster.pop('error', "Error", 'Please Select Sub Test');
            return false;
        }
        if ($scope.ddlGender == 0) {
            toaster.pop('error', "Error", 'Please Select Gender');
            return false;
        }
        if (isEmpty($scope.txtAgeMin)) {
            toaster.pop('error', "Error", 'Please Enter Min Age');
            return false;
        }
        if (isEmpty($scope.txtAgeMax)) {
            toaster.pop('error', "Error", 'Please Enter Max Age');
            return false;
        }
        if (parseInt($scope.txtAgeMin) > parseInt($scope.txtAgeMax)) {
            toaster.pop('error', "Error", 'Max values should be greater than Min value');
            return false;
        }

        var params = {
            id: existId,
            subTestID: $scope.ddlSubTest,
            countryID: $scope.ddlCountry,
            machineID: $scope.ddlMachine,
            labID: $scope.ddlLab,
            systemID: $scope.ddlSystem,
            gender: $scope.ddlGender,
            minAge: $scope.txtAgeMin,
            maxAge: $scope.txtAgeMax,
            ageUnitID: $scope.ddlAgeUnit,
            minRange: $scope.txtMinRange,
            maxRange: $scope.txtMaxRange,
            rangeUnitID: $scope.ddlUnitRange,
            normalResultText: $scope.txtNormalResultText,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
       
        dataFactory.SaveInvestigationRangeMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = existId > 0 ? 'UPDATE INVESTIGATION RANGE MASTER' : 'SAVE INVESTIGATION RANGE MASTER';
            $rootScope.activityLog(response, message, 'INVESTIGATION RANGE MASTER', '');
            $scope.InvestigationRangeList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteInvestigationRangeMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteInvestigationRangeMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.InvestigationRangeList();
                $rootScope.activityLog(response, 'DELETE INVESTIGATION RANGE MASTER', 'INVESTIGATION RANGE MASTER', '');
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
        dataFactory.InvestigationRangeList(params).then(function (response) {
            var result = response.data;
            var list = result.investigationRangeList;
            $scope.ddlSubTest = list[0].subTestID;
            $scope.ddlCountry = list[0].countryID;
            $scope.ddlMachine = list[0].machineID;
            $scope.ddlLab = list[0].labID;
            $scope.ddlSystem = list[0].systemID;
            $scope.ddlGender = list[0].gender;
            $scope.txtAgeMin = list[0].minAge;
            $scope.txtAgeMax = list[0].maxAge;
            $scope.ddlAgeUnit = list[0].ageUnitID;
            $scope.txtMinRange = list[0].minRange;
            $scope.txtMaxRange = list[0].maxRange;
            $scope.ddlUnitRange = list[0].rangeUnitID;
            $scope.txtNormalResultText = list[0].normalResultText;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {
        $scope.ddlSubTest = 0;
        $scope.ddlCountry = 0;
        $scope.ddlMachine = 0;
        $scope.ddlLab = 0;
        $scope.ddlSystem = 0;
        $scope.ddlGender = 0;
        $scope.txtAgeMin = '';
        $scope.txtAgeMax = '';
        $scope.ddlAgeUnit = 0;
        $scope.txtMinRange = '';
        $scope.txtMaxRange = '';
        $scope.ddlUnitRange = 0;
        $scope.txtNormalResultText = '';
        existId = 0;
    };
    $scope.initControls();
    $scope.InvestigationRangeList();
});