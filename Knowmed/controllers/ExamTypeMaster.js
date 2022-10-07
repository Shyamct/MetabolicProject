app.controller('examTypeMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var examid = 0;

    $scope.initControls = function () {
        dataFactory.examTypeMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.examTypeMasterList = result.examTypeMasterList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.saveExamTypeMaster = function () {
        if (isEmpty($scope.txtExamType)) {
            toaster.pop('error', "Error", 'Please Enter Exam Name !!');
            return false;
        }
        var params = {
            id: examid,
            examType: $scope.txtExamType,
            timeDuration: $scope.txtDuration,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveExamTypeMaster(params).then(function (response) {
            if (examid > 0) {
                $rootScope.activityLog(response, 'UPDATE EXAM TYPE MASTER', 'EXAM TYPE MASTER', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteExamTypeMaster = function (examid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: examid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteExamTypeMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Exam Type Master', 'Exam Type Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        examid = row.id;
        var params = {
            id: row.id
        };
        dataFactory.examTypeMasterInitControl(params).then(function (response) {
            var result = response.data.examTypeMasterList[0];
            $scope.txtExamType = result.examType;
            $scope.txtDuration = result.timeDuration;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.txtExamType = '';
        $scope.txtDuration = '';
        examid = 0;
    };

    $scope.initControls();
});