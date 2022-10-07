app.controller('categoryMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var categoryid = 0;
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];

    $scope.initControls = function () {
        dataFactory.categoryMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.categoryMasterList = result.categoryMasterList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getCategoryFiles = function ($files) {
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

    $scope.saveCategoryMaster = function () {
        if (isEmpty($scope.txtcategoryName)) {
            toaster.pop('error', "Error", 'Please Enter Category Name !!');
            return false;
        }

        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;
        }
        var params = {
            id: categoryid,
            categoryName: $scope.txtcategoryName,
            imagePath: pFile,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveCategoryMaster(params).then(function (response) {
            if (categoryid > 0) {
                $rootScope.activityLog(response, 'UPDATE CATEGORY MASTER', 'CATEGORY MASTER', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteCategoryMaster = function (categoryid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: categoryid,
                 userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteCategoryMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE CATEGORY MASTER', 'CATEGORY MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        categoryid = row.id;
        var params = {
            id: row.id
        };
        dataFactory.categoryMasterInitControl(params).then(function (response) {
            var result = response.data.categoryMasterList[0];
            $scope.txtcategoryName = result.categoryName;
            $scope.addedPFileList = result.imagePath;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.txtcategoryName = '';
        $scope.addedPFileList = [];
        addedPFiles = [];
        pFile = '';

        $('#fileFoodFamily').val('');
        categoryid = 0;
    };

    $scope.initControls();
});