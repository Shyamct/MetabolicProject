app.controller('impressionMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var pkId = 0;
    var arr = [];
    var testId = 0;
    var imageID = 0;



    $scope.addedImpressImageList = [];


    $scope.AddImpresImage = function () {

        //if ($scope.ddlMolecular == -1 && mainID == 0) {
        //    toaster.pop('error', "Error", 'Please Select Molecular Name');
        //    return false;
        //}
        
        arr.push({
            imagePath: $("#fileImage").val(),
            description: $scope.txtImgDescription,

        });
        $scope.addedImpressImageList = arr;
        log($scope.addedImpressImageList);
    };
    $scope.deleteImpressImageList = function (index) {
        $scope.addedImpressImageList.splice(index, 1);
    };
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
    $scope.intControl = function () {
        dataFactory.InitControlImpression().then(function (response) {
            var result = response.data;
            console.log(result);
            $scope.impressionTestList = result.impressionTestList;
            //$scope.btnAdd = false;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveImpression = function () {
        if (isEmpty($scope.ddlTest)) {
            toaster.pop('error', "Error", 'Please Select Test Name !!');
            return false;
        }

        //for (var i = 0; i < $scope.addedPFileList.length; i++) {
        //    pFile = $scope.addedPFileList[0].filePath;
        //}
        var params = {
            id: testId,
            subtestId: $scope.ddlTest,
            findings: $scope.txtFindings,
            impression: $scope.txtImpression,
            description: $scope.txtDescription,
            dtImpressionImagesList: JSON.stringify($scope.addedImpressImageList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        console.log('save', params);
        dataFactory.saveImpressionMaster(params).then(function (response) {
            var message = imageID > 0 ? 'Update Impression Master' : 'Save Impression Master';
            $rootScope.activityLog(response, message, 'Impression Master', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.intControl();
            $scope.getAllImpression();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.getAllImpression = function () {   
        var param = {

        };
        dataFactory.getImpressionMaster(param).then(function (response) {
            var result = response.data;
            $scope.getAllImpressionList = result.getAllImpressionList;
            for (var i = 0; i < result.getAllImpressionList.length; i++) {
                $scope.getAllImpressionList[i].details = JSON.parse(result.getAllImpressionList[i].imageDetails);

            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.edit = function (row) {
        testId = row.id;
        $scope.ddlTest = -1;
        $scope.txtFindings = '';
        $scope.txtImpression = '';
        $scope.txtDescription = '';
        imageID = row.id;
        var params = {
            id: row.id
        };
        console.log('par',params);
        dataFactory.getImpressionMaster(params).then(function (response) {
            var result = response.data.getAllImpressionList[0];
            console.log('test', result);
            $scope.txtFindings = result.findings;
            $scope.txtImpression = result.impression;
            $scope.txtDescription = result.description;
            $scope.ddlTest = result.subtestId;
            arr = [];
            $scope.imageDetailsList = JSON.parse(response.data.getAllImpressionList[0].imageDetails);
            for (var i = 0; i < $scope.imageDetailsList.length; i++) {
                arr.push({                    
                    imagePath: $scope.imageDetailsList[i].imagePath,
                    description: $scope.imageDetailsList[i].description,
                });
            }
            $scope.addedImpressImageList = arr;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.deleteImpressiontMaster = function (testId) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: testId,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteImpressiontMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.intControl();
                $scope.getAllImpression();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Impression Master', 'Impresssion Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.deleteImpressiontImages = function (imageID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: imageID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteImpressiontImages(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.intControl();
                $scope.getAllImpression();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Impression Image', 'Impression Image', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {

        $scope.ddlTest = -1;
        $scope.txtFindings = '';
        $scope.txtImpression = '';
        $scope.txtDescription = '';
        $scope.txtImgDescription = '';
        addedPFiles = [];
        pFile = '';

        $('#fileFoodFamily').val('');
        testId = 0;
        $scope.addedImpressImageList = '';
        arr = [];
        imageID = 0;
    };


    $scope.intControl();
    $scope.getAllImpression();
    //$scope.MedicineIndicationList();
});