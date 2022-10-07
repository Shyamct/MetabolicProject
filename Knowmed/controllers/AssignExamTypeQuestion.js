app.controller('assignExamTypeQuestionCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var examid = 0;

    $scope.initControls = function () {
        dataFactory.assignExamTypeQuestionInitControl().then(function (response) {
            var result = response.data;
            $scope.questionMasterList = result.questionMasterList;
            $scope.examMasterList = result.examMasterList;
            $scope.examTypeMasterList = result.examTypeMasterList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

   

    $scope.saveAssignExamTypeQuestion = function () {
        if ($scope.ddlExam == -1) {
            toaster.pop('error', "Error", 'Please Select Exam Type');
            return false;
        }
        if ($scope.ddlQuestion == -1) {
            toaster.pop('error', "Error", 'Please Select Question Type');
            return false;
        }

        var params = {
            id: examid,
            questionId: $scope.ddlQuestion,
            examTypeId: $scope.ddlExam,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveAssignExamTypeQuestion(params).then(function (response) {
            

            if (examid > 0) {
                $rootScope.activityLog(response, 'UPDATE ASSIGN EXAM TYPE QUESTION', 'ASSIGN EXAM TYPE QUESTION', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteAssignExamTypeQuestion = function (examid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: examid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteAssignExamTypeQuestion(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');

                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE ASSIGN EXAM TYPE QUESTION', 'ASSIGN EXAM TYPE QUESTION', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        examid = row;
        var params = {
            id: row
        };
        dataFactory.assignExamTypeQuestionInitControl(params).then(function (response) {
            var result = response.data.examTypeMasterList[0];
            $scope.ddlQuestion = result.questionId;
            $scope.ddlExam = result.examTypeId;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.ddlQuestion = -1;
        $scope.ddlExam = -1;
    };

    $scope.initControls();
});