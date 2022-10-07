app.controller('medicineGroupAssignCtrl', function ($scope, dataFactory, toaster, $rootScope) {
 
    var assignedMedicineGroupID = 0;
  
    $scope.assignedMedicineGroupList = "";

    $scope.initControls = function () {
        dataFactory.InitControlsMedicineGroup().then(function (response) {
            var result = response.data;
         
            $scope.medicineGroupMasterList = result.medicineGroupMaster;
            $scope.medicineList = result.medicineMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.GetAssignedMedicineGroup = function () {
        
        var params = {
            id: $scope.ddlMedicineGroup
        };
        dataFactory.assignedMedicineGroupList(params).then(function (response) {
            var result = response.data;
            $scope.assignedMedicineGroupList = result.medicineGroup;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getAssignedMedicineGroup = function () { 
        $scope.clr();
        var params = {
            id: assignedMedicineGroupID
        };
        dataFactory.assignedMedicineGroupList(params).then(function (response) {
            var result = response.data;
            $scope.assignedMedicineGroupList = result.medicineGroup;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  

    $scope.saveAssignedMedicineGroup = function () {

        if (assignedMedicineGroupID == 0) {
            if ($scope.ddlMedicineGroup == '') {
                toaster.pop('error', "Error", 'Please Select Group ');
                return false;
            }
            if ($scope.ddlMedicine == '') {
                toaster.pop('error', "Error", 'Please Select Medicine ');
                return false;
            }
        }
        var params = {
            id: assignedMedicineGroupID,
            groupID: $scope.ddlMedicineGroup,
            medicineID: $scope.ddlMedicine,

            userId: Number(UtilsCache.getSession('USERDETAILS').userid)

        };

        dataFactory.SaveAssignedMedicineGroup(params).then(function (response) {
            var message = assignedMedicineGroupID > 0 ? 'Update Assign Medicine Group' : 'Save Assign Medicine Group';
            $rootScope.activityLog(response, message, 'Assign Medicine Group', '');
            $scope.getAssignedMedicineGroup();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.deleteAssigned = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteAssignedMedicineGroup(params).then(function (response) {
                $scope.getAssignedMedicineGroup();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Assign Medicine Group', ' Assigned Medicine Group', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.editAssigned = function (paramid) {

        assignedMedicineGroupID = paramid;
        var params = {
            id: paramid

        };
        dataFactory.assignedMedicineGroupList(params).then(function (response) {
            var result = response.data;
            var list = result.medicineGroup;
            $scope.ddlMedicineGroup = list[0].groupID;
            $scope.ddlMedicine = list[0].medicineID;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };
 $scope.clr = function () {

       
     $scope.ddlMedicine = 0;
     $scope.ddlMedicineGroup = 0;
     assignedMedicineGroupID = 0;

    };
    $scope.initControls();
    $scope.getAssignedMedicineGroup();
});