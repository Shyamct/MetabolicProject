app.controller('addQuestionMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var imageArr = [];
    var audioArr = [];
    var videoArr = [];
    $scope.addedList = [];

    $scope.initControls = function () {
        dataFactory.addQuestionMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.subjectList = result.subjectList;
            $scope.topicList = result.topicList;
            $scope.levelList = result.levelList;
            $scope.questionTypeList = result.questionTypeList;
            $scope.examTypeList = result.examTypeList;
            $scope.tableList = result.tableList;
            if (result.tableList && result.tableList.length > 0) {
                for (var i = 0; i < result.tableList.length; i++) {
                    $scope.tableList[i].options = JSON.parse(result.tableList[i].options);
                }
            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    

    $scope.save = function () {
        if ($scope.ddlSubject === 0) {
            toaster.pop('error', "Error", 'Select Subject !!');
            return;
        }

        //if ($scope.ddltopic === 0) {
        //    toaster.pop('error', "error", 'select topic !!');
        //    return;
        //}
        //if ($scope.ddlLevel === 0) {
        //    toaster.pop('error', "Error", 'Select Level !!');
        //    return;
        //}

        //if ($scope.ddlQuestion === 0) {
        //    toaster.pop('error', "Error", 'Select Question Type !!');
        //    return;
        //}

        if ($scope.txtQuestion === "" || $scope.txtQuestion === null || $scope.txtQuestion === undefined) {
            toaster.pop('error', "Error", 'Enter Question !!');
            return;
        }

        var arr = [];
        var control = "";
        var i = 0;
        var image = '';
        var check = 0;
        var isExists = 0;
        if ($scope.ddlQuestion === "1") {
            for (i = 0; i < $scope.ddlType; i++) {
                control = '#txtOption' + i;
                if ($(control).summernote('code') === undefined || $(control).summernote('code') === "" || $(control).summernote('code') === null || $(control).summernote('code') === "<p><br></p>") {
                    toaster.pop('error', "Error", 'Fill All Options Text Box');
                    return;
                }
                if ($('#checkBox' + i).prop('checked') === true) {
                    check = 1;
                    isExists = 1;
                }
                else {
                    check = 0;
                }
                arr.push({
                    optionName: $(control).summernote('code'),
                    isCorrect: check
                });
            }
        }

        if ($scope.ddlQuestion === "2") {
            if (imageArr.length != $('#ddlType').val()) {
                toaster.pop('error', "Error", 'Select All Images');
                return;
            }
            for (i = 0; i < imageArr.length; i++) {
                if ($('#checkBox' + i).prop('checked') === true) {
                    check = 1;
                    isExists = 1;
                }
                else {
                    check = 0;
                }
                arr.push({
                    optionFilePath: imageArr[i].imageName,
                    isCorrect: check
                });
            }
        }
        if ($scope.ddlQuestion === "3") {
            if (imageArr.length != $scope.ddlType) {
                toaster.pop('error', "Error", 'Select All Images');
                return;
            }
            for (i = 0; i < imageArr.length; i++) {
                control = '#txtOption' + i;
                if ($('#checkBox' + i).prop('checked') === true) {
                    check = 1;
                    isExists = 1;
                }
                else {
                    check = 0;
                }
                arr.push({
                    optionName: $(control).val(),
                    optionFilePath: imageArr[i].imageName,
                    isCorrect: check
                });
            }
        }

        if ($scope.ddlQuestion === "4") {
            if (audioArr.length != $scope.ddlType) {
                toaster.pop('error', "Error", 'Select All Audios');
                return;
            }
            for (i = 0; i < audioArr.length; i++) {
                control = '#txtOption' + i;
                if ($('#checkBox' + i).prop('checked') === true) {
                    check = 1;
                    isExists = 1;
                }
                else {
                    check = 0;
                }
                arr.push({
                    optionName: $(control).val(),
                    optionFilePath: audioArr[i].audioName,
                    isCorrect: check
                });
            }
        }

        if ($scope.ddlQuestion === "5") {
            if (videoArr.length !== $scope.ddlType) {
                toaster.pop('error', "Error", 'Select All Videos');
                return;
            }
            for (i = 0; i < videoArr.length; i++) {
                control = '#txtOption' + i;
                if ($('#checkBox' + i).prop('checked') === true) {
                    check = 1;
                    isExists = 1;
                }
                else {
                    check = 0;
                }
                arr.push({
                    optionName: $(control).val(),
                    optionFilePath: audioArr[i].videoName,
                    isCorrect: check
                });
            }
        }

        if (isExists === 0) {
            toaster.pop('error', "Error", 'Select Correct Answer !!');
            return;
        }
        //if ($scope.addedList !== undefined) {
        //    if ($scope.addedList[0].filePath !== undefined) {
        //        image = $scope.addedList[0].filePath;
        //    }

        //}
        if ($scope.addedList.length > 0) {
            image = $scope.addedList[0].filePath;
        }
        var obj = {
            subjectId: $scope.ddlSubject,
            topicId: $scope.ddlTopic,
            levelId: $scope.ddlLevel,
            questionTypeId: $scope.ddlQuestion,
            question: $scope.txtQuestion,
            description: $scope.txtDescription,
            questionImagePath: image,
            examTypeId: $scope.ddlExam,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid),
            dtJsonString: JSON.stringify(arr)
        };
        dataFactory.saveQuestionMaster(obj).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clear();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clear = function () {
        //$scope.ddlExam = 0;
        //$scope.ddlSubject = 0;
        //$scope.ddlTopic = 0;
        //$scope.ddlLevel = 0;
        //$scope.ddlQuestion = 0;
        //$scope.txtQuestion = '';
        //$scope.txtDescription = '';
        //imageArr = [];
        //audioArr = [];
        //videoArr = [];
        //$scope.addedList = [];
        $('#fileTopic').val('');
    };


    $scope.changeRadio = function (index) {
        for (var i = 0; i < $scope.ddlType; i++) {
            if (i !== index) {
                $('#checkBox' + i).prop('checked', false);
            }
        }
    };

    $scope.createControl = function () {
        var arr = [];
        for (var i = 0; i < $scope.ddlType; i++) {
            arr.push(
                {
                    id: i,
                    textBox: 'txtOption' + i,
                    imageViewer: 'img' + i,
                    fileUpload: 'fu' + i,
                    audio: 'audio' + i,
                    video: 'video' + i,
                    checkBox: 'checkBox' + i
                }
            );
        }
        $scope.textList = arr;
    };

    $scope.uploadAndShowImage = function ($files, index) {
        var addedPFiles = [];
        var j = 0;
        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;
            for (var i = 0; i < result.length; i++) {
                if (i == (result.length - 1)) {
                    addedPFiles.push({
                        filePath: result[i]
                    });
                }
            }
            $scope.addedPFileList = addedPFiles;
            if ($scope.ddlQuestion === "2" || $scope.ddlQuestion === "3") {
                if (imageArr.length > 0) {
                    for (j = 0; j < imageArr.length; j++) {
                        if (imageArr[j].index === index) {
                            imageArr.splice(imageArr[j].index, 1);
                        }
                    }
                }
                imageArr.push({
                    index: index,
                    imageName: $scope.addedPFileList[0].filePath
                });
                $("#img" + index).attr('src', "http://192.168.8.2:105/fileUpload/" + $scope.addedPFileList[0].filePath);
            }
            else if ($scope.ddlQuestion === "4") {
                log($scope.addedPFileList);
                if (audioArr.length > 0) {
                    for (j = 0; j < audioArr.length; j++) {
                        if (audioArr[j].index === index) {
                            audioArr.splice(audioArr[j].index, 1);
                        }
                    }
                }
                audioArr.push({
                    index: index,
                    audioName: $scope.addedPFileList[0].filePath
                });
                log("http://192.168.8.2:105/fileUpload/" + $scope.addedPFileList[0].filePath);
                $("#audio" + index).attr('src', "http://192.168.8.2:105/fileUpload/" + $scope.addedPFileList[0].filePath);
            }

            else if ($scope.ddlQuestion === "5") {
                log($scope.addedPFileList);
                if (videoArr.length > 0) {
                    for (j = 0; j < audioArr.length; j++) {
                        if (videoArr[j].index === index) {
                            videoArr.splice(videoArr[j].index, 1);
                        }
                    }
                }
                videoArr.push({
                    index: index,
                    videoName: $scope.addedPFileList[0].filePath
                });
                log("http://192.168.8.2:105/fileUpload/" + $scope.addedPFileList[0].filePath);
                $("#video" + index).attr('src', "http://192.168.8.2:105/fileUpload/" + $scope.addedPFileList[0].filePath);
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.uploadImage = function ($files, index) {
        var addedPFiles = [];
        var j = 0;
        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;
            for (var i = 0; i < result.length; i++) {
                if (i == (result.length - 1)) {
                    addedPFiles.push({
                        filePath: result[i]
                    });
                }
            }
            $scope.addedList = addedPFiles;
            addedPFiles = [];
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.deleteAddQuestionMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteAddQuestionMaster(params).then(function (response) {
                $scope.clear();
                $scope.initControls();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.initControls();
});
