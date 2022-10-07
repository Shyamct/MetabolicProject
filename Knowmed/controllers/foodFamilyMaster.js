app.controller('foodFamilyMasterCtrl', function ($scope, dataFactory, $rootScope,toaster) {
    var foodFamilyMasterId = 0;
    var formdata = new FormData();
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];

    $scope.initControls = function () {
        dataFactory.foodFamilyMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.foodType = result.foodType;
            $scope.getFoodFamilyMaster();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getFoodFamilyMaster = function () {
        var params = {
            id: foodFamilyMasterId
        };
        dataFactory.foodFamilyMaster(params).then(function (response) {
            var result = response.data;
            $scope.foodFamilyMaster = result.foodFamilyMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getFoodFamilyFiles = function ($files) {
        formdata = new FormData();
        angular.forEach($files, function (value, key) {

            formdata.append(key, value);

        });
        $scope.addFoodFamilyFiles();
    };
    $scope.addFoodFamilyFiles = function () {
        addedPFiles = [];
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;

            log(result);
            for (var i = 0; i < result.length; i++) {
                if (i == (result.length - 1)) {
                    addedPFiles.push({
                        filePath: result[i]
                    });
                }
            }

            $scope.addedPFileList = addedPFiles;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveFoodFamilyMaster = function () {

        if (isEmpty($scope.txtfoodFamily)) {
            toaster.pop('error', "Error", 'Please Enter Food Family !!');
            return false;
        }
        if ($scope.ddlFoodType == -1) {
            toaster.pop('error', "Error", 'Please Select Food Type !!');
            return false;
        }
        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;
        }
        //log(fileDesc);
        //log(addedPFiles);        
        //log($scope.addedPFileList);
        var params = {
            id: foodFamilyMasterId,
            foodFamily: $scope.txtfoodFamily,
            foodTypeID: $scope.ddlFoodType,
            foodImagePath: pFile,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveFoodFamilyMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');

            var message = foodFamilyMasterId > 0 ? 'UPDATE FOOD FAMILY MASTER' : 'SAVE FOOD FAMILY MASTER';
            $rootScope.activityLog(response, message, 'FOOD FAMILY MASTER', '');

            $scope.clr();
            $scope.getFoodFamilyMaster();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteFoodFamilyMaster = function (foodFamilyID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: foodFamilyID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteFoodFamilyMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getFoodFamilyMaster();
                $rootScope.activityLog(response, 'DELETE FOOD FAMILY MASTER', 'FOOD FAMILY MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        foodFamilyMasterId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.foodFamilyMaster(params).then(function (response) {
            var result = response.data;
            var list = result.foodFamilyMaster;
            $scope.txtfoodFamily = list[0].foodFamily;
            $scope.ddlFoodType = list[0].foodTypeID;
            $scope.addedPFileList = list[0].foodImagePath;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.txtfoodFamily = '';
        $scope.addedPFileList = [];
        //fileDesc = [];
        addedPFiles = [];
        pFile = '';
        $scope.ddlFoodType = -1;
        $('#fileFoodFamily').val('');
        foodFamilyMasterId = 0;
    };

    $scope.initControls();
    $scope.getFoodFamilyMaster();
});