app.controller('foodNutrientCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, ASSETS) {
    var foodNutrientId = 0;
    $scope.initControlsFoodNutrient = function () {
        dataFactory.initControlsFoodNutrient().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.foodList = result.foodList;
            $scope.unitList = result.unitList;            
            $scope.dataSourceList = result.dataSourceList;
            $scope.ddlDataSource = 3;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getNutrientComponentList = function () {  
        $scope.ddlNutrientComponent = 0;
        var params = {
            nutrientID: $scope.ddlnutrient
        };
        dataFactory.nutrientComponentList(params).then(function (response) {
            var result = response.data;
            $scope.nutrientComponentList = result.nutrientComponentList;
            if (result.nutrientComponentList.length > 0) {               
                if (result.nutrientComponentList[0].isAminoAcid == 1) {                   
                    $scope.ddlNutrientComponent = result.nutrientComponentList[0].componentNutrientID;
                }               
            }
          
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.GetFoodNutrientList = function () {
        var params = {
            nutrientID: $scope.ddlnutrient,
            foodId: $scope.ddlFood
        };
        dataFactory.foodNutrientList(params).then(function (response) {
            var result = response.data;
            $scope.foodNutrientList = result.foodNutrientList;
            $scope.selectedUnitList = result.selectedUnitList;
            $scope.ddlNutrientUnit = result.nutrientUnit[0].unitID;
            //$scope.nutrientUnit = result.nutrientUnit[0].unit;
            $scope.getNutrientComponentList();            
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.savefoodNutrient = function () {  
        if ($scope.ddlnutrient == -1) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        if ($scope.ddlFood == 0) {
            toaster.pop('error', "Error", 'Please Select Food');
            return false;
        }
        //if ($scope.ddlDataSource != 1 || $scope.ddlDataSource != 2 || $scope.ddlDataSource != 3) {
        //    toaster.pop('error', "Error", 'Please Select Data Source');
        //    return false;
        //}

        var params = {
            foodNutrientId: foodNutrientId,
            foodId: $scope.ddlFood,
            nutrientID: $scope.ddlnutrient,
            selectedUnitID: $scope.ddlNutrientUnit,
            componentNutrientID: $scope.ddlNutrientComponent,
            quantity: $scope.txtNutrientQty,
            reference: $scope.txtReference,
            url: $scope.txtURL,
            dataSourceID: $scope.ddlDataSource,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.savefoodNutrient(params).then(function (response) {
            var list = response.data.tableRow;

            if (foodNutrientId > 0) {
                $rootScope.activityLog(response, 'UPDATE NUTRIENT FOOD', 'NUTRIENT FOOD', '');
            }
            else if (list && list.length > 0) {
                params.foodNutrientId = list[0].rowID;
                $rootScope.activityLog(response, 'SAVE NUTRIENT FOOD', 'NUTRIENT FOOD', '', JSON.stringify(params));
            }

            $scope.clearControls();
            $scope.GetFoodNutrientList();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
            $rootScope.activityLog(error, 'SAVE NUTRIENT FOOD', 'NUTRIENT FOOD', '');
            //toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.editFoodNutrient = function (indexVal1, paramid) {
        foodNutrientId = paramid;
        var params = {
            foodNutrientId: paramid
        };
        dataFactory.foodNutrientList(params).then(function (response) {
            var result = response.data;
            $scope.getNutrientComponentList();
            var list = result.foodNutrientList;
            
            $scope.ddlFood = list[0].foodID;
            $scope.ddlnutrient = list[0].nutrientID;
            $scope.ddlNutrientComponent = list[0].componentNutrientID,
            $scope.txtNutrientQty = list[0].nutrientValue;
            $scope.ddlNutrientUnit = list[0].selectedUnitID;
            $scope.txtReference = list[0].reference;
            $scope.txtURL = list[0].url;
            $scope.ddlDataSource = list[0].dataSourceID;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.deleteFoodNutrient = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                foodNutrientId: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deletefoodNutrient(params).then(function (response) {
                $scope.GetFoodNutrientList();
                $scope.clearControls();
                toaster.pop('success', "Success", 'Deleted Successfully.');

                $rootScope.activityLog(response, 'DELETE NUTRIENT FOOD', 'NUTRIENT FOOD', '');

            }, function (error) {
                toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
            });
        }
    };

    $scope.clearControls = function () {
        foodNutrientId = 0;
        //$scope.ddlFood = 0;      
        $scope.ddlNutrientComponent = 0,
        $scope.txtNutrientQty = '';
        $scope.ddlNutrientUnit = '';
        $scope.txtURL = '';   
        $scope.ddlDataSource = 3;
    };

    $scope.initControlsFoodNutrient();
    //$scope.foodNutrientList();
});