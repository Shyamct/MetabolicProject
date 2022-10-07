app.controller('diseaseCommunicabilityDetailCtrl', function ($scope, dataFactory, toaster, $state) {
    var existId = null;
    //var existPreventionID = null;
    //var existProblemID = null;
    //$scope.isDisabled = false;
    //var arrAgentFactor = [];
    //var arrEnviorenmentFactor = [];
    //var arrTransmissionRoute = [];
    //var arrGeoLocation = [];
    $scope.selectedAgentFactorList = [];
    $scope.selectedEnviorenmentFactorList = [];
    $scope.selectedTransmissionRouteList = [];
    $scope.selectedGeoLocationList = [];

    $scope.initControls = function () {
        dataFactory.InitControlsDiseaseCommunicabilityDetail().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemList;
            $scope.incubationPeriodUnitList = result.incubationPeriodUnitList;
            $scope.communicabilityPeriodUnitList = result.communicabilityPeriodUnitList;
            $scope.tempUnitList = result.tempUnitList;
            $scope.humidityUnitList = result.humidityUnitList;
            $scope.agentFactorList = result.agentFactorList;
            $scope.enviorenmentFactorList = result.enviorenmentFactorList;
            $scope.transmissionRouteList = result.transmissionRouteList;
            $scope.regionList = result.regionList;
            $scope.countryList = result.countryList;
            $scope.stateList = result.stateList;
            $scope.cityList = result.cityList;
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
            $scope.stateList = result.stateMaster;
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
            $scope.cityList = result.cityMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AddAgentFactor = function () {
        if ($scope.ddlAgentFactor == 0) {
            toaster.pop('error', "Error", 'Please Select Agent Factor');
            return false;
        }
        for (var i = 0; i < $scope.selectedAgentFactorList.length; i++) {
            if ($scope.selectedAgentFactorList[i].agentFactorID == $scope.ddlAgentFactor) {
                toaster.pop('error', "Error", 'Agent Factor Already Added');
                return false;
            }
        }
        $scope.selectedAgentFactorList.push({
            agentFactorID: $("#ddlAgentFactor").val(),
            agentFactorName: $("#ddlAgentFactor option:selected").text()
        });
        //$scope.selectedAgentFactorList = arrAgentFactor;
    };
    $scope.deleteAgentFactor = function (index) {
        $scope.selectedAgentFactorList.splice(index, 1);
    };
    $scope.AddEnviorenmentFactor = function () {
        if ($scope.ddlEnviorenmentFactor == 0) {
            toaster.pop('error', "Error", 'Please Select Environment Factor');
            return false;
        }
        for (var i = 0; i < $scope.selectedEnviorenmentFactorList.length; i++) {
            if ($scope.selectedEnviorenmentFactorList[i].enviorenmentFactorID == $scope.ddlEnviorenmentFactor) {
                toaster.pop('error', "Error", 'Environment Factor Already Added');
                return false;
            }
        }
        $scope.selectedEnviorenmentFactorList.push({
            enviorenmentFactorID: $("#ddlEnviorenmentFactor").val(),
            enviorenmentFactorName: $("#ddlEnviorenmentFactor option:selected").text()
        });
        //$scope.selectedEnviorenmentFactorList = arrEnviorenmentFactor;
    };
    $scope.deleteEnviorenmentFactor = function (index) {
        $scope.selectedEnviorenmentFactorList.splice(index, 1);
    };
    $scope.AddTransmissionRoute = function () {
        if ($scope.ddlTransmissionRoute == 0) {
            toaster.pop('error', "Error", 'Please Select Transmission Route');
            return false;
        }
        for (var i = 0; i < $scope.selectedTransmissionRouteList.length; i++) {
            if ($scope.selectedTransmissionRouteList[i].transmissionRouteID == $scope.ddlTransmissionRoute) {
                toaster.pop('error', "Error", 'Transmission Route Already Added');
                return false;
            }
        }
        $scope.selectedTransmissionRouteList.push({
            transmissionRouteID: $("#ddlTransmissionRoute").val(),
            transmissionRouteName: $("#ddlTransmissionRoute option:selected").text()
        });
        //$scope.selectedTransmissionRouteList = arrTransmissionRoute;
    };
    $scope.deleteTransmissionRoute = function (index) {
        $scope.selectedTransmissionRouteList.splice(index, 1);
    };
    $scope.AddGeoLocation = function () {
        if ($scope.ddlRegion == 0) {
            toaster.pop('error', "Error", 'Please Select Geo Location');
            return false;
        }
        for (var i = 0; i < $scope.selectedGeoLocationList.length; i++) {
            if ($scope.selectedGeoLocationList[i].regionID == $scope.ddlRegion && $scope.selectedGeoLocationList[i].countryID == $scope.ddlCountry && $scope.selectedGeoLocationList[i].stateID == $scope.ddlState && $scope.selectedGeoLocationList[i].cityID == $scope.ddlCity) {
                toaster.pop('error', "Error", 'GeoLocation Already Added');
                return false;
            }
        }
        $scope.selectedGeoLocationList.push({
            regionID: $("#ddlRegion").val(),
            regionName: $("#ddlRegion option:selected").text(),
            countryID: $("#ddlCountry").val(),
            countryName: $("#ddlCountry option:selected").text(),
            stateID: $("#ddlState").val(),
            stateName: $("#ddlState option:selected").text(),
            cityID: $("#ddlCity").val(),
            cityName: $("#ddlCity option:selected").text()
        });
        //$scope.selectedGeoLocationList = arrGeoLocation;
    };
    $scope.deleteGeoLocation = function (index) {
        $scope.selectedGeoLocationList.splice(index, 1);
    };
    $scope.saveDiseaseCommunicabilityDetail = function () {

        if ($scope.ddlDisease == 0) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        if (existId == null) {
            if ($scope.selectedGeoLocationList.length == 0) {
                if ($scope.ddlRegion > 0 || $scope.ddlCountry > 0 || $scope.ddlState > 0 || $scope.ddlCity > 0) {
                    toaster.pop('error', "Error", 'Please Add Region');
                    return false;
                }
            }
            if ($scope.selectedAgentFactorList.length == 0) {
                if ($scope.ddlAgentFactor > 0) {
                    toaster.pop('error', "Error", 'Please Add Agent Factor');
                    return false;
                }
            }
            if ($scope.selectedEnviorenmentFactorList.length == 0) {
                if ($scope.ddlEnviorenmentFactor > 0) {
                    toaster.pop('error', "Error", 'Please Add Enviorenment Factor');
                    return false;
                }
            }
            if ($scope.selectedTransmissionRouteList.length == 0) {
                if ($scope.ddlTransmissionRoute > 0) {
                    toaster.pop('error', "Error", 'Please Add Transmission Route');
                    return false;
                }
            }
        }
        var params = {
            id: existId,
            //preventionID: existPreventionID,
            problemID: $scope.ddlDisease,
            incubationPeriodFrom: $scope.txtIncubationFrom,
            incubationPeriodTo: $scope.txtIncubationTo,
            incubationPeriodUnitID: $scope.ddlIncubationPeriodUnit,
            communicabilityPeriodFrom: $scope.txtCommunicabilityFrom,
            communicabilityPeriodTo: $scope.txtCommunicabilityTo,
            communicabilityPeriodUnitID: $scope.ddlCommunicabilityPeriodUnit,
            variationMonthFrom: $scope.txtVariationFrom,
            variationMonthTo: $scope.txtVariationTo,
            tempFrom: $scope.txtTempratureFrom,
            tempTo: $scope.txtTempratureTo,
            tempUnitID: $scope.ddTtempUnit,
            humidityFrom: $scope.txtHumidityFrom,
            humidityTo: $scope.txtHumidityTo,
            humidityUnitID: $scope.ddlHumidityUnit,
            reference: $scope.txtReference,            
            toDo: $scope.txtPreventionToDo,
            notToDO: $scope.txtPreventionNotToDo,
            remark: $scope.txtRemark,
            listAgentFactor: $scope.selectedAgentFactorList,
            listEnviorenmentFactor: $scope.selectedEnviorenmentFactorList,
            listTransmissionRoute: $scope.selectedTransmissionRouteList,
            listGeoLocation: $scope.selectedGeoLocationList,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseCommunicabilityDetail(params).then(function (response) {
            $scope.getDiseaseCommunicabilityDetailList();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.getDiseaseCommunicabilityDetailList = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.DiseaseCommunicabilityDetailList(params).then(function (response) {
            var result = response.data;
            $scope.diseaseCommunicabilityDetailList = result.diseaseCommunicabilityDetailList;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    //$scope.viewAgentFactor = function (probID) {
    //    var param = {
    //        problemID: probID,
    //    };
    //    dataFactory.AgentFactorDetailList(param).then(function (response) {
    //        var result = response.data;
    //        $scope.agentFactorDetailList = result.agentFactorDetailList;
    //        $('#agentFactorModal').modal('show');
    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};
    //$scope.viewEnviorenmentFactor = function (probID) {
    //    var param = {
    //        problemID: probID,
    //    };
    //    dataFactory.EnviorenmentFactorDetailList(param).then(function (response) {
    //        var result = response.data;
    //        $scope.enviorenmentFactorDetailList = result.enviorenmentFactorDetailList;
    //        $('#enviorenmentFactorModal').modal('show');
    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};
    //$scope.viewTransmissionRoute = function (probID) {
    //    var param = {
    //        problemID: probID,
    //    };
    //    dataFactory.TransmissionRouteDetailList(param).then(function (response) {
    //        var result = response.data;
    //        $scope.transmissionRouteDetailList = result.transmissionRouteDetailList;
    //        $('#transmissionRouteModal').modal('show');
    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};
    //$scope.viewGeoLocation = function (probID) {
    //    var param = {
    //        problemID: probID,
    //    };
    //    dataFactory.GeoLocationDetailList(param).then(function (response) {
    //        var result = response.data;
    //        $scope.geoLocationDetailList = result.geoLocationDetailList;
    //        $('#geoLocationModal').modal('show');
    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};
    //$scope.viewPrevention = function (probID) {
    //    var param = {
    //        problemID: probID,
    //    };
    //    dataFactory.PreventionDetailList(param).then(function (response) {
    //        var result = response.data;
    //        $scope.preventionDetailList = result.preventionDetailList;
    //        $('#preventionModal').modal('show');
    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};
    $scope.edit = function (paramid) {
        existId = paramid;
        //$scope.isDisabled = true;
        var params = {
            id: paramid
        };
        dataFactory.getSingleDiseaseCommunicabilityDetailList(params).then(function (response) {           
            var result = response.data;
            var list = result.diseaseCommunicabilityDetailList;  

            $scope.ddlDisease = list[0].problemID;
            $scope.txtIncubationFrom = list[0].incubationPeriodFrom;
            $scope.txtIncubationTo = list[0].incubationPeriodTo;
            $scope.ddlIncubationPeriodUnit = list[0].incubationPeriodUnitID;
            $scope.txtCommunicabilityFrom = list[0].communicabilityPeriodFrom;
            $scope.txtCommunicabilityTo = list[0].communicabilityPeriodTo;
            $scope.ddlCommunicabilityPeriodUnit = list[0].communicabilityPeriodUnitID;
            $scope.txtVariationFrom = list[0].variationMonthFrom;
            $scope.txtVariationTo = list[0].variationMonthTo;
            $scope.txtTempratureFrom = list[0].tempFrom;
            $scope.txtTempratureTo = list[0].tempTo;
            $scope.ddTtempUnit = list[0].tempUnitID;
            $scope.txtHumidityFrom = list[0].humidityFrom;
            $scope.txtHumidityTo = list[0].humidityTo;
            $scope.ddlHumidityUnit = list[0].humidityUnitID;
            $scope.txtReference = list[0].reference;
            $scope.txtPreventionToDo = list[0].toDo;
            $scope.txtPreventionNotToDo = list[0].notToDo;
            $scope.txtRemark = list[0].remark;

            $scope.selectedAgentFactorList = result.agentFactorList;
            $scope.selectedEnviorenmentFactorList = result.enviorenmentFactorList;
            $scope.selectedTransmissionRouteList = result.transmissionRouteList;
            $scope.selectedGeoLocationList = result.geoLocationList;

            //existPreventionID = list[0].preventionID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (paramid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: paramid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseCommunicabilityDetail(params).then(function (response) {
                $scope.getDiseaseCommunicabilityDetailList();
                toaster.pop('success', "Success", 'Deleted Successfully.');

            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
   
    $scope.clr = function () {
        //$scope.isDisabled = false;
        $scope.selectedAgentFactorList = [];
        $scope.selectedEnviorenmentFactorList = [];
        $scope.selectedTransmissionRouteList = [];
        $scope.selectedGeoLocationList = [];
        $scope.txtIncubationFrom = '';
        $scope.txtIncubationTo = '';
        $scope.ddlIncubationPeriodUnit = 0;
        $scope.txtCommunicabilityFrom = '';
        $scope.txtCommunicabilityTo = '';
        $scope.ddlCommunicabilityPeriodUnit = 0;
        $scope.txtVariationFrom = '';
        $scope.txtVariationTo = '';
        $scope.txtTempratureFrom = '';
        $scope.txtTempratureTo = '';
        $scope.ddTtempUnit = 0;
        $scope.txtHumidityFrom = '';
        $scope.txtHumidityTo = '';
        $scope.ddlHumidityUnit = 0;
        $scope.txtReference = '';
        $scope.txtPreventionToDo = '';
        $scope.txtPreventionNotToDo = '';
        $scope.txtRemark = '';
        $scope.ddlRegion = 0;
        $scope.ddlCountry = 0;
        $scope.ddlState = 0;
        $scope.ddlCity = 0;
        $scope.ddlAgentFactor = 0;
        $scope.ddlEnviorenmentFactor = 0;
        $scope.ddlTransmissionRoute = 0;
        existId = null;
        //existPreventionID = null;
    };

    $scope.initControls();
    $scope.getDiseaseCommunicabilityDetailList();
});