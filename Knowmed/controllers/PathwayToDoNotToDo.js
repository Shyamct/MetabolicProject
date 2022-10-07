app.controller('pathwayToDoNotToDoCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var existID = 0;

    $scope.initControls = function () {
        
        dataFactory.initControlsPathwayFAQ().then(function (response) {
            var result = response.data;
            $scope.pathwayList = result.pathwayList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getReceptor = function () {
        var params = {
            pathwayID: $scope.ddlPathway
        };
        dataFactory.getPathway(params).then(function (response) {
            var result = response.data;
            $scope.phenomenonList = result.phenomenonList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.getPathwayToDoNotToDoList = function () {
        var params = {
            id: 0
        };
        dataFactory.getPathwayToDoNotToDoList(params).then(function (response) {
            var result = response.data;
            $scope.pathwayToDoNotToDoList = result.pathwayToDoNotToDoList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.save = function () {
        if ($scope.ddlPathway == 0) {
            toaster.pop('error', 'Please Select Disease');
            return false;
        }
        if ($scope.ddlReceptor == 0) {
            toaster.pop('error', 'Please Select Phenomenon');
            return false;
        }
        if (isEmpty($scope.txtToDo) && isEmpty($scope.txtNotToDo)) {
            toaster.pop('error', 'Please Enter To Do Or Not To Do');
            return false;
        }
        var params = {
            id: existID,
            pathwayID: $scope.ddlPathway,
            phenomenonID: $scope.ddlReceptor,
            toDo: $scope.txtToDo,
            notToDo: $scope.txtNotToDo,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.savePathwayToDoNotToDo(params).then(function (response) {
            var message = existID > 0 ? 'Update Pathway To Do Not To Do' : 'Save Pathway To Do Not To Do';
            $rootScope.activityLog(response, message, 'Pathway To Do Not To Do', '');
            $scope.getPathwayToDoNotToDoList();
            $scope.clear();
            toaster.pop('success', "Success", 'Saved Successfully.');
            
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (paramid) {
        $scope.clear();
        existID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.getPathwayToDoNotToDoList(params).then(function (response) {
            var result = response.data;
            var list = result.pathwayToDoNotToDoList;
            if (list.length > 0) {
                $scope.ddlPathway = list[0].pathwayID;
                $scope.ddlReceptor = list[0].receptorID;
                $scope.txtToDo = list[0].toDo;
                $scope.txtNotToDo = list[0].notToDo;
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userID: Number(UtilsCache.getSession('USERDETAILS').userid)
            };

            dataFactory.deletePathwayToDoNotToDo(params).then(function (response) {
                $scope.getPathwayToDoNotToDoList();
                $scope.clear();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Pathway To Do Not To Do', ' Pathway To Do Not To Do', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }

    };
    $scope.clear = function () {

        //$scope.ddlPathway = 0;
        //$scope.ddlReceptor = 0;
        $scope.txtToDo = '';
        $scope.txtNotToDo = '';
        existID = 0;
    };
        
    $scope.initControls();
    $scope.getPathwayToDoNotToDoList();
});