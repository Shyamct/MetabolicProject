app.controller('mergePathwayKeywordsCtrl', function ($scope, dataFactory, $rootScope, toaster) {   
 
    $scope.initControls = function () {
        dataFactory.InitControlsMergePathwayKeywords().then(function (response) {
            var result = response.data;           
            $scope.oldPathwayNutrientList = result.oldPathwayNutrientList;
            $scope.newPathwayNutrientList = result.newPathwayNutrientList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.initControlsPhenomeon = function () {
        dataFactory.InitControlsPhenomenon().then(function (response) {
            var result = response.data;
            $scope.phenomenonList = result.phenomenonList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.initControlsPathway = function () {
        dataFactory.InitControlsPathway().then(function (response) {
            var result = response.data;
            $scope.pathwayList = result.pathwayList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.saveMergePathwayKeywords = function () {
       
        if ($scope.ddlOldPathwayKeywords == 0) {
            toaster.pop('error', "Error", 'Please Select Old Keyword');
            return false;
        }
        if ($scope.ddlNewPathwayKeywords == 0) { 
            toaster.pop('error', "Error", 'Please Select New Keyword');
            return false;
        }
        var params = {          
            oldNutrientName: $scope.ddlOldPathwayKeywords,
            newNutrientName: $scope.ddlNewPathwayKeywords,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.MergePathwayKeywords(params).then(function (response) {
            var message = ' MERGE PATHWAY KEYWORDS' ;
            $rootScope.activityLog(response, message, 'MERGE PATHWAY KEYWORDS', '');
            $scope.ddlOldPathwayKeywords = 0;  
            $scope.initControls();  
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };   

    $scope.saveMergePhenomenon = function () {

        if ($scope.ddlOldPhenomenon == 0) {
            toaster.pop('error', "Error", 'Please Select Old Phenomenon');
            return false;
        }
        if ($scope.ddlNewPhenomenon == 0) {
            toaster.pop('error', "Error", 'Please Select New Phenomenon');
            return false;
        }
        if ($scope.ddlNewPhenomenon == $scope.ddlOldPhenomenon) {
            toaster.pop('error', "Error", 'Please Select Different Phenomenon Both Sides');
            return false;
        }
        var params = {
            oldPhenomenonID: $scope.ddlOldPhenomenon,
            newPhenomenonID: $scope.ddlNewPhenomenon,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };

        dataFactory.SaveMergePhenomenon(params).then(function (response) {
            var message = ' MERGE PHENOMENON';
            $rootScope.activityLog(response, message, 'MERGE PHENOMENON', '');
            $scope.oldPhenomenonID = 0;
            $scope.initControlsPhenomeon();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };   

    $scope.saveMergePathway = function () {

        if ($scope.ddlOldPathway == 0) {
            toaster.pop('error', "Error", 'Please Select Old Pathway');
            return false;
        }
        if ($scope.ddlNewPathway == 0) {
            toaster.pop('error', "Error", 'Please Select New Pathway');
            return false;
        }
        if ($scope.ddlNewPathway == $scope.ddlOldPathway) {
            toaster.pop('error', "Error", 'Please Select Different Pathway Both Sides');
            return false;
        }
        var params = {
            oldPathwayID: $scope.ddlOldPathway,
            newPathwayID: $scope.ddlNewPathway,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveMergePathway(params).then(function (response) {
            var message = ' MERGE PATHWAY';
            $rootScope.activityLog(response, message, 'MERGE PATHWAY', '');
            //$scope.ddlOldPathwayKeywords = 0;
            $scope.initControlsPathway();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };   
   
    $scope.initControls();
    $scope.initControlsPhenomeon();
    $scope.initControlsPathway();
});