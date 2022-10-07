app.controller('diseaseStageCtrl', function ($scope, dataFactory, toaster) {
    var diseaseStageID = 0;
   
    
    $scope.diseaseInvestigationList = '';
    $scope.AttributeValue = '';
    $scope.diseaseMedicationList = '';
    $scope.addedTreatmentTypeList = '';
    $scope.AttributeValue = '';
    
  
    var arrAttributeID = [];
    var arrAttributeName = [];
  
    var arrTreatmentType = [];
    var arrInvestigation = [];
    var arrMedication = [];
    var arrMedicationName = [];
    var arrInvestigationName = [];
 

    
    //treatment
    $scope.addTreatmentType = function () {

        if ($scope.ddlTreatmentType == 0) {
            toaster.pop('error', "Error", 'Please Select Treatment Type');
            return false;
        }

        for (var i = 0; i < $scope.addedTreatmentTypeList.length; i++) {
            if ($scope.addedTreatmentTypeList[i].treatmentTypeID == $scope.ddlTreatmentType) {
                toaster.pop('error', "Error", 'Already Added This Treatment ');
                return false;
            }
        }
        arrTreatmentType.push({
            treatmentTypeID: $("#ddlTreatmentType").val(),
            treatmentTypeName: $("#ddlTreatmentType option:selected").text(),
            treatmentDescription: $scope.txtEmergencyTreatment
        });
        $scope.addedTreatmentTypeList = arrTreatmentType;
    };

    $scope.deleteAddedTreatmentTypeList = function (index) {
        $scope.addedTreatmentTypeList.splice(index, 1);
    };


    //treatment end

    //medication
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

    $scope.addDiseaseInvestigation = function () {
        var test = "";
        var resultType = "";
        var result = "";
      
        if ($('#ddlTest option:selected').val() >= "0") {
            test = $('#ddlTest option:selected').text();
        }
        if ($('#ddlResultType option:selected').val() >= "0") {
            resultType = $('#ddlResultType option:selected').text();
        }
        if ($('#ddlResult option:selected').val() >= "0") {
            result = $('#ddlResult option:selected').text();
        }
       



        arrInvestigation.push({
            subTestID: $scope.ddlTest,
            resultPropertyID: $scope.ddlResultType,
            resultPropertyValueID: $scope.ddlResult,
            reason: $scope.txtInvestigationRemark,
            
        });
        arrInvestigationName.push({
            testName: test,
            resultTypeName: resultType,
            resultName: result,
            reason: $scope.txtInvestigationRemark,
          
        });

        $scope.diseaseInvestigationList = arrInvestigation;
        $scope.diseaseInvestigationNameList = arrInvestigationName;
    };


    $scope.deleteDiseaseInvestigation = function (index) {
        $scope.diseaseInvestigationList.splice(index, 1);
        $scope.diseaseInvestigationNameList.splice(index, 1);
    };


    $scope.deletediseaseMedication = function (index) {
        $scope.diseaseMedicationList.splice(index, 1);
        $scope.diseaseMedicationNameList.splice(index, 1);
    };

    
    //disease input attribute

    $scope.addAttribute = function () {
        if ($scope.ddlInputType == -1) {
            alert('Please Select Input Type !!');
            return false;
        }
        if ($scope.ddlInputProblem == -1) {
            alert('Please Select Problem !!');
            return false;
        }
        if ($scope.ddlAttributeName > 0) {
            var isChecked = false;
            for (var i = 0; i < $scope.AttributeValue.length; i++) {
                if ($scope.ddlAttributeName == $scope.AttributeValue[i].attributeID) {
                    if ($scope.AttributeValue[i].Selected) {
                        isChecked = true;
                        arrAttributeID.push({
                            inputTypeId: $scope.ddlInputType,
                            problemId: $scope.ddlInputProblem,
                            attributeId: $scope.ddlAttributeName,
                            attributeValueId: $scope.AttributeValue[i].problemAttributeValueId,
                            occurenceId: $scope.ddlDiseaseInputOccurence
                        });
                        arrAttributeName.push({
                            inputTypeName: $('#ddlInputType option:selected').text(),
                            problemName: $('#ddlInputProblem option:selected').text(),
                            attributeName: $scope.AttributeValue[i].attributeName,
                            attributeValueName: $scope.AttributeValue[i].attributeValue,
                            occurenceName: $('#ddlDiseaseInputOccurence option:selected').text()
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
            arrAttributeID.push({
                inputTypeId: $scope.ddlInputType,
                problemId: $scope.ddlInputProblem,
                attributeId: 0,
                attributeValueId: 0,
                occurenceId: $scope.ddlDiseaseInputOccurence
            });
            arrAttributeName.push({
                inputTypeName: $('#ddlInputType option:selected').text(),
                problemName: $('#ddlInputProblem option:selected').text(),
                attributeName: "",
                attributeValueName: "",
                occurenceName: $('#ddlDiseaseInputOccurence option:selected').text()
            });
        }
        $scope.attributeList = arrAttributeID;
        $scope.attributeNameList = arrAttributeName;
    };


    $scope.deleteAttribute = function (index) {
        $scope.attributeList.splice(index, 1);
        $scope.attributeNameList.splice(index, 1);
    };

    ///disease input attribute
    $scope.rdBoth = 'Both';



    $scope.initControls = function () {
        dataFactory.InitControlsDiseaseStage().then(function (response) {
            var result = response.data;
            $scope.diseaseStageList = result.diseaseStageList;
            
            $scope.occurenceList = result.occurenceList;

            $scope.treatmentTypeList = result.treatmentTypeList;
            $scope.medicineList = result.medicineList;
            $scope.DosageFormMasterList = result.dosageFormMaster;
            $scope.FrequencyMasterList = result.frequencyList;
            $scope.unitList = result.doseUnitList;
            
            $scope.ProblemMasterList = result.problemList;
            $scope.subTestList = result.subTestList;
            $scope.resultPropertyList = result.resultPropertyList;
           $scope.resultPropertyValueList = result.resultPropertyValueList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.ShowHide = function () {
        if ($scope.ddlProblem > 0) {
            $scope.IsVisible = true;
        }
        else {
            $scope.IsVisible = false;
        }
    };
    $scope.iTypeList = function () {
       
        var param = {
            departmentID: $scope.departmentID,
         
        };
       
        dataFactory.DiseaseStageInputTypeList(param).then(function (response) {
            var result = response.data;
            $scope.InputTypeList = result.historyInputTypeMaster;

            $scope.DiseaseHistoryList = result.historyList;

           
        }, function (error) {
            toaster.pop('error', "Error", error.data);
          
        });
    };
    $scope.AttValueList = function () {
        var param = {
            problemMasterID: $scope.ddlInputProblem
        };
        dataFactory.DiseaseDepartmentAttributeValueListNew(param).then(function (response) {
            var result = response.data;
            $scope.AttributeValueList = uniq(result.problemAttributeValue, 'attributeName');
            $scope.AttributeValue = result.problemAttributeValue;
            $scope.ddlAttributeName = 0;
            $scope.ShowHide();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


   
    $scope.saveDiseaseStage = function () {

        
        if ($scope.txtDisease == 0 || $scope.diseaseDepartmentID == 'undifined' || $scope.diseaseDepartmentID == '' || $scope.diseaseDepartmentID == 0 || $scope.diseaseDepartmentID == null) {
            toaster.pop('error', "Error", 'Please Select Disease');
          
            return false;
        }
      
        var params = {
            diseaseDepartmentID: $scope.diseaseDepartmentID,
            diseaseStageID: diseaseStageID,
            diseaseName: $scope.txtDisease,
            departmentID: $scope.ddlDepartment,
            stageName: $scope.txtStageName,
            diseaseID: $scope.diseaseID,
            stageDefinition: $scope.txtStageDefintion,
            type: $scope.rdType,
            dtDiseaseInput: $scope.attributeList,
            lstTreatmentTypeList: $scope.addedTreatmentTypeList,
            dtDiseaseMedication: $scope.diseaseMedicationList,
            lstProblemInvestigation: $scope.diseaseInvestigationList,

            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
       
        dataFactory.SaveDiseaseStage(params).then(function (response) {
             $scope.initControls();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (diseaseStageID, ddID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                diseaseStageID: diseaseStageID,
                diseaseDepartmentID: ddID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseStage(params).then(function (response) {
                $scope.initControls();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid,ddID) {
       
        diseaseStageID = paramid;
        var params = {
            diseaseStageID: diseaseStageID,
            diseaseDepartmentID: ddID
        };
        dataFactory.DiseaseStageList(params).then(function (response) {
           
            var result = response.data;
            var diseaseDepartmentList = result.diseaseDepartmentList;
           
            var ddInputList = result.ddInputList;
            var ddTreatmentList = result.ddTreatmentList;
            var ddMedicationList = result.ddMedicationList;
            var ddInvestigationList = result.ddInvestigationList;
          
            $scope.rdType = diseaseDepartmentList[0].diseaseType;
            $scope.txtDisease = diseaseDepartmentList[0].diseaseDepartmentName;
            $scope.departmentID = diseaseDepartmentList[0].departmentID;
            $scope.diseaseID = diseaseDepartmentList[0].diseaseID;
            $scope.diseaseDepartmentID = diseaseDepartmentList[0].diseaseDepartmentID;
            $scope.txtStageName = diseaseDepartmentList[0].stageClassificationName;
            $scope.txtStageDefintion = diseaseDepartmentList[0].description;








            arrTreatmentType = [];
            for (var i = 0; i < ddTreatmentList.length; i++) {
                arrTreatmentType.push({
                    treatmentTypeID: ddTreatmentList[i].treatmentTypeID,
                    treatmentTypeName: ddTreatmentList[i].treatmentName,
                    treatmentDescription: ddTreatmentList[i].treatment
                });
            }
            $scope.addedTreatmentTypeList = arrTreatmentType;


            

            arrAttributeID = [];
            arrAttributeName = [];
            if (ddInputList.length > 0) {
                var param = {
                    departmentID: ddID,
                    diseaseID: 0
                };
                dataFactory.DiseaseDepartmentInputTypeListNew(param).then(function (response) {
                    var result = response.data;
                    $scope.InputTypeList = result.historyInputTypeMaster;

                    $scope.DiseaseHistoryList = result.historyList;
                });
            };
        

            for (var i = 0; i < ddInputList.length; i++) {
                arrAttributeID.push({
                    inputTypeId: ddInputList[i].inputTypeID,
                    problemId: ddInputList[i].problemID,
                    attributeId: ddInputList[i].attributeTypeID,
                    attributeValueId: ddInputList[i].attributeValueID,
                    occurenceId: ddInputList[i].occurence
                });
                arrAttributeName.push({
                    inputTypeName: ddInputList[i].inputType,
                    problemName: ddInputList[i].problemName,
                    attributeName: ddInputList[i].attributeName,
                    attributeValueName: ddInputList[i].attributeValue,
                    occurenceName: ddInputList[i].occurence
                });

            }
           
            $scope.attributeList = arrAttributeID;
            $scope.attributeNameList = arrAttributeName;

            //medication
            arrMedication = [];
            arrMedicationName = [];
            for (var i = 0; i < ddMedicationList.length; i++) {
                arrMedication.push({
                    medicineId: ddMedicationList[i].medicineID,
                    dosageFormId: ddMedicationList[i].dosageFormID,
                    dosageStrength: ddMedicationList[i].doseStrength,
                    doseUnitId: ddMedicationList[i].doseUnitID,
                    doseFrequencyId: ddMedicationList[i].doseFrequencyID,
                    durationDays: ddMedicationList[i].durationDays,
                    remark: ddMedicationList[i].remark
                });
                arrMedicationName.push({
                    medicineName: ddMedicationList[i].mediicneName,
                    dosageFormName: ddMedicationList[i].formName,
                    dosageStrength: ddMedicationList[i].doseStrength,
                    doseUnitName: ddMedicationList[i].unitName,
                    doseFrequencyName: ddMedicationList[i].frequency,
                    durationDays: ddMedicationList[i].durationDays,
                    remark: ddMedicationList[i].remark
                });

            }


            $scope.diseaseMedicationList = arrMedication;
            $scope.diseaseMedicationNameList = arrMedicationName;




            //medication end 

            //supportive medication
            arrInvestigation = [];
            arrInvestigationName = [];
            for (var i = 0; i < ddInvestigationList.length; i++) {


                arrInvestigation.push({
                    subTestID: ddInvestigationList[i].subTestID,
                    resultPropertyID: ddInvestigationList[i].resultPropertyID,
                    resultPropertyValueID: ddInvestigationList[i].resultPropertyValueID,
                    reason: ddInvestigationList[i].reason

                });
                arrInvestigationName.push({
                    testName: ddInvestigationList[i].subTestName,
                    resultTypeName: ddInvestigationList[i].propertyName,
                    resultName: ddInvestigationList[i].propertyValue,
                    reason: ddInvestigationList[i].reason,

                });

               

               

            }


            $scope.diseaseInvestigationList = arrInvestigation;
            $scope.diseaseInvestigationNameList = arrInvestigationName;




            //investigation medication end 

          
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

 
    $scope.clr = function () {
        $scope.ddlProblem = 0;
        $scope.ddlDepartment = 0;
        $scope.rdMale = 0;
        $scope.rdFemale = 0;
        $scope.rdBoth = 0;
        $scope.txtAgeTo = '';
        $scope.ddlAgeUnit = 0;
        $scope.txtDisease = '';
        $scope.ddlRegion = 0;
        $scope.ddlSmoking = 0;
        $scope.ddlOccurence = 0;
        $scope.ddlAlcohalic = 0;
        diseaseStageID = 0;
        $scope.txtProblem = 0;
        $scope.addedFileList = '';
        $scope.txtICD = '';
        $scope.txtPrevalence = '';
        $scope.txtIncidence = '';
        $scope.txtPrognosis = '';
        $scope.txtPreventionToDo = '';
        $scope.txtPreventionNotToDo = '';
        $scope.txtProvisionalDiet = '';
        $scope.txtSOP = '';
        $scope.txtPathopyscology = '';
        $scope.ddlDietStyle = 0;
        $scope.txtDiseaseDetails='';
        $scope.diseaseSupportiveMedicationList = '';
        $scope.AttributeValue = '';
        $scope.diseaseMedicationList = '';
        $scope.addedTreatmentTypeList = '';
        $scope.AttributeValue = '';
        $scope.addedAddictionList = '';
        $scope.attributeNameList = '';
        $scope.diseaseMedicationNameList = '';
        $scope.diseaseSupportiveMedicationNameList = '';
        addedFiles = [];
        arrAddiction = [];
        diseaseID = 0;
        arrAttributeID = [];
        arrAttributeName = [];
        fileDesc = [];
        arrTreatmentType = [];
        arrSupportiveMedication = [];
        arrMedication = [];
        arrMedicationName = [];
        arrSupportiveMedicationName = [];

    };


    $scope.clr2 = function () {
        $scope.ddlProblem = 0;
        $scope.ddlDepartment = 0;
        $scope.rdMale = 0;
        $scope.rdFemale = 0;
        $scope.rdBoth = 0;
        $scope.txtAgeTo = '';
        $scope.ddlAgeUnit = 0;
        $scope.txtDiseaseDetails = '';
        $scope.ddlRegion = 0;
        $scope.ddlSmoking = 0;
        $scope.ddlOccurence = 0;
        $scope.ddlAlcohalic = 0;
        
        $scope.txtProblem = 0;
        $scope.addedFileList = '';
        $scope.txtICD = '';
        $scope.txtPrevalence = '';
        $scope.txtIncidence = '';
        $scope.txtPrognosis = '';
        $scope.txtPreventionToDo = '';
        $scope.txtPreventionNotToDo = '';
        $scope.txtProvisionalDiet = '';
        $scope.txtSOP = '';
        $scope.txtPathopyscology = '';
        $scope.ddlDietStyle = 0;
        $scope.diseaseSupportiveMedicationList = '';
        $scope.AttributeValue = '';
        $scope.diseaseMedicationList = '';
        $scope.addedTreatmentTypeList = '';
        $scope.AttributeValue = '';
        $scope.addedAddictionList = '';
        $scope.attributeNameList = '';
        $scope.diseaseMedicationNameList = '';
        $scope.diseaseSupportiveMedicationNameList = '';
         addedFiles = [];
         arrAddiction = [];
         diseaseID = 0;
         arrAttributeID = [];
         arrAttributeName = [];
         fileDesc = [];
         arrTreatmentType = [];
         arrSupportiveMedication = [];
         arrMedication = [];
         arrMedicationName = [];
         arrSupportiveMedicationName = [];

    };

    $scope.initControls();

});