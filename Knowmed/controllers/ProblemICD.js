app.controller('problemICDCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var problemICDId = 0; 
    //var ICDID = 0; 
    //var ICDCode = ""; 
    //var chk = "";
    
    $scope.initControls = function () {
        dataFactory.problemICDinitControls().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemMaster;
            //$scope.ICDList = result.icdList;
            //$scope.ICDProblemList = result.problemICDList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
       
    $scope.SaveICDProblem = function () {
             
        if ($scope.ddlProblem == 0) {
            toaster.pop('error', "Error", 'Please Select Problem');
            return false;
        }
        if (isEmpty($scope.problemICD)) {
            toaster.pop('error', "Error", 'Please Enter ICD Code');
            return false;
        }
        //if ($scope.ddlICD == -1) {
        //    toaster.pop('error', "Error", 'Please Select ICD Code');
        //    return false;
        //}
        //problemICDId = $scope.ddlProblem;
        //chk = $scope.problemICD;
        ICDID = $scope.ICDCodeId.split('-')[0];
        ICDCode = $scope.ICDCodeId.split('-')[1];
       

        var params = {
            //id: problemICDId,
            problemID: $scope.ddlProblem,
            ICDID: ICDID,
            ICDCode: ICDCode,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        //log(params);
        dataFactory.SaveProblemICD(params).then(function (response) {
            var message = problemICDId > 0 ? 'Update Problem ICD' : 'Save Problem ICD';
            $rootScope.activityLog(response, message, 'Problem ICD', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.getProblemICDList();

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.DeleteProblemICD = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                problemID: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteProblemICD(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getProblemICDList();
                $rootScope.activityLog(response, 'Delete Problem ICD', ' Problem ICD', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.getProblemICDList = function (paramid) {
        problemICDId = paramid;
        var params = {
            problemID: 0
        };
        dataFactory.problemICDList(params).then(function (response) {
            var result = response.data;
            $scope.ICDProblemList = result.problemICDList;
            log(result.problemICDList);

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.edit = function (paramid) {
        problemICDId = paramid;
        var params = {
            problemID: paramid
        };
        dataFactory.problemICDList(params).then(function (response) {
            var result = response.data;
            var list = result.problemICDList;
            $scope.ddlProblem = list[0].id;
            $scope.problemICD = list[0].icdTableID;
            $scope.ICDCodeId = list[0].icdid;
       
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        problemICDId = 0;
        $scope.ddlProblem = 0; 
        $scope.problemICD = '';
        //$scope.ddlICD = -1;      
    };

    $scope.initControls();
    $scope.getProblemICDList();

});