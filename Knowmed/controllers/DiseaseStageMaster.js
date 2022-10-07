app.controller('diseaseStageMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var diseaseStageID = 0;
    $scope.addedStageList = '';
    
   
    
  
    var arrStageID = [];
  
  

    
    //Stage
    $scope.addStage = function () {

        if ($scope.rdType == 0) {
            toaster.pop('error', "Error", 'Please Select  Type');
            return false;
        }

        if (isEmpty($scope.txtStageName)) {
            toaster.pop('error', "Error", 'Please Enter Stage Name');
            return false;
        }

        for (var i = 0; i < $scope.addedStageList.length; i++) {
            if ($scope.addedStageList[i].type == $scope.rdType && $scope.addedStageList[i].stageName == $scope.txtStageName && $scope.addedStageList[i].stageDefintion == $scope.txtStageDefintion) {
                toaster.pop('error', "Error", 'Already Added  This Stage');
                return false;
            }
        }
        arrStageID.push({
            type: $scope.rdType,
            stageName: $scope.txtStageName,
            stageDefintion: $scope.txtStageDefintion
        });
        
        $scope.addedStageList = arrStageID;
    };

    $scope.deleteAddedStageList = function (index) {
        $scope.addedStageList.splice(index, 1);
    };


    //stage end
    



    $scope.initControls = function () {
        var params = {
            

            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.DiseaseStageMasterList(params).then(function (response) {
            var result = response.data;
            $scope.departmentList = result.departmentList;
            $scope.diseaseStageList = result.diseaseStageList;
            
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
   
  
   
    $scope.saveDiseaseStage = function () {

        if ($scope.addedStageList.length <= 0) {
            toaster.pop('error', "Error", 'Please Add any Stage');
            return false;
        }

        
      
        var params = {
            diseaseDepartmentID: $scope.ddlDepartment,
            diseaseStageID: diseaseStageID,
            lstStageList: $scope.addedStageList,

            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
       
        dataFactory.SaveDiseaseStageMaster(params).then(function (response) {
            $scope.initControls();
            var message = diseaseStageID > 0 ? 'UPDATE DISEASE STAGE MASTER' : 'SAVE DISEASE STAGE MASTER';
            $rootScope.activityLog(response, message, 'DISEASE STAGE MASTER', '');

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
            dataFactory.DeleteDiseaseStageMaster(params).then(function (response) {
                $scope.initControls();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'DELETE DISEASE STAGE MASTER', 'DISEASE STAGE MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid,ddID) {
        //if (paramid == 0) {
            
        //}
        //else {
        //    diseaseStageID = paramid;
        //}
        diseaseStageID = 1;
        var params = {
            diseaseStageID: diseaseStageID,
            diseaseDepartmentID: ddID
        };
        dataFactory.GetDiseaseStageMasterList(params).then(function (response) {
           
            var result = response.data;
            var diseaseDepartmentList = result.diseaseDepartmentList;
            var ddDiseaseStageList = result.diseaseStageList;
            $scope.ddlDepartment = diseaseDepartmentList[0].diseaseDepartmentID;
            arrStageID = [];
            for (var i = 0; i < ddDiseaseStageList.length; i++) {
                arrStageID.push({
                    type: ddDiseaseStageList[i].diseaseType,
                    stageName: ddDiseaseStageList[i].stageClassificationName,
                    stageDefintion: ddDiseaseStageList[i].description
                });
            }
                $scope.addedStageList = arrStageID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

 
    $scope.clr = function () {
        diseaseStageID = 0;
        $scope.ddlDepartment = 0;
        $scope.addedStageList = '';
        arrStageID = [];
    };


    $scope.clr2 = function () {
        diseaseStageID = 0;
        $scope.ddlDepartment = 0;
        $scope.addedStageList = ''; 
        arrStageID = [];

    };

    $scope.initControls();

});