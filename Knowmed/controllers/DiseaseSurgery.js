app.controller('diseaseSurgeryCtrl', function ($scope, dataFactory, toaster) {   
    var assignId = 0;    

    $scope.initControls = function () {
        dataFactory.InitControlsDiseaseSurgery().then(function (response) {
            var result = response.data;           
            $scope.diseaseList = result.diseaseList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.GetDiseaseSurgeryList = function () {
        $scope.clr();
        var params = {
            id: assignId
        };
        dataFactory.DiseaseSurgeryList(params).then(function (response) {
            var result = response.data;
            $scope.diseaseSurgeryList = result.diseaseSurgeryList;           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveDiseaseSurgery = function () {    

        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Disease');
            return false;
        }
        if (isEmpty($scope.txtSurgeryTitle)) { 
            toaster.pop('error', "Error", 'Please Enter Surgery Title');
            return false;
        }
        if (isEmpty($scope.txtNatureOperation)) {
            toaster.pop('error', "Error", 'Please Enter Nature Operation');
            return false;
        }
        if (isEmpty($scope.txtIndication)) {
            toaster.pop('error', "Error", 'Please Enter Indication');
            return false;
        }
        if (isEmpty($scope.txtAnaesthesia)) {
            toaster.pop('error', "Error", 'Please Enter Anaesthesia');
            return false;
        }
        if (isEmpty($scope.txtMethod)) {
            toaster.pop('error', "Error", 'Please Enter Method');
            return false;
        }
        
        var params = {
            id: assignId,
            disRefID: $scope.ddlProblem,
            surgeryTitle: $scope.txtSurgeryTitle,
            natureOperation: $scope.txtNatureOperation,
            indication: $scope.txtIndication,
            anaesthesia: $scope.txtAnaesthesia,
            method: $scope.txtMethod,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveDiseaseSurgery(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.GetDiseaseSurgeryList();
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
            dataFactory.DeleteDiseaseSurgery(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.GetDiseaseSurgeryList();
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
        dataFactory.DiseaseSurgeryList(params).then(function (response) {
            var result = response.data;           
            var list = result.diseaseSurgeryList;
            $scope.ddlProblem = list[0].disRefID;  
            $scope.txtSurgeryTitle = list[0].surgeryTitle;  
            $scope.txtNatureOperation = list[0].natureOperation;  
            $scope.txtIndication = list[0].indication;  
            $scope.txtAnaesthesia = list[0].anaesthesia;  
            $scope.txtMethod = list[0].method;       
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {   
        $scope.ddlProblem = 0;
        $scope.txtSurgeryTitle = '';
        $scope.txtNatureOperation = '';
        $scope.txtIndication = '';
        $scope.txtAnaesthesia = '';
        $scope.txtMethod = '';     
        assignId = 0;
    };
    $scope.initControls();
    $scope.GetDiseaseSurgeryList();
});