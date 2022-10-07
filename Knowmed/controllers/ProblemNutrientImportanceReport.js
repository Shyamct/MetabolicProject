app.controller('problemNutrientImportanceReportCtrl', function ($scope, dataFactory, toaster) {

    var addedNutrientList = [];

    $scope.GetNutrientSearch = function (query) {
        var obj = {
            searchkey: query
        };
        return dataFactory.getNutrientSearch(obj).then(function (response) {

            return response.data.table;

        }, function (error) {

        });
    };

    $scope.tagAdded = function (tag) {

        addedNutrientList.push({
            nutrientID: tag.nutrientID
        });

    };

    $scope.tagRemoved = function (tag) {
        for (var i = 0; i < addedNutrientList.length; i++) {
            if (addedNutrientList[i].nutrientID === tag.nutrientID) {
                addedNutrientList.splice(i, 1);
            }
        }
    };

    $scope.getNutrientImportanceReport = function () {

        var nutrientList = '';
        for (var i = 0; i < addedNutrientList.length; i++) {
            nutrientList += addedNutrientList[i].nutrientID + ',';
        }
        var params = {
            nutrientList: nutrientList
        };
        dataFactory.getProblemNutrientImportanceReport(params).then(function (response) {
            var result = response.data;
            $scope.problemNutrientImportanceReport = result.problemNutrientImportanceReport;

            //for (var i = 0; i < result.problemNutrientImportanceReport.length; i++) {
            //    $scope.problemNutrientImportanceReport[i].sequenceList = JSON.parse(result.problemNutrientImportanceReport[i].sequenceList);
            //}

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.clear = function () {
        addedNutrientList = [];
        $scope.problemNutrientImportanceReport = '';
        $scope.problemNutrientImportanceReport.length = 0;
        $scope.tagsNutrient = '';
    };

});