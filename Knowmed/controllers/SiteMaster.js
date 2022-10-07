app.controller('siteMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var siteID = 0;

    $scope.initControls = function () {
        dataFactory.siteMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.siteList = result.siteList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.saveSiteMaster = function () {
        if (isEmpty($scope.txtSiteName)) {
            toaster.pop('error', "Error", 'Please Enter Site Name !!');
            return false;
        }
        var params = {
            id: siteID,
            siteName: $scope.txtSiteName,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveSiteMaster(params).then(function (response) {
            var message = siteID > 0 ? 'UPDATE Site Master ' : 'SAVE Site Master ';
            $rootScope.activityLog(response, message, 'Site Master ', '');
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteSiteMaster = function (siteID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: siteID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteSiteMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE Site Master', 'Site Master', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (row) {
        siteID = row.id;
        var params = {
            id: row.id
        };
        dataFactory.siteMasterInitControl(params).then(function (response) {
            var result = response.data.siteList[0];
            $scope.txtSiteName = result.siteName;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.txtSiteName = '';
        siteID = 0;
    };

    $scope.initControls();
});