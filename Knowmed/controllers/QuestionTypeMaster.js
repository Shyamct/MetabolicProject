app.controller('questionTypeMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var questionTypeid = 0;

    $scope.initControls = function () {
        dataFactory.questionTypeMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.questionTypeList = result.questionTypeList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

   

    $scope.saveQuestionTypeMaster = function () {
        if (isEmpty($scope.txtquestionType)) {
            toaster.pop('error', "Error", 'Please Enter Question Type !!');
            return false;
        }

        var params = {
            id: questionTypeid,
            questionType: $scope.txtquestionType,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveQuestionTypeMaster(params).then(function (response) {
            var message = questionTypeid > 0 ? 'Update Question Type Master' : 'Save Question Type Master';
            $rootScope.activityLog(response, message, 'Question Type Master', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteQuestionTypeMaster = function (questionTypeid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: questionTypeid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteQuestionTypeMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Question Type Master', 'Question Type Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        questionTypeid = row.id;
        var params = {
            id: row.id
        };
        dataFactory.questionTypeMasterInitControl(params).then(function (response) {
            var result = response.data.questionTypeList[0];
            $scope.txtquestionType = result.questionType;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.txtquestionType = '';
        questionTypeid = 0;
    };

    $scope.initControls();
});