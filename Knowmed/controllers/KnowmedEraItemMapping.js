app.controller('knowmedEraItemMappingCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var identity = 0; 

    $scope.initControls = function () {      
        dataFactory.InitControlsKnowmedEraItemMapping().then(function (response) {         
            var result = response.data;           
            $scope.knowmedItemList = result.knowmedItemList;       
            $scope.eraItemList = result.eraItemList;       
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetMappedItemList = function () {
        var params = {
            knowmedItem: $scope.ddlKnowmedItem    
        };
        dataFactory.GetMappedItemList(params).then(function (response) {
            var result = response.data;
            $scope.mappedItemList = result.mappedItemList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.save = function () {

        var isExists = false;
        var eraItemID = "";
        angular.forEach($scope.visibleItems, function (item) {
            if (item.selected) {
                isExists = true;
                eraItemID = eraItemID + item.eraItemID + ",";
            }
        });   
        if ($scope.ddlKnowmedItem == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }    
        if (isExists == false) {
            toaster.pop('error', "Error", 'Please Select Any Era Item');
            return false;
        }  
        var params = {   
            knowmedItemID: $scope.ddlKnowmedItem,           
            eraItemID: eraItemID,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveKnowmedEraItemMapping(params).then(function (response) {
            var message = identity > 0 ? 'UPDATE Knowmed Era Item Mapping ' : 'SAVE Knowmed Era Item Mapping ';
            $rootScope.activityLog(response, message, 'Knowmed Era Item Mapping ', '');
            $scope.initControls();
            $scope.GetMappedItemList();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
            
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };

            dataFactory.DeleteKnowmedEraItemMapping(params).then(function (response) {
                $scope.initControls();
                $scope.GetMappedItemList();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Knowmed Era Item Mapping', 'Knowmed Era Item Mapping', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };    
    
    $scope.toggleSelect = function () {
        if ($scope.ddlKnowmedItem != 0) {
            angular.forEach($scope.eraItemList, function (item) {
                item.selected = !item.selected;
            });
        }
        else {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            $scope.selectAll = false;
        }
    };
    $scope.clr = function () {
        $scope.selectAll = false;
    };

    $scope.initControls();
    $scope.GetMappedItemList();

});