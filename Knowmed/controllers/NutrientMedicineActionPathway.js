app.controller('nutrientMedicineActionPathwayCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var NutMedActPathwayId = 0;

    $scope.BindAllNutMedList = function () {
        dataFactory.BindAllNutMedActPathwayList().then(function (response) {
            var result = response.data;
            $scope.NutrientList = result.nutrientMaster;
            $scope.MedicineList = result.medicineMaster;
            $scope.MechanismList = result.statusMaster;
            $scope.PathwayList = result.pathwayMaster;
            $scope.NutMedActPathwayList = result.nutrientMedicineActionPathway;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveNutMedActPathway = function () {
        var params = {
            id: NutMedActPathwayId,
            medicineID: $scope.ddlMedicine,
            nutrientID: $scope.ddlNutrient,
            actionMechanismID: $scope.ddlMechanism,
            pathwayID: $scope.ddlPathway,
            pathwayDescription: $scope.txtDescription,
            reference: $scope.txtReference,
            url: $scope.txtURL,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)

        };
        dataFactory.SaveNutrientMedicineActionPathway(params).then(function (response) {

            var message = nutrientBarrierID > 0 ? 'Update Nutrient Medicine Action Pathway' : 'Save Nutrient Medicine Action Pathway';
            $rootScope.activityLog(response, message, 'Nutrient Medicine Action Pathway', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clearControls();
            $scope.BindAllNutMedList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.clearControls = function () {
        NutMedActPathwayId = 0;
       // $scope.ddlMedicine = '';
        $scope.ddlNutrient = '';
        $scope.ddlMechanism = '';
        $scope.ddlPathway = '';
        $scope.txtReference = '';
        $scope.txtDescription = '';
        $scope.txtURL = '';
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.DeleteNutrientMedicineActionPathway(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.BindAllNutMedList();
                $rootScope.activityLog(response, 'Delete Nutrient Medicine Action Pathway', ' Nutrient Medicine Action Pathway', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        NutMedActPathwayId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.BindAllNutMedActPathwayList(params).then(function (response) {
            var result = response.data;
            var list = result.nutrientMedicineActionPathway;
            $scope.ddlNutrient = list[0].nutrientID;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlMechanism = list[0].actionMechanismID;
            $scope.ddlPathway = list[0].pathwayID;
            $scope.txtDescription = list[0].pathwayDescription;
            $scope.txtReference = list[0].reference;
            $scope.txtURL = list[0].url;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.BindAllNutMedList();
});