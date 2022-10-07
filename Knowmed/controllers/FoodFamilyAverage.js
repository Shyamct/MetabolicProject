app.controller('foodFamilyAverageCtrl', function ($scope, dataFactory, toaster) {
   
    
    $scope.fMasterList = function () {
        var params = {
            foodFamilyID: $scope.foodFamilyID,
           
        };
        dataFactory.AverageFoodMasterList(params).then(function (response) {
            var result = response.data;
            $scope.FoodMasterList  = result.foodMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
            });
        $scope.fFamilyAverageList();
    };
    $scope.fFamilyAverageList = function () {

        var foodFamilyId = null;
        if ($scope.ddlFoodFamily != '') {
            foodFamilyId = $scope.foodFamilyID
        }
        var params = {
            foodFamilyID: foodFamilyId
        };  
        dataFactory.FoodFamilyAverageList(params).then(function (response) {
            var result = response.data;
            $scope.FoodFamilyAverageList = result.foodFamilyAverage;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveFoodFamilyAverage = function () {
        var isExists = false;
        var food = "";

        angular.forEach($scope.visibleItems, function (item) {           
            if (item.selected) {               
                isExists = true;
                food = food + item.id + ",";
            }
        });       
        
        if ($scope.ddlFoodFamily == "" && ($scope.foodFamilyID == '' || $scope.foodFamilyID == 0 )) {
            toaster.pop('error', "Error", 'Select Food Family');
            return false;
        }
        if (isExists == false) {
            toaster.pop('error', "Error", 'Select atlease one Food !!');
            return false;
        }
        var params = {
            foodFamilyID: $scope.foodFamilyID,
            foodID: food,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveFoodFamilyAverage(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
          
            $scope.fMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteFoodFamilyAverage = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteFoodFamilyAverage(params).then(function (response) {
              
                $scope.fMasterList();
                toaster.pop('success', "Success", 'Deleted Successfully.');                       
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.toggleSelect = function () {
        if ($scope.ddlFoodFamily != '' && $scope.foodFamilyID != '') {
            angular.forEach($scope.FoodMasterList, function (item) {
                item.selected = !item.selected;
            });
        }
        else {
            toaster.pop('error', "Error", 'Select Food Family');
            $scope.selectAll = false;
        }
    };

    $scope.clr = function () {
        $scope.selectAll = false;
    };

    //$scope.fMasterList();
});