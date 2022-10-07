app.controller('assignSubTestMethodCtrl', function ($scope, dataFactory, toaster) {
    var AssignSubTestMethodId = 0;

    $scope.mMasterList = function () {
        dataFactory.MethodMasterList().then(function (response) {
            var result = response.data;
            $scope.MethodMasterList = result.methodMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.stMasterList = function () {
        dataFactory.SubTestMasterList().then(function (response) {
            var result = response.data;
            $scope.SubTestMasterList = result.subTestMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.astmMasterList = function () {
        dataFactory.AssignSubTestMethodList().then(function (response) {
            var result = response.data;
            $scope.AssignSubTestMethodList = result.assignSubtestMethod;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveAssignSubTestMethod = function () {        
        if ($scope.ddlSubTest == -1) {
            toaster.pop('error', "Error", 'Select Sub Test');
            return false;
        }
        if ($scope.ddlMethod == -1) {
            toaster.pop('error', "Error", 'Select Method');
            return false;
        }
        var params = {
            id: AssignSubTestMethodId,
            methodId: $scope.ddlMethod,
            subTestId: $scope.ddlSubTest,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveAssignSubTestMethod(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.astmMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteAssignSubTestMethod = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteAssignSubTestMethod(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.astmMasterList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        AssignSubTestMethodId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.AssignSubTestMethodList(params).then(function (response) {
            var result = response.data;
            var list = result.assignSubtestMethod;
            $scope.ddlMethod = list[0].methodID;
            $scope.ddlSubTest = list[0].subTestID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        AssignSubTestMethodId = 0;
        $scope.ddlMethod = -1;
        $scope.ddlSubTest = -1;
    };
    $scope.astmMasterList();
    $scope.mMasterList();
    $scope.stMasterList();
});