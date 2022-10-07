app.controller('diseaseDepartmentNewCtrl', function ($scope, dataFactory, toaster) {
    $scope.stagechk = {};
    //$scope.$watch('selectedQuery', function (newVal, oldVal) {
    //    if ($scope.selectedQuery) {
    //        $scope.parameters = $scope.selectedQuery.fields;
    //    }
    //});
    var arrComplication = [];
    var arrDD = [];
    $scope.addedComplicationList = '';
    $scope.addedDD = [];
    $scope.treatment = [];
    var diseaseDepartmentID = 0;
    $scope.txtProblem = 0;
    var check = 0;
    var pFile = '';
    var addedFileList = '';
    $scope.stageList = ''; 
    $scope.attributeList = '';
    $scope.addedPFileList = '';
    $scope.addedFileList = '';
    $scope.diseaseSupportiveMedicationList = '';
    $scope.AttributeValue = '';
    $scope.diseaseMedicationList = '';
    $scope.addedTreatmentTypeList = '';
    $scope.AttributeValue = '';
    $scope.addedAddictionList = '';
    var addedFiles = [];
    var addedPFiles = [];
    var arrAddiction = [];
    var diseaseID = 0;
    var arrAttributeID = [];
    var arrAttributeName = [];
    var fileDesc = [];
    var arrTreatmentType = [];
    var arrSupportiveMedication = [];
    var arrMedication = [];
    var arrMedicationName = [];
    var arrInvestigation = [];
    var arrInvestigationName = [];
    $scope.investigationNameList = '';
    $scope.investigationList = '';
    var arrCauseType = [];
    var arrCauseTypeName = [];
    $scope.causeTypeNameList = '';
    var arrSpecialityList = [];
    $scope.aadedSpecialityList = '';
    $scope.causeTypeIDList = '';
    var arrSupportiveMedicationName = [];
    $scope.markerList = '';
    $scope.markerNameList = '';
    var arrMetabolic = [];
    var arrMetabolicName = [];
    $scope.addedMetabolicList = '';
    $scope.addedMetabolicNameList = '';

    var arrMarker = [];
    var arrMarkerName = [];
    var chkSam = [];
    // complication
    $scope.addComplications = function () {

        if (isEmpty($scope.ddlComplication)) {
            toaster.pop('error', "Error", 'Please Select Complication');
            return false;
        }
        for (var i = 0; i < $scope.addedComplicationList.length; i++) {
            if ($scope.addedComplicationList[i].complicationID == $scope.complicationID) {
                toaster.pop('error', "Error", 'Already Added This Complication ');
                return false;
            }
        }
        arrComplication.push({
            complicationsID: $scope.complicationID,
            complicationName: $scope.ddlComplication,
            remark: $scope.txtComplicationRemark
        });
        $scope.addedComplicationList = arrComplication;
    };

    $scope.deleteComplication = function (index) {
        $scope.addedComplicationList.splice(index, 1);
    };

    $scope.addDD = function () {
        if (isEmpty($scope.ddlddProblem)) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        for (var i = 0; i < $scope.addedDD.length; i++) {
            if ($scope.addedDD[i].diseaseId == $scope.ddlddProblem) {
                toaster.pop('error', "Error", 'Already Added This Disease ');
                return false;
            }
        }
        arrDD.push({
            diseaseId: $scope.ddDiseaseID,
            diseaseName: $scope.ddDiseaseName,
            remark: $scope.txtddRemark
        });
        $scope.addedDD = arrDD;
        $scope.ddlddProblem = "";
        $scope.txtddRemark = "";
    };

    $scope.deleteComplication = function (index) {
        $scope.addedComplicationList.splice(index, 1);
    };

    $scope.deleteDD = function (index) {
        $scope.addedDD.splice(index, 1);
    };



    $scope.addMetabolic = function () {
        
        arrMetabolic.push({
            //metabolism details
            metabolismID: $scope.ddlMetabolism,
            cycleID: $scope.ddlCycle,
            enzymeID: $scope.ddlEnzyme,
            metaboliteID: $scope.ddlMetabolitic,
            disorderDescription: $scope.txtMDesc,
            testDetails: $scope.txtMTest,
            treatmentDetails: $scope.txtMTreatment,
            tissue: $scope.txtTissue,
            biofluids: $scope.txtBioFluid,
            cellLocation: $scope.txtCellLocation,
            inheretance: $scope.txtInheretance,
            mprevalence: $scope.txtmPrevalence,
            fate: $scope.txtFate,
            feeder: $scope.txtFeeder,
        });
        arrMetabolicName.push({

            metabolismName: $("#ddlMetabolism option:selected").text(),
            cycleName: $("#ddlCycle option:selected").text(),
            enzymeName: $("#ddlEnzyme option:selected").text(),
            metaboliteName: $("#ddlMetabolitic option:selected").text(),
            disorderDescription: $scope.txtMDesc,
            testDetails: $scope.txtMTest,
            treatmentDetails: $scope.txtMTreatment,
            tissue: $scope.txtTissue,
            biofluids: $scope.txtBioFluid,
            cellLocation: $scope.txtCellLocation,
            inheretance: $scope.txtInheretance,
            mprevalence: $scope.txtmPrevalence,
            fate: $scope.txtFate,
            feeder: $scope.txtFeeder,
        });
        $scope.addedMetabolicList = arrMetabolic;
        $scope.addedMetabolicNameList = arrMetabolicName;
    };

    $scope.deleteAddedMetabolicList = function (index) {
        $scope.addedMetabolicList.splice(index, 1);
        $scope.addedMetabolicNameList.splice(index, 1);
    };
    $scope.deleteInvestigation = function (index) {
        $scope.investigationList.splice(index, 1);
        $scope.investigationNameList.splice(index, 1);
    };

    $scope.addAddiction = function () {

        if ($scope.ddlAddiction == 0) {
            toaster.pop('error', "Error", 'Please Select Addiction');
            return false;
        }

        for (var i = 0; i < $scope.addedAddictionList.length; i++) {
            if ($scope.addedAddictionList[i].addictionID == $scope.ddlAddiction && $scope.addedAddictionList[i].addictionValueID == $scope.ddlAddictionValue) {
                toaster.pop('error', "Error", 'Already Added This Addiction ');
                return false;
            }
        }
        var addictionValueID = 0;
        var addictionValueName = '';
        if ($scope.ddlAddictionValue == 0) {
            addictionValueID = 0;
            addictionValueName = '';
        }
        else {
            addictionValueID = $scope.ddlAddictionValue;
            addictionValueName = $("#ddlAddictionValue option:selected").text();
        }
        arrAddiction.push({
            addictionID: $("#ddlAddiction").val(),
            addictionName: $("#ddlAddiction option:selected").text(),
            addictionValueID: addictionValueID,
            addictionValueName: addictionValueName

        });
        $scope.addedAddictionList = arrAddiction;
    };

    $scope.deleteAddedAddictionList = function (index) {
        $scope.addedAddictionList.splice(index, 1);
    };
    //treatment
    $scope.addTreatmentType = function () {

        if ($scope.ddlTreatmentType == -1) {
            toaster.pop('error', "Error", 'Please Select Treatment Type');
            return false;
        }

        for (var i = 0; i < $scope.addedTreatmentTypeList.length; i++) {
            if ($scope.addedTreatmentTypeList[i].treatmentTypeID == $scope.ddlTreatmentType && $scope.addedTreatmentTypeList[i].stageId == $scope.ddlTreatmentStage) {
                toaster.pop('error', "Error", 'Already Added This Treatment ');
                return false;
            }
        }
        arrTreatmentType.push({
            treatmentTypeID: $("#ddlTreatmentType").val(),
            treatmentTypeName: $("#ddlTreatmentType option:selected").text(),
            treatmentDescription: $scope.txtEmergencyTreatment,
            stageId: $scope.ddlTreatmentStage,
            stageName: $("#ddlTreatmentStage option:selected").text()
        });
        $scope.addedTreatmentTypeList = arrTreatmentType;
    };

    $scope.deleteAddedTreatmentTypeList = function (index) {
        $scope.addedTreatmentTypeList.splice(index, 1);
    };


    //treatment


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
            toaster.pop('error', "Error", 'Please Select Medicine');
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
            remark: remark,
            stageId: $scope.ddlMedicationStage,
            medicineName: $('#ddlMedicine option:selected').text(),
            dosageFormName: dose,
            dosageStrength: $scope.txtStrength,
            minDosageStrength: $scope.txtMinStrength,
            totalDosageStrength: isEmpty($scope.txtMinStrength) ? $scope.txtStrength : $scope.txtMinStrength + ' - ' + $scope.txtStrength,
            doseUnitName: unit,
            doseFrequencyName: frequency,
            durationDays: $scope.txtDuration,
            durationUnit: $scope.ddlMedicationDurationUnit,
            durationUnitName: $("#ddlMedicationDurationUnit option:selected").text(),
            remark: $scope.txtRemark,
            stageName: $("#ddlMedicationStage option:selected").text()
        });
        arrMedicationName.push({

        });

        $scope.diseaseMedicationList = arrMedication;
        //$scope.diseaseMedicationNameList = arrMedicationName;
    };
    // marker list

    $scope.addMarker = function () {
        //alert(1);
        if ($scope.ddlMarker == '-1') {
            toaster.pop('error', "Error", 'Please Select Marker');
            return false;
        }

        arrMarker.push({
            markerID: $scope.ddlMarker,
            markerLevelID: $scope.ddlMarkerLevel,
        });
        arrMarkerName.push({
            markerName: $('#ddlMarker option:selected').text(),
            markerLevel: $('#ddlMarkerLevel option:selected').text()

        });

        $scope.markerList = arrMarker;
        $scope.markerNameList = arrMarkerName;
    };
    $scope.deleteAddedMarkerList = function (index) {
        $scope.markerList.splice(index, 1);
        $scope.markerNameList.splice(index, 1);
    };
    $scope.edtRemarkShowss = function (index) {
        var newStr = "edtRemark" + index;
        var df = $("input#" + newStr).val();
        $scope.investigationList[index].remark = df;
        $scope.investigationNameList[index].remark = df;




        // $(newStr).val("sam");
        // document.getElementById(newStr).value = "sam";
    };
    //$scope.edtRemarkShowss - function (val)
    //{
    //    alert("");
    //    var newStr = "edtRemark" + val;
    //    document.getElementById(newStr).value = "sam";
    // // $scope.newStr = true;
    //    //alert(newStr);
    //};
    //marker list end here 
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
        if ($scope.ddlSymptom == "-1") {
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
            remark: Supportiveremark,
            stageId: $scope.ddlSupportiveMedicationStage
        });
        arrSupportiveMedicationName.push({
            symptomName: $('#ddlSymptom option:selected').text(),
            medicineName: $('#ddlSupportiveMedicine option:selected').text(),
            dosageFormName: Supportivedose,
            dosageStrength: $scope.txtSupportiveStrength,
            doseUnitName: Supportiveunit,
            doseFrequencyName: Supportivefrequency,
            durationDays: $scope.txtSupportiveDuration,
            remark: $scope.txtSupportiveRemark,
            stageName: $("#ddlSupportiveMedicationStage option:selected").text()
        });

        $scope.diseaseSupportiveMedicationList = arrSupportiveMedication;
        $scope.diseaseSupportiveMedicationNameList = arrSupportiveMedicationName;
    };
    $scope.deletediseaseMedication = function (index) {
        $scope.diseaseMedicationList.splice(index, 1);
        $scope.diseaseMedicationNameList.splice(index, 1);
    };

    $scope.deletediseaseSupportiveMedication = function (index) {
        $scope.diseaseSupportiveMedicationList.splice(index, 1);
        $scope.diseaseSupportiveMedicationNameList.splice(index, 1);
    };
    //Disease Investigation

    $scope.addInvestigation = function () {

        if ($scope.ddlSubTest == "-1") {
            toaster.pop('error', "Error", 'Please Select SubTest');
            return false;
        }
        if ($scope.ddlResultType == undefined || $scope.ddlResultType == "-1") {
            toaster.pop('error', "Error", 'Please Select Result Type');
            return false;
        }
        if ($scope.ddlResult == undefined || $scope.ddlResult == "0") {
            toaster.pop('error', "Error", 'Please Select Result');
            return false;
        }

        arrInvestigation.push({
            subTestId: $scope.ddlSubTest,
            isConfirmative: $scope.chkIsConfirmative==true?1:0,
            resultPropertyID: $scope.ddlResultType,
            resultPropertyValueID: $scope.ddlResult,
            stageId: $scope.ddlDiseaseInvestigationStage,
            remark: $scope.txtDiseaseInvestigationRemark
        });
        arrInvestigationName.push({
            subTestName: $('#ddlSubTest option:selected').text(),
            propertyName: $('#ddlResultType option:selected').text(),
            propertyValue: $('#ddlResult option:selected').text(),
            stageName: $("#ddlDiseaseInvestigationStage option:selected").text(),
            remark: $scope.txtDiseaseInvestigationRemark,
            isConfirmative: $scope.chkIsConfirmative==true?'Yes':'No',
        });

        $scope.investigationList = arrInvestigation;
        $scope.investigationNameList = arrInvestigationName;
        log("origional investigation");
        log($scope.investigationList);
    };


    $scope.addProblemCauseAssign = function () {

        if ($scope.ddlCauseType == "0") {
            toaster.pop('error', "Error", 'Please Select Cause Type');
            return false;
        }
        if ($scope.ddlParameter == undefined || $scope.ddlParameter == "0") {
            toaster.pop('error', "Error", 'Please Select Parameter');
            return false;
        }


        arrCauseType.push({
            causeTypeID: $scope.ddlCauseType,
            tableParameterID: $scope.ddlParameter,
            remark: $scope.txtCauseTypeRemark
        });
        arrCauseTypeName.push({
            causeTypeName: $('#ddlCauseType option:selected').text(),
            tableParameterName: $('#ddlParameter option:selected').text(),
            remark: $scope.txtCauseTypeRemark
        });

        $scope.causeTypeIDList = arrCauseType;
        $scope.causeTypeNameList = arrCauseTypeName;
        log("origional causeType");
        log($scope.causeTypeList);
    };
    $scope.deleteProblemCauseAssign = function (index) {
        $scope.causeTypeIDList.splice(index, 1);
        $scope.causeTypeNameList.splice(index, 1);
    };

    //problemID: $scope.ddlProblem,
    //    causeTypeID: $scope.ddlCauseType,
    //        parameterID: $scope.ddlParameter,
    //            remark: $scope.txtRemark,
    //on stage input change
    //$scope.changeInputStage = function () {
    //    for (var y = 0; y < $scope.attributeList.length; y++) {
    //        for (var i = 0; i < $scope.stageList.length; i++) {
    //            if (typeof $scope.stagechk[y] !== "undefined") {
    //                if ($scope.stagechk[y][i]) {
    //                    alert(y + ',' + i);
    //                }
    //            }

    //        }
    //    }
    //    }
    //    //for (var iii = 0; iii < chkSam.length; iii++) {
    //    //    if (chkSam[iii].insertedID == i) {
    //    //        chkHu = 1;
    //    //    }
    //    //    else {
    //    //        chkHu = 0;
    //    //    }
    //    //}

    //    //if (catId == false) {

    //    //}
    //    //else {
    //    //    arrAttributeID.push({
    //    //        inputTypeId: $scope.attributeList[i].inputTypeId,
    //    //        problemId: $scope.attributeList[i].problemId,
    //    //        attributeId: $scope.attributeList[i].attributeId,
    //    //        attributeValueId: $scope.attributeList[i].attributeValueId,
    //    //        occurenceId: $scope.attributeList[i].occurenceId,
    //    //        stageId: dbStageId
    //    //    });
    //    //    arrAttributeName.push({
    //    //        inputTypeName: $scope.attributeNameList[i].inputTypeName,
    //    //        problemName: $scope.attributeNameList[i].problemName,
    //    //        attributeName: $scope.attributeNameList[i].attributeName,
    //    //        attributeValueName: $scope.attributeNameList[i].attributeValueName,
    //    //        occurenceName: $scope.attributeNameList[i].occurenceName,
    //    //        stageName: dbStageName
    //    //    });

    //    //}



    //            //if ($scope.attributeList[x].inputTypeId == $scope.attributeList[i].inputTypeId
    //            //    && $scope.attributeList[x].problemId == $scope.attributeList[i].problemId
    //            //    && $scope.attributeList[x].attributeId == $scope.attributeList[i].attributeId
    //            //    && $scope.attributeList[x].attributeValueId == $scope.attributeList[i].attributeValueId
    //            //    && $scope.attributeList[x].occurenceId == $scope.attributeList[i].occurenceId
    //            //    && $scope.attributeList[x].stageId == dbStageId
    //            //) {






    //            //}
    //            //else {


    //    //        //}
    //    //log($scope.attributeList);
    //    //    $scope.attributeList = arrAttributeID;
    //    //    $scope.attributeNameList = arrAttributeName;

    //    };




    //disease input attribute

    $scope.addAttribute = function () {
        if ($scope.ddlInputType == -1) {
            alert('Please Select Input Type !!');
            return false;
        }
        //if ($scope.ddlInputProblem == -1) {
        if (isEmpty($scope.ddlInputProblem)) {
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
                            //problemId: $scope.ddlInputProblem,
                            problemId: $scope.problemID,
                            attributeId: $scope.ddlAttributeName,
                            attributeValueId: $scope.AttributeValue[i].problemAttributeValueId,
                            occurenceId: $scope.ddlDiseaseInputOccurence,
                            stageId: $scope.ddlDiseaseInputStage,
                        });
                        arrAttributeName.push({
                            inputTypeName: $('#ddlInputType option:selected').text(),
                            //problemName: $('#ddlInputProblem option:selected').text(),
                            problemName: $scope.ddlInputProblem,
                            attributeName: $scope.AttributeValue[i].attributeName,
                            attributeValueName: $scope.AttributeValue[i].attributeValue,
                            occurenceName: $('#ddlDiseaseInputOccurence option:selected').text(),
                            stageName: $('#ddlDiseaseInputStage option:selected').text()
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
                //problemId: $scope.ddlInputProblem,
                problemId: $scope.problemID,
                attributeId: 0,
                attributeValueId: 0,
                occurenceId: $scope.ddlDiseaseInputOccurence,
                stageId: $scope.ddlDiseaseInputStage,
            });
            arrAttributeName.push({
                inputTypeName: $('#ddlInputType option:selected').text(),
                //problemName: $('#ddlInputProblem option:selected').text(),
                problemName: $scope.ddlInputProblem,
                attributeName: "",
                attributeValueName: "",
                occurenceName: $('#ddlDiseaseInputOccurence option:selected').text(),
                stageName: $('#ddlDiseaseInputStage option:selected').text()
            });

        }
        log(arrAttributeID);
        $scope.attributeList = arrAttributeID;
        $scope.attributeNameList = arrAttributeName;
    };


    $scope.deleteAttribute = function (index) {
        $scope.attributeList.splice(index, 1);
        $scope.attributeNameList.splice(index, 1);
    };

    ///disease input attribute
    $scope.rdBoth = 'Both';



    $scope.getDiseaseDetailsByName = function () {
        var param = {
            //diseaseName: $scope.ddlddProblem
        };
        dataFactory.getDiseaseDetailsByName(param).then(function (response) {
            var result = response.data;
            $scope.ddDiseaseList = result.diseaseDetailsDiseaseNameList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.initControls = function () {
        var param = {
            diseaseName: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.InitControlsDiseaseDepartmentNew(param).then(function (response) {
            var result = response.data;
            $scope.diseaseDepartmentList = result.diseaseDepartment;
            $scope.ageUnitList = result.ageUnitList;

            $scope.departmentList = result.departmentList;
            $scope.occurenceList = result.occurenceList;
            $scope.addictionList = result.addiquateList;
            $scope.dietStyleList = result.dietStyleList;
            $scope.treatmentTypeList = result.treatmentTypeList;
            $scope.medicineList = result.medicineList;
            $scope.DosageFormMasterList = result.dosageFormMaster;
            $scope.FrequencyMasterList = result.frequencyList;
            $scope.unitList = result.doseUnitList;
            $scope.addictionList = result.addiquateList;
            //$scope.ProblemMasterList = result.problemList;
            $scope.MarkerList = result.markerList;
            $scope.MarkerLevelList = result.markerLevelList;

            $scope.metabolismList = result.metabolismList;
            $scope.cycleList = result.cycleList;
            $scope.enzymeList = result.enzymeList;
            $scope.metaboliticList = result.metaboliticList;
            $scope.subTestList = result.subTestList;
            $scope.resultTypeList = result.resultTypeList;
            $scope.resultList = result.resultList;
            $scope.causeTypeList = result.causeTypeList;
            $scope.specialityList = result.specialityList;
            $scope.durationUnitList = result.durationUnitList;
            $scope.bookList = result.bookList;
            $scope.getDiseaseDetailsByName();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.getParameterList = function (paramid) {

        if (paramid != 0) {



            var params = {
                causeTypeID: paramid

            };
            dataFactory.ProblemCauseTypeAssignParameterList(params).then(function (response) {
                var result = response.data;
                $scope.parameterList = result.parameterList;
                //if (selectedID != 0) {

                //    $scope.ddlParameter = selectedID;
                //}
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }

    };



    $scope.ShowHide = function () {
        if ($scope.ddlProblem > 0) {
            $scope.IsVisible = true;
        }
        else {
            $scope.IsVisible = false;
        }
    };


    $scope.$watch('diseaseID', function (newValue, oldValue, scope) {
        if (!isEmptyValue(newValue)) {
            $scope.GetDetailsByOrgan();
        }
    });
    $scope.$watch('problemID', function (newValue, oldValue, scope) {
        if (!isEmptyValue(newValue)) {           
            $scope.AttValueList();
        }
    });
    $scope.GetDetailsByOrgan = function () {
        if ($scope.diseaseID == '' || $scope.diseaseID == 0) {
            diseaseID = 0;
        }
        else {
            diseaseID = $scope.diseaseID;
        }
        var param = {
            departmentID: $scope.ddlDepartment,
            diseaseID: diseaseID,
            regionID: $scope.ddlRegion,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.diseaseDepartmentNameByOrgan(param).then(function (response) {
            var result = response.data;
            if (result.diseaseDepartmentIDList.length > 0) {


                $scope.ids = result.diseaseDepartmentIDList[0].id;

                $scope.edit($scope.ids);
            }
            else {
                //$scope.clr2();
                toaster.pop('error', "Error", 'Disease Not Found');

            }

        }, function (error) {
            toaster.pop('error', "Error", error.data);
            $scope.ddlDepartment = 0;
        });
    }
    $scope.iTypeList = function () {
        $scope.organList = [];
        check = 1;
        if ($scope.diseaseID == '' || $scope.diseaseID == 0) {
            diseaseID = 0;
        }
        else {
            diseaseID = $scope.diseaseID;
        }
        var param = {
            diseaseID: diseaseID,
            departmentID: $scope.ddlDepartment
        };

        dataFactory.DiseaseDepartmentInputTypeListNew(param).then(function (response) {
            var result = response.data;
            $scope.InputTypeList = result.historyInputTypeMaster;

            $scope.DiseaseHistoryList = result.historyList;
            $scope.organList = result.organList;
            // log(result.diseaseDepartmentIDList);

        }, function (error) {
            toaster.pop('error', "Error", error.data);
            $scope.ddlDepartment = 0;
        });
    };


    $scope.checkRegion = function (ddlRegion) {
        if ($scope.diseaseID == '' || $scope.diseaseID == 0) {
            diseaseID = 0;
        }
        else {
            diseaseID = $scope.diseaseID;
        }
        if ($scope.chkRegion) {
            var param = {
                diseaseID: diseaseID,
                departmentID: $scope.ddlDepartment
            };
            dataFactory.DiseaseDepartmentBindRegionList(param).then(function (response) {
                var result = response.data;
                $scope.organList = result.organList;
                $scope.ddlRegion = ddlRegion;
            }, function (error) {
                toaster.pop('error', "Error", error.data);

            });

        }
        else {
            var param = {
                diseaseID: 0,
                departmentID: 0
            };
            dataFactory.DiseaseDepartmentBindRegionList(param).then(function (response) {
                var result = response.data;
                $scope.organList = result.organList;
                $scope.ddlRegion = ddlRegion;
            }, function (error) {
                toaster.pop('error', "Error", error.data);

            });
        }

    };


    $scope.AttValueList = function () {
      
        var param = {
            //problemMasterID: $scope.ddlInputProblem
            problemMasterID: $scope.problemID
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


    $scope.goToClassification = function () {
        $('#myModal').modal('show');
    };

    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        var timeStamp = new Date().getTime();

        angular.forEach($files, function (value, key) {

            formdata.append(key, value);



        });
    };

    $scope.addImage = function () {

        addedFiles = [];
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;
            for (var i = 0; i < result.length; i++) {
                fileDesc.push($scope.txtFileDesc);
                addedFiles.push({
                    filePath: result[i],
                    fileDescription: fileDesc[i],
                    stageId: $scope.ddlFileDetailStage,
                    stageName: $('#ddlInputType option:selected').text()
                });
            }


            $scope.addedFileList = addedFiles;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.deleteAddedFileList = function (index) {
        $scope.addedFileList.splice(index, 1);
        fileDesc.splice(index, 1);
    };



    $scope.addSpeciality = function () {

        for (var i = 0; i < $scope.aadedSpecialityList.length; i++) {
            if ($scope.aadedSpecialityList[i].specialityID == $scope.ddlSpecialityList) {
                toaster.pop('error', "Error", 'Already Added This Speciality ');
                return false;
            }
        }
        arrSpecialityList.push({
            specialityID: $scope.ddlSpecialityList,
            specialityName: $('#ddlSpecialityList option:selected').text()

        });
        $scope.aadedSpecialityList = arrSpecialityList;

    };
    $scope.deleteSpeciality = function (index) {
        $scope.aadedSpecialityList.splice(index, 1);
    };



    $scope.reset = function () {
        $scope.clr();
        $scope.initControls();
    };


    $scope.getPathopyscologyFiles = function ($files) {

        angular.forEach($files, function (value, key) {

            formdata.append(key, value);



        });
        $scope.addPathopyscologyFiles();
    };
    $scope.addPathopyscologyFiles = function () {

        addedPFiles = [];
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;
            //for (var i = 0; i < result.length; i++) {
            fileDesc.push($scope.txtFileDesc);
            addedPFiles.push({
                filePath: result[0],

            });
            //}


            $scope.addedPFileList = addedPFiles;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.deleteAddedPFileList = function (index) {
        $scope.addedPFileList.splice(index, 1);
        fileDesc.splice(index, 1);
    };

    $scope.saveDiseaseDepartment = function () {

        log("cause");
        log($scope.causeTypeIDList);
        if ($scope.txtDisease == 0) {
            toaster.pop('error', "Error", 'Please Enter Problem');
            return false;
        }
        if ($scope.ddlRegion == 0) {
            toaster.pop('error', "Error", 'Please Select Organ region');
            return false;
        }
        for (var i = 0; i < $scope.addedPFileList.length; i++) {
            pFile = $scope.addedPFileList[0].filePath;

        }
        //if ($scope.addedMetabolicList.length > 0) {
        //    $scope.addedMetabolicList = $scope.addedMetabolicList;
        //}
        //else {
        //    $scope.addedMetabolicList = null;
        //}






        var newAttributeList = [];
        var chkAttributeList = [];
        var newAttributeListOld = [];
        var newAttributeListNew = [];
        var attStageID = -1;
        var attStageName = 0;
        var chk1 = 0;
        //new stage checkbox adding

        newAttributeListOld = $scope.attributeList;
        log(newAttributeListOld);

        $scope.newArray1 = '';

        //log($scope.attributeNameList);
        for (var y = 0; y < $scope.attributeList.length; y++) {

            for (var i = 0; i < $scope.stageList.length; i++) {

                //log($("#stagechk" + y + i).prop("checked"));
                if ($("#stagechk" + y + i).prop("checked") == true) {
                    chkAttributeList.indexOf(y) === -1 ? chkAttributeList.push(y) : console.log("This item already exists");

                    newAttributeList.push({
                        inputTypeId: $scope.attributeList[y].inputTypeId,
                        problemId: $scope.attributeList[y].problemId,
                        attributeId: $scope.attributeList[y].attributeId,
                        attributeValueId: $scope.attributeList[y].attributeValueId,
                        occurenceId: $scope.attributeList[y].occurenceId,
                        stageId: $scope.stageList[i].diseaseStageClassificationID
                    });
                    chk1 = 1;
                }
                else {

                }

            }
        }

        newAttributeListNew.length = 0;
        newAttributeListNew = [];

        newAttributeListNew = newAttributeListOld.concat(newAttributeList);


        var finalArrayAtt = [];
        var s = 0;


        for (var w = 0; w < newAttributeListNew.length; w++) {

            for (var q = 0; q < chkAttributeList.length; q++) {
                var index = chkAttributeList[q];
                if (index == w) {
                    s = 0;
                    break;
                }
                else {
                    s = 1;

                }
            }

            if (s == 1) {
                finalArrayAtt.push({
                    inputTypeId: newAttributeListNew[w].inputTypeId,
                    problemId: newAttributeListNew[w].problemId,
                    attributeId: newAttributeListNew[w].attributeId,
                    attributeValueId: newAttributeListNew[w].attributeValueId,
                    occurenceId: newAttributeListNew[w].occurenceId,
                    stageId: newAttributeListNew[w].stageId
                });
            }


        }
        if (chk1 > 0) {

        }
        else {
            finalArrayAtt = $scope.attributeList;
        }
        log(finalArrayAtt);


        /////////////////////////////////////////////treatment/////////////////////////////////
        /* treatment end for stage here */
        var newTreatmentList = [];
        var chkTreatmentList = [];
        var newTreatmentListOld = [];
        var newTreatmentListNew = [];
        var treatmentStageID = -1;
        var treatmentStageName = 0;

        var chk2 = 0;
        //new stage checkbox adding

        newTreatmentListOld = $scope.addedTreatmentTypeList;


        $scope.newArray1 = '';
        for (var y = 0; y < $scope.addedTreatmentTypeList.length; y++) {

            for (var i = 0; i < $scope.stageList.length; i++) {
                if ($("#treatmentchk" + y + i).prop("checked") == true) {
                    chkTreatmentList.indexOf(y) === -1 ? chkTreatmentList.push(y) : console.log("This item already exists");

                    newTreatmentList.push({
                        treatmentTypeID: $scope.addedTreatmentTypeList[y].treatmentTypeID,
                        treatmentTypeName: $scope.addedTreatmentTypeList[y].treatmentTypeName,
                        treatmentDescription: $scope.addedTreatmentTypeList[y].treatmentDescription,
                        stageId: $scope.stageList[i].diseaseStageClassificationID,
                        stageName: $scope.stageList[i].stageClassficationName
                    });
                    chk2 = 1;
                }
                else {

                }

            }
        }

        newTreatmentListNew.length = 0;
        newTreatmentListNew = [];

        newTreatmentListNew = newTreatmentListOld.concat(newTreatmentList);


        var finalArrayTreatment = [];
        var s = 0;


        for (var w = 0; w < newTreatmentListNew.length; w++) {

            for (var q = 0; q < chkTreatmentList.length; q++) {
                var index = chkTreatmentList[q];
                if (index == w) {
                    s = 0;
                    break;
                }
                else {
                    s = 1;

                }
            }

            if (s == 1) {
                finalArrayTreatment.push({
                    treatmentTypeID: newTreatmentListNew[w].treatmentTypeID,
                    treatmentTypeName: newTreatmentListNew[w].treatmentTypeName,
                    treatmentDescription: newTreatmentListNew[w].treatmentDescription,
                    stageId: newTreatmentListNew[w].stageId,
                    stageName: newTreatmentListNew[w].stageName
                });
            }


        }
        if (chk2 > 0) {

        }
        else {
            finalArrayTreatment = $scope.addedTreatmentTypeList;
        }
        log(finalArrayTreatment);
        /////////////////////////////////////////////treatment/////////////////////////////////
        /* treatment end for stage here */

        /////////////////////////////////////////////medication/////////////////////////////////
        /* medication start for stage here */
        var newmedicationList = [];
        var chkmedicationList = [];
        var newmedicationListOld = [];
        var newmedicationListNew = [];
        var medicationStageID = -1;
        var medicationStageName = 0;

        var chk3 = 0;
        //new stage checkbox adding

        var choiceOf = 0;
        var choiceOfName = 'No';
        //add choice of drug
        var cmedication = [];
        for (var y = 0; y < $scope.diseaseMedicationList.length; y++) {

            if ($scope.diseaseMedicationList[y].choiceOf == true) {
                choiceOf = 1;
                choiceOfName = 'Yes';
            }
            else {
                choiceOf = 0;
                choiceOfName = 'No';
            }
            cmedication.push({
                medicineId: $scope.diseaseMedicationList[y].medicineId,
                dosageFormId: $scope.diseaseMedicationList[y].dosageFormId,
                dosageStrength: $scope.diseaseMedicationList[y].dosageStrength,
                minDosageStrength: $scope.diseaseMedicationList[y].minDosageStrength,
                doseUnitId: $scope.diseaseMedicationList[y].doseUnitId,
                doseFrequencyId: $scope.diseaseMedicationList[y].doseFrequencyId,
                durationDays: $scope.diseaseMedicationList[y].durationDays,
                durationUnit: $scope.diseaseMedicationList[y].durationUnit,
                remark: $scope.diseaseMedicationList[y].remark,
                stageId: $scope.diseaseMedicationList[y].stageId,
                choiceOf: choiceOf,
                choiceOfName: choiceOfName


            });
        }
        log("faheem");
        log(cmedication);
        $scope.diseaseMedicationList = cmedication;
        //add choice of drug

        newmedicationListOld = $scope.diseaseMedicationList;


        $scope.newArray1 = '';
        for (var y = 0; y < $scope.diseaseMedicationList.length; y++) {

            for (var i = 0; i < $scope.stageList.length; i++) {
                if ($("#medicationchk" + y + i).prop("checked") == true) {
                    chkmedicationList.indexOf(y) === -1 ? chkmedicationList.push(y) : console.log("This item already exists");

                    newmedicationList.push({
                        medicineId: $scope.diseaseMedicationList[y].medicineId,
                        dosageFormId: $scope.diseaseMedicationList[y].dosageFormId,
                        dosageStrength: $scope.diseaseMedicationList[y].dosageStrength,
                        minDosageStrength: $scope.diseaseMedicationList[y].minDosageStrength,
                        doseUnitId: $scope.diseaseMedicationList[y].doseUnitId,
                        doseFrequencyId: $scope.diseaseMedicationList[y].doseFrequencyId,
                        durationDays: $scope.diseaseMedicationList[y].durationDays,
                        durationUnit: $scope.diseaseMedicationList[y].durationUnit,
                        remark: $scope.diseaseMedicationList[y].remark,
                        stageId: $scope.stageList[i].diseaseStageClassificationID,
                        choiceOf: $scope.diseaseMedicationList[y].choiceOf
                    });
                    chk3 = 1;
                }
                else {

                }

            }
        }

        newmedicationListNew.length = 0;
        newmedicationListNew = [];

        newmedicationListNew = newmedicationListOld.concat(newmedicationList);


        var finalArraymedication = [];
        var s = 0;


        for (var w = 0; w < newmedicationListNew.length; w++) {

            for (var q = 0; q < chkmedicationList.length; q++) {
                var index = chkmedicationList[q];
                if (index == w) {
                    s = 0;
                    break;
                }
                else {
                    s = 1;

                }
            }

            if (s == 1) {
                finalArraymedication.push({
                    medicineId: newmedicationListNew[w].medicineId,
                    dosageFormId: newmedicationListNew[w].dosageFormId,
                    dosageStrength: newmedicationListNew[w].dosageStrength,
                    minDosageStrength: newmedicationListNew[w].minDosageStrength,
                    doseUnitId: newmedicationListNew[w].doseUnitId,
                    doseFrequencyId: newmedicationListNew[w].doseFrequencyId,
                    durationDays: newmedicationListNew[w].durationDays,
                    durationUnit: newmedicationListNew[w].durationUnit,
                    remark: newmedicationListNew[w].remark,
                    stageId: newmedicationListNew[w].stageId,
                    choiceOf: newmedicationListNew[w].choiceOf
                });
            }


        }
        if (chk3 > 0) {

        }
        else {
            finalArraymedication = $scope.diseaseMedicationList;
        }

        log("sandepp2345");
        log(finalArraymedication);
        /////////////////////////////////////////////supportive/////////////////////////////////
        /* medication end for stage here */

        /////////////////////////////////////////////medication/////////////////////////////////
        /* medication start for stage here */
        var newSupportiveMedicationList = [];
        var chkSupportiveMedicationList = [];
        var newSupportiveMedicationListOld = [];
        var newSupportiveMedicationListNew = [];
        var medicationStageID = -1;
        var medicationStageName = 0;

        var chk4 = 0;
        //new stage checkbox adding

        newSupportiveMedicationListOld = $scope.diseaseSupportiveMedicationList;


        $scope.newArray1 = '';
        for (var y = 0; y < $scope.diseaseSupportiveMedicationList.length; y++) {

            for (var i = 0; i < $scope.stageList.length; i++) {
                if ($("#supportiveMedicationChk" + y + i).prop("checked") == true) {
                    chkSupportiveMedicationList.indexOf(y) === -1 ? chkSupportiveMedicationList.push(y) : console.log("This sss already exists");

                    newSupportiveMedicationList.push({

                        symptomId: $scope.diseaseSupportiveMedicationList[y].symptomId,
                        medicineId: $scope.diseaseSupportiveMedicationList[y].medicineId,
                        dosageFormId: $scope.diseaseSupportiveMedicationList[y].dosageFormId,
                        dosageStrength: $scope.diseaseSupportiveMedicationList[y].dosageStrength,
                        doseUnitId: $scope.diseaseSupportiveMedicationList[y].doseUnitId,
                        doseFrequencyId: $scope.diseaseSupportiveMedicationList[y].doseFrequencyId,
                        durationDays: $scope.diseaseSupportiveMedicationList[y].durationDays,
                        remark: $scope.diseaseSupportiveMedicationList[y].remark,
                        stageId: $scope.stageList[i].diseaseStageClassificationID
                    });
                    chk4 = 1;
                }
                else {

                }

            }
        }

        newSupportiveMedicationListNew.length = 0;
        newSupportiveMedicationListNew = [];

        newSupportiveMedicationListNew = newSupportiveMedicationListOld.concat(newSupportiveMedicationList);

        log(newSupportiveMedicationListNew);
        var finalArraySupportiveMedication = [];
        var s = 0;


        for (var w = 0; w < newSupportiveMedicationListNew.length; w++) {

            for (var q = 0; q < chkSupportiveMedicationList.length; q++) {
                var index = chkSupportiveMedicationList[q];
                if (index == w) {
                    s = 0;
                    break;
                }
                else {
                    s = 1;

                }
            }

            if (s == 1) {
                finalArraySupportiveMedication.push({
                    symptomId: newSupportiveMedicationListNew[w].symptomId,
                    medicineId: newSupportiveMedicationListNew[w].medicineId,
                    dosageFormId: newSupportiveMedicationListNew[w].dosageFormId,
                    dosageStrength: newSupportiveMedicationListNew[w].dosageStrength,
                    doseUnitId: newSupportiveMedicationListNew[w].doseUnitId,
                    doseFrequencyId: newSupportiveMedicationListNew[w].doseFrequencyId,
                    durationDays: newSupportiveMedicationListNew[w].durationDays,
                    remark: newSupportiveMedicationListNew[w].remark,
                    stageId: newSupportiveMedicationListNew[w].stageId
                });
            }


        }
        if (chk4 > 0) {

        }
        else {
            finalArraySupportiveMedication = $scope.diseaseSupportiveMedicationList;
        }
        log(finalArraySupportiveMedication);
        /////////////////////////////////////////////medication/////////////////////////////////
        /* medication end for stage here */




        /////////////////////////////////////////////File Details Stage/////////////////////////////////
        /* FileDetails Stage start for stage here */
        var newFileDetailsList = [];
        var chkFileDetailsList = [];
        var newFileDetailsListOld = [];
        var newFileDetailsListNew = [];
        var medicationStageID = -1;
        var medicationStageName = 0;

        var chk5 = 0;
        //new stage checkbox adding

        newFileDetailsListOld = $scope.addedFileList;


        $scope.newArray1 = '';
        for (var y = 0; y < $scope.addedFileList.length; y++) {

            for (var i = 0; i < $scope.stageList.length; i++) {
                if ($("#fileDetailChk" + y + i).prop("checked") == true) {
                    chkFileDetailsList.indexOf(y) === -1 ? chkFileDetailsList.push(y) : console.log("This sss already exists");

                    newFileDetailsList.push({

                        filePath: $scope.addedFileList[y].filePath,
                        fileDescription: $scope.addedFileList[y].fileDescription,
                        stageId: $scope.stageList[i].diseaseStageClassificationID,
                        stageName: $scope.stageList[i].stageClassficationName
                    });
                    chk5 = 1;
                }
                else {

                }

            }
        }

        newFileDetailsListNew.length = 0;
        newFileDetailsListNew = [];

        newFileDetailsListNew = newFileDetailsListOld.concat(newFileDetailsList);

        //log(newFileDetailsListNew);
        var finalArrayFileDetails = [];
        var s = 0;


        for (var w = 0; w < newFileDetailsListNew.length; w++) {

            for (var q = 0; q < chkFileDetailsList.length; q++) {
                var index = chkFileDetailsList[q];
                if (index == w) {
                    s = 0;
                    break;
                }
                else {
                    s = 1;

                }
            }

            if (s == 1) {
                finalArrayFileDetails.push({
                    filePath: newFileDetailsListNew[w].filePath,
                    fileDescription: newFileDetailsListNew[w].fileDescription,
                    stageId: newFileDetailsListNew[w].stageId,
                    stageName: newFileDetailsListNew[w].stageName
                });
            }


        }
        if (chk5 > 0) {

        }
        else {
            finalArrayFileDetails = $scope.addedFileList;
        }
        //log(finalArrayFileDetails);
        /////////////////////////////////////////////File Details Stage/////////////////////////////////

        /////////////////////////////////////////////Investigation/////////////////////////////////
        /* investigation start for stage here */
        var newInvestigationList = [];
        var chkInvestigationList = [];
        var newInvestigationListOld = [];
        var newInvestigationListNew = [];
        var investigationStageID = -1;
        var investigationStageName = 0;

        var chk6 = 0;
        //new stage checkbox adding

        newInvestigationListOld = $scope.investigationList;
        log("sam investigation");
        log($scope.investigationList);

        $scope.newArray1 = '';
        var isConfirmative = 0;
        if ($scope.chkIsConfirmative === 1) {
            isConfirmative = 1;

        }
        else {
            isConfirmative = 0;
        }
        console.log(isConfirmative);
        for (var y = 0; y < $scope.investigationList.length; y++) {

            for (var i = 0; i < $scope.stageList.length; i++) {
                if ($("#investigationStageChk" + y + i).prop("checked") == true) {
                    chkInvestigationList.indexOf(y) === -1 ? chkInvestigationList.push(y) : console.log("This item already exists");


                    newInvestigationList.push({
                        subTestId: $scope.investigationList[y].subTestId,
                        isConfirmative: $scope.investigationList[y].isConfirmative,
                        resultPropertyID: $scope.investigationList[y].resultPropertyID,
                        resultPropertyValueID: $scope.investigationList[y].resultPropertyValueID,

                        stageId: $scope.stageList[i].diseaseStageClassificationID
                    });
                    chk6 = 1;
                    var mydata = newInvestigationList;
                    console.log(mydata);
                    console.log('fahimm');
                }
                else {

                }

            }
        }

        newInvestigationListNew.length = 0;
        newInvestigationListNew = [];

        newInvestigationListNew = newInvestigationListOld.concat(newInvestigationList);


        var finalArrayInvestigation = [];
        var s = 0;


        for (var w = 0; w < newInvestigationListNew.length; w++) {

            for (var q = 0; q < chkInvestigationList.length; q++) {
                var index = chkInvestigationList[q];
                if (index == w) {
                    s = 0;
                    break;
                }
                else {
                    s = 1;

                }
            }

            if (s == 1) {
                finalArrayInvestigation.push({
                    subTestId: newInvestigationListNew[w].subTestId,
                    isConfirmative: newInvestigationListNew[w].isConfirmative,
                    resultPropertyID: newInvestigationListNew[w].resultPropertyID,
                    resultPropertyValueID: newInvestigationListNew[w].resultPropertyValueID,
                    stageId: newInvestigationListNew[w].stageId
                });
            }


        }
        if (chk6 > 0) {

        }
        else {
            finalArrayInvestigation = $scope.investigationList;
        }

        log("investigation");
        log(finalArrayInvestigation);

        
        /* File Details Stage end for stage here */
        log($scope.addedComplicationList);
        var params = {
            diseaseID: $scope.diseaseID,
            diseaseDepartmentID: diseaseDepartmentID,
            problemMasterID: $scope.txtProblem,
            diseaseName: $scope.txtDisease,
            departmentID: $scope.ddlDepartment,
            regionID: $scope.ddlRegion,
            ageFrom: $scope.txtAgeFrom,
            ageTo: $scope.txtAgeTo,
            ageUnit: $scope.ddlAgeUnit,
            icdCode: $scope.txtICD,
            gender: $scope.rdMale == 'Male' ? 'Male' : $scope.rdFemale == 'Female' ? 'Female' : $scope.rdBoth == 'Both' ? 'Both' : null,
            occurence: $scope.ddlOccurence,
            dietStyleID: $scope.ddlDietStyle,
            lstDiseaseFileList: finalArrayFileDetails,
            lstAddictionList: $scope.addedAddictionList,
            prevalence: $scope.txtPrevalence,
            incidence: $scope.txtIncidence,
            isGenetic: $scope.rdIsGenetic,
            prognosis: $scope.txtPrognosis,
            diseaseDetails: $scope.txtDiseaseDetails,
            dtDiseaseInput: finalArrayAtt,
            lstTreatmentTypeList: finalArrayTreatment,
            dtDiseaseMedication: finalArraymedication,
            dtDiseaseSupportiveMedicine: finalArraySupportiveMedication,
            dtDiseaseInvestigation: finalArrayInvestigation,
            lstCauseTypeList: $scope.causeTypeIDList,
            preventionToDo: $scope.txtPreventionToDo,
            preventionNotToDo: $scope.txtPreventionNotToDo,
            provisionalDiet: $scope.txtProvisionalDiet,
            SOP: $scope.txtSOP,
            pathopyscology: $scope.txtPathopyscology,
            pFile: pFile,
            diseaseNature: $scope.txtDiseaseNature,
            diseaseClassification: $scope.txtDiseaseClassification,
            lstSpecialityList: $scope.aadedSpecialityList,

            markerLevelList: $scope.markerList,
            lstMetabolicList: $scope.addedMetabolicList,
            lstDiseaseComplications: $scope.addedComplicationList,
            lstddDisease: $scope.addedDD,

            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,


            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        //log(params);
        //sandeep2
        dataFactory.SaveDiseaseDepartmentNew(params).then(function (response) {
            $scope.initControls();
            $scope.clr();
            $scope.clr2();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id, problemID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                diseaseDepartmentID: id,
                problemMasterID: problemID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseDepartmentNew(params).then(function (response) {
                $scope.initControls();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {

        diseaseDepartmentID = paramid;
        var params = {
            diseaseDepartmentID: paramid
        };
        dataFactory.DiseaseDepartmentListNew(params).then(function (response) {
            //$scope.clr2();

            var result = response.data;
            var diseaseDepartmentList = result.diseaseDepartmentList;
            log("22-02-2020")
            log(diseaseDepartmentList);
            var fileDetailList = result.fileDetailList;
            var ddAdictionList = result.ddAdictionList;
            var ddInputList = result.ddInputList;
            var ddTreatmentList = result.ddTreatmentList;
            var ddMedicationList = result.ddMedicationList;
            var ddSupportiveMedicationList = result.ddSupportiveMedicationList;
            var preventionList = result.preventionList;
            var ddMarkerList = result.markerList;
            var ddMetaList = result.metaList;
            var ddInvestigationList = result.investigationList;
            var ddCauseTypeAssign = result.cuaseTypeList;
            var ddSpecialityList = result.specialityList;
            var ddComplicationList = result.complicationList;
            var ddDiseaseList = result.ddDiseaseList;
            $scope.stageList = result.stageList;
            if (result.stageList.length > 1) {
                $scope.sideNav = true;
            }
            else {
                $scope.sideNav = false;
            }

            arrComplication = [];
            for (var i = 0; i < ddComplicationList.length; i++) {
                arrComplication.push({
                    complicationsID: ddComplicationList[i].complicationID,
                    complicationName: ddComplicationList[i].complicationName,
                    remark: ddComplicationList[i].remark
                });
            }

            $scope.addedComplicationList = arrComplication;


            arrDD = [];
            for (var i = 0; i < ddDiseaseList.length; i++) {
                arrDD.push({
                    diseaseId: ddDiseaseList[i].diseaseID,
                    diseaseName: ddDiseaseList[i].diseaseName,
                    remark: ddDiseaseList[i].remark
                });
            }

            $scope.addedDD = arrDD;

            
            arrSpecialityList = [];

            if (ddSpecialityList.length > 0) {
                for (var i = 0; i < ddSpecialityList.length; i++) {
                    arrSpecialityList.push({
                        specialityID: ddSpecialityList[i].specialityID,
                        specialityName: ddSpecialityList[i].specialityName
                    });

                }

                $scope.aadedSpecialityList = arrSpecialityList;
            }


            arrCauseType = [];
            arrCauseTypeName = [];
            if (ddCauseTypeAssign.length > 0) {
                for (var i = 0; i < ddCauseTypeAssign.length; i++) {

                    arrCauseType.push({
                        causeTypeID: ddCauseTypeAssign[i].causeTypeID,
                        tableParameterID: ddCauseTypeAssign[i].tableParameterID,
                        remark: ddCauseTypeAssign[i].remark
                    });
                    arrCauseTypeName.push({
                        causeTypeName: ddCauseTypeAssign[i].causeTypeName,
                        tableParameterName: ddCauseTypeAssign[i].tableParameterName,
                        remark: ddCauseTypeAssign[i].remark
                    });
                }

                $scope.causeTypeIDList = arrCauseType;
                $scope.causeTypeNameList = arrCauseTypeName;
            }
            arrMetabolic = [];
            arrMetabolicName = [];
            if (ddMetaList.length > 0) {
                for (var i = 0; i < ddMetaList.length; i++) {

                    arrMetabolic.push({
                        //metabolism details
                        metabolismID: ddMetaList[i].metabolismID,
                        cycleID: ddMetaList[i].cycleID,
                        enzymeID: ddMetaList[i].enzymeID,
                        metaboliteID: ddMetaList[i].metaboliteID,
                        disorderDescription: ddMetaList[i].disorderDescription,
                        testDetails: ddMetaList[i].testDetails,
                        treatmentDetails: ddMetaList[i].treatmentDetails,
                        tissue: ddMetaList[i].tissue,
                        biofluids: ddMetaList[i].biofluids,
                        cellLocation: ddMetaList[i].cellLocation,
                        inheretance: ddMetaList[i].inheretance,
                        mprevalence: ddMetaList[i].prevalence,
                        fate: ddMetaList[i].fate,
                        feeder: ddMetaList[i].feeder
                    });
                    arrMetabolicName.push({

                        metabolismName: ddMetaList[i].metabolismName,
                        cycleName: ddMetaList[i].cycleName,
                        enzymeName: ddMetaList[i].enzymeName,
                        metaboliteName: ddMetaList[i].metaboliteName,
                        disorderDescription: ddMetaList[i].disorderDescription,
                        testDetails: ddMetaList[i].testDetails,
                        treatmentDetails: ddMetaList[i].treatmentDetails,
                        tissue: ddMetaList[i].tissue,
                        biofluids: ddMetaList[i].biofluids,
                        cellLocation: ddMetaList[i].cellLocation,
                        inheretance: ddMetaList[i].inheretance,
                        mprevalence: ddMetaList[i].prevalence,
                        fate: ddMetaList[i].fate,
                        feeder: ddMetaList[i].feeder
                    });
                }
                $scope.addedMetabolicList = arrMetabolic;
                $scope.addedMetabolicNameList = arrMetabolicName;
            }


            $scope.txtDisease = diseaseDepartmentList[0].problemName;
            $scope.txtProblem = diseaseDepartmentList[0].problemID;
            $scope.ddlDepartment = diseaseDepartmentList[0].departmentID;
            $scope.ddlRegion = diseaseDepartmentList[0].organID;
            $scope.rdMale = diseaseDepartmentList[0].gender == 'Male' ? 'Male' : false;
            $scope.rdFemale = diseaseDepartmentList[0].gender == 'Female' ? 'Female' : false;
            $scope.rdBoth = diseaseDepartmentList[0].gender == 'Both' ? 'Both' : false;
            $scope.txtAgeFrom = diseaseDepartmentList[0].ageFrom;
            $scope.txtAgeTo = diseaseDepartmentList[0].ageTo;
            $scope.ddlAgeUnit = diseaseDepartmentList[0].ageUnitID;
            $scope.txtICD = diseaseDepartmentList[0].icdCode;
            $scope.txtDiseaseDetails = diseaseDepartmentList[0].diseaseDefinition;

            $scope.txtPrevalence = diseaseDepartmentList[0].prevalence;
            $scope.txtIncidence = diseaseDepartmentList[0].incidence;
            $scope.rdIsGenetic = diseaseDepartmentList[0].isGenetic;
            $scope.txtPrognosis = diseaseDepartmentList[0].prognosis;


            $scope.txtDiseaseNature = diseaseDepartmentList[0].nature;
            $scope.txtDiseaseClassification = diseaseDepartmentList[0].classification;
            $scope.ddlBook = diseaseDepartmentList[0].bookID;
            $scope.txtPageNo = diseaseDepartmentList[0].pageNo;
            $scope.txtEdition = diseaseDepartmentList[0].edition;
            $scope.txtReference = diseaseDepartmentList[0].reference;
            /////////////////////////////////////////////////
            arrMarker = [];
            arrMarkerName = [];
            if (ddMarkerList.length > 0) {
                for (var i = 0; i < ddMarkerList.length; i++) {

                    arrMarker.push({
                        markerID: ddMarkerList[i].markerID,
                        markerLevelID: ddMarkerList[i].markerLevelID,
                    });
                    arrMarkerName.push({
                        markerName: ddMarkerList[i].markerName,
                        markerLevel: ddMarkerList[i].markerLevelName

                    });

                    $scope.markerList = arrMarker;
                    $scope.markerNameList = arrMarkerName;
                }
            };



            ////////////////////////////////////////////////////////////////////
            $scope.txtPreventionToDo = preventionList[0].toDo;
            $scope.txtPreventionNotToDo = preventionList[0].notToDo;
            //}
            $scope.txtProvisionalDiet = diseaseDepartmentList[0].provisionalDiet;
            $scope.txtSOP = diseaseDepartmentList[0].sop;
            $scope.txtPathopyscology = diseaseDepartmentList[0].pathophysiology;
            $scope.ddlOccurence = diseaseDepartmentList[0].occurenceID;
            $scope.ddlDietStyle = diseaseDepartmentList[0].dietStyleID;


            arrTreatmentType = [];
            var stageIDD = -1;
            var stageNName = '';
            for (var i = 0; i < ddTreatmentList.length; i++) {
                if (ddTreatmentList[i].stageId == undefined) {
                    stageIDD = -1;
                    stageNName = '';
                }
                else {
                    stageIDD = ddTreatmentList[i].stageId;
                    stageNName = ddTreatmentList[i].stageName;
                }

                arrTreatmentType.push({
                    treatmentTypeID: ddTreatmentList[i].treatmentTypeID,
                    treatmentTypeName: ddTreatmentList[i].treatmentName,
                    treatmentDescription: ddTreatmentList[i].treatment,
                    stageId: stageIDD,
                    stageName: stageNName
                });
            }
            $scope.addedTreatmentTypeList = arrTreatmentType;



            arrAddiction = [];
            for (var i = 0; i < ddAdictionList.length; i++) {
                arrAddiction.push({
                    addictionID: ddAdictionList[i].addiquateMasterID,
                    addictionName: ddAdictionList[i].addiquateName,
                    addictionValueID: ddAdictionList[i].addictionValueID,
                    addictionValueName: ddAdictionList[i].addictionValueName
                });
            }

            $scope.addedAddictionList = arrAddiction;

            arrAttributeID = [];
            arrAttributeName = [];
            //if (ddInputList.length > 0 && check == 0) {
            if (check == 0) {
                var param = {
                    departmentID: $scope.ddlDepartment,
                    diseaseID: 0
                };
                dataFactory.DiseaseDepartmentInputTypeListNew(param).then(function (response) {
                    var result = response.data;
                    $scope.InputTypeList = result.historyInputTypeMaster;

                    $scope.DiseaseHistoryList = result.historyList;
                });
            };

            var stageIDD = -1;
            var stageNName = '';
            for (var i = 0; i < ddInputList.length; i++) {
                if (ddInputList[i].stageId == undefined) {
                    stageIDD = -1;
                    stageNName = '';
                }
                else {
                    stageIDD = ddInputList[i].stageId;
                    stageNName = ddInputList[i].stageName;
                }
                arrAttributeID.push({
                    inputTypeId: ddInputList[i].inputTypeID,
                    problemId: ddInputList[i].problemID,
                    attributeId: ddInputList[i].attributeTypeID,
                    attributeValueId: ddInputList[i].attributeValueID,
                    occurenceId: ddInputList[i].occurence,
                    stageId: stageIDD
                });
                arrAttributeName.push({
                    inputTypeName: ddInputList[i].inputType,
                    problemName: ddInputList[i].problemName,
                    attributeName: ddInputList[i].attributeName,
                    attributeValueName: ddInputList[i].attributeValue,
                    occurenceName: ddInputList[i].occurenceName,
                    stageName: stageNName
                });

            }

            $scope.attributeList = arrAttributeID;
            $scope.attributeNameList = arrAttributeName;

            //medication
            arrInvestigation = [];
            arrInvestigationName = [];
            var stageIDD = -1;
            var stageNName = '';
            for (var i = 0; i < ddInvestigationList.length; i++) {
                if (ddInvestigationList[i].stageId == undefined) {
                    stageIDD = -1;
                    stageNName = '';
                }
                else {
                    stageIDD = ddInvestigationList[i].stageId;
                    stageNName = ddInvestigationList[i].stageName;
                }


                arrInvestigation.push({
                    subTestId: ddInvestigationList[i].subTestID,
                    isConfirmative: ddInvestigationList[i].isConfirmative,
                    resultPropertyID: ddInvestigationList[i].resultPropertyID,
                    resultPropertyValueID: ddInvestigationList[i].resultPropertyValueID,
                    stageId: stageIDD,
                    remark: ddInvestigationList[i].remark

                });
                arrInvestigationName.push({
                    subTestName: ddInvestigationList[i].subTestName,
                    isConfirmative: ddInvestigationList[i].isConfirmative,
                    propertyName: ddInvestigationList[i].propertyName,
                    propertyValue: ddInvestigationList[i].propertyValue,
                    stageName: stageNName,
                    remark: ddInvestigationList[i].remark
                });

            }


            $scope.investigationList = arrInvestigation;
            $scope.investigationNameList = arrInvestigationName;




            //medication
            arrMedication = [];
            arrMedicationName = [];
            var stageIDD = -1;
            var stageNName = '';
            for (var i = 0; i < ddMedicationList.length; i++) {
                if (ddMedicationList[i].stageId == undefined) {
                    stageIDD = -1;
                    stageNName = '';
                }
                else {
                    stageIDD = ddMedicationList[i].stageId;
                    stageNName = ddMedicationList[i].stageName;
                }
                arrMedication.push({
                    medicineId: ddMedicationList[i].medicineID,
                    dosageFormId: ddMedicationList[i].dosageFormID,
                    dosageStrength: ddMedicationList[i].doseStrength,
                    minDosageStrength: ddMedicationList[i].minDoseStrength,
                    totalDosageStrength: ddMedicationList[i].minDoseStrength == 0 ? ddMedicationList[i].doseStrength : ddMedicationList[i].minDoseStrength + ' - ' + ddMedicationList[i].doseStrength,
                    doseUnitId: ddMedicationList[i].doseUnitID,
                    doseFrequencyId: ddMedicationList[i].doseFrequencyID,
                    durationDays: ddMedicationList[i].durationDays,
                    remark: ddMedicationList[i].remark,
                    stageId: stageIDD,
                    medicineName: ddMedicationList[i].mediicneName,
                    dosageFormName: ddMedicationList[i].formName,
                    doseUnitName: ddMedicationList[i].unitName,
                    doseFrequencyName: ddMedicationList[i].frequency,
                    durationUnit: ddMedicationList[i].durationUnit,
                    durationUnitName: ddMedicationList[i].durationName,
                    stageName: stageNName,
                    choiceOf: ddMedicationList[i].choiceOf,
                    choiceOfName: ddMedicationList[i].choiceOfName


                });
                //arrMedicationName.push({

                //});

            }


            $scope.diseaseMedicationList = arrMedication;
            //$scope.diseaseMedicationNameList = arrMedicationName;




            //medication end 

            //supportive medication
            arrSupportiveMedication = [];
            arrSupportiveMedicationName = [];
            var stageIDD = -1;
            var stageNName = '';
            for (var i = 0; i < ddSupportiveMedicationList.length; i++) {
                if (ddSupportiveMedicationList[i].stageId == undefined) {
                    stageIDD = -1;
                    stageNName = '';
                }
                else {
                    stageIDD = ddSupportiveMedicationList[i].stageId;
                    stageNName = ddSupportiveMedicationList[i].stageName;
                }

                arrSupportiveMedication.push({
                    symptomId: ddSupportiveMedicationList[i].symptomID,
                    medicineId: ddSupportiveMedicationList[i].medicineID,
                    dosageFormId: ddSupportiveMedicationList[i].dosageFormID,
                    dosageStrength: ddSupportiveMedicationList[i].doseStrength,
                    doseUnitId: ddSupportiveMedicationList[i].doseUnitID,
                    doseFrequencyId: ddSupportiveMedicationList[i].doseFrequencyID,
                    durationDays: ddSupportiveMedicationList[i].durationDays,
                    remark: ddSupportiveMedicationList[i].remark,
                    stageId: stageIDD
                });
                arrSupportiveMedicationName.push({
                    symptomName: ddSupportiveMedicationList[i].problemName,
                    medicineName: ddSupportiveMedicationList[i].medicineName,
                    dosageFormName: ddSupportiveMedicationList[i].formName,
                    dosageStrength: ddSupportiveMedicationList[i].doseStrength,
                    doseUnitName: ddSupportiveMedicationList[i].unitName,
                    doseFrequencyName: ddSupportiveMedicationList[i].frequency,
                    durationDays: ddSupportiveMedicationList[i].durationDays,
                    remark: ddSupportiveMedicationList[i].remark,
                    stageName: stageNName
                });



            }

            $scope.diseaseSupportiveMedicationList = arrSupportiveMedication;
            $scope.diseaseSupportiveMedicationNameList = arrSupportiveMedicationName;




            //supportive medication end 

            addedPFiles = [];
            addedPFiles.push({ filePath: diseaseDepartmentList[0].pathophysiologyAttachment });
            $scope.addedPFileList = addedPFiles;

            //   $scope.txtDiseaseDetails = diseaseDepartmentList[0].DiseaseDetails;
            addedFiles = [];
            var stageIDD = -1;
            var stageNName = '';
            log("sam");
            log(fileDetailList);
            for (var i = 0; i < fileDetailList.length; i++) {
                if (fileDetailList[i].stageId == undefined) {
                    stageIDD = -1;
                    stageNName = '';
                }
                else {
                    stageIDD = fileDetailList[i].stageId;
                    stageNName = fileDetailList[i].stageName;
                }

                addedFiles.push({
                    filePath: fileDetailList[i].filePath,
                    fileDescription: fileDetailList[i].fileDescription,
                    stageId: fileDetailList[i].stageId,
                    stageName: fileDetailList[i].stageName
                });
            }

            $scope.addedFileList = addedFiles;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.changeMaleRadio = function () {
        if ($scope.rdMale == 'Male') {
            $scope.rdFemale = 0;
            $scope.rdBoth = 0;
        } else {
            $scope.rdMale = 0;
        }
    };
    $scope.changeFemaleRadio = function () {
        if ($scope.rdFemale == 'Female') {
            $scope.rdMale = 0;
            $scope.rdBoth = 0;
        } else {
            $scope.rdFemale = 0;
        }
    };
    $scope.changeBothRadio = function () {
        if ($scope.rdBoth == 'Both') {
            $scope.rdMale = 0;
            $scope.rdFemale = 0;
        } else {
            $scope.rdBoth = 0;
        }
    };
    $scope.GetAddictionValueList = function () {
        var params = {
            addiquateID: $scope.ddlAddiction,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.DiseaseAddiquateValueList(params).then(function (response) {
            var result = response.data;
            $scope.addictionValueList = result.diseaseAddiquateValueList;
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
        diseaseDepartmentID = 0;
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
        $scope.txtDiseaseDetails = '';
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
        $scope.addedPFileList = '';
        addedPFiles = [];
        $scope.markerList = '';
        $scope.markerNameList = '';
        $scope.ddlMetabolism = -1;
        $scope.ddlCycle = -1;
        $scope.ddlEnzyme = -1;
        $scope.ddlMetabolitic = -1;
        $scope.txtMDesc = '';
        $scope.txtMTest = '';
        $scope.txtMTreatment = '';
        $scope.txtTissue = '';
        $scope.txtBioFluid = '';
        $scope.txtCellLocation = '';
        $scope.txtInheretance = '';
        $scope.txtmPrevalence = '';
        $scope.txtFate = '';
        $scope.txtFeeder = '';
        $scope.addedMetabolicList = '';
        $scope.addedMetabolicNameList = '';
        $scope.causeTypeIDList = '';
        $scope.causeTypeNameList = '';
        arrCauseType = [];
        arrCauseTypeName = [];
        $scope.investigationList = '';
        $scope.aadedSpecialityList = '';
        $scope.investigationNameList = '';
        arrComplication = [];
        $scope.addedComplicationList = '';
        $scope.ddlBook = 0;
        $scope.txtPageNo = '';
        $scope.txtEdition = '';
        $scope.txtReference = '';
        $scope.addedDD = [];
        arrDD = [];
    };


    $scope.clr2 = function () {
        $scope.addedPFileList = '';
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
        addedPFiles = [];
        $scope.markerList = '';
        $scope.markerNameList = '';
        $scope.addedMetabolicList = '';
        $scope.addedMetabolicNameList = '';
        $scope.causeTypeIDList = '';
        $scope.causeTypeNameList = '';
        arrCauseType = [];
        arrCauseTypeName = [];
        $scope.investigationList = '';
        $scope.aadedSpecialityList = '';
        $scope.investigationNameList = '';
        arrComplication = [];
        $scope.addedComplicationList = '';
        $scope.ddlBook = 0;
        $scope.txtPageNo = '';
        $scope.txtEdition = '';
        $scope.txtReference = '';
        $scope.addedDD = [];
        arrDD = [];
    };

    $scope.initControls();

});