app.controller('receptorColorCtrl', function ($scope, $state, toaster, $rootScope, dataFactory, ASSETS) {
   
    var receptorDetailsID = 0;
    $scope.nutrientMasterList = function () {
        var params = {
            id:null
        };
        dataFactory.receptorColorList(params).then(function (response) {
            var result = response.data;
            $scope.NutrientMasterList = result.nutrientMasterList;
        }, function (error) {
            toaster.pop('error', "Error", error);
            });

        dataFactory.receptorColorDetailList(params).then(function (response) {
            var result = response.data;
            $scope.receptorColorDetailList = result.receptorDetail;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    
    $scope.saveNutrientMaster = function () {
        
        var params = {
            id: receptorDetailsID,
            nutrientID: $scope.ddlNutrientMaster,
            title: $scope.txtTitle,
            colorCode: $scope.txtColorCode,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveReceptorColor(params).then(function (response) {

            var message = receptorDetailsID > 0 ? 'Update Receptor Color' : 'Save Receptor Color';
            $rootScope.activityLog(response, message, 'Receptor Color', '');

            $scope.nutrientMasterList();
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", ASSETS.errorMessage.isShow ? ASSETS.errorMessage.message : error);
        });
    };

    $scope.edit = function (paramid) {
        receptorDetailsID = paramid;
        var params = {
            id: paramid
        };
        dataFactory.receptorColorDetailList(params).then(function (response) {
            var result = response.data;
            var list = result.receptorDetail;
            $scope.ddlNutrientMaster = list[0].nutrientID;
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
            dataFactory.deleteReceptorColor(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.clr();
                $scope.nutrientMasterList();
                $rootScope.activityLog(response, 'Delete Receptor Color', 'Receptor Color', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.clr = function () {
        $scope.txtColorCode = "";
        $scope.txtTitle = "";
        $scope.ddlNutrientMaster = -1;
        receptorDetailsID = 0;
        
    };
    $scope.nutrientMasterList();
   
});