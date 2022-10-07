app.controller('assignSubCategoryToCategoryCtrl', function ($scope, dataFactory, toaster) {
    
    var id = 0;
    
    $scope.initControls = function () {
        dataFactory.InitControlsAssignSubCategoryToCategory().then(function (response) {
            var result = response.data;
            $scope.subCategoryList = result.subCategoryList;
            $scope.categoryList = result.categoryList;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetAssignSubCategoryToCategory = function () {
       
        var params = {
            id: id
        };
        dataFactory.AssignSubCategoryToCategoryList(params).then(function (response) {
            var result = response.data;
            $scope.subCategoryToCategoryList = result.subCategoryToCategoryList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveSubCategoryToCategory = function () {
       

           
            
            if ($scope.ddlSubCategory == 0) {
                toaster.pop('error', "Error", 'Please Select SubCategory');
                return false;
            }
            if ($scope.ddlCategory == 0) {
                toaster.pop('error', "Error", 'Please Select Category');
                return false;
            }
        
        var params = {
            id: id,
            subCategoryID: $scope.ddlSubCategory,
            categoryID: $scope.ddlCategory,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)           
        };       
        dataFactory.SaveAssignSubCategoryToCategory(params).then(function (response) {
            $scope.clr();
            $scope.GetAssignSubCategoryToCategory();
            
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
            dataFactory.DeleteAssignSubCategoryToCategory(params).then(function (response) {
                $scope.GetAssignSubCategoryToCategory();
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
        dataFactory.AssignSubCategoryToCategoryList(params).then(function (response) {
            var result = response.data;
            var list = result.subCategoryToCategoryList;
            $scope.ddlSubCategory = list[0].subCategoryID;
            $scope.ddlCategory = list[0].categoryID;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.clr = function () {
        $scope.ddlSubCategory = 0;
        id = 0;
        $scope.ddlCategory = 0;
    };
    $scope.initControls();
    $scope.GetAssignSubCategoryToCategory();
});