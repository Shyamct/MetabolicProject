app.controller('diseasePreventionCtrl', function ($scope, dataFactory, toaster) {
    var DiseasePreventionId = 0; 

    $scope.pMasterList = function () {
        dataFactory.ProblemMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemMasterList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.dPreventionList = function () {
        dataFactory.DiseasePreventionList().then(function (response) {
            var result = response.data;
            $scope.DiseasePreventionList = result.diseasePrevention;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.SaveDiseasePrevention = function () {
        if ($scope.ddlProblem == -1) {
            alert('Select Disease');
            return false;
        }
        if ($scope.txtToDo == undefined || $scope.txtToDo == "") {
            alert('Enter To Do');
            return false;
        }
        if ($scope.txtNotToDo == undefined || $scope.txtNotToDo == "") {
            alert('Enter Not To Do');
            return false;
        }   
        var params = {
            id: DiseasePreventionId,
            problemID: $scope.ddlProblem,
            toDo: $scope.txtToDo,
            notToDO: $scope.txtNotToDo,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseasePrevention(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.dPreventionList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteDiseasePrevention = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseasePrevention(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.dPreventionList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        DiseasePreventionId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.DiseasePreventionList(params).then(function (response) {
            var result = response.data;
            var list = result.diseasePrevention;
            $scope.ddlProblem = list[0].problemId;
            $scope.txtToDo = list[0].toDo;
            $scope.txtNotToDo = list[0].notToDo;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        DiseasePreventionId = 0;
        $scope.ddlProblem = -1;
        $scope.txtToDo = ""; 
        $scope.txtNotToDo = ""; 
        $scope.txtRemark = ""; 
    };
    $scope.pMasterList();
    $scope.dPreventionList();
});