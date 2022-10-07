app.controller('diseaseEnvironmentFactorCtrl', function ($scope, dataFactory, toaster) {
    var DiseaseEnvironmentFactorId = 0; 
    
    $scope.EnvironmentFactorList = function () {
        dataFactory.EnvironmentFactorMasterList().then(function (response) {
            var result = response.data;
            $scope.EnvironmentFactorMasterList = result.environmentFactorMaster;
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

    $scope.DiseaseEnvironmentList = function () {
        dataFactory.DiseaseEnvironmentFactorList().then(function (response) {
            var result = response.data;
            $scope.DiseaseEnvironmentFactorList = result.diseaseEnviorenmentFactor;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveDiseaseEnvironmentFactor = function () {
        if ($scope.ddlProblem == -1) {
            toaster.pop('error', "Error", 'Select Problem');
            return false;
        }
        if ($scope.ddlEnvironmentFactor == -1) {
            toaster.pop('error', "Error", 'Select Environment Factor');
            return false;
        }        
        var params = {
            id: DiseaseEnvironmentFactorId,
            problemID: $scope.ddlProblem,
            enviorenmentFactorID: $scope.ddlEnvironmentFactor,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseEnvironmentFactor(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.DiseaseEnvironmentList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteDiseaseEnvironmentFactor = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseEnvironmentFactor(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.DiseaseEnvironmentList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        DiseaseEnvironmentFactorId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.DiseaseEnvironmentFactorList(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseEnviorenmentFactor;
            $scope.ddlProblem = list[0].problemID;
            $scope.ddlEnvironmentFactor = list[0].enviorenmentFactorID;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        DiseaseEnvironmentFactorId = 0;
        $scope.ddlProblem = -1;
        $scope.ddlEnvironmentFactor = -1;
        $scope.txtRemark = "";
        $scope.txtReference = "";
    };
    $scope.EnvironmentFactorList();
    $scope.DiseaseEnvironmentList();
    $scope.pMasterList();
});