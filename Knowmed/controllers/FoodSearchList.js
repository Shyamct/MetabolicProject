app.controller('foodSearchListCtrl', function ($scope, dataFactory, toaster, $state, $rootScope) { 

    $scope.getMasterActiveCompounds = function () {
       
        dataFactory.MasterActiveCompounds().then(function (response) {
            var result = response.data;
            $scope.masterActiveCompoundsList = result.masterActiveCompoundsList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getFoodList = function () {
        
        dataFactory.getSelectedFoodList().then(function (response) {           
            var result = response.data;
            $scope.foodList = result.foodList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.add = function (name, id) {
        var params = {
            id: id,
            foodName: name,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.AddImageStructure(params).then(function (response) {
            toaster.pop('success', "Success", 'Added Successfully.');
            $scope.getMasterActiveCompounds();
            $scope.getFoodList();
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
            dataFactory.DeleteImageStructure(params).then(function (response) {
                toaster.pop('success', "Success", 'Removed Successfully.');
                $scope.getMasterActiveCompounds();
                $rootScope.activityLog(response, 'DELETE Image Structure', 'Image Structure', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
   
    $scope.deleteFood = function (id) {
        if (confirm("Are you sure want to delete?")) {          
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteFood(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.getFoodList();
                $rootScope.activityLog(response, 'DELETE Food Image Structure', 'Food Image Structure', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.getMasterActiveCompounds();
    $scope.getFoodList();
    
});