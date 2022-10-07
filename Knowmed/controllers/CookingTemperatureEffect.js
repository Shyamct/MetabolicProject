app.controller('cookingTemperatureEffectCtrl', function ($scope, dataFactory, toaster) {   
    var existId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsCookingTemperatureEffect().then(function (response) {
            var result = response.data;           
            $scope.foodList = result.foodList;
            $scope.nutrientList = result.nutrientList;
            $scope.cookingMethodList = result.cookingMethodList;
            $scope.variationList = result.variationList;
            $scope.unitList = result.unitList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.GetCookingTemperatureEffectList = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.CookingTemperatureEffectList(params).then(function (response) {
            var result = response.data;
            $scope.cookingTemperatureEffectList = result.cookingTemperatureEffectList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.SaveCookingTemperatureEffect = function () {    

        if ($scope.ddlFood == 0) {
            toaster.pop('error', "Error", 'Please Select Food');
            return false;
        }
        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        if ($scope.ddlCookingMethod == 0) {
            toaster.pop('error', "Error", 'Please Select Cooking Method');
            return false;
        }

        var params = {
            id: existId,
            foodID: $scope.ddlFood,
            nutrientID: $scope.ddlNutrient,           
            cookingMethodID: $scope.ddlCookingMethod,
            cookingTimeMinutes: $scope.txtCookingTimeMinutes,
            cookingTemperature: $scope.txtCookingTemperature,
            variationType: $scope.ddlVariationType,
            variationAmountPercentage: $scope.txtvariationAmountPercentage,
            variationAmount: $scope.txtVariationAmount,
            variationAmountUnItID: $scope.ddlUnit,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveCookingTemperatureEffect(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetCookingTemperatureEffectList();
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
            dataFactory.DeleteCookingTemperatureEffect(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetCookingTemperatureEffectList();
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
        dataFactory.CookingTemperatureEffectList(params).then(function (response) {
            var result = response.data;           
            var list = result.cookingTemperatureEffectList;
            log(result.cookingTemperatureEffectList);
            $scope.ddlFood = list[0].foodID;  
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.ddlCookingMethod = list[0].cookingMethodID;
            $scope.txtCookingTimeMinutes = list[0].cookingTimeMinutes; 
            $scope.txtCookingTemperature = list[0].cookingTemperature;  
            $scope.ddlVariationType = list[0].variationType;  
            $scope.txtvariationAmountPercentage = list[0].variationAmountPercentage;  
            $scope.txtVariationAmount = list[0].variationAmount;
            $scope.ddlUnit = list[0].unitID; 
            $scope.txtRemark = list[0].remark;  
            $scope.txtReference = list[0].reference;  
            $scope.txtUrl = list[0].url;  
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {  
        //$scope.ddlFood = 0;
        //$scope.ddlNutrient = 0;
        //$scope.ddlCookingMethod = 0;
        $scope.txtCookingTimeMinutes = '';
        $scope.txtCookingTemperature = '';
        $scope.ddlVariationType = 0;
        $scope.txtvariationAmountPercentage = '';
        $scope.txtVariationAmount = '';
        $scope.ddlUnit = 0; 
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtUrl = '';    
        existId = 0;
    };
    $scope.initControls();
    $scope.GetCookingTemperatureEffectList();
});