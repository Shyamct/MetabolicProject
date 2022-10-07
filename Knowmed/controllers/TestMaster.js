app.controller('testMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var TestMasterId = 0; 


    $scope.sCategoryList = function () {
        dataFactory.SubCategoryList().then(function (response) {
            var result = response.data;
            $scope.SubCategoryList = result.subCategory;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }
    

    $scope.tMasterList = function () {
        dataFactory.TestMasterList().then(function (response) {
            var result = response.data;
            $scope.TestMasterList = result.testMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }


    $scope.SaveTestMaster = function () {
        if ($scope.txtTestName == undefined || $scope.txtTestName == "") {
            alert('Enter Test Name');
            return false;
        }
        if ($scope.ddlSubCategory == -1) {
            alert('Select Category');
            return false;
        }        
        var params = {
            id: TestMasterId,
            testName: $scope.txtTestName,
            subCategoryId: $scope.ddlSubCategory,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveTestMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = nutrientId > 0 ? 'UPDATE TEST MASTER' : 'SAVE TEST MASTER';
            $rootScope.activityLog(response, message, 'TEST  MASTER', '');

            $scope.tMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteTestMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteTestMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.tMasterList();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE TEST MASTER', 'TEST MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        TestMasterId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.TestMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.testMaster;
            $scope.txtTestName = list[0].name;
            $scope.ddlSubCategory = list[0].subCategoryID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        TestMasterId = 0;
        $scope.ddlSubCategory = -1;
        $scope.txtTestName = ""; 
    };
    $scope.tMasterList();
    $scope.sCategoryList();
});