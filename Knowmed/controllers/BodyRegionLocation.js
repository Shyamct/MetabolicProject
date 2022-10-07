app.controller('bodyRegionLocationCtrl', function ($scope, dataFactory, toaster) {
    var bodyID = 0;

    $scope.initControls = function () {
        dataFactory.bodyRegionLocationInitControl().then(function (response) {
            var result = response.data;
            $scope.bodyRegionlist = result.bodyOrganRegion;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.getBodyRegionLocation = function () {
        dataFactory.bodyRegionLocation().then(function (response) {
            var result = response.data;
            $scope.bodyRegionLocation = result.bodyRregionLocation;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveBodyRegionLocation = function () {

        if ($scope.ddlBodyRegion == -1) {
            toaster.pop('error', "Error", 'Please Select Body Region Type !!');
            return false;
        };
        if (isEmpty($scope.txtRegion)) {
            toaster.pop('error', "Error", 'Please Enter Region  !!');
            return false;
        };
        if (isEmpty($scope.txtRemark)) {
            toaster.pop('error', "Error", 'Please Enter Remark  !!');
            return false;
        };
        
        var params = {

            id: bodyID,
            regionID: $scope.ddlBodyRegion,
            subRegion: $scope.txtRegion,
            remark: $scope.txtRemark,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveBodyRegionLocation(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.getBodyRegionLocation();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteBodyRegionLocation = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
            };
            dataFactory.deleteBodyRegionLocation(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getBodyRegionLocation();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        bodyID = paramid;
        var params = {
            id: paramid,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)

        };
        dataFactory.bodyRegionLocation(params).then(function (response) {
            var result = response.data;
            var list = result.bodyRregionLocation;
            $scope.ddlBodyRegion = list[0].regionID;
            $scope.txtRegion = list[0].subRegion;
            $scope.txtRemark = list[0].remark;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.clr = function () {
        $scope.ddlBodyRegion = -1;
        $scope.txtRegion = '';
        $scope.txtRemark = '';
        bodyID = 0;
    };
    $scope.initControls();
    $scope.getBodyRegionLocation();
});