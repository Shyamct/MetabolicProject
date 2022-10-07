app.controller('diseaseDepartmentCtrl', function ($scope, dataFactory, toaster) {
    var diseaseDepartmentID = 0;
    $scope.txtProblem = 0;
    var addedFiles = [];
    var addedFileList = '';
    $scope.occurenceList = [{ 'occurence': "Common" },
        { 'occurence': "Less Common" },
        { 'occurence': "Rare" }];

    $scope.alcohalicList = [{ 'alcohalic': "Frequently" },
        { 'alcohalic': "Rarely" },
        { 'alcohalic': "Never" }];
    $scope.smokingList = [{ 'smoking': "Frequently" },
        { 'smoking': "Rarely" },
        { 'smoking': "Never" }];
    $scope.rdBoth == 'Both'
    $scope.initControls = function () {
        dataFactory.InitControlsDiseaseDepartment().then(function (response) {
            var result = response.data;
            $scope.diseaseDepartmentList = result.diseaseDepartment;
            $scope.ageUnitList = result.ageUnitList;
            $scope.organList = result.organList;
            $scope.departmentList = result.departmentList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        var timeStamp = new Date().getTime();
        angular.forEach($files, function (value, key) {
            
                formdata.append(key,  value);
            
            

        });
    };

    $scope.addImage = function () {
        addedFiles = [];
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;
            for (var i = 0; i < result.length; i++) {
                addedFiles.push({
                    filePath: 'http://localhost:51564/fileUpload/' + result[i],
                    fileDescription: $scope.txtFileDesc
                });
            }
            log(result);
            
            $scope.addedFileList = addedFiles;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.deleteAddedFileList = function (index) {
        $scope.addedFileList.splice(index, 1);
    };
    $scope.reset = function () {
        $scope.clr();
        $scope.initControls();
    };
    $scope.saveDiseaseDepartment = function () {

        if ($scope.txtDisease == 0) {
            toaster.pop('error', "Error", 'Please Enter Problem');
            return false;
        }
        if ($scope.ddlRegion == 0) {
            toaster.pop('error', "Error", 'Please Select Organ region');
            return false;
        }
       
        var params = {
            diseaseDepartmentID: diseaseDepartmentID,
            problemMasterID: $scope.txtProblem,
            diseaseName: $scope.txtDisease,
            diseaseDetails: $scope.txtDiseaseDetails,
            departmentID: $scope.ddlDepartment,
            regionID: $scope.ddlRegion,
            ageFrom: $scope.txtAgeFrom,
            ageTo: $scope.txtAgeTo,
            ageUnit: $scope.ddlAgeUnit,
            icdCode: $scope.txtICD,
            gender: $scope.rdMale == 'Male' ? 'Male' : $scope.rdFemale == 'Female' ? 'Female' : $scope.rdBoth == 'Both' ? 'Both' : null,
            occurence: $scope.ddlOccurence,
            isAlcoholic: $scope.ddlAlcohalic,
            isSmoking: $scope.ddlSmoking,    
            lstDiseaseFileList: $scope.addedFileList,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseDepartment(params).then(function (response) {
            $scope.initControls();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id,problemID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                diseaseDepartmentID: id,
                problemMasterID: problemID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseDepartment(params).then(function (response) {
                $scope.initControls();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        diseaseDepartmentID = paramid;
        var params = {
            diseaseDepartmentID: paramid
        };
        dataFactory.DiseaseDepartmentList(params).then(function (response) {
            var result = response.data;
            var diseaseDepartmentList = result.diseaseDepartmentList;
            var fileDetailList = result.fileDetailList;
            log(result.fileDetailList);
            log(diseaseDepartmentList);
            $scope.txtDisease = diseaseDepartmentList[0].problemName;
            $scope.txtProblem = diseaseDepartmentList[0].problemID;
            $scope.ddlDepartment = diseaseDepartmentList[0].departmentID;
            $scope.ddlRegion = diseaseDepartmentList[0].organID;
            $scope.rdMale = diseaseDepartmentList[0].gender == 'Male' ? 'Male' : false;
            $scope.rdFemale = diseaseDepartmentList[0].gender == 'Female' ? 'Female' : false;
            $scope.rdBoth = diseaseDepartmentList[0].gender == 'Both' ? 'Both' : false;
            $scope.txtAgeFrom = diseaseDepartmentList[0].ageFrom;
            $scope.txtAgeTo = diseaseDepartmentList[0].ageTo;
            $scope.ddlAgeUnit = diseaseDepartmentList[0].ageUnitID;
            $scope.txtICD = diseaseDepartmentList[0].icdCode;
            $scope.ddlOccurence = diseaseDepartmentList[0].occurence;
            $scope.ddlAlcohalic = diseaseDepartmentList[0].alcohalic;
            $scope.ddlSmoking = diseaseDepartmentList[0].smoking;
            $scope.txtDiseaseDetails = diseaseDepartmentList[0].DiseaseDetails;
            addedFiles = [];
            for (var i = 0; i < fileDetailList.length; i++) {
                addedFiles.push({
                    filePath: fileDetailList[i].filePath,
                    fileDescription: fileDetailList[i].fileDescription
                });
            }
            log(addedFiles);
            $scope.addedFileList = addedFiles;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.changeMaleRadio = function () {       
        if ($scope.rdMale == 'Male') {
            $scope.rdFemale = 0;
            $scope.rdBoth = 0;
        } else {
            $scope.rdMale = 0;
        }
    };
    $scope.changeFemaleRadio = function () {
        if ($scope.rdFemale == 'Female') {
            $scope.rdMale = 0;
            $scope.rdBoth = 0;
        } else {
            $scope.rdFemale = 0;
        }
    };
    $scope.changeBothRadio = function () {
        if ($scope.rdBoth == 'Both') {
            $scope.rdMale = 0;
            $scope.rdFemale = 0;
        } else {
            $scope.rdBoth = 0;
        }
    };

    $scope.clr = function () {  
        $scope.ddlProblem = 0;
        $scope.ddlDepartment = 0;
        $scope.rdMale = 0;
        $scope.rdFemale = 0;
        $scope.rdBoth = 0;
        $scope.txtAgeTo = '';
        $scope.ddlAgeUnit = 0;
        $scope.txtDisease = '';
        $scope.ddlRegion = 0;
        $scope.ddlSmoking = 0;
        $scope.ddlOccurence = 0;
        $scope.ddlAlcohalic = 0;
        diseaseDepartmentID = 0;
        $scope.txtProblem = 0;
        $scope.addedFileList = '';

    };

    $scope.initControls();
    
});