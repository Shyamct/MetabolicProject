app.controller('environmentLocationAssignCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var EnvironmentLocationAssignId = 0;
    var agentFactorDetailID = 0;


    $scope.initControls = function () {
        dataFactory.environmentLocationAssignInitControl().then(function (response) {
            var result = response.data;
            $scope.environmentFactorList = result.environmentFactorList;
            $scope.countryList = result.countryList;
            $scope.agentFactorList = result.agentFactorList;
            $scope.tempratureUnitList = result.tempratureUnitList;
            //$scope.humidityUnitList = result.humidityUnitList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.environmentLocationAssigns = function () {
        var params = {
            id: EnvironmentLocationAssignId,
        }
        dataFactory.environmentLocationAssign(params).then(function (response) {
            var result = response.data;
            $scope.environmentLocationAssign = result.environmentLocationAssign;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
     
    $scope.bindState = function () {
        var params = {
            countryId: $scope.ddlCountry
        };
        dataFactory.getState(params).then(function (response) {
            var result = response.data;
            $scope.stateList = result.stateList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.bindCity = function () {
        var params = {
            stateId: $scope.ddlState
        };
        dataFactory.getCity(params).then(function (response) {
            var result = response.data;
            $scope.cityList = result.cityList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
   
    $scope.saveEnvironmentLocationAssign = function () {
        if ($scope.ddlEnvironment == -1) {
            toaster.pop('error', "Error", 'Select Environment !!');
            return false;
        };
        if ($scope.ddlagentFactorDetailID == -1) {
            toaster.pop('error', "Error",'Select agent Factor Detail !!');
            return false;
        };
        if ($scope.ddlCountry == -1) {
            toaster.pop('error', "Error",'Select Country !!');
            return false;
        };
        if ($scope.ddlState == -1) {
            toaster.pop('error', "Error",'Select State !!');
            return false;
        };
        //if ($scope.ddlCity == -1) {
           //toaster.pop('error', "Error",'Select City !!');
           //return false;
        //};
        if ($scope.ddlFromMonth == -1) {
            toaster.pop('error', "Error",'Enter From Month !!');
            return false;
        };
        if ($scope.ddlToMonth == -1) {
            toaster.pop('error', "Error", 'Enter To Month !!');
            return false;
        };
        if ($scope.ddlAgentFactor == -1) {
            toaster.pop('error', "Error",'Select Agent Factor !!');
            return false;
        };
        if (isEmpty($scope.txttempratureFrom)) {
            toaster.pop('error', "Error",'Enter Temprature From !!');
            return false;
        };
        if (isEmpty($scope.txttempratureTo )) {
            toaster.pop('error', "Error",'Enter Temprature To !!');
            return false;
        };
        if ($scope.ddlTempratureUnit == -1) {
            toaster.pop('error', "Error",'Select Temprature Unit !!');
            return false;
        };
        if (isEmpty($scope.txthumidityFrom)) {
            toaster.pop('error', "Error",'Enter Humidity From !!');
            return false;
        };
        if (isEmpty($scope.txthumidityTo)) {
            toaster.pop('error', "Error",'Enter Humidity To !!');
            return false;
        };
        if ($scope.ddlHumidityUnit == -1) {
          toaster.pop('error', "Error",'Select Humidity Unit !!');
            return false;
        };
        var params = {
            id: EnvironmentLocationAssignId,
            environmentLocationID: $scope.ddlEnvironment,
            countryId: $scope.ddlCountry,
            stateId: $scope.ddlState,
            city: $scope.ddlCity,
            fromMonth: $scope.ddlFromMonth,
            toMonth: $scope.ddlToMonth,
            agentFactorID: $scope.ddlAgentFactor,
            tempratureFrom: $scope.txttempratureFrom,
            tempratureTo: $scope.txttempratureTo,
            tempratureUnitID: $scope.ddlTempratureUnit,
            humidityFrom: $scope.txthumidityFrom,
            humidityTo: $scope.txthumidityTo,
            humidityUnitID: $scope.ddlHumidityUnit,
            //userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveEnvironmentLocationAssign(params).then(function (response) {
            if (EnvironmentLocationAssignId > 0) {
                $rootScope.activityLog(response, 'UPDATE ENVIRONMENT LOCATION MASTER', 'ENVIRONMENT LOCATION MASTER', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');            
            $scope.clr();
            $scope.environmentLocationAssigns();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteEnvironmentLocationAssign = function (id, agentID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                agentFactorDetailID: agentID
                //userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteEnvironmentLocationAssign(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.environmentLocationAssigns();
                $rootScope.activityLog(response, 'DELETE ENVIRONMENT LOCATION MASTER', 'ENVIRONMENT LOCATION MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        EnvironmentLocationAssignId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.environmentLocationAssign(params).then(function (response) {
            var result = response.data;
            var list = result.environmentLocationAssign;
            $scope.ddlEnvironment = list[0].environmentFactorId;
            $scope.ddlCountry = list[0].countryId;
            var params = {
                countryId: list[0].countryId
            };
            dataFactory.getState(params).then(function (response) {
                var result = response.data;
                $scope.stateList = result.stateList;
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
            $scope.ddlState = list[0].stateId;
            var params = {
                stateId: list[0].stateId
            };
            dataFactory.getCity(params).then(function (response) {
                var result = response.data;
                $scope.cityList = result.cityList;
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
            $scope.ddlCity = list[0].cityId;
            $scope.ddlFromMonth = list[0].fromMonth;
            $scope.ddlToMonth = list[0].toMonth;
            $scope.ddlAgentFactor = list[0].agentFactorID;
            $scope.txttempratureFrom = list[0].tempratureFrom;
            $scope.txttempratureTo = list[0].tempratureTo;
            $scope.ddlTempratureUnit = list[0].tempratureUnitID;
            $scope.txthumidityFrom = list[0].humidityFrom;
            $scope.txthumidityTo = list[0].humidityTo;
            $scope.ddlHumidityUnit = list[0].humidityUnitID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        EnvironmentLocationAssignId = 0;
        agentFactorDetailID = 0;
        $scope.ddlEnvironment = -1;
        $scope.ddlCountry = -1;
        $scope.ddlState = -1;
        $scope.ddlCity = -1;
        $scope.ddlFromMonth = 0;
        $scope.ddlToMonth = 0;
        $scope.ddlAgentFactor = -1;
        $scope.txttempratureFrom = '';
        $scope.txttempratureTo = '';
        $scope.ddlTempratureUnit = -1;
        $scope.txthumidityFrom = '';
        $scope.txthumidityTo = '';
        $scope.ddlHumidityUnit = -1;
    };

    $scope.initControls();
    $scope.environmentLocationAssigns();
});