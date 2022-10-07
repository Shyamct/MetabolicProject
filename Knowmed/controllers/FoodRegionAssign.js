app.controller('foodRegionAssignCtrl', function ($scope, dataFactory, toaster) {   
    var assignId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsFoodRegionAssign().then(function (response) {
            var result = response.data;   
            $scope.countryList = result.countryList;            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getFoodList = function () {
        var regionId = null;
        var countryId = null;
        if ($scope.ddlCountry > 0) {
            countryId = $scope.ddlCountry
        }
        else {
            $scope.ddlRegion = 0;
        }
        if ($scope.ddlRegion > 0) {
            regionId = $scope.ddlRegion
        }

        var params = {
            countryID: countryId,
            regionID: regionId
        };     
        dataFactory.GetFoodList(params).then(function (response) {
            var result = response.data;
            $scope.foodList = result.foodList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getRegionAndAssignedFood = function () {

        var regionId = null;
        var countryId = null;
        if ($scope.ddlCountry > 0) {
            countryId = $scope.ddlCountry
        }
        else {
            $scope.ddlRegion = 0;
        }
        if ($scope.ddlRegion > 0) {
            regionId = $scope.ddlRegion
        }
       
        var params = {
            countryID: countryId,
            regionID: regionId
        };       
        dataFactory.RegionList(params).then(function (response) {
            var result = response.data;
            $scope.foodRegionAssignList = result.foodRegionAssignList;      
            $scope.regionList = result.regionList;
        }, function (error) {
            toaster.pop('error', "Error", error);
            });
        $scope.getFoodList();
    };
  
    $scope.saveFoodRegionAssign = function () {

        var isExists = false;
        var food = "";       
        angular.forEach($scope.visibleItems, function (item) {
            if (item.selected) {
                isExists = true;
                food = food + item.foodID + ",";
            }
        });         
        if ($scope.ddlCountry == 0) { 
            toaster.pop('error', "Error", 'Please Select Country');
            return false;
        }
        if (isExists == false) {
            toaster.pop('error', "Error", 'Select atlease one Food !!');
            return false;
        }
        var params = {
            id: assignId,
            foodID: food,
            countryID: $scope.ddlCountry,
            regionID: $scope.ddlRegion,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveFoodRegionAssign(params).then(function (response) {
            $scope.clr();
            $scope.getRegionAndAssignedFood();     
            $scope.getFoodList();
            toaster.pop('success', "Success", 'Saved Successfully.');           
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
            dataFactory.DeleteFoodRegionAssign(params).then(function (response) {
                $scope.clr();
                $scope.getRegionAndAssignedFood();
                $scope.getFoodList();
                toaster.pop('success', "Success", 'Deleted Successfully.');                
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        assignId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.FoodRegionAssignList(params).then(function (response) {           
            var result = response.data;           
            var list = result.foodRegionAssignList;   
            $scope.regionList = result.regionList;   
            $scope.ddlFood = list[0].foodID;
            $scope.ddlCountry = list[0].countryID; 
            $scope.ddlRegion = list[0].regionID;  
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.toggleSelect = function () {
        if ($scope.ddlCountry != 0) {
            angular.forEach($scope.foodList, function (item) {
                item.selected = !item.selected;
            });
        }
        else {
            toaster.pop('error', "Error", 'Please Select Country');
            $scope.selectAll = false;
        }
    };

    $scope.clr = function () {
        //angular.forEach($scope.foodList, function (item) {
        //    item.selected = false;
        //});
        $scope.selectAll = false;
        assignId = 0;
    };
    $scope.initControls();
    //$scope.getFoodList();
});