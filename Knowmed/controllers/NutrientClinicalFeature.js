app.controller('nutrientClinicalFeatureCtrl', function ($scope, dataFactory, toaster, $rootScope) {   
    var existId = 0;  
    $scope.isDisabledP = false;
    var arr = [];
    var mainID = 0;
    var nutritionDerangeID = 0;
    var arr1 = [];
    $scope.addedOccupationList = "";
    $scope.addedProblemList = "";

    $scope.initControls = function () {
        dataFactory.InitControlsNutrientClinicalFeature().then(function (response) {
            var result = response.data;           
            $scope.nutrientList = result.nutrientList;
            $scope.effectList = result.effectList;
            $scope.problemList = result.problemList;
            $scope.occupationList = result.occupationList;
            $scope.effectLevelList = result.effectLevelList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.GetNutrientClinicalFeatureList = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.NutrientClinicalFeatureList(params).then(function (response) {
            var result = response.data;
            $scope.nutrientClinicalFeatureList = result.nutrientClinicalFeatureList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  // modification start here
    $scope.AddProblem = function () {
        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        if ($scope.ddlEffect == 0) {
            toaster.pop('error', "Error", 'Please Select Effect');
            return false;
        }
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        for (var i = 0; i < $scope.addedProblemList.length; i++) {
            if ($scope.addedProblemList[i].nutrientID == $scope.ddlNutrient && $scope.addedProblemList[i].effectId == $scope.ddlEffect && $scope.addedProblemList[i].problemID == $scope.ddlProblem) {
                toaster.pop('error', "Error", 'Already Assigned This Nutrient For This Problem ');
                return false;
            }
        }        
        arr.push({
            index: i,
            nutrientID: $("#ddlNutrient").val(),
            nutrientName: $("#ddlNutrient option:selected").text().trim(),
            effectId: $("#ddlEffect").val(),
            effectTypeStatus: $("#ddlEffect").val(),
            effect: $("#ddlEffect option:selected").text().trim(),
            problemID: $("#ddlProblem").val(),
            problemName: $("#ddlProblem option:selected").text().trim(),
            effectLevelID: $("#ddlProblemLevel").val(),
            effectLevel: $("#ddlProblemLevel option:selected").text().trim()
        });
        
        $scope.addedProblemList = arr;
    };
    $scope.deleteProblemList = function (index) {
        $scope.addedProblemList.splice(index, 1);
    };

    $scope.AddOccupation = function () {       
        if ($scope.ddlOccupation == 0) {
            toaster.pop('error', "Error", 'Please Select Occupation');
            return false;
        }
        for (var ii = 0; ii < $scope.addedOccupationList.length; i++) {
            if ($scope.addedOccupationList[ii].occupationID == $scope.ddlOccupation) {
                toaster.pop('error', "Error", 'Already Assigned This Occupatiopn ');
                return false;
            }
        }
        arr1.push({         
            index: ii,
            occupationID: $("#ddlOccupation").val(),
            occupationName: $("#ddlOccupation option:selected").text().trim()
        });
        $scope.addedOccupationList = arr1;
        
    };
    $scope.deleteOccupationList = function (index) {
        $scope.addedOccupationList.splice(index, 1);
    };


    //end here
    $scope.saveNutrientClinicalFeature= function () {
       
        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        if ($scope.ddlEffect == 0) {
            toaster.pop('error', "Error", 'Please Select Effect');
            return false;
        }
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        if (existId == null) {
            if ($scope.addedProblemList.length < 1) {
                toaster.pop('error', "Error", 'Please Add Clinical Features');
                return false;
            }
        }
        
        var params = {
            id: existId,
            nutrientID: $scope.ddlNutrient,
            effectTypeStatus: $scope.ddlEffect,
            lstNutrientClinicalFeatureList: $scope.addedProblemList,
            lstOccupationList: $scope.addedOccupationList,
            problemID: $scope.ddlProblem,
            effectLevelID: $scope.ddlProblemLevel,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveNutrientClinicalFeature(params).then(function (response) {
            var message = existId > 0 ? 'Update Nutrient Clinical Feature' : 'Save Nutrient Clinical Feature';
            $rootScope.activityLog(response, message, 'Nutrient Clinical Feature', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetNutrientClinicalFeatureList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteNutrientClinicalFeature(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetNutrientClinicalFeatureList();
                $rootScope.activityLog(response, 'Delete Nutrient Clinical Feature', ' Nutrient Clinical Feature', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.viewOccupation = function (paramId) {
        nutritionDerangeID = paramId;
        var param = {
            nutritionDerangeID: paramId
        };
        dataFactory.NutritionDerangeOcuupationList(param).then(function (response) {
            var result = response.data;
            $scope.NutritionDerangeOcuupationList = result.nutritionDerangeOcuupation;
            $('#myModal').modal('show');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.editOccupation = function (paramid) {
        mainID = paramid;
        
        var params = {
            id: paramid,
            nutritionDerangeID: nutritionDerangeID
        };
        
        dataFactory.NutritionDerangeOcuupationList(params).then(function (response) {
            var result = response.data;
            var list = result.nutritionDerangeOcuupation;
            $scope.ddlOccupation2 = list[0].occupationID;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.saveOccupation = function () {
        
        if ($scope.ddlOccupation2 == 0) {
            toaster.pop('error', "Error", 'Select Occupation !!');
            return false;
        }
        
        var params = {
            id: mainID,
            nutritionDerangeID: nutritionDerangeID,
            occupationID: $scope.ddlOccupation2,
            
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveOccupation(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
           
            $scope.ddlOccupation2=0;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteOccupation = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteOccupation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.viewOccupation(id);
                $scope.ddlOccupation2 = 0;
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        $scope.isDisabledP = true;
        existId = paramid;
        var params = {
            id: paramid
        };
        
        dataFactory.NutrientClinicalFeatureList(params).then(function (response) {
            var result = response.data;           
            var list = result.nutrientClinicalFeatureList;
            $scope.ddlNutrient = list[0].nutrientID;  
            $scope.ddlEffect = list[0].effectId;  
            $scope.ddlProblem = list[0].problemID;
            $scope.ddlProblemLevel = list[0].effectLevelID;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference; 
            $scope.txtUrl = list[0].url; 
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {  
        $scope.isDisabledP = false;
        arr = [];
        arr1 = [];
        $scope.ddlNutrient = 0;
        $scope.ddlEffect = 0;
        $scope.ddlProblem = 0;
        $scope.ddlProblemLevel = 0;
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtUrl = '';   
        existId = 0;
        $scope.addedOccupationList = "";
        $scope.addedProblemList = "";
    };
    $(function () {
        // when the modal is closed
        $('#myModal').on('hidden.bs.modal', function () {
            mainID = 0;
            nutritionDerangeID = 0;
            $scope.ddlOccupation2 = 0;
        });
    });
    $scope.initControls();
    $scope.GetNutrientClinicalFeatureList();
});