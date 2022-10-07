app.controller('foodWeightCtrl', function ($scope, dataFactory, toaster, $rootScope) {   
    var existId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsFoodWeight().then(function (response) {
            var result = response.data;           
            $scope.foodList = result.foodList;
            $scope.unitList = result.unitList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.getFoodWeight = function () {      
        var params = {
            foodID: $scope.ddlFood
        };
        dataFactory.FoodWeightList(params).then(function (response) {
            var result = response.data;
            $scope.foodWeightList = result.foodWeightList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveFoodWeight = function () {      
        
        if ($scope.ddlFood == 0) {
            toaster.pop('error', "Error", 'Please Select Food');
            return false;
        }       
        var params = {
            id: existId,
            foodID: $scope.ddlFood,
            amount: $scope.txtAmount,           
            unitID: $scope.ddlUnit,
            unitIDD: $("#ddlUnit option:selected").text().trim(),
            weightInGram: $scope.txtWeightInGram,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)        
        };
        dataFactory.SaveFoodWeight(params).then(function (response) {
            var message = existId > 0 ? 'UPDATE FOOD WEIGHT ' : 'SAVE FOOD WEIGHT ';
            $rootScope.activityLog(response, message, 'FOOD WEIGHT ', '');
            $scope.clr();
            $scope.getFoodWeight();
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
            dataFactory.DeleteFoodWeight(params).then(function (response) {
                $scope.clr();
                $scope.getFoodWeight();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE FOOD WEIGHT', 'FOOD WEIGHT', '');
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
        dataFactory.FoodWeightList(params).then(function (response) {
            var result = response.data;
            var list = result.foodWeightList;  
            $scope.ddlFood = list[0].foodID;
            $scope.txtAmount = list[0].amount;
            $scope.ddlUnit = list[0].unitID;
            $scope.txtWeightInGram = list[0].weightInGram;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.txtAmount = '';
        $scope.ddlUnit = 0;
        $scope.txtWeightInGram = '';
        existId = 0;
    };

    $scope.initControls();    
});