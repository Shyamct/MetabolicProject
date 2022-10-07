app.controller('foodRecipeCategoryCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    $scope.foodMasterCategoryList = function () {

        dataFactory.foodMasterCategoryList().then(function (response) {
            var result = response.data;
            $scope.foodMaster = result.foodMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.foodRecipeCategoryList = function () {

        dataFactory.foodRecipeCategoryList().then(function (response) {
            var result = response.data;
            $scope.foodRecipeCategory = result.foodRecipeCategory;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.foodRecipeAssignList = function () {

        var foodId = null;
        if ($scope.ddlFoodName > 0) {
            foodId = $scope.ddlFoodName
        }
        var params = {
            recipeCategoryID: foodId
        };
        dataFactory.foodRecipeAssignList(params).then(function (response) {
            var result = response.data;
            $scope.foodRecipeAssign = result.foodRecipeAssign;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.deleteFoodRecipeCategory = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteFoodRecipeCategory(params).then(function (response) {
                $scope.foodRecipeAssignList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE FOOD RECIPE CATEGORY', 'FOOD RECIP CATEGORY', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.saveFoodRecipeCategory = function () {
        var isExists = false;
        var reciepCategory = "";
        angular.forEach($scope.visibleItems, function (item) {
            if (item.selected) {
                isExists = true;
                reciepCategory = reciepCategory + item.id + ",";
            }
        });

        if ($scope.ddlFoodName == "-1") {
            toaster.pop('error', "Error", 'Select Food');
            return false;
        }
        if (isExists == false) {
            toaster.pop('error', "Error", 'Select atlease one Food !!');
            return false;
        }
        var params = {
            foodID: $scope.ddlFoodName,
            recipeCategoryID: reciepCategory,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveFoodRecipeCategory(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = 'SAVE FOOD Recipe Category';
            $rootScope.activityLog(response, message, ' FOOD Recipe Category', '');
            $scope.foodRecipeAssignList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.toggleSelect = function () {
        if ($scope.ddlFoodName != "-1") {
            angular.forEach($scope.foodRecipeCategory, function (item) {
                item.selected = !item.selected;
            });
        }
        else {
            toaster.pop('error', "Error", 'Select Food Category');
            $scope.selectAll = false;
        }
    };

    $scope.clr = function () {
        $scope.selectAll = false;
    };

    $scope.foodMasterCategoryList();
    $scope.foodRecipeCategoryList();
   
});