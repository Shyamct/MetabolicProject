app.controller('diseaseAgentFactorCtrl', function ($scope, dataFactory, toaster) {
    var DiseaseAgentFactorId = 0; 
    
    $scope.AgentFactorList = function () {
        dataFactory.AgentFactorMasterList().then(function (response) {
            var result = response.data;
            $scope.AgentFactorMasterList = result.agentFactorMaster;
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

    $scope.DiseaseAgentList = function () {
        dataFactory.DiseaseAgentFactorList().then(function (response) {
            var result = response.data;
            $scope.DiseaseAgentFactorList = result.diseaseAgentFactor;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveDiseaseAgentFactor = function () {
        if ($scope.ddlProblem == -1) {
            toaster.pop('error', "Error", 'Select Problem');
            return false;
        }
        if ($scope.ddlAgentFactor == -1) {
            toaster.pop('error', "Error", 'Select Agent Factor');
            return false;
        }        
        var params = {
            id: DiseaseAgentFactorId,
            problemId: $scope.ddlProblem,
            agentFactorID: $scope.ddlAgentFactor,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseAgentFactor(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.DiseaseAgentList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteDiseaseAgentFactor = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseAgentFactor(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.DiseaseAgentList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        DiseaseAgentFactorId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.DiseaseAgentFactorList(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseAgentFactor;
            $scope.ddlProblem = list[0].problemID;
            $scope.ddlAgentFactor = list[0].agentFactorID;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        DiseaseAgentFactorId = 0;
        $scope.ddlProblem = -1;
        $scope.ddlAgentFactor = -1;
        $scope.txtRemark = "";
        $scope.txtReference = "";
    };
    $scope.AgentFactorList();
    $scope.DiseaseAgentList();
    $scope.pMasterList();
});