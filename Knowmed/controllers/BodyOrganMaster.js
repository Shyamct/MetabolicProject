app.controller('bodyOrganMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {
    var bodyOrganID = 0;

    $scope.initControls = function () {
        dataFactory.bodyOrganMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.bodyRegionList = result.bodyRegionList;
            $scope.departmentList = result.departmentList;
            $scope.bodyOrganRregionList = result.bodyOrganRregionList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
   
    $scope.saveBodyOrganMaster = function () {

        if (isEmpty($scope.txtBodyRegion)) {
            toaster.pop('error', "Error", 'Please Enter Body Region  !!');
            return false;
        };
        if ($scope.ddlBodyType == '') {
            toaster.pop('error', "Error", 'Please Select Body Type');
            return false;
        }
        if ($scope.ddlBodyRegion == -1) {
            toaster.pop('error', "Error", 'Please Select Region Name');
            return false;
        }
        if ($scope.ddlDepartment == -1) {
            toaster.pop('error', "Error", 'Please Select Department Name');
            return false;
        }
        
        var params = {
            id: bodyOrganID,
            regionName: $scope.txtBodyRegion,
            type: $scope.ddlBodyType,
            bodyRegionId: $scope.ddlBodyRegion,
            departmentID: $scope.ddlDepartment,
            description: $scope.txtDescription,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveBodyOrganMaster(params).then(function (response) {
            if (bodyOrganID > 0) {
                $rootScope.activityLog(response, 'UPDATE Body Organ Master', 'Body Organ Master', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteBodyOrganMaster = function (bodyOrganID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: bodyOrganID,
            };
            dataFactory.deleteBodyOrganMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                
                $rootScope.activityLog(response, 'Delete Body Organ Master', 'Body Organ Master', '');  
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (row) {
        bodyOrganID = row;
        var params = {
            id: row
        };
        dataFactory.bodyOrganMasterInitControl(params).then(function (response) {
            var result = response.data.bodyOrganRregionList[0];
            $scope.txtBodyRegion = result.regionName;
            $scope.ddlBodyType = result.type;
            $scope.ddlBodyRegion = result.bodyRegionId;
            $scope.ddlDepartment = result.departmentID;
            $scope.txtDescription = result.description;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        $scope.txtBodyRegion = '';
        $scope.ddlBodyType =  0 ;
        $scope.ddlBodyRegion = -1 ;
        $scope.ddlDepartment = -1;
        $scope.txtDescription = '';
        bodyOrganID = 0;
    };
    $scope.initControls();
});