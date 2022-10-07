app.controller('foodWeightMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existId = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsFoodWeightMaster().then(function (response) {
            var result = response.data;
            $scope.unitMasterList = result.unitMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getFoodWeightMaster = function () {
        var params = {
            foodID: $scope.foodID
        };
        log(params);
        dataFactory.FoodWeightMasterList(params).then(function (response) {
            var result = response.data;
            $scope.foodWeightMasterList = result.foodWeightMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveFoodWeightMaster = function () {

        if (isEmpty($scope.txtFood)){
            toaster.pop('error', "Error", 'Please Enter Food Name');
            return false;
        }
        var params = {
            id: existId,
            foodID: $scope.foodID,
            amount: $scope.txtAmount,
            unitID: $scope.ddlUnit,
            unitIDD: $("#ddlUnit option:selected").text().trim(),
            weightInGram: $scope.txtWeightInGram,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveFoodWeightMaster(params).then(function (response) {
            var message = existId > 0 ? 'UPDATE FOOD WEIGHT MASTER' : 'SAVE FOOD WEIGHT MASTER';
            $rootScope.activityLog(response, message, 'FOOD WEIGHT MASTER', '');

            $scope.clr();
            $scope.getFoodWeightMaster();
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
            dataFactory.DeleteFoodWeightMaster(params).then(function (response) {
                $scope.clr();
                $scope.getFoodWeightMaster();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE FOOD WEIGHT MASTER', 'FOOD WEIGHT MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        existId = paramid;
        var params = {
            id: paramid,
            foodID: $scope.foodID
        };
        
        dataFactory.FoodWeightMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.foodWeightMasterList;
            log(list);
            if (list.length > 0) {
                $scope.foodID = list[0].foodID
                $scope.txtFood = list[0].foodName
                $scope.txtAmount = list[0].amount
                $scope.ddlUnit = list[0].unitID
                $scope.txtWeightInGram = list[0].weightInGram
            }
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {
        $scope.txtFood = '';
        $scope.txtAmount = '';
        $scope.ddlUnit = 0;
        $scope.txtWeightInGram = '';
        existId = 0;
    };

    $scope.initControls();
    $scope.getFoodWeightMaster();
});