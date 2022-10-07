app.controller('diseaseImagesUploadCtrl', function ($scope, dataFactory, toaster, $state, $rootScope) {


    var diseaseID = 0;
    var formdata = new FormData();
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];



    $scope.initControls = function () {
        dataFactory.diseaseImagesUploadInitControl().then(function (response) {
            var result = response.data;
            $scope.headingList = result.headingList;
            $scope.diseaseList = result.diseaseList;
            $scope.getDiseaseImagesUpload();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getDiseaseImagesUpload = function () {
        var params = {
            id: diseaseID
        };
        dataFactory.diseaseImagesUpload(params).then(function (response) {
            var result = response.data;
            $scope.diseaseImageList = result.diseaseImageList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getDiseaseImagesFiles = function ($files) {
        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);

        });
        $scope.addDiseaseImagesFiles(formdata);
    };
    $scope.addDiseaseImagesFiles = function (formdata) {
        addedPFiles = [];       
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

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveDiseaseImagesUpload = function () {

        if ($scope.ddldisease == -1) {
            toaster.pop('error', "error", 'Please Select Disease !!');
            return false;
        }
        log($scope.addedPFileList);
        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;
        }
        log(pFile);
        //log(fileDesc);
        //log(addedPFiles);        
        //log($scope.addedPFileList);

        var params = {
            id: diseaseID,
            problemReferenceID: $scope.ddlDisease,
            headingID: $scope.ddlHeading,
            remark: $scope.txtRemark,
            imagePath: pFile,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveDiseaseImagesUpload(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');

            //var message = diseaseID > 0 ? 'UPDATE DISEASE IMAGES' : 'SAVE DISEASE IMAGES';
            //$rootScope.activityLog(response, message, 'DISEASE IMAGES', '');

            $scope.clr();
            $scope.getDiseaseImagesUpload();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteDiseaseImagesUpload = function (diseaseImageID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: diseaseImageID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteDiseaseImagesUpload(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getDiseaseImagesUpload();
               // $rootScope.activityLog(response, 'DELETE DISEASE IMAGES', 'DISEASE IMAGES', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        diseaseID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.diseaseImagesUpload(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseImageList;
            $scope.ddlDisease = list[0].problemReferenceID;
            $scope.ddlHeading = list[0].headingID;
            $scope.txtRemark = list[0].remark;
            $scope.addedPFileList = list[0].imagePath;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.ddlDisease = -1;
        $scope.ddlHeading = -1;
        $scope.txtRemark = '';
        $scope.addedPFileList = [];
        //fileDesc = [];
        addedPFiles = [];
        pFile = '';
       
        $('#fileDiseaseImage').val('');
        diseaseID = 0;
    };

    $scope.initControls();
    //$scope.getDiseaseImagesUpload();

});