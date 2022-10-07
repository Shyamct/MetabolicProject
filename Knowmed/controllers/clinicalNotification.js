app.controller('clinicalNotificationCtrl', function ($scope, dataFactory, toaster) {
    var rowId = 0;
    var inputId = 0;
    var toDoId = 0;
    var notToDoId = 0;
    var arrInput = [];
    var arrOutputToDo = [];
    var arrOutputNotToDo = [];
    $scope.inputList = [];
    $scope.outputToDoList = [];
    $scope.outputNotToDoList = [];

    $scope.isAddInput = true;
    $scope.isAddToDo = true;
    $scope.isAddNotToDo = true;
    $scope.isDisabledAddFinal = false;


    $scope.initControls = function () {
        dataFactory.GetClinicalCategory().then(function (response) {
            var result = response.data;
            $scope.clinicalNotificationCategoryList = result.clinicalCategory;

            $scope.ageUnitList = result.unitMaster;
            $scope.resultUnitList = result.resultUnitList;
            $scope.resultTypeList = result.resultTypeList;
            $scope.unitList = result.unitList;
            $scope.statusList = result.statusList;
            $scope.unitMasterList = result.unitMasterList;
            $scope.clinicalNotificationTypeList = result.clinicalNotificationTypeList;
            $scope.notificationCategoryList = result.notificationCategoryList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.exportData = function () {
        $("#tableClinicalNotificationReprt").table2excel({
            // exclude: ".excludeThisClass",
            exclude: ".noExl",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            name: "Worksheet Name",
            filename: "ClinicalNotificationReprt" //do not include extension
        });
    };
    $scope.printDiv = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head> <script src="assets/js/angular.min.js"></script></head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    };

    $scope.GetClinicalNotification = function () {
        dataFactory.GetClinicalNotification().then(function (response) {
            var result = response.data;
            $scope.clinicalNotificationList = result.clinicalNotification;
            for (var i = 0; i < result.clinicalNotification.length; i++) {
                $scope.clinicalNotificationList[i].input = JSON.parse(result.clinicalNotification[i].input);
                $scope.clinicalNotificationList[i].toDo = JSON.parse(result.clinicalNotification[i].toDo);
                $scope.clinicalNotificationList[i].notToDo = JSON.parse(result.clinicalNotification[i].notToDo);
            }
            $scope.clinicalNotificationList = result.clinicalNotification;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.GetProblemByClinicalCategory = function (category) {
        $scope.ddlReference = 0;
        var obj = {
            clinicalCategoryID: ($scope.ddlCategory) ? $scope.ddlCategory : category,
        };
        dataFactory.GetProblemByClinicalCategory(obj).then(function (response) {
            var result = response.data;
            $scope.referenceList = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetProblemByClinicalCategoryRestriction = function (restrictionTypeID) {
        $scope.ddlRestrictionRefer = 0;
        var obj = {
            clinicalCategoryID: ($scope.ddlRestriction) ? $scope.ddlRestriction : restrictionTypeID,
        };
        dataFactory.GetProblemByClinicalCategory(obj).then(function (response) {
            var result = response.data;
            $scope.restrictionReferenceList = result.problemMaster;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetProblemByClinicalCategoryOutputToDo = function (category) {
        $scope.ddlReferenceOutputToDo = 0;
        var obj = {
            clinicalCategoryID: ($scope.ddlCategoryOutputToDo) ? $scope.ddlCategoryOutputToDo : category,
        };
        dataFactory.GetProblemByClinicalCategory(obj).then(function (response) {
            var result = response.data;
            $scope.referenceListOutputToDo = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetProblemByClinicalCategoryOutputNotToDo = function (category) {
        $scope.ddlReferenceOutputNotToDo = 0;
        var obj = {
            clinicalCategoryID: ($scope.ddlCategoryOutputNotToDo) ? $scope.ddlCategoryOutputNotToDo : category,
        };
        dataFactory.GetProblemByClinicalCategory(obj).then(function (response) {
            var result = response.data;
            $scope.referenceListOutputNotToDo = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddInput = function () {
        if ($scope.ddlCategory === 0) {
            toaster.pop('error', "Error", "Please Select Category !!");
            return false;
        }
        if ($scope.ddlReference === 0) {
            toaster.pop('error', "Error", "Please Select Reference !!");
            return false;
        }
        var isChecked = false;
        if ($scope.inputList && $scope.inputList.length > 0) {
            for (var i = 0; i < $scope.inputList.length; i++) {
                if (($scope.ddlReference === $scope.inputList[i].referenceID) && ($scope.ddlCategory === $scope.inputList[i].clinicalCategoryID)) {
                    isChecked = true;
                }
            }
        }
        if (isChecked === true) {
            toaster.pop('error', "Error", "Already Exists !!");
            return false;
        }
        arrInput.push({
            clinicalCategoryID: $("#ddlCategory").val(),
            clinicalCategoryName: $("#ddlCategory option:selected").text().trim(),
            referenceID: $("#ddlReference").val(),
            reference: $("#ddlReference option:selected").text().trim(),
            resultTypeId: $("#ddlResultType").val(),
            resultType: $("#ddlResultType option:selected").text().trim(),
            resultMinValue: $scope.txtResultMinValue,
            resultMaxValue: $scope.txtResultMaxValue,
            resultUnitID: $("#ddlResultUnit").val(),
            unitName: $("#ddlResultUnit option:selected").text().trim(),

            waitingDuration: $scope.txtWaitingDuration,
            waitingDurationUnitID: $("#ddlWaitingUnit").val(),
            unit: $("#ddlWaitingUnit option:selected").text().trim(),

            restrictionTypeID: $("#ddlRestriction").val(),
            restrictionType: $("#ddlRestriction option:selected").text().trim(),

            restrictionReferenceID: $("#ddlRestrictionRefer").val(),
            restrictionReference: $("#ddlRestrictionRefer option:selected").text().trim(),

            clinicalNotificationTypeID: $scope.ddlClinicalNotificationType,
            notificationType: $("#ddlClinicalNotificationType option:selected").text().trim(),
            scheduledDuration: $("#txtScheduledDuration").val(),
            scheduledDurationUnitID: $("#ddlScheduledDurationUnit").val(),
            scheduledDurationUnit: $("#ddlScheduledDurationUnit option:selected").text().trim(),
        });

        $scope.inputList = arrInput;
    };
    $scope.deleteInput = function (index) {
        $scope.inputList.splice(index, 1);
    };


    $scope.AddOutputToDo = function () {
        if ($scope.ddlCategoryOutputToDo === 0) {
            toaster.pop('error', "Error", "Please Select Category !!");
            return false;
        }
        if ($scope.ddlReferenceOutputToDo === 0) {
            toaster.pop('error', "Error", "Please Select Reference !!");
            return false;
        }
        var isChecked = false;
        if ($scope.outputToDoList && $scope.outputToDoList.length > 0) {
            for (var i = 0; i < $scope.outputToDoList.length; i++) {
                if (($scope.ddlReferenceOutputToDo === $scope.outputToDoList[i].referenceID) && ($scope.ddlCategoryOutputToDo === $scope.outputToDoList[i].clinicalCategoryID)) {
                    isChecked = true;
                }
            }
        }
        if (isChecked === true) {
            toaster.pop('error', "Error", "Already Exists !!");
            return false;
        }
        arrOutputToDo.push({
            clinicalCategoryID: $("#ddlCategoryOutputToDo").val(),
            clinicalCategoryName: $("#ddlCategoryOutputToDo option:selected").text().trim(),
            referenceID: $("#ddlReferenceOutputToDo").val(),
            reference: $("#ddlReferenceOutputToDo option:selected").text().trim(),
            advise: $scope.txtAdviseOutputToDo,
            referenceValueFrom: $scope.txtResultMinValueOutputToDo,
            referenceValueTo: $scope.txtResultMaxValueOutputToDo,
            referenceValueUnitID: $("#ddlResultUnitOutputToDo").val(),
            unitName: $("#ddlResultUnitOutputToDo option:selected").text().trim(),

            supportTypeID: $("#ddlSupport").val(),
            statusFor: $("#ddlSupport option:selected").text().trim(),
            changedVolumeFrequency: $scope.txtChangedVolumeFrequency,
            changedVolumeFrequencyUnitID: $("#ddlChangedVolumeFrequencyUnit").val(),
            times: $("#ddlChangedVolumeFrequencyUnit option:selected").text().trim(),

            notificationCategoryId: $("#ddlToDoNotificationCategory").val(),
            notificationCategoryName: $("#ddlToDoNotificationCategory option:selected").text().trim()


        });
        $scope.outputToDoList = arrOutputToDo;
    };
    $scope.DeleteOutputToDo = function (index) {
        $scope.outputToDoList.splice(index, 1);
    };

    $scope.AddOutputNotToDo = function () {
        if ($scope.ddlCategoryOutputNotToDo === 0) {
            toaster.pop('error', "Error", "Please Select Category !!");
            return false;
        }
        if ($scope.ddlReferenceOutputNotToDo === 0) {
            toaster.pop('error', "Error", "Please Select Reference !!");
            return false;
        }
        var isChecked = false;
        if ($scope.outputNotToDoList && $scope.outputNotToDoList.length > 0) {
            for (var i = 0; i < $scope.outputNotToDoList.length; i++) {
                if (($scope.ddlReferenceOutputNotToDo === $scope.outputNotToDoList[i].referenceID) && ($scope.ddlCategoryOutputNotToDo === $scope.outputNotToDoList[i].clinicalCategoryID)) {
                    isChecked = true;
                }
            }
        }
        if (isChecked === true) {
            toaster.pop('error', "Error", "Already Exists !!");
            return false;
        }
        arrOutputNotToDo.push({
            clinicalCategoryID: $("#ddlCategoryOutputNotToDo").val(),
            clinicalCategoryName: $("#ddlCategoryOutputNotToDo option:selected").text().trim(),
            referenceID: $("#ddlReferenceOutputNotToDo").val(),
            reference: $("#ddlReferenceOutputNotToDo option:selected").text().trim(),
            advise: $scope.txtAdviseOutputNotToDo,
            referenceValueFrom: $scope.txtResultMinValueOutputNotToDo,
            referenceValueTo: $scope.txtResultMaxValueOutputNotToDo,
            referenceValueUnitID: $("#ddlResultUnitOutputNotToDo").val(),
            unitName: $("#ddlResultUnitOutputNotToDo option:selected").text().trim(),

            notificationCategoryId: $("#ddlNotToDoNotificationCategory").val(),
            notificationCategoryName: $("#ddlNotToDoNotificationCategory option:selected").text().trim()
        });
        $scope.outputNotToDoList = arrOutputNotToDo;
    };
    $scope.DeleteOutputNotToDo = function (index) {
        $scope.outputNotToDoList.splice(index, 1);
    };


    $scope.AddFinal = function () {
        if ($scope.txtAgeFrom === 0 || $scope.txtAgeFrom === '' || $scope.txtAgeFrom === null || $scope.txtAgeFrom === undefined) {
            toaster.pop('error', "Error", "Please Enter Age From !!");
            return false;
        }
        if ($scope.txtAgeTo === 0 || $scope.txtAgeTo === '' || $scope.txtAgeTo === null || $scope.txtAgeTo === undefined) {
            toaster.pop('error', "Error", "Please Enter Age To !!");
            return false;
        }
        if ($scope.ddlAgeUnit === 0) {
            toaster.pop('error', "Error", "Please Select Age Unit !!");
            return false;
        }
        if (arrInput.length <= 0) {
            toaster.pop('error', "Error", "Please Enter Input Details !!");
            return false;
        }
        if (arrOutputToDo.length <= 0) {
            toaster.pop('error', "Error", "Please Enter To Do Details !!");
            return false;
        }
        var obj = {
            id: rowId,
            title: $scope.txtTitle,
            ageFrom: $scope.txtAgeFrom,
            ageTo: $scope.txtAgeTo,
            ageUnit: $scope.ddlAgeUnit,
            gender: $scope.ddlGender,
            remark: $scope.txtRemark,
            scenario: $scope.txtScenario,
            isCritical: $scope.chkIsCritical,
            dtDatatableToDoInput: JSON.stringify($scope.inputList),
            dtDatatableToDoOutput: JSON.stringify($scope.outputToDoList),
            dtDatatableNotToDoOutput: JSON.stringify($scope.outputNotToDoList),
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveClinicalNotification(obj).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clear();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.DeleteClinicalNotification = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var obj = {
                id: id
            };
            dataFactory.DeleteClinicalNotification(obj).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetClinicalNotification();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.DeleteClinicalNotificationInput = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var obj = {
                id: id
            };
            dataFactory.DeleteClinicalNotificationInput(obj).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetClinicalNotification();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.DeleteClinicalNotificationOutput = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var obj = {
                id: id
            };
            dataFactory.DeleteClinicalNotificationOutput(obj).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetClinicalNotification();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.EditClinicalNotification = function (id) {
        rowId = id;
        var obj = {
            id: id
        };
        dataFactory.GetClinicalNotification(obj).then(function (response) {
            var result = response.data;
            var list = result.clinicalNotification;
            for (var i = 0; i < result.clinicalNotification.length; i++) {
                list[i].input = JSON.parse(result.clinicalNotification[i].input);
                list[i].toDo = JSON.parse(result.clinicalNotification[i].toDo);
                list[i].notToDo = JSON.parse(result.clinicalNotification[i].notToDo);
            }
            arrInput = (list[0].input) ? list[0].input : [];
            arrOutputToDo = (list[0].toDo) ? list[0].toDo : [];
            arrOutputNotToDo = (list[0].notToDo) ? list[0].notToDo : [];

            $scope.inputList = arrInput;
            $scope.outputToDoList = arrOutputToDo;
            $scope.outputNotToDoList = arrOutputNotToDo;
            $scope.txtTitle = list[0].title;
            $scope.txtAgeFrom = list[0].ageFrom;
            $scope.txtAgeTo = list[0].ageTo;
            $scope.ddlAgeUnit = list[0].ageUnitID;
            $scope.ddlGender = list[0].g;
            $scope.txtRemark = list[0].remark;
            $scope.txtScenario = list[0].scenario;
            $scope.chkIsCritical = list[0].isCritical;

            $('#txtAgeFrom').focus();

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.EditInput = function (id) {
        inputId = id;
        var obj = {
            id: id,
            flag: 'input'
        };

        dataFactory.GetClinicalNotificationInputOutput(obj).then(function (response) {
            var result = response.data;
            var list = result.clinicalNotificationInputOutputList;

            log(list);
            $scope.ddlCategory = list[0].clinicalCategoryID;
            $scope.GetProblemByClinicalCategory(list[0].clinicalCategoryID);

            $scope.txtResultMinValue = list[0].resultMinValue;
            $scope.txtResultMaxValue = list[0].resultMaxValue;
            $scope.ddlResultUnit = list[0].resultUnitID;

            $scope.txtWaitingDuration = list[0].waitingDuration;
            $scope.ddlWaitingUnit = list[0].waitingDurationUnitID;
            $scope.ddlRestriction = list[0].restrictionTypeID;
            $scope.GetProblemByClinicalCategoryRestriction(list[0].restrictionTypeID);


            $scope.ddlClinicalNotificationType = list[0].clinicalNotificationTypeID;
            $scope.txtScheduledDuration = list[0].scheduledDuration;
            $scope.ddlScheduledDurationUnit = list[0].scheduledDurationUnitID;

            setTimeout(function () {
                $scope.ddlReference = list[0].referenceID;
                $scope.ddlResultType = list[0].resultType;
                $scope.ddlRestrictionRefer = list[0].restrictionReferenceID;

            }, 100);

            $scope.isAddInput = false;

            $('#ddlCategory').focus();
            $scope.isDisabledAddFinal = true;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.EditOutputToDo = function (id) {
        toDoId = id;
        var obj = {
            id: id,
            flag: 'output'
        };

        dataFactory.GetClinicalNotificationInputOutput(obj).then(function (response) {
            var result = response.data;
            var list = result.clinicalNotificationInputOutputList;

            $scope.ddlCategoryOutputToDo = list[0].clinicalCategoryID;
            $scope.GetProblemByClinicalCategoryOutputToDo(list[0].clinicalCategoryID);

            $scope.txtAdviseOutputToDo = list[0].advise;
            $scope.txtResultMinValueOutputToDo = list[0].referenceValueFrom;
            $scope.txtResultMaxValueOutputToDo = list[0].referenceValueTo;
            $scope.ddlResultUnitOutputToDo = list[0].referenceValueUnitID;
            $scope.ddlSupport = list[0].supportTypeID;
            $scope.txtChangedVolumeFrequency = list[0].changedVolumeFrequency;
            $scope.ddlChangedVolumeFrequencyUnit = list[0].changedVolumeFrequencyUnitID;

            $scope.ddlToDoNotificationCategory = list[0].notificationCategoryId;

            $scope.isAddToDo = false;

            $('#ddlCategoryOutputToDo').focus();
            $scope.isDisabledAddFinal = true;

            setTimeout(function () {
                $scope.ddlReferenceOutputToDo = list[0].referenceID;

            }, 100);

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.EditOutputNotToDo = function (id) {
        notToDoId = id;
        var obj = {
            id: id,
            flag: 'output'
        };

        dataFactory.GetClinicalNotificationInputOutput(obj).then(function (response) {
            var result = response.data;
            var list = result.clinicalNotificationInputOutputList;

            $scope.ddlCategoryOutputNotToDo = list[0].clinicalCategoryID;
            $scope.GetProblemByClinicalCategoryOutputNotToDo(list[0].clinicalCategoryID);

            $scope.txtAdviseOutputNotToDo = list[0].advise;
            $scope.txtResultMinValueOutputNotToDo = list[0].referenceValueFrom;
            $scope.txtResultMaxValueOutputNotToDo = list[0].referenceValueTo;
            $scope.ddlResultUnitOutputNotToDo = list[0].referenceValueUnitID;

            $scope.ddlNotToDoNotificationCategory = list[0].notificationCategoryId;

            $scope.isAddNotToDo = false;

            $('#ddlCategoryOutputNotToDo').focus();
            $scope.isDisabledAddFinal = true;

            setTimeout(function () {
                $scope.ddlReferenceOutputNotToDo = list[0].referenceID;

            }, 100);

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.UpdateInput = function () {

        if ($scope.ddlCategory === 0) {
            toaster.pop('error', "Error", "Please Select Category !!");
            return false;
        }
        if ($scope.ddlReference === 0) {
            toaster.pop('error', "Error", "Please Select Reference !!");
            return false;
        }
        var obj = {
            id: inputId,
            flag: 'input',
            clinicalCategoryID: $scope.ddlCategory,
            referenceID: $scope.ddlReference,
            resultType: $scope.ddlResultType,
            resultMinValue: $scope.txtResultMinValue,
            resultMaxValue: $scope.txtResultMaxValue,
            resultUnitID: $scope.ddlResultUnit,

            waitingDuration: $scope.txtWaitingDuration,
            waitingDurationUnitID: $scope.ddlWaitingUnit,
            restrictionTypeID: $scope.ddlRestriction,
            restrictionReferenceID: $scope.ddlRestrictionRefer,

            clinicalNotificationType: $scope.ddlClinicalNotificationType,
            scheduledDuration: $("#txtScheduledDuration").val(),
            scheduledDurationUnitID: $("#ddlScheduledDurationUnit").val(),

            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        log(obj);
        dataFactory.UpdateClinicalNotificationInputOutput(obj).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clear();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.UpdateOutputToDo = function () {

        if ($scope.ddlCategoryOutputToDo === 0) {
            toaster.pop('error', "Error", "Please Select Category !!");
            return false;
        }
        if ($scope.ddlReferenceOutputToDo === 0) {
            toaster.pop('error', "Error", "Please Select Reference !!");
            return false;
        }
        var obj = {
            id: toDoId,
            flag: 'output',
            clinicalCategoryID: $scope.ddlCategoryOutputToDo,
            referenceID: $scope.ddlReferenceOutputToDo,
            advise: $scope.txtAdviseOutputToDo,
            referenceValueFrom: $scope.txtResultMinValueOutputToDo,
            referenceValueTo: $scope.txtResultMaxValueOutputToDo,
            referenceValueUnitID: $scope.ddlResultUnitOutputToDo,

            supportTypeID: $scope.ddlSupport,
            changedVolumeFrequency: $scope.txtChangedVolumeFrequency,
            changedVolumeFrequencyUnitID: $scope.ddlChangedVolumeFrequencyUnit,
            notificationCategoryId: $scope.ddlToDoNotificationCategory
        };

        dataFactory.UpdateClinicalNotificationInputOutput(obj).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clear();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.UpdateOutputNotToDo = function () {

        if ($scope.ddlCategoryOutputNotToDo === 0) {
            toaster.pop('error', "Error", "Please Select Category !!");
            return false;
        }
        if ($scope.ddlReferenceOutputNotToDo === 0) {
            toaster.pop('error', "Error", "Please Select Reference !!");
            return false;
        }
        var obj = {
            id: notToDoId,
            flag: 'output',
            clinicalCategoryID: $scope.ddlCategoryOutputNotToDo,
            referenceID: $scope.ddlReferenceOutputNotToDo,
            advise: $scope.txtAdviseOutputNotToDo,
            referenceValueFrom: $scope.txtResultMinValueOutputNotToDo,
            referenceValueTo: $scope.txtResultMaxValueOutputNotToDo,
            referenceValueUnitID: $scope.ddlResultUnitOutputNotToDo,
            notificationCategoryId: $scope.ddlNotToDoNotificationCategory
        };

        dataFactory.UpdateClinicalNotificationInputOutput(obj).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clear();
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clear = function () {
        rowId = 0;
        inputId = 0;
        toDoId = 0;
        notToDoId = 0;
        $scope.txtTitle = "";
        $scope.txtAgeFrom = "";
        $scope.txtAgeTo = "";
        $scope.ddlAgeUnit = 0;
        $scope.ddlGender = 'M';
        $scope.txtRemark = "";
        $scope.txtScenario = "";
        $scope.inputList = [];
        $scope.outputToDoList = [];
        $scope.outputNotToDoList = [];
        arrInput = [];
        arrOutputToDo = [];
        arrOutputNotToDo = [];
        $scope.ddlCategory = 0;
        $scope.ddlReference = 0;
        $scope.ddlResultType = 0;
        $scope.ddlResultUnit = 0;
        $scope.txtResultMinValue = null;
        $scope.txtResultMaxValue = null;

        $scope.txtWaitingDuration = null;
        $scope.ddlWaitingUnit = 0;
        $scope.ddlRestriction = 0;
        $scope.ddlRestrictionRefer = 0;

        $scope.ddlCategoryOutputToDo = 0;
        $scope.ddlReferenceOutputToDo = 0;
        $scope.ddlResultUnitOutputToDo = 0;
        $scope.txtAdviseOutputToDo = "";
        $scope.txtResultMinValueOutputToDo = null;
        $scope.txtResultMaxValueOutputToDo = null;
        $scope.ddlSupport = 0;
        $scope.txtChangedVolumeFrequency = null;
        $scope.ddlChangedVolumeFrequencyUnit = 0;

        $scope.ddlCategoryOutputNotToDo = 0;
        $scope.ddlReferenceOutputNotToDo = 0;
        $scope.ddlResultUnitOutputNotToDo = 0;
        $scope.txtAdviseOutputNotToDo = "";
        $scope.txtResultMinValueOutputNotToDo = null;
        $scope.txtResultMaxValueOutputNotToDo = null;

        $scope.ddlClinicalNotificationType = 0;
        $scope.txtScheduledDuration = '';
        $scope.ddlScheduledDurationUnit = 0;

        $scope.ddlToDoNotificationCategory = 0;
        $scope.ddlNotToDoNotificationCategory = 0;

        $scope.GetClinicalNotification();

        $scope.isAddInput = true;
        $scope.isAddToDo = true;
        $scope.isAddNotToDo = true;
        $scope.isDisabledAddFinal = false;
    };

    $scope.initControls();
    $scope.GetClinicalNotification();
});

