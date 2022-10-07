app.controller('addfoodCoockingMethodCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var foodid = 0;

    $scope.initControls = function () {
        dataFactory.addfoodCoockingMethodInitControl().then(function (response) {
            var result = response.data;
            $scope.foodList = result.foodList;
            $scope.cookingMethodList = result.cookingMethodList;
            $scope.foodDishList = result.foodDishList;
            $scope.allFoodCookingMethodList = result.allFoodCookingMethodList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveAddfoodCoockingMethod = function () {

        if ($scope.ddlFood == -1) {
            toaster.pop('error', "Error", 'Please Select Food Name');
            return false;
        }
        var params = {
            id: foodid,
            foodID: $scope.ddlFood,
            methodTypeID: $scope.ddlCoocking,
            dishTypeID: $scope.ddlDish,
            coockingMethod: $scope.txtCoockingMethod,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveAddfoodCoockingMethod(params).then(function (response) {
            if (foodid > 0) {
                $rootScope.activityLog(response, 'UPDATE ADD FOOD COOCKING METHOD', 'ADD FOOD COOCKING METHOD', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteAddfoodCoockingMethod = function (foodid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: foodid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteAddfoodCoockingMethod(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE ADD FOOD COOCKING METHOD', 'ADD FOOD COOCKING METHOD', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        foodid = row;
        var params = {
            id: row
        };
        dataFactory.addfoodCoockingMethodInitControl(params).then(function (response) {
            console.log(response.data);
            var result = response.data.allFoodCookingMethodList[0];
            $scope.ddlFood = result.foodID;
            $scope.ddlCoocking = result.methodTypeID;
            $scope.ddlDish = result.dishTypeID;
            $scope.txtCoockingMethod = result.coockingMethod;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlFood = -1;
        $scope.ddlCoocking = -1;
        $scope.ddlDish = -1;
        $scope.txtCoockingMethod = '';
        foodid = 0;
    };

    $scope.initControls();
});