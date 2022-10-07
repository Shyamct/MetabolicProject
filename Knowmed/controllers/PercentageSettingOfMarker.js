app.controller('percentageSettingOfMarkerCtrl', function ($scope, dataFactory, toaster) {
    var existID = 0;
    $scope.markerList = '';
    var arr = [];


    $scope.initControls = function () {
        dataFactory.percentageSettingOfMarkerInitControl().then(function (response) {
            var result = response.data;
            $scope.headerMaster = result.headerMaster;
            $scope.rankMaster = result.rankMaster;
            $scope.phenomenon = result.phenomenon;
            $scope.flowDiagram = result.flowDiagram;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getProcess = function (diseaseID) {
       var params = {
           diseaseID: diseaseID,
        }
        dataFactory.percentageSettingOfMarkerGetProcess(params).then(function (response) {
            var result = response.data;
            $scope.rankMaster = result.rankMaster;
            $scope.phenomenon = result.phenomenon;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getPhenomena = function (processID, phenomenaID) {
        var params = {
            phenomenaID: phenomenaID,
            processID: processID
        }
        dataFactory.percentageSettingOfMarkerGetPhenomena(params).then(function (response) {
            var result = response.data;
            $scope.flowDiagram = result.flowDiagram;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
   
    $scope.getPercentageSettingOfMarker = function () {
        var params = {
            id: existID
        }
        dataFactory.getPercentageSettingOfMarker(params).then(function (response) {
            var result = response.data;
            $scope.percentageSettingOfMarkerList = result.assignPercentage;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.savePercentageSettingOfMarker = function () {

        if ($scope.ddlDisease == -1) {
            toaster.pop('error', "Error", 'Please Select Disease !!');
            return false;
        };
        if ($scope.ddlProcess == -1) {
            toaster.pop('error', "Error", 'Please Select Process !!');
            return false;
        };
        if ($scope.ddlPhenomenon == -1) {
            toaster.pop('error', "Error", 'Please Select Phenomenon !!');
            return false;
        };
        if ($scope.ddlMarker == -1) {
            toaster.pop('error', "Error", 'Please Select Marker !!');
            return false;
        };
        if (existID == 0 && $scope.markerList.length < 1) {
            toaster.pop('error', "Error", 'Please Add Atleast One Marker in List !!');
            return false;
        }
        if ($scope.ddlType == -1) {
            toaster.pop('error', "Error", 'Please Select Type !!');
            return false;
        };
        //if ($scope.markerList.length >)
        
        var params = {
            id: existID,
            lstMarkerList: $scope.markerList,
            diseaseID: $scope.ddlDisease,
            processID: $scope.ddlProcess,
            phenomenaID: $scope.ddlPhenomenon,
            markerID: $scope.ddlMarker,
            type: $scope.ddlType,
            percentage: $scope.txtPercentage,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.savePercentageSettingOfMarker(params).then(function (response) {
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
            $scope.getPercentageSettingOfMarker();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deletePercentageSettingOfMarker = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
            };
            dataFactory.deletePercentageSettingOfMarker(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.getPercentageSettingOfMarker();
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.AddMarker = function () {
        if ($scope.ddlMarker == 0) {
            toaster.pop('error', "Error", 'Please Select Marker');
            return false;
        }
        if ($scope.txtPercentage == 0 || $scope.txtPercentage > 100 || $scope.txtPercentage == undefined || $scope.txtPercentage == '' || $scope.txtPercentage == null) {
            toaster.pop('error', "Error", 'Please Enter valid Percentage');
            return false;
        }
        for (var i = 0; i < $scope.markerList.length; i++) {
            if ($scope.markerList[i].markerID == $scope.ddlMarker && $scope.markerList[i].type == $scope.ddlType && $scope.markerList[i].percentage == $scope.txtPercentage) {
                toaster.pop('error', "Error", 'Already Added To This Marker');
                return false;
            }
        }
        arr.push({
            markerID: $scope.ddlMarker,
            markerName: $('#ddlMarker option:selected').text().trim(),
            type: $scope.ddlType,
            typess: $('#ddlType option:selected').text(),
            percentage: $scope.txtPercentage
        });
        $scope.markerList = arr;
    };

    $scope.deleteMarker = function (index) {
        $scope.markerList.splice(index, 1);
    };

    $scope.edit = function (paramid) {
        $scope.isDisabled = true;
        existID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.getPercentageSettingOfMarker(params).then(function (response) {
            var result = response.data;
            var list = result.assignPercentage;
            $scope.ddlDisease = list[0].diseaseID;
            $scope.getProcess(list[0].diseaseID);
            $scope.ddlProcess = list[0].processID;
            $scope.getPhenomena(list[0].processID,'');
            $scope.ddlPhenomenon = list[0].phenomenaID;
            $scope.getPhenomena('',list[0].processID);
            $scope.ddlMarker = list[0].markerID;
            $scope.ddlType = list[0].type;
            $scope.txtPercentage = list[0].percentage;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.clr = function () {
        existID = 0;
        arr = [];
        $scope.markerList = '';
        $scope.markerList.length = 0;
        $scope.ddlDisease = -1;
        $scope.ddlProcess = -1;
        $scope.ddlPhenomenon = -1;
        $scope.ddlMarker = -1;
        $scope.ddlType = -1;
        $scope.txtPercentage = 0;
        $scope.isDisabled = false;
    };

    $scope.initControls();
  $scope.getPercentageSettingOfMarker();
});