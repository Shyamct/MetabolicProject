app.controller('collegeMasterCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var collegeId = 0;


    $scope.initControls = function () {

        dataFactory.collegeMasterInitControl().then(function (response) {
            var result = response.data;
            $scope.stateList = result.stateList;
            $scope.collegeDetailsList = result.collegeDetailsList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveCollegeMaster = function () {
        if ($scope.ddlState == "-1") {
            toaster.pop('error', "Error", 'Please Select State Name');
            return false;
        }
        var params = {
            id: collegeId,
            stateID: $scope.ddlState,
            collegeName: $scope.txtCollegeName,
            universityName: $scope.txtUniversityName,
            management: $scope.rdMangmentType =='G'?'G':'P',
            approvedIntake: $scope.txtApprovedIntake,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveCollegeMaster(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (id) {
        collegeId = id;
        var params = {
            id: id,
            stateID: $scope.ddlState
        };
        dataFactory.collegeMasterInitControl(params).then(function (response) {
            var result = response.data.collegeDetailsList;

            $scope.ddlState = result[0].stateID;
            $scope.txtCollegeName = result[0].collegeName;
            $scope.txtUniversityName = result[0].universityName;
            $scope.rdMangmentType = result[0].management;
            $scope.txtApprovedIntake = result[0].approvedIntake;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
    $scope.deleteCollegeMaster = function (collegeId) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: collegeId,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteCollegeMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

  
    $scope.clr = function () {

        $scope.ddlState = '0';
        $scope.txtCollegeName = '';
        $scope.txtUniversityName = '';
        $scope.txtApprovedIntake = '';
        $scope.rdMangmentType = '';
        collegeId = 0;
    };
    $scope.initControls();
});



