app.controller('foodFamilyAssignCtrl', function ($scope, dataFactory, $rootScope, toaster) {
   
    $scope.fFamilyMasterList = function () {
        dataFactory.FoodFamilyMasterList().then(function (response) {
            var result = response.data;
            $scope.FoodFamilyMasterList = result.foodFamilyMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.fMasterList = function () {
        dataFactory.FoodMasterList().then(function (response) {
            var result = response.data;
            $scope.FoodMasterList  = result.foodMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.fFamilyAssignList = function () {

        var foodFamilyId = null;
        if ($scope.ddlFoodFamily > 0) {
            foodFamilyId = $scope.ddlFoodFamily
        }
        var params = {
            foodFamilyID: foodFamilyId
        };  
        dataFactory.FoodFamilyAssignList(params).then(function (response) {
            var result = response.data;
            $scope.FoodFamilyAssignList = result.foodFamilyAssign;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveFoodFamilyAssign = function () {
        var isExists = false;
        var food = "";
        //for (var i = 0; i < $scope.FoodMasterList.length; i++) {
        //    if ($scope.FoodMasterList[i].Selected) {
        //        isExists = true;
        //        food = food + $scope.FoodMasterList[i].id + ",";
        //    }
        //}

        angular.forEach($scope.visibleItems, function (item) {           
            if (item.selected) {               
                isExists = true;
                food = food + item.id + ",";
            }
        });       
        
        if ($scope.ddlFoodFamily == "-1") {
            toaster.pop('error', "Error", 'Select Food Family');
            return false;
        }
        if (isExists == false) {
            toaster.pop('error', "Error", 'Select atlease one Food !!');
            return false;
        }
        var params = {
            foodFamilyID: $scope.ddlFoodFamily,
            foodID: food,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveFoodFamilyAssign(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = 'SAVE FOOD FAMILY ASSIGN';
            $rootScope.activityLog(response, message, ' FOOD FAMILY ASSIGN', '');

            $scope.fFamilyAssignList();
            $scope.fMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteFoodFamilyAssign = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteFoodFamilyAssign(params).then(function (response) {
                $scope.fFamilyAssignList();    
                $scope.fMasterList();
                toaster.pop('success', "Success", 'Deleted Successfully.');   
                $rootScope.activityLog(response, 'DELETE FOOD FAMILY ASSIGN', 'FOOD FAMILY ASSIGN', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.toggleSelect = function () {
        if ($scope.ddlFoodFamily != "-1") {
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
        //$scope.ddlFoodFamily = -1;
        $scope.selectAll = false;
    };
    $scope.fFamilyMasterList();
    $scope.fMasterList();
    //$scope.fFamilyAssignList();
});