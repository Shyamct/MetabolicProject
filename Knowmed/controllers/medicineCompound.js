app.controller('medicineCompoundCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, ASSETS) {
    var medicineCompoundID = 0;
    $scope.initControlsMedicineCompound = function () {
        dataFactory.initControlsMedicineCompound().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.compoundList = result.compoundList;
            $scope.bookList = result.bookList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.bindUnit = function (uni) {
        
        for (var i = 0; i < $scope.compoundList.length; i++) {
            if ($scope.compoundList[i].compoundID == uni) {
                $scope.compoundUnitID = $scope.compoundList[i].unitID;
                $scope.compoundUnit = $scope.compoundList[i].unitName;
            }
        }
    };

    $scope.getMedicineCompoundList = function () {
        var params = {
            medicineID: $scope.ddlMedicine
        };
        dataFactory.medicineCompoundList(params).then(function (response) {
            var result = response.data;
          
            $scope.brandList = result.brandList;
           
            
            $scope.medicineCompoundList = result.medicineCompoundList;
            $scope.doseUnitList = result.doseUnitList;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.getCompoundUnitList = function () {
        var params = {
            compoundID: $scope.ddlCompound
        };
        dataFactory.medicineCompoundUnitList(params).then(function (response) {
            var result = response.data;
            $scope.compoundUnit = result.compoundUnit[0].unit;
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };



    $scope.saveMedicineCompound = function () {
        var params = {
            medicineCompoundID: medicineCompoundID,
            medicineId: $scope.ddlMedicine,
            brandID: $scope.ddlBrand,
            doseQty: $scope.txtDoseQty,
            doseUnitID: $scope.ddlDoseUnit,
            compoundID: $scope.ddlCompound,
            compoundQuantity: $scope.txtCompoundQty,
            reference: $scope.txtReference,
            remark: $scope.txtRemark,
            bookID: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            quantityUnitID: $scope.compoundUnitID,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveMedicineCompound(params).then(function (response) {
            var message = medicineCompoundID > 0 ? 'Update Medicine Compound ' : 'Save Medicine Compound ';
            $rootScope.activityLog(response, message, 'Medicine Compound ', '');

            medicineCompoundID = 0;
            $scope.getMedicineCompoundList();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.editMedicineCompound = function (medicineID, paramid) {
        medicineCompoundID = paramid;
        var params = {
            medicineCompoundID: paramid,
            medicineID: medicineID
        };
        dataFactory.medicineCompoundList(params).then(function (response) {
            var result = response.data;
           
            var list = result.medicineCompoundList;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlBrand = list[0].medicineBrandID;
            $scope.txtDoseQty = list[0].medicineDose,
            $scope.ddlDoseUnit = list[0].doseUnitID,
            $scope.ddlCompound = list[0].nutrientID,
            $scope.txtCompoundQty = list[0].nutrientQuantity,
            $scope.txtReference = list[0].reference,
            $scope.txtReference = list[0].remark,
            $scope.ddlbookname = list[0].bookID,
            $scope.txtpageno = list[0].pageNo,
            $scope.txtedition = list[0].edition
            $scope.compoundUnitID = list[0].quantityUnitID,
            $scope.compoundUnit = list[0].quantityUnitName
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.deleteMedicineCompound = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                medicineCompoundID : id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteMedicineCompound(params).then(function (response) {
                medicineCompoundID = 0;
                $scope.getMedicineCompoundList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Medicine Compound', 'Medicine Compound', '');
            }, function (error) {
                toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
            });
        }
    };
    $scope.initControlsMedicineCompound();
    //$scope.clr();
});