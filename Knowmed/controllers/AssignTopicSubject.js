app.controller('assignTopicSubjectCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var topicid = 0;
   
    $scope.initControls = function () {
        dataFactory.assignTopicSubjectInitControl().then(function (response) {
            var result = response.data;
            $scope.subjectList = result.subjectList;
            $scope.categoryList = result.categoryList;
            $scope.topicList = result.topicList;
            $scope.allTopicList = result.allTopicList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveAssignTopicSubject = function () {

        if ($scope.ddlSubject == -1) {
            toaster.pop('error', "Error", 'Please Select Subject Name');
            return false;
        }
        if ($scope.categoryId == -1) {
            toaster.pop('error', "Error", 'Please Select Category Name');
            return false;
        }

        var params = {
            id: topicid,
            subjectId: $scope.ddlSubject,
            categoryId: $scope.ddlCategory,
            topicId: $scope.ddlTopic,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveAssignTopicSubject(params).then(function (response) {
            if (topicid > 0) {
                $rootScope.activityLog(response, 'UPDATE ASSIGN TOPIC SUBJECT', 'ASSIGN TOPIC SUBJECT', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteAssignTopicSubject = function (topicid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: topicid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteAssignTopicSubject(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE ASSIGN TOPIC SUBJECT', 'ASSIGN TOPIC SUBJECT', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        topicid = row;
        var params = {
            id: row
        };
        dataFactory.assignTopicSubjectInitControl(params).then(function (response) {
            console.log(response.data);
            var result = response.data.allTopicList[0];
            $scope.ddlSubject = result.subjectId;
            $scope.ddlCategory = result.categoryId;
            $scope.ddlTopic = result.topicId;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlSubject = -1;
        $scope.ddlCategory = -1;
        $scope.ddlTopic = -1;
        topicid = 0;
    };

    $scope.initControls();
});