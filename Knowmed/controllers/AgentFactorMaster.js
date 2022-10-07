app.controller('agentFactorMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var AgentFactorMasterId = 0;

    $scope.AgentFactorList = function () {
        dataFactory.AgentFactorMasterList().then(function (response) {
            var result = response.data;
            $scope.AgentFactorMasterList = result.agentFactorMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveAgentFactorMaster = function () {
        if ($scope.txtAgentFactor == undefined || $scope.txtAgentFactor == "") {
            toaster.pop('error', "Error", 'Enter Agent Factor');           
            return false;
        }
        if ($scope.ddlType == -1) {
            toaster.pop('error', "Error", 'Select Type');  
            return false;
        }
        var params = {
            id: AgentFactorMasterId,
            agentFactor: $scope.txtAgentFactor,
            agentFactorType: $scope.ddlType,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveAgentFactorMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');

            var message = AgentFactorMasterId > 0 ? 'UPDATE AGENT FACTOR MASTER' : 'SAVE AGENT FACTOR MASTER';
            $rootScope.activityLog(response, message, 'AGENT FACTOR MASTER', '');

            $scope.AgentFactorList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteAgentFactorMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteAgentFactorMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.AgentFactorList();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE AGENT FACTOR MASTER', 'AGENT FACTOR MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        AgentFactorMasterId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.AgentFactorMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.agentFactorMaster;
            $scope.txtAgentFactor = list[0].agentFactor;
            $scope.ddlType = list[0].agentFactorType;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        AgentFactorMasterId = 0;
        $scope.txtAgentFactor = "";
        $scope.ddlType = -1;
        $scope.txtRemark = "";
    };
    $scope.AgentFactorList();
});