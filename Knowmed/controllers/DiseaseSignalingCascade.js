app.controller('diseaseSignalingCascadeCtrl', function ($scope, dataFactory, $rootScope, toaster) {
    $scope.isDisabled = false;
    var DiseaseSignalingCascadeId = 0;
    var functionProblemId = 0;
    var functionId = 0;
    var arr = [];
    $scope.sMasterList = function () {
        dataFactory.StatusMasterList().then(function (response) {
            var result = response.data;
            $scope.StatusMasterList = result.statusMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.nMasterList = function () {
        dataFactory.NutrientMasterList().then(function (response) {
            var result = response.data;
            $scope.NutrientMasterList = result.nutrientMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.nFunctionList = function () {
        dataFactory.NutrientFunctionList().then(function (response) {
            var result = response.data;
            $scope.NutrientFunctionList = result.problemNutrientRole;
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
    $scope.problemLevelList = function () {
        dataFactory.ProblemLevelList().then(function (response) {
            var result = response.data;
            $scope.EffectLevelList = result.problemLevel;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.dSignalingCascadeList = function () {
        var param = {
            problemId: $scope.ddlProblem,
        };
        dataFactory.DiseaseSignalingCascadeList(param).then(function (response) {
            var result = response.data;
            $scope.DiseaseSignalingCascadeList = result.problemNutrientRole;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.viewHistoryDetails = function (paramId) {
        functionProblemId = paramId;
        var param = {
            problemId: paramId
        };
        dataFactory.NutrientFunctionList(param).then(function (response) {
            var result = response.data;
            $scope.DiseaseFunctionList = result.problemNutrientFunction;
            $('#myModal').modal('show');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.viewFunctionDetails = function (paramId) {
        functionCascadeId = paramId;
        var param = {
            problemId: paramId
        };
        dataFactory.NutrientFunctionList(param).then(function (response) {
            var result = response.data;
            $scope.DiseaseFunctionList = result.problemNutrientFunction;          
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.SaveDiseaseSignalingCascade = function () {

        if ($scope.ddlProblem == -1) {
            toaster.pop('error', "Error", 'Select Disease !!');
            return false;
        }
        if ($scope.ddlNutrient == -1) {
            toaster.pop('error', "Error", 'Select Cascade !!');
            return false;
        }
        if ($scope.ddlStatus == -1) {
            toaster.pop('error', "Error", 'Select Effect !!');
            return false;
        }
       
        //if (isEmpty($scope.txtHarmfulEffect)) {
        //    toaster.pop('error', "Error", 'Select Effect !!');
        //    return false;
        //}
        //if (isEmpty($scope.txtBeneficialEffect)) {
        //    toaster.pop('error', "Error", 'Enter Beneficial Effect !!');
        //    return false;
        //}
        //if (arr.length <= 0) {
        //    toaster.pop('error', "Error", 'Add function and remark !!');
        //    return false;
        //}
        var params = {
            id: DiseaseSignalingCascadeId,
            problemId: $scope.ddlProblem,
            nutrientID: $scope.ddlNutrient,
            statusId: $scope.ddlStatus,
            harmfulEffect: $scope.txtHarmfulEffect,
            beneficialEffect: $scope.txtBeneficialEffect,
            effectLevelID: $scope.ddlProblemLevel,
            dtNutrientFunction: $scope.functionList,
            isRDA: $scope.isRDA,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseSignalingCascade(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = DiseaseSignalingCascadeId > 0 ? 'UPDATE DISEASE SIGNALING CASCADE' : 'SAVE DISEASE SIGNALING CASCADE';
            $rootScope.activityLog(response, message, 'DISEASE SIGNALING CASCADE', '');

            $scope.dSignalingCascadeList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteDiseaseSignalingCascade = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseSignalingCascade(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.dSignalingCascadeList();
               
                $rootScope.activityLog(response, 'DELETE DISEASE SIGNALING CASCADE', 'DISEASE SIGNALING CASCADE', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.editDiseaseSignalingCascade = function (paramid) {
        $scope.isDisabled = true;
        DiseaseSignalingCascadeId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.DiseaseSignalingCascadeList(params).then(function (response) {
            var result = response.data;
            var list = result.problemNutrientRole;
            $scope.ddlProblem = list[0].diseaseID;
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.ddlStatus = list[0].roleTypeID;
            $scope.txtHarmfulEffect = list[0].roleHarmful;
            $scope.txtBeneficialEffect = list[0].roleBeneficial;
            $scope.isRDA = list[0].needAchieveRDA;
            $scope.ddlProblemLevel = list[0].effectLevelID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.editFunction = function (paramid) {       
        functionId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.NutrientFunctionList(params).then(function (response) {
            var result = response.data;
            var list = result.problemNutrientFunction;
            $scope.txtFunctionEdit = list[0].nutrientFunction;
            $scope.txtRemarkEdit = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveFunction = function () {
        if (isEmpty($scope.txtFunctionEdit)) {
            toaster.pop('error', "Error", 'Enter Function !!');
            return false;
        }
        var params = {
            problemId: functionProblemId,
            id: functionId,
            nutrientFunction: $scope.txtFunctionEdit,
            remark: $scope.txtRemarkEdit,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveFunction(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');

            var message = functionProblemId > 0 ? 'UPDATE DISEASE SIGNALING FUNCTION' : 'SAVE DISEASE SIGNALING FUNCTION';
            $rootScope.activityLog(response, message, 'DISEASE SIGNALING FUNCTION', '');

            $scope.clrFunction();
            $scope.viewFunctionDetails(functionProblemId);
            
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteFunctionDetail = function (id, existProblemID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteFunction(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.viewFunctionDetails(existProblemID);
                $scope.clrFunction();
                $rootScope.activityLog(response, 'DELETE SIGNALING FUNCTION', 'SIGNALING FUNCTION', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.clr = function () {
        DiseaseSignalingCascadeId = 0;       
        $scope.ddlNutrient = -1;
        $scope.ddlStatus = -1;
        $scope.txtHarmfulEffect = "";
        $scope.txtBeneficialEffect = "";
        $scope.ddlProblemLevel = -1;
        $scope.txtFunction = "";
        $scope.txtRemark = "";
        $scope.functionList = "";
        arr.length = 0;
        $scope.isDisabled = false;
        functionCascadeId = 0;
    };
    $(function () {
        // when the modal is closed
        $('#myModal').on('hidden.bs.modal', function () {
            functionId = 0;
            $scope.txtFunctionEdit = '';
            $scope.txtRemarkEdit = '';
        });
    });
    $scope.clrFunction = function () {      
        functionId = 0;
        $scope.txtFunctionEdit = '';
        $scope.txtRemarkEdit = '';
    };
    $scope.addFunction = function () {
        if (isEmpty($scope.txtFunction)) {
            toaster.pop('error', "Error", 'Please Enter Function !!');
            return false;
        }
        //if (isEmpty($scope.txtRemark)) {
        //    toaster.pop('error', "Error", 'Please Enter Remark !!');
        //    return false;
        //}
        arr.push({
            nutrientFunction: $scope.txtFunction,
            remark: $scope.txtRemark
        });
        $scope.functionList = arr;
    };
    $scope.deleteFunction = function (index) {
        $scope.functionList.splice(index, 1);
    };

    $scope.sMasterList();
    $scope.nMasterList();
    $scope.nFunctionList();
    $scope.pMasterList();
    $scope.problemLevelList();
    $scope.dSignalingCascadeList();
});