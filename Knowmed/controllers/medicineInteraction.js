app.controller('medInteractionCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var medicineInteractionId = 0;
    var signSymtopmsList = [];
    var addedIndicationList = [];
    

    $scope.interactionNature = [{ 'interactionNature': "Beneficial" },
        { 'interactionNature': "Harmful" },
        { 'interactionNature': "Caution" },
        { 'interactionNature': "Not Significant" }];
    var arr = [];
    var arr3 = [];
    var arr4 = [];
    var monitoringForTableName = '';
    var monitoringForRefID = 0;
    $scope.addedProblemList = "";
    //$scope.addedIndicationList = "";
    $scope.addedSubstituteList = "";
    $scope.initControls = function () {
        var params = {

            departmentID: Number(UtilsCache.getSession('USERDETAILS').departmentID)
        };
        dataFactory.InitControlsMedInteraction(params).then(function (response) {
            var result = response.data;
            $scope.medicineList = result.medicineList;
            $scope.interactionTypeList = result.interactionTypeList;
            $scope.bookList = result.bookList;
            $scope.problemList = result.problemList;
            $scope.monitoringForList = result.monitoringForLIST;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
            //toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.GetMedInteractionList = function () {
        var params = {
            medicineID: $scope.ddlMedicine
        };
        dataFactory.MedicineInteractionList(params).then(function (response) {
            var result = response.data;
           
            $scope.medicineInteractionList = result.medicineInteractionList;
            $scope.ddlMedicineForDoseModification = $scope.ddlMedicine;
        }, function (error) {
            toaster.pop('error', "Error", error.data);
            //toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.GetInteractedWith = function (interactTypeID) {
        var params = {
            interactionTypeID: interactTypeID
        };        
        dataFactory.InteractedWithList(params).then(function (response) {
            var result = response.data;
            $scope.interactedWithList = result.interactedWithList;
            if (interactTypeID == 1 || interactTypeID == 2 || interactTypeID == 3) {
                $scope.ddlSubstituteForType = $scope.ddlSubstituteType = 0;
                $scope.ddlSubstituteMedicineFor = $scope.ddlSubstituteMedicine = -1;
                $scope.substituteMedicineForList = $scope.substituteMedicineList = result.interactedWithList;
            }
        }, function (error) {
            toaster.pop('error', "Error", error.data);
            //toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };
    $scope.AddSymtomps = function () {
       
        if ($scope.ddlProblem == -1) {
            toaster.pop('error', "Error", 'Please Select Symtomps');
            return false;
        }

        for (var i = 0; i < $scope.addedProblemList.length; i++) {
            if ($scope.addedProblemList[i].problemID == $scope.ddlProblem ) {
                toaster.pop('error', "Error", "Country Already Added To This Symtomps");
                return false;
            }

        }
       
        arr.push({
            problemID: $("#ddlProblem").val(),
            problemName: $("#ddlProblem option:selected").text().trim().toString()
           
        });
        $scope.addedProblemList = arr;
    };
    $scope.deleteAddedProblemList= function (index) {
        $scope.addedProblemList.splice(index, 1);
    };

    //New Code GOES HERE 

    //$scope.addindication = function () {

    //    if ($scope.ddlindicationproblem == -1) {
    //        toaster.pop('error', "error", 'please select indication');
    //        return false;
    //    }

    //    for (var i = 0; i < $scope.addedindicationlist.length; i++) {
    //        if ($scope.addedindicationlist[i].indicationID == $scope.ddlindicationproblem) {
    //            toaster.pop('error', "error", " already added this indication");
    //            return false;
    //        }

    //    }

    //    arr3.push({
    //        indicationID: $("#ddlindicationproblem").val(),
    //        indicationName: $("#ddlindicationproblem option:selected").text().trim().tostring(),
    //        indicationurl: $scope.txtindicationurl
    //    });
    //    $scope.addedindicationlist = arr3;
    //};

    //$scope.deleteAddedIndicationList = function (index) {
    //    $scope.addedIndicationList.splice(index, 1);
    //};

    $scope.AddSubstitute = function () {

        if ($scope.ddlSubstituteMedicineFor == -1) {
            toaster.pop('error', "Error", 'Please Select Subsitute For');
            return false;
        }
        if ($scope.ddlSubstituteMedicine == -1) {
            toaster.pop('error', "Error", 'Please Select Subsitute');
            return false;
        }
        for (var i = 0; i < $scope.addedSubstituteList.length; i++) {
            if ($scope.addedSubstituteList[i].substituteForID == $scope.dlSubstituteMedicineFor && $scope.addedSubstituteList[i].substituteID == $scope.dlSubstituteMedicine) {
                toaster.pop('error', "Error", " Already Added This Substitute");
                return false;
            }
        }

        arr4.push({
            substituteForID: $("#ddlSubstituteMedicineFor").val(),
            substituteForName: $("#ddlSubstituteMedicineFor option:selected").text().trim().toString(),
            substituteID: $("#ddlSubstituteMedicine").val(),
            substituteName: $("#ddlSubstituteMedicine option:selected").text().trim().toString(),
            substituteForTypeID: $("#ddlSubstituteForType").val(),
            substituteTypeID: $("#ddlSubstituteType").val()

        });
        $scope.addedSubstituteList = arr4;
    };
    $scope.deleteAddedSubstituteList = function (index) {
        $scope.addedSubstituteList.splice(index, 1);

    };

    //NEW code END HERE 
    $scope.saveMedicineInteraction = function () {
             
       // return;
        if ($scope.ddlMedicine == -1) {
            alert('Please Select Medicine');
            return false;
        }
        if ($scope.ddlMonitoringFor != -1) {
            var array = $scope.ddlMonitoringFor.split('_');
            monitoringForRefID = array[0];
            monitoringForTableName = array[1];
        }
        else
        {
            monitoringForRefID = "";
            monitoringForTableName = "";
        }

        var interactionrd = $scope.rdInteractionType; 
        var nature = $scope.rdNature;      
        var params = {
            medicineInteractionId: medicineInteractionId,
            medicineID: $scope.ddlMedicine,
            interactedElementID: $scope.ddlInteracted,
            interactionTypeID: interactionrd,
            interactionEffect: $scope.txtInteractionEffect,
            interactionNature: nature,
            otherEffect: $scope.txtOtherEffect,
            suggestiveAction: $scope.txtSuggAction,
            medicineForDoseModificationID: $scope.ddlMedicineForDoseModification,
            decreasedFrom: $scope.txtDecreasedFrom,
            decreasedTo: $scope.txtDecreasedTo,
            doseModificationRemark: $scope.txtDoseModificationRemark,
            monitoringForTableName: monitoringForTableName,
            monitoringForRefID: monitoringForRefID,
            monitoringForRemark: $scope.txtMonitoringForRemark,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            remark: $scope.txtRemark,
            pageReference: $scope.txtPageReference,
            lstProblemList: signSymtopmsList,
           // lstindicationName: indicationName,+
            lstIndicationList: addedIndicationList,
            lstSubstituteList: $scope.addedSubstituteList,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        log(params);

        dataFactory.SaveMedicineInteraction(params).then(function (response) {
            var message = medicineInteractionId > 0 ? 'Update Medicine Interaction' : 'Save Medicine Interaction';
            $rootScope.activityLog(response, message, 'Medicine Interaction', '');
            $scope.clear();
            $scope.GetMedInteractionList();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };    
  
    $scope.edit = function (index, paramid) {
       
        medicineInteractionId = paramid;
        var params = {
            medicineInteractionId: paramid
        };
        dataFactory.MedicineInteractionList(params).then(function (response) {
            var signsID = '';
            var result = response.data;

            var list = result.medicineInteractionList;           
            $scope.GetInteractedWith(list[0].interactionTypeID);
            $scope.ddlMedicine = list[0].medicineID;
            $scope.ddlInteractionType = list[0].interactionTypeID;
            $scope.ddlInteracted = list[0].interactedElementID;
            $scope.ddlInteractionNature = list[0].interactionNature;
            $scope.txtInteractionEffect = list[0].interactionEffect;
            $scope.txtOtherEffect = list[0].otherEffect;
            $scope.txtSuggAction = list[0].suggestiveAction;
            $scope.rdInteractionType = list[0].interactionTypeID;
            $scope.rdNature = list[0].interactionNature;           
            $scope.ddlMedicineForDoseModification = list[0].doseModificationMedicineID;
            $scope.txtDecreasedFrom = list[0].decreasedFrom;
            $scope.txtDecreasedTo = list[0].decreasedTo;
            $scope.txtDoseModificationRemark = list[0].doseModificationRemark;
           
            if (list[0].monitoringFor != '' || !list[0].monitoringFor) {
                var array = list[0].monitoringFor.split('_');
                $scope.ddlMonitoringFor = array[0] + '_' + array[1];
                $scope.txtMonitoringForRemark = list[0].monitoringForRemark;
            }
            //sam here
            $scope.txtRemark = list[0].interactionRemark;
            $scope.ddlBook = list[0].bookID;
            $scope.txtPageNo = list[0].pageNo;
            $scope.txtEdition = list[0].edition;
            $scope.txtReference = list[0].reference;
            $scope.txtPageReference = list[0].pageReference;
            $scope.addedProblemList = "";
            dataFactory.MedicineInteractionEffectList(params).then(function (response) {
                var result = response.data;
               
                var list2 = result.medicineInteractionEffectList;
                var list3 = result.medicineIndicationList;
                var list4 = result.medicineSubstituteList;
                arr = [];

                signSymtopmsList = [];
                for (var i = 0; i < list2.length; i++) {
                    signSymtopmsList.push({
                        problemID: list2[i].problemID,
                        problemName: list2[i].problemName
                    });                                    
                }
                $scope.signSymtomps = signSymtopmsList; 
                
                addedIndicationList = [];
                for (var i = 0; i < list3.length; i++) {
                    addedIndicationList.push({
                        indicationID: list3[i].problemID,
                        indicationName: list3[i].problemName

                    });
                }
              
                $scope.indicationName = addedIndicationList;
                log($scope.indicationName);
               
                arr4 = [];
                for (var i = 0; i < list4.length; i++) {
                    arr4.push({
                        substituteForID: list4[i].substituteForID,
                        substituteForName: list4[i].substituteForName,
                        substituteID: list4[i].substituteID,
                        substituteName: list4[i].substituteName,
                        substituteForTypeID: list4[i].substituteForTypeID,
                        substituteTypeID: list4[i].substituteTypeID
                    });
                }
                $scope.addedSubstituteList = arr4;
            });
        }, function (error) {
            toaster.pop('error', "Error", error.data);
            //toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                medicineInteractionId: id
            };
            dataFactory.DeleteMedicineInteraction(params).then(function (response) {                
                $scope.clear();
                $scope.GetMedInteractionList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Medicine Interaction', ' Medicine Interaction', '');
            }, function (error) {
                toaster.pop('error', "Error", error.data);
                //toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
            });
        }
    };

    $scope.GetSubstituteLists = function (type) {
        var interactionType = '';
        if (type == 'ddlSubstituteForType') {
            interactionType = $scope.ddlSubstituteForType;
        } else if(type == 'ddlSubstituteType') {
            interactionType = $scope.ddlSubstituteType;
        }
        if (interactionType != '0') {
            var params = {
                interactionTypeID: interactionType
            };
            dataFactory.InteractedWithList(params).then(function (response) {
                var result = response.data;
                if (type == 'ddlSubstituteForType') {
                    $scope.ddlSubstituteMedicineFor = -1;
                    $scope.substituteMedicineForList = result.interactedWithList;
                } else if (type == 'ddlSubstituteType') {
                    $scope.ddlSubstituteMedicine = -1;
                    $scope.substituteMedicineList = result.interactedWithList;
                }

            }, function (error) {
                toaster.pop('error', "Error", error.data);
                //toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
            });
        }
    };
    // sign Symptoms
    $scope.tagAdded = function (tag) {
        if (medicineInteractionId == 0) {
            signSymtopmsList.push({
                problemID: tag.problemID
            });
        }     
        
    };

    $scope.tagRemoved = function (tag) {

        for (var i = 0; i < signSymtopmsList.length; i++) {
            if (signSymtopmsList[i].problemID === tag.problemID) {
                signSymtopmsList.splice(i, 1);
            }
        }
    };

$scope.GetSymptomsSearch = function (query) {
        var obj = {
            searchKey: query
        };
        return dataFactory.getsignSymtopmsListFaheem(obj).then(function (response) {
          
            return response.data.table;

        }, function (error) {

        });
    };

     //indication Userss....

    $scope.tag1added = function (tag) {

        if (medicineInteractionId == 0) {
            addedIndicationList.push({
                indicationID: tag.indicationID
            });
        }  

    };

    $scope.tag1removed = function (tag) {

        for (var i = 0; i < addedindicationlist.length; i++) {
            if (addedindicationlist[i].indicationID === tag.indicationID) {
                addedindicationlist.splice(i, 1);
            }
        }
        
    };

    $scope.GetIndicationSearch = function (query) {
        var obj = {
            searchkey: query
        };
        return dataFactory.getIndicationSearchList(obj).then(function (response) {            
          
            return response.data.table;

        }, function (error) {

        });
    };
    
    $scope.clear = function () {
        medicineInteractionId = 0;
        $scope.signSymtomps = ''; 
        $scope.indicationName = ''; 
        signSymtopmsList = [];
        addedIndicationList = [];
    };


    $scope.initControls();
    
});