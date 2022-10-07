var app = angular.module('app', ['ui.router', 'toaster', 'ui.bootstrap', 'knowmedServices', 'ngTagsInput', 'angular-select2', 'ngFileUpload', 'dndLists', 'summernote']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    'ASSETS',
    function ($stateProvider, $urlRouterProvider, ASSETS) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: '/views/dashboard.html',
                controller: 'dashboardCtrl'
            })
            .state('diseaseMaster', {
                url: '/diseaseMaster',
                templateUrl: '/views/diseaseMaster.html',
                controller: 'masterCtrl'
            })
            .state('rda', {
                url: '/rda',
                templateUrl: '/views/rda.html',
                controller: 'rdaCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'loginCtrl'
            })
            .state('nutrient', {
                url: '/nutrient',
                templateUrl: '/views/nutrientMaster.html',
                controller: 'nutrientCtrl'
            })
            .state('diseaseInvestigation', {
                url: '/diseaseInvestigation?id',
                templateUrl: '/views/diseaseInvestigation.html',
                controller: 'diseaseCtrl'
            })
            .state('foodNutrient', {
                url: '/foodNutrient',
                templateUrl: '/views/foodNutrient.html',
                controller: 'foodNutrientCtrl'
            })
            .state('differentialDiagnosis', {
                url: '/differentialDiagnosis',
                templateUrl: '/views/differentialDiagnosis.html',
                controller: 'differentialDiagnosisCtrl'
            })
            .state('drugSideEffect', {
                url: '/drugSideEffect',
                templateUrl: '/views/drugSideEffect.html',
                controller: 'drugSideEffectCtrl'
            })
            .state('medInteraction', {
                url: '/medInteraction',
                templateUrl: '/views/medicineInteraction.html',
                controller: 'medInteractionCtrl'
            })
            .state('medTroughValue', {
                url: '/medTroughValue',
                templateUrl: '/views/MedicineTroughValue.html',
                controller: 'medTroughValueCtrl'
            })
            .state('medTHalf', {
                url: '/medTHalf',
                templateUrl: '/views/MedicineTHalf.html',
                controller: 'medTHalfCtrl'
            })
            .state('medPeakValue', {
                url: '/medPeakValue',
                templateUrl: '/views/MedicinePeakValue.html',
                controller: 'medPeakValueCtrl'
            })
            .state('signSymptomMaster', {
                url: '/signSymptomMaster',
                templateUrl: '/views/SignSymptomMaster.html',
                controller: 'signSymptomMasterCtrl'
            })
            .state('problemMaster', {
                url: '/problemMaster',
                templateUrl: '/views/ProblemMaster.html',
                controller: 'problemMasterCtrl'
            })
            .state('foodMaster', {
                url: '/foodMaster?foodID',
                templateUrl: '/views/foodMaster.html',
                controller: 'foodCtrl'
            })
            .state('medicineMaster', {
                url: '/medicineMaster',
                templateUrl: '/views/medicineMaster.html',
                controller: 'medicineCtrl'
            })
            .state('testMaster', {
                url: '/testMaster',
                templateUrl: '/views/TestMaster.html',
                controller: 'testMasterCtrl'
            })
            .state('subTestMaster', {
                url: '/subTestMaster',
                templateUrl: '/views/SubTestMaster.html',
                controller: 'subTestMasterCtrl'
            })
            .state('assignSubTest', {
                url: '/assignSubTest',
                templateUrl: '/views/AssignSubTest.html',
                controller: 'assignSubTestCtrl'
            })
            .state('assignSubTestMethod', {
                url: '/assignSubTestMethod',
                templateUrl: '/views/AssignSubTestMethod.html',
                controller: 'assignSubTestMethodCtrl'
            })
            .state('assignSubTestResultType', {
                url: '/assignSubTestResultType',
                templateUrl: '/views/AssignSubTestResultType.html',
                controller: 'assignSubTestResultTypeCtrl'
            })
            .state('subTestSampleType', {
                url: '/subTestSampleType',
                templateUrl: '/views/SubTestSampleType.html',
                controller: 'subTestSampleTypeCtrl'
            })
            .state('synonymMaster', {
                url: '/synonymMaster',
                templateUrl: '/views/SynonymMaster.html',
                controller: 'synonymMasterCtrl'
            })
            .state('problemLanguage', {
                url: '/problemLanguage',
                templateUrl: '/views/problemPatientLanguage.html',
                controller: 'problemLanguageCtrl'
            })
            .state('medicineReport', {
                url: '/medicineReport',
                templateUrl: '/views/MedicineReport.html',
                controller: 'medicineReportCtrl'
            })
            .state('problemAttributeAssign', {
                url: '/problemAttributeAssign',
                templateUrl: '/views/ProblemAttributeAssign.html',
                controller: 'problemAttributeAssignCtrl'
            })
            .state('problemAttributeValue', {
                url: '/problemAttributeValue',
                templateUrl: '/views/ProblemAttributeValue.html',
                controller: 'problemAttributeValueCtrl'
            })
            .state('problemInvestigationRelation', {
                url: '/problemInvestigationRelation',
                templateUrl: '/views/ProblemInvestigationRelation.html',
                controller: 'problemInvestigationRelationCtrl'
            })
            .state('problemVitalRelation', {
                url: '/problemVitalRelation',
                templateUrl: '/views/ProblemVitalRelation.html',
                controller: 'problemVitalRelationCtrl'
            })
            .state('agentFactorMaster', {
                url: '/agentFactorMaster',
                templateUrl: '/views/AgentFactorMaster.html',
                controller: 'agentFactorMasterCtrl'
            })
            .state('environmentFactorMaster', {
                url: '/environmentFactorMaster',
                templateUrl: '/views/EnvironmentFactorMaster.html',
                controller: 'environmentFactorMasterCtrl'
            })
            .state('transmissionRouteMaster', {
                url: '/transmissionRouteMaster',
                templateUrl: '/views/TransmissionRouteMaster.html',
                controller: 'transmissionRouteMasterCtrl'
            })
            .state('diseaseAgentFactor', {
                url: '/diseaseAgentFactor',
                templateUrl: '/views/DiseaseAgentFactor.html',
                controller: 'diseaseAgentFactorCtrl'
            })
            .state('diseaseEnvironmentFactor', {
                url: '/diseaseEnvironmentFactor',
                templateUrl: '/views/DiseaseEnvironmentFactor.html',
                controller: 'diseaseEnvironmentFactorCtrl'
            }).state('diseaseTransmissionRoute', {
                url: '/diseaseTransmissionRoute',
                templateUrl: '/views/DiseaseTransmissionRoute.html',
                controller: 'diseaseTransmissionRouteCtrl'
            })
            .state('diseaseGeoLocation', {
                url: '/diseaseGeoLocation',
                templateUrl: '/views/DiseaseGeoLocation.html',
                controller: 'diseaseGeoLocationCtrl'
            })
            .state('diseasePrevention', {
                url: '/diseasePrevention',
                templateUrl: '/views/DiseasePrevention.html',
                controller: 'diseasePreventionCtrl'
            })

            .state('calculatorMaster', {
                url: '/calculatorMaster',
                templateUrl: '/views/CalculatorMaster.html',
                controller: 'calculatorCtrl'
            })
            .state('calculatorFormula', {
                url: '/calculatorFormula',
                templateUrl: '/views/CalculatorFormula.html',
                controller: 'CalculatorFormulaCtrl'
            })
            //.state('calculatorControlMaster', {
            //    url: '/calculatorControlMaster',
            //    templateUrl: '/views/CalculatorControlMaster.html',
            //    controller: 'CalculatorFormulaControlCtrl'
            //})
            .state('diseaseInput', {
                url: '/diseaseInput',
                templateUrl: '/views/DiseaseInput.html',
                controller: 'diseaseInputCtrl'
            })
            .state('differentialDiagnosisReport', {
                url: '/differentialDiagnosisReport',
                templateUrl: '/views/differentialDiagnosisReport.html',
                controller: 'differentialDiagnosisReportCtrl'
            })
            .state('diseaseCommunicabilityDetails', {
                url: '/diseaseCommunicabilityDetails',
                templateUrl: '/views/DiseaseCommunicabilityDetails.html',
                controller: 'diseaseCommunicabilityDetailsCtrl'
            })
            .state('mergeProblem', {
                url: '/mergeProblem',
                templateUrl: '/views/MergeProblem.html',
                controller: 'mergeProblemCtrl'
            })
            .state('diseaseSignalingCascade', {
                url: '/diseaseSignalingCascade',
                templateUrl: '/views/DiseaseSignalingCascade.html',
                controller: 'diseaseSignalingCascadeCtrl'
            }).state('userLoginMaster', {
                url: '/userLoginMaster',
                templateUrl: '/views/UserLoginMaster.html',
                controller: 'userLoginMasterCtrl'
            })
            .state('menuMaster', {
                url: '/menuMaster',
                templateUrl: '/views/MenuMaster.html',
                controller: 'menuMasterCtrl'
            })
            .state('assignMenuMaster', {
                url: '/assignMenuMaster',
                templateUrl: '/views/AssignMenuMaster.html',
                controller: 'assignMenuMasterCtrl'
            })
            .state('recordCountReport', {
                url: '/recordCountReport',
                templateUrl: '/views/RecordCountReport.html',
                controller: 'recordCountCtrl'
            }).state('assignMedicineToDisease', {
                url: '/assignMedicineToDisease',
                templateUrl: '/views/AssignMedicineToDisease.html',
                controller: 'assignMedicineToDiseaseCtrl'
            })
            .state('diseaseTreatment', {
                url: '/diseaseTreatment',
                templateUrl: '/views/DiseaseTreatment.html',
                controller: 'diseaseTreatmentCtrl'
            })
            .state('diseaseSurgery', {
                url: '/diseaseSurgery',
                templateUrl: '/views/DiseaseSurgery.html',
                controller: 'diseaseSurgeryCtrl'
            }).state('assignCalculatorToDepartment', {
                url: '/assignCalculatorToDepartment',
                templateUrl: '/views/AssignCalculatorToDepartment.html',
                controller: 'assignCalculatorToDepartmentCtrl'
            })
            .state('assignCalculatorToDisease', {
                url: '/assignCalculatorToDisease',
                templateUrl: '/views/AssignCalculatorToDisease.html',
                controller: 'assignCalculatorToDiseaseCtrl'
            }).state('nutrientInteraction', {
                url: '/nutrientInteraction?id',
                templateUrl: '/views/NutrientInteraction.html',
                controller: 'nutrientInteractionCtrl'
            })
            .state('foodIntakeLimit', {
                url: '/foodIntakeLimit',
                templateUrl: '/views/FoodIntakeLimit.html',
                controller: 'foodIntakeLimitCtrl'
            })
            .state('cookingTemperature', {
                url: '/cookingTemperature',
                templateUrl: '/views/CookingTemperature.html',
                controller: 'cookingTemperatureCtrl'
            })
            .state('cookingTemperatureEffect', {
                url: '/cookingTemperatureEffect',
                templateUrl: '/views/CookingTemperatureEffect.html',
                controller: 'cookingTemperatureEffectCtrl'
            })
            .state('nutrientClinicalFeature', {
                url: '/nutrientClinicalFeature',
                templateUrl: '/views/NutrientClinicalFeature.html',
                controller: 'nutrientClinicalFeatureCtrl'
            })
            .state('problemNutrientRole', {
                url: '/problemNutrientRole',
                templateUrl: '/views/ProblemNutrientRole.html',
                controller: 'problemNutrientRoleCtrl'
            })
            .state('foodRegionAssign', {
                url: '/foodRegionAssign',
                templateUrl: '/views/FoodRegionAssign.html',
                controller: 'foodRegionAssignCtrl'
            })
            .state('medicineStrength', {
                url: '/medicineStrength',
                templateUrl: '/views/MedicineStrength.html',
                controller: 'medicineStrengthCtrl'
            })
            .state('medicineMechanismAction', {
                url: '/medicineMechanismAction',
                templateUrl: '/views/MedicineMechanismAction.html',
                controller: 'medicineMechanismActionCtrl'
            })
            .state('medicineMechanismInteraction', {
                url: '/medicineMechanismInteraction',
                templateUrl: '/views/MedicineMechanismInteraction.html',
                controller: 'medicineMechanismInteractionCtrl'
            })
            .state('foodSearchList', {
                url: '/foodSearchList',
                templateUrl: '/views/FoodSearchList.html',
                controller: 'foodSearchListCtrl'
            })
            .state('foodFamilyAssign', {
                url: '/foodFamilyAssign',
                templateUrl: '/views/FoodFamilyAssign.html',
                controller: 'foodFamilyAssignCtrl'
            })
            .state('nutrientTHalf', {
                url: '/nutrientTHalf',
                templateUrl: '/views/NutrientTHalf.html',
                controller: 'nutrientTHalfCtrl'
            })
            .state('nutrientPeakValue', {
                url: '/nutrientPeakValue',
                templateUrl: '/views/NutrientPeakValue.html',
                controller: 'nutrientPeakValueCtrl'
            })
            .state('medicineAction', {
                url: '/medicineAction',
                templateUrl: '/views/MedicineAction.html',
                controller: 'medicineActionCtrl'
            })
            .state('changePassword', {
                url: '/changePassword',
                templateUrl: '/views/ChangePassword.html',
                controller: 'changePasswordCtrl'
            })
            .state('medicineIndication', {
                url: '/medicineIndication',
                templateUrl: '/views/MedicineIndication.html',
                controller: 'medicineIndicationCtrl'
            })
            .state('nutrientMedicineActionPathway', {
                url: '/nutrientMedicineActionPathway',
                templateUrl: '/views/NutrientMedicineActionPathway.html',
                controller: 'nutrientMedicineActionPathwayCtrl'
            })
            .state('nutrientMedicineInteraction', {
                url: '/nutrientMedicineInteraction',
                templateUrl: '/views/NutrientMedicineInteraction.html',
                controller: 'nutrientMedicineInteractionCtrl'
            })
            .state('historyInputDepartmentAssign', {
                url: '/historyInputDepartmentAssign',
                templateUrl: '/views/HistoryInputDepartmentAssign.html',
                controller: 'historyInputDepartmentAssignCtrl'
            })
            .state('department', {
                url: '/department',
                templateUrl: '/views/Department.html',
                controller: 'departmentCtrl'
            })
            .state('medicineContraIndication', {
                url: '/medicineContraIndication',
                templateUrl: '/views/MedicineContraIndication.html',
                controller: 'medicineContraIndicationCtrl'
            })
            .state('medicineSupplement', {
                url: '/medicineSupplement',
                templateUrl: '/views/MedicineSupplement.html',
                controller: 'medicineSupplementCtrl'
            })
            .state('nutrientComponentAssign', {
                url: '/nutrientComponentAssign',
                templateUrl: '/views/NutrientComponentAssign.html',
                controller: 'nutrientComponentAssignCtrl'
            })
            .state('medicinePathwayActivator', {
                url: '/medicinePathwayActivator',
                templateUrl: '/views/MedicinePathwayActivator.html',
                controller: 'medicinePathwayActivatorCtrl'
            })
            .state('diseaseCommunicabilityDetail', {
                url: '/diseaseCommunicabilityDetail',
                templateUrl: '/views/DiseaseCommunicabilityDetail.html',
                controller: 'diseaseCommunicabilityDetailCtrl'
            })
            .state('foodWeight', {
                url: '/foodWeight',
                templateUrl: '/views/FoodWeight.html',
                controller: 'foodWeightCtrl'
            })
            .state('medicineDose', {
                url: '/medicineDose',
                templateUrl: '/views/MedicineDose.html',
                controller: 'medicineDoseCtrl'
            })
            .state('mergeFood', {
                url: '/mergeFood',
                templateUrl: '/views/MergeFood.html',
                controller: 'mergeFoodCtrl'
            })
            .state('mergeNutrient', {
                url: '/mergeNutrient',
                templateUrl: '/views/MergeNutrient.html',
                controller: 'mergeNutrientCtrl'
            })
            .state('medicineBrand', {
                url: '/medicineBrand',
                templateUrl: '/views/MedicineBrand.html',
                controller: 'medicineBrandCtrl'
            })
            .state('medicineBrandCountry', {
                url: '/medicineBrandCountry',
                templateUrl: '/views/MedicineBrandCountry.html',
                controller: 'medicineBrandCountryCtrl'
            })
            .state('unitFamilyAssign', {
                url: '/unitFamilyAssign',
                templateUrl: '/views/UnitFamilyAssign.html',
                controller: 'unitFamilyAssignCtrl'
            })
            .state('nutrientBarrier', {
                url: '/nutrientBarrier',
                templateUrl: '/views/NutrientBarrier.html',
                controller: 'nutrientBarrierCtrl'
            })
            .state('diseaseDepartment', {
                url: '/diseaseDepartment',
                templateUrl: '/views/DiseaseDepartment.html',
                controller: 'diseaseDepartmentCtrl'
            })
            .state('unitConversion', {
                url: '/unitConversion',
                templateUrl: '/views/UnitConversion.html',
                controller: 'unitConversionCtrl'
            })
            .state('foodReport', {
                url: '/foodReport',
                templateUrl: '/views/FoodReport.html',
                controller: 'foodReportCtrl'
            })
            .state('nutrientReport', {
                url: '/nutrientReport',
                templateUrl: '/views/NutrientReport.html',
                controller: 'nutrientReportCtrl'
            })
            .state('receptorColor', {
                url: '/receptorColor',
                templateUrl: '/views/ReceptorColor.html',
                controller: 'receptorColorCtrl'
            })
            .state('medicineGroup', {
                url: '/medicineGroup',
                templateUrl: '/views/MedicineGroup.html',
                controller: 'medicineGroupCtrl'
            })
            .state('medicineGroupAssign', {
                url: '/medicineGroupAssign',
                templateUrl: '/views/MedicineGroupAssign.html',
                controller: 'medicineGroupAssignCtrl'
            })
            .state('foodType', {
                url: '/foodType',
                templateUrl: '/views/FoodType.html',
                controller: 'foodTypeCtrl'
            })
            .state('calculatorScore', {
                url: '/calculatorScore',
                templateUrl: '/views/CalculatorScore.html',
                controller: 'calculatorScoreCtrl'
            })
            .state('calculatorResult', {
                url: '/calculatorResult',
                templateUrl: '/views/CalculatorResult.html',
                controller: 'calculatorResultCtrl'
            })
            .state('nutrientMetabolic', {
                url: '/nutrientMetabolic',
                templateUrl: '/views/NutrientMetabolic.html',
                controller: 'nutrientCtrl'
            })
            .state('diseaseReport', {
                url: '/diseaseReport',
                templateUrl: '/views/DiseaseReport.html',
                controller: 'diseaseReportCtrl'
            })
            .state('medicineStatus', {
                url: '/medicineStatus',
                templateUrl: '/views/MedicineStatus.html',
                controller: 'medicineStatusCtrl'
            })
            .state('nutrientStatus', {
                url: '/nutrientStatus',
                templateUrl: '/views/NutrientStatus.html',
                controller: 'nutrientStatusCtrl'
            })
            .state('nutrientLevelGeoLocation', {
                url: '/nutrientLevelGeoLocation',
                templateUrl: '/views/NutrientLevelGeoLocation.html',
                controller: 'nutrientLevelGeoLocationCtrl'
            })
            .state('manageRank', {
                url: '/manageRank',
                templateUrl: '/views/ManageRank.html',
                controller: 'manageRankCtrl'
            })
            .state('problemICD', {
                url: '/problemICD',
                templateUrl: '/views/ProblemICD.html',
                controller: 'problemICDCtrl'
            })
            .state('drugCrawler', {
                url: '/drugCrawler',
                templateUrl: '/views/DrugCrawler.html',
                controller: 'drugCrawlerCtrl'
            })
            .state('calculatorPrameterMaster', {
                url: '/calculatorPrameterMaster',
                templateUrl: '/views/CalculatorParameterMaster.html',
                controller: 'calculatorPrameterMasterCtrl'
            })
            .state('henRda', {
                url: '/henRda',
                templateUrl: '/views/henRda.html',
                controller: 'henRdaCtrl'
            })
            .state('medicineTherapeuticLevel', {
                url: '/medicineTherapeuticLevel',
                templateUrl: '/views/MedicineTherapeuticLevel.html',
                controller: 'medicineTherapeuticLevelCtrl'
            })
            .state('diseaseComplications', {
                url: '/diseaseComplications',
                templateUrl: '/views/DiseaseComplications.html',
                controller: 'diseaseComplicationsCtrl'
            })
            .state('problemCauseType', {
                url: '/problemCauseType',
                templateUrl: '/views/ProblemCauseType.html',
                controller: 'problemCauseTypeCtrl'
            }).state('problemCauseTypeAssign', {
                url: '/problemCauseTypeAssign',
                templateUrl: '/views/ProblemCauseTypeAssign.html',
                controller: 'problemCauseTypeAssignCtrl'
            }).state('nutrientDoseLimit', {
                url: '/nutrientDoseLimit',
                templateUrl: '/views/NutrientDoseLimit.html',
                controller: 'nutrientDoseLimitCtrl'
            })
            .state('diseaseCrawler', {
                url: '/diseaseCrawler',
                templateUrl: '/views/DiseaseCrawler.html',
                controller: 'diseaseCrawlerCtrl'
            }).state('diseaseSpeciality', {
                url: '/diseaseSpeciality',
                templateUrl: '/views/DiseaseSpeciality.html',
                controller: 'diseaseSpecialityCtrl'
            }).state('diseaseSpecialityAssign', {
                url: '/diseaseSpecialityAssign',
                templateUrl: '/views/DiseaseSpecialityAssign.html',
                controller: 'diseaseSpecialityAssignCtrl'
            }).state('investigationResultProperty', {
                url: '/investigationResultProperty',
                templateUrl: '/views/InvestigationResultProperty.html',
                controller: 'investigationResultPropertyCtrl'
            }).state('foodFamilyAverage', {
                url: '/foodFamilyAverage',
                templateUrl: '/views/FoodFamilyAverage.html',
                controller: 'foodFamilyAverageCtrl'
            }).state('dietSubCategory', {
                url: '/dietSubCategory',
                templateUrl: '/views/DietSubCategory.html',
                controller: 'dietSubCategoryCtrl'
            }).state('assignSubCategoryToCategory', {
                url: '/assignSubCategoryToCategory',
                templateUrl: '/views/AssignSubCategoryToCategory.html',
                controller: 'assignSubCategoryToCategoryCtrl'
            }).state('problemDietCategory', {
                url: '/problemDietCategory',
                templateUrl: '/views/ProblemDietCategory.html',
                controller: 'problemDietCategoryCtrl'
            }).state('studyReference', {
                url: '/studyReference',
                templateUrl: '/views/StudyReference.html',
                controller: 'studyReferenceCtrl'
            }).state('diseaseDepartmentNew', {
                url: '/diseaseDepartmentNew',
                templateUrl: '/views/DiseaseDepartmentNews.html',
                controller: 'diseaseDepartmentNewCtrl'
            }).state('diseaseStage', {
                url: '/diseaseStage',
                templateUrl: '/views/DiseaseStage.html',
                controller: 'diseaseStageCtrl'
            }).state('diseaseClinicalFeature', {
                url: '/diseaseClinicalFeature',
                templateUrl: '/views/DiseaseClinicalFeature.html',
                controller: 'diseaseClinicalFeatureCtrl'
            }).state('differentialDiagnosisNew', {
                url: '/differentialDiagnosisNew',
                templateUrl: '/views/DifferentialDiagnosisNew.html',
                controller: 'differentialDiagnosisNewCtrl'
            }).state('environmentLocationAssign', {
                url: '/environmentLocationAssign',
                templateUrl: '/views/environmentLocationAssign.html',
                controller: 'environmentLocationAssignCtrl'
            }).state('dataPublish', {
                url: '/dataPublish',
                templateUrl: '/views/dataPublish.html',
                controller: 'dataPublishCtrl'
            }).state('diseaseStageMaster', {
                url: '/diseaseStageMaster',
                templateUrl: '/views/diseaseStageMaster.html',
                controller: 'diseaseStageMasterCtrl'
            }).state('medicineElimination', {
                url: '/medicineElimination',
                templateUrl: '/views/medicineElimination.html',
                controller: 'medicineEliminationCtrl'
            }).state('medicineCompound', {
                url: '/medicineCompound',
                templateUrl: '/views/medicineCompound.html',
                controller: 'medicineCompoundCtrl'
            })
            .state('alterDiseaseDepartment', {
                url: '/alterDiseaseDepartment',
                templateUrl: '/views/DiseaseDepartmentMaster.html',
                controller: 'alterDiseaseDepartmentCtrl'
            })
            .state('mergePathwayKeywords', {
                url: '/mergePathwayKeywords',
                templateUrl: '/views/MergePathwayKeywords.html',
                controller: 'mergePathwayKeywordsCtrl'
            })
            .state('medicineBrandCountryAssign', {
                url: '/medicineBrandCountryAssign',
                templateUrl: '/views/MedicineBrandCountryAssign.html',
                controller: 'medicineBrandCountryAssignCtrl'
            })
            .state('pathwayProcessProblem', {
                url: '/pathwayProcessProblem',
                templateUrl: '/views/pathwayProcessProblem.html',
                controller: 'pathwayProcessProblemCtrl'
            })
            .state('pathwayDiseaseAssign', {
                url: '/pathwayDiseaseAssign',
                templateUrl: '/views/pathwayDiseaseAssign.html',
                controller: 'pathwayDiseaseAssignCtrl'
            })
            .state('foodFamilyMaster', {
                url: '/foodFamilyMaster',
                templateUrl: '/views/foodFamilyMaster.html',
                controller: 'foodFamilyMasterCtrl'
            })
            .state('mealFoodLimit', {
                url: '/mealFoodLimit',
                templateUrl: '/views/mealFoodLimit.html',
                controller: 'mealFoodLimitCtrl'
            })
            .state('mealFoodAssign', {
                url: '/mealFoodAssign',
                templateUrl: '/views/mealFoodAssign.html',
                controller: 'mealFoodAssignCtrl'
            })
            .state('researchBasedAnalysis', {
                url: '/researchBasedAnalysis',
                templateUrl: '/views/researchBasedAnalysis.html',
                controller: 'researchBasedAnalysisCtrl'

            }).state('problemCauseMiscellaneous', {
                url: '/problemCauseMiscellaneous',
                templateUrl: '/views/ProblemCauseMiscellaneous.html',
                controller: 'problemCauseMiscellaneousCtrl'
            })
            .state('differentialDiagnosisReportNew', {
                url: '/differentialDiagnosisReportNew',
                templateUrl: '/views/DifferentialDiagnosisReportNew.html',
                controller: 'differentialDiagnosisReportNewCtrl'
            })
            .state('percentageSettingOfMarker', {
                url: '/percentageSettingOfMarker',
                templateUrl: '/views/PercentageSettingOfMarker.html',
                controller: 'percentageSettingOfMarkerCtrl'
            })
            .state('nutrientCategoryMaster', {
                url: '/nutrientCategoryMaster',
                templateUrl: '/views/NutrientCategoryMaster.html',
                controller: 'nutrientCategoryMasterCtrl'
            })
            .state('medicineRouteAdministration', {
                url: '/medicineRouteAdministration',
                templateUrl: '/views/MedicineRouteAdministration.html',
                controller: 'medicineRouteAdministrationCtrl'
            })
            .state('pathwayFAQ', {
                url: '/pathwayFAQ',
                templateUrl: '/views/PathwayFAQ.html',
                controller: 'pathwayFAQCtrl'
            })
            .state('pathwayToDoNotToDo', {
                url: '/pathwayToDoNotToDo',
                templateUrl: '/views/PathwayToDoNotToDo.html',
                controller: 'pathwayToDoNotToDoCtrl'
            })
            .state('phenomenonMaster', {
                url: '/phenomenonMaster',
                templateUrl: '/views/PhenomenonMaster.html',
                controller: 'phenomenonMasterCtrl'
            })
            .state('bodyRegionLocation', {
                url: '/bodyRegionLocation',
                templateUrl: '/views/BodyRegionLocation.html',
                controller: 'bodyRegionLocationCtrl'
            })
            .state('investigationRangeMaster', {
                url: '/investigationRangeMaster',
                templateUrl: '/views/InvestigationRangeMaster.html',
                controller: 'investigationRangeMasterCtrl'
            })
            .state('icdCodeMaster', {
                url: '/icdCodeMaster',
                templateUrl: '/views/IcdCodeMaster.html',
                controller: 'icdCodeMasterCtrl'
            })
            .state('foodWeightMaster', {
                url: '/foodWeightMaster',
                templateUrl: '/views/FoodWeightMaster.html',
                controller: 'foodWeightMasterCtrl'
            })
            .state('clinicalNotification', {
                url: '/clinicalNotification',
                templateUrl: '/views/clinicalNotification.html',
                controller: 'clinicalNotificationCtrl'
            })
            .state('drugSideEffectNew', {
                url: '/drugSideEffectNew',
                templateUrl: '/views/drugSideEffectNew.html',
                controller: 'drugSideEffectNewCtrl'
            })
            .state('medicineIndicationNew', {
                url: '/medicineIndicationNew',
                templateUrl: '/views/MedicineIndicationNew.html',
                controller: 'medicineIndicationNewCtrl'
            })
            .state('medicineContraIndicationNew', {
                url: '/medicineContraIndicationNew',
                templateUrl: '/views/MedicineContraIndicationNew.html',
                controller: 'medicineContraIndicationNewCtrl'
            })
            .state('cuaseAndEffectReport', {
                url: '/cuaseAndEffectReport',
                templateUrl: '/views/CuaseAndEffectReport.html',
                controller: 'cuaseAndEffectReportCtrl'
            })
            .state('languageTranslation', {
                url: '/languageTranslation',
                templateUrl: '/views/LanguageTranslation.html',
                controller: 'languageTranslationCtrl'
            })
            .state('medicineGroupNew', {
                url: '/medicineGroupNew',
                templateUrl: '/views/MedicineGroupNew.html',
                controller: 'medicineGroupNewCtrl'
            })
            .state('nutrientFoodSideEffect', {
                url: '/nutrientFoodSideEffect',
                templateUrl: '/views/NutrientFoodSideEffect.html',
                controller: 'nutrientFoodSideEffectCtrl'
            })
            .state('medicineGroupParentHierarchy', {
                url: '/medicineGroupParentHierarchy',
                templateUrl: '/views/MedicineGroupParentHierarchy.html',
                controller: 'medicineGroupParentHierarchyCtrl'
            })
            .state('serviceProviderLocation', {
                url: '/serviceProviderLocation',
                templateUrl: '/views/ServiceProviderLocation.html',
                controller: 'serviceProviderLocationCtrl'
            })
            .state('hcLanguageTranslation', {
                url: '/hcLanguageTranslation',
                templateUrl: '/views/hcLanguageTranslation.html',
                controller: 'hcLanguageTranslationCtrl'
            })
            .state('itemTestMappingKnowmed', {
                url: '/itemTestMappingKnowmed',
                templateUrl: '/views/ItemTestMappingKnowmed.html',
                controller: 'itemTestMappingKnowmedCtrl'
            })
            .state('assignDiseaseDepartment', {
                url: '/assignDiseaseDepartment',
                templateUrl: '/views/AssignDiseaseDepartment.html',
                controller: 'assignDiseaseDepartmentCtrl'
            })
            .state('studyReferenceReport', {
                url: '/studyReferenceReport',
                templateUrl: '/views/StudyReferenceReport.html',
                controller: 'studyReferenceReportCtrl'
            })
            .state('knowmedEraItemMapping', {
                url: '/knowmedEraItemMapping',
                templateUrl: '/views/KnowmedEraItemMapping.html',
                controller: 'knowmedEraItemMappingCtrl'
            })
            .state('diseaseFindings', {
                url: '/diseaseFindings',
                templateUrl: '/views/diseaseFindings.html',
                controller: 'diseaseFindingsCtrl'
            })
            .state('diseaseImagesUpload', {
                url: '/diseaseImagesUpload',
                templateUrl: '/views/diseaseImagesUpload.html',
                controller: 'diseaseImagesUploadCtrl'
            })
            .state('problemNutrientImportance', {
                url: '/problemNutrientImportance',
                templateUrl: '/views/problemNutrientImportance.html',
                controller: 'problemNutrientImportanceCtrl'
            })
            .state('problemNutrientImportanceReport', {
                url: '/problemNutrientImportanceReport',
                templateUrl: '/views/problemNutrientImportanceReport.html',
                controller: 'problemNutrientImportanceReportCtrl'
            })
            .state('clinicalNews', {
                url: '/clinicalNews',
                templateUrl: '/views/clinicalNews.html',
                controller: 'clinicalNewsCtrl'
            })
            .state('clinicalCalendar', {
                url: '/clinicalCalendar',
                templateUrl: '/views/clinicalCalendar.html',
                controller: 'clinicalCalendarCtrl'
            })
            .state('collegeMaster', {
                url: '/collegeMaster',
                templateUrl: '/views/collegeMaster.html',
                controller: 'collegeMasterCtrl'
            })
            .state('subjectMaster', {
                url: '/subjectMaster',
                templateUrl: '/views/subjectMaster.html',
                controller: 'subjectMasterCtrl'
            })
            .state('categoryMaster', {
                url: '/categoryMaster',
                templateUrl: '/views/categoryMaster.html',
                controller: 'categoryMasterCtrl'
            })
            .state('topicMaster', {
                url: '/topicMaster',
                templateUrl: '/views/topicMaster.html',
                controller: 'topicMasterCtrl'
            })
            .state('levelMaster', {
                url: '/levelMaster',
                templateUrl: '/views/levelMaster.html',
                controller: 'levelMasterCtrl'
            })
            .state('questionTypeMaster', {
                url: '/questionTypeMaster',
                templateUrl: '/views/questionTypeMaster.html',
                controller: 'questionTypeMasterCtrl'
            })
            .state('addQuestionMaster', {
                url: '/addQuestionMaster',
                templateUrl: '/views/addQuestionMaster.html',
                controller: 'addQuestionMasterCtrl'
            })
            .state('examTypeMaster', {
                url: '/examTypeMaster',
                templateUrl: '/views/examTypeMaster.html',
                controller: 'examTypeMasterCtrl'
            })
            .state('assignExamTypeQuestion', {
                url: '/assignExamTypeQuestion',
                templateUrl: '/views/assignExamTypeQuestion.html',
                controller: 'assignExamTypeQuestionCtrl'
            })
            .state('mergeGroup', {
                url: '/mergeGroup',
                templateUrl: '/views/MergeGroup.html',
                controller: 'mergeGroupCtrl'
            })
            .state('assignTopicSubject', {
                url: '/assignTopicSubject',
                templateUrl: '/views/AssignTopicSubject.html',
                controller: 'assignTopicSubjectCtrl'
            })
            .state('videoMaster', {
                url: '/videoMaster',
                templateUrl: '/views/VideoMaster.html',
                controller: 'videoMasterCtrl'
            })
            .state('assignVideoTopic', {
                url: '/assignVideoTopic',
                templateUrl: '/views/AssignVideoTopic.html',
                controller: 'assignVideoTopicCtrl'
            })
            .state('brandMedicineAssign', {
                url: '/brandMedicineAssign',
                templateUrl: '/views/BrandMedicineAssign.html',
                controller: 'brandMedicineAssignCtrl'
            })
            .state('mergeMedicine', {
                url: '/mergeMedicine',
                templateUrl: '/views/MergeMedicine.html',
                controller: 'mergeMedicineCtrl'
            })
            .state('bacteriaRelation', {
                url: '/bacteriaRelation',
                templateUrl: '/views/BacteriaRelation.html',
                controller: 'bacteriaRelationCtrl'
            })
            .state('agentFactorEffect', {
                url: '/agentFactorEffect',
                templateUrl: '/views/AgentFactorEffect.html',
                controller: 'agentFactorEffectCtrl'
            })
            .state('userPerformanceReport', {
                url: '/userPerformanceReport',
                templateUrl: '/views/UserPerformanceReport.html',
                controller: 'userPerformanceReportCtrl'
            })
            .state('addToxinsInhibitor', {
                url: '/addToxinsInhibitor',
                templateUrl: '/views/AddToxinsInhibitor.html',
                controller: 'addToxinsInhibitorCtrl'
            })
            .state('toxinRankingReport', {
                url: '/toxinRankingReport',
                templateUrl: '/views/ToxinRankingReport.html',
                controller: 'toxinRankingReportCtrl'
            })
            .state('nutrientInteractionRank', {
                url: '/nutrientInteractionRank',
                templateUrl: '/views/NutrientInteractionRank.html',
                controller: 'nutrientInteractionRankCtrl'
            })
            .state('eCGWaveCause', {
                url: '/eCGWaveCause',
                templateUrl: '/views/ECGWaveCause.html',
                controller: 'eCGWaveCauseCtrl'
            })
            .state('nutrientChannelMaster', {
                url: '/nutrientChannelMaster',
                templateUrl: '/views/NutrientChannelMaster.html',
                controller: 'nutrientChannelMasterCtrl'
            })
            .state('symptomBasedInvestigation', {
                url: '/symptomBasedInvestigation',
                templateUrl: '/views/SymptomBasedInvestigation.html',
                controller: 'symptomBasedInvestigationCtrl'
            })
            .state('bacteriaReport', {
                url: '/bacteriaReport',
                templateUrl: '/views/BacteriaReport.html',
                controller: 'bacteriaReportCtrl'
            })
            .state('menuDescriptionMaster', {
                url: '/menuDescriptionMaster',
                templateUrl: '/views/MenuDescriptionMaster.html',
                controller: 'menuDescriptionMasterCtrl'
            })
            .state('addfoodCoockingMethod', {
                url: '/addfoodCoockingMethod',
                templateUrl: '/views/AddfoodCoockingMethod.html',
                controller: 'addfoodCoockingMethodCtrl'
            })
            .state('foodRecipeCategory', {
                url: '/foodRecipeCategory',
                templateUrl: '/views/FoodRecipeCategory.html',
                controller: 'foodRecipeCategoryCtrl'
            }).state('nutrientInterConversion', {
                url: '/nutrientInterConversion',
                templateUrl: '/views/NutrientInterConversion.html',
                controller: 'nutrientInterConversionCtrl'
            }).state('subjectTopicTime', {
                url: '/subjectTopicTime',
                templateUrl: '/views/SubjectTopicTime.html',
                controller: 'subjectTopicTimeCtrl'
            }).state('medicineAntidote', {
                url: '/medicineAntidote',
                templateUrl: '/views/MedicineAntidote.html',
                controller: 'medicineAntidoteCtrl'
            }).state('surgeryContraIndication', {
                url: '/surgeryContraIndication',
                templateUrl: '/views/SurgeryContraIndication.html',
                controller: 'surgeryContraIndicationCtrl'
            }).state('medicineElectrolytes', {
                url: '/medicineElectrolytes',
                templateUrl: '/views/MedicineElectrolytes.html',
                controller: 'medicineElectrolytesCtrl'
            }).state('nutrientMetabolite', {
                url: '/nutrientMetabolite',
                templateUrl: '/views/NutrientMetabolite.html',
                controller: 'nutrientMetaboliteCtrl'
            }).state('molecularLibrary', {
                url: '/molecularLibrary',
                templateUrl: '/views/MolecularLibrary.html',
                controller: 'molecularLibraryCtrl'
            }).state('bodyOrganMaster', {
                url: '/bodyOrganMaster',
                templateUrl: '/views/BodyOrganMaster.html',
                controller: 'bodyOrganMasterCtrl'
            }).state('dockingReportbyScore', {
                url: '/dockingReportbyScore',
                templateUrl: '/views/DockingReportbyScore.html',
                controller: 'dockingReportbyScoreCtrl'
            }).state('siteMaster', {
                url: '/siteMaster',
                templateUrl: '/views/SiteMaster.html',
                controller: 'siteMasterCtrl'
            }).state('problemWiseDiet', {
                url: '/problemWiseDiet',
                templateUrl: '/views/ProblemWiseDiet.html',
                controller: 'problemWiseDietCtrl'
            }).state('foodNutrientReports', {
                url: '/foodNutrientReports',
                templateUrl: '/views/FoodNutrientReports.html',
                controller: 'foodNutrientReportsCtrl'
            }).state('impressionMaster', {
                url: '/impressionMaster',
                templateUrl: '/views/ImpressionMaster.html',
                controller: 'impressionMasterCtrl'
            })
            .state('calculatorControlMaster', {
                url: '/calculatorControlMaster',
                templateUrl: '/views/CalculatorControlMaster.html',
                controller: 'calculatorControlMasterCtrl'
            })
            .state('diseaseSearchReport', {
                url: '/diseaseSearchReport',
                templateUrl: '/views/DiseaseSearchReport.html',
                controller: 'toxinRankingReportCtrl'
            });


        $urlRouterProvider.otherwise('login');
    }]);

app.factory('httpLoadingInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
    // Request iteration counter - count requests started
    var reqIteration = 0;
    return {
        request: function (config) {
            // Firing event only if current request was the first
            if (reqIteration === 0) {
                $rootScope.$broadcast('globalLoadingStart');
            }
            // Increasing request iteration
            reqIteration++;
            return config || $q.when(config);
        },
        response: function (config) {
            // Decreasing request iteration
            reqIteration--;
            // Firing event only if current response was came to the last request
            if (!reqIteration) {
                $rootScope.$broadcast('globalLoadingEnd');
            }
            return config || $q.when(config);
        }, responseError: function (rejection) {
            reqIteration = 0;
            $rootScope.$broadcast('globalLoadingEnd');
            return $q.reject(rejection);
        }
    };

}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            'responseError': function (rejection) {
                var defer = $q.defer();
                if (rejection.status == 401) {
                    UtilsCache.remove('AUTHTOKEN');
                    UtilsCache.clearSession();
                    $location.path('/login');
                } else if (rejection.status == 404) {

                }
                defer.reject(rejection);
                return defer.promise;

            }
        };
    });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('httpLoadingInterceptor');
});

app.run(function ($rootScope, $location, $state, dataFactory, toaster) {
    $rootScope.location = $location;
    $rootScope.logOut = function () {
        var params = {
            loginID: Number(UtilsCache.getSession('USERDETAILS').userid),
            accessToken: UtilsCache.get("AUTHTOKEN")
        };
        dataFactory.deleteToken(params).then(function (response) {
            UtilsCache.clearSession();
            UtilsCache.remove('AUTHTOKEN');
            UtilsCache.removeSession("MENUASSIGN");
            UtilsCache.removeSession("USERDETAILS");
            $location.path('/login');
            //toaster.pop('success', "Success", 'Saved Successfully.');
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var val = UtilsCache.getSession('MENUASSIGN');
        var flag = 0;
        angular.forEach(val, function (item) {
            var url = '/' + item.url;
            if (url == $location.path() || $location.path() == '/dashboard') {
                flag = 1;
            }
        });
        if ($location.path() !== '/login' && !UtilsCache.get('AUTHTOKEN')) {
            $rootScope.logOut();
        }
        if ($location.path() !== '/login' && flag === 0) {
            toaster.pop('error', "Error", 'Logout due to unauthorized access');
            $rootScope.logOut();
            event.preventDefault();
        }
    });

    $rootScope.activityLog = function (response, activityType, fromPage, remark, data) {
        
        if (!data) {
            var data = response.config.data;
        }
        var responseMsg = response.status;
        if (responseMsg != 200) {
            remark = response.data;
        }

        var obj = {
            userid: UtilsCache.getSession('USERDETAILS').userid || 0,
            activityLog: data,
            activityType: activityType,
            deptName: 'departmentID=' + (UtilsCache.getSession('USERDETAILS').departmentID || ""),
            remark: remark,
            responseMsg: responseMsg,
            fromPage: fromPage,
            systemIP: systemIP
        };

        dataFactory.saveActivityLog(obj).then(function (response) {
        }, function (error) {
        });
    };

});

app.constant('ASSETS', {
    'login': {
        TokenExpireTime: 12 * 60 * 60 * 1000 //12 hr
    },
    'errorMessage': {
        message: 'Something went wrong',
        isShow: true
    }
});

app.filter('trustAsHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);