app.controller('molecularLibraryCtrl', function ($scope, dataFactory, $rootScope, toaster) {

    var moleculaID = 0;
    var pFile = '';
    var addedPFiles = [];
    $scope.addedPFileList = [];

    $scope.initControls = function () {
        dataFactory.molecularLibraryInitControl().then(function (response) {
            var result = response.data;
            $scope.molecularList = result.molecularList;
            $scope.unitList = result.unitList;
            $scope.solubilityList = result.solubilityList;
            $scope.solubleNameList = result.solubleNameList;
            $scope.molecularLibraryList = result.molecularLibraryList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };


    $scope.getStructureFiles = function ($files) {
        formdata = new FormData();
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);

        });
        $scope.addNewsFiles();
    };

    $scope.addNewsFiles = function () {
        addedPFiles = [];
        dataFactory.samFiles(formdata).then(function (response) {
            var result = response.data;
            for (var i = 0; i < result.length; i++) {
                if (i == (result.length - 1)) {
                    addedPFiles.push({
                        filePath: result[i]
                    });
                }
            }

            $scope.addedPFileList = addedPFiles;
            console.log($scope.addedPFileList);
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.saveMolecularLibrary = function () {

        if ($scope.ddlMolecular == 0) {
            toaster.pop('error', "Error", 'Please Select Molecular Name');
            return false;
        }
        if ($scope.addedPFileList) {
            for (var i = 0; i < $scope.addedPFileList.length; i++) {
                pFile = $scope.addedPFileList[0].filePath;
            }
        }
       
        
        var params = {
            id: $scope.ddlMolecular,           
            synonym: $scope.txtSynonym,           
            molecularWeight: $scope.txtMolecularWeight,
            molecularWeightUnitID: $scope.ddlUnit,
            molecularFormula: $scope.txtFormula,
            molecularSmileys: $scope.txtSmileys,
            solubilityID: $scope.ddlSolubility,
            meltingPoint: $scope.txtMeltingPoint,
            boilingPoint: $scope.txtBoilingPoint,
            structureImage: pFile,
            soluble: $scope.ddlSolubilityName,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.saveMolecularLibrary(params).then(function (response) {
            var message = moleculaID > 0 ? 'Update Molecular Library' : 'Update Molecular Library';
            $rootScope.activityLog(response, message, 'Molecular Library', '');
            toaster.pop('success', "Success", 'Update Successfully.');
            $scope.initControls();
            $scope.clr();
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    $scope.edit = function (row) {
        moleculaID = row;
        var params = {
            id: row
        };
        dataFactory.molecularLibraryInitControl(params).then(function (response) {
            var result = response.data.molecularLibraryList[0];
            $scope.ddlMolecular = row;
            $scope.txtSynonym = result.synonym;
            $scope.txtMolecularWeight = result.molecularWeight;
            $scope.ddlUnit = result.molecularWeightUnitID;
            $scope.txtFormula = result.molecularFormula;
            $scope.txtSmileys = result.molecularSmileys;
            $scope.txtMeltingPoint = result.meltingPoint;
            $scope.txtBoilingPoint = result.boilingPoint;
            $scope.ddlSolubility = result.solubilityID;
            $scope.ddlSolubilityName = result.soluble;
            $scope.addedPFileList = result.structureImage;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });

    };


    $scope.clr = function () {
        $scope.ddlMolecular = 0;
        $scope.ddlUnit = 0;
        $scope.txtSynonym = '';
        $scope.txtMolecularWeight = '';
        $scope.txtFormula = '';
        $scope.txtSmileys = '';
        $scope.ddlSolubility = 0;
        $scope.ddlSolubilityName = 0;
        $scope.txtMeltingPoint = '';
        $scope.txtBoilingPoint = '';
        $scope.addedPFileList = [];
        addedPFiles = [];
        pFile = '';

      //  $('#fileFoodFamily').val('');
        moleculaID = 0;
    };


    $scope.initControls();
});