app.controller('diseaseSpecialityAssignCtrl', function ($scope, dataFactory, toaster) {
    var getIDs = "";
    $scope.specialityMasterList = function () {
       

        dataFactory.SpecialityMasterList().then(function (response) {
            var result = response.data;
            $scope.specialityMasterList = result.specialityMaster;
          
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.stateChanged = function () {
      
           
          
                
        //getIDs = getIDs + $scope.ddlSpeciality + ",";
                var params = {
                    specialityID: $scope.ddlSpeciality
                };
                dataFactory.DiseaseSpecialityAssignList(params).then(function (response) {
                    var result = response.data;
                    $scope.DiseaseSpecialityAssignList = result.diseaseSpecialityAssignList;
                }, function (error) {
                    toaster.pop('error', "Error", error);
                });
            
        
    }


    $scope.diseaseMasterList = function () {
        dataFactory.DiseaseMasterList().then(function (response) {
            var result = response.data;
            $scope.problemMasterList  = result.problemMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.diseaseSpecialityAssignList = function () {

        var specialityId = null;
        if ($scope.ddlSpeciality > 0) {
            specialityId = $scope.ddlSpeciality
        }
        var params = {
            specialityID: specialityId
        };  
        dataFactory.DiseaseSpecialityAssignList(params).then(function (response) {
            var result = response.data;
            $scope.DiseaseSpecialityAssignList = result.diseaseSpecialityAssignList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.SaveAssignDiseaseSpeciality = function () {
        var isExists = false;
        var disease = "";
        var newArry = [];

        angular.forEach($scope.visibleItems, function (item) {           
            if (item.selected) {               
                isExists = true;
                disease = disease + item.id + ",";

                angular.forEach($scope.specialityMasterList, function (item2) {     
                   // var items = "";
                   // items = "speciality" + item.id + item2.id;
                    if ($("#speciality" + item.id + item2.id).prop("checked") == true) {
                        //alert(item2.id);
                        newArry.push({
                            diseaseID: item.id,
                            specialityID: item2.id

                        });
                    }
                }); 
                
            }
        });       
        
        //if ($scope.ddlSpeciality == "-1") {
        //    toaster.pop('error', "Error", 'Select Speciality');
        //    return false;
        //}
        if (isExists == false) {
            toaster.pop('error', "Error", 'Select atlease one Disease !!');
            return false;
        }
        var params = {
            specialityIDArray: newArry,
            diseaseID: disease,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseSpecialityAssign(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.diseaseSpecialityAssignList();
            $scope.diseaseMasterList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.DeleteDiseaseSpecialityAssign = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseSpecialityAssign(params).then(function (response) {
                $scope.diseaseSpecialityAssignList();    
                $scope.diseaseMasterList();
                toaster.pop('success', "Success", 'Deleted Successfully.');                       
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.toggleSelect = function () {
        if ($scope.ddlSpeciality != "-1") {
            angular.forEach($scope.problemMasterList, function (item) {
              
                item.selected = !item.selected;
            });
        }
        else {
            toaster.pop('error', "Error", 'Select Speciality');
            $scope.selectAll = false;
        }
    };

    function init() {
  
    }

    

    init();

    $scope.clr = function () {
        $scope.selectAll = false;
    };
    $scope.specialityMasterList();
    $scope.diseaseMasterList();
});