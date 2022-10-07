app.controller('assignSubTestResultTypeCtrl', function ($scope, dataFactory, toaster) {
    var AssignSubTestResultTypeId = 0;

    $scope.rPropertyList = function () {
        var params = {
        };
        dataFactory.ResultPropertyList(params).then(function (response) {
            var result = response.data;
            $scope.ResultPropertyList = result.resultPropertyList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.stMasterList = function () {
        var params = {           
        };
        dataFactory.SubTestMasterList(params).then(function (response) {
            var result = response.data;
            $scope.SubTestMasterList = result.subTestMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.astResultTypeList = function () {
        dataFactory.AssignSubtestResultTypeList().then(function (response) {
            var result = response.data;
            $scope.AssignSubTestResultTypeList = result.assignSubtestResultType;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.SaveAssignSubTestResultType = function () {        
        if ($scope.ddlSubTest == -1) {
            toaster.pop('error', "Error", 'Select Sub Test');
            return false;
        }
        if ($scope.ddlProperty == -1) {
            toaster.pop('error', "Error", 'Select Property');
            return false;
        }
        var params = {
            id: AssignSubTestResultTypeId,
            resultPropertyId: $scope.ddlProperty,
            subTestId: $scope.ddlSubTest,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveAssignSubtestResultType(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.astResultTypeList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteAssignSubtestResultType = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteAssignSubtestResultType(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.astResultTypeList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        AssignSubTestResultTypeId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.AssignSubtestResultTypeList(params).then(function (response) {
            var result = response.data;
            var list = result.assignSubtestResultType;
            $scope.ddlProperty = list[0].resultPropertyID;
            $scope.ddlSubTest = list[0].subTestID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        AssignSubTestResultTypeId = 0;
        $scope.ddlProperty = -1;
        $scope.ddlSubTest = -1;
    };
    $scope.astResultTypeList();
    $scope.rPropertyList();
    $scope.stMasterList();
});