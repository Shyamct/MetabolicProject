var knowmedServices = angular.module('knowmedServices', []);
knowmedServices.factory('dataFactory', ['$http', '$location', function ($http, $location) {

    var token = -1;
    var urlBase;
    var jsonParam;

   // var BASE_URL = 'http://localhost:1025/api';
    var BASE_URL = 'http://192.168.8.2:202/api';
    //var BASE_URL = 'http://182.156.200.179:202/api';


    var dataFactory = {};


    function isValidToken() {
        if (token < 0 || token === false || token !== UtilsCache.get("AUTHTOKEN")) {
            token = UtilsCache.get("AUTHTOKEN") ? UtilsCache.get("AUTHTOKEN") : -1;
        }

        if (!isEmpty(token) && token != -1) {
            return true;
        }
        else {
            $location.url("/login");
            return false;
        }
    }

    function callHttp(jsonParam, uriTemplate) {
        return $http({
            url: BASE_URL + '/' + uriTemplate,
            data: jsonParam,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accessToken": token
            }
        });
    }

    function callHttp23(jsonParam, urlParam) {
        return $http({
            url: urlParam,
            data: jsonParam,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    dataFactory.samFiles = function (formdata) {
        var timeStamp = new Date().getTime();
        var request = {
            method: 'POST',
            url: 'http://182.156.200.179:105/FileUploadHandler.ashx?timestamp=' + timeStamp,
            //url: 'http://192.168.8.2:105/FileUploadHandler.ashx?timestamp=' + timeStamp,            
            //url: 'http://localhost:51564/FileUploadHandler.ashx?timestamp=' + timeStamp,
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        return $http(request)
            .success(function (d) {

            })
            .error(function (err) {

            });
    };
    dataFactory.authorize = function (obj) {
        jsonParam = JSON.stringify(obj);
        return $http({
            method: "POST",
            url: BASE_URL + '/Login/LoginAuthentication',
            data: jsonParam,
            headers: { "Content-Type": "application/json" }
        });
    };
    dataFactory.deleteToken = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Login/DeleteToken');
        }
    };

    // RDA
    dataFactory.bindListForRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Dietary/BindSelectListForRDA');
        }
    };
    dataFactory.LoadRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Dietary/LoadRDA');
        }
    };
    dataFactory.saveRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Dietary/SaveRDA');
        }
    };
    dataFactory.updateRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Dietary/UpdateRDA');
        }
    };
    dataFactory.deleteRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Dietary/DeleteRDA');
        }
    };

    //Nutrient Master
    dataFactory.initControlsNutrient = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/InitControlsNutrient');
        }
    };
    dataFactory.nutrientMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/NutrientMasterList');
        }
    };
    dataFactory.saveNutrientMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/SaveNutrientMaster');
        }
    };
    dataFactory.deleteNutrientMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/DeleteNutrientMaster');
        }
    };

    //Disease Investigation
    dataFactory.initControlsDisease = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/InitControlsDisease');
        }
    };
    dataFactory.investigationDiseaseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/InvestigationDiseaseList');
        }
    };
    dataFactory.saveDiseaseInvestigation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/SaveDiseaseInvestigation');
        }
    };
    dataFactory.deleteDiseaseInvestigation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/DeleteDiseaseInvestigation');
        }
    };
    dataFactory.GetResultType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/GetResultType');
        }
    };
    dataFactory.GetResultValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/GetResultVAlue');
        }
    };

    // food Nutrient
    dataFactory.initControlsFoodNutrient = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Nutrient/InitControlsfoodNutrient');
        }
    };
    dataFactory.foodNutrientList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Nutrient/foodNutrientList');
        }
    };
    dataFactory.savefoodNutrient = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Nutrient/SavefoodNutrient');
        }
    };
    dataFactory.deletefoodNutrient = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Nutrient/DeletefoodNutrient');
        }
    };
    dataFactory.nutrientComponentList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Nutrient/NutrientComponentList');
        }
    };

    //Differential Diagnosis
    dataFactory.initControlsDD = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/InitControlsDD');
        }
    };
    dataFactory.differentialDiagnosisList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/DifferentialDiagnosisList');
        }
    };
    dataFactory.DifferentialDiagnosisDepartmentWiseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/DifferentialDiagnosisDepartmentWiseList');
        }
    };
    dataFactory.DepartmentList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/DepartmentList');
        }
    };
    dataFactory.saveDiseaseMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/SaveDiseaseMaster');
        }
    };
    dataFactory.saveDifferentialDiagnosis = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/SaveDifferentialDiagnosis');
        }
    };
    dataFactory.deleteDifferentialDiagnosis = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Disease/DeleteDifferentialDiagnosis');
        }
    };

    //Disease Master
    dataFactory.initControlsDiseaseMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/InitControlsDiseaseMaster');
        }
    };
    dataFactory.diseaseMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/DiseaseMasterList');
        }
    };
    dataFactory.saveDiseaseMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/SaveDiseaseMaster');
        }
    };
    dataFactory.deleteDiseaseMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/DeleteDiseaseMaster');
        }
    };

    // Drug Side Effect
    dataFactory.InitControlsMedSideEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/InitControlsMedSideEffect');
        }
    };
    dataFactory.DrugSideEffectList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/DrugSideEffectList');
        }
    };
    dataFactory.SaveDrugSideEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/SaveDrugSideEffect');
        }
    };
    dataFactory.DeleteDrugSideEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/DeleteDrugSideEffect');
        }
    };

    // Medicine Interaction
    dataFactory.InitControlsMedInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/InitControlsMedicineInteraction');
        }
    };
    dataFactory.MedicineInteractionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/MedicineInteractionList');
        }
    };
    dataFactory.InteractedWithList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/InteractedWithList');
        }
    };
    dataFactory.SaveMedicineInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/SaveMedicineInteraction');
        }
    };
    dataFactory.DeleteMedicineInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/DeleteMedicineInteraction');
        }
    };

    //added 23-07-2019
    dataFactory.MedicineInteractionEffectList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/MedicineInteractionEffectList');
        }
    };
    dataFactory.getsignSymtopmsListFaheem = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/getSignSymtopmsList');
        }
    };
    dataFactory.getIndicationSearchList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Medicine/getIndicationSearchList');
        }
    };

    // Medicine Trough Value   
    dataFactory.CheckTroughMedicineExistence = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTroughValue/CheckMedicineExistence');
        }
    };

    dataFactory.UnitMasterDoseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTroughValue/UnitMasterDoseList');
        }
    };
    dataFactory.UnitMasterOnlyTimeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTroughValue/UnitMasterOnlyTimeList');
        }
    };
    dataFactory.MedicineTroughValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTroughValue/MedicineTroughValueList');
        }
    };
    dataFactory.SaveMedicineTroughValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTroughValue/SaveMedicineTroughValue');
        }
    };
    dataFactory.DeleteMedicineTroughValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTroughValue/DeleteMedicineTroughValue');
        }
    };

    // Medicine THalf
    dataFactory.CheckTHalfMedicineExistence = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTHalf/CheckMedicineExistence');
        }
    };
    dataFactory.MedicineTHalfList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTHalf/MedicineTHalfList');
        }
    };
    dataFactory.SaveMedicineTHalf = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTHalf/SaveMedicineTHalf');
        }
    };
    dataFactory.DeleteMedicineTHalf = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTHalf/DeleteMedicineTHalf');
        }
    };

    // Medicine Peak Value
    dataFactory.CheckPeakValueMedicineExistence = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicinePeakValue/CheckMedicineExistence');
        }
    };
    dataFactory.MedicinePeakValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicinePeakValue/MedicinePeakValueList');
        }
    };
    dataFactory.SaveMedicinePeakValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicinePeakValue/SaveMedicinePeakValue');
        }
    };
    dataFactory.DeleteMedicinePeakValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicinePeakValue/DeleteMedicinePeakValue');
        }
    };

    // Sign Symptom Master
    dataFactory.CheckSignSymptomExistence = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SignSymptomMaster/CheckSignSymptomExistence');
        }
    };
    dataFactory.BodyOrganRegionList = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'SignSymptomMaster/BodyOrganRegionList');
        }
    };
    dataFactory.SignSymptomMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SignSymptomMaster/SignSymptomMasterList');
        }
    };
    dataFactory.SaveSignSymptomMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SignSymptomMaster/SaveSignSymptomMaster');
        }
    };
    dataFactory.DeleteSignSymptomMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SignSymptomMaster/DeleteSignSymptomMaster');
        }
    };

    // Problem Master  
    dataFactory.ProblemCategoryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemMaster/ProblemCategoryList');
        }
    };
    dataFactory.ProblemMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemMaster/ProblemMasterList');
        }
    };
    dataFactory.SaveProblemMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemMaster/SaveProblemMaster');
        }
    };
    dataFactory.DeleteProblemMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemMaster/DeleteProblemMaster');
        }
    };

    //food Master
    dataFactory.InitControlsfoodMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Food/InitControlsMaster');
        }
    };
    dataFactory.foodMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Food/FoodList');
        }
    };
    dataFactory.getFoodMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Food/GetFoodMaster');
        }
    };
    dataFactory.saveFoodMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Food/SaveFood');
        }
    };
    dataFactory.deleteFoodMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Food/DeleteFood');
        }
    };
    dataFactory.getNutrientQuantity = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Food/getNutrientQuantity');
        }
    };


    //Medicine Master
    dataFactory.initControlsMedicine = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/InitControlsMedicineMaster');
        }
    };
    dataFactory.medicineMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/MedicineMasterList');
        }
    };
    dataFactory.saveMedicineMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/SaveMedicineMaster');
        }
    };
    dataFactory.deleteMedicineMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/DeleteMedicineMaster');
        }
    };

    // Test Master 
    dataFactory.SubCategoryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TestMaster/SubCategoryList');
        }
    };
    dataFactory.TestMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TestMaster/TestMasterList');
        }
    };
    dataFactory.SaveTestMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TestMaster/SaveTestMaster');
        }
    };
    dataFactory.DeleteTestMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TestMaster/DeleteTestMaster');
        }
    };

    // Items To Knowmed Test
    dataFactory.InitControlItemsToKnowmedTest = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TestMaster/InitControls');
        }
    };
    dataFactory.GetItemsToKnowmedTest = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TestMaster/GetItemsToKnowmedTest');
        }
    };
    dataFactory.SaveItemsToKnowmedTest = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TestMaster/SaveItemsToKnowmedTest');
        }
    };
    dataFactory.DeleteItemsToKnowmedTest = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TestMaster/DeleteItemsToKnowmedTest');
        }
    };

    // Sub Test Master 
    dataFactory.SubTestMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SubTestMaster/SubTestMasterList');
        }
    };
    dataFactory.SaveSubTestMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SubTestMaster/SaveSubTestMaster');
        }
    };
    dataFactory.DeleteSubTestMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SubTestMaster/DeleteSubTestMaster');
        }
    };

    // Assign Sub Test
    dataFactory.AssignSubTestList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubTest/AssignSubTestList');
        }
    };
    dataFactory.SaveAssignSubTest = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubTest/SaveAssignSubTest');
        }
    };
    dataFactory.DeleteAssignSubTest = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubTest/DeleteAssignSubTest');
        }
    };

    // Assign Sub Test Method
    dataFactory.MethodMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubTestMethod/MethodMasterList');
        }
    };
    dataFactory.AssignSubTestMethodList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubTestMethod/AssignSubTestMethodList');
        }
    };
    dataFactory.SaveAssignSubTestMethod = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubTestMethod/SaveAssignSubTestMethod');
        }
    };
    dataFactory.DeleteAssignSubTestMethod = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubTestMethod/DeleteAssignSubTestMethod');
        }
    };
    dataFactory.AssignSubtestResultTypeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubtestResultType/AssignSubtestResultTypeList');
        }
    };
    dataFactory.SaveAssignSubtestResultType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubtestResultType/SaveAssignSubtestResultType');
        }
    };
    dataFactory.DeleteAssignSubtestResultType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubtestResultType/DeleteAssignSubtestResultType');
        }
    };

    // Sub Test Sample Type
    dataFactory.SampleMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SubtestSampleType/SampleMasterList');
        }
    };
    dataFactory.SubtestSampleTypeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SubtestSampleType/SubtestSampleTypeList');
        }
    };
    dataFactory.SaveSubtestSampleType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SubtestSampleType/SaveSubtestSampleType');
        }
    };
    dataFactory.DeleteSubtestSampleType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SubtestSampleType/DeleteSubtestSampleType');
        }
    };

    // Patient Problem Master
    dataFactory.InitControlsPatientLanguage = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'PatientLanguage/InitControlsPatientLanguage');
        }
    };
    dataFactory.ProblemPatientLanguageList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'PatientLanguage/ProblemPatientLanguageList');
        }
    };
    dataFactory.SaveProblemPatientLanguage = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'PatientLanguage/SaveProblemPatientLanguage');
        }
    };
    dataFactory.DeleteProblemPatientLanguage = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'PatientLanguage/DeleteProblemPatientLanguage');
        }
    };

    // Synonym Master
    dataFactory.SynonymMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SynonymMaster/SynonymMasterList');
        }
    };
    dataFactory.SynonymTypeMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SynonymMaster/SynonymTypeMasterList');
        }
    };
    dataFactory.MultipleTableWiseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SynonymMaster/MultipleTableWiseList');
        }
    };
    dataFactory.SaveSynonymMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SynonymMaster/SaveSynonymMaster');
        }
    };
    dataFactory.DeleteSynonymMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SynonymMaster/DeleteSynonymMaster');
        }
    };
    dataFactory.getUnitList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SynonymMaster/GetUnitList');
        }
    };

    // Medicine Report
    dataFactory.MedicineReportList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineReport/MedicineReportList');
        }
    };
    dataFactory.getMedicineBySearch = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineReport/MedicineMasterList');
        }
    };
    dataFactory.fileSam = function (files) {

        var url = 'fileUpload';

        for (var i = 0; i < files.length; i++) {
            var fd = new FormData();

            fd.append("file", files[i]);

            $http.post(url, fd, {

                withCredentials: false,

                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity

            })
                .success(function (data) {
                    console.log(data);
                })
                .error(function (data) {
                    console.log(data);
                });
        }
    };
    dataFactory.uploadFileToUrl = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
            .success(function () {
            })
            .error(function () {
            });
    };

    // Problem Attribute Assign
    dataFactory.ProblemAttributeAssignList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemAttributeAssign/ProblemAttributeAssignList');
        }
    };
    dataFactory.ProblemAttributeMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemAttributeAssign/ProblemAttributeMasterList');
        }
    };
    dataFactory.SaveProblemAttributeAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemAttributeAssign/SaveProblemAttributeAssign');
        }
    };
    dataFactory.DeleteProblemAttributeAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemAttributeAssign/DeleteProblemAttributeAssign');
        }
    };

    // Problem Attribute Value
    dataFactory.ProblemAttributeValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemAttributeValue/ProblemAttributeValueList');
        }
    };
    dataFactory.SaveProblemAttributeValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemAttributeValue/SaveProblemAttributeValue');
        }
    };
    dataFactory.DeleteProblemAttributeValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemAttributeValue/DeleteProblemAttributeValue');
        }
    };

    // Problem Investigation Relation
    dataFactory.RelationPropertyNameList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemInvestigationRelation/PropertyNameList');
        }
    };
    dataFactory.RelationPropertyValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemInvestigationRelation/PropertyValueList');
        }
    };
    dataFactory.ProblemInvestigationRelationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemInvestigationRelation/ProblemInvestigationRelationList');
        }
    };
    dataFactory.SaveProblemInvestigationRelation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemInvestigationRelation/SaveProblemInvestigationRelation');
        }
    };
    dataFactory.DeleteProblemInvestigationRelation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemInvestigationRelation/DeleteProblemInvestigationRelation');
        }
    };

    // Problem Vital Relation
    dataFactory.VitalMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemVitalRelation/VitalMasterList');
        }
    };
    dataFactory.ProblemVitalRelationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemVitalRelation/ProblemVitalRelationList');
        }
    };
    dataFactory.InvestigationStatusList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemVitalRelation/InvestigationStatusList');
        }
    };
    dataFactory.SaveProblemVitalRelation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemVitalRelation/SaveProblemVitalRelation');
        }
    };
    dataFactory.DeleteProblemVitalRelation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemVitalRelation/DeleteProblemVitalRelation');
        }
    };

    //Agent Factor Master
    dataFactory.AgentFactorMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AgentFactorMaster/AgentFactorMasterList');
        }
    };
    dataFactory.SaveAgentFactorMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AgentFactorMaster/SaveAgentFactorMaster');
        }
    };
    dataFactory.DeleteAgentFactorMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AgentFactorMaster/DeleteAgentFactorMaster');
        }
    };

    //Environment Factor Master
    dataFactory.EnvironmentFactorMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'EnvironmentFactorMaster/EnvironmentFactorMasterList');
        }
    };
    dataFactory.SaveEnvironmentFactorMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'EnvironmentFactorMaster/SaveEnvironmentFactorMaster');
        }
    };
    dataFactory.DeleteEnvironmentFactorMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'EnvironmentFactorMaster/DeleteEnvironmentFactorMaster');
        }
    };

    //Transmission Route Master
    dataFactory.TransmissionRouteMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TransmissionRouteMaster/TransmissionRouteMasterList');
        }
    };
    dataFactory.SaveTransmissionRouteMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TransmissionRouteMaster/SaveTransmissionRouteMaster');
        }
    };
    dataFactory.DeleteTransmissionRouteMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'TransmissionRouteMaster/DeleteTransmissionRouteMaster');
        }
    };

    //Disease Agent Factor
    dataFactory.DiseaseAgentFactorList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseAgentFactor/DiseaseAgentFactorList');
        }
    };
    dataFactory.SaveDiseaseAgentFactor = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseAgentFactor/SaveDiseaseAgentFactor');
        }
    };
    dataFactory.DeleteDiseaseAgentFactor = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseAgentFactor/DeleteDiseaseAgentFactor');
        }
    };

    //Disease Environment Factor
    dataFactory.DiseaseEnvironmentFactorList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseEnvironmentFactor/DiseaseEnvironmentFactorList');
        }
    };
    dataFactory.SaveDiseaseEnvironmentFactor = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseEnvironmentFactor/SaveDiseaseEnvironmentFactor');
        }
    };
    dataFactory.DeleteDiseaseEnvironmentFactor = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseEnvironmentFactor/DeleteDiseaseEnvironmentFactor');
        }
    };

    //Disease Transmission Route
    dataFactory.DiseaseTransmissionRouteList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseTransmissionRoute/DiseaseTransmissionRouteList');
        }
    };
    dataFactory.SaveDiseaseTransmissionRoute = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseTransmissionRoute/SaveDiseaseTransmissionRoute');
        }
    };
    dataFactory.DeleteDiseaseTransmissionRoute = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseTransmissionRoute/DeleteDiseaseTransmissionRoute');
        }
    };

    //Disease Geo Location
    dataFactory.CountryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseGeoLocation/CountryList');
        }
    };
    dataFactory.StateList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseGeoLocation/StateList');
        }
    };
    dataFactory.CityList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseGeoLocation/CityList');
        }
    };
    dataFactory.DiseaseGeoLocationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseGeoLocation/DiseaseGeoLocationList');
        }
    };
    dataFactory.SaveDiseaseGeoLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseGeoLocation/SaveDiseaseGeoLocation');
        }
    };
    dataFactory.DeleteDiseaseGeoLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseGeoLocation/DeleteDiseaseGeoLocation');
        }
    };

    //Disease Prevention
    dataFactory.DiseasePreventionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseasePrevention/DiseasePreventionList');
        }
    };
    dataFactory.SaveDiseasePrevention = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseasePrevention/SaveDiseasePrevention');
        }
    };
    dataFactory.DeleteDiseasePrevention = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseasePrevention/DeleteDiseasePrevention');
        }
    };

    // Calculator Master
    dataFactory.CalculatorDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Calculator/CalculatorDetailList');
        }
    };
    dataFactory.SaveCalculator = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Calculator/SaveCalculator');
        }
    };
    dataFactory.DeleteCalculator = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Calculator/DeleteCalculator');
        }
    };

    // Calculator Formula Master
    dataFactory.InitControlsFormula = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorFormula/InitControlsCalculatorFormula');
        }
    };
    dataFactory.CalculatorFormulaList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorFormula/CalculatorFormulaList');
        }
    };
    dataFactory.SaveCalculatorFormula = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorFormula/SaveCalculatorFormula');
        }
    };
    dataFactory.DeleteCalculatorFormula = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorFormula/DeleteCalculatorFormula');
        }
    };

    // Calculator Formula Controls
    dataFactory.InitControlsFormulaControls = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorControl/InitCalculatorControl');
        }
    };
    dataFactory.CalculatorFormulaControlsList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorControl/CalculatorControlList');
        }
    };
    dataFactory.SaveCalculatorFormulaControls = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorControl/SaveCalculatorControl');
        }
    };
    dataFactory.DeleteCalculatorFormulaControls = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorControl/DeleteCalculatorControl');
        }
    };
    dataFactory.CalculatorOtherParametersList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorControl/CalculatorOtherParameters');
        }
    };

    // Disease Input
    dataFactory.DiseaseDepartmentListInput = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'DiseaseInput/DiseaseDepartmentList');
        }
    };
    dataFactory.InputTypeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/InputTypeList');
        }
    };

    //new code
    dataFactory.GetAllDiseaseHistoryInputList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/GetAllDiseaseHistoryInputList');
        }
    };
    dataFactory.AttributeValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/AttributeValueList');
        }
    };
    dataFactory.DosageFormMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/DosageFormMasterList');
        }
    };
    dataFactory.FrequencyMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/FrequencyMasterList');
        }
    };
    dataFactory.DiseaseHistoryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/DiseaseHistoryList');
        }
    };
    dataFactory.DiseaseHistoryIntakeAttributeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/DiseaseHistoryIntakeAttributeList');
        }
    };
    dataFactory.DiseaseMedicationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/DiseaseMedicationList');
        }
    };
    dataFactory.DiseaseSupportiveMedicineList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/DiseaseSupportiveMedicineList');
        }
    };
    dataFactory.SaveDiseaseInput = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/SaveDiseaseInput');
        }
    };
    dataFactory.DeleteDiseaseInput = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseInput/DeleteDiseaseInput');
        }
    };

    //Disease Communicability Details
    dataFactory.IncubationUnitList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetails/IncubationUnitList');
        }
    };
    dataFactory.TempUnitList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetails/TempUnitList');
        }
    };
    dataFactory.HumidityUnitList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetails/HumidityUnitList');
        }
    };
    dataFactory.CommunicabilityUnitList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetails/CommunicabilityUnitList');
        }
    };
    dataFactory.DiseaseCommunicabilityDetailsList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetails/DiseaseCommunicabilityDetailsList');
        }
    };
    dataFactory.SaveDiseaseCommunicabilityDetails = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetails/SaveDiseaseCommunicabilityDetails');
        }
    };
    dataFactory.DeleteDiseaseCommunicabilityDetails = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetails/DeleteDiseaseCommunicabilityDetails');
        }
    };

    //Merge Problem
    dataFactory.MergeProblem = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergeProblem/MergeProblem');
        }
    };

    //Disease Signaling Cascade
    dataFactory.StatusMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSignalingCascade/StatusMasterList');
        }
    };
    dataFactory.NutrientMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSignalingCascade/NutrientMasterList');
        }
    };
    dataFactory.NutrientFunctionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSignalingCascade/NutrientFunctionList');
        }
    };
    dataFactory.DiseaseSignalingCascadeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSignalingCascade/DiseaseSignalingCascadeList');
        }
    };
    dataFactory.SaveDiseaseSignalingCascade = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSignalingCascade/SaveDiseaseSignalingCascade');
        }
    };
    dataFactory.DeleteDiseaseSignalingCascade = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSignalingCascade/DeleteDiseaseSignalingCascade');
        }
    };
    dataFactory.SaveFunction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSignalingCascade/SaveFunction');
        }
    };
    dataFactory.DeleteFunction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSignalingCascade/DeleteFunction');
        }
    };
    dataFactory.ProblemLevelList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSignalingCascade/ProblemLevelList');
        }
    };

    // Assign Calculator To Department
    dataFactory.InitControlsCalculatorToDept = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignCalculatorToDepartment/InitControlsAssignCalcToDepartment');
        }
    };
    dataFactory.AssignedCalculatorToDeptList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignCalculatorToDepartment/CalculatorToDepartmentList');
        }
    };
    dataFactory.SaveCalculatorToDept = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignCalculatorToDepartment/SaveCalculatorToDepartment');
        }
    };
    dataFactory.DeleteCalculatorToDept = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignCalculatorToDepartment/DeleteCalculatorToDepartment');
        }
    };

    // Assign Calculator To Disease
    dataFactory.InitControlsCalculatorToDisease = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignCalculatorToDisease/InitControlsAssignCalcToDisease');
        }
    };
    dataFactory.AssignedCalculatorToDiseaseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignCalculatorToDisease/CalculatorToDiseaseList');
        }
    };
    dataFactory.SaveCalculatorToDisease = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignCalculatorToDisease/SaveCalculatorToDisease');
        }
    };
    dataFactory.DeleteCalculatorToDisease = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignCalculatorToDisease/DeleteCalculatorToDisease');
        }
    };

    // User Login Master
    dataFactory.InitControlsUserLoginMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UserLoginMaster/InitControlsUserLoginMaster');
        }
    };
    dataFactory.UserLoginMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UserLoginMaster/UserLoginMasterList');
        }
    };
    dataFactory.SaveUserLoginMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UserLoginMaster/SaveUserLoginMaster');
        }
    };
    dataFactory.DeleteUserLoginMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UserLoginMaster/DeleteUserLoginMaster');
        }
    };
    dataFactory.UpdateUserPassword = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UserLoginMaster/UpdateUserLoginPassword');
        }
    };

    // Menu Master
    dataFactory.InitControlsMenuMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuMaster/InitControlsMenuMaster');
        }
    };
    dataFactory.MenuMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuMaster/MenuMasterList');
        }
    };
    dataFactory.SaveMenuMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuMaster/SaveMenuMaster');
        }
    };
    dataFactory.DeleteMenuMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuMaster/DeleteMenuMaster');
        }
    };

    // Assign Menu Master
    dataFactory.InitControlsAssignMenu = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignMenuMaster/InitControlsAssignMenu');
        }
    };
    dataFactory.AssignMenuList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignMenuMaster/AssignedMenuList');
        }
    };
    dataFactory.SaveAssignMenu = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignMenuMaster/SaveAssignMenu');
        }
    };
    dataFactory.DeleteAssignMenu = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignMenuMaster/DeleteAssignMenu');
        }
    };
    dataFactory.GetMenuList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignMenuMaster/GetMenuList');
        }
    };

    // Record Count Report
    dataFactory.RecordCountDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'RecordCount/RecordCountReportList');
        }
    };
    dataFactory.TableReportDateWiseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'RecordCount/TableReportDateWiseList');
        }
    };
    dataFactory.UserTaskTableReportList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'RecordCount/UserTaskTableReportList');
        }
    };

    // Assign Medicine To Disease
    dataFactory.InitControlsMedicineToDisease = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignMedicineToDisease/InitControlsAssignMedicineToDisease');
        }
    };
    dataFactory.AssignedMedicineToDiseaseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignMedicineToDisease/AssignedMedicineToDiseaseList');
        }
    };
    dataFactory.SaveMedicineToDisease = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignMedicineToDisease/SaveAssignedMedicineToDiseaseList');
        }
    };
    dataFactory.DeleteMedicineToDisease = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignMedicineToDisease/DeleteAssignedMedicineToDisease');
        }
    };

    // Disease Treatement
    dataFactory.InitControlsDiseaseTreatment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseTreatment/InitControlsDiseaseTreatment');
        }
    };
    dataFactory.DiseaseTreatmentList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseTreatment/DiseaseTreatmentList');
        }
    };
    dataFactory.SaveDiseaseTreatment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseTreatment/SaveDiseaseTreatment');
        }
    };
    dataFactory.DeleteDiseaseTreatment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseTreatment/DeleteDiseaseTreatment');
        }
    };

    // Disease Surgery
    dataFactory.InitControlsDiseaseSurgery = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSurgery/InitControlsDiseaseSurgery');
        }
    };
    dataFactory.DiseaseSurgeryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSurgery/DiseaseSurgeryList');
        }
    };
    dataFactory.SaveDiseaseSurgery = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSurgery/SaveDiseaseSurgery');
        }
    };
    dataFactory.DeleteDiseaseSurgery = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSurgery/DeleteDiseaseSurgery');
        }
    };

    // Nutrient Interaction
    dataFactory.InitControlsNutrientInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientInteraction/InitControlsNutrientInteraction');
        }
    };
    dataFactory.NutrientInteractionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientInteraction/NutrientInteractionList');
        }
    };
    dataFactory.SaveNutrientInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientInteraction/SaveNutrientInteraction');
        }
    };
    dataFactory.DeleteNutrientInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientInteraction/DeleteNutrientInteraction');
        }
    };

    // Food Intake Limit
    dataFactory.InitControlsFoodIntakeLimit = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodIntakeLimit/InitControlsFoodIntakeLimit');
        }
    };
    dataFactory.FoodIntakeLimitList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodIntakeLimit/FoodIntakeLimitList');
        }
    };
    dataFactory.SaveFoodIntakeLimit = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodIntakeLimit/SaveFoodIntakeLimit');
        }
    };
    dataFactory.DeleteFoodIntakeLimit = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodIntakeLimit/DeleteFoodIntakeLimit');
        }
    };

    // Cooking Temprature
    dataFactory.InitControlsCookingTemperature = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperature/InitControlsCookingTemperature');
        }
    };
    dataFactory.CookingTemperatureList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperature/CookingTemperatureList');
        }
    };
    dataFactory.SaveCookingTemperature = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperature/SaveCookingTemperature');
        }
    };
    dataFactory.DeleteCookingTemperature = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperature/DeleteCookingTemperature');
        }
    };

    // Cooking Temprature Effect
    dataFactory.InitControlsCookingTemperatureEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperatureEffect/InitControlsCookingTemperatureEffect');
        }
    };
    dataFactory.CookingTemperatureEffectList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperatureEffect/CookingTemperatureEffectList');
        }
    };
    dataFactory.SaveCookingTemperatureEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperatureEffect/SaveCookingTemperatureEffect');
        }
    };
    dataFactory.DeleteCookingTemperatureEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperatureEffect/DeleteCookingTemperatureEffect');
        }
    };

    // Cooking Temprature Effect
    dataFactory.InitControlsCookingTemperatureEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperatureEffect/InitControlsCookingTemperatureEffect');
        }
    };
    dataFactory.CookingTemperatureEffectList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperatureEffect/CookingTemperatureEffectList');
        }
    };
    dataFactory.SaveCookingTemperatureEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperatureEffect/SaveCookingTemperatureEffect');
        }
    };
    dataFactory.DeleteCookingTemperatureEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CookingTemperatureEffect/DeleteCookingTemperatureEffect');
        }
    };

    // Nutrient Clinical Feature
    dataFactory.InitControlsNutrientClinicalFeature = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientClinicalFeature/InitControlsNutrientClinicalFeature');
        }
    };
    dataFactory.NutrientClinicalFeatureList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientClinicalFeature/NutrientClinicalFeatureList');
        }
    };
    dataFactory.SaveNutrientClinicalFeature = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientClinicalFeature/SaveNutrientClinicalFeature');
        }
    };
    dataFactory.DeleteNutrientClinicalFeature = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientClinicalFeature/DeleteNutrientClinicalFeature');
        }
    };

    // Problem Nutrient Role
    dataFactory.InitControlsProblemNutrientRole = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemNutrientRole/InitProblemNutrientRole');
        }
    };
    dataFactory.ProblemNutrientRoleList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemNutrientRole/ProblemNutrientRoleList');
        }
    };

    // Food Region Assign
    dataFactory.InitControlsFoodRegionAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRegionAssign/InitControlsFoodRegionAssign');
        }
    };
    dataFactory.GetFoodList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRegionAssign/GetFoodList');
        }
    };
    dataFactory.RegionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRegionAssign/RegionList');
        }
    };
    dataFactory.FoodRegionAssignList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRegionAssign/FoodRegionAssignList');
        }
    };
    dataFactory.SaveFoodRegionAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRegionAssign/SaveFoodRegionAssignList');
        }
    };
    dataFactory.DeleteFoodRegionAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRegionAssign/DeleteFoodRegionAssign');
        }
    };

    // Medicine Strength
    dataFactory.InitControlsMedicineStrength = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineStrength/InitControlsMedicineStrength');
        }
    };
    dataFactory.MedicineStrengthList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineStrength/MedicineStrengthList');
        }
    };
    dataFactory.SaveMedicineStrength = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineStrength/SaveMedicineStrengthList');
        }
    };
    dataFactory.DeleteMedicineStrength = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineStrength/DeleteMedicineStrength');
        }
    };

    // Medicine Mechanism Action
    dataFactory.InitControlsMedicineMechanismAction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineMechanismAction/InitControlsMedicineMechanismAction');
        }
    };
    dataFactory.MedicineMechanismActionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineMechanismAction/MedicineMechanismActionList');
        }
    };
    dataFactory.SaveMedicineMechanismAction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineMechanismAction/SaveMedicineMechanismAction');
        }
    };
    dataFactory.DeleteMedicineMechanismAction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineMechanismAction/DeleteMedicineMechanismAction');
        }
    };


    // Medicine Mechanism Interaction 
    dataFactory.InitControlsMedicineMechanismInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineMechanismInteraction/InitControlsMedicineMechanismInteraction');
        }
    };
    dataFactory.MedicineMechanismInteractionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineMechanismInteraction/MedicineMechanismInteractionList');
        }
    };
    dataFactory.SaveMedicineMechanismInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineMechanismInteraction/SaveMedicineMechanismInteraction');
        }
    };
    dataFactory.DeleteMedicineMechanismInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineMechanismInteraction/DeleteMedicineMechanismInteraction');
        }
    };

    // Food Search List     
    dataFactory.AddImageStructure = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodSearchList/AddImageStructure');
        }
    };
    dataFactory.DeleteImageStructure = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodSearchList/DeleteImageStructure');
        }
    };
    dataFactory.MasterActiveCompounds = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'FoodSearchList/MasterActiveCompounds');
        }
    };
    dataFactory.getSelectedFoodList = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'FoodSearchList/SelectedFoodList');
        }
    };
    dataFactory.DeleteFood = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodSearchList/DeleteFood');
        }
    };

    // Food Family Assign
    dataFactory.SaveFoodFamilyAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyAssign/SaveFoodFamilyAssign');
        }
    };
    dataFactory.DeleteFoodFamilyAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyAssign/DeleteFoodFamilyAssign');
        }
    };
    dataFactory.FoodFamilyAssignList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyAssign/FoodFamilyAssignList');
        }
    };
    dataFactory.FoodFamilyMasterList = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'FoodFamilyAssign/FoodFamilyMasterList');
        }
    };
    dataFactory.FoodMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyAssign/FoodMasterList');
        }
    };

    // Nutrient THalf
    dataFactory.InitControlsNutrientTHalf = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'NutrientTHalf/InitControlsNutrientTHalf');
        }
    };
    dataFactory.NutrientTHalfList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientTHalf/NutrientTHalfList');
        }
    };
    dataFactory.SaveNutrientTHalf = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientTHalf/SaveNutrientTHalf');
        }
    };
    dataFactory.DeleteNutrientTHalf = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientTHalf/DeleteNutrientTHalf');
        }
    };

    // Nutrient Peak Value
    dataFactory.InitControlsNutrientPeakValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientPeakValue/InitControlsNutrientPeakValue');
        }
    };
    dataFactory.NutrientPeakValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientPeakValue/NutrientPeakValueList');
        }
    };
    dataFactory.SaveNutrientPeakValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientPeakValue/SaveNutrientPeakValue');
        }
    };
    dataFactory.DeleteNutrientPeakValue = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientPeakValue/DeleteNutrientPeakValue');
        }
    };

    // Medicine Action
    dataFactory.InitControlsMedicineAction = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicineAction/InitControlsMedicineAction');
        }
    };
    dataFactory.MedicineActionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineAction/MedicineActionList');
        }
    };
    dataFactory.SaveMedicineAction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineAction/SaveMedicineAction');
        }
    };
    dataFactory.DeleteMedicineAction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineAction/DeleteMedicineAction');
        }
    };

    // Medicine Indication
    dataFactory.InitControlsMedicineIndication = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicineIndication/InitControlsMedicineIndication');
        }
    };
    dataFactory.MedicineIndicationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineIndication/MedicineIndicationList');
        }
    };
    dataFactory.SaveMedicineIndication = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineIndication/SaveMedicineIndication');
        }
    };
    dataFactory.DeleteMedicineIndication = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineIndication/DeleteMedicineIndication');
        }
    };

    // History Input Department Assign //
    dataFactory.GetHistoryInputTypeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'HistoryInputDepartmentAssign/GetHistoryInputTypeList');
        }
    };
    dataFactory.GetDepartmentList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'HistoryInputDepartmentAssign/GetDepartmentList');
        }
    };
    dataFactory.SaveHistoryInputDepartmentAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'HistoryInputDepartmentAssign/SaveHistoryInputDepartmentAssign');
        }
    };
    dataFactory.DeleteHistoryInputDepartmentAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'HistoryInputDepartmentAssign/DeleteHistoryInputDepartmentAssign');
        }
    };
    dataFactory.HistoryInputDepartmentAssignList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'HistoryInputDepartmentAssign/HistoryInputDepartmentAssignList');
        }
    };

    // Nutrient Medicine Action Pathway
    dataFactory.SaveNutrientMedicineActionPathway = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientMedicineActionPathway/SaveNutrientMedicineActionPathway');
        }
    };
    dataFactory.DeleteNutrientMedicineActionPathway = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientMedicineActionPathway/DeleteNutrientMedicineActionPathway');
        }
    };
    dataFactory.BindAllNutMedActPathwayList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientMedicineActionPathway/BindAllNutMedActPathwayList');
        }
    };

    // Nutrient Medicine Interaction //
    dataFactory.SaveNutrientMedicineInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientMedicineInteraction/SaveNutrientMedicineInteraction');
        }
    };
    dataFactory.DeleteNutrientMedicineInteraction = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientMedicineInteraction/DeleteNutrientMedicineInteraction');
        }
    };
    dataFactory.BindAllNutMedInteractionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientMedicineInteraction/BindAllNutMedInteractionList');
        }
    };

    // Department
    dataFactory.SaveDepartment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Department/SaveDepartment');
        }
    };
    dataFactory.DeleteDepartment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Department/DeleteDepartment');
        }
    };
    dataFactory.GetAllDepartmentList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Department/GetAllDepartmentList');
        }
    };

    // Medicine ContraIndication
    dataFactory.InitControlsMedicineContraIndication = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicineContraIndication/InitControlsMedicineContraIndication');
        }
    };
    dataFactory.MedicineContraIndicationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineContraIndication/MedicineContraIndicationList');
        }
    };
    dataFactory.SaveMedicineContraIndication = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineContraIndication/SaveMedicineContraIndication');
        }
    };
    dataFactory.DeleteMedicineContraIndication = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineContraIndication/DeleteMedicineContraIndication');
        }
    };

    // Medicine Supplement
    dataFactory.InitControlsMedicineSupplement = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicineSupplement/InitControlsMedicineSupplement');
        }
    };
    dataFactory.MedicineSupplementList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineSupplement/MedicineSupplementList');
        }
    };
    dataFactory.GetMedicineBrandList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineSupplement/MedicineBrandList');
        }
    };
    dataFactory.SaveMedicineSupplement = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineSupplement/SaveMedicineSupplement');
        }
    };
    dataFactory.DeleteMedicineSupplement = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineSupplement/DeleteMedicineSupplement');
        }
    };
    dataFactory.DeleteNutrient = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineSupplement/DeleteNutrient');
        }
    };

    // Nutrient Component Assign
    dataFactory.InitControlsNutrientComponentAssign = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'NutrientComponentAssign/InitControlsNutrientComponentAssign');
        }
    };
    dataFactory.NutrientComponentAssignList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientComponentAssign/NutrientComponentAssignList');
        }
    };
    dataFactory.SaveNutrientComponentAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientComponentAssign/SaveNutrientComponentAssign');
        }
    };
    dataFactory.DeleteNutrientComponentAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientComponentAssign/DeleteNutrientComponentAssign');
        }
    };

    // Medicine Pathway Activator
    dataFactory.InitControlsMedicinePathwayActivator = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicinePathwayActivator/InitControlsMedicinePathwayActivator');
        }
    };
    dataFactory.MedicinePathwayActivatorList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicinePathwayActivator/MedicinePathwayActivatorList');
        }
    };
    dataFactory.SaveMedicinePathwayActivator = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicinePathwayActivator/SaveMedicinePathwayActivator');
        }
    };
    dataFactory.DeleteMedicinePathwayActivator = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicinePathwayActivator/DeleteMedicinePathwayActivator');
        }
    };

    // Disease Communicability Detail
    dataFactory.InitControlsDiseaseCommunicabilityDetail = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/InitControlsDiseaseCommunicabilityDetail');
        }
    };
    dataFactory.SaveDiseaseCommunicabilityDetail = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/SaveDiseaseCommunicabilityDetail');
        }
    };
    dataFactory.SaveAgentFactor = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/SaveAgentFactor');
        }
    };
    dataFactory.SaveEnvironmentFactor = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/SaveEnvironmentFactor');
        }
    };
    dataFactory.SaveTransmissionRoute = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/SaveTransmissionRoute');
        }
    };
    dataFactory.SaveGeoLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/SaveGeoLocation');
        }
    };
    dataFactory.DiseaseCommunicabilityDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/DiseaseCommunicabilityDetailList');
        }
    };
    dataFactory.getSingleDiseaseCommunicabilityDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/SingleDiseaseCommunicabilityDetailList');
        }
    };
    dataFactory.AgentFactorDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/AgentFactorDetailList');
        }
    };
    dataFactory.EnviorenmentFactorDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/EnviorenmentFactorDetailList');
        }
    };
    dataFactory.TransmissionRouteDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/TransmissionRouteDetailList');
        }
    };
    dataFactory.GeoLocationDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/GeoLocationDetailList');
        }
    };
    dataFactory.DeleteAgentFactorDetail = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/DeleteAgentFactor');
        }
    };
    dataFactory.DeleteEnviorenmentFactorDetail = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/DeleteEnviorenmentFactor');
        }
    };
    dataFactory.DeleteTransmissionRouteDetail = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/DeleteTransmissionRoute');
        }
    };
    dataFactory.DeleteGeoLocationDetail = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/DeleteGeoLocation');
        }
    };
    dataFactory.DeleteDiseaseCommunicabilityDetail = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseCommunicabilityDetail/DeleteDiseaseCommunicabilityDetail');
        }
    };


    // Food Weight
    dataFactory.InitControlsFoodWeight = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'FoodWeight/InitControlsFoodWeight');
        }
    };
    dataFactory.FoodWeightList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodWeight/FoodWeightList');
        }
    };
    dataFactory.SaveFoodWeight = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodWeight/SaveFoodWeight');
        }
    };
    dataFactory.DeleteFoodWeight = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodWeight/DeleteFoodWeight');
        }
    };

    // Medicine Dose
    dataFactory.InitControlsMedicineDose = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicineDose/InitControlsMedicineDose');
        }
    };
    dataFactory.MedicineDoseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineDose/MedicineDoseList');
        }
    };
    dataFactory.SaveMedicineDose = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineDose/SaveMedicineDose');
        }
    };
    dataFactory.DeleteMedicineDose = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineDose/DeleteMedicineDose');
        }
    };

    // Merge Food
    dataFactory.MergeFood = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergeFood/MergeFood');
        }
    };

    // Merge Nutrient
    dataFactory.MergeNutrient = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergeNutrient/MergeNutrient');
        }
    };

    // Medicine Brand Add
    dataFactory.InitControlsMedicineBrand = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrand/InitControlsMedicineBrand');
        }
    };
    dataFactory.MedicineBrand = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrand/MedicineBrand');
        }
    };
    dataFactory.MedicineBrandList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrand/MedicineBrandList');
        }
    };
    dataFactory.SaveMedicineBrand = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrand/SaveMedicineBrand');
        }
    };
    dataFactory.DeleteMedicineBrand = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrand/DeleteMedicineBrand');
        }
    };

    // Medicine Brand Country Add
    dataFactory.InitControlsMedicineBrandCountry = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountry/InitControlsMedicineBrandCountry');
        }
    };
    dataFactory.MedicineBrandGetList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountry/MedicineBrandGetList');
        }
    };
    dataFactory.MedicineBrandCountryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountry/MedicineBrandCountryList');
        }
    };
    dataFactory.SaveMedicineBrandCountry = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountry/SaveMedicineBrandCountry');
        }
    };
    dataFactory.DeleteMedicineBrandCountry = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountry/DeleteMedicineBrandCountry');
        }
    };

    // UNit Family Assign
    dataFactory.UnitList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitFamilyAssign/UnitList');
        }
    };
    dataFactory.UnitSave = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitFamilyAssign/UnitSave');
        }
    };
    dataFactory.UnitDelete = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitFamilyAssign/UnitDelete');
        }
    };
    dataFactory.UnitFamilyList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitFamilyAssign/UnitFamilyList');
        }
    };
    dataFactory.UnitFamilySave = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitFamilyAssign/UnitFamilySave');
        }
    };
    dataFactory.UnitFamilyDelete = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitFamilyAssign/UnitFamilyDelete');
        }
    };
    dataFactory.UnitFamilyAssignedList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitFamilyAssign/UnitFamilyAssignedList');
        }
    };
    dataFactory.SaveUnitFamilyAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitFamilyAssign/SaveUnitFamilyAssign');
        }
    };
    dataFactory.DeleteUnitFamilyAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitFamilyAssign/DeleteUnitFamilyAssign');
        }
    };

    // Nutrient Barrier
    dataFactory.InitControlsNutrientBarrier = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientBarrier/InitControlsNutrientBarrier');
        }
    };
    dataFactory.SaveNutrientBarrier = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientBarrier/SaveNutrientBarrier');
        }
    };
    dataFactory.NutrientBarrierList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientBarrier/NutrientBarrierList');
        }
    };
    dataFactory.DeleteNutrientBarrier = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientBarrier/DeleteNutrientBarrier');
        }
    };

    // Disease Department
    dataFactory.InitControlsDiseaseDepartment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/InitControlsDiseaseDepartment');
        }
    };
    dataFactory.SaveDiseaseDepartment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/SaveDiseaseDepartment');
        }
    };
    dataFactory.DiseaseDepartmentList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/DiseaseDepartmentList');
        }
    };
    dataFactory.DeleteDiseaseDepartment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/DeleteDiseaseDepartment');
        }
    };
    dataFactory.DiseaseDepartmentInputTypeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/InputTypeList');
        }
    };
    dataFactory.DiseaseDepartmentAttributeValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/AttributeValueList');
        }
    };
    dataFactory.DiseaseDepartmentDosageFormMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/DosageFormMasterList');
        }
    };
    dataFactory.DiseaseDepartmentFrequencyMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/FrequencyMasterList');
        }
    };
    dataFactory.DiseaseDepartmentDiseaseHistoryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/DiseaseHistoryList');
        }
    };
    dataFactory.DiseaseDepartmentDiseaseHistoryIntakeAttributeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/DiseaseHistoryIntakeAttributeList');
        }
    };
    dataFactory.DiseaseDepartmentDiseaseMedicationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/DiseaseMedicationList');
        }
    };
    dataFactory.DiseaseDepartmentDiseaseSupportiveMedicineList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartment/DiseaseSupportiveMedicineList');
        }
    };
    dataFactory.DiseaseDepartmentBindRegionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/DiseaseDepartmentBindRegionList');
        }
    };

    // Unit Conversion
    dataFactory.InitControlsUnitConversion = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitConversion/InitControlsUnitConversion');
        }
    };
    dataFactory.SaveUnitConversion = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitConversion/SaveUnitConversion');
        }
    };
    dataFactory.UnitConversionList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitConversion/UnitConversionList');
        }
    };
    dataFactory.DeleteUnitConversion = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UnitConversion/DeleteUnitConversion');
        }
    };

    // Nutrient Report
    dataFactory.getNutrientBySearch = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientReport/NutrientMasterList');
        }
    };
    dataFactory.NutrientReportList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientReport/NutrientReportList');
        }
    };

    // Food Report
    dataFactory.rFoodMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodReport/FoodMasterList');
        }
    };
    dataFactory.FoodReportList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodReport/FoodReportList');
        }
    };

    // Receptor Color
    dataFactory.receptorColorList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ReceptorColor/NutrientMasterList');
        }
    };
    dataFactory.receptorColorDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ReceptorColor/ReceptorColorDetailList');
        }
    };
    dataFactory.saveReceptorColor = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ReceptorColor/SaveNutrientMaster');
        }
    };
    dataFactory.deleteReceptorColor = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ReceptorColor/DeleteNutrientMaster');
        }
    };

    // Medicine Group Master
    dataFactory.InitControlsMedicineGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/InitControlsMedicineGroup');
        }
    };
    dataFactory.MedicineGroupList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/MedicineGroupList');
        }
    };
    dataFactory.SaveMedicineGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/SaveMedicineGroup');
        }
    };
    dataFactory.DeleteMedicineGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/DeleteMedicineGroup');
        }
    };
    dataFactory.assignedMedicineGroupList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/AssignedMedicineGroupList');
        }
    };
    dataFactory.SaveAssignedMedicineGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/SaveAssignedMedicineGroup');
        }
    };
    dataFactory.DeleteAssignedMedicineGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/DeleteAssignedMedicineGroup');
        }
    };

    // Food Type Update
    dataFactory.InitControlsFoodType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodType/InitControlsFoodType');
        }
    };
    dataFactory.FoodType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodType/FoodType');
        }
    };
    dataFactory.FoodTypeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodType/FoodTypeList');
        }
    };
    dataFactory.SaveFoodType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodType/SaveFoodType');
        }
    };
    dataFactory.DeleteFoodType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodType/DeleteFoodType');
        }
    };

    // CalculatorScore
    dataFactory.InitControlsCalculatorScore = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorScore/InitControlsCalculatorScore');
        }
    };
    dataFactory.CalculatorScoreList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorScore/CalculatorScoreList');
        }
    };
    dataFactory.CalculatorControlMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorScore/CalculatorControlList');
        }
    };
    dataFactory.SaveCalculatorScore = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorScore/SaveCalculatorScore');
        }
    };
    dataFactory.DeleteCalculatorScore = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorScore/DeleteCalculatorScore');
        }
    };
    dataFactory.getColorList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorScore/GetColorList');
        }
    };

    // Get Questionaire List
    dataFactory.getQuestionaireList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorScore/GetQuestionaireList');
        }
    };

    // CalculatorResult
    dataFactory.InitControlsCalculatorResult = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorResult/InitControlsCalculatorResult');
        }
    };
    dataFactory.CalculatorResultList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorResult/CalculatorResultList');
        }
    };
    dataFactory.SaveCalculatorResult = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorResult/SaveCalculatorResult');
        }
    };
    dataFactory.DeleteCalculatorResult = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorResult/DeleteCalculatorResult');
        }
    };

    // Disease Report
    dataFactory.DiseaseReportList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseReport/DiseaseReportList');
        }
    };

    // Medicine Status
    dataFactory.MedicineMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineStatus/MedicineMasterList');
        }
    };
    dataFactory.MedicineStatusList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineStatus/MedicineStatusList');
        }
    };

    // Nutrient Status
    dataFactory.NutrientMasterList1 = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientStatus/NutrientMasterList');
        }
    };
    dataFactory.NutrientStatusList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientStatus/NutrientStatusList');
        }
    };

    // Nutrient Level Geo Location
    dataFactory.InitControlsNutrientLevelGeoLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientLevelGeoLocation/InitControlsNutrientLevelGeoLocation');
        }
    };
    dataFactory.NutrientLevelGeoLocationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientLevelGeoLocation/NutrientLevelGeoLocationList');
        }

    };
    dataFactory.countryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientLevelGeoLocation/CountryList');
        }
    };
    dataFactory.stateList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientLevelGeoLocation/StateList');
        }
    };
    dataFactory.cityList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientLevelGeoLocation/CityList');
        }
    };
    dataFactory.SaveNutrientLevelGeoLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientLevelGeoLocation/SaveNutrientLevelGeoLocation');
        }
    };
    dataFactory.DeleteNutrientLevelGeoLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientLevelGeoLocation/DeleteNutrientLevelGeoLocation');
        }

    };

    // Rank details
    dataFactory.initControls = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ManageRank/initControls');
        }
    };
    dataFactory.manageRankDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ManageRank/ManageRankDetailList');
        }
    };
    dataFactory.saveManageRank = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ManageRank/SaveManageRank');
        }
    };
    dataFactory.deleteManageRank = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ManageRank/DeleteManageRank');
        }
    };

    // Problem ICD Details
    dataFactory.problemICDinitControls = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemICD/initControls');
        }
    };
    dataFactory.problemICDList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemICD/problemICDList');
        }
    };
    dataFactory.GetProblemICDByName = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemICD/GetProblemICDByName ');
        }
    };
    dataFactory.SaveProblemICD = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemICD/saveProblemICD');
        }
    };
    dataFactory.deleteProblemICD = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemICD/DeleteProblemICD');
        }
    };

    //DrugCrwal
    dataFactory.searchKeywordPdf = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp23(jsonParam, "http://192.168.7.13:8083/pdfReader");
        }
    };

    // Calculator Parameter Master 
    dataFactory.questionnaireList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorParameterMaster/QuestionnaireList');
        }
    };
    dataFactory.calculatorListP = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorParameterMaster/CalculatorList');
        }
    };
    dataFactory.calculatorOtherParameterListP = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorParameterMaster/CalculatorOtherParameterList');
        }
    };
    dataFactory.SaveCalculatorParameterMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorParameterMaster/SaveCalculatorParameterMaster');
        }
    };
    dataFactory.deleteCalculatorParameterMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorParameterMaster/DeleteCalculatorParameterMaster');
        }
    };
    dataFactory.CalculatorParameterMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorParameterMaster/CalculatorParameterMasterList');
        }
    };
    dataFactory.checkCalculatorType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorScore/CheckCalculatorType');
        }
    };
    dataFactory.CalculatorControlMasterParameterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorFormula/CalculatorControlMasterParameterList');
        }
    };

    //nutrient occupatipon
    dataFactory.NutritionDerangeOcuupationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientClinicalFeature/NutritionDerangeOcuupationList');
        }
    };
    dataFactory.SaveOccupation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientClinicalFeature/SaveOccupation');
        }
    };
    dataFactory.DeleteOccupation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientClinicalFeature/DeleteOccupation');
        }
    };

    //19-07-2019
    dataFactory.parameterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CalculatorFormula/ParameterList');
        }
    };

    // Hen RDA
    dataFactory.bindListForHenRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'HenDietary/BindSelectListForRDA');
        }
    };
    dataFactory.LoadHenRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'HenDietary/LoadRDA');
        }
    };
    dataFactory.saveHenRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'HenDietary/SaveRDA');
        }
    };
    dataFactory.updateHenRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'HenDietary/UpdateRDA');
        }
    };
    dataFactory.deleteHenRDA = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'HenDietary/DeleteRDA');
        }
    };

    // MedicineTherapeuticLevel
    dataFactory.CheckMedicineTherapeuticLevelExistence = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTherapeuticLevel/ChecMedicineTherapeuticLevelExistence');
        }
    };
    dataFactory.UnitMasterDoseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTherapeuticLevel/UnitMasterDoseList');
        }
    };
    dataFactory.MedicineTherapeuticLevelList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTherapeuticLevel/MedicineTherapeuticLevelList');
        }
    };
    dataFactory.SaveMedicineTherapeuticLevel = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTherapeuticLevel/SaveMedicineTherapeuticLevel');
        }
    };
    dataFactory.DeleteMedicineTherapeuticLevel = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineTherapeuticLevel/DeleteMedicineTherapeuticLevel');
        }
    };

    // Disease Complications Add
    dataFactory.InitControlsdiseaseComplications = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseComplications/InitControlsDiseaseComplications');
        }
    };

    dataFactory.DiseaseComplicationsList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseComplications/DiseaseComplicationsList');
        }
    };
    dataFactory.SaveDiseaseComplications = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseComplications/SaveDiseaseComplications');
        }
    };
    dataFactory.DeleteDiseaseComplications = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseComplications/DeleteDiseaseComplications');
        }
    };

    // Problem Cause Type Add
    dataFactory.InitControlsProblemCauseType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseType/InitControlsProblemCauseType');
        }
    };
    dataFactory.ProblemCauseTypeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseType/ProblemCauseTypeList');
        }
    };
    dataFactory.ProblemCauseTypeParameterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseType/ProblemCauseTypeParameterList');
        }
    };
    dataFactory.SaveProblemCauseType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseType/SaveProblemCauseType');
        }
    };
    dataFactory.DeleteProblemCauseType = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseType/DeleteProblemCauseType');
        }
    };

    // Problem Cause Type Assign Add
    dataFactory.InitControlsProblemCauseTypeAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseTypeAssign/InitControlsProblemCauseTypeAssign');
        }
    };
    dataFactory.ProblemCauseTypeAssignList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseTypeAssign/ProblemCauseTypeAssignList');
        }
    };
    dataFactory.ProblemCauseTypeAssignParameterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseTypeAssign/ProblemCauseTypeAssignParameterList');
        }
    };
    dataFactory.SaveProblemCauseTypeAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseTypeAssign/SaveProblemCauseTypeAssign');
        }
    };
    dataFactory.DeleteProblemCauseTypeAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemCauseTypeAssign/DeleteProblemCauseTypeAssign');
        }
    };

    // Nutrient Dose Limit Add
    dataFactory.bindListForNutrientDoseLimit = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientDoseLimit/InitControlsNutrientDoseLimit');
        }
    };
    dataFactory.loadNutrientDoseLimit = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientDoseLimit/NutrientDoseLimitList');
        }
    };
    dataFactory.saveNutrientDoseLimit = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientDoseLimit/SaveNutrientDoseLimit');
        }
    };
    dataFactory.deleteNutrientDoseLimit = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientDoseLimit/DeleteNutrientDoseLimit');
        }
    };

    // Disease Speciality
    dataFactory.InitControlsDiseaseSpeciality = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSpeciality/InitControlsDiseaseSpeciality');
        }
    };
    dataFactory.DiseaseSpecialityList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSpeciality/DiseaseSpecialityList');
        }
    };
    dataFactory.SaveDiseaseSpeciality = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSpeciality/SaveDiseaseSpeciality');
        }
    };
    dataFactory.DeleteDiseaseSpeciality = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSpeciality/DeleteDiseaseSpeciality');
        }
    };

    // Disease Speciality Assign
    dataFactory.SaveDiseaseSpecialityAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSpecialityAssign/SaveDiseaseSpecialityAssign');
        }
    };
    dataFactory.DeleteDiseaseSpecialityAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSpecialityAssign/DeleteDiseaseSpecialityAssign');
        }
    };
    dataFactory.DiseaseSpecialityAssignList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSpecialityAssign/DiseaseSpecialityAssignList');
        }
    };
    dataFactory.DiseaseMasterList = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'DiseaseSpecialityAssign/DiseaseMasterList');
        }
    };
    dataFactory.SpecialityMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseSpecialityAssign/SpecialityMasterList');
        }
    };
    dataFactory.PdfFileList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'PdfFileList/PdfFileList');
        }
    };
    dataFactory.DiseaseCrawlerDiseaseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'PdfFileList/DiseaseList');
        }
    };

    // Property Name Value Assign
    dataFactory.PropertyNameList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationResultProperty/PropertyNameList');
        }
    };
    dataFactory.PropertyNameSave = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationResultProperty/PropertyNameSave');
        }
    };
    dataFactory.PropertyNameDelete = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationResultProperty/PropertyNameDelete');
        }
    };
    dataFactory.PropertyValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationResultProperty/PropertyValueList');
        }
    };
    dataFactory.PropertyValueSave = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationResultProperty/PropertyValueSave');
        }
    };
    dataFactory.PropertyValueDelete = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationResultProperty/PropertyValueDelete');
        }
    };
    dataFactory.PropertyNameValueAssignedList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationResultProperty/PropertyNameValueAssignedList');
        }
    };
    dataFactory.SavePropertyNameValueAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationResultProperty/SavePropertyNameValueAssign');
        }
    };
    dataFactory.DeletePropertyNameValueAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationResultProperty/DeletePropertyNameValue');
        }
    };

    // Food Family Average
    dataFactory.SaveFoodFamilyAverage = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyAverage/SaveFoodFamilyAverage');
        }
    };
    dataFactory.DeleteFoodFamilyAverage = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyAverage/DeleteFoodFamilyAverage');
        }
    };
    dataFactory.FoodFamilyAverageList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyAverage/FoodFamilyAverageList');
        }
    };
    dataFactory.getFoodFamilyBySearch = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyAverage/FoodFamilyMasterList');
        }
    };
    dataFactory.AverageFoodMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyAverage/FoodMasterList');
        }
    };

    // Diet SubCategory
    dataFactory.InitControlsDietSubCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DietSubCategory/InitControlsDietSubCategory');
        }
    };
    dataFactory.DietSubCategoryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DietSubCategory/DietSubCategoryList');
        }
    };
    dataFactory.SaveDietSubCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DietSubCategory/SaveDietSubCategory');
        }
    };
    dataFactory.DeleteDietSubCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DietSubCategory/DeleteDietSubCategory');
        }
    };

    // Diet Assign SubCategory To Category
    dataFactory.InitControlsAssignSubCategoryToCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubCategoryToCategory/InitControlsAssignSubCategoryToCategory');
        }
    };
    dataFactory.AssignSubCategoryToCategoryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubCategoryToCategory/AssignSubCategoryToCategoryList');
        }
    };
    dataFactory.SaveAssignSubCategoryToCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubCategoryToCategory/SaveAssignSubCategoryToCategory');
        }
    };
    dataFactory.DeleteAssignSubCategoryToCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'AssignSubCategoryToCategory/DeleteAssignSubCategoryToCategory');
        }
    };

    // Problem Diet Category 
    dataFactory.InitControlsProblemDietCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemDietCategory/InitControlsProblemDietCategory');
        }
    };
    dataFactory.ProblemDietCategoryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemDietCategory/ProblemDietCategoryList');
        }
    };
    dataFactory.SaveProblemDietCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemDietCategory/SaveProblemDietCategory');
        }
    };
    dataFactory.DeleteProblemDietCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemDietCategory/DeleteProblemDietCategory');
        }
    };

    //disease Department New
    dataFactory.getDiseaseDetailsByName = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/GetDiseaseDetailsByName');
        }
    };
    dataFactory.InitControlsDiseaseDepartmentNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/InitControlsDiseaseDepartment');
        }
    };
    dataFactory.SaveDiseaseDepartmentNew = function (obj) {
        log(obj);
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/SaveDiseaseDepartment');
        }
    };
    dataFactory.DiseaseDepartmentListNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/DiseaseDepartmentList');
        }
    };
    dataFactory.DeleteDiseaseDepartmentNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/DeleteDiseaseDepartment');
        }
    };
    dataFactory.DiseaseDepartmentInputTypeListNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/InputTypeList');
        }
    };
    dataFactory.DiseaseDepartmentAttributeValueListNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/AttributeValueList');
        }
    };
    dataFactory.GetProblemByName = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/getProblemByName');
        }
    };

    //disease Stage
    dataFactory.getDiseaseDepartmentByName = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStage/GetDiseaseDepartmentByName');
        }
    };
    dataFactory.InitControlsDiseaseStage = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStage/InitControlsDiseaseStage');
        }
    };
    dataFactory.SaveDiseaseStage = function (obj) {
        log(obj);
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStage/SaveDiseaseStage');
        }
    };
    dataFactory.DeleteDiseaseStage = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStage/DeleteDiseaseStage');
        }
    };
    dataFactory.DiseaseStageInputTypeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStage/InputTypeList');
        }
    };
    dataFactory.DiseaseStageList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStage/DiseaseStageList');
        }
    };

    //Disease ClinicalFeature New
    dataFactory.initControlsDiseaseClinicalFeature = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseClinicalFeature/InitControlsDiseaseClinicalFeature');
        }
    };
    dataFactory.diseaseClinicalFeatureList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseClinicalFeature/DiseaseClinicalFeatureList');
        }
    };
    dataFactory.saveDiseaseClinicalFeature = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseClinicalFeature/SaveDiseaseClinicalFeature');
        }
    };
    dataFactory.deleteDiseaseClinicalFeature = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseClinicalFeature/DeleteDiseaseClinicalFeature');
        }
    };
    dataFactory.DiseaseClinicalFeatureAttributeValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseClinicalFeature/AttributeValueList');
        }
    };
    dataFactory.DiseaseClinicalFeatureGetAttValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseClinicalFeature/AttValueList');
        }
    };

    //Differential Diagnosis New
    dataFactory.AttributeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/AttributeList');
        }
    };
    dataFactory.DiagnosisList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/DiagnosisList');
        }
    };
    dataFactory.SavedifferentialDiagnosisNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/SavedifferentialDiagnosisNew');
        }
    };
    dataFactory.SaveAttribute = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/SaveAttribute');
        }
    };
    dataFactory.SaveInvestigation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/SaveInvestigation');
        }
    };
    dataFactory.ResultPropertyList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/ResultPropertyList');
        }
    };
    dataFactory.ResultPropertyValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/ResultPropertyValueList');
        }
    };
    dataFactory.AttributeValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/AttributeValueList');
        }
    };
    dataFactory.UpdateAttribute = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/UpdateAttribute');
        }
    };
    dataFactory.UpdateProperty = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'differentialDiagnosisNew/UpdateProperty');
        }
    };

    // Study Reference
    dataFactory.InitControlsStudyReference = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'StudyReference/InitControls');
        }
    };
    dataFactory.GetStudyReferenceParameterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'StudyReference/GetParameterList');
        }
    };
    dataFactory.GetAssociatedProblemAndcentralCompound = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'StudyReference/getAssociatedProblemAndcentralCompound');
        }
    };
    dataFactory.GetStudyReferenceList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'StudyReference/GetStudyReferenceList');
        }
    };
    dataFactory.GetStudyReferenceDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'StudyReference/GetStudyReferenceDetailList');
        }
    };
    dataFactory.SaveStudyReference = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'StudyReference/SaveStudyReference');
        }
    };
    dataFactory.DeleteStudyReference = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'StudyReference/DeleteStudyReference');
        }
    };
    dataFactory.getStudyReferenceGraph = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'StudyReference/getStudyReferenceGraph');
        }
    };


    //Environment Location Assign
    dataFactory.environmentLocationAssignInitControl = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'EnvironmentLocationAssign/initControls');
        }
    };
    dataFactory.getState = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'EnvironmentLocationAssign/getState');
        }
    };
    dataFactory.getCity = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'EnvironmentLocationAssign/getCity');
        }
    };
    dataFactory.getCity = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'EnvironmentLocationAssign/getCity');
        }
    };
    dataFactory.saveEnvironmentLocationAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'EnvironmentLocationAssign/saveEnvironmentLocationAssign');
        }
    };
    dataFactory.deleteEnvironmentLocationAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'EnvironmentLocationAssign/deleteEnvironmentLocationAssign');
        }
    };
    dataFactory.editEnvironmentLocationAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'EnvironmentLocationAssign/editEnvironmentLocationAssign');
        }
    };
    dataFactory.environmentLocationAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'EnvironmentLocationAssign/environmentLocationAssign');
        }
    };

    // data Publish
    dataFactory.dataPublishList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DataPublish/DataPublishList');
        }
    };
    dataFactory.SaveIsPublish = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DataPublish/SaveIsPublish');
        }
    };
    dataFactory.getCountListDataPublish = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DataPublish/GetCountListDataPublish');
        }
    };

    //disease Stage Master
    dataFactory.InitControlsDiseaseStageMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStageMaster/InitControlsDiseaseStage');
        }
    };
    dataFactory.SaveDiseaseStageMaster = function (obj) {
        log(obj);
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStageMaster/SaveDiseaseStage');
        }
    };
    dataFactory.DeleteDiseaseStageMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStageMaster/DeleteDiseaseStage');
        }
    };
    dataFactory.DiseaseStageMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStageMaster/DiseaseStageList');
        }
    };
    dataFactory.GetDiseaseStageMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseStageMaster/GETDiseaseStageList');
        }
    };

    //group SubGroup Medicine
    dataFactory.SaveGroupSubGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/SaveGroupSubGroup');
        }
    };
    dataFactory.GroupSubGroupList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/GroupSubGroupList');
        }
    };
    dataFactory.DeleteGroupSubGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroup/DeleteGroupSubGroup');
        }
    };
    dataFactory.diseaseDepartmentNameByOrgan = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/diseaseDepartmentNameByOrgan');
        }
    };

    // Medicine Elimination Add
    dataFactory.InitControlsMedicineElimination = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineElimination/InitControlsMedicineElimination');
        }
    };
    dataFactory.MedicineElimination = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineElimination/MedicineEliminationList');
        }
    };
    dataFactory.MedicineEliminationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineElimination/MedicineEliminationList');
        }
    };
    dataFactory.SaveMedicineElimination = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineElimination/SaveMedicineElimination');
        }
    };
    dataFactory.DeleteMedicineElimination = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineElimination/DeleteMedicineElimination');
        }
    };

    // Medicine Compound
    dataFactory.initControlsMedicineCompound = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineCompound/InitControlsMedicineCompound');
        }
    };
    dataFactory.medicineCompoundDoseList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineCompound/MedicineCompoundDoseList');
        }
    };
    dataFactory.medicineCompoundList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineCompound/MedicineCompoundList');
        }
    };
    dataFactory.medicineCompoundUnitList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineCompound/MedicineCompoundUnitList');
        }
    };
    dataFactory.saveMedicineCompound = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineCompound/SaveMedicineCompound');
        }
    };
    dataFactory.deleteMedicineCompound = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineCompound/DeleteMedicineCompound');
        }
    };

    // Alter Disease Department
    dataFactory.InitControlsDiseaseDepartmentMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentMaster/InitControlsDiseaseDepartmentMaster');
        }
    };
    dataFactory.AlterDiseaseDepartmentList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentMaster/DiseaseDepartmentList');
        }
    };
    dataFactory.SaveAlterDiseaseDepartment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentMaster/SaveDiseaseDepartment');
        }
    };
    dataFactory.DeleteAlterDiseaseDepartment = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentMaster/DeleteDiseaseDepartment');
        }
    };

    // Assign Disease Department    
    dataFactory.GetProblemDepartmentAssignList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentMaster/GetProblemDepartmentAssignList');
        }
    };
    dataFactory.SaveProblemDepartmentAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentMaster/SaveProblemDepartmentAssign');
        }
    };
    dataFactory.DeleteProblemDepartmentAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentMaster/DeleteProblemDepartmentAssign');
        }
    };

    // Merge Pathway Keywords
    dataFactory.InitControlsMergePathwayKeywords = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergePathwayKeywords/InitControlsMergePathwayKeywords');
        }
    };
    dataFactory.MergePathwayKeywords = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergePathwayKeywords/SaveMergePathwayKeywords');
        }
    };

    // Merge Phenomeon
    dataFactory.InitControlsPhenomenon = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergePathwayKeywords/InitControlsPhenomenon');
        }
    };
    dataFactory.SaveMergePhenomenon = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergePathwayKeywords/SaveMergePhenomenon');
        }
    };

    // Merge Pathway
    dataFactory.InitControlsPathway = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergePathwayKeywords/InitControlsPathway');
        }
    };
    dataFactory.SaveMergePathway = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergePathwayKeywords/SaveMergePathway');
        }
    };

    // Medicine Brand Country Assign
    dataFactory.InitControlsMedicineBrandCountryAssign = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicineBrandCountryAssign/InitControlsMedicineBrandCountryAssign');
        }
    };
    dataFactory.GetAssignMedicineBrandList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountryAssign/GetMedicineBrandList');
        }
    };
    dataFactory.SaveMedicineBrandList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountryAssign/SaveMedicineBrandList');
        }
    };
    dataFactory.SaveAssignMedicineBrand = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountryAssign/SaveAssignMedicineBrand');
        }
    };
    dataFactory.DeleteAssignMedicineBrand = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountryAssign/DeleteAssignMedicineBrand');
        }
    };
    dataFactory.MedicineBrandCountryDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountryAssign/MedicineBrandCountryDetailList');
        }
    };
    dataFactory.DiseaseAddiquateValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseDepartmentNew/DiseaseAddiquateValueList');
        }
    };
    dataFactory.updateMedicineBrandList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineBrandCountryAssign/updateMedicineBrandList');
        }
    };

    //Pathway Process Problem
    dataFactory.pathwayProcessProblemInitControl = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'PathwayProcessProblem/initControls');
        }
    };
    dataFactory.savePathwayProcessProblem = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayProcessProblem/savePathwayProcessProblem');
        }
    };
    dataFactory.pathwayProcessProblem = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayProcessProblem/pathwayProcessProblem');
        }
    };
    dataFactory.deletePathwayProcessProblem = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'PathwayProcessProblem/deletePathwayProcessProblem');
        }
    };
    dataFactory.editPathwayProcessProblem = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'PathwayProcessProblem/editPathwayProcessProblem');
        }
    };

    // Pathway Disease Assign
    dataFactory.pathwayDiseaseAssignInitControl = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'PathwayDiseaseAssign/initControls');
        }
    };
    dataFactory.savePathwayDiseaseAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayDiseaseAssign/savePathwayDiseaseAssign');
        }
    };
    dataFactory.pathwayDiseaseAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayDiseaseAssign/pathwayDiseaseAssign');
        }
    };

    // Food Family Master
    dataFactory.foodFamilyMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'FoodFamilyMaster/initControls');
        }
    };
    dataFactory.foodFamilyMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'FoodFamilyMaster/foodFamilyMaster');
        }
    };
    dataFactory.saveFoodFamilyMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'FoodFamilyMaster/saveFoodFamilyMaster');
        }
    };
    dataFactory.editFoodFamilyMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyMaster/editFoodFamilyMaster');
        }
    };
    dataFactory.deleteFoodFamilyMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodFamilyMaster/deleteFoodFamilyMaster');
        }
    };

    // Meal Food Limit
    dataFactory.mealFoodLimitInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MealFoodLimit/initControls');
        }
    };
    dataFactory.mealFoodLimit = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MealFoodLimit/mealFoodLimit');
        }
    };

    dataFactory.saveMealFoodLimit = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MealFoodLimit/saveMealFoodLimit');
        }
    };
    dataFactory.editMealFoodLimit = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MealFoodLimit/editMealFoodLimit');
        }
    };
    dataFactory.deleteMealFoodLimit = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MealFoodLimit/deleteMealFoodLimit');
        }
    };

    // Meal Food Assign
    dataFactory.mealFoodAssignInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MealFoodAssign/initControls');
        }
    };
    dataFactory.mealFoodAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MealFoodAssign/mealFoodAssign');
        }
    };
    dataFactory.saveMealFoodAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MealFoodAssign/saveMealFoodAssign');
        }
    };
    dataFactory.editMealFoodAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MealFoodAssign/editMealFoodAssign');
        }
    };
    dataFactory.deleteMealFoodAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MealFoodAssign/deleteMealFoodAssign');
        }
    };
    dataFactory.getFoodName = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MealFoodAssign/getFoodName');
        }
    };

    // Research  Based  Analysis
    dataFactory.researchBasedAnalysisInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ResearchBasedAnalysis/initControls');
        }
    };
    dataFactory.researchBasedAnalysis = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ResearchBasedAnalysis/researchBasedAnalysis');
        }
    };
    dataFactory.saveResearchBasedAnalysis = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ResearchBasedAnalysis/saveResearchBasedAnalysis');
        }
    };
    dataFactory.editResearchBasedAnalysis = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ResearchBasedAnalysis/editResearchBasedAnalysis');
        }
    };
    dataFactory.deleteResearchBasedAnalysis = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ResearchBasedAnalysis/deleteResearchBasedAnalysis');
        }
    };

    // Problem Cause Miscellaneous
    dataFactory.problemCauseMiscellaneous = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ProblemCauseMiscellaneous/problemCauseMiscellaneous');
        }
    };
    dataFactory.saveProblemCauseMiscellaneous = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ProblemCauseMiscellaneous/saveProblemCauseMiscellaneous');
        }
    };
    dataFactory.editProblemCauseMiscellaneous = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ProblemCauseMiscellaneous/editProblemCauseMiscellaneous');
        }
    };
    dataFactory.deleteProblemCauseMiscellaneous = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ProblemCauseMiscellaneous/deleteProblemCauseMiscellaneous');
        }
    };

    // Differential Diagnosis Report New
    dataFactory.DifferentialDiagnosisReportNew = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DifferentialDiagnosisReportNew/DifferentialDiagnosisReportNew');
        }
    };
    dataFactory.deleteDiagnosisSign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DifferentialDiagnosisReportNew/deleteDiagnosisSign');
        }
    };
    dataFactory.deleteDiagnosisSymptom = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DifferentialDiagnosisReportNew/deleteDiagnosisSymptom');
        }
    };
    dataFactory.deleteDiagnosisInvestigation = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DifferentialDiagnosisReportNew/deleteDiagnosisInvestigation');
        }
    };

    //  AssignPercentage
    dataFactory.percentageSettingOfMarkerInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PercentageSettingOfMarker/initControls');
        }
    };
    dataFactory.percentageSettingOfMarkerGetProcess = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PercentageSettingOfMarker/getProcess');
        }
    };
    dataFactory.percentageSettingOfMarkerGetPhenomena = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PercentageSettingOfMarker/getPhenomena');
        }
    };
    dataFactory.savePercentageSettingOfMarker = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PercentageSettingOfMarker/savePercentageSettingOfMarker');
        }
    };
    dataFactory.getPercentageSettingOfMarker = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PercentageSettingOfMarker/percentageSettingOfMarker');
        }
    };
    dataFactory.deletePercentageSettingOfMarker = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'PercentageSettingOfMarker/deletePercentageSettingOfMarker');
        }
    };

    //medicineRouteAdministration
    dataFactory.medicineRouteAdministrationInitControl = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineRouteAdministration/InitControlsMedicineRouteAdministration');
        }
    };
    dataFactory.MedicineAdministrationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineRouteAdministration/MedicineAdministrationList');
        }
    };
    dataFactory.deleteMedicineRouteAdministration = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineRouteAdministration/deleteMedicineRouteAdministration');
        }
    };
    dataFactory.saveMedicineRouteAdministration = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineRouteAdministration/saveMedicineRouteAdministration');
        }
    };

    // pathwayFAQ
    dataFactory.initControlsPathwayFAQ = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'PathwayFAQ/initControls');
        }
    };
    dataFactory.getPathway = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/GetPathway');
        }
    };
    dataFactory.savePathwayFAQ = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/SavePathwayFAQ');
        }
    };
    dataFactory.deletePathwayFAQ = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/DeletePathwayFAQ');
        }
    };
    dataFactory.getPathwayFAQList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/GetPathwayFAQList');
        }
    };

    // PathwayToDoNotToDo
    dataFactory.savePathwayToDoNotToDo = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/SavePathwayToDoNotToDo');
        }
    };
    dataFactory.deletePathwayToDoNotToDo = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/DeletePathwayToDoNotToDo');
        }
    };
    dataFactory.getPathwayToDoNotToDoList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/GetPathwayToDoNotToDoList');
        }
    };

    // Phenomenon, Rank, Parameter Master 
    dataFactory.savePhenomenon = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/SavePathwayPhenomenon');
        }
    };
    dataFactory.getPhenomenonList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/GetPathwayPhenomenonList');
        }
    };
    dataFactory.saveRank = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/SaveRank');
        }
    };
    dataFactory.getRankList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/GetRankList');
        }
    };
    dataFactory.saveParameter = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/SaveParameter');
        }
    };
    dataFactory.getParameterList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/GetParameterList');
        }
    };
    dataFactory.InitControlsKnowmedEraItemMapping = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/InitKnowmedEraItemMapping');
        }
    };
    dataFactory.GetMappedItemList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/GetMappedItemList');
        }
    };
    dataFactory.SaveKnowmedEraItemMapping = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/SaveKnowmedEraItemMapping');
        }
    };
    dataFactory.DeleteKnowmedEraItemMapping = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'PathwayFAQ/DeleteKnowmedEraItemMapping');
        }
    };

    //  Nutrient Category Master
    dataFactory.nutrientCategoryMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientCategoryMaster/initControls');
        }
    };
    dataFactory.saveNutrientCategoryMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientCategoryMaster/saveNutrientCategoryMaster');
        }
    };
    dataFactory.deleteNutrientCategoryMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientCategoryMaster/deleteNutrientCategoryMaster');
        }
    };

    // Body Region Location
    dataFactory.bodyRegionLocationInitControl = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'BodyRegionLocation/InitControls');
        }
    };
    dataFactory.bodyRegionLocation = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BodyRegionLocation/bodyRegionLocation');
        }
    };
    dataFactory.saveBodyRegionLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'BodyRegionLocation/saveBodyRegionLocation');
        }
    };
    dataFactory.deleteBodyRegionLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'BodyRegionLocation/deleteBodyRegionLocation');
        }
    };

    // Investigation Range Master
    dataFactory.InitControlsInvestigationRangeMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationRangeMaster/InitControlsInvestigationRangeMaster');
        }
    };
    dataFactory.InvestigationRangeList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationRangeMaster/InvestigationRangeList');
        }
    };
    dataFactory.SaveInvestigationRangeMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationRangeMaster/SaveInvestigationRangeMaster');
        }
    };
    dataFactory.DeleteInvestigationRangeMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'InvestigationRangeMaster/DeleteInvestigationRangeMaster');
        }
    };

    //   Icd Code Master
    dataFactory.InitControlsIcdCodeMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'IcdCodeMaster/initControls');
        }
    };
    dataFactory.icdCodeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'IcdCodeMaster/IcdCodeMaster');
        }
    };
    dataFactory.saveIcdCodeMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'IcdCodeMaster/saveIcdCodeMaster');
        }
    };
    dataFactory.deleteIcdCodeMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'IcdCodeMaster/deleteIcdCodeMaster');
        }
    };

    // Food Weight Master
    dataFactory.InitControlsFoodWeightMaster = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'FoodWeightMaster/InitControlsFoodWeightMaster');
        }
    };
    dataFactory.FoodWeightMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodWeightMaster/FoodWeightMasterList');
        }
    };
    dataFactory.getFoodBySearch = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodWeightMaster/GetFoodBySearch');
        }
    };
    dataFactory.SaveFoodWeightMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodWeightMaster/SaveFoodWeightMaster');
        }
    };
    dataFactory.DeleteFoodWeightMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodWeightMaster/DeleteFoodWeightMaster');
        }
    };

    // Clinical Notification
    dataFactory.SaveClinicalNotification = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNotification/SaveClinicalNotification');
        }
    };
    dataFactory.UpdateClinicalNotificationInputOutput = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNotification/UpdateClinicalNotificationInputOutput');
        }
    };
    dataFactory.GetClinicalCategory = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNotification/GetClinicalCategory');
        }
    };
    dataFactory.GetProblemByClinicalCategory = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNotification/GetProblemByClinicalCategory');
        }
    };
    dataFactory.GetClinicalNotification = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNotification/GetClinicalNotification');
        }
    };
    dataFactory.GetClinicalNotificationInputOutput = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNotification/GetClinicalNotificationInputOutput');
        }
    };
    dataFactory.DeleteClinicalNotification = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNotification/DeleteClinicalNotification');
        }
    };
    dataFactory.DeleteClinicalNotificationInput = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNotification/DeleteClinicalNotificationInput');
        }
    };
    dataFactory.DeleteClinicalNotificationOutput = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNotification/DeleteClinicalNotificationOutput');
        }
    };

    // Drug Side Effect New
    dataFactory.InitControlsMedSideEffectNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineNew/InitControlsMedSideEffect');
        }
    };
    dataFactory.DrugSideEffectListNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineNew/DrugSideEffectList');
        }
    };
    dataFactory.GetAttributeListNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineNew/GetAttributeList');
        }
    };
    dataFactory.GetAttributeValueListNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineNew/GetAttributeValueList');
        }
    };
    dataFactory.SaveDrugSideEffectNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineNew/SaveDrugSideEffect');
        }
    };
    dataFactory.DeleteDrugSideEffectNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineNew/DeleteDrugSideEffect');
        }
    };

    // Medicine Indication New
    dataFactory.InitControlsMedicineIndicationNew = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicineIndicationNew/InitControlsMedicineIndication');
        }
    };
    dataFactory.MedicineIndicationListNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineIndicationNew/MedicineIndicationList');
        }
    };
    dataFactory.SaveMedicineIndicationNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineIndicationNew/SaveMedicineIndication');
        }
    };
    dataFactory.DeleteMedicineIndicationNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineIndicationNew/DeleteMedicineIndication');
        }
    };

    // Medicine ContraIndication New
    dataFactory.InitControlsMedicineContraIndicationNew = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicineContraIndicationNew/InitControlsMedicineContraIndication');
        }
    };
    dataFactory.MedicineContraIndicationListNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineContraIndicationNew/MedicineContraIndicationList');
        }
    };
    dataFactory.SaveMedicineContraIndicationNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineContraIndicationNew/SaveMedicineContraIndication');
        }
    };
    dataFactory.DeleteMedicineContraIndicationNew = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineContraIndicationNew/DeleteMedicineContraIndication');
        }
    };

    // Cuase AndEffectReport
    dataFactory.cNutrienttList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CuaseAndEffectReport/cNutrienttList');
        }
    };

    dataFactory.CuaseAndEffectReportList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'CuaseAndEffectReport/CuaseAndEffectReportList');
        }
    };

    //  Language Translation
    dataFactory.languageTranslationInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'LanguageTranslation/initControls');
        }
    };
    dataFactory.getOriginalWordList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'LanguageTranslation/GetOriginalWordList');
        }
    };
    dataFactory.getLanguageTranslationList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'LanguageTranslation/GetLanguageTranslationList');
        }
    };
    dataFactory.saveLanguageTranslation = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'LanguageTranslation/saveLanguageTranslation');
        }
    };
    dataFactory.deleteLanguageTranslation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'LanguageTranslation/deleteLanguageTranslation');
        }
    };

    //  HC Language Translation
    dataFactory.hclanguageTranslationInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'hcLanguageTranslation/initControls');
        }
    };
    dataFactory.gethcOriginalWordList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'hcLanguageTranslation/GetOriginalWordList');
        }
    };
    dataFactory.gethcLanguageTranslationList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'hcLanguageTranslation/GetLanguageTranslationList');
        }
    };
    dataFactory.savehcLanguageTranslation = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'hcLanguageTranslation/saveLanguageTranslation');
        }
    };
    dataFactory.deletehcLanguageTranslation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'hcLanguageTranslation/deleteLanguageTranslation');
        }
    };

    // Medicine Group New
    dataFactory.GetAllClassificationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/GetAllClassificationList');
        }
    };
    dataFactory.getAllGroupWithParentList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/getAllGroupWithParentList');
        }
    };
    dataFactory.SaveMedicineClassification = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/SaveMedicineClassification');
        }
    };
    dataFactory.DeleteMedicineClassification = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/DeleteMedicineClassification');
        }
    };
    dataFactory.SaveMedicineClassificationSystem = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/SaveMedicineClassificationSystem');
        }
    };
    dataFactory.DeleteMedicineClassificationSystem = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/DeleteMedicineClassificationSystem');
        }
    };
    dataFactory.SaveMedicineParentAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/SaveMedicineParentAssign');
        }
    };
    dataFactory.DeleteMedicineParentAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/DeleteMedicineParentAssign');
        }
    };
    dataFactory.SaveMedicineGroupClassificationAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/SaveMedicineGroupClassificationAssign');
        }
    };
    dataFactory.DeleteMedicineGroupClassificationAssign = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupNew/DeleteMedicineGroupClassificationAssign');
        }
    };

    //  Nutriet Food SideEffect 
    dataFactory.NutrietFoodSideEffectInitControls = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrietFoodSideEffect/InitControls');
        }
    };
    dataFactory.GetCompoundList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrietFoodSideEffect/GetCompoundList');
        }
    };
    dataFactory.GetNutrietFoodSideEffectList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrietFoodSideEffect/GetNutrietFoodSideEffectList');
        }
    };
    dataFactory.SaveNutrietFoodSideEffect = function (params) {
        log(params);
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrietFoodSideEffect/SaveNutrietFoodSideEffect');
        }
    };
    dataFactory.DeleteNutrietFoodSideEffect = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrietFoodSideEffect/DeleteNutrietFoodSideEffect');
        }
    };

    // Medicine Group Hierarchy
    dataFactory.InitControlsMedicineGroup = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'MedicineGroupParentHierarchy/InitControlsMedicineGroup');
        }
    };
    dataFactory.getMedicineGroupID = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupParentHierarchy/getMedicineGroupID');
        }
    };
    dataFactory.saveMedicineGroupParentHierarchy = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupParentHierarchy/saveMedicineGroupParentHierarchy');
        }
    };
    dataFactory.deleteMedicineGroupParentHierarchy = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupParentHierarchy/deleteMedicineGroupParentHierarchy');
        }
    };
    dataFactory.deleteMedicineGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupParentHierarchy/deleteMedicineGroup');
        }
    };
    dataFactory.medicineGroupParentHierarchyList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MedicineGroupParentHierarchy/medicineGroupParentHierarchyList');
        }
    };

    // MService Provider Location
    dataFactory.initControls = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'ServiceProviderLocation/initControls');
        }
    };
    dataFactory.serviceProviderLocationList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ServiceProviderLocation/serviceProviderLocation');
        }
    };
    dataFactory.saveServiceProviderLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ServiceProviderLocation/saveServiceProviderLocation');
        }
    };
    dataFactory.editServiceProviderLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ServiceProviderLocation/editServiceProviderLocation');
        }
    };
    dataFactory.deleteServiceProviderLocation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ServiceProviderLocation/deleteServiceProviderLocation');
        }
    };
    dataFactory.bindStateCityByPinCode = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ServiceProviderLocation/bindStateCityByPinCode');
        }
    };

    // Activity Log
    dataFactory.saveActivityLog = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'activityLog/SaveActivityLog');
        }
    };
    dataFactory.diseaseImagesUploadInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DiseaseImagesUpload/initControls');
        }
    };
    dataFactory.diseaseImagesUpload = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DiseaseImagesUpload/diseaseImagesUpload');
        }
    };
    dataFactory.saveDiseaseImagesUpload = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'DiseaseImagesUpload/saveDiseaseImagesUpload');
        }
    };
    dataFactory.editDiseaseImagesUpload = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseImagesUpload/editDiseaseImagesUpload');
        }
    };
    dataFactory.deleteDiseaseImagesUpload = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseImagesUpload/deleteDiseaseImagesUpload');
        }
    };

    // Disease  Findings 
    dataFactory.initControlsDiseaseFindings = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'DiseaseFindings/initControls');
        }
    };
    dataFactory.GetDiseaseFindings = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseFindings/GetDiseaseFindings');
        }
    };
    dataFactory.diseaseSubTestList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseFindings/DiseaseSubTestList');
        }
    };
    dataFactory.saveDiseaseFindings = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseFindings/SaveDiseaseFindings');
        }
    };
    dataFactory.deleteDiseaseFindings = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseFindings/DeleteDiseaseFindings');
        }
    };
    dataFactory.deleteFindings = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'DiseaseFindings/DeleteFindings');
        }
    };

    // Disease  Findings 
    dataFactory.InitControlsProblemNutrientImportance = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'ProblemNutrientImportance/initControls');
        }
    };
    dataFactory.problemNutrientImportance = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemNutrientImportance/problemNutrientImportance');
        }
    };
    dataFactory.saveDiseaseNutrientSequence = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemNutrientImportance/saveDiseaseNutrientSequence');
        }
    };
    dataFactory.deleteDiseaseNutrientSequence = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemNutrientImportance/deleteDiseaseNutrientSequence');
        }
    };
    dataFactory.deleteDiseaseNutrientImportance = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemNutrientImportance/deleteDiseaseNutrientImportance');
        }
    };
    dataFactory.getNutrientSearch = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemNutrientImportance/getNutrientSearch');
        }
    };
    dataFactory.getProblemNutrientImportanceReport = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ProblemNutrientImportance/problemNutrientImportanceReport');
        }
    };

    //  Clinical News
    dataFactory.clinicalNewsInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNews/initControls');
        }
    };
    dataFactory.saveClinicalNews = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalNews/saveClinicalNews');
        }
    };
    dataFactory.editClinicalNews = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ClinicalNews/editClinicalNews');
        }
    };
    dataFactory.deleteClinicalNews = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ClinicalNews/deleteClinicalNews');
        }
    };

    //Clinical Calendar
    dataFactory.saveClinicalCalendar = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalCalendar/saveClinicalCalendar');
        }
    };
    dataFactory.clinicalCalendarInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ClinicalCalendar/initControls');
        }
    };
    dataFactory.editClinicalCalendar = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ClinicalCalendar/editClinicalCalendar');
        }
    };
    dataFactory.deleteClinicalCalendar = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ClinicalCalendar/deleteClinicalCalendar');
        }
    };

    // College Master
    dataFactory.collegeMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CollegeMaster/initControls');
        }
    };
    dataFactory.saveCollegeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CollegeMaster/saveCollegeMaster');
        }
    };
    dataFactory.deleteCollegeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CollegeMaster/deleteCollegeMaster');
        }
    };
    dataFactory.editCollegeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CollegeMaster/editCollegeMaster');
        }
    };

    // Subject Master
    dataFactory.subjectMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SubjectMaster/initControls');
        }
    };
    dataFactory.saveSubjectMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SubjectMaster/saveSubjectMaster');
        }
    };
    dataFactory.deleteSubjectMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SubjectMaster/deleteSubjectMaster');
        }
    };
    dataFactory.editSubjectMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SubjectMaster/editSubjectMaster');
        }
    };

    // Category Master
    dataFactory.categoryMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CategoryMaster/initControls');
        }
    };
    dataFactory.saveCategoryMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CategoryMaster/saveCategoryMaster');
        }
    };
    dataFactory.deleteCategoryMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CategoryMaster/deleteCategoryMaster');
        }
    };
    dataFactory.editCategoryMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CategoryMaster/editCategoryMaster');
        }
    };

    // Topic Master
    dataFactory.topicMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'TopicMaster/initControls');
        }
    };
    dataFactory.saveTopicMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'TopicMaster/saveTopicMaster');
        }
    };
    dataFactory.deleteTopicMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'TopicMaster/deleteTopicMaster');
        }
    };
    dataFactory.editTopicMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'TopicMaster/editTopicMaster');
        }
    };

    // Level Master
    dataFactory.levelMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'LevelMaster/initControls');
        }
    };
    dataFactory.saveLevelMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'LevelMaster/saveLevelMaster');
        }
    };
    dataFactory.deleteLevelMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'LevelMaster/deleteLevelMaster');
        }
    };
    dataFactory.editLevelMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'LevelMaster/editLevelMaster');
        }
    };

    // Question Type Master
    dataFactory.questionTypeMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'QuestionTypeMaster/initControls');
        }
    };
    dataFactory.saveQuestionTypeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'QuestionTypeMaster/saveQuestionTypeMaster');
        }
    };
    dataFactory.deleteQuestionTypeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'QuestionTypeMaster/deleteQuestionTypeMaster');
        }
    };
    dataFactory.editQuestionTypeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'QuestionTypeMaster/editQuestionTypeMaster');
        }
    };

    // ADD Question Master
    dataFactory.addQuestionMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddQuestionMaster/initControls');
        }
    };
    dataFactory.saveQuestionMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddQuestionMaster/saveAddQuestionMaster');
        }
    };

    // Exam Type Master
    dataFactory.examTypeMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ExamTypeMaster/initControls');
        }
    };
    dataFactory.saveExamTypeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ExamTypeMaster/saveExamTypeMaster');
        }
    };
    dataFactory.deleteExamTypeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ExamTypeMaster/deleteExamTypeMaster');
        }
    };
    dataFactory.editExamTypeMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ExamTypeMaster/editExamTypeMaster');
        }
    };

    // Assign Exam Type Question
    dataFactory.assignExamTypeQuestionInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignExamTypeQuestion/initControls');
        }
    };
    dataFactory.saveAssignExamTypeQuestion = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignExamTypeQuestion/saveAssignExamTypeQuestion');
        }
    };
    dataFactory.deleteAssignExamTypeQuestion = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignExamTypeQuestion/deleteAssignExamTypeQuestion');
        }
    };
    dataFactory.editAssignExamTypeQuestion = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignExamTypeQuestion/editAssignExamTypeQuestion');
        }
    };

    //Merge Group
    dataFactory.MergeGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergeGroup/MergeGroup');
        }
    };
    dataFactory.GetMedicineGroup = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergeGroup/GetMedicineGroup');
        }
    };

    // Assign Topic Subject
    dataFactory.assignTopicSubjectInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignTopicSubject/initControls');
        }
    };
    dataFactory.saveAssignTopicSubject = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignTopicSubject/saveAssignTopicSubject');
        }
    };
    dataFactory.deleteAssignTopicSubject = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignTopicSubject/deleteAssignTopicSubject');
        }
    };
    dataFactory.editAssignTopicSubject = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignTopicSubject/editAssignTopicSubject');
        }
    };

    // video Master
    dataFactory.videoMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'VideoMaster/initControls');
        }
    };
    dataFactory.saveVideoMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'VideoMaster/saveVideoMaster');
        }
    };
    dataFactory.deleteVideoMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'VideoMaster/deleteVideoMaster');
        }
    };
    dataFactory.editVideoMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'VideoMaster/editVideoMaster');
        }
    };

    // Assign Video Topic
    dataFactory.assignVideoInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignVideoTopic/initControls');
        }
    };
    dataFactory.saveAssignVideo = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignVideoTopic/saveAssignVideo');
        }
    };
    dataFactory.deleteAssignVideoTopic = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignVideoTopic/deleteAssignVideo');
        }
    };
    dataFactory.editAssignVideo = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AssignVideoTopic/editAssignVideo');
        }
    };

    // Brand Medicine Assign
    dataFactory.BrandAutoComplete = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BrandMedicineAssign/BrandAutoComplete');
        }
    };
    dataFactory.InitControlsBrandMedicineAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BrandMedicineAssign/InitControls');
        }
    };
    dataFactory.CompanyAutoComplete = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BrandMedicineAssign/CompanyAutoComplete');
        }
    };
    dataFactory.SaveBrandMedicineAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BrandMedicineAssign/SaveBrandMedicineAssign');
        }
    };
    dataFactory.GetBrandMedicineAssignList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BrandMedicineAssign/GetBrandMedicineAssignList');
        }
    };
    dataFactory.DeleteBrandMedicineAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BrandMedicineAssign/DeleteBrandMedicineAssign');
        }
    };
    dataFactory.DeleteMedicineAssign = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BrandMedicineAssign/DeleteMedicineAssign');
        }
    };

    //Merge Medicine
    dataFactory.MergeMedicine = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergeMedicine/MergeMedicine');
        }
    };
    dataFactory.GetMergeMedicine = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MergeMedicine/GetMergeMedicine');
        }
    };

    // Agent Factor effect
    dataFactory.agentFactorEffectInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AgentFactorEffect/initControls');
        }
    };
    dataFactory.saveAgentFactorEffect = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AgentFactorEffect/saveAgentFactorEffect');
        }
    };
    dataFactory.deleteAgentFactorEffect = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AgentFactorEffect/deleteAgentFactorEffect');
        }
    };
    dataFactory.editAgentFactorEffect = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AgentFactorEffect/editAgentFactorEffect');
        }
    };

    // Bacteria Relation

    dataFactory.bacteriaRelationInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BacteriaRelation/initControls');
        }
    };
    dataFactory.saveBacteriaRelation = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BacteriaRelation/saveBacteriaRelation');
        }
    };
    dataFactory.deleteBacteriaRelation = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BacteriaRelation/deleteBacteriaRelation');
        }
    };
    dataFactory.editBacteriaRelation = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BacteriaRelation/editBacteriaRelation');
        }
    };
    dataFactory.getBacteriaRelationList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BacteriaRelation/getBacteriaRelationList');
        }
    };

    // user Record Count Report
    dataFactory.userRecordCountDetailList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'UserPerformanceReport/userRecordCountDetailList');
        }
    };

    // Agent Factor Production
    dataFactory.agentFactorProductionInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AgentFactorProduction/initControlss');
        }
    };
    dataFactory.saveAgentFactorProduction = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AgentFactorProduction/saveAgentFactorProduction');
        }
    };
    dataFactory.deleteAgentFactorProduction = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AgentFactorProduction/deleteAgentFactorProduction');
        }
    };
    dataFactory.editAgentFactorProduction = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AgentFactorProduction/editAgentFactorProduction');
        }
    };
    dataFactory.deleteAssignVideo = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'VideoMaster/deleteAssignVideo');
        }
    };
    dataFactory.deleteProblemToxins = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AgentFactorProduction/deleteProblemToxins');
        }
    };

    // Add Toxins Inhibitor
    dataFactory.addToxinsInhibitorInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddToxinsInhibitor/initControls');
        }
    };
    dataFactory.getToxinsInhibitorList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddToxinsInhibitor/getToxinsInhibitorList');
        }
    };
    dataFactory.saveAddToxinsInhibitor = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddToxinsInhibitor/saveAddToxinsInhibitor');
        }
    };
    dataFactory.editAddToxinsInhibitor = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddToxinsInhibitor/editAddToxinsInhibitor');
        }
    };
    dataFactory.deleteInhibitorRank = function (params) {

        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddToxinsInhibitor/deleteInhibitorRank');
        }
    };

    //  Toxin Ranking Report
    dataFactory.toxinRankingReportInitControl = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ToxinRankingReport/initControls');
        }
    };
    dataFactory.ToxinRankingReportList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ToxinRankingReport/ToxinRankingReportList');
        }
    };
    dataFactory.deleteAddQuestionMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddQuestionMaster/deleteAddQuestionMaster');
        }
    };
    dataFactory.deleteBacteriaList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BacteriaRelation/deleteBacteriaList');
        }
    };
    dataFactory.nutrientRankReport = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientInteraction/NutrientRankReport');
        }
    };

    // ECG Wave Cause
    dataFactory.eCGWaveCauseInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ECGWaveCause/initControls');
        }
    };
    dataFactory.saveECGWaveCause = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ECGWaveCause/saveECGWaveCause');
        }
    };
    dataFactory.deleteECGWaveCause = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ECGWaveCause/deleteECGWaveCause');
        }
    };
    dataFactory.editECGWaveCause = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ECGWaveCause/editECGWaveCause');
        }
    };
    dataFactory.deleteECGWaveEffect = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ECGWaveCause/deleteECGWaveEffect');
        }
    };

    // Nutrient Channel Master
    dataFactory.nutrientChannelMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientChannelMaster/initControls');
        }
    };
    dataFactory.saveNutrientChannelMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientChannelMaster/saveNutrientChannelMaster');
        }
    };
    dataFactory.deleteNutrientChannelMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientChannelMaster/deleteNutrientChannelMaster');
        }
    };
    dataFactory.editNutrientChannelMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientChannelMaster/editNutrientChannelMaster');
        }
    };

    //  Symptom Based Investigation
    dataFactory.symptomBasedInvestigationInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SymptomBasedInvestigation/initControls');
        }
    };
    dataFactory.saveSymptomBasedInvestigation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SymptomBasedInvestigation/saveSymptomBasedInvestigation');
        }
    };
    dataFactory.deleteSymptomBasedInvestigation = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'SymptomBasedInvestigation/deleteSymptomBasedInvestigation');
        }
    };
    dataFactory.symptomBasedInvestigation = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SymptomBasedInvestigation/editSymptomBasedInvestigation');
        }
    };

    // Bacteria Report
    dataFactory.bacteriaReportInitControl = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'BacteriaReport/initControls');
        }
    };
    dataFactory.bacteriaReportList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'BacteriaReport/BacteriaReportList');
        }
    };

    //  Menu Action Description Master
    dataFactory.getHeadRelatedMenuList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuDescriptionMaster/GetHeadRelatedMenuList');
        }
    };

    dataFactory.addFormDescription = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuDescriptionMaster/addFormDescription');
        }
    };

    dataFactory.updateFormDescription = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuDescriptionMaster/updateFormDescription');
        }
    };

    dataFactory.getmenuDescription = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuDescriptionMaster/getmenuDescription');
        }
    };
    dataFactory.getAllMenuMasterList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuDescriptionMaster/GetHeadRelatedMenuList');
        }
    };
    dataFactory.getMenuFromParent = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'MenuDescriptionMaster/GetMenuFromParent');
        }
    };

    // Add Food Coocking Method
    dataFactory.addfoodCoockingMethodInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddfoodCoockingMethod/initControls');
        }
    };
    dataFactory.saveAddfoodCoockingMethod = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddfoodCoockingMethod/saveAddfoodCoockingMethod');
        }
    };
    dataFactory.deleteAddfoodCoockingMethod = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddfoodCoockingMethod/deleteAddfoodCoockingMethod');
        }
    };
    dataFactory.editAddfoodCoockingMethod = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'AddfoodCoockingMethod/editAddfoodCoockingMethod');
        }
    };

    // Food Recipe Category
    dataFactory.saveFoodRecipeCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRecipeCategory/saveFoodRecipeCategory');
        }
    };
    dataFactory.deleteFoodRecipeCategory = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRecipeCategory/deleteFoodRecipeCategory');
        }
    };
    dataFactory.foodRecipeAssignList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRecipeCategory/foodRecipeAssignList');
        }
    };
    dataFactory.foodMasterCategoryList = function () {
        if (isValidToken()) {
            jsonParam = JSON.stringify();
            return callHttp(jsonParam, 'FoodRecipeCategory/foodMasterCategoryList');
        }
    };
    dataFactory.foodRecipeCategoryList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'FoodRecipeCategory/foodRecipeCategoryList');
        }
    };
    // Nutrient Inter Conversion
    dataFactory.nutrientInterConversionInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientInterConversion/initControls');
        }
    };
    dataFactory.saveNutrientInterConversion = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientInterConversion/saveNutrientInterConversion');
        }
    };
    dataFactory.deleteNutrientInterConversion = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientInterConversion/deleteNutrientInterConversion');
        }
    };
    dataFactory.editNutrientInterConversion = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientInterConversion/editNutrientInterConversion');
        }
    };

    dataFactory.subjectTopicTimeInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SubjectTopicTime/initControls');
        }
    };
    dataFactory.saveSubjectTopicTime = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SubjectTopicTime/saveSubjectTopicTime');
        }
    };
    dataFactory.deleteSubjectTopicTime = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SubjectTopicTime/deleteSubjectTopicTime');
        }
    };
    dataFactory.editSubjectTopicTime = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SubjectTopicTime/editSubjectTopicTime');
        }
    };

    /// medicine Antidote//



    dataFactory.medicineAntidoteInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MedicineAntidote/initControls');
        }
    };
    dataFactory.saveMedicineAntidote = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MedicineAntidote/saveMedicineAntidote');
        }
    };
    dataFactory.deleteMedicineAntidote = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MedicineAntidote/deleteMedicineAntidote');
        }
    };
    dataFactory.editMedicineAntidote = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MedicineAntidote/editMedicineAntidote');
        }
    };
    //Surgery Contra Indication

    dataFactory.surgeryContraIndicationInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SurgeryContraIndication/initControls');
        }
    };
    dataFactory.saveSurgeryContraIndication = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SurgeryContraIndication/saveSurgeryContraIndication');
        }
    };
    dataFactory.deleteSurgeryContraIndication = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SurgeryContraIndication/deleteSurgeryContraIndication');
        }
    };
    dataFactory.editSurgeryContraIndication = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SurgeryContraIndication/editSurgeryContraIndication');
        }
    };

    //Medicine Electrolytes

    dataFactory.medicineElectrolytesInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MedicineElectrolytes/initControls');
        }
    };
    dataFactory.saveMedicineElectrolytes = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MedicineElectrolytes/saveMedicineElectrolytes');
        }
    };
    dataFactory.deleteMedicineElectrolytes = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MedicineElectrolytes/deleteMedicineElectrolytes');
        }
    };
    dataFactory.editMedicineElectrolytes = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MedicineElectrolytes/editMedicineElectrolytes');
        }
    };

    //Nutrient Metabolite
    dataFactory.nutrientMetaboliteInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientMetabolite/initControls');
        }
    };
    dataFactory.MolecularList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientMetabolite/MolecularList');
        }
    };

    dataFactory.NutrientValueList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'NutrientMetabolite/NutrientValueList');
        }
    };
    dataFactory.saveNutrientMetabolite = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientMetabolite/saveNutrientMetabolite');
        }
    };
    dataFactory.deleteNutrientMetabolite = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientMetabolite/deleteNutrientMetabolite');
        }
    };
    dataFactory.deleteNutrientMetaboliteList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientMetabolite/deleteNutrientMetaboliteList');
        }
    };
    dataFactory.editNutrientMetabolite = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'NutrientMetabolite/editNutrientMetabolite');
        }
    };
    //Molecular Library

    dataFactory.molecularLibraryInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MolecularLibrary/initControls');
        }
    };

    dataFactory.saveMolecularLibrary = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MolecularLibrary/saveMolecularLibrary');
        }
    };

    dataFactory.editMolecularLibrary = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'MolecularLibrary/editMolecularLibrary');
        }
    };

    // Body Organ Master


    dataFactory.bodyOrganMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BodyOrganMaster/initControls');
        }
    };
    dataFactory.saveBodyOrganMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BodyOrganMaster/saveBodyOrganMaster');
        }
    };
    dataFactory.deleteBodyOrganMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BodyOrganMaster/deleteBodyOrganMaster');
        }
    };
    dataFactory.editBodyOrganMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'BodyOrganMaster/editBodyOrganMaster');
        }
    };

    // Site Master---------------------------

    dataFactory.siteMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SiteMaster/initControls');
        }
    };
    dataFactory.saveSiteMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SiteMaster/saveSiteMaster');
        }
    };
    dataFactory.deleteSiteMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SiteMaster/deleteSiteMaster');
        }
    };
    dataFactory.editSiteMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'SiteMaster/editSiteMaster');
        }
    };
    //Problem Wise Diet

    dataFactory.problemWiseDietInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ProblemWiseDiet/initControls');
        }
    };
    dataFactory.saveProblemWiseDiet = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ProblemWiseDiet/saveProblemWiseDiet');
        }
    };
    dataFactory.deleteProblemWiseDiet = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ProblemWiseDiet/deleteProblemWiseDiet');
        }
    };
    dataFactory.editProblemWiseDiet = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'ProblemWiseDiet/editProblemWiseDiet');
        }
    };



    ////// FoodNutrientReports/////////


    dataFactory.foodNutrientReportsInitControls = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'FoodNutrientReports/initControls');
        }
    };
    dataFactory.foodNutrientReportsList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'FoodNutrientReports/foodNutrientReportsList');
        }
    };
    dataFactory.foodNutrientsList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'FoodNutrientReports/FoodNutrientsList');
        }
    };
    dataFactory.saveFoodNutrientList = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'FoodNutrientReports/saveFoodNutrientList');
        }
    };
    //////////// nutrient Master /////////////
    dataFactory.getFoodValues = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'Master/getFoodValues');
        }
    };

    /////////////// Impression Master ///////////
    dataFactory.InitControlImpression = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ImpressionMaster/InitControlImpression');
        }
    };
    dataFactory.saveImpressionMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ImpressionMaster/saveImpressionMaster');
        }
    };
    dataFactory.getImpressionMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ImpressionMaster/getImpressionMaster');
        }
    };
    dataFactory.updateImpressionMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ImpressionMaster/updateImpressionMaster');
        }
    };
    dataFactory.deleteImpressiontMaster = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ImpressionMaster/deleteImpressiontMaster');
        }
    };
    dataFactory.deleteImpressiontImages = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ImpressionMaster/deleteImpressiontImages');
        }
    };

    dataFactory.getDiseaseSearchList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'StudyReference/getDiseaseSearchList');
        }
    };


    // Calculator Control Master

    dataFactory.calculatorControlMasterInitControl = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CalculatorControlMaster/initControls');
        }
    };
    dataFactory.saveCalculatorControlMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CalculatorControlMaster/saveCalculatorControlMaster');
        }
    };
    dataFactory.deleteCalculatorControlMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CalculatorControlMaster/deleteCalculatorControlMaster');
        }
    };
    dataFactory.editCalculatorControlMaster = function (params) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(params);
            return callHttp(jsonParam, 'CalculatorControlMaster/editCalculatorControlMaster');
        }
    };

    dataFactory.DiseaseSearchReportList = function (obj) {
        if (isValidToken()) {
            jsonParam = JSON.stringify(obj);
            return callHttp(jsonParam, 'ToxinRankingReport/DiseaseSearchReportList');
        }
    };
    dataFactory.getIPAddress = function (obj) {
        jsonParam = JSON.stringify(obj);
        try {
            return $http({
                method: "POST",
                url: BASE_URL + '/Login/GetIPAddress',
                data: jsonParam,
                headers: { "Content-Type": "application/json" },
            });
        }
        catch (err) {
            console.log(err.name + ': "' + err.message + '" occurred when assigning x.');
        }
    };


    return dataFactory;
}]);