app.controller('nutrientMedicineInteractionCtrl', function ($scope, dataFactory, toaster) {

    var nutMedIinteractionId = 0;
    var effectId = 0;
    var interactionId = 0;
    var problemList = [];
    var vitalList = [];
    var testList = [];
    var arr = [];
    $scope.addedInteractionEffect = "";
    $scope.BindAllData = function () {
        dataFactory.BindAllNutMedInteractionList().then(function (response) {
            var result = response.data;
            $scope.NutrientList = result.nutrientMaster;
            $scope.MedicineList = result.medicineMaster;
            $scope.InteractionTypeList = result.interactionType;
            $scope.InteractionEffectList = result.statusMaster;
            problemList = result.problemMaster;
            
            vitalList = result.vitalMaster;
            testList = result.investigationSubTest;
            $scope.NutMedActInteractionList = result.nutrientMedicineInteraction;
            $scope.EffectTypeList = result.effectType;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.loadParameter = function () {
        //debugger;
        if ($scope.ddlEffectType == 9 || $scope.ddlEffectTypeEdit == 9) {
            $scope.effectParameterList = problemList;
        }
        else if ($scope.ddlEffectType == 10 || $scope.ddlEffectTypeEdit == 10) {
            $scope.effectParameterList = vitalList;
        }
        else if ($scope.ddlEffectType == 11 || $scope.ddlEffectTypeEdit == 11) {
            $scope.effectParameterList = testList;
        }
        
    };


    $scope.addInteractionEffect = function () {
        if ($scope.ddlEffectType == "") {
            toaster.pop('error', "Error", 'Please Select Effect Type');
            return false;
        }
        if ($scope.ddlEffectParameter == "") {
            toaster.pop('error', "Error", 'Please Select Effect Parameter');
            return false;
        }
        if ($scope.ddlEffect == "") {
            toaster.pop('error', "Error", 'Please Select Effect ');
            return false;
        }

        for (var i = 0; i < $scope.addedInteractionEffect.length; i++) {
            if ($scope.addedInteractionEffect[i].effectTypeID == $scope.ddlEffectType && $scope.addedInteractionEffect[i].effectParameterID == $scope.ddlEffectParameter && $scope.addedInteractionEffect[i].effectID == $scope.ddlEffect) {
                toaster.pop('error', "Error", "Already Added");
                return false;
            }

        }
        
        arr.push({
            effectTypeID: $("#ddlEffectType").val(),
            effectType: $("#ddlEffectType option:selected").text(),
            effectParameterID: $("#ddlEffectParameter").val(),
            effectParameter: $("#ddlEffectParameter option:selected").text(),
            effectID: $("#ddlEffect").val(),
            effect: $("#ddlEffect option:selected").text(),
            txtRemark1: $("#txtRemark1").text()

        });
       
        $scope.addedInteractionEffect = arr;
    };
    $scope.deleteaddedInteractionEffect = function (index) {
        $scope.addedInteractionEffect.splice(index, 1);
    };


    //add

    $scope.SaveNutMedInteraction = function () {
        var params = {
            id: nutMedIinteractionId,
            medicineID: $scope.ddlMedicine,
            nutrientID: $scope.ddlNutrient,
            interactionTypeID: $scope.ddlInteractionType,
            interactionEffect: $scope.ddlInteractionEffect,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            url: $scope.txtURL,         
            effectTypeID: $scope.ddlEffectType,   // Nutrient Medicine Interaction Effect Table
            effectParameterID: $scope.ddlEffectParameter,
            effectID: $scope.ddlEffect,
            remark1: $scope.txtRemark1,
            lstNutrientMedicineInteraction: $scope.addedInteractionEffect,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveNutrientMedicineInteraction(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clearControls();
            $scope.BindAllData();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };






    $scope.viewInteractionEffect = function (paramId) {
        interactionId = paramId;
        var param = {
            interactionID: paramId
        };
        dataFactory.NutMedInteractionEffectList(param).then(function (response) {
            var result = response.data;
            $scope.effectFunctionList = result.effectList;
            $('#myModal').modal('show');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.editEffect = function (paramid) {
        effectId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.individualEffectList(params).then(function (response) {
            var result = response.data;
            var list = result.intdividualEffectList;

            $scope.ddlEffectTypeEdit = list[0].effectTypeID;
            $scope.loadParameter();
            $scope.ddlEffectParameterEdit = list[0].effectParameterID;
            $scope.ddlEffectEdit = list[0].effectID;
            $scope.txtRemark1Edit = list[0].remark1;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };




    $scope.saveEffect = function () {
        if ($scope.ddlEffectTypeEdit == "") {
            toaster.pop('error', "Error", 'Please Select Effect Type');
            return false;
        }
        if ($scope.ddlEffectParameterEdit == "") {
            toaster.pop('error', "Error", 'Please Select Effect Parameter');
            return false;
        }
        if ($scope.ddlEffectEdit == "") {
            toaster.pop('error', "Error", 'Please Select Effect ');
            return false;
        }
        var params = {
            id: effectId,
            interactionID: interactionId,
            effectTypeID: $scope.ddlEffectTypeEdit,   // Nutrient Medicine Interaction Effect Table
            effectParameterID: $scope.ddlEffectParameterEdit,
            effectID: $scope.ddlEffectEdit,
            remark1: $scope.txtRemark1Edit,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveEffect(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.viewInteractionEffect(interactionId);
            $scope.clearControls();
            $scope.BindAllData();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteEffect = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.DeleteEffect(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.viewInteractionEffect(interactionId);
                $scope.clearControls();
                $scope.BindAllData();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.DeleteNutrientMedicineInteraction(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.BindAllData();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        $scope.isDisabled = true;
        nutMedIinteractionId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.BindAllNutMedInteractionList(params).then(function (response) {
            var result = response.data;
            var list = result.nutrientMedicineInteraction;
           
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlInteractionType = list[0].interactionTypeID;
            $scope.ddlInteractionEffect = list[0].interactionEffect;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference;
            $scope.txtURL = list[0].url;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $(function () {
       
        // when the modal is closed
        $('#myModal').on('hidden.bs.modal', function () {
            interactionId = 0;
          
        });
    });
    $scope.clearControls = function () {
        $scope.isDisabled = false;
        nutMedIinteractionId = 0;
        effectId = 0;
        $scope.ddlMedicine = '';
        $scope.ddlNutrient = '';
        $scope.ddlInteractionType = '';
        $scope.ddlInteractionEffect = '';
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtURL = '';
        $scope.ddlEffectType = '';
        $scope.ddlEffectParameter = '';
        $scope.ddlEffect = '';
        $scope.txtRemark1 = '';
        $scope.ddlEffectTypeEdit = '';
        $scope.ddlEffectParameterEdit = '';
        $scope.ddlEffectEdit = '';
        $scope.txtRemark1Edit = '';
        $scope.addedInteractionEffect = '';
    };

    $scope.BindAllData();

    $scope.myFilter = function (item) {
        return item === 'NutrientInteraction';
    };
});