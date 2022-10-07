app.controller('studyReferenceCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    $scope.existId = 0;
    $scope.rbIsNotCovid = false;
    $scope.selectedStudyTreatmentDetailList = [];
    $scope.selectedOtherPathwayList = [];
    //$scope.selectedBloodBarrierList = [];
    $scope.selectedReferenceDetails = [];
    var addedDiseaseList = [];

    $scope.rbMechanism = 'No';

    $scope.studyLevelList = [{ 'studyLevel': "-" }, { 'studyLevel': "High" }, { 'studyLevel': "Low" }];

    $scope.initControls = function () {
        dataFactory.InitControlsStudyReference().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemList;
            $scope.nutrientList = result.nutrientList;
            $scope.ageUnitList = result.ageUnitList;
            $scope.studyTypeList = result.studyTypeList;
            $scope.transporterList = result.transporterList;
            $scope.otherProblemList = result.otherProblemList;

            $scope.centralCompoundList = result.centralCompoundList;
            $scope.associatedProblemList = result.processList;
            $scope.processList = result.processList;
            $scope.phenomenonList = result.phenomenonList;
            $scope.centralCompoundStatuList = result.centralCompoundStatuList;

        }, function (error) {getAssociatedProblemAndcentralCompound
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getParameterList = function () {
        var params = {
            diseaseID: $scope.ddlProblem,
            phenomenonID: $scope.ddlPhenomenon,
        };
        dataFactory.GetStudyReferenceParameterList(params).then(function (response) {
            var result = response.data;
            $scope.parameterList = result.parameterList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    //$scope.getNutrientBarrierDetails = function () {

    //    var params = {
    //        nutrientID: $scope.ddlMarker
    //    };
    //    dataFactory.NutrientBarrierList(params).then(function (response) {
    //        var result = response.data;
    //        $scope.selectedBloodBarrierList = result.nutrientBarrierList;


    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};

    $scope.isHuman = false;
    $scope.setIsHuman = function () {
        console.log($scope.ddlStudyType);
        if ($scope.ddlStudyType == 11) {
            $scope.isHuman = true;
        }
        else {
            $scope.isHuman = false;
        }
    }

    $scope.getAssociatedProblemAndcentralCompound = function () {

        
        if ($scope.ddlProblem == 1172 || $scope.ddlProblem == 13015 || $scope.ddlProblem == 14825 || $scope.ddlProblem == 9674) {
            $scope.rbIsNotCovid = true;
        }
        else {
            $scope.rbIsNotCovid = false;
        }
        var params = {
            diseaseID: $scope.ddlProblem
        };
        
        dataFactory.GetAssociatedProblemAndcentralCompound(params).then(function (response) {
            var result = response.data;
            $scope.centralCompoundList = result.centralCompoundList;
            $scope.associatedProblemList = result.processList;
            $scope.processList = result.processList;
            $scope.phenomenonList = result.phenomenonList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.addStudyTreatmentDetails = function () {
        if ($scope.ddlStudyTreatmentProblem == 0) {
            toaster.pop('error', "Error", 'Select Disease');
            return false;
        }
        for (var i = 0; i < $scope.selectedStudyTreatmentDetailList.length; i++) {
            if ($scope.selectedStudyTreatmentDetailList[i].problemID == $scope.ddlStudyTreatmentProblem && $scope.selectedStudyTreatmentDetailList[i].treatment == $scope.txtTreatment && $scope.selectedStudyTreatmentDetailList[i].url == $scope.txtStudyTreatmentURL) {
                toaster.pop('error', "Error", 'Already Added');
                return false;
            }
        }
        $scope.selectedStudyTreatmentDetailList.push({
            problemID: $("#ddlStudyTreatmentProblem").val() == 0 ? null : $("#ddlStudyTreatmentProblem").val(),
            problemName: $("#ddlStudyTreatmentProblem").val() == 0 ? null : $("#ddlStudyTreatmentProblem option:selected").text(),
            treatment: $scope.txtTreatment,
            url: $scope.txtStudyTreatmentURL
        });
    };
    $scope.deleteStudyTreatment = function (index) {
        $scope.selectedStudyTreatmentDetailList.splice(index, 1);
    };

    $scope.addOtherPathway = function () {
        if ($scope.ddlOtherPathway == 0) {
            toaster.pop('error', "Error", 'Select Other Pathway');
            return false;
        }
        for (var i = 0; i < $scope.selectedOtherPathwayList.length; i++) {
            if ($scope.selectedOtherPathwayList[i].otherPathwayID == $scope.ddlOtherPathway) {
                toaster.pop('error', "Error", 'Already Added');
                return false;
            }
        }
        $scope.selectedOtherPathwayList.push({
            otherPathwayID: $("#ddlOtherPathway").val(),
            otherPathwayName: $("#ddlOtherPathway option:selected").text()
        });
    };
    $scope.deleteOtherPathwayDetails = function (index) {
        $scope.selectedOtherPathwayList.splice(index, 1);
    };

    //$scope.addBloodBarrier = function () {        
    //    if ($scope.ddlTransporter == 0) {
    //        toaster.pop('error', "Error", 'Select Transporter');
    //        return false;
    //    }
    //    for (var i = 0; i < $scope.selectedBloodBarrierList.length; i++) {
    //        if ($scope.selectedBloodBarrierList[i].inOut == $scope.isIn && $scope.selectedBloodBarrierList[i].transporterID == $scope.ddlTransporter) {
    //            toaster.pop('error', "Error", 'Already Added');
    //            return false;
    //        }
    //    }
    //    $scope.selectedBloodBarrierList.push({
    //        isCross: $scope.isCross,
    //        isIn: $scope.isIn,
    //        inOutText: $scope.isIn == 1 ? 'In' : $scope.isIn == 0 ? 'Out' : '',
    //        transporterID: $scope.ddlTransporter,
    //        transporter: $("#ddlTransporter option:selected").text().trim(),
    //        remark: $scope.txtBloodBarrierRemark,
    //        url: $scope.txtBloodBarrierUrl
    //    });
    //};
    //$scope.deleteBloodBarrier = function (index) {
    //    $scope.selectedBloodBarrierList.splice(index, 1);
    //};

    $scope.addReferenceDetails = function () {
        if ($scope.ddlStudyType == 0) {
            toaster.pop('error', "Error", 'Select Study Type');
            return false;
        }

        $scope.selectedReferenceDetails.push({
            studyForID: $scope.ddlStudyType,
            studyFor: $("#ddlStudyType option:selected").text().trim(),
            sampleSizeCase: $scope.txtSampleSizeCase,
            sampleSizeControl: $scope.txtSampleSizeControl,
            ageGroupFrom: $scope.txtAgeGroupFrom,
            ageGroupTo: $scope.txtAgeGroupTo,
            ageUnitID: $scope.ddlAgeUnit,
            ageUnitText: $scope.ddlAgeUnit > 0 ? $("#ddlAgeUnit option:selected").text().trim() : '',
            gender: $scope.rbGender,
            url: $scope.txtURL,
            researchYear: $scope.txtResearchYear
        });
    };

    $scope.deleteReferenceDetails = function (index) {
        $scope.selectedReferenceDetails.splice(index, 1);
    };

    $scope.getStudyReferenceList = function () {
        var params = {
            id: $scope.existId
        };
        dataFactory.GetStudyReferenceList(params).then(function (response) {
            var result = response.data;
            $scope.studyReferenceList = result.studyReferenceList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveStudyReferencee = function () {

        //if ($scope.ddlProblem == 0) {
        //    toaster.pop('error', "Error", 'Select Problem');
        //    return false;
        //}
        if ($scope.ddlMarker == 0) {
            toaster.pop('error', "Error", 'Select Marker');
            return false;
        }
        //if ($scope.ddlStudyType == 0) {
        //    toaster.pop('error', "Error", 'Select Study For');
        //    return false;
        //}        

        var params = {
            id: $scope.existId,
            diseaseID: $scope.ddlProblem,
            markerID: $scope.ddlMarker,
            studyLevel: $scope.ddlStudyLevel,
            meaning: $scope.txtMeaning,
            location: $scope.txtLocation,
            centralCompoundID: $scope.ddlCentralCompound,
            associatedProblemID: $scope.ddlAssociatedProblem,
            erashypothesis: $scope.rbHypothesis,
           // listStudyTreatmentDetail: JSON.stringify($scope.selectedStudyTreatmentDetailList),
            //listBloodBarrier: JSON.stringify($scope.selectedBloodBarrierList),
            //listReferenceDetail: JSON.stringify($scope.selectedReferenceDetails),
           // listOtherPathwayDetail: JSON.stringify($scope.selectedOtherPathwayList),
            phenomenonID: $scope.ddlPhenomenon,
            process: $scope.ddlProcess,
            parameter: $scope.ddlParameter,
            isCovid: $scope.rbIsCovid,
            otherDiseaseId: ($scope.rbIsNotCovid == true ? false : $scope.ddlOtherDisease),
            lstDiseaseList: addedDiseaseList,
            centralCompoundStatus: $scope.ddlCompoundStatu,  
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };       
        dataFactory.SaveStudyReference(params).then(function (response) {
            var message = $scope.existId > 0 ? 'Update Study Reference' : 'Save Study Reference';
            $rootScope.activityLog(response, message, 'Study Reference', '');
            $scope.clr();
            $scope.getStudyReferenceList();
            toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        $scope.rbMechanism = 'No';
        $scope.existId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.GetStudyReferenceList(params).then(function (response) {
            var result = response.data;
            var list = result.studyReferenceList;
            $scope.ddlProblem = list[0].diseaseID;
            $scope.ddlMarker = list[0].markerID;
            $scope.ddlStudyLevel = list[0].studyLevel;
            $scope.txtMeaning = list[0].meaning;
            $scope.txtLocation = list[0].location;
            $scope.rbHypothesis = list[0].erashypothesis;
            $scope.getAssociatedProblemAndcentralCompound();
            $scope.ddlCentralCompound = list[0].centralCompoundID;
            $scope.ddlCompoundStatu = list[0].centralCompoundStatus;
            $scope.ddlAssociatedProblem = list[0].associatedProblemID;
            $scope.ddlProcess = list[0].process;
            $scope.ddlPhenomenon = list[0].phenomenonID;
            $scope.getParameterList();
            $scope.ddlParameter = list[0].parameterID;
            $scope.rbIsCovid = list[0].isCovid;
            $scope.ddlOtherDisease = list[0].otherDiseaseId;
            //var list3 = result.getDiseaseSearchList;
            var list3 = result.studyReferenceList;
            console.log(list3);
            addedDiseaseList = [];
            for (var i = 0; i < list3.length; i++) {
                addedDiseaseList.push({
                    diseaseID: list3[i].diseaseID,
                    diseaseName: list3[i].problemName

                });
            }
           
            $scope.diseaseName = addedDiseaseList;

            $scope.selectedStudyTreatmentDetailList = result.selectedStudyTreatmentDetailList;
            $scope.selectedOtherPathwayList = result.selectedOtherPathwayList;
            $scope.selectedReferenceDetails = result.selectedReferenceDetails;

            //$scope.getNutrientBarrierDetails();

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.deleteStudyReference = function (studyReferenceID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: studyReferenceID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteStudyReference(params).then(function (response) {
                $scope.clr();
                $scope.getStudyReferenceList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Study Reference', 'Study Reference', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    //Disease ....
    $scope.GetDiseaseSearch = function (query) {
        var obj = {
            searchkey: query
        };

        return dataFactory.getDiseaseSearchList(obj).then(function (response) {
            return response.data.table;

        }, function (error) {

        });
    };

    $scope.tagAdded = function (tag) {
        if (!isEmptyObject(tag) && (tag.diseaseID == 13015 || tag.diseaseID == 1172 || tag.diseaseID == 13015 || tag.diseaseID == 14825 || tag.diseaseID == 9674)) {

            $scope.rbIsNotCovid = true;
        }
        else {
            $scope.rbIsNotCovid = false;
        }
       
        if ($scope.existId == 0) {
            addedDiseaseList.push({
                diseaseID: tag.diseaseID
            });
        }
    };

    $scope.tagRemoved = function (tag) {

   
        if (!isEmptyObject(tag) && (tag.diseaseID == 13015 || tag.diseaseID == 1172 || tag.diseaseID == 13015 || tag.diseaseID == 14825 || tag.diseaseID == 9674)) {

            $scope.rbIsNotCovid = false;
        }
        else {
            $scope.rbIsNotCovid = true;
        }

        for (var i = 0; i < addedDiseaseList.length; i++) {
            if (addedDiseaseList[i].diseaseID === tag.diseaseID) {
                addedDiseaseList.splice(i, 1);
            }
        }
    };

 

    $scope.clr = function () {
        $scope.existId = 0;
        $scope.txtStudyFor = '';
        $scope.ddlProblem = 0;
        $scope.ddlMarker = 0;
        $scope.ddlStudyLevel = '-';
        $scope.txtMeaning = '';
        $scope.txtSampleSizeCase = '';
        $scope.txtSampleSizeControl = '';
        $scope.txtAgeGroupFrom = '';
        $scope.txtAgeGroupTo = '';
        $scope.ddlAgeUnit = 0;
        $scope.rbGender = 0;
        $scope.txtResearchYear = '';
        $scope.txtLocation = '';
        $scope.ddlCentralCompound = 0;
        $scope.ddlCompoundStatu = 0;
        $scope.txtRemark = '';
        $scope.txtReference = '';
        $scope.txtURL = '';
        $scope.rbHypothesis = '';
        //$scope.selectedBloodBarrierList = [];
        $scope.selectedReferenceDetails = [];
        $scope.selectedStudyTreatmentDetailList = [];
        $scope.selectedOtherPathwayList = [];
        $scope.ddlTest = 0;
        $scope.ddlSubTest = 0;
        $scope.txtTechnique = '';
        $scope.txtTestRemark = '';
        $scope.txtTestReference = '';
        $scope.txtTestURL = '';
        $scope.ddlAssociatedProblem = 0;
        $scope.txtTreatment = '';
        $scope.txtStudyTreatmentRemark = '';
        $scope.txtStudyTreatmentReference = '';
        $scope.txtStudyTreatmentURL = '';
        $scope.ddlStudyType = 0;
        $scope.txtStudyTypeContol = '';
        $scope.txtStudyTypeCase = '';
        $scope.txtStudyTypeRemark = '';
        $scope.txtStudyTypeReference = '';
        $scope.txtStudyTypeURL = '';
        $scope.ddlClinicalMarker = 0;
        $scope.ddlResearchMarker = 0;
        $scope.ddlSample = 0;
        $scope.txtResearchTechnique = '';
        $scope.ddlStudyTreatmentProblem = 0;
        $scope.ddlOtherPathway = 0;
        $scope.centralCompoundList = '';
        $scope.associatedProblemList = '';
        $scope.ddlProcess = 0;
        $scope.ddlPhenomenon = 0;
        $scope.ddlParameter = 0;
        $scope.phenomenonList = '';
        $scope.processList = '';
        $scope.rbIsCovid = '';
        $scope.ddlOtherDisease = 0;
        $scope.rbMechanism = 'No';

        $scope.diseaseName = '';
        addedDiseaseList = [];

        //$scope.txtBloodBarrierUrl = '';
        //$scope.txtBloodBarrierRemark = '';
        //$scope.ddlTransporter = 0;
        //$scope.isCross = '';
        //$scope.isIn = '';
    };

    $scope.initControls();
    $scope.getStudyReferenceList();
});