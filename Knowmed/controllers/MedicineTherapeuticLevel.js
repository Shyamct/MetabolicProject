app.controller('medicineTherapeuticLevelCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var medicineTherapeuticLevelId = 0;
    $scope.initControls = function () {
        dataFactory.InitControlsMedSideEffect().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

        dataFactory.UnitMasterDoseList().then(function (response) {
            var result = response.data;
            $scope.unitList = result.unitMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };


    

    $scope.CheckMedicineTherapeuticLevelExistence = function (id) {
        var params = {
            medicineId: id
        };
        dataFactory.CheckMedicineTherapeuticLevelExistence(params).then(function (response) {
        }, function (error) {
            alert(error.data);
            $scope.ddlMedicine = -1;
            //  toaster.pop('error', "Error", error);
        });
    };


    $scope.GetMedicineTherapeuticLevel = function () {
        dataFactory.MedicineTherapeuticLevelList().then(function (response) {
            var result = response.data;
            $scope.medicineTherapeuticLevelList = result.medicineTherapeuticLevel;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.SaveMedicineTherapeuticLevel = function () {
        if ($scope.ddlMedicine == -1) {
            alert('Please Select Medicine');
            return false;
        }
        var params = {
            id: medicineTherapeuticLevelId,
            medicineId: $scope.ddlMedicine,
            rangeFrom: $scope.txtFrom,
            rangeTo: $scope.txtTo,
            unitId: $scope.ddlUnit,
            bookId: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineTherapeuticLevel(params).then(function (response) {

            var message = medicineTherapeuticLevelId > 0 ? 'Update Medicine Therapeutic Level' : 'Save Medicine Therapeutic Level';
            $rootScope.activityLog(response, message, 'Medicine Therapeutic Level', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetMedicineTherapeuticLevel();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.deleteMedicineTherapeuticLevel = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineTherapeuticLevel(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetMedicineTherapeuticLevel();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Medicine Therapeutic Level', 'Medicine Therapeutic Level', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        medicineTherapeuticLevelId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.MedicineTherapeuticLevelList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineTherapeuticLevel;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.txtFrom = list[0].rangeFrom;
            $scope.txtTo = list[0].rangeTo;
            $scope.ddlUnit = list[0].unitId;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
            $scope.txtReference = list[0].reference;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        medicineTherapeuticLevelId = 0;
        //$scope.ddlMedicine = -1;
        $scope.txtFrom = "";
        $scope.txtTo = "";
        $scope.ddlUnit = 0;
        //$scope.ddlBook = 0;
        //$scope.txtPageNo = "";
        //$scope.txtEdition = "";
        //$scope.txtReference = "";
        $scope.txtRemark = "";
       
    };
    $scope.initControls();
    $scope.GetMedicineTherapeuticLevel();
  
});