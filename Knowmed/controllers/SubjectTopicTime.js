app.controller('subjectTopicTimeCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var topicid = 0;

    $scope.initControls = function () {
        dataFactory.subjectTopicTimeInitControl().then(function (response) {
            var result = response.data;
            $scope.subjectList = result.subjectList;
            $scope.topicList = result.topicList;
            $scope.subjectTimeList = result.subjectTimeList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveSubjectTopicTime = function () {

        if ($scope.ddlSubject == -1) {
            toaster.pop('error', "Error", 'Please Select Subject Name');
            return false;
        }
        if ($scope.ddlTopic == -1) {
            toaster.pop('error', "Error", 'Please Select Topic Name');
            return false;
        }

        var params = {
            id: topicid,
            subjectId: $scope.ddlSubject,
            topicId: $scope.ddlTopic,
            durationInMinutes: $scope.txtDuration,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveSubjectTopicTime(params).then(function (response) {
            if (topicid > 0) {
                $rootScope.activityLog(response, 'UPDATE Subject Topic Time', 'Subject Topic Time', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteSubjectTopicTime = function (topicid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: topicid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteSubjectTopicTime(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Subject Topic Time', 'Subject Topic Time', '');
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
        dataFactory.subjectTopicTimeInitControl(params).then(function (response) {
            var result = response.data.subjectTimeList[0];
            $scope.ddlSubject = result.subjectId;
            $scope.ddlTopic = result.topicId;
            $scope.txtDuration = result.durationInMinutes; 

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlSubject = -1;
        $scope.ddlTopic = -1;
        $scope.txtDuration = "";
        topicid = 0;
    };

    $scope.initControls();
});