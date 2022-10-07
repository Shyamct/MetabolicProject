app.controller('nutrientCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, ASSETS) {
    var nutrientId = 0;
    $scope.addedSynonymList = [];
    $scope.selectedBloodBarrierList = [];

    $scope.initControls = function () {
        dataFactory.initControlsNutrient().then(function (response) {
            var result = response.data;
            $scope.nutrientCatList = result.nutrientCatList;
            $scope.nutrientTypeList = result.nutrientTypeList;
            $scope.unitList = result.unitList;

            $scope.initControlsNutrientBarrier();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetNutrientMasterList = function () {
        var params = {
            nutrientCategoryId: $scope.ddlNutrientCat
        };
        dataFactory.nutrientMasterList(params).then(function (response) {
            var result = response.data;
            $scope.nutrientMasterList = result.nutrientMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveNutrientMaster = function () {
        if (isEmpty($scope.txtNutrientName)) {
            toaster.pop('error', "Error", 'Please Enter Nutrient Name');
            return false;
        }
        var params = {
            id: nutrientId,
            nutrientTypeId: $scope.ddlNutrientType,
            nutrientCategoryId: $scope.ddlNutrientCat,
            nutrientName: $scope.txtNutrientName,
            tagName: $scope.txtTagName,
            unitID: $scope.ddlUnit,
            molecularWeight: $scope.txtMolecularWeight,
            molecularWeightUnitID: $scope.ddlMolecularWeightUnit,
            synonymNorthEast: $scope.txtSynNorthEast,
            synonymRural: $scope.txtSynRural,
            metabolicTypeId: $scope.ddlMetabolicType,
            hyperName: $scope.txtHyperName,
            lowerName: $scope.txtLowerName,
            description: $scope.txtDescription,
            synonymList: JSON.stringify($scope.addedSynonymList),
            listBloodBarrier: JSON.stringify($scope.selectedBloodBarrierList),
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveNutrientMaster(params).then(function (response) {  
            var list = response.data.tableRow;

            if (nutrientId > 0) {
                $rootScope.activityLog(response, 'UPDATE NUTRIENT MASTER', 'NUTRIENT MASTER', '');
            }
            else if (list && list.length > 0) {
                params.id = list[0].rowID;
                $rootScope.activityLog(response, 'SAVE NUTRIENT MASTER', 'NUTRIENT MASTER', '', JSON.stringify(params));
            }
            
            $scope.clear();
            $scope.GetNutrientMasterList();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {            
            toaster.pop('error', "Error", error.data);
            $rootScope.activityLog(error, 'SAVE NUTRIENT MASTER', 'NUTRIENT MASTER', '');
            //toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.edit = function (indexVal1, paramid) {
        nutrientId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.nutrientMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.nutrientMasterList;
            $scope.ddlNutrientType = list[0].nutrientTypeId;
            $scope.ddlNutrientCat = list[0].nutrientCategoryId;
            $scope.txtNutrientName = list[0].nutrientName;
            $scope.txtTagName = list[0].tagName;
            $scope.ddlUnit = list[0].unitID;
            $scope.txtMolecularWeight = list[0].molecularWeight;
            $scope.ddlMolecularWeightUnit = list[0].molecularWeightUnitID;
            $scope.txtSynNorthEast = list[0].synonymNorthEast;
            $scope.txtSynRural = list[0].synonymRural;
            $scope.ddlMetabolicType = list[0].metabolicTypeId;
            $scope.txtHyperName = list[0].hyperName;
            $scope.txtLowerName = list[0].lowerName;
            $scope.txtDescription = list[0].description;
            $scope.addedSynonymList = result.synonymList;
            $scope.getNutrientBarrierDetails();

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteNutrientMaster(params).then(function (response) {
                $scope.clear();
                $scope.GetNutrientMasterList();
                toaster.pop('success', "Success", 'Deleted Successfully.');

                $rootScope.activityLog(response, 'DELETE NUTRIENT MASTER', 'NUTRIENT MASTER', '');

            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.AddSynonym = function () {
        if (isEmpty($scope.txtSynonym)) {
            toaster.pop('error', "Error", 'Please Enter Synonym');
            return false;
        }
        for (var i = 0; i < $scope.addedSynonymList.length; i++) {
            if ($scope.addedSynonymList[i].synonym == $scope.txtSynonym) {
                toaster.pop('error', "Error", " Already Added");
                return false;
            }
        }
        $scope.addedSynonymList.push({
            synonym: $scope.txtSynonym
        });
    };
    $scope.deleteAddedSynonymList = function (index) {
        $scope.addedSynonymList.splice(index, 1);
    };

    $scope.search = function (item) {
        if (isEmpty($scope.searchText)) {
            return true;
        }
        else {
            if (item.nutrientName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
                item.lowerName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
                item.synonymList.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
                return true;
            }
        }
        return false;
    };  

    $scope.getNutrientBarrierDetails = function () {
        var params = {
            nutrientID: nutrientId
        };
        dataFactory.NutrientBarrierList(params).then(function (response) {
            var result = response.data;
            $scope.selectedBloodBarrierList = result.nutrientBarrierList;

            log($scope.selectedBloodBarrierList);

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.addBloodBarrier = function () {
        if ($scope.ddlTransporter == 0) {
            toaster.pop('error', "Error", 'Select Transporter');
            return false;
        }
        for (var i = 0; i < $scope.selectedBloodBarrierList.length; i++) {
            if ($scope.selectedBloodBarrierList[i].inOut == $scope.isIn && $scope.selectedBloodBarrierList[i].transporterID == $scope.ddlTransporter) {
                toaster.pop('error', "Error", 'Already Added');
                return false;
            }
        }
        $scope.selectedBloodBarrierList.push({
            isCross: $scope.isCross,
            isIn: $scope.isIn,
            inOutText: $scope.isIn == 1 ? 'In' : $scope.isIn == 0 ? 'Out' : '',
            transporterID: $scope.ddlTransporter,
            transporter: $("#ddlTransporter option:selected").text().trim(),
            remark: $scope.txtBloodBarrierRemark,
            url: $scope.txtBloodBarrierUrl
        });
    };

    $scope.deleteBloodBarrier = function (index) {
        $scope.selectedBloodBarrierList.splice(index, 1);
    };

    $scope.initControlsNutrientBarrier = function () {
        dataFactory.InitControlsNutrientBarrier().then(function (response) {
            var result = response.data;
            $scope.transporterList = result.transporterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clear = function () {
        nutrientId = 0;
        $scope.addedSynonymList = [];
        $scope.selectedBloodBarrierList = [];

        $scope.txtBloodBarrierUrl = '';
        $scope.txtBloodBarrierRemark = '';
        $scope.ddlTransporter = 0;
        $scope.isCross = '';
        $scope.isIn = '';
    };  
	
	$scope.getFoodValues = function (id) {
        $('#myModal').modal('show');
        var obj = {
            nutrientID: id
        };
        dataFactory.getFoodValues(obj).then(function (response) {
            var result = response.data;
            console.log(result);
            $scope.foodValuesList = result.foodValuesList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
	

    $scope.initControls();
});