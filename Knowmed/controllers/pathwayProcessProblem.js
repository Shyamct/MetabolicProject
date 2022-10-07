app.controller('pathwayProcessProblemCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existID = null;
    var arr = [];
    $scope.symptomList = '';
    $scope.rdCauseEffect = ''

    $scope.initControls = function () {
        dataFactory.pathwayProcessProblemInitControl().then(function (response) {
            var result = response.data;
            $scope.problemMaster = result.problemMaster;
            $scope.phenomenon = result.phenomenon;
            $scope.rankMaster = result.rankMaster;
            $scope.headerMaster = result.headerMaster;
            $scope.statusMaster = result.statusMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getPathwayProcessProblem = function () {
        var params = {
            id: existID
        }
        dataFactory.pathwayProcessProblem(params).then(function (response) {
            var result = response.data;           
            $scope.pathwayProcessProblem = result.pathwayProcessProblem;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.savePathwayProcessProblem = function () {

        if ($scope.ddlSymptom == -1) {
            toaster.pop('error', "Error", 'Select Symptom/Side Effect !!');
            return false;
        };
        if (existID == null && $scope.symptomList.length < 1) {
            toaster.pop('error', "Error", 'Please Add Symptom/Side Effect !!');
            return false;
        }
        if ($scope.ddlDisease == -1) {
            toaster.pop('error', "Error", 'Select Disease !!');
            return false;
        };
        if ($scope.ddlPhenomenon == -1) {
            toaster.pop('error', "Error", 'Select Phenomenon !!');
            return false;
        };
        if ($scope.ddlProcess == -1) {
            toaster.pop('error', "Error", 'Select Process !!');
            return false;
        };
        if ($scope.rdCauseEffect == 0) {
            toaster.pop('error', "Error", 'Select Cause OR Effect !!');
            return false;
        };

        var params = {
            id: existID,
            lstDiseaseList: $scope.symptomList,
            diseaseID: $scope.ddlSymptom,
            phenomenaID: $scope.ddlPhenomenon,
            processID: $scope.ddlProcess,
            problemID: $scope.ddlDisease,
            effectStatusID: $scope.rdCauseEffect,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)

        };

        dataFactory.savePathwayProcessProblem(params).then(function (response) {
            var message = existID > 0 ? 'Update Pathway Process Problem' : 'Save Pathway Process Problem';
            $rootScope.activityLog(response, message, 'Pathway Process Problem', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.getPathwayProcessProblem();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deletePathwayProcessProblem = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
            };
            dataFactory.deletePathwayProcessProblem(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getPathwayProcessProblem();
                $rootScope.activityLog(response, 'Delete Pathway Process Problem', ' Pathway Process Problem', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.AddSymptom = function () {

        if ($scope.ddlSymptom == 0) {
            toaster.pop('error', "Error", 'Please Select Symptom');
            return false;
        }
        for (var i = 0; i < $scope.symptomList.length; i++) {
            if ($scope.symptomList[i].id == $scope.ddlSymptom) {
                toaster.pop('error', "Error", 'Already Added To This Symptom');
                return false;
            }
        }

        arr.push({
            diseaseID: $scope.ddlSymptom,
            symptomName: $('#ddlSymptom option:selected').text()
        });
        $scope.symptomList = arr;
    };

    $scope.deleteSymptom = function (index) {
        $scope.symptomList.splice(index, 1);
    };

    $scope.edit = function (paramid) {
        $scope.isDisabled = true;
        existID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.pathwayProcessProblem(params).then(function (response) {
            var result = response.data;
            var list = result.pathwayProcessProblem; 
           
            $scope.ddlSymptom = list[0].diseaseID;
            $scope.ddlDisease = list[0].problemID;
            $scope.ddlPhenomenon = list[0].phenomenaID;
            $scope.ddlProcess = list[0].processID;
            $scope.rdCauseEffect = list[0].statusID;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };


    $scope.clr = function () {
        existID = null;
        $scope.symptomList = '';
        $scope.symptomList.length = 0;
        $scope.ddlSymptom = -1;
        $scope.ddlDisease = -1;
        $scope.ddlPhenomenon = -1;
        $scope.ddlProcess = -1;
        $scope.rdCauseEffect = 0;
        $scope.isDisabled = false;
    };

    $scope.initControls();
    $scope.getPathwayProcessProblem();
});