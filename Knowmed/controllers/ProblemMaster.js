app.controller('problemMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {
    var problemMasterId = 0; 
    var formdata = new FormData();
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];
    
    $scope.pCategoryList = function () {
        dataFactory.ProblemCategoryList().then(function (response) {
            var result = response.data;
            $scope.ProblemCategoryList = result.problemCategory;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.BodyOrganRegionList = function () {
        dataFactory.BodyOrganRegionList().then(function (response) {
            var result = response.data;
            $scope.BodyOrganRegionList = result.bodyOrganRegion;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.pMasterList = function () {
        dataFactory.ProblemMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemMasterList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getProblemFiles = function ($files) {
        formdata = new FormData();
        angular.forEach($files, function (value, key) {

            formdata.append(key, value);

        });
        $scope.addProblemFiles();
    };
    $scope.addProblemFiles = function () {

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

    $scope.SaveProblemMaster = function () {
       
        if ($scope.txtProblemName == undefined || $scope.txtProblemName == "") {
            alert('Enter Problem Name');
            return false;
        }
        if ($scope.ddlProblemType == -1) {
            alert('Select Problem Type');
            return false;
        }
        if ($scope.ddlRegionOrganID == -1) {
            alert('Select Region Organ');
            return false;
        }
        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;
        }

        var params = {
            id: problemMasterId,
            problemName: $scope.txtProblemName,
            patientLanguage: $scope.txtPatientLanguageName,
            problemTypeId: $scope.ddlProblemType,
            regionOrganId: $scope.ddlRegionOrganID,
            remark: $scope.txtRemark,
            problemDefinition: $scope.txtDefinition,
            problemImagePath: pFile,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveProblemMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = problemMasterId > 0 ? 'UPDATE PROBLEM MASTER' : 'SAVE PROBLEM MASTER';
            $rootScope.activityLog(response, message, 'PROBLEM MASTER', '');

            $scope.pMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.DeleteProblemMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteProblemMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.pMasterList();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE PROBLEM MASTER', 'PROBLEM MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    
    $scope.edit = function (paramid) {
        problemMasterId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.ProblemMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.problemMaster;
            $scope.txtProblemName = list[0].problemName;
            $scope.txtPatientLanguageName = list[0].patientLanguage;
            $scope.ddlProblemType = list[0].problemTypeID;
            $scope.ddlRegionOrganID = list[0].regionOrganID;
            $scope.txtRemark = list[0].remark;
            $scope.txtDefinition = list[0].defintion;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        problemMasterId = 0;
        $scope.ddlProblemType = -1;
        $scope.txtProblemName = "";     
        $scope.txtRemark = "";  
        $scope.txtDefinition = "";
        $scope.ddlRegionOrganID = -1;
                
        $scope.addedPFileList = [];
        addedPFiles = [];
        pFile = '';
        $('#fileProblem').val('');
    };

    $scope.pMasterList();
    $scope.pCategoryList();
    $scope.BodyOrganRegionList();
});