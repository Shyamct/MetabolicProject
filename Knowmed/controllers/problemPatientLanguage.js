app.controller('problemLanguageCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    var pkId = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsPatientLanguage().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemList;
            $scope.symptomList = result.symptomList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetProblemLanguage = function () {
        $scope.clr();
        var params = {
            //problemID: $scope.ddlProblem
        };
        dataFactory.ProblemPatientLanguageList(params).then(function (response) {
            var result = response.data;
            $scope.languageList = result.languageList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetProblemLanguageNew = function () {        
        var params = {
            problemID: $scope.ddlProblem
        };
        dataFactory.ProblemPatientLanguageList(params).then(function (response) {
            var result = response.data;
            $scope.languageNewList = result.languageList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.edit = function (indexVal1, paramid) {
        pkId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.ProblemPatientLanguageList(params).then(function (response) {
            var result = response.data;
            var list = result.languageList;
            $scope.ddlProblem = list[0].problemID;
            //$scope.ddlSymtom = list[0].oldsid;
            $scope.txtPatientWord = list[0].patientWord;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveProblemLanguage = function () {
        if ($scope.ddlProblem == -1) {
            alert('Please Select Problem');
            return false;
        }
        var params = {
            id: pkId,
            problemID: $scope.ddlProblem,
            //oldSymptomID: $scope.ddlSymtom,
            patientWord: $scope.txtPatientWord,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveProblemPatientLanguage(params).then(function (response) {
            var message = pkId > 0 ? 'Update Problem Patient Language' : 'Save Problem Patient Language';
            $rootScope.activityLog(response, message, 'Problem Patient Language', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetProblemLanguage();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.DeleteProblemPatientLanguage(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetProblemLanguage();
                $rootScope.activityLog(response, 'Delete Problem Patient Language', ' Problem Patient Language', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.clr = function () {
        $scope.ddlProblem = -1;
        //$scope.ddlSymtom = 0;
        $scope.txtPatientWord = '';
    };
    $scope.initControls();
    $scope.GetProblemLanguage();
});