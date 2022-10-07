app.controller('videoMasterCtrl', function ($scope, dataFactory, $rootScope, toaster, $http) {

    var videoid = 0;
    var formdata = new FormData();
    var pFile = '';
    //var addedPFiles = [];
    $scope.files = [];
    $scope.timeStamp = '';
    $scope.progressVisible = false;
    $scope.addedAssignList = [];
    $scope.videoList = [];
    var arr = [];

    var piFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];

    $scope.initControls = function () {
        dataFactory.videoMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.videoList = result.videoList;
            for (var j = 0; j < result.videoList.length; j++) {
                $scope.videoList[j].transcriptDetails = JSON.parse(result.videoList[j].transcriptDetails);
            }
            $scope.videoList = result.videoList;
            log($scope.videoList);
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.AddAssign = function () {       
       // $scope.addedAssignList = [];
        log(arr);
        arr.push({
            description: $scope.txtdescription,
            startTime: $scope.time
        });
        $scope.addedAssignList = arr;
        log($scope.addedAssignList);
    };
    $scope.deleteAddedAssignList = function (index) {
        $scope.addedAssignList.splice(index, 1);
    };


    $scope.getVideo = function ($files) {
        $scope.timeStamp = new Date().getTime();
       
        for (var i = 0; i < $files.length; i++) {
            $scope.files.push($files[i])
        }
        log($scope.files);
        var fd = new FormData();
        for (var i in $scope.files) {
            fd.append("uploadedFile", $scope.files[i])
        }
        var xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", uploadProgress, false)
        xhr.addEventListener("load", uploadComplete, false)
        xhr.addEventListener("error", uploadFailed, false)
        xhr.addEventListener("abort", uploadCanceled, false)
        xhr.open("POST", 'FileUploadHandler.ashx?timestamp=' + $scope.timeStamp);
        $scope.progressVisible = true;
        xhr.send(fd);
    };
    

    function uploadProgress(evt) {
        $scope.$apply(function () {
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        })
    }

    function uploadComplete(evt) {
        /* This event is raised when the server send back a response */
        log('CCC');
    }

    function uploadFailed(evt) {
        alert("There was an error attempting to upload the file.")
    }

    function uploadCanceled(evt) {
        scope.$apply(function () {
            $scope.progressVisible = false
        })
        alert("The upload has been canceled by the user or the browser dropped the connection.")
    }

    $scope.getImageFiles = function ($files) {
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


    $scope.saveVideoMaster = function () {
        if (isEmpty($scope.txtVideoTitle)) {
            toaster.pop('error', "Error", 'Please Enter Video Title !!');
            return false;
        }
        for (var i = 0; i < $scope.files.length; i++) {
            pFile = $scope.timeStamp + '_' + $scope.files[0].name;
        }
        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            piFile = $scope.addedPFileList[0].filePath;
        }
        //log(pFile);
        var params = {
            id: videoid,
            videoTitle: $scope.txtVideoTitle,
            thumbnailPath: piFile,
            videoPath: pFile,
            dtTranscriptList: JSON.stringify($scope.addedAssignList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveVideoMaster(params).then(function (response) {
            var message = videoid > 0 ? 'Update Video Master' : 'Save Video Master';
            $rootScope.activityLog(response, message, 'Video Master', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };


    $scope.edit = function (row) {        
        videoid = row;
        var params = {
            id: row
        };
        dataFactory.videoMasterInitControl(params).then(function (response) {
            $scope.addedAssignList = [];
            arr = [];
            var result = response.data.videoList[0];
            $scope.txtVideoTitle = result.videoTitle;
            $scope.addedPFileList = result.thumbnailPath;
            $scope.addedAssignList = JSON.parse(result.transcriptDetails);
            for (var i = 0; i < $scope.addedAssignList.length; i++) {
                arr.push({
                    description: $scope.addedAssignList[i].description,
                    startTime: $scope.addedAssignList[i].startTime
                })
            }
            log(arr);
            //$scope.addedPFileList = result.videoPath;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.deleteVideoMaster = function (videoid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: videoid,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteVideoMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Video Master', 'Video Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.deleteAssignVideo = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteAssignVideo(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Video Master', 'Video Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {
        $scope.txtdescription = '';
        $scope.time = '';
        $scope.txtVideoTitle = '';

        //$scope.addedPFileList = [];
        $scope.progressVisible = false
        $scope.files = [];
        pFile = '';
        $scope.addedAssignList = [];
        arr = [];
        $('#fileVideo').val('');
        videoid = 0;
        $scope.addedPFileList = [];
        addedPFiles = [];
        piFile = '';
    };



   
    $scope.initControls();

});