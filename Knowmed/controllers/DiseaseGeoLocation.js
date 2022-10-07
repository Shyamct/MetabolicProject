app.controller('diseaseGeoLocationCtrl', function ($scope, dataFactory, toaster) {
    var DiseaseGeoLocationId = 0; 

    $scope.Country = function () {
        dataFactory.CountryList().then(function (response) {
            var result = response.data;
            $scope.CountryList = result.countryMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.State = function () {
        var param = {
            countryID: $scope.ddlCountry
        };
        dataFactory.StateList(param).then(function (response) {
            var result = response.data;
            $scope.StateList = result.stateMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.City = function () {
        var param = {
            stateID: $scope.ddlState
        };
        dataFactory.CityList(param).then(function (response) {
            var result = response.data;
            $scope.CityList = result.cityMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.mtWiseList = function () {
        var param = {
            synonymTypeID: 6
        }
        dataFactory.MultipleTableWiseList(param).then(function (response) {
            var result = response.data;
            $scope.MultipleTableWiseList = result.multipleTable;
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

    $scope.GeoLocationList = function () {
        dataFactory.DiseaseGeoLocationList().then(function (response) {
            var result = response.data;
            $scope.DiseaseGeoLocationList = result.diseaseGeoLocation;
            console.log(result);
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveDiseaseGeoLocation = function () {
        if ($scope.ddlProblem == -1) {
            toaster.pop('error', "Error", 'Select Problem');
            return false;
        }
        if ($scope.ddlRegion == -1) {
            toaster.pop('error', "Error", 'Select World Region');
            return false;
        }
        if ($scope.ddlCountry == -1) {
            toaster.pop('error', "Error", 'Select Country');
            return false;
        }
        if ($scope.ddlState == -1) {
            toaster.pop('error', "Error", 'Select State');
            return false;
        }
        if ($scope.ddlCity == -1) {
            toaster.pop('error', "Error", 'Select City');
            return false;
        }
        var params = {
            id: DiseaseGeoLocationId,
            problemId: $scope.ddlProblem,
            wordRegionID: $scope.ddlRegion,
            countryID: $scope.ddlCountry,
            stateID: $scope.ddlState,
            cityID: $scope.ddlCity,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseGeoLocation(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GeoLocationList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteDiseaseGeoLocation = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseGeoLocation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GeoLocationList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        DiseaseGeoLocationId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.DiseaseGeoLocationList(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseGeoLocation;
            $scope.ddlProblem = list[0].problemId;
            $scope.ddlRegion = list[0].wordRegionID;
            $scope.ddlCountry = list[0].countryID;
            $scope.State();
            $scope.ddlState = list[0].stateID;
            $scope.City();
            $scope.ddlCity = list[0].cityID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        DiseaseGeoLocationId = 0;
        $scope.ddlProblem = -1;
        $scope.ddlRegion = -1;
        $scope.ddlCountry = -1;
        $scope.ddlState = -1;
        $scope.ddlCity = -1;
    };
    $scope.Country();
    //$scope.State();
    //$scope.City();
    $scope.mtWiseList();
    $scope.pMasterList();
    $scope.GeoLocationList();
});