app.controller('nutrientChannelMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var nutrientID = 0;
    var arr = [];
    $scope.addedChannelList = [];

    $scope.initControls = function () {
        dataFactory.nutrientChannelMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.channelList = result.channelList;
            $scope.nutrientChannelList = result.nutrientChannelList;
            //for (var i = 0; i < result.nutrientChannelList.length; i++) {
            //    $scope.nutrientChannelList[i].dtChaneelList = JSON.parse(result.nutrientChannelList[i].dtChaneelList);
            //}
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddChannel = function () {
        if ($scope.ddlNutrient ==-1) {
            toaster.pop('error', "Error", 'Please Select Nutrient Name');
            return false;
        }
        
        arr.push({
            channelId: $scope.ddlChannel,
            nutrientName: $("#ddlChannel option:selected").text().trim(),

        });

        $scope.addedChannelList = arr;
    };

    $scope.deleteChannelList = function (index) {
        $scope.addedChannelList.splice(index, 1);
    };

    $scope.saveNutrientChannelMaster = function () {

        if ($scope.ddlNutrient == -1) {
            toaster.pop('error', "Error", 'Please Select Nutrient Name');
            return false;
        }
        if ($scope.addedChannelList.length < 1) {
            toaster.pop('error', "Error", 'Please Select Nutrient Channel Name');
            return false;
        }
       
        var params = {
            id: nutrientID,
            nutrientID: $scope.ddlNutrient,
            //channelNutrientID: $scope.ddlChannel,
            dtChaneelList: JSON.stringify($scope.addedChannelList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveNutrientChannelMaster(params).then(function (response) {
            if (nutrientID > 0) {
                $rootScope.activityLog(response, 'UPDATE Nutrient Channel Master', 'Nutrient Channel Master', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteNutrientChannelMaster = function (nutrientID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: nutrientID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteNutrientChannelMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Nutrient Channel Master', 'Nutrient Channel Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        nutrientID = row;
        var params = {
            id: row
        };
        dataFactory.editNutrientChannelMaster(params).then(function (response) {
            var result = response.data.nutrientList;
            arr = [];
            if (result.length > 0) {
                $scope.ddlNutrient = result[0]['nutrientID'];
                for (var i = 0; i < result.length; i++) {
                    arr.push({
                        channelId: result[i]['channelNutrientID'],
                        nutrientName: result[i]['channelName'],

                    });
                }
                $scope.addedChannelList = arr;
                $scope.btndisabled = true;
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlNutrient = -1;
        $scope.ddlChannel = -1;
        nutrientID = 0;
        $scope.addedChannelList = [];
        arr = [];
        $scope.btndisabled = false;
    };

    $scope.initControls();
});