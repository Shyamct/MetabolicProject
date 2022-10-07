app.controller('nutrientCategoryMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var nutrientCategoryMasterId = 0;
    var formdata = new FormData();
    var fileDesc = [];
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = '';

    $scope.initControls = function () {
        
        var params = {
            id: nutrientCategoryMasterId
        };    
        dataFactory.nutrientCategoryMasterInitControl(params).then(function (response) {
            var result = response.data;
            $scope.nutrientCategoryMaster = result.nutrientCategoryMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    var formdata = new FormData();
    $scope.getIconPathFiles = function ($files) {
        var timeStamp = new Date().getTime();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
        $scope.addNutrientCategoryFiles();
    };
    $scope.addNutrientCategoryFiles = function () {
        addedPFiles = [];

        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;
            for (var i = 0; i < result.length; i++) {
                fileDesc.push($scope.txtFileDesc);
                addedPFiles.push({
                    filePath: result[0],
                });
            }
            $scope.addedPFileList = addedPFiles;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
               
    $scope.saveNutrientCategoryMaster = function () {
      
        if (isEmpty($scope.txtNutrientCategory)) {
            toaster.pop('error', "Error", 'Please Enter Nutrient Category !!');
            return false;
        };
        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;
        }
       
        var params = {
            id: nutrientCategoryMasterId,
            nutrientCategory: $scope.txtNutrientCategory,
            colorCode: $scope.pickColorCode,
            displayOrder: $scope.txtDisplayOrder,
            iconPath: pFile,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveNutrientCategoryMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');

            var message = nutrientCategoryMasterId > 0 ? 'UPDATE NUTRIENT CATEGORY MASTER' : 'SAVE NUTRIENT CATEGORY MASTER';
            $rootScope.activityLog(response, message, 'NUTRIENT CATEGORY MASTER', '');

            $scope.clr();
            $scope.initControls();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteNutrientCategoryMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteNutrientCategoryMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
               
                $scope.clr();
                $scope.initControls();
                $rootScope.activityLog(response, 'DELETE NUTRIENT CATEGORY MASTER', 'NUTRIENT CATEGORY MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        nutrientCategoryMasterId = paramid;
        var params = {
            id: paramid
        };        
        dataFactory.nutrientCategoryMasterInitControl(params).then(function (response) {
            var result = response.data;
            var list = result.nutrientCategoryMaster;
            $scope.txtNutrientCategory = list[0].nutrientCategory;
            $scope.pickColorCode = list[0].colorCode;
            $scope.txtDisplayOrder = list[0].displayOrder;
            $scope.addedPFileList = list[0].iconPath;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {  
        $scope.pickColorCode = '';
        $scope.txtNutrientCategory = '';       
        $scope.txtDisplayOrder = '';
        $('#fileIconPath').val('');
        nutrientCategoryMasterId = 0;
    };

    $scope.initControls();
});

