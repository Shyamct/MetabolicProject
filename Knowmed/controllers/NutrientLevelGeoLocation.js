app.controller('nutrientLevelGeoLocationCtrl', function ($scope, dataFactory, toaster, $state, $rootScope) {   
    var existId = 0;  
   
    $scope.initControls = function () {
        dataFactory.InitControlsNutrientLevelGeoLocation().then(function (response) {
            var result = response.data;           
            $scope.nutrientList = result.nutrientList;  
            $scope.levelList = result.statusList;
            $scope.regionList = result.regionList; 
            $scope.countryList = result.countryList;
            $scope.stateList = result.stateList;
            //$scope.cityList = result.cityList;
           // arr = result.nutrientLevelGeoLocationList; 
            if (!isEmpty($state.params.id)) {
                $scope.ddlNutrient = $state.params.id;
                $('#ddlNutrient').prop("disabled", 'disabled');
                $scope.getSelectedNutrientLevelGeoLocationList();
            }   
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };    
  
    $scope.GetCountryList = function () {
        if ($scope.ddlRegion == 0) {
            toaster.pop('error', "Error", 'Please Select Region');
            return false;
        }
        var params = {
            regionID: $scope.ddlRegion
        };
        dataFactory.countryList(params).then(function (response) {
            var result = response.data;
            $scope.countryList = result.countryList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetStateList= function () {
        if ($scope.ddlRegion == 0) {
            toaster.pop('error', "Error", 'Please Select Region');
            return false;
        }
        if ($scope.ddlCountry == 0) {
            toaster.pop('error', "Error", 'Please Select Country');
            return false;
        }
        var params = {
            regionID: $scope.ddlRegion,
            countryID: $scope.ddlCountry
        };
        dataFactory.stateList(params).then(function (response) {
            var result = response.data;
            $scope.stateList = result.stateList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetCityList = function () {
       
        if ($scope.ddlCountry == 0) {
            toaster.pop('error', "Error", 'Please Select Country');
            return false;
        }
     
        var params = {
            countryID: $scope.ddlCountry
           
        };
        dataFactory.cityList(params).then(function (response) {
            var result = response.data;
            $scope.cityList = result.cityList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetNutrientLevelGeoLocationList = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.NutrientLevelGeoLocationList(params).then(function (response) {
            var result = response.data;
            $scope.nutrientLevelGeoLocationList = result.nutrientLevelGeoLocationList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.getSelectedNutrientLevelGeoLocationList = function () {       
        var params = {
            nutrientID: $scope.ddlNutrient
        };
        dataFactory.NutrientLevelGeoLocationList(params).then(function (response) {
            var result = response.data;
            $scope.nutrientLevelGeoLocationSelectedList = result.nutrientLevelGeoLocationList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveNutrientLevelGeoLocation = function () {    

        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        if ($scope.ddlLevel == 0) {
            toaster.pop('error', "Error", 'Please Select Level Status');
            return false;
        }
        if ($scope.ddlRegion == 0) {
            toaster.pop('error', "Error", 'Please Select Region');
            return false;
        }
        if ($scope.ddlCountry == 0) {
            toaster.pop('error', "Error", 'Please Select Country');
            return false;
        }
    /*    if ($scope.ddlState == 0) {
            toaster.pop('error', "Error", 'Please Select State');
            return false;
        }
        if ($scope.ddlCity == 0) {
            toaster.pop('error', "Error", 'Please Select City');
            return false;
        }*/
        
        var params = {
            id: existId,
            nutrientID: $scope.ddlNutrient,
            levelStatus: $scope.ddlLevel,
            regionID: $scope.ddlRegion,
            countryID: $scope.ddlCountry,
            stateID: $scope.ddlState,
            cityID: $scope.ddlCity,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveNutrientLevelGeoLocation(params).then(function (response) {
            var message = existId > 0 ? 'Update Nutrient Level Geo Location' : 'Save Nutrient Level Geo Location';
            $rootScope.activityLog(response, message, 'Nutrient Level Geo Location', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetNutrientLevelGeoLocationList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteNutrientLevelGeoLocation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.GetNutrientLevelGeoLocationList();
                $rootScope.activityLog(response, 'Delete Nutrient Level Geo Location', ' Nutrient Level Geo Location', '');
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
        dataFactory.NutrientLevelGeoLocationList(params).then(function (response) {
            var result = response.data;           
            var list = result.nutrientLevelGeoLocationList;           
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.ddlLevel = list[0].levelStatus;
            $scope.ddlRegion = list[0].regionID;  
            $scope.ddlCountry = list[0].countryID;  
            $scope.GetCityList();
            $scope.ddlState = list[0].stateID; 
            $scope.ddlCity = list[0].cityID; 
            $scope.txtRemark = list[0].remark;  
            $scope.txtReference = list[0].reference;  
            $scope.txtUrl = list[0].url; 
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {  
        $scope.ddlNutrient = 0;
        $scope.ddlLevel = 0;
        $scope.ddlRegion = 0;
        $scope.ddlCountry = 0;
        $scope.ddlState = 0;
        $scope.ddlCity = 0;
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtUrl = ''; 
        $scope.nutrientLevelGeoLocationSelectedList = '';
        existId = 0;
    };
    $scope.initControls();
    $scope.GetNutrientLevelGeoLocationList();
   
});