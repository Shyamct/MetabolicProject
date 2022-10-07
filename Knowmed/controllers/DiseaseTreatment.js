app.controller('diseaseTreatmentCtrl', function ($scope, dataFactory, toaster) {   
    var assignId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsDiseaseTreatment().then(function (response) {
            var result = response.data;           
            $scope.diseaseList = result.diseaseList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.GetDiseaseTreatmentList = function () {
        $scope.clr();
        var params = {
            id: assignId
        };
        dataFactory.DiseaseTreatmentList(params).then(function (response) {
            var result = response.data;
            $scope.diseaseTreatmentList = result.diseaseTreatmentList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveDiseaseTreatment= function () {
       
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        if (isEmpty($scope.txtTreatmentTitle)) { 
            toaster.pop('error', "Error", 'Please Enter Treatment Title');
            return false;
        }
        if (isEmpty($scope.txtTreatment)) {
            toaster.pop('error', "Error", 'Please Enter Treatment Detail');
            return false;
        }

        var params = {
            id: assignId,
            disRefID: $scope.ddlProblem,
            treatmentTitle: $scope.txtTreatmentTitle,
            treatment: $scope.txtTreatment,
            //treatmentCommunity: $scope.txttreatmentCommunity,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseTreatment(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetDiseaseTreatmentList();
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
            dataFactory.DeleteDiseaseTreatment(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetDiseaseTreatmentList();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        assignId = paramid;
        var params = {
            id: paramid
        };
        log(params);
        dataFactory.DiseaseTreatmentList(params).then(function (response) {
            var result = response.data;           
            var list = result.diseaseTreatmentList;
            $scope.ddlProblem = list[0].problemID;  
            $scope.txtTreatmentTitle = list[0].treatmentTitle;
            $scope.txtTreatment= list[0].treatment;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {   
        $scope.ddlProblem = 0;
        $scope.txtTreatmentTitle = '';
        $scope.txtTreatment= '';    
        assignId = 0;
    };
    $scope.initControls();
    $scope.GetDiseaseTreatmentList();
});