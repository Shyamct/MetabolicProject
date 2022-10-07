app.controller('foodCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, ASSETS) {
    var foodID = 0;
    $scope.buttonText = 'Save';
    $scope.chkWhole = false;

    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];

    $scope.initControls = function () {
        dataFactory.InitControlsfoodMaster().then(function (response) {
            var result = response.data;
            $scope.foodCatList = result.foodCategoryList;//from API
            $scope.foodGroupList = result.foodGroupList;
            $scope.colorList = result.colorList;
            $scope.nutrientQuantityList = result.nutrientQuantityList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

        if (!isEmpty($state.params.foodID)) {
            foodID = $state.params.foodID;
            $scope.edit(foodID);
        }
    };


    $scope.getFoodImageFiles = function ($files) {
        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);

        });
        $scope.addNewsFiles();
    };

    $scope.addNewsFiles = function () {
        addedPFiles = [];
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;
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


    $scope.getColorList = function () {
        //$scope.clr();
        var params = {
        };
        dataFactory.getColorList(params).then(function (response) {
            var result = response.data;
            $scope.colorList = result.colorList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.

        if ($scope.chkIsWhole == true) {
            $scope.IsVisible = false;
        }
        else {
            $scope.IsVisible = true;
        }


    };

    $scope.GetFoodCategoryList = function () {
        //$scope.clr();
        var params = {
            foodCategoryID: $scope.ddlFoodCategory//ngmodel id
        };
        dataFactory.foodMasterList(params).then(function (response) {
            var result = response.data;
            $scope.foodMasterList = result.foodMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveFoodMaster = function () {
        if ($scope.ddlFoodCategory == -1) {
            alert('Please Select food Category');
            return false;
        }
        if (addedPFiles.length > 0) {
            for (var i = 0; i < $scope.addedPFileList.length; i++) {
                pFile = $scope.addedPFileList[0].filePath;
            }
        }
        log(pFile);
        var params = {
            id: foodID,
            foodGroupID: $scope.ddlFoodGroup,
            foodCategoryID: $scope.ddlFoodCategory,
            foodName: $scope.txtFoodName,
            foodShortName: $scope.txtFoodShortName,
            companyName: $scope.txtCompanyName,
            manufacturerName: $scope.txtManufacturerName,
            scientificName: $scope.txtFoodScientifictName,
            botanicalName: $scope.txtBotanicalName,
            commonName: $scope.txtCommonName,
            //nature: $scope.txtNature,
            nature: $scope.ddlNature,
            isPart: $scope.chkIsWhole,
            //partName: $scope.txtParts,
            partName: $scope.ddlPart,
            colorId: $scope.ddlColor,
            foodImagePath: pFile,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveFoodMaster(params).then(function (response) {
            var list = response.data.tableRow;

            if (foodID > 0) {
                $rootScope.activityLog(response, 'UPDATE FOOD MASTER', 'FOOD MASTER', '');
            }
            else if (list && list.length > 0) {
                params.id = list[0].rowID;
                $rootScope.activityLog(response, 'SAVE FOOD MASTER', 'FOOD MASTER', '', JSON.stringify(params));
            }

            $scope.clr();
            $scope.GetFoodCategoryList();
            addedPFiles = [];
            $scope.addedPFileList = [];
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
            $rootScope.activityLog(error, 'SAVE FOOD MASTER', 'FOOD MASTER', '');
            //toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.edit = function (paramid) {
        foodID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.foodMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.foodMasterList;
            if (list.length > 0) {
                $scope.buttonText = 'Update';
                $scope.ddlFoodCategory = list[0].foodCategoryID;
                $scope.ddlFoodGroup = list[0].foodGroupID;
                $scope.txtFoodName = list[0].foodName;
                $scope.txtFoodShortName = list[0].foodShortName;
                $scope.txtFoodScientifictName = list[0].scientificName;
                $scope.txtCompanyName = list[0].companyName;
                $scope.txtManufacturerName = list[0].manufacturerName;
                $scope.txtBotanicalName = list[0].botanicalName;
                $scope.txtCommonName = list[0].commonName;
                $scope.ddlNature = list[0].nature;
                $scope.chkIsWhole = list[0].isPart;
                $scope.ddlPart = list[0].partName;
                $scope.ddlColor = list[0].colorId;
                $scope.addedPFileList = result.foodImagePath;
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteFoodMaster(params).then(function (response) {
                $scope.GetFoodCategoryList();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE FOOD MASTER', 'FOOD MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.clr = function () {
        $scope.ddlFoodGroup = 0;
        $scope.txtFoodName = '';
        $scope.txtFoodShortName = '';
        $scope.txtFoodScientifictName = '';
        $scope.txtCompanyName = '';
        $scope.txtManufacturerName = '';
        $scope.txtBotanicalName = '';
        $scope.txtCommonName = '';
        $scope.ddlNature = 0;
        $scope.chkIsWhole = false;
        $scope.ddlPart = 0;
        $scope.buttonText = 'Save';
        $scope.ddlColor = -1;
        foodID = 0;
        $scope.addedPFileList = [];
        addedPFiles = [];
        pFile = '';
        $('#fileFoodImage').val('');
    };



    $scope.getNutrientQuantity = function () {

        $('#myModal').modal('show');
        var obj = {
            foodGroupID: $scope.ddlFoodGroup
        };

        dataFactory.getNutrientQuantity(obj).then(function (response) {
            var result = response.data;
            $scope.nutrientQuantityList = result.nutrientQuantityList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });



    };



    $scope.initControls();
    //$scope.getColorList();
    //$scope.initControlsMaster();
});