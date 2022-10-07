app.controller('problemCauseMiscellaneousCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existID = 0;

    $scope.getProblemCauseMiscellaneous = function () {
        var params = {
            id: existID
        };
        dataFactory.problemCauseMiscellaneous(params).then(function (response) {
            var result = response.data;
            $scope.problemCauseMiscellaneousList = result.problemCauseMiscellaneous;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.save = function () {
        if (isEmpty($scope.txtCauseName)) {
            toaster.pop('error', 'Please Enter Cause Name');
            return false;
        }
        var params = {
            id: existID,
            causeName: $scope.txtCauseName,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.saveProblemCauseMiscellaneous(params).then(function (response) {
            var message = existID > 0 ? 'Update Problem Cause Miscellaneous' : 'Save Problem Cause Miscellaneous';
            $rootScope.activityLog(response, message, 'Problem Cause Miscellaneous', '');

            $scope.getProblemCauseMiscellaneous();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        existID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.problemCauseMiscellaneous(params).then(function (response) {
            var result = response.data;
            var list = result.problemCauseMiscellaneous;
            $scope.txtCauseName = list[0].causeName;
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

            dataFactory.deleteProblemCauseMiscellaneous(params).then(function (response) {
                $scope.getProblemCauseMiscellaneous();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Problem Cause Miscellaneous', ' Problem Cause Miscellaneous', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }

    };
    $scope.clr = function () {
        $scope.txtCauseName = '';
        existID = 0;
    };

    $scope.getProblemCauseMiscellaneous();
});