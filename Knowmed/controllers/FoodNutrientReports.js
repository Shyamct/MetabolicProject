app.controller('foodNutrientReportsCtrl', function ($scope, dataFactory, $rootScope, toaster, $state) {    
    var mainId = 0;
    var selectedNutrientID = 0;
    var selectedFoodID = 0;
    var selectedUnitID = 0;
    $scope.selectedUnitName= '';
    $scope.initControls = function () {
        dataFactory.foodNutrientReportsInitControls().then(function (response) {
            var result = response.data;
            $scope.foodCategoryList = result.foodCategoryList;
            $scope.foodGroupList = result.foodGroupList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.openpopup = function (foodId,nutrientId,foodName,nutrientName,unitID,unitName) {
        var params = {
            foodID: foodId,
            nutrientID: nutrientId,
        };
        selectedNutrientID = nutrientId;
        selectedFoodID = foodId;
        selectedUnitID = unitID;
        $scope.selectedUnitName = unitName;
        dataFactory.foodNutrientsList(params).then(function (response) {
            var result = response.data;
            $scope.dList = result.nutrientList;
            $scope.unitList = result.unitList;
            console.warn($scope.dList);
            if ($scope.dList.length > 0) {
                $scope.txtCompound = $scope.dList[0]['nutrientName'];
                $scope.txtFood = $scope.dList[0]['foodName'];
                mainId = $scope.dList[0]['mainID'];
            }
            else {
                $scope.txtCompound = foodName;
                $scope.txtFood = nutrientName;
                mainId = 0;
            }
            
            $scope.showNutrient = true;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
        
    };
    $scope.savefoodNutrient = function () {
        var params;
        if (mainId == 0) {
             params = {
                foodId: selectedFoodID,
                nutrientID: selectedNutrientID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid),
                nutrientValue: $scope.txtNutrientQty,
                 selectedUnitID: selectedUnitID,
            };

        }
        else {
             params = {
                id: mainId,
                 nutrientValue: $scope.txtNutrientQty,
                 selectedUnitID: selectedUnitID
            };
        }
        dataFactory.saveFoodNutrientList(params).then(function (response) {
            var result = response.data;
            $scope.List = result.nutrientList;
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.foodNutrientReportsList();
            $scope.clr();
            $scope.showNutrient = false;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.foodNutrientReportsList = function () {
        var params = {
            foodCategoryID: $scope.ddlCategory,
            foodGroupID: $scope.ddlFoodGroup,
        };
        dataFactory.foodNutrientReportsList(params).then(function (response) {
            var result = response.data;
            $scope.foodNutrientList = result.foodNutrientList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.exportData = function () {
        $("#tableMedicineReport").table2excel({
            // exclude: ".excludeThisClass",
            name: "Worksheet Name",
            filename: "Food Nutrient" //do not include extension
        });
    };

    $scope.clr = function () {
        mainId = 0;
        $scope.txtCompound = '';
        $scope.txtFood = '';
        $scope.txtNutrientQty = '';
        $scope.ddlUnit = '';
    };

    $scope.initControls();
});


