app.controller('subTestSampleTypeCtrl', function ($scope, dataFactory, toaster, $rootScope) {
    var SubTestSampleTypeId = 0;

    $scope.sMasterList = function () {
        dataFactory.SampleMasterList().then(function (response) {
            var result = response.data;
            $scope.SampleMasterList = result.sampleMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }

    $scope.stMasterList = function () {
        dataFactory.SubTestMasterList().then(function (response) {
            var result = response.data;
            $scope.SubTestMasterList = result.subTestMaster;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }

    $scope.stSampleTypeList = function () {
        dataFactory.SubtestSampleTypeList().then(function (response) {
            var result = response.data;
            $scope.SubtestSampleTypeList = result.subtestSampleType;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }


    $scope.SaveSubTestSampleType = function () {        
        if ($scope.ddlSubTest == -1) {
            alert('Select Sub Test');
            return false;
        }
        if ($scope.ddlSample == -1) {
            alert('Select Sample');
            return false;
        }
        var params = {
            id: SubTestSampleTypeId,
            sampleId: $scope.ddlSample,
            subTestId: $scope.ddlSubTest,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.SaveSubtestSampleType(params).then(function (response) {
            var message = SubTestSampleTypeId > 0 ? 'Update Sub Test Sample Type' : 'Save Sub Test Sample Type';
            $rootScope.activityLog(response, message, 'Sub Test Sample Type', '');

            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.stSampleTypeList();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.DeleteSubTestSampleType = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteSubtestSampleType(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.stSampleTypeList();
                $scope.clr();
                $rootScope.activityLog(response, 'Delete Sub Test Sample Type', 'Sub Test Sample Type', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };

    $scope.edit = function (paramid) {
        SubTestSampleTypeId = paramid;
        var params = {
            id: paramid
        };
        dataFactory.SubtestSampleTypeList(params).then(function (response) {
            var result = response.data;
            var list = result.subtestSampleType;
            $scope.ddlSample = list[0].sampleID;
            $scope.ddlSubTest = list[0].subTestID;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {
        SubTestSampleTypeId = 0;
        $scope.ddlSample = -1;
        $scope.ddlSubTest = -1;
    };
    $scope.stSampleTypeList();
    $scope.sMasterList();
    $scope.stMasterList();
});