app.controller('foodTypeCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    
    $scope.foodTypeList = function () {
        dataFactory.InitControlsFoodType().then(function (response) {
            var result = response.data;
            //$scope.FoodMasterList = result.foodMaster;
            $scope.foodTypeLists = result.foodTypeMaster;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.fFoodTypeSavedList = function () {

        var foodFamilyTypeID = null;
        if ($scope.ddlFoodType > 0) {
            foodFamilyTypeID = $scope.ddlFoodType;
        }
        var params = {
            foodTypeId: foodFamilyTypeID
        };
        dataFactory.FoodTypeList(params).then(function (response) {
            var result = response.data;
            $scope.FoodTypeList = result.assignedFoodList;           
            $scope.FoodMasterList = result.foodMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveFoodType = function () {
        var isExists = false;
        var food = "";
     

        angular.forEach($scope.visibleItems, function (item) {
            if (item.selected) {
                isExists = true;
                food = food + item.id + ",";
            }
        });
        log(food);
        if ($scope.ddlFoodType == "-1") {
            toaster.pop('error', "Error", 'Select Food Type');
            return false;
        }
        if (isExists == false) {
            toaster.pop('error', "Error", 'Select atlease one Food !!');
            return false;
        }
        var params = {
            foodTypeId  : $scope.ddlFoodType,
            foodId : food,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveFoodType(params).then(function (response) {
            var message = 'SAVE Food Type';
            $rootScope.activityLog(response, message, ' Food Type', '');

            $scope.fFoodTypeSavedList();
            $scope.clr();
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
            dataFactory.DeleteFoodType(params).then(function (response) {
                $scope.fFoodTypeSavedList();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Food Type', 'Food Type', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.toggleSelect = function () {
        if ($scope.ddlFoodType != "-1") {
            angular.forEach($scope.FoodMasterList, function (item) {
                item.selected = !item.selected;
            });
        }
        else {
            toaster.pop('error', "Error", 'Select Food Type');
            $scope.selectAll = false;
        }
    };

    $scope.clr = function () {
        $scope.selectAll = false;
    };
  
    $scope.foodTypeList();
    $scope.fFoodTypeSavedList();
   
});