app.controller('phenomenonMasterCtrl', function ($scope, $rootScope, dataFactory, toaster) {
    var existID = 0; 
        
    $scope.getPhenomenonList = function () {
        var params = {
            id: 0 
        };
        dataFactory.getPhenomenonList(params).then(function (response) {
            var result = response.data;
            $scope.pathwayPhenomenonList = result.pathwayPhenomenonList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.getRankList = function () {
        var params = {
            id: 0
        };
        dataFactory.getRankList(params).then(function (response) {
            var result = response.data;
            $scope.rankList = result.rankList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.getParameterList = function () {
        var params = {
            id: 0
        };
        dataFactory.getParameterList(params).then(function (response) {
            var result = response.data;
            $scope.parameterList = result.parameterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.save = function () {
        if (isEmpty($scope.txtPhenomenonName)) {
            toaster.pop('error', 'Please Enter Phenomenon Name');
            return false;
        } 
        if (isEmpty($scope.txtColorCoding)) {       
            toaster.pop('error', 'Please Enter Color Coding');
            return false;
        }  
        var params = {
            id: existID,          
            phenomenonName: $scope.txtPhenomenonName,
            colorCoding: $scope.txtColorCoding,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.savePhenomenon(params).then(function (response) {

            var message = existID > 0 ? 'UPDATE PHENOMENON MASTER' : 'SAVE PHENOMENON MASTER';
            $rootScope.activityLog(response, message, 'PHENOMENON MASTER', '');

            $scope.getPhenomenonList();
            $scope.clear();
            toaster.pop('success', "Success", 'Saved Successfully.');
            
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.saveRank = function () {
        if (isEmpty($scope.txtRankName)) {
            toaster.pop('error', 'Please Enter Process Name');
            return false;
        }
        var params = {
            id: existID,
            rankName: $scope.txtRankName,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveRank(params).then(function (response) {
            var message = existID > 0 ? 'UPDATE RANK MASTER' : 'SAVE RANK MASTER';
            $rootScope.activityLog(response, message, 'RANK MASTER', '');
            $scope.getRankList();
            $scope.clear();
            toaster.pop('success', "Success", 'Saved Successfully.');

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.saveParameter = function () {
        if (isEmpty($scope.txtParameterName)) {
            toaster.pop('error', 'Please Enter Parameter Name');
            return false;
        }
        var params = {
            id: existID,
            parameterName: $scope.txtParameterName,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveParameter(params).then(function (response) {
            var message = existID > 0 ? 'UPDATE PARAMETER MASTER' : 'SAVE PARAMETER MASTER';
            $rootScope.activityLog(response, message, 'PARAMETER MASTER', '');
            $scope.getParameterList();
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
        dataFactory.getPhenomenonList(params).then(function (response) {
            var result = response.data;
            var list = result.pathwayPhenomenonList;           
            if (list.length > 0) {
                $scope.txtPhenomenonName = list[0].pathwayName;
                $scope.txtColorCoding = list[0].colorCoding;
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.editRank = function (paramid) {
        $scope.clear();
        existID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.getRankList(params).then(function (response) {
            var result = response.data;
            var list = result.rankList;
            if (list.length > 0) {             
                    $scope.txtRankName = list[0].rankName;
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.editParameter = function (paramid) {
        $scope.clear();
        existID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.getParameterList(params).then(function (response) {
            var result = response.data;
            var list = result.parameterList;
            if (list.length > 0) {
                $scope.txtParameterName = list[0].parameterName;
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
  
    $scope.clear = function () { 
        $scope.txtPhenomenonName = '';
        $scope.txtColorCoding = '';
        $scope.txtRankName = '';
        $scope.txtParameterName = '';
        existID = 0;
    };
   
    $scope.getPhenomenonList();
    $scope.getRankList();
    $scope.getParameterList();
});