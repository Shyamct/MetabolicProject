app.controller('medicineContraIndicationCtrl', function ($scope, dataFactory, toaster, $rootScope) {   
    var existId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineContraIndication().then(function (response) {
            var result = response.data;           
            $scope.medicineList = result.medicineList;
            $scope.contraIindicationTypeList = result.contraIindicationTypeList;
            $scope.problemList = result.problemList;
            $scope.bodyOrganRegionList = result.bodyOrganRegionList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.getMedicineContraIndication = function () {        
        var params = {
            id: existId,
            medicineId: $scope.ddlMedicine
        };
        dataFactory.MedicineContraIndicationList(params).then(function (response) {
            var result = response.data;
            $scope.medicineContraIndicationList = result.medicineContraIndicationList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveMedicineContraIndication = function () {
       
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
       
        var params = {
            id: existId,
            medicineID: $scope.ddlMedicine,
            indicationTypeID: $scope.ddlIndicationType,
            contraIndication: $scope.txtindication,
            contraIndicationID: $scope.ddlContraIndication,
            isAbsolute: $scope.chkIsAbsolute == true ? 1 : null,
            isWatchable: $scope.chkIsWatchable == true ? 1 : null,
            affectedOrganID: $scope.ddlAffectedOrgan,
            caution: $scope.txtCaution,
            reference: $scope.txtReference,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            remark: $scope.txtRemark,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineContraIndication(params).then(function (response) {
            var message = existId > 0 ? 'Update Medicine Contra Indication' : 'Save Medicine Contra Indication';
            $rootScope.activityLog(response, message, 'Medicine Contra Indication', '');
            $scope.clr();
            $scope.getMedicineContraIndication();
            toaster.pop('success', "Success", 'Saved Successfully.');            
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
            dataFactory.DeleteMedicineContraIndication(params).then(function (response) {
                $scope.getMedicineContraIndication();
                toaster.pop('success', "Success", 'Deleted Successfully.');    
                $rootScope.activityLog(response, 'Delete Medicine Contra Indication', ' Medicine Contra Indication', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        existId = paramid;
        var params = {
            id: paramid,
            medicineId: $scope.ddlMedicine
        };
        dataFactory.MedicineContraIndicationList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineContraIndicationList;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlIndicationType = list[0].indicationTypeID;
            $scope.ddlContraIndication = list[0].contraIndicationID;
            $scope.txtindication = list[0].contraIndication;
            $scope.chkIsAbsolute = list[0].isAbsolute == 'Yes' ? true : false;
            $scope.chkIsWatchable = list[0].isWatchable == 'Yes' ? true : false;
            $scope.ddlAffectedOrgan = list[0].affectedOrganID;
            $scope.txtCaution = list[0].caution;
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
      //  $scope.ddlMedicine = 0;
        $scope.ddlIndicationType = 0;
        $scope.ddlContraIndication = 0;
        $scope.txtindication = '';
        $scope.chkIsAbsolute = false;
        $scope.chkIsWatchable = false;
        $scope.ddlAffectedOrgan = 0;
        $scope.txtCaution = '';
        // $scope.ddlBook = 0;
        // $scope.txtPageNo = '';
        // $scope.txtEdition = '';
        // $scope.txtReference = '';
        // $scope.txtRemark = '';
        existId = 0;
    };

    $scope.initControls();
    $scope.getMedicineContraIndication();
});