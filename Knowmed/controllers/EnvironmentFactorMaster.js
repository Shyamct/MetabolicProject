app.controller('environmentFactorMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var EnvironmentFactorMasterId = 0;

    $scope.EnvironmentFactorList = function () {
        dataFactory.EnvironmentFactorMasterList().then(function (response) {
            var result = response.data;
            $scope.EnvironmentFactorMasterList = result.environmentFactorMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveEnvironmentFactorMaster = function () {
        if ($scope.txtEnvironmentFactor == undefined || $scope.txtEnvironmentFactor == "") {
            alert('Enter Environment Factor');
            return false;
        }
        var params = {
            id: EnvironmentFactorMasterId,
            enviorenmentFactor: $scope.txtEnvironmentFactor,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveEnvironmentFactorMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');

            var message = EnvironmentFactorMasterId > 0 ? 'UPDATE ENVIRONMENT FACTOR MASTER' : 'SAVE ENVIRONMENT FACTOR MASTER';
            $rootScope.activityLog(response, message, 'ENVIRONMENT FACTOR MASTER', '');

            $scope.EnvironmentFactorList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteEnvironmentFactorMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteEnvironmentFactorMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.EnvironmentFactorList();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE ENVIRONMENT FACTOR MASTER', 'ENVIRONMENT FACTOR MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        EnvironmentFactorMasterId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.EnvironmentFactorMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.environmentFactorMaster;
            $scope.txtEnvironmentFactor = list[0].enviorenmentFactor;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        EnvironmentFactorMasterId = 0;
        $scope.txtEnvironmentFactor = "";
        $scope.txtRemark = "";
    };
    $scope.EnvironmentFactorList();
});