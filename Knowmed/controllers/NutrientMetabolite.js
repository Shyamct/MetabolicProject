app.controller('nutrientMetaboliteCtrl', function ($scope, dataFactory, toaster, $rootScope,$q) {

    $scope.isDisabled = false;
    var metaboliteID = 0;
    var mainID = 0;
    var arr = [];
    $scope.metaboliteList = "";

    $scope.initControls = function () {

        dataFactory.nutrientMetaboliteInitControl().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.unitmasterList = result.unitmasterList;
            $scope.toxicityList = result.toxicityList;
            $scope.studyMasterList = result.studyMasterList;
            $scope.nutrientMetaboliteList = result.nutrientMetaboliteList;

            for (var i = 0; i < result.nutrientMetaboliteList.length; i++) {
                $scope.nutrientMetaboliteList[i].details = JSON.parse(result.nutrientMetaboliteList[i].nutrientMetabolite);

            }
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetMolecularList = function () {
        var params = {
            nutrientID: $scope.ddlMolecular

        };
        dataFactory.MolecularList(params).then(function (response) {
            var result = response.data;
            $scope.txtHalf = result.halfLifeList[0]['minTHalf'] + '  -  ' + result.halfLifeList[0]['maxTHalf'] + ' ' + result.halfLifeList[0]['unitName'];
            $scope.txttMax = result.peekValuesList[0]['minPeakValue'] + '  -  ' + result.peekValuesList[0]['maxPeakValue'] + ' ' + result.peekValuesList[0]['unitName'];

        }, function (error) {
            toaster.pop('error', "Error", error.data);

        });
    };   
    $scope.saveNutrientMetabolite = function () {

        if ($scope.ddlMolecular == -1 && mainID == 0) {
            toaster.pop('error', "Error", 'Please Select Molecular Name');
            return false;
        }
        var params = {
            id: mainID,
            nutrientID: $scope.ddlMolecular,
            absorptionMin: $scope.txtAbsorptionMin,
            absorptionMax: $scope.txtAbsorptionMax,
            eliminationMin: $scope.txtEliminationMin,
            eliminationMax: $scope.txtEliminationMax,
            molecularFormula: $scope.txtFormula,
            rateOfReaction: $scope.txtRateQty,
            reactionUnitID: $scope.ddlUnit,
            nutrientAbsorptionId: $scope.ddlMetabolite,
            reamrk: $scope.txtRemark,
            studyTypeID: $scope.ddlStudyType,
            toxicityUnitID: $scope.ddlToxicityUnit,
            toxicityValue: $scope.txtToxicity,
            reference: $scope.txtReference,
            dtMetaboliteNutrientList: JSON.stringify($scope.addedMetaboliteList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };       
        dataFactory.saveNutrientMetabolite(params).then(function (response) {
            if (metaboliteID > 0) {
                $rootScope.activityLog(response, 'UPDATE Nutrient Metabolite', 'Nutrient Metabolite', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteNutrientMetaboliteList = function (mainID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: mainID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteNutrientMetaboliteList(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Nutrient Metabolite List', 'Nutrient Metabolite List', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.deleteNutrientMetabolite = function (metaboliteID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: metaboliteID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteNutrientMetabolite(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Nutrient Metabolite', 'Nutrient Metabolite', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.AddMetabolite = function () {

        if ($scope.ddlMolecular == -1 && mainID == 0) {
            toaster.pop('error', "Error", 'Please Select Molecular Name');
            return false;
        }
        if ($scope.ddlMetabolite == -1 ) {
            toaster.pop('error', "Error", 'Please Select Metabolite Name');
            return false;
        }
        if (arr.some(data => data.nutrientID == $scope.ddlMetabolite)) {
            toaster.pop('error', "Error", 'Already Added !!');
            return false;
        }
        arr.push({
            nutrientID: $("#ddlMetabolite").val(),
            nutrientName: $("#ddlMetabolite option:selected").text(),
            remark: $scope.txtRemark,

        });
        $scope.addedMetaboliteList = arr;
        log($scope.addedMetaboliteList);
    };
    $scope.deleteMetabolite = function (index) {
        $scope.addedMetaboliteList.splice(index, 1);
    };

    $scope.edit = function (row) {
        metaboliteID = row;
        var params = {
            id: row
        };
        dataFactory.nutrientMetaboliteInitControl(params).then(function (response) {
            var result = response.data.nutrientMetaboliteList[0];
            $scope.ddlMolecular = result.nutrientID;
            mainID = result.id;
            $scope.GetMolecularList();          
            $scope.txtAbsorptionMin = result.absorptionMin;
            $scope.txtAbsorptionMax = result.absorptionMax;
            $scope.txtEliminationMin = result.eliminationMin;
            $scope.txtEliminationMax = result.eliminationMax;
            $scope.txtFormula = result.molecularFormula;
            $scope.txtRateQty = result.rateOfReaction;
            $scope.ddlUnit = result.reactionUnitID;
            $scope.ddlStudyType = result.studyTypeID;
            $scope.ddlToxicityUnit = result.toxicityUnitID;
            $scope.txtToxicity = result.toxicityValue;
            $scope.txtReference = result.reference;

            arr = [];
            $scope.nutrientMetaboliteTemp = JSON.parse(response.data.nutrientMetaboliteList[0].nutrientMetabolite);
            for (var i = 0; i < $scope.nutrientMetaboliteTemp.length; i++) {
                arr.push({
                    nutrientID: $scope.nutrientMetaboliteTemp[i].nutrientId,
                    nutrientName: $scope.nutrientMetaboliteTemp[i].nutrientName,
                    remark: $scope.nutrientMetaboliteTemp[i].remark
                });
            }            
            $scope.addedMetaboliteList = arr;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlMolecular = -1;
        $scope.txtAbsorptionMin = '';
        $scope.txtAbsorptionMax = '';
        $scope.txtEliminationMin = '';
        $scope.txtEliminationMax = '';
        $scope.txtFormula = '';
        $scope.txtRateQty = '';
        $scope.ddlUnit = -1;
        $scope.txttMax = '';
        $scope.txtHalf = '';
        $scope.ddlMetabolite = '';
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.ddlStudyType = '';
        $scope.ddlToxicityUnit = '';
        $scope.txtToxicity = '';
        metaboliteID = 0;
        $scope.addedMetaboliteList = '';
        arr = [];
        mainID = 0;
    };

    $scope.initControls();
});