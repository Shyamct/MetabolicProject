app.controller('problemWiseDietCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var diteID = 0;

    $scope.initControls = function () {
        dataFactory.problemWiseDietInitControl().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemList;
            $scope.foodList = result.foodList;
            $scope.unitList = result.unitList;
            $scope.mealList = result.mealList;
            $scope.problemWiseList = result.problemWiseList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveProblemWiseDiet = function () {

        if ($scope.ddlProblem == -1) {
            toaster.pop('error', "Error", 'Please Select Problem Name');
            return false;
        }
        if ($scope.ddlMeal == -1) {
            toaster.pop('error', "Error", 'Please Select Meal');
            return false;
        }


        var params = {
            id: diteID,
            problemID: $scope.ddlProblem,
            mealTimingID: $scope.ddlMeal,
            requiredCalorie: $scope.txtRequired,
            foodID: $scope.ddlFood,
            quantity: $scope.txtQuantity,
            unitID: $scope.ddlUnit,
            remark: $scope.txtRemark,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveProblemWiseDiet(params).then(function (response) {
            if (diteID > 0) {
                $rootScope.activityLog(response, 'UPDATE Problem Wise Diet', 'Problem Wise Diet', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteProblemWiseDiet = function (diteID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: diteID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteProblemWiseDiet(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Problem Wise Diet', 'Problem Wise Diet', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        diteID = row;
        var params = {
            id: row
        };
        dataFactory.problemWiseDietInitControl(params).then(function (response) {
            var result = response.data.problemWiseList[0];
            $scope.ddlProblem = result.problemID;
            $scope.ddlMeal = result.mealTimingID;
            $scope.txtRequired = result.requiredCalorie;
            $scope.ddlFood = result.foodID;
            $scope.txtQuantity = result.quantity;
            $scope.ddlUnit = result.unitID;
            $scope.txtRemark = result.remark;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlProblem = -1;
        $scope.ddlMeal = -1;
        $scope.ddlFood = -1;
        $scope.ddlUnit = -1;
        $scope.txtRequired = '';
        $scope.txtQuantity = '';
        $scope.txtRemark = '';
        diteID = 0;
    };

    $scope.initControls();
});