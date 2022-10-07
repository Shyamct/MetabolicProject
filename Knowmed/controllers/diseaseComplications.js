app.controller('diseaseComplicationsCtrl', function ($scope, dataFactory, toaster) {
    $scope.isDisabled = false;
    var diseaseComplicationsId = 0;
    var arr = [];
    $scope.diseaseComplicationsList = "";
    $scope.addeddiseaseComplicationsList = "";
    $scope.initControls = function () {
        dataFactory.InitControlsdiseaseComplications().then(function (response) {
            var result = response.data;
            $scope.diseaseList = result.diseaseMaster;
            $scope.complicationsList = result.complications;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetDiseaseComplications = function () {
        $scope.clr();
        var params = {
            id: diseaseComplicationsId
        };
        dataFactory.DiseaseComplicationsList(params).then(function (response) {
            var result = response.data;
            $scope.addedDiseaseComplicationsList = result.diseaseMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.AddDiseaseComplications = function () {
        if ($scope.ddlDisease == 0) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        if ($scope.ddlComplications == 0) {
            toaster.pop('error', "Error", 'Please Select Complications');
            return false;
        }

        for (var i = 0; i < $scope.diseaseComplicationsList.length; i++) {
            if ($scope.diseaseComplicationsList[i].diseaseId == $scope.ddlDisease && $scope.diseaseComplicationsList[i].complicationsId == $scope.ddlComplications) {
                toaster.pop('error', "Error", 'Complications Already Added To This Disease');
                return false;
            }
          
        }
        for (var i = 0; i < $scope.addedDiseaseComplicationsList.length; i++) {
            if ($scope.addedDiseaseComplicationsList[i].diseaseId == $scope.ddlDisease && $scope.addedDiseaseComplicationsList[i].complications == $scope.ddlComplications) {
                toaster.pop('error', "Error", 'Already Saved This Complications For This Disease ');
                return false;
            }
        }
        arr.push({
            diseaseId: $("#ddlDisease").val(),
            diseaseName: $("#ddlDisease option:selected").text().trim(),
            complicationsId: $("#ddlComplications").val(),
            complicationsName: $("#ddlComplications option:selected").text().trim(),
            remark:  $scope.txtRemark
        });
        $scope.diseaseComplicationsList = arr;
    };
    $scope.deleteDiseaseComplications = function (index) {
        $scope.diseaseComplicationsList.splice(index, 1);
    };
    $scope.saveDiseaseComplications = function () {
       
        if (diseaseComplicationsId == 0)
        {
            if ($scope.ddlDisease == 0) {
                toaster.pop('error', "Error", 'Please Select Disease');
                return false;
            }
            if ($scope.ddlComplications == 0) {
                toaster.pop('error', "Error", 'Please Select Complications');
                return false;
            }
        }
        var params = {
            id: diseaseComplicationsId,
            diseaseID: $scope.ddlDisease,
            complicationsID: $scope.ddlComplications,
            remark: $scope.txtRemark,
            lstDiseaseComplications: $scope.diseaseComplicationsList,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
           
        };
       
        dataFactory.SaveDiseaseComplications(params).then(function (response) {
            $scope.GetDiseaseComplications();
            toaster.pop('success', "Success", 'Saved Successfully.');
           
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseComplications(params).then(function (response) {
                $scope.GetDiseaseComplications();
                toaster.pop('success', "Success", 'Deleted Successfully.');
               
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        $scope.isDisabled = true;
        diseaseComplicationsId = paramid;
        var params = {
            id: paramid
            
        };
        dataFactory.DiseaseComplicationsList(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseMaster;
            $scope.ddlDisease = list[0].diseaseId;
            $scope.ddlComplications = list[0].complicationsId;
            $scope.txtRemark = list[0].remark;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.diseaseComplicationsList.length = 0;
        $scope.txtRemark = '';
        diseaseComplicationsId = 0;
        $scope.isDisabled = false;
    };
    $scope.initControls();
    $scope.GetDiseaseComplications();
});