app.controller('topicMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var topicid = 0;
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];

    $scope.initControls = function () {
        dataFactory.topicMasterInitControl().then(function (response) {
            var result = response.data;
            //$scope.subjectList = result.subjectList;
            //$scope.categoryList = result.categoryList;
            $scope.topicMasterList = result.topicMasterList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getTopicFiles = function ($files) {
        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);

        });
        $scope.addNewsFiles();
    };
    $scope.addNewsFiles = function () {
        addedPFiles = [];
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;

            log(result);
            for (var i = 0; i < result.length; i++) {
                if (i == (result.length - 1)) {
                    addedPFiles.push({
                        filePath: result[i]
                    });
                }
            }

            $scope.addedPFileList = addedPFiles;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveTopicMaster = function () {

        if (isEmpty($scope.txttopicName)) {
            toaster.pop('error', "Error", 'Please Enter Topic Name !!');
            return false;
        }

        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;
        }
        var params = {
            id: topicid,
            //subjectId: $scope.ddlSubject,
            //categoryId: $scope.ddlCategory,
            topicName: $scope.txttopicName,
            imagePath: pFile,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveTopicMaster(params).then(function (response) {
            var message = topicid > 0 ? 'Update Topic Master' : 'Save Topic Master';
            $rootScope.activityLog(response, message, 'Topic Master', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteTopicMaster = function (topicid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: topicid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteTopicMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Topic Master', 'Topic Master', '');
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
        dataFactory.topicMasterInitControl(params).then(function (response) {
            console.log(response.data);
            var result = response.data.topicMasterList[0];
            console.log(result);
            console.log(row);
            $scope.ddlSubject = result.subjectId;
            $scope.ddlCategory = result.categoryId;
            $scope.txttopicName = result.topicName;
            $scope.addedPFileList = result.topicName;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlSubject = '';
        $scope.ddlCategory = '';
        $scope.txttopicName = '';
        $scope.addedPFileList = [];
        addedPFiles = [];
        pFile = '';

        $('#fileFoodFamily').val('');
        topicid = 0;
    };

    $scope.initControls();
});