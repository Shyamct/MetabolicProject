app.controller('assignSubTestCtrl', function ($scope, dataFactory, toaster) {
    var AssignSubTestId = 0;
    $scope.tMasterList = function () {
        dataFactory.TestMasterList().then(function (response) {
            var result = response.data;
            $scope.TestMasterList = result.testMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }

    $scope.stMasterList = function () {
        dataFactory.SubTestMasterList().then(function (response) {
            var result = response.data;
            $scope.SubTestMasterList = result.subTestMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }

    $scope.astMasterList = function () {
        dataFactory.AssignSubTestList().then(function (response) {
            var result = response.data;
            $scope.AssignSubTestList = result.assignSubTest;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }


    $scope.SaveAssignSubTest = function () {
        if ($scope.ddlTest == -1) {
            toaster.pop('error', "Error", 'Select Test');
            return false;
        }
        if ($scope.ddlSubTest == -1) {
            toaster.pop('error', "Error", 'Select Sub Test');
            return false;
        }
        var params = {
            id: AssignSubTestId,
            testId: $scope.ddlTest,
            subTestId: $scope.ddlSubTest,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveAssignSubTest(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.astMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteAssignSubTest = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteAssignSubTest(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.astMasterList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        AssignSubTestId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.AssignSubTestList(params).then(function (response) {
            var result = response.data;
            var list = result.assignSubTest;
            $scope.ddlTest = list[0].testID;
            $scope.ddlSubTest = list[0].subTestID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        AssignSubTestId = 0;
        $scope.ddlTest = -1;
        $scope.ddlSubTest = -1;
    };
    $scope.astMasterList();
    $scope.tMasterList();
    $scope.stMasterList();
});