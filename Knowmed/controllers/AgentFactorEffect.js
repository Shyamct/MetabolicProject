app.controller('agentFactorEffectCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var agentID = 0;

    $scope.initControls = function () {
        dataFactory.agentFactorEffectInitControl().then(function (response) {
            var result = response.data;
            $scope.factorList = result.factorList;
            $scope.problemList = result.problemList;
            $scope.agentFactorList = result.agentFactorList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveAgentFactorEffect = function () {

        if ($scope.ddlAgent == -1) {
            toaster.pop('error', "Error", 'Please Select Agent Factor ');
            return false;
        }
        if ($scope.ddlEffect == -1) {
            toaster.pop('error', "Error", 'Please Select Problem Effect');
            return false;
        }

        var params = {
            id: agentID,
            agentFactorID: $scope.ddlAgent,
            effectProblemID: $scope.ddlEffect,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveAgentFactorEffect(params).then(function (response) {
            if (agentID > 0) {
                $rootScope.activityLog(response, 'UPDATE Agent Factor Effect', 'Agent Factor Effect', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteAgentFactorEffect = function (agentID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: agentID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteAgentFactorEffect(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Agent Factor Effect', 'Agent Factor Effect', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        agentID = row;
        var params = {
            id: row
        };
        dataFactory.agentFactorEffectInitControl(params).then(function (response) {
            console.log(response.data);
            var result = response.data.agentFactorList[0];
            $scope.ddlAgent = result.agentFactorID;
            $scope.ddlEffect = result.effectProblemID;
            $scope.txtRemark = result.remark;
            $scope.txtReference = result.reference;
            $scope.txtUrl = result.url;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlAgent = -1;
        $scope.ddlEffect = -1;
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtUrl = '';
        agentID = 0;
    };

    $scope.initControls();


    var productionID = 0;

    var arr = [];
    $scope.addedAgentList = [];

    $scope.initControlss = function () {
        dataFactory.agentFactorProductionInitControl().then(function (response) {
            var result = response.data;
            $scope.factorsList = result.factorsList;
            $scope.nutrientList = result.nutrientList;
            $scope.problemlist = result.problemlist;
            $scope.infectionSiteList = result.infectionSiteList;
            $scope.studyTypeList = result.studyTypeList;
            $scope.measurementList = result.measurementList;
            $scope.productionTypeList = result.productionTypeList;
            $scope.agentFactorProductList = result.agentFactorProductList;
            for (var i = 0; i < result.agentFactorProductList.length; i++) {
                $scope.agentFactorProductList[i].problemToxinsDetails = JSON.parse(result.agentFactorProductList[i].problemToxinsDetails);
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    
    $scope.AddAgent = function () {

        if ($scope.agentFactorID == 0) {
            toaster.pop('error', "Error", 'Please Select Bacteria');
            return false;
        }
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Problem');
            return false;
        }
        if (arr.some(data => data.problemID == $scope.ddlProblem)) {
            toaster.pop('error', "Error", 'Already Added !!');
            return false;
        }
        arr.push({
            problemID: $scope.ddlProblem,
            problemName: $("#ddlProblem option:selected").text().trim()
        });
        $scope.addedAgentList = arr;
    };
    $scope.deleteAgentList = function (index) {
        $scope.addedAgentList.splice(index, 1);
    };

    $scope.saveAgentFactorProduction = function () {

        if ($scope.ddlAgentFa == -1) {
            toaster.pop('error', "Error", 'Please Select Agent Production ');
            return false;
        }
        if ($scope.ddlNutrient == -1) {
            toaster.pop('error', "Error", 'Please Select Nutrient ');
            return false;
        }

        var params = {
            id: productionID,
            measurementTechniqueID: $scope.ddlMeasurement,
            studyTypeID: $scope.ddlStudy,
            productionTypeID: $scope.rdProductionType,
            agentFactorID: $scope.ddlAgentFa,
            nutrientID: $scope.ddlNutrient,
            problemID: $scope.ddlProblem,
            remark: $scope.txtRemarks,
            reference: $scope.txtReferences,
            url: $scope.txtUrls,
            siteID: $scope.ddlInfection,
            dtProblemToxinsDetailsList: JSON.stringify($scope.addedAgentList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveAgentFactorProduction(params).then(function (response) {
            if (productionID > 0) {
                $rootScope.activityLog(response, 'UPDATE AGENT FACTOR PRODUCTION', 'AGENT FACTOR PRODUCTION', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControlss();
            $scope.clear();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.EditInput = function (productionID) {

    };
    $scope.deleteProblemToxins = function (productionID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: productionID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteProblemToxins(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControlss();
                $scope.clear();
                $rootScope.activityLog(response, 'DELETE PROBLEM TOXINS', 'PROBLEM TOXINS', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.deleteAgentFactorProduction = function (productionID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: productionID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteAgentFactorProduction(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControlss();
                $scope.clear();
                $rootScope.activityLog(response, 'DELETE AGENT FACTOR PRODUCTION', 'AGENT FACTOR PRODUCTION', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    
    $scope.editAgentFactorProduction = function (row) {
        productionID = row;
        var params = {
            id: row
        };
        dataFactory.agentFactorProductionInitControl(params).then(function (response) {
           
            var result = response.data.agentFactorProductList[0];
            $scope.ddlAgentFa = result.agentFactorID;

            $scope.ddlMeasurement = result.measurementTechniqueID;
            $scope.ddlStudy = result.studyTypeID;
            $scope.rdProductionType = result.productionTypeID;
            $scope.ddlNutrient = result.nutrientID;
            $scope.txtRemarks = result.remark;
            $scope.txtReferences = result.reference;
            $scope.ddlInfection = result.siteID;
            $scope.txtUrls = result.url;
            if (result) {
                $scope.addedAgentList = JSON.parse(result.problemToxinsDetails);
                arr = ($scope.addedAgentList) ? $scope.addedAgentList : [];
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clear = function () {

        $scope.ddlMeasurement = -1;
        $scope.ddlStudy = -1;
        $scope.ddlAgentFa = -1;
        $scope.ddlNutrient = -1;
        $scope.ddlProblem = -1;
        $scope.ddlInfection = -1;
        $scope.txtRemarks = '';
        $scope.txtReferences = '';
        $scope.txtUrls = '';
        productionID = 0;
        $scope.rdProductionType = null;
        $scope.addedAgentList = [];
        arr = [];
    };

    $scope.initControlss();
});