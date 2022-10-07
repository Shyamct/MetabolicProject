app.controller('brandMedicineAssignCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    var tableRowId = 0;
    $scope.medicineAssignList = [];
    $scope.brandId = 0;

    $scope.maxSize = 20000;     // Limit number for pagination display number.  
    $scope.totalCount = 0;  // Total number of items in all pages. initialize as a zero  
    $scope.pageIndex = 1;   // Current page number. First page is 1.-->  
    $scope.pageSizeSelected = 500; // Maximum number of items per page.  

    $scope.initControls = function () {
        dataFactory.InitControlsBrandMedicineAssign().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.doseFormList = result.doseFormList;
            $scope.unitList = result.unitList;
            $scope.bookList = result.bookList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getBrandMedicineAssignList = function () {
        var params = {
            id: tableRowId,
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected
        };
        dataFactory.GetBrandMedicineAssignList(params).then(function (response) {
            var result = response.data;
            $scope.brandMedicineAssignList = result.brandMedicineAssignList;
            $scope.totalCount = result.rowCount[0].totalCount; 

            for (var i = 0; i < result.brandMedicineAssignList.length; i++) {
                $scope.brandMedicineAssignList[i].medicineAssignList = JSON.parse(result.brandMedicineAssignList[i].medicineAssignList);
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getUnitByBrandFn = function (id, dosageFormID, dose, doseUnitID) {

        $scope.brandId = id;
        $scope.ddlDoseForm = dosageFormID;
        $scope.dose = dose;
        $scope.ddlBrandDoseUnit = doseUnitID;
    };

    $scope.Add = function () {

        if (isEmpty($scope.brandName)) {
            toaster.pop('error', "Error", 'Please Enter Brand Name !!');
            return false;
        }
        if ($scope.ddlDoseForm == 0) {
            toaster.pop('error', "Error", 'Please Select Dose Form !!');
            return false;
        }
        if (isEmpty($scope.dose)) {
            toaster.pop('error', "Error", 'Please Enter Dose !!');
            return false;
        }
        if ($scope.ddlBrandDoseUnit == 0) {
            toaster.pop('error', "Error", 'Please Select Brand Dose Unit !!');
            return false;
        }
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine !!');
            return false;
        }
        if (isEmpty($scope.medicineDose)) {
            toaster.pop('error', "Error", 'Please Enter Medicine Dose !!');
            return false;
        }
        if ($scope.ddlMedicineDoseUnit == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine Dose Unit !!');
            return false;
        }
        if ($scope.medicineAssignList.some(data => (data.medicineID == $scope.ddlMedicine && data.medicineDose == $scope.medicineDose && data.medicineDoseUnitID == $scope.ddlMedicineDoseUnit))) {
            toaster.pop('error', "Error", 'Already Exists !!');
            return false;
        }

        $scope.medicineAssignList.push({
            medicineID: $scope.ddlMedicine,
            medicineName: $("#ddlMedicine option:selected").text().trim(),
            medicineDose: $scope.medicineDose,
            medicineDoseUnitID: $scope.ddlMedicineDoseUnit,
            doseUnit: $("#ddlMedicineDoseUnit option:selected").text().trim()
        });
    };

    $scope.Remove = function (index) {
        $scope.medicineAssignList.splice(index, 1);
    };

    $scope.saveBrandMedicineAssign = function () {

        if (isEmpty($scope.brandName)) {
            toaster.pop('error', "Error", 'Please Enter Brand Name !!');
            return false;
        }
        if ($scope.ddlDoseForm == 0) {
            toaster.pop('error', "Error", 'Please Select Dose Form !!');
            return false;
        }
        if (isEmpty($scope.dose)) {
            toaster.pop('error', "Error", 'Please Enter Dose !!');
            return false;
        }
        if ($scope.ddlBrandDoseUnit == 0) {
            toaster.pop('error', "Error", 'Please Select Brand Dose Unit !!');
            return false;
        }

        var medicineAssignList = [];
        $.each($scope.medicineAssignList, function (i) {
            medicineAssignList.push({
                medicineID: this.medicineID,
                medicineDose: this.medicineDose,
                medicineDoseUnitID: this.medicineDoseUnitID
            });
        });
        if (isEmptyValue(medicineAssignList)) {
            toaster.pop('error', "Error", 'Please Add Medicine Details !!');
            return false;
        }

        var params = {
            id: tableRowId,
            brandName: $scope.brandName,
            doseFormId: $scope.ddlDoseForm,
            dose: $scope.dose,
            brandDoseUnitId: $scope.ddlBrandDoseUnit,
            medicineAssignList: JSON.stringify(medicineAssignList),
            url: $scope.txtURL,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            contentCapacity: $scope.capacity,
            capacityUnitID: $scope.ddlCapacityUnit,
            price: $scope.price,
            companyID: $scope.companyID,
            companyName: $scope.companyName,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveBrandMedicineAssign(params).then(function (response) {
            if (tableRowId > 0) {
                $rootScope.activityLog(response, 'UPDATE Brand Medicine Assign', 'Brand Medicine Assign', '');
            }
            $scope.clear();
            $scope.getBrandMedicineAssignList();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.DeleteBrandMedicineAssign(params).then(function (response) {
                $scope.clear();
                $scope.getBrandMedicineAssignList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Brand Medicine Assign', 'Brand Medicine Assign', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.deleteMedicineAssign = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id
            };
            dataFactory.DeleteMedicineAssign(params).then(function (response) {
                $scope.clear();
                $scope.getBrandMedicineAssignList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE Medicine Assign', 'Medicine Assign', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {

        tableRowId = paramid;
        var params = {
            id: paramid,
            pageIndex: $scope.pageIndex,
            pageSize: $scope.pageSizeSelected
        };
        dataFactory.GetBrandMedicineAssignList(params).then(function (response) {
            var result = response.data;
            var list = result.brandMedicineAssignList;

            $scope.clear();

            $scope.brandName = list[0].brandName;
            $scope.ddlDoseForm = list[0].dosageFormID;
            $scope.dose = list[0].dose;
            $scope.ddlBrandDoseUnit = list[0].doseUnitID;
            $scope.txtURL = list[0].url;
            $scope.ddlBook = list[0].book;
            $scope.txtPageNo = list[0].page;
            $scope.txtEdition = list[0].edition;
            $scope.txtURL = list[0].refURL;
            $scope.capacity = list[0].contentCapacity;
            $scope.ddlCapacityUnit = list[0].capacityUnitID;
            $scope.price = list[0].price;
            $scope.companyID = list[0].companyID;
            $scope.companyName = list[0].companyName;
                       
            if (!isEmptyValue(list[0].medicineAssignList)) {
                $scope.medicineAssignList = JSON.parse(list[0].medicineAssignList);
            }
            else {
                $scope.medicineAssignList = [];
            }            

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clear = function () {
        tableRowId = 0;
        //$scope.brandName = '';
        //$scope.ddlDoseForm = 0;
        //$scope.dose = '';
        //$scope.ddlBrandDoseUnit = 0;
        //$scope.txtURL = '';
        //$scope.ddlBook = 0;
        //$scope.txtPageNo = '';
        //$scope.txtEdition = '';
        //$scope.ddlMedicine = 0;
        //$scope.medicineDose = '';
        //$scope.ddlMedicineDoseUnit = 0;
        //$scope.capacity = '';
        //$scope.ddlCapacityUnit = 0;
        //$scope.price = '';
        //$scope.companyID = 0;
        //$scope.companyName = '';
        //$scope.medicineAssignList = [];
    };

    $scope.reset = function () {
        tableRowId = 0;
        $scope.brandName = '';
        $scope.ddlDoseForm = 0;
        $scope.dose = '';
        $scope.ddlBrandDoseUnit = 0;
        $scope.txtURL = '';
        $scope.ddlBook = 0;
        $scope.txtPageNo = '';
        $scope.txtEdition = '';
        $scope.ddlMedicine = 0;
        $scope.medicineDose = '';
        $scope.ddlMedicineDoseUnit = 0;
        $scope.capacity = '';
        $scope.ddlCapacityUnit = 0;
        $scope.price = '';
        $scope.companyID = 0;
        $scope.companyName = '';
        $scope.medicineAssignList = [];
    };

    $scope.pageChanged = function () {
        $scope.getBrandMedicineAssignList();
    };
    //This method is calling from dropDown  
    $scope.changePageSize = function () {
        $scope.pageIndex = 1;
        $scope.getBrandMedicineAssignList();
    }; 

    $scope.initControls();
    $scope.getBrandMedicineAssignList();
});