app.controller('diseaseInputCtrl', function ($scope, dataFactory, toaster) {
    var arr = [];
    var arrName = [];
    var mainID = 0;
    var arrMedication = [];
    var arrMedicationName = [];
    var arrSupportiveMedication = [];
    var arrSupportiveMedicationName = [];
    $scope.attributeList = "";
    $scope.diseaseMedicationList = "";
    $scope.diseaseSupportiveMedicationList = "";
    $scope.IsVisible = false;

    $scope.ShowHide = function () {
        if ($scope.ddlProblem > 0) {
            $scope.IsVisible = true;
        }
        else {
            $scope.IsVisible = false;
        }
    };
    $scope.DiseaseHistoryInputList = function () {
        dataFactory.DiseaseHistoryList().then(function (response) {
            var result = response.data;
            $scope.DiseaseHistoryList = result.diseaseHistoryIntake;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.dHistoryIntakeAttributeList = function (id) {
        var param = {
            id: id
        };
        dataFactory.DiseaseHistoryIntakeAttributeList(param).then(function (response) {
            var result = response.data;
            $scope.DiseaseHistoryIntakeAttributeList = result.diseaseHistoryIntakeAttribute;
            $('#myModal').modal('show');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.dMedicationList = function (id) {
        var param = {
            diseaseRefId: id
        };
        dataFactory.DiseaseMedicationList(param).then(function (response) {
            var result = response.data;
            $scope.DiseaseMedicationList = result.diseaseMedication;
            $('#myModal1').modal('show');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.dSupportiveMedicineList = function (id) {
        var param = {
            diseaseRefId: id
        };
        dataFactory.DiseaseSupportiveMedicineList(param).then(function (response) {
            var result = response.data;
            $scope.DiseaseSupportiveMedicineList = result.diseaseSupportiveMedicine;
            $('#myModal2').modal('show');
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.dFormMasterList = function () {
        dataFactory.DosageFormMasterList().then(function (response) {
            var result = response.data;
            $scope.DosageFormMasterList = result.dosageFormMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.iTypeList = function () {
        var param = {
            diseaseRefId: $scope.ddlDiseaseDepartment
        };
        dataFactory.InputTypeList(param).then(function (response) {
            var result = response.data;
            $scope.InputTypeList = result.historyInputTypeMaster;
            $scope.DiseaseHistoryList = result.historyList;
            //$scope.clearByDisease();
            $scope.ddl = $scope.ddlDiseaseDepartment;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
            $scope.ddlDiseaseDepartment = -1;
        });
    };


    //edit here
    $scope.edit = function (id, diseaseRefID) {
        var param = {
            id:id,
            diseaseRefId: diseaseRefID
        };
        mainID = id;
        dataFactory.GetAllDiseaseHistoryInputList(param).then(function (response) {
            var result = response.data;
            var list1 = result.diseaseHistoryIntakeAttribute;
            var list2 = result.medicationList;
            var list3 = result.supportiveMedicationList;
            var list4 = result.diseaseHistoryIntakeList;
            $scope.InputTypeList = result.historyInputTypeMasterList;
            $scope.ddlDiseaseDepartment = list4[0].diseaseRefID;
            $scope.txtEmergencyTreatment = list4[0].emergencyTreatment;
            $scope.txtProvisionalDiet = list4[0].provisionalDiet;
            $scope.txtSOP = list4[0].sop;


            if (list1.length > 0) {
                arr = [];
                arrName = [];
            for (var i = 0; i < list1.length; i++) {

                arr.push({
                    inputTypeId: list1[i].inputTypeID,
                    problemId: list1[i].problemID,
                    attributeId: list1[i].attributeTypeID,
                    attributeValueId: list1[i].attributeValueID,

                });
                arrName.push({
                    inputTypeName: list1[i].inputType,
                    problemName: list1[i].problemName,
                    attributeName: list1[i].attributeName,
                    attributeValueName: list1[i].attributeValue
                });


            }
            $scope.attributeList = arr;
            $scope.attributeNameList = arrName;
        }
            if (list2.length > 0) {
                arrMedication = [];
                arrMedicationName = [];
                for (var ii = 0; ii < list2.length; ii++) {

                arrMedication.push({
                    medicineId: list2[ii].medicineID,
                    dosageFormId: list2[ii].dosageFormID,
                    dosageStrength: list2[ii].doseStrength,
                    doseUnitId: list2[ii].doseUnitID,
                    doseFrequencyId: list2[ii].doseFrequencyID,
                    durationDays: list2[ii].durationDays,
                    remark: list2[ii].remark
                });
                arrMedicationName.push({
                    medicineName: list2[ii].medicineName,
                    dosageFormName: list2[ii].dosageForm,
                    dosageStrength: list2[ii].doseStrength,
                    doseUnitName: list2[ii].unit,
                    doseFrequencyName: list2[ii].frequencyName,
                    durationDays: list2[ii].durationDays,
                    remark: list2[ii].remark
                });

            }
            $scope.diseaseMedicationList = arrMedication;
            $scope.diseaseMedicationNameList = arrMedicationName;
        }
            if (list3.length > 0) {
                arrSupportiveMedication = [];
                arrSupportiveMedicationName = [];
                for (var iii = 0; iii < list3.length; iii++) {

                    arrSupportiveMedication.push({
                        symptomId: list3[iii].symptomID,
                        medicineId: list3[iii].medicineID,
                        dosageFormId: list3[iii].dosageFormID,
                        dosageStrength: list3[iii].doseStrength,
                        doseUnitId: list3[iii].doseUnitID,
                        doseFrequencyId: list3[iii].doseFrequencyID,
                        durationDays: list3[iii].durationDays,
                        remark: list3[iii].remark
                    });
                    arrSupportiveMedicationName.push({
                        symptomName: list3[iii].symptom,
                        medicineName: list3[iii].medicineName,
                        dosageFormName: list3[iii].dosageForm,
                        dosageStrength: list3[iii].doseStrength,
                        doseUnitName: list3[iii].unit,
                        doseFrequencyName: list3[iii].frequencyName,
                        durationDays: list3[iii].durationDays,
                        remark: list3[iii].remark
                    });
                }
                $scope.diseaseSupportiveMedicationList = arrSupportiveMedication;
                $scope.diseaseSupportiveMedicationNameList = arrSupportiveMedicationName;
            }
            $scope.iTypeList();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
       

    };


    //edit end here

    $scope.initControls = function () {
        dataFactory.InitControlsMedSideEffect().then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
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

    $scope.fMasterList = function () {
        dataFactory.FrequencyMasterList().then(function (response) {
            var result = response.data;
            $scope.FrequencyMasterList = result.frequencyMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.dDepartmentList = function () {
        dataFactory.DiseaseDepartmentListInput().then(function (response) {
            var result = response.data;
            $scope.DiseaseDepartmentList = result.diseaseDepartment;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.pMasterList = function () {
        dataFactory.ProblemMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemMasterList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AttValueList = function () {
        var param = {
            problemId: $scope.ddlProblem
        };
        dataFactory.AttributeValueList(param).then(function (response) {
            var result = response.data;
            $scope.AttributeValueList = uniq(result.problemAttributeValue, 'attributeName');
            $scope.AttributeValue = result.problemAttributeValue;
            $scope.ddlAttributeName = 0;
            $scope.ShowHide();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.addAttribute = function () {
        if ($scope.ddlInputType == -1) {
            alert('Please Select Input Type !!');
            return false;
        }
        if ($scope.ddlProblem == -1) {
            alert('Please Select Problem !!');
            return false;
        }
        if ($scope.ddlAttributeName > 0) {
            var isChecked = false;
            for (var i = 0; i < $scope.AttributeValue.length; i++) {
                if ($scope.ddlAttributeName == $scope.AttributeValue[i].attributeID) {
                    if ($scope.AttributeValue[i].Selected) {
                        isChecked = true;
                        arr.push({
                            inputTypeId: $scope.ddlInputType,
                            problemId: $scope.ddlProblem,
                            attributeId: $scope.ddlAttributeName,
                            attributeValueId: $scope.AttributeValue[i].problemAttributeValueId
                        });
                        arrName.push({
                            inputTypeName: $('#ddlInputType option:selected').text(),
                            problemName: $('#ddlProblem option:selected').text(),
                            attributeName: $scope.AttributeValue[i].attributeName,
                            attributeValueName: $scope.AttributeValue[i].attributeValue
                        });
                    }
                }
            }
            if (isChecked == false) {
                alert('Please Select Attribute !!');
                return false;
            }
        }
        else {
            arr.push({
                inputTypeId: $scope.ddlInputType,
                problemId: $scope.ddlProblem,
                attributeId: 0,
                attributeValueId: 0
            });
            arrName.push({
                inputTypeName: $('#ddlInputType option:selected').text(),
                problemName: $('#ddlProblem option:selected').text(),
                attributeName: "",
                attributeValueName: ""
            });
        }
        $scope.attributeList = arr;
        $scope.attributeNameList = arrName;
    };


    $scope.addDiseaseMedication = function () {
        var dose = "";
        var unit = "";
        var frequency = "";
        var strength = 0;
        var duration = 0;
        var remark = "";
        if ($('#ddlDoseForm option:selected').val() >= "0") {
            dose = $('#ddlDoseForm option:selected').text();
        }
        if ($('#ddlUnit option:selected').val() >= "0") {
            unit = $('#ddlUnit option:selected').text();
        }
        if ($('#ddlFrequency option:selected').val() >= "0") {
            frequency = $('#ddlFrequency option:selected').text();
        }
        if ($scope.ddlMedicine == undefined || $scope.ddlMedicine == "-1") {
            alert('Please Select Medicine !!');
            return false;
        }
        if ($scope.txtStrength != undefined) {
            strength = $scope.txtStrength;
        }
        if ($scope.txtDuration != undefined) {
            duration = $scope.txtDuration;
        }
        if ($scope.txtRemark != undefined) {
            remark = $scope.txtRemark;
        }
        arrMedication.push({
            medicineId: $scope.ddlMedicine,
            dosageFormId: $scope.ddlDoseForm,
            dosageStrength: strength,
            doseUnitId: $scope.ddlUnit,
            doseFrequencyId: $scope.ddlFrequency,
            durationDays: duration,
            remark: remark
        });
        arrMedicationName.push({
            medicineName: $('#ddlMedicine option:selected').text(),
            dosageFormName: dose,
            dosageStrength: $scope.txtStrength,
            doseUnitName: unit,
            doseFrequencyName: frequency,
            durationDays: $scope.txtDuration,
            remark: $scope.txtRemark
        });

        $scope.diseaseMedicationList = arrMedication;
        $scope.diseaseMedicationNameList = arrMedicationName;
    };

    $scope.addDiseaseSupportiveMedication = function () {
        var Supportivedose = "";
        var Supportiveunit = "";
        var Supportivefrequency = "";
        var Supportivestrength = 0;
        var Supportiveduration = 0;
        var Supportiveremark = "";
        if ($('#ddlSupportiveDoseForm option:selected').val() >= "0") {
            Supportivedose = $('#ddlSupportiveDoseForm option:selected').text();
        }
        if ($('#ddlSupportiveUnit option:selected').val() >= "0") {
            Supportiveunit = $('#ddlSupportiveUnit option:selected').text();
        }
        if ($('#ddlSupportiveFrequency option:selected').val() >= "0") {
            Supportivefrequency = $('#ddlSupportiveFrequency option:selected').text();
        }
        if ($scope.ddlSymptom == undefined || $scope.ddlSymptom == "-1") {
            alert('Please Select Symptom !!');
            return false;
        }

        if ($scope.txtSupportiveStrength != undefined) {
            Supportivestrength = $scope.txtSupportiveStrength;
        }
        if ($scope.txtSupportiveDuration != undefined) {
            Supportiveduration = $scope.txtSupportiveDuration;
        }
        if ($scope.txtSupportiveRemark != undefined) {
            Supportiveremark = $scope.txtSupportiveRemark;
        }

        if ($scope.ddlSupportiveMedicine == undefined || $scope.ddlSupportiveMedicine == "-1") {
            alert('Please Select Medicine !!');
            return false;
        }



        arrSupportiveMedication.push({
            symptomId: $scope.ddlSymptom,
            medicineId: $scope.ddlSupportiveMedicine,
            dosageFormId: $scope.ddlSupportiveDoseForm,
            dosageStrength: Supportivestrength,
            doseUnitId: $scope.ddlSupportiveUnit,
            doseFrequencyId: $scope.ddlSupportiveFrequency,
            durationDays: Supportiveduration,
            remark: Supportiveremark
        });
        arrSupportiveMedicationName.push({
            symptomName: $('#ddlSymptom option:selected').text(),
            medicineName: $('#ddlSupportiveMedicine option:selected').text(),
            dosageFormName: Supportivedose,
            dosageStrength: $scope.txtSupportiveStrength,
            doseUnitName: Supportiveunit,
            doseFrequencyName: Supportivefrequency,
            durationDays: $scope.txtSupportiveDuration,
            remark: $scope.txtSupportiveRemark
        });

        $scope.diseaseSupportiveMedicationList = arrSupportiveMedication;
        $scope.diseaseSupportiveMedicationNameList = arrSupportiveMedicationName;
    };



    $scope.deleteAttribute = function (index) {
        $scope.attributeList.splice(index, 1);
        $scope.attributeNameList.splice(index, 1);
    };

    $scope.deletediseaseMedication = function (index) {
        $scope.diseaseMedicationList.splice(index, 1);
        $scope.diseaseMedicationNameList.splice(index, 1);
    };

    $scope.deletediseaseSupportiveMedication = function (index) {
        $scope.diseaseSupportiveMedicationList.splice(index, 1);
        $scope.diseaseSupportiveMedicationNameList.splice(index, 1);
    };


    $scope.SaveDiseaseMedication = function () {
        if ($scope.ddlDiseaseDepartment == -1) {
            alert('Please Select Disease Department');
            return false;
        }
        //if ($scope.ddlProblem == -1) {
        //    alert('Please Select Problem');
        //    return false;
        //}
        if (arr.length <= 0) {
            alert('Add Attributes !!');
            return false;
        }
        if ($scope.txtEmergencyTreatment == undefined || $scope.txtEmergencyTreatment == "") {
            alert('Enter Emergency Treatment');
            return false;
        }
        if ($scope.txtProvisionalDiet == undefined || $scope.txtProvisionalDiet == "") {
            alert('Enter Provisional Diet');
            return false;
        }
        if ($scope.txtSOP == undefined || $scope.txtSOP == "") {
            alert('Enter SOP');
            return false;
        }
        if ($scope.diseaseMedicationList.length <= 0) {
            
            $scope.diseaseMedicationList = "";
        }
        if ($scope.diseaseSupportiveMedicationList.length <= 0) {
           
            $scope.diseaseSupportiveMedicationList = "";
        }
        var params = {
            id: mainID,
            diseaseRefId: $scope.ddlDiseaseDepartment,
            dtDiseaseInput: $scope.attributeList,
            dtDiseaseMedication: $scope.diseaseMedicationList,
            dtDiseaseSupportiveMedicine: $scope.diseaseSupportiveMedicationList,
            provisionalDiet: $scope.txtProvisionalDiet,
            SOP: $scope.txtSOP,
            emergencyTreatment: $scope.txtEmergencyTreatment,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseInput(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.DiseaseHistoryInputList();
            $scope.clear();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };


    $scope.DelDiseaseInput = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseInput(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.DiseaseHistoryInputList();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.dDepartmentList();
    $scope.pMasterList();
    $scope.initControls();
    $scope.dFormMasterList();
    $scope.fMasterList();
    $scope.DiseaseHistoryInputList();

    $scope.clear = function () {
        $scope.ddlDiseaseDepartment = -1;
        $scope.ddlProblem = -1;
        $scope.ddlInputType = -1;
        $scope.IsVisible = false;
        $scope.ddlMedicine = -1;
        $scope.ddlDoseForm = -1;
        $scope.txtStrength = "";
        $scope.ddlUnit = -1;
        $scope.ddlFrequency = -1;
        $scope.txtDuration = "";
        $scope.txtRemark = "";
        $scope.ddlSymptom = -1;
        $scope.ddlSupportiveMedicine = -1;
        $scope.ddlSupportiveDoseForm = -1;
        $scope.txtSupportiveStrength = "";
        $scope.ddlSupportiveUnit = -1;
        $scope.ddlSupportiveFrequency = -1;
        $scope.txtSupportiveDuration = "";
        $scope.txtSupportiveRemark = "";
        arr.length = 0;
        arrName.length = 0;
        arrMedication.length = 0;
        arrMedicationName.length = 0;
        arrSupportiveMedication.length = 0;
        arrSupportiveMedicationName.length = 0;
        $scope.txtProvisionalDiet = "";
        $scope.txtSOP = "";
        $scope.txtEmergencyTreatment = "";
        $scope.ddlAttributeName = 0;
        mainID = 0;
    };

    $scope.clearByDisease = function () {
        $scope.ddlProblem = -1;
        $scope.ddlInputType = -1;
        $scope.IsVisible = false;
        $scope.ddlSymptom = -1;        
        arr.length = 0;
        arrName.length = 0;   
        $scope.ddlAttributeName = 0;
    };
});