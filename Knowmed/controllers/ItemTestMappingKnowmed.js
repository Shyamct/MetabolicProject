app.controller('itemTestMappingKnowmedCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    
    var id = 0;

    $scope.initControls = function () {
        dataFactory.InitControlItemsToKnowmedTest().then(function (response) {
            var result = response.data;
            $scope.itemList = result.itemList;
            $scope.testList = result.testList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetItemsToKnowmedTest = function () {       
        var params = {
            id: id
        };
        dataFactory.GetItemsToKnowmedTest(params).then(function (response) {
            var result = response.data;
            $scope.itemTestMappingKnowmedList = result.itemTestMappingKnowmedList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.save = function () {       
        
        if ($scope.ddlItem == 0) {
            toaster.pop('error', "Error", 'Please Select Item');
            return false;
        }
        if ($scope.ddlTest == 0) {
            toaster.pop('error', "Error", 'Please Select Test');
            return false;
        }      
        var params = {
            id: id,
            itemID: $scope.ddlItem,
            testID: $scope.ddlTest,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)           
        };       
        dataFactory.SaveItemsToKnowmedTest(params).then(function (response) {
            var message = id > 0 ? 'UPDATE Items To Knowmed Test ' : 'SAVE Items To Knowmed Test ';
            $rootScope.activityLog(response, message, 'Items To Knowmed Test ', '');
            $scope.clr();
            $scope.initControls();
            $scope.GetItemsToKnowmedTest();
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
            dataFactory.DeleteItemsToKnowmedTest(params).then(function (response) {
                $scope.clr();
                $scope.initControls();
                $scope.GetItemsToKnowmedTest();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Items To Knowmed Test', 'Items To Knowmed Test', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        
        id = paramid;
        var params = {
            id: paramid            
        };
        dataFactory.GetItemsToKnowmedTest(params).then(function (response) {
            var result = response.data;
            var list = result.itemTestMappingKnowmedList;
            $scope.ddlItem = list[0].hisItemId;
            $scope.ddlTest = list[0].knowmedTestId;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.clr = function () {
        id = 0;
        $scope.ddlItem = 0;
        $scope.ddlTest = 0;        
    };

    $scope.initControls();
    $scope.GetItemsToKnowmedTest();
});