app.controller('calculatorCtrl', function ($scope, dataFactory, $rootScope,toaster) {
    var pkId = 0; 
    
    $scope.GetCalculatorList = function () {
        var params = {
            calculatorId: 0 
        };
        dataFactory.CalculatorDetailList(params).then(function (response) {
            var result = response.data;
            $scope.CalList = result.calculatorMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.SaveCalculatorMaster = function () {
        if (isEmpty($scope.txtCalculatorTitle)) {       
            toaster.pop('error', 'Please Enter Calculator Title');
            return false;
        }       
        var params = {
            calculatorId: pkId,          
            calculatorTitle: $scope.txtCalculatorTitle,
            remark: $scope.txtRemark,
            reference: $scope.txtReference,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveCalculator(params).then(function (response) {
            var message = pkId > 0 ? 'UPDATE CALCULATOR MASTER' : 'SAVE CALCULATOR MASTER';
            $rootScope.activityLog(response, message, 'CALCULATOR MASTER', '');
            $scope.clr();
            $scope.GetCalculatorList();
            toaster.pop('success', "Success", 'Saved Successfully.');
          
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        pkId = paramid;
        var params = {
            calculatorId: paramid
        };
        dataFactory.CalculatorDetailList(params).then(function (response) {
            var result = response.data;
            var list = result.calculatorMasterList;
            $scope.txtCalculatorTitle = list[0].calculatorTitle;
            $scope.txtRemark = list[0].remark;
            $scope.txtReference = list[0].reference;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.deleteCalculatorMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                calculatorId: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };

            dataFactory.DeleteCalculator(params).then(function (response) {
                $scope.GetCalculatorList();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE CALCULATOR MASTER', 'CALCULATOR MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }

    };
    $scope.clr = function () {        
        $scope.txtCalculatorTitle = '';
        $scope.txtRemark = '';
        $scope.txtReference = '';
        pkId = 0;
    };

    $scope.GetCalculatorList();
});