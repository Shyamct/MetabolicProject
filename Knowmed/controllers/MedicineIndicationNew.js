app.controller('medicineIndicationNewCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var pkId = 0;
    var arr = [];

    $scope.addedMedicineList = [];
    $scope.intControl = function () {
        dataFactory.InitControlsMedicineIndicationNew().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.problemList = result.problemList;
            $scope.bookList = result.bookList;
            $scope.btnAdd = false;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddMedicine = function () {
       
        if ($scope.ddlmedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        //for (var i = 0; i < $scope.addedMedicineList.length; i++) {
        //    if ($scope.addedMedicineList[i].medicineId == $scope.ddlmedicine && $scope.addedMedicineList[i].problemId == $scope.ddlproblem) {
        //        toaster.pop('error', "Error", " Already Added This Medicine");
        //        return false;
        //    }
        //}
        arr.push({
            medicineId: $scope.ddlmedicine,
            medicineName: $("#ddlmedicine option:selected").text().trim(),
            problemId: $scope.ddlproblem,
            problemName: $("#ddlproblem option:selected").text().trim(),
            attributeTypeID: $scope.ddlAttribute,
            attributeName: $("#ddlAttribute option:selected").text().trim(), 
            attributeValueID: $("input[name='rdAttribute']:checked").val(),
            attributeValueName: $("input[name='rdAttribute']:checked").parent('label').text().trim(),
            indication: $scope.txtindication,
            remark: $scope.txtremark
        });
        $scope.addedMedicineList = arr;
    };
    $scope.deleteAddedMedicineList = function (index) {
        $scope.addedMedicineList.splice(index, 1);
    };

    $scope.GetAttributeList = function () {
        var params = {
            effectID: $scope.ddlproblem
        };
        dataFactory.GetAttributeListNew(params).then(function (response) {
            var result = response.data;
            $scope.attributeList = result.attributeList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetAttributeValueList = function () {

        var params = {
            attributeTypeID: $scope.ddlAttribute
        };
        dataFactory.GetAttributeValueListNew(params).then(function (response) {
            var result = response.data;
            $scope.attributeValueList = result.attributeValueList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveMedicineIndication = function () {
        if ($scope.ddlmedicine === 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        var params = {
            indicationId: pkId,
            medicineId: $scope.ddlmedicine,
            problemId: $scope.ddlproblem,
            indication: $scope.txtindication,
            attributeTypeID: $scope.ddlAttribute,
            attributeValueID: $("input[name='rdAttribute']:checked").val(),
            remark: $scope.txtremark,
            bookID: $scope.ddlbookname,
            pageNo: $scope.txtpageno,
            edition: $scope.txtedition,
            reference: $scope.txtReference,
            dtMedicineIndicationList: JSON.stringify($scope.addedMedicineList),
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        log(params);
        dataFactory.SaveMedicineIndicationNew(params).then(function (response) {
            var message = pkId > 0 ? 'Update Medicine Indication New' : 'Save Medicine Indication New';
            $rootScope.activityLog(response, message, 'Medicine Indication New', '');
            $scope.clr();
            $scope.MedicineIndicationList();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.MedicineIndicationList = function () {
        var params = {
            indicationId: pkId,
            medicineId: $scope.ddlmedicine,
        };
        dataFactory.MedicineIndicationListNew(params).then(function (response) {
            var result = response.data;
            $scope.medicineIndicationlist = result.medicineIndicationlist;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.edit = function (paramid) {
        pkId = paramid;
        var params = {
            indicationId: paramid,
            medicineId: $scope.ddlmedicine
        };
        dataFactory.MedicineIndicationListNew(params).then(function (response) {
            var result = response.data;
            var list = result.medicineIndicationlist;
            $scope.ddlmedicine = list[0].medicineId;
            $scope.ddlproblem = list[0].probId;
            $scope.GetAttributeList();
            $scope.ddlAttribute = list[0].attributeTypeID;
            $scope.GetAttributeValueList();
            $scope.attributeValue = list[0].attributeValueId; 
            $scope.txtindication = list[0].indication;
            $scope.txtremark = list[0].remark;
            $scope.ddlbookname = list[0].bookID;
            $scope.txtpageno = list[0].pageNo;
            $scope.txtedition = list[0].edition;
            $scope.txtReference = list[0].reference;
            $scope.btnAdd = true;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                indicationId: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteMedicineIndication(params).then(function (response) {
                $scope.MedicineIndicationList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Medicine Indication New', ' Medicine Indication New', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {
        //  $scope.ddlmedicine = 0;
        // $scope.ddlproblem = 0;
       // $scope.txtindication = '';
        //$scope.txtremark = '';
        //$scope.txtpageno = '';
        //$scope.ddlbookname = 0;
        //$scope.txtedition = '';
        $scope.addedMedicineList.length = 0;
        $scope.ddlAttribute = 0;
        $scope.attributeValueList = [];   
        $scope.addedMedicineList = [];   
        pkId = 0;
        $scope.btnAdd = false;
    };
    $scope.intControl();
    //$scope.MedicineIndicationList();
});