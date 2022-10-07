app.controller('medicineContraIndicationNewCtrl', function ($scope, dataFactory, toaster, $rootScope) {   
    var existId = 0;    
    var arr = [];

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineContraIndicationNew().then(function (response) {
            var result = response.data;           
            $scope.medicineList = result.medicineList;
            $scope.contraIindicationTypeList = result.contraIindicationTypeList;
            $scope.problemList = result.problemList;
            $scope.bodyOrganRegionList = result.bodyOrganRegionList;
            $scope.bookList = result.bookList;
            $scope.btnAdd = false;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.getMedicineContraIndication = function () {        
        var params = {
            id: existId,
            medicineId: $scope.ddlMedicine
        };
        dataFactory.MedicineContraIndicationListNew(params).then(function (response) {
            var result = response.data;
            $scope.medicineContraIndicationList = result.medicineContraIndicationList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddMedicine = function () {
        
        if ($scope.ddlmedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
        //if ($scope.ddlproblem == 0) {
        //    toaster.pop('error', "Error", 'Please Select Problem');
        //    return false;
        //}
        //for (var i = 0; i < $scope.addedMedicineList.length; i++) {
        //    if ($scope.addedMedicineList[i].medicineId == $scope.ddlmedicine && $scope.addedMedicineList[i].problemId == $scope.ddlproblem) {
        //        toaster.pop('error', "Error", " Already Added This Medicine");
        //        return false;
        //    }
        //}
        arr.push({
            indicationTypeID: $scope.ddlIndicationType,
            contraIndication: $scope.txtindication,
            indicationTypeName: $("#ddlIndicationType option:selected").text().trim(),
            problemId: $scope.ddlContraIndication,
            problemName: $("#ddlContraIndication option:selected").text().trim(),
            attributeTypeID: $scope.ddlAttribute,
            attributeName: $("#ddlAttribute option:selected").text().trim(),
            attributeValueID: $("input[name='rdAttribute']:checked").val(),
            attributeValueName: $("input[name='rdAttribute']:checked").parent('label').text().trim(),
            affectedOrganID: $scope.ddlAffectedOrgan,
            regionName: $("#ddlAffectedOrgan option:selected").text().trim(),
            isAbsolute: $scope.chkIsAbsolute == true ? true : false,
            isWatchable: $scope.chkIsWatchable == true ? true : false,
            caution: $scope.txtCaution,
            remark: $scope.txtRemark
        });
       
        $scope.addedMedicineList = arr;
    };
    $scope.deleteAddedMedicineList = function (index) {
        $scope.addedMedicineList.splice(index, 1);
    };

    $scope.GetAttributeList = function () {

        var params = {
            effectID: $scope.ddlContraIndication
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

    $scope.saveMedicineContraIndication = function () {
       
        if ($scope.ddlMedicine == 0) {
            toaster.pop('error', "Error", 'Please Select Medicine');
            return false;
        }
       
        var params = {
            id: existId,
            medicineID: $scope.ddlMedicine,
            indicationTypeID: $scope.ddlIndicationType,
            contraIndicationID: $scope.ddlContraIndication,
            contraIndication: $scope.txtindication,
            attributeTypeID: $scope.ddlAttribute,
            attributeValueID: $("input[name='rdAttribute']:checked").val(),
            isAbsolute: $scope.chkIsAbsolute == true ? true : false,
            isWatchable: $scope.chkIsWatchable == true ? true : false,
            affectedOrganID: $scope.ddlAffectedOrgan,
            caution: $scope.txtCaution,
            remark: $scope.txtRemark,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            dtMedicineContraIndicationList: JSON.stringify($scope.addedMedicineList),
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMedicineContraIndicationNew(params).then(function (response) {
            var message = existId > 0 ? 'Update Medicine Contra Indication New' : 'Save Medicine Contra Indication New';
            $rootScope.activityLog(response, message, 'Medicine Contra Indication New', '');
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
            dataFactory.DeleteMedicineContraIndicationNew(params).then(function (response) {
                $scope.getMedicineContraIndication();
                toaster.pop('success', "Success", 'Deleted Successfully.');    
                $rootScope.activityLog(response, 'Delete Medicine Contra Indication New', ' Medicine Contra Indication New', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid,medicineID) {
        existId = paramid;
        var params = {
            medicineId: medicineID,
            id: paramid
        };
        dataFactory.MedicineContraIndicationListNew(params).then(function (response) {
            var result = response.data;
            var list = result.medicineContraIndicationList;
            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlIndicationType = list[0].indicationTypeID;
            $scope.ddlContraIndication = list[0].contraIndicationID;
            $scope.txtindication = list[0].contraIndication;
            $scope.GetAttributeList();
            $scope.ddlAttribute = list[0].attributeTypeID;
            $scope.GetAttributeValueList();
            $scope.attributeValue = list[0].attributeValueID; 
            $scope.chkIsAbsolute = list[0].isAbsolute == 'Yes' ? true : false;
            $scope.chkIsWatchable = list[0].isWatchable == 'Yes' ? true : false;
            $scope.ddlAffectedOrgan = list[0].affectedOrganID;
            $scope.txtCaution = list[0].caution;
            $scope.txtRemark = list[0].remark;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
            $scope.txtReference = list[0].reference;
            $scope.btnAdd = true;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
      //  $scope.ddlMedicine = 0;
        $scope.ddlIndicationType = 0;
        $scope.txtindication = '';
        $scope.ddlContraIndication = 0;
        $scope.chkIsAbsolute = false;
        $scope.chkIsWatchable = false;
        $scope.ddlAffectedOrgan = 0;
        //$scope.txtCaution = '';
        $scope.btnAdd = false;
        // $scope.ddlBook = 0;
        // $scope.txtPageNo = '';
        // $scope.txtEdition = '';
        // $scope.txtReference = '';
        // $scope.txtRemark = '';
        existId = 0;
        $scope.ddlAttribute = 0;
        $scope.attributeValueList = '';  
        $scope.addedMedicineList = '';
        arr = [];
    };

    $scope.initControls();
    $scope.getMedicineContraIndication();
});