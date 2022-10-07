app.controller('cookingTemperatureCtrl', function ($scope, dataFactory, toaster) {   
    var existId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsCookingTemperature().then(function (response) {
            var result = response.data;           
            $scope.foodList = result.foodList;
            $scope.nutrientList = result.nutrientList;
            $scope.cookingMethodList = result.cookingMethodList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.GetCookingTemperatureList = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.CookingTemperatureList(params).then(function (response) {
            var result = response.data;
            $scope.cookingTemperatureList = result.cookingTemperatureList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.SaveCookingTemperature = function () {    

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
        if (isEmpty($scope.txtIdealTemperature)) { 
            toaster.pop('error', "Error", 'Please Enter Ideal Temperature');
            return false;
        }       
      
        var params = {
            id: existId,
            foodID: $scope.ddlFood,
            nutrientID: $scope.ddlNutrient,           
            cookingMethodID: $scope.ddlCookingMethod,
            idealTemperature: $scope.txtIdealTemperature,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveCookingTemperature(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetCookingTemperatureList();
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
            dataFactory.DeleteCookingTemperature(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetCookingTemperatureList();
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
        dataFactory.CookingTemperatureList(params).then(function (response) {
            var result = response.data;           
            var list = result.cookingTemperatureList;
            log(result.cookingTemperatureList);
            $scope.ddlFood = list[0].foodID;  
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.ddlCookingMethod = list[0].cookingMethodID;
            $scope.txtIdealTemperature = list[0].idealTemperature;  
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
        $scope.ddlCookingMethod = 0;
        $scope.txtIdealTemperature = '';
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtUrl = '';    
        existId = 0;
    };
    $scope.initControls();
    $scope.GetCookingTemperatureList();
});