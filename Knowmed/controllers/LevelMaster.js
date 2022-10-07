app.controller('levelMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var levelid = 0;

    $scope.initControls = function () {
        dataFactory.levelMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.levelMasterList = result.levelMasterList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    
    $scope.saveLevelMaster = function () {
        if (isEmpty($scope.txtlevelName)) {
            toaster.pop('error', "Error", 'Please Enter Level Name !!');
            return false;
        }
        var params = {
            id: levelid,
            levelName: $scope.txtlevelName,
           userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveLevelMaster(params).then(function (response) {
            var message = levelid > 0 ? 'UPDATE Level Master ' : 'SAVE Level Master ';
            $rootScope.activityLog(response, message, 'Level Master ', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteLevelMaster = function (levelid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: levelid,
                 userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteLevelMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Level Master', 'Level Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        levelid = row.id;
        var params = {
            id: row.id
        };
        dataFactory.levelMasterInitControl(params).then(function (response) {
            var result = response.data.levelMasterList[0];
            $scope.txtlevelName = result.levelName;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.txtlevelName = '';
        levelid = 0;
    };

    $scope.initControls();
});