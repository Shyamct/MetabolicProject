app.controller('mealFoodAssignCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var mealFoodAssignId = 0;

    $scope.initControls = function () {
        dataFactory.mealFoodAssignInitControl().then(function (response) {
            var result = response.data;
            $scope.mealMaster = result.mealMaster;
            $scope.foodGroup = result.foodGroup;
            $scope.foodCategory = result.foodCategory;
            $scope.foodMaster = result.foodMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.getMealFoodAssign = function () {
        dataFactory.mealFoodAssign().then(function (response) {
            var result = response.data;
            $scope.mealFoodAssign = result.mealFoodAssign;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.getFoodName = function () {
        var params = {

            foodGroupId: $scope.ddlCategory,
            foodCategoryID: $scope.ddlFood,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };


        dataFactory.getFoodName(params).then(function (response) {
            var result = response.data;
            $scope.foodMaster = result.foodMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveMealFoodAssign = function () {

        if ($scope.ddlMeal == -1) {
            toaster.pop('error', "Error", 'Please Select Meal Type !!');
            return false;
        };
        if ($scope.ddlCategory == -1) {
            toaster.pop('error', "Error", 'Please Select Food Category !!');
            return false;
        };
        if ($scope.ddlFood == -1) {
            toaster.pop('error', "Error", 'Please Select Food Group !!');
            return false;
        };
        if ($scope.ddlFoodName == -1) {
            toaster.pop('error', "Error", 'Please Select Food Name !!');
            return false;
        };

        var params = {

            id: mealFoodAssignId,
            mealID: $scope.ddlMeal,
            foodCategoryID: $scope.ddlCategory,
            foodGroupId: $scope.ddlFood,
            itemID: $scope.ddlFoodName,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveMealFoodAssign(params).then(function (response) {

            var message = mealFoodAssignId > 0 ? 'UPDATE Meal Food Assign' : 'SAVE Meal Food Assign';
            $rootScope.activityLog(response, message, 'Meal Food Assign', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.getMealFoodAssign();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteMealFoodAssign = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
            };
            dataFactory.deleteMealFoodAssign(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getMealFoodAssign();
                $rootScope.activityLog(response, 'DELETE Meal Food Assign', 'Meal Food Assign', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        mealFoodAssignId = paramid;
        var params = {
            id: paramid
        };
       
        dataFactory.mealFoodAssign(params).then(function (response) {
            var result = response.data;
            var list = result.mealFoodAssign;
            $scope.ddlMeal = list[0].mealID;
            $scope.ddlCategory = list[0].foodCategoryID;
            $scope.ddlFood = list[0].foodGroupID;
            $scope.ddlFoodName = list[0].itemID;
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.clr = function () {
        $scope.ddlMeal = -1;
        $scope.ddlCategory = -1;
        $scope.ddlFood = -1;
        $scope.ddlFoodName = -1;
        mealFoodAssign = 0;
    };
    $scope.initControls();
    $scope.getMealFoodAssign();
});