app.controller('eCGWaveCauseCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var ecgWaveID = 0;
    var arr = [];
    $scope.addedEffectBodyList = [];

    $scope.initControls = function () {
        dataFactory.eCGWaveCauseInitControl().then(function (response) {
            var result = response.data;
            $scope.nutrientList = result.nutrientList;
            $scope.nutrientLevelList = result.nutrientLevelList;
            $scope.ecgWaveList = result.ecgWaveList;
            $scope.amplituEffectList = result.amplituEffectList;
            $scope.ecgIntervalList = result.ecgIntervalList;
            $scope.intervalEffectList = result.intervalEffectList;
            $scope.effectProblemList = result.effectProblemList;
            $scope.bookList = result.bookList;
            $scope.waveEffectList = result.waveEffectList;
            $scope.ecgWaveCauseList = result.ecgWaveCauseList;

            for (var i = 0; i < result.ecgWaveCauseList.length; i++) {
                $scope.ecgWaveCauseList[i].dtECGWaveEffectList = JSON.parse(result.ecgWaveCauseList[i].dtECGWaveEffectList);
            }

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.AddEffectBody = function () {
        if ($scope.nutrientID == 0) {
            toaster.pop('error', "Error", 'Please Select Effected Compond/Channel');
            return false;
        }
       
        arr.push({
            intervalEffectID: $("#ddlEffectOnBy option:selected").val().trim(),
            problemName: $("#ddlEffectOnBy option:selected").text().trim(),
           
        });

        $scope.addedEffectBodyList = arr;
    };
    $scope.deleteEffectBodyList = function (index) {
        $scope.addedEffectBodyList.splice(index, 1);
    };

    $scope.saveECGWaveCause = function () {

        if ($scope.ddlEffected == -1) {
            toaster.pop('error', "Error", 'Please Select Effected Compond/Channel');
            return false;
        }
       

        var params = {
            id: ecgWaveID,
            nutrientID: $scope.ddlEffected,
            nutrientLevelID: $scope.ddlChannel,
            ecgWaveID: $scope.ddlECGWave,
            amplituEffectID: $scope.ddlAmplitude,
            ecgIntervalID: $scope.ddlECGInterval,
            intervalEffectID: $scope.ddlInterval,
            waveEffectID: $scope.ddlWaveEffect,
            remark: $scope.txtRemark,
            bookID: $scope.ddlBook,
            pageNo: $scope.txtPageNo,
            edition: $scope.txtEdition,
            reference: $scope.txtReference,
            dtECGWaveEffectList: JSON.stringify($scope.addedEffectBodyList),
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveECGWaveCause(params).then(function (response) {
            if (ecgWaveID > 0) {
                $rootScope.activityLog(response, 'UPDATE ECG Wave Cause', 'ECG Wave Cause', '');
            }
            toaster.pop('success', "Success", 'Saved Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.deleteECGWaveCause = function (ecgWaveID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: ecgWaveID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteECGWaveCause(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE ECG Wave Cause', 'ECG Wave Cause', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.deleteECGWaveEffect = function (ecgWaveID) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: ecgWaveID,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.deleteECGWaveEffect(params).then(function (response) {
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $scope.initControls();
                $scope.clr();
                $rootScope.activityLog(response, 'DELETE EFFECT PROBLEM', 'EFFECT PROBLEM', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (row) {
        ecgWaveID = row;
        var params = {
            id: row
        };
        dataFactory.eCGWaveCauseInitControl(params).then(function (response) {
            var result = response.data.ecgWaveCauseList[0];

            log(result);

            $scope.ddlEffected = result.nutrientID;
            $scope.ddlChannel = result.nutrientLevelID;
            $scope.ddlECGWave = result.ecgWaveID;
            $scope.ddlAmplitude = result.amplituEffectID;
            $scope.ddlECGInterval = result.ecgIntervalID;
            $scope.ddlInterval = result.intervalEffectID;
            $scope.ddlWaveEffect = result.waveEffectID;
            $scope.txtRemark = result.remark;
            $scope.ddlBook = result.bookID;
            $scope.txtPageNo = result.pageNo;
            $scope.txtEdition = result.edition;
            $scope.txtReference = result.reference;
            if (result) {
                $scope.addedEffectBodyList = JSON.parse(result.dtECGWaveEffectList);
                arr = ($scope.addedEffectBodyList) ? $scope.addedEffectBodyList : [];
            }
            $scope.btndisabled = true;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };

    $scope.clr = function () {

        $scope.ddlEffected = 0;
        $scope.ddlChannel = 0;
        $scope.ddlECGWave = 0;
        $scope.ddlAmplitude = 0;
        $scope.ddlECGInterval = 0;
        $scope.ddlInterval = 0;
        $scope.ddlEffectOnBy = 0;
        $scope.ddlBook = 0;
        $scope.ddlWaveEffect = 0;
        $scope.txtPageNo = '';
        $scope.txtEdition = '';
        $scope.txtReference = '';
        $scope.txtRemark = '';
        $scope.btndisabled = false;
        ecgWaveID = 0;

        $scope.addedEffectBodyList = [];
        arr = [];
       
    };

    $scope.initControls();
});