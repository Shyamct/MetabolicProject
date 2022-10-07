app.controller('addToxinsInhibitorCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var toxinsID = 0;
    $scope.addedRankList = [];
    $scope.rdType = 10;
    var problemMasterList = [];
    var bacteriaVirusList = [];
    var medicineMasterList = [];

    $scope.initControls = function () {
        dataFactory.addToxinsInhibitorInitControl().then(function (response) {
            var result = response.data;

            $scope.dockingTypeList = result.dockingTypeList;
            $scope.toxinProteinList = result.toxinProteinList;
            $scope.inhibitorList = result.inhibitorList;

            problemMasterList = result.problemMasterList;
            bacteriaVirusList = result.bacteriaVirusList;         
            medicineMasterList = result.medicineMasterList;
            $scope.targetOrganismList = result.bacteriaVirusList;
            $scope.siteMasterList = result.siteMasterList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getToxinsInhibitorList = function () {
        var params = {
            id: toxinsID,
            keyword:$scope.search
        };
        dataFactory.getToxinsInhibitorList(params).then(function (response) {
            var result = response.data;

            $scope.toxinsInhibitorList = result.toxinsInhibitorList;
            for (var i = 0; i < result.toxinsInhibitorList.length; i++) {
                result.toxinsInhibitorList[i].interactedNutrientList = JSON.parse(result.toxinsInhibitorList[i].interactedNutrientList);
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.filterDockingReference = function () {
        if ($scope.ddlDockingType == 1) {
            $scope.dockingReferenceList = problemMasterList;
        }
        else if ($scope.ddlDockingType == 2) {
            $scope.dockingReferenceList = bacteriaVirusList;
        }
        else if ($scope.ddlDockingType == 3) {
            $scope.dockingReferenceList = medicineMasterList;
        }
        else {
            $scope.dockingReferenceList = [];
        }
    };
        
    $scope.AddRank = function () {        
        var interactionrd = $scope.rdType;
        var typeName = '';
        if (interactionrd == 10) {
            typeName = 'Inhibitor';
        } else if (interactionrd == 42) {
            typeName = 'No Effect';
        }
        else {
            typeName = 'Activator';
        }
        if ($scope.toxinProteinID == 0) {
            toaster.pop('error', "Error", 'Please Select Toxins Protein');
            return false;
        }
        //if ($scope.addedRankList.some(data => data.inhibitorID == $scope.ddlInhibitor)) {
        //    toaster.pop('error', "Error", 'Already exists');
        //    return false;
        //}
        $scope.addedRankList.push({
            inhibitorID: $scope.ddlInhibitor,
            inhibitorName: $("#ddlInhibitor option:selected").text().trim(),
            typeID: $scope.rdType,
            siteID: $scope.ddlSite,
            siteName: $("#ddlSite option:selected").text().trim(),
            typeName: typeName,
            ranks: $scope.txtRank,
            scores: $scope.txtScore
        });
    };
    $scope.deleteRankList = function (index) {
        $scope.addedRankList.splice(index, 1);
    };

    $scope.saveAddToxinsInhibitor = function () {
        if ($scope.ddlProtein == 0) {
            toaster.pop('error', "Error", 'Please Select Toxins Protein ');
            return false;
        }
        var params = {
            id: toxinsID,
            dockingTypeId: $scope.ddlDockingType,
            dockingReferenceId: $scope.ddlDockingReference,
            targetOrganism: $scope.ddlTargetOrganism,
            toxinProteinID: $scope.ddlProtein,
            reference: $scope.txtReference,
            url: $scope.txtUrl,
            dtToxinsInhibitorList: JSON.stringify($scope.addedRankList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };        
        dataFactory.saveAddToxinsInhibitor(params).then(function (response) {
            if (toxinsID > 0) {
                $rootScope.activityLog(response, 'UPDATE ADD TOXINS INHIBITOR', 'ADD TOXINS INHIBITOR', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clear();
            $scope.getToxinsInhibitorList();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    //$scope.editAddToxinsInhibitor = function (rowid) {
    //    toxinsID = rowid;
    //    var params = {
    //        id: toxinsID
    //    };
    //    dataFactory.getToxinsInhibitorList(params).then(function (response) {
    //        var result = response.data;
    //        var list = JSON.parse(result.toxinsInhibitorList[0].result);
    //        log(list);


    //    }, function (error) {
    //        toaster.pop('error', "Error", error);
    //    });
    //};

    $scope.deleteInhibitorRank = function (toxinsID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: toxinsID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteInhibitorRank(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clear();
                $scope.getToxinsInhibitorList();
                $rootScope.activityLog(response, 'DELETE INHIBITOR RANK', 'INHIBITOR RANK', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clear = function () {

        $scope.ddlInhibitor = 0;
        $scope.txtReference = '';
        $scope.txtRank = '';
        $scope.ddlSite = 0;
        $scope.ddlProtein = 0;
        $scope.txtScore = '';
        $scope.txtUrl = '';
        toxinsID = 0;
        $scope.addedRankList = [];
    };

    $scope.initControls();
    $scope.getToxinsInhibitorList();
});