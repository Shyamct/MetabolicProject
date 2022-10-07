app.controller('assignVideoTopicCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var videoId = 0;

    $scope.initControls = function () {
        dataFactory.assignVideoInitControl().then(function (response) {
            var result = response.data;
            $scope.subjectList = result.subjectList;
            $scope.topicList = result.topicList;
            $scope.videoList = result.videoList;
            $scope.videoTopicList = result.videoTopicList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveAssignVideo = function () {

        if ($scope.ddlSubject == -1) {
            toaster.pop('error', "Error", 'Please Select Subject Name');
            return false;
        }
        if ($scope.ddlTopic == -1) {
            toaster.pop('error', "Error", 'Please Select Topic Name');
            return false;
        }
        if ($scope.ddlVideo == -1) {
            toaster.pop('error', "Error", 'Please Select Video Name');
            return false;
        }

        var params = {
            id: videoId,
            subjectId: $scope.ddlSubject,
            topicId: $scope.ddlTopic,
            videoId: $scope.ddlVideo,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveAssignVideo(params).then(function (response) {
            if (videoId > 0) {
                $rootScope.activityLog(response, 'UPDATE ASSIGN VIDEO', 'ASSIGN VIDEO', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteAssignVideo = function (videoId) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: videoId,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteAssignVideoTopic(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE ASSIGN VIDEO', 'ASSIGN VIDEO', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        videoId = row;
        var params = {
            id: row
        };
        dataFactory.assignVideoInitControl(params).then(function (response) {
            console.log(response.data);
            var result = response.data.videoTopicList[0];
            $scope.ddlSubject = result.subjectId;
            $scope.ddlTopic = result.topicId;
            $scope.ddlVideo = result.videoId;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlSubject = -1;
        $scope.ddlTopic = -1;
        $scope.ddlVideo = -1;
        videoId = 0;
    };

    $scope.initControls();
});