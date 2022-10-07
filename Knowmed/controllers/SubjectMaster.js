app.controller('subjectMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var subjectid = 0;
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];

    $scope.initControls = function () {
        dataFactory.subjectMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.subjectMasterList = result.subjectMasterList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getSubjectFiles = function ($files) {
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

    $scope.saveSubjectMaster = function () {
        if (isEmpty($scope.txtsubjectName)) {
            toaster.pop('error', "Error", 'Please Enter Subject Name !!');
            return false;
        }

        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;
        }
        var params = {
            id: subjectid,
            subjectName: $scope.txtsubjectName,
            imagePath: pFile,
          userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveSubjectMaster(params).then(function (response) {
            var message = subjectid > 0 ? 'Update Subject Master' : 'Save Subject Master';
            $rootScope.activityLog(response, message, 'Subject Master', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteSubjectMaster = function (subjectid) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: subjectid,
              userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteSubjectMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Subject Master', 'Subject Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        subjectid = row.id;
        var params = {
            id: row.id
        };
        dataFactory.subjectMasterInitControl(params).then(function (response) {
            var result = response.data.subjectMasterList[0];
            $scope.txtsubjectName = result.subjectName;
            $scope.addedPFileList = result.imagePath;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.txtsubjectName = '';
        $scope.addedPFileList = [];
        addedPFiles = [];
        pFile = '';

        $('#fileFoodFamily').val('');
        subjectid = 0;
    };

    $scope.initControls();
});