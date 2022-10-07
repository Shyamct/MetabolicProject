app.controller('medicineDoseCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existId = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineDose().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.problemList = result.problemList;
            $scope.ageUnitList = result.ageUnitList;
            $scope.doseUnitList = result.doseUnitList;
            $scope.routeAdministrationList = result.routeAdministrationList;
            $scope.frequencyList = result.frequencyList; 
            $scope.dosageFormList = result.dosageFormList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getMedicineDose = function () {
        $scope.clr();
        var params = {
            id: existId
        };
        dataFactory.MedicineDoseList(params).then(function (response) {
            var result = response.data;
            $scope.medicineDoseList = result.medicineDoseList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveMedicineDose = function () {

        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        //if ($scope.txtDoseFrom == '') {
        //    $scope.txtDoseFrom = 0;
        //}
        //if ($scope.txtAgeMin == '') {
        //    $scope.txtAgeMin = 0;
        //}
        //if ($scope.txtAgeMax == '') {
        //    $scope.txtAgeMax = 0;
        //}
        //if ($scope.txtWeightFrom == '') {
        //    $scope.txtWeightFrom = 0;
        //}
        //if ($scope.txtWeightTo == '') {
        //    $scope.txtWeightTo = 0;
        //}
        //if ($scope.txtDoseTo == '') {
        //    $scope.txtDoseTo = 0;
        //}
     
        var params = {
            id: existId,
            medicineID: $scope.ddlMedicine,
            indicationID: $scope.ddlProblem,
            indicationRemark: $scope.txtIndicationRemark,
            doseFor: $scope.rdDoseForAdult == 'A' ? 'A' : $scope.rdDoseForPaedia == 'P' ? 'P' : null,
            ageMin: $scope.txtAgeMin,
            ageMax: $scope.txtAgeMax,
            ageUnit: $scope.ddlAgeUnit,
            ageUnitFrom: $scope.ddlAgeUnitFrom,
            weightFrom: $scope.txtWeightFrom,
            weightTo: $scope.txtWeightTo,
            routeAdministrationID: $scope.ddlRouteAdministration,
            frequencyID: $scope.ddlFrequency,
            doseFrom: $scope.txtDoseFrom,
            doseTo: $scope.txtDoseTo,
            dosageID: $scope.ddlDosage,
            doseUnitID: $scope.ddlDoseUnit,
            doseUnitFrom: $scope.ddlDoseUnitFrom,
            remark: $scope.txtRemark,   
            bookID: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            reference: $scope.txtReference,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineDose(params).then(function (response) {
            var message = existId > 0 ? 'Update Medicine Dose' : 'Save Medicine Dose';
            $rootScope.activityLog(response, message, 'Medicine Dose', '');
            $scope.getMedicineDose();
            toaster.pop('success', "Success", 'Saved Successfully.');
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
            dataFactory.DeleteMedicineDose(params).then(function (response) {
                $scope.getMedicineDose();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Medicine Dose', ' Medicine Dose', '');
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
        dataFactory.MedicineDoseList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineDoseList;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlProblem = list[0].problemID;
            $scope.txtIndicationRemark = list[0].indicationRemark;
            $scope.rdDoseForAdult = list[0].doseFor == 'Adult' ? 'A' : false;
            $scope.rdDoseForPaedia  = list[0].doseFor == 'Paedia' ? 'P' : false;
            $scope.txtAgeMin = list[0].ageMin;
            $scope.txtAgeMax = list[0].ageMax;
            $scope.ddlAgeUnit = list[0].ageUnitID;
            $scope.ddlAgeUnitFrom = list[0].ageUnitFrom;
            $scope.txtWeightFrom = list[0].weightFrom;
            $scope.txtWeightTo = list[0].weightTo;
            $scope.ddlRouteAdministration = list[0].routeAdministrationID;
            $scope.ddlFrequency = list[0].frequencyID;
            $scope.txtDoseFrom = list[0].doseFrom;
            $scope.txtDoseTo = list[0].doseTo;
            $scope.ddlDosage = list[0].dosageID;
            $scope.ddlDoseUnit = list[0].doseUnitID;
            $scope.ddlDoseUnitFrom = list[0].doseUnitFrom;
            $scope.txtRemark = list[0].remark;
            $scope.ddlbookname = list[0].bookID;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;
            $scope.txtReference = list[0].reference
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.changeAdultRadio = function () {       
        if ($scope.rdDoseForAdult == 'A') {
            $scope.rdDoseForPaedia = 0;
        } else {
            $scope.rdDoseForAdult = 0;
        }
    };
    $scope.changePaediaRadio = function () {
        if ($scope.rdDoseForPaedia == 'P') {
            $scope.rdDoseForAdult = 0;
        } else {
            $scope.rdDoseForPaedia = 0;
        }
    };

    $scope.clr = function () {  
       // $scope.ddlProblem = 0;
        $scope.rdDoseForAdult = 0;
        $scope.rdDoseForPaedia = 0;
        $scope.txtAgeMin = '';
        $scope.txtAgeMax = '';
        $scope.ddlAgeUnit = 0;
        $scope.ddlAgeUnitFrom = 0;
        $scope.txtWeightFrom = '';
        $scope.txtWeightTo = '';
        $scope.ddlRouteAdministration = 0;
        $scope.ddlFrequency = 0;
        $scope.txtDoseFrom = '';
        $scope.txtDoseTo = '';
        $scope.ddlDosage = 0;
        $scope.ddlDoseUnit = 0;
        $scope.ddlDoseUnitFrom = 0;
        //$scope.txtRemark = '';
        //$scope.ddlBook = 0;
        //$scope.txtPageNo = '';
        $scope.txtIndicationRemark = '';
        //$scope.txtEdition = '';
        existId = 0;
    };

    $scope.initControls();
    $scope.getMedicineDose();
});