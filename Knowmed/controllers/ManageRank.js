app.controller('manageRankCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, ASSETS) {
   
    var rankDetailID = 0;
    $scope.initControls = function () {
        var params = {
            id:null
        };
        dataFactory.initControls(params).then(function (response) {
            var result = response.data;
            $scope.PathwayList = result.pathwayList;
            $scope.RankList = result.rankList;
        }, function (error) {
            toaster.pop('error', "Error", error);
            });

        dataFactory.manageRankDetailList(params).then(function (response) {
            var result = response.data;
            $scope.rankDetailList = result.rankDetail;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.saveRankDetail = function () {
        
        var params = {
            id: rankDetailID,
            pathwayID: $scope.ddlPathway,
            rankDetail: $scope.ddlRank,
            title: $scope.txtTitle,
            colorCode: $scope.txtColorCode,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveManageRank(params).then(function (response) {
            $scope.initControls();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.edit = function (paramid) {
        rankDetailID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.manageRankDetailList(params).then(function (response) {
            var result = response.data;
            var list = result.rankDetail;
            $scope.ddlPathway = list[0].pathwayID;
            $scope.ddlRank = list[0].rankDetail;
            $scope.txtTitle = list[0].title;
            $scope.txtColorCode = list[0].colorCode;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteManageRank(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.initControls();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {
        $scope.txtColorCode = "";
        $scope.txtTitle = "";
        $scope.ddlPathway = -1;
        $scope.ddlRank = -1;
        rankDetailID = 0;
        
    };
    $scope.initControls();
   
});