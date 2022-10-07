app.controller('researchBasedAnalysisCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    var existID = null;
    var arr = [];
    $scope.researchList = [];
    $scope.isDisabled = false;

    $scope.initControls = function () {
        dataFactory.researchBasedAnalysisInitControl().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientMaster;
            $scope.researchSampleList = result.investigationSampleMaster;
            $scope.methodList = result.investigationMethodMaster;
            //$scope.problemList = result.problemList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.researchBasedAnalysis = function () {
        var params = {
            id: existID
        };
        dataFactory.researchBasedAnalysis(params).then(function (response) {
            var result = response.data;
            $scope.studyReferenceResearchTest = result.studyReferenceResearchTest;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveResearchBasedAnalysis = function () {

        //if ($scope.ddlProblem == 0) {
        //    toaster.pop('error', "Error", 'Please Select Disease !!');
        //    return false;
        //}
        if ($scope.ddlResearchMarker == 0) {
            toaster.pop('error', "Error", 'Please Select Research Marker !!');
            return false;
        }
        if ($scope.ddlSample == 0) {
            toaster.pop('error', "Error", 'Please Select Sample !!');
            return false;
        }
        if ($scope.ddlMethod == 0) {
            toaster.pop('error', "Error", 'Please Select Method !!');
            return false;
        }
        if (existID == null && $scope.researchList.length < 1) {
            toaster.pop('error', "Error", 'Please Add ResearchTestDetails !!');
            return false;
        }
        var params = {
            id: existID,
            //diseaseID: $scope.ddlProblem,
            researchList: $scope.researchList,
            markerID: $scope.ddlResearchMarker,
            sampleID: $scope.ddlSample,
            testTechnique: $scope.ddlMethod,
            reference: $scope.txtReference,
            url: $scope.txturl,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.saveResearchBasedAnalysis(params).then(function (response) {
            var message = existID > 0 ? 'Update Research Based Analysis' : 'Save Research Based Analysis';
            $rootScope.activityLog(response, message, 'Research Based Analysis', '');

            $scope.clr();
            $scope.researchBasedAnalysis();
            toaster.pop('success', "Success", 'Saved Successfully.');
           
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteResearchBasedAnalysis = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.deleteResearchBasedAnalysis(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.researchBasedAnalysis();
                $rootScope.activityLog(response, 'Delete Research Based Analysis', 'Research Based Analysis', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.addResearchTestDetails = function () {

        if ($scope.ddlResearchMarker == 0) {
            toaster.pop('error', "Error", 'Please Select ResearchMarker');
            return false;
        }
        if ($scope.ddlSample == 0) {
            toaster.pop('error', "Error", 'Please Select Sample');
            return false;
        }
        if ($scope.ddlMethod == 0) {
            toaster.pop('error', "Error", 'Please Select Method');
            return false;
        }
        for (var i = 0; i < $scope.researchList.length; i++) {
            if ($scope.researchList[i].markerID == $scope.ddlResearchMarker && $scope.researchList[i].sampleID == $scope.ddlSample && $scope.researchList[i].testTechnique == $scope.ddlMethod) {
                toaster.pop('error', "Error", 'Already Added');
                return false;
            }
        }
        arr.push({
            markerID: $scope.ddlResearchMarker,
            markerName: $('#ddlResearchMarker option:selected').text(),
            sampleID: $scope.ddlSample,
            sampleName: $('#ddlSample option:selected').text(),
            testTechnique: $scope.ddlMethod,
            testTechniqueName: $('#ddlMethod option:selected').text()
        });
        $scope.researchList = arr;
    };

    $scope.deleteResearch = function (index) {
        $scope.researchList.splice(index, 1);
    };

    $scope.edit = function (paramid) {
        $scope.isDisabled = true;
        existID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.researchBasedAnalysis(params).then(function (response) {
            var result = response.data;
            var list = result.studyReferenceResearchTest;

            //$scope.ddlProblem = list[0].studyReferenceID;
            $scope.ddlResearchMarker = list[0].markerID;
            $scope.ddlSample = list[0].sampleID;
            $scope.ddlMethod = list[0].testTechnique;
            $scope.txtReference = list[0].reference;
            $scope.txturl = list[0].url;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.clr = function () {
        existID = null;
        arr = [];
        $scope.researchList = [];
        $scope.ddlResearchMarker = 0;
        $scope.ddlSample = 0;
        $scope.ddlMethod = 0;
        $scope.txtReference = '';
        $scope.txturl = '';
        $scope.isDisabled = false;
    };

    $scope.initControls();
    $scope.researchBasedAnalysis();

});