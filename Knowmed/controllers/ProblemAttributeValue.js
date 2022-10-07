app.controller('problemAttributeValueCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var ProblemAttributeId = 0; 
    
    $scope.pAttributeMasterList = function () {
        dataFactory.ProblemAttributeMasterList().then(function (response) {
            var result = response.data;
            $scope.ProblemAttributeMasterList = result.problemAttributeMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }
    $scope.pAttributeValueList = function () {
        var params = {
            attributeId: $scope.ddlAttribute
        };
        dataFactory.ProblemAttributeValueList(params).then(function (response) {
            var result = response.data;
            $scope.ProblemAttributeValueList = result.problemAttributeValue;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }
    $scope.SaveProblemAttributeValue = function () {
        if ($scope.ddlAttribute == -1) {
            toaster.pop('error', "Error", 'Select Attribute');
            return false;
        }
        if ($scope.txtAttributeValue == undefined || $scope.txtAttributeValue == "") {
            toaster.pop('error', "Error", 'Enter Attribute Value');
            return false;
        }
        var params = {
            id: ProblemAttributeId,
            attributeValue: $scope.txtAttributeValue,
            attributeId: $scope.ddlAttribute,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveProblemAttributeValue(params).then(function (response) {
            var message = ProblemAttributeId > 0 ? 'Update Problem Attribute Value' : 'Save Problem Attribute Value';
            $rootScope.activityLog(response, message, 'Problem Attribute Value', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.pAttributeValueList(); 
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteProblemAttributeValue = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteProblemAttributeValue(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.pAttributeValueList();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Problem Attribute Value', ' Problem Attribute Value', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        ProblemAttributeId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.ProblemAttributeValueList(params).then(function (response) {
            var result = response.data;
            var list = result.problemAttributeValue;
            $scope.txtAttributeValue = list[0].attributeValue;
            $scope.ddlAttribute = list[0].attributeID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.clr = function () {
        ProblemAttributeId = 0;
        $scope.txtAttributeValue = "";   
        //$scope.ddlAttribute = -1;      
    };   
    $scope.pAttributeMasterList();
    $scope.pAttributeValueList();
});