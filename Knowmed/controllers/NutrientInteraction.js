app.controller('nutrientInteractionCtrl', function ($scope, dataFactory, $rootScope, toaster, $state) {   
    var existId = 0;  
    //var type = '';
    $scope.initControls = function () {
        dataFactory.InitControlsNutrientInteraction().then(function (response) {
            var result = response.data;           
            $scope.nutrientList = result.nutrientList;  
            $scope.interactionTypeList = result.interactionTypeList;
            $scope.interactionNutrientLists = result.interactionNutrientList;  
            $scope.interactionFoodList = result.interactionFoodList;  
            if (!isEmpty($state.params.id)) {
                $scope.ddlNutrient = $state.params.id;
                $('#ddlNutrient').prop("disabled", 'disabled');
                $scope.getSelectedNutrientInteractionList();
            }  
            $scope.diseaseList = result.diseaseList;  
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };    
    $scope.loadInteractionWith = function () {
        $scope.ddlInteractedNutrient = 0;
        if ($scope.ddlInteractionWithType != 0) {
            if ($scope.ddlInteractionWithType == 'F') {
                //type = 'F';
                $scope.interactionNutrientList = $scope.interactionFoodList;
            }
            else if ($scope.ddlInteractionWithType == 'N') {
                //type = 'N';
                $scope.interactionNutrientList = $scope.interactionNutrientLists;
            }
        }
        else {
            $scope.interactionNutrientList = '';
        }
    };
    $scope.GetNutrientInteractionList = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.NutrientInteractionList(params).then(function (response) {
            var result = response.data;
            $scope.nutrientInteractionList = result.nutrientInteractionList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getSelectedNutrientInteractionList = function () {       
        var params = {
            nutrientID: $scope.ddlNutrient
        };
        dataFactory.NutrientInteractionList(params).then(function (response) {
            var result = response.data;
            $scope.nutrientInteractionSelectedList = result.nutrientInteractionList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveNutrientInteraction = function () {    

        if ($scope.ddlNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Nutrient');
            return false;
        }
        if ($scope.ddlInteractionType == -1) {
            toaster.pop('error', "Error", 'Please Select Interaction Type');
            return false;
        }
        if ($scope.ddlInteractedNutrient == 0) {
            toaster.pop('error', "Error", 'Please Select Interaction With');
            return false;
        }

        var params = {
            id: existId,
            nutrientID: $scope.ddlNutrient,
            interactedNutrientID: $scope.ddlInteractedNutrient,
            interactionType: $scope.ddlInteractionType,
            interactionWithType: $scope.ddlInteractionWithType,
            effect: $scope.txtEffect,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            dockingScore: $scope.txtDockingScore,
            diseaseID: $scope.ddlDiseaseName,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveNutrientInteraction(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = existId > 0 ? 'UPDATE NUTRIENT INTERACTION' : 'SAVE NUTRIENT INTERACTION';
            $rootScope.activityLog(response, message, 'NUTRIENT INTERACTION', '');

            $scope.GetNutrientInteractionList();
            if ($scope.ddlNutrient != '-1') {
                $scope.getSelectedNutrientInteractionList();
            }
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteNutrientInteraction(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.GetNutrientInteractionList();
                $scope.getSelectedNutrientInteractionList();
                $rootScope.activityLog(response, 'DELETE NUTRIENT INTERACTION', 'NUTRIENT INTERACTION', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        existId = paramid;
        var params = {
            id: paramid
        };

        dataFactory.NutrientInteractionList(params).then(function (response) {
            var result = response.data;           
            var list = result.nutrientInteractionList;   

            $scope.interactionNutrientList = '';
            $scope.ddlInteractionWithType = 0;
            $scope.ddlNutrient = list[0].nutrientID;  
            if (list[0].interactionWithType == 'F') {
                //type = 'F';
                $scope.interactionNutrientList = $scope.interactionFoodList;
            }
            else if (list[0].interactionWithType == 'N') {
                //type = 'N';
                $scope.interactionNutrientList = $scope.interactionNutrientLists;
            }
            $scope.ddlInteractedNutrient = list[0].interactedNutrientID;  
            $scope.ddlInteractionType = list[0].interactionType;  
            //$scope.ddlInteractionWithType = list[0].interactionWithType === 'N' ? 'Nutrient' : list[0].interactionWithType === 'F' ? 'Food' : 0;   
            $scope.ddlInteractionWithType = list[0].interactionWithType;   
            $scope.txtEffect = list[0].effect;  
            $scope.txtReference = list[0].reference;  
            $scope.txtUrl = list[0].url; 
            $scope.txtDockingScore = list[0].dockingScore; 
            $scope.ddlDiseaseName = list[0].diseaseID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clr = function () {  
        
        //$scope.ddlInteractedNutrient = 0;
        //$scope.txtEffect = '';
        //$scope.txtReference = '';
        //$scope.txtUrl = '';  
        existId = 0;
        //type = '';
        //$scope.ddlInteractionWithType = 0; 
        //$scope.interactionNutrientList = '';
    };
    $scope.initControls();
    $scope.GetNutrientInteractionList();
});