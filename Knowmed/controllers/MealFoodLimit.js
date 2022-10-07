app.controller('mealFoodLimitCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var mealFoodLimitId = 0;

    $scope.initControls = function () {
        dataFactory.mealFoodLimitInitControl().then(function (response) {
            var result = response.data;
            $scope.mealMaster = result.mealMaster;
            $scope.foodGroup = result.foodGroup;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.getMealFoodLimit = function () {        
        dataFactory.mealFoodLimit().then(function (response) {
            var result = response.data;
            $scope.mealFoodLimit = result.mealFoodLimit;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveMealFoodLimit = function () {

        if ($scope.ddlMeal == -1) {
            toaster.pop('error', "Error", 'Please Select Meal Type !!');
            return false;
        };
        if ($scope.ddlFood == -1) {
            toaster.pop('error', "Error", 'Please Select Food Group !!');
            return false;
        };
        if (isEmpty($scope.txtfood)) {
            toaster.pop('error', "Error", 'Please Enter No.OF Food  !!');
            return false;
        };
        if ($scope.txtfood <= 0) {
            toaster.pop('error', "Error", 'Please Enter No.OF Food  !!');
            return false;
        }
        var params = {

            id: mealFoodLimitId,
            mealID: $scope.ddlMeal,
            foodGroupID: $scope.ddlFood,
            noOfFood: $scope.txtfood,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveMealFoodLimit(params).then(function (response) {
            var message = mealFoodLimitId > 0 ? 'Update Meal Food Limit' : 'Save Meal Food Limit';
            $rootScope.activityLog(response, message, 'Meal Food Limit', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.getMealFoodLimit();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteMealFoodLimit = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
            };
            dataFactory.deleteMealFoodLimit(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getMealFoodLimit();
                $rootScope.activityLog(response, 'Delete Meal Food Limit', ' Meal Food Limit', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        mealFoodLimitId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.mealFoodLimit(params).then(function (response) {
            var result = response.data;
            var list = result.mealFoodLimit;
            $scope.ddlMeal = list[0].mealId;
            $scope.ddlFood = list[0].foodGroupID;
            $scope.txtfood = list[0].noOfFood;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.clr = function () {
        $scope.ddlFood = -1;
        $scope.ddlMeal = -1;
        $scope.txtfood = '';
       
        mealFoodLimitId = 0;
    };
    $scope.initControls();
    $scope.getMealFoodLimit();
});