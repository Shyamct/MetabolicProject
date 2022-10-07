app.controller('subTestMasterCtrl', function ($scope, dataFactory, toaster, $rootScope) {

    var SubTestMasterId = 0;

    $scope.stMasterList = function () {

        dataFactory.SubTestMasterList().then(function (response) {
            var result = response.data;
            $scope.sampleTypeList = result.sampleTypeList;
            $scope.subTestMasterList = result.subTestMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }


    $scope.SaveSubTestMaster = function () {
        if ($scope.txtSubTestName == undefined || $scope.txtSubTestName == "") {
            alert('Enter Sub Test Name');
            return false;
        }
        var params = {
            id: SubTestMasterId,
            testName: $scope.txtSubTestName,
            sampleTypeID: $scope.ddlSample,
            interpretation: $scope.txtInterpretation,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveSubTestMaster(params).then(function (response) {
            $scope.stMasterList();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
            var message = SubTestMasterId > 0 ? 'UPDATE SUB TEST MASTER' : 'SAVE SUB TEST MASTER';
            $rootScope.activityLog(response, message, 'SUB TEST  MASTER', '');
          
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.DeleteSubTestMaster = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteSubTestMaster(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.stMasterList();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE SUB TEST MASTER', 'SUB TEST MASTER', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };


    $scope.edit = function (paramid) {
        SubTestMasterId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.SubTestMasterList(params).then(function (response) {
            var result = response.data;
            var list = result.subTestMaster;
            $scope.txtSubTestName = list[0].name;
            $scope.ddlSample = list[0].sampleTypeID;
            $scope.txtInterpretation = list[0].interpretation;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        SubTestMasterId = 0;
        $scope.ddlSample = -1;
        $scope.txtSubTestName = "";
        $scope.txtInterpretation = "";
    };

    $scope.stMasterList();

});