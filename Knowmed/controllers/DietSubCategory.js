app.controller('dietSubCategoryCtrl', function ($scope, dataFactory, toaster) {
    
    var id = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsDietSubCategory().then(function (response) {
            var result = response.data;
            $scope.statusList = result.levelTypeMaster;
            $scope.nutrientMasterList = result.nutrientMasterList;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetDietSubCategory = function () {
       
        var params = {
            id: id
        };
        dataFactory.DietSubCategoryList(params).then(function (response) {
            var result = response.data;
            $scope.dietSubCategoryList = result.dietSubCategoryList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveDietSubCategory = function () {
       
        
           
            if ($scope.txtSubCategoryName == '') {
                toaster.pop('error', "Error", 'Please Enter SubCategory Name');
                return false;
            }
            if ($scope.ddlLevelType == 0) {
                toaster.pop('error', "Error", 'Please Select Level type');
                return false;
            }
            if ($scope.ddlNutrient == 0) {
                toaster.pop('error', "Error", 'Please Select Nutrient');
                return false;
            }
        
        var params = {
            id: id,
            levelTypeID: $scope.ddlLevelType,
            subCategoryName: $scope.txtSubCategoryName,
            nutrientID: $scope.ddlNutrient,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)           
        };       
        dataFactory.SaveDietSubCategory(params).then(function (response) {
           
            $scope.clr();
            $scope.GetDietSubCategory();
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
            dataFactory.DeleteDietSubCategory(params).then(function (response) {
                $scope.GetDietSubCategory();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
               
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
        dataFactory.DietSubCategoryList(params).then(function (response) {
            var result = response.data;
            var list = result.dietSubCategoryList;
            $scope.ddlLevelType = list[0].levelTypeID;
            $scope.txtSubCategoryName = list[0].subCategoryName;
            $scope.ddlNutrient = list[0].nutrientID;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.clr = function () {
        $scope.txtSubCategoryName = '';
        $scope.ddlNutrient = 0;
        id = 0;
        $scope.ddlLevelType = 0;
    };
    $scope.initControls();
    $scope.GetDietSubCategory();
});