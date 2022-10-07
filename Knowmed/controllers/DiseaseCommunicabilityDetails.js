app.controller('diseaseCommunicabilityDetailsCtrl', function ($scope, dataFactory, toaster) {
    var DiseaseCommunicabilityDetailsId = 0; 

    $scope.iUnitList = function () {
        dataFactory.IncubationUnitList().then(function (response) {
            var result = response.data;
            $scope.IncubationUnitList = result.incubationUnitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.cUnitList = function () {
        dataFactory.CommunicabilityUnitList().then(function (response) {
            var result = response.data;
            $scope.CommunicabilityUnitList = result.communicabilityUnitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.tUnitList = function () {
        dataFactory.TempUnitList().then(function (response) {
            var result = response.data;
            $scope.TempUnitList = result.tempUnitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.hUnitList = function () {
        dataFactory.HumidityUnitList().then(function (response) {
            var result = response.data;
            $scope.HumidityUnitList = result.humidityUnitMaster;
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

    $scope.DiseaseCommunicabilityList = function () {
        dataFactory.DiseaseCommunicabilityDetailsList().then(function (response) {
            var result = response.data;
            $scope.DiseaseCommunicabilityDetailsList = result.diseaseCommunicabilityDetails;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveDiseaseCommunicabilityDetails = function () {
        if ($scope.ddlProblem == -1) {
            toaster.pop('error', "Error", 'Select Problem');
            return false;
        };
        if ($scope.txtIncubationPeriodFrom == undefined) {
            toaster.pop('error', "Error", 'Enter Incubation Period From !!');
            return false;
        };     
        if ($scope.txtIncubationPeriodTo == undefined) {
            toaster.pop('error', "Error", 'Enter Incubation Period To !!');
            return false;
        }; 
        if ($scope.ddlIncubationUnit == -1) {
            toaster.pop('error', "Error", 'Select Unit !!');
            return false;
        }; 
        var params = {
            id: DiseaseCommunicabilityDetailsId,
            problemId: $scope.ddlProblem,
            incubationPeriodFrom: $scope.txtIncubationPeriodFrom,
            incubationPeriodTo: $scope.txtIncubationPeriodTo,
            incubationPeriodUnitID: $scope.ddlIncubationUnit,
            communicabilityPeriodFrom: $scope.txtCommunicabilityPeriodFrom,
            communicabilityPeriodTo: $scope.txtCommunicabilityPeriodTo,
            communicabilityPeriodUnitID: $scope.ddlCommunicabilityUnit,
            variationMonthFrom: $scope.txtVariationMonthFrom,
            variationMonthTo: $scope.txtVariationMonthTo,
            tempFrom: $scope.txtTempFrom,
            tempTo: $scope.txtTempTo,
            tempUnitID: $scope.ddlTempUnitID,
            humidityFrom: $scope.txtHumidityFrom,
            humidityTo: $scope.txtHumidityTo,
            humidityUnitID: $scope.ddlHumidityUnitID,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseCommunicabilityDetails(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.DiseaseCommunicabilityList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteDiseaseCommunicabilityDetails = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseCommunicabilityDetails(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.DiseaseCommunicabilityList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        DiseaseCommunicabilityDetailsId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.DiseaseCommunicabilityDetailsList(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseCommunicabilityDetails;
            $scope.ddlProblem = list[0].problemId;
            $scope.txtIncubationPeriodFrom = list[0].incubationPeriodFrom;
            $scope.txtIncubationPeriodTo = list[0].incubationPeriodTo;
            $scope.ddlIncubationUnit = list[0].incubationPeriodUnitID;
            $scope.txtCommunicabilityPeriodFrom = list[0].communicabilityPeriodFrom;
            $scope.txtCommunicabilityPeriodTo = list[0].communicabilityPeriodTo;
            $scope.ddlCommunicabilityUnit = list[0].communicabilityPeriodUnitID;
            $scope.txtVariationMonthFrom = list[0].variationMonthFrom;
            $scope.txtVariationMonthTo = list[0].variationMonthTo;
            $scope.txtTempFrom = list[0].tempFrom;
            $scope.txtTempTo = list[0].tempTo;
            $scope.ddlTempUnitID = list[0].tempUnitID;
            $scope.txtHumidityFrom = list[0].humidityFrom;
            $scope.txtHumidityTo = list[0].humidityTo;
            $scope.ddlHumidityUnitID = list[0].humidityUnitID;
            $scope.txtReference = list[0].reference;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        DiseaseCommunicabilityDetailsId = 0;
        $scope.ddlProblem = -1;
        $scope.txtIncubationPeriodFrom = "";
        $scope.txtIncubationPeriodTo = "";
        $scope.ddlIncubationUnit = -1;
        $scope.txtCommunicabilityPeriodFrom = "";
        $scope.txtCommunicabilityPeriodTo = "";
        $scope.ddlCommunicabilityUnit = -1;
        $scope.txtVariationMonthFrom = "";
        $scope.txtVariationMonthTo = "";
        $scope.txtTempFrom = "";
        $scope.txtTempTo = "";
        $scope.ddlTempUnitID = -1;
        $scope.txtHumidityFrom = "";
        $scope.txtHumidityTo = "";
        $scope.ddlHumidityUnitID = -1;
        $scope.txtReference = "";
    };
    $scope.iUnitList();
    $scope.cUnitList();
    $scope.tUnitList();
    $scope.hUnitList();
    $scope.pMasterList();
    $scope.DiseaseCommunicabilityList();
});