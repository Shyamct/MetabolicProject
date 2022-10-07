app.controller('diseaseSpecialityCtrl', function ($scope, dataFactory, toaster) {
    
    var id = 0;

    $scope.initControls = function () {
        dataFactory.InitControlsDiseaseSpeciality().then(function (response) {
            var result = response.data;
            $scope.departmentList = result.departmentMaster;
           
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.GetDiseaseSpeciality = function () {
       
        var params = {
            id: id
        };
        dataFactory.DiseaseSpecialityList(params).then(function (response) {
            var result = response.data;
            $scope.diseaseSpecialityList = result.diseaseSpecialityList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.saveDiseaseqSpeciality = function () {
       
        if (id > 0) {
            if ($scope.ddlDepartment == 0) {
                toaster.pop('error', "Error", 'Please Select Department');
                return false;
            }
            if ($scope.txtSpecialityName == '') {
                toaster.pop('error', "Error", 'Please Enter Speciality Name');
                return false;
            }
        }
        var params = {
            id: id,
            departmentID: $scope.ddlDepartment,
            specialityName: $scope.txtSpecialityName,
            specialityClinical: $scope.txtSpecialityClinical,
            specialist: $scope.txtSpecialist,
            userId: Number(UtilsCache.getSession('USERDETAILS').userid)           
        };       
        dataFactory.SaveDiseaseSpeciality(params).then(function (response) {
            $scope.GetDiseaseSpeciality();
            $scope.clr();
            toaster.pop('success', "Success", 'Saved Successfully.');
           
        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };
    $scope.delete = function (id) {
        if (confirm("Are you sure want to delete?")) {
            var params = {
                id: id,
                userId: Number(UtilsCache.getSession('USERDETAILS').userid)
            };
            dataFactory.DeleteDiseaseSpeciality(params).then(function (response) {
                $scope.GetDiseaseSpeciality();
                $scope.clr();
                toaster.pop('success', "Success", 'Deleted Successfully.');
               
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }
    };
    $scope.edit = function (paramid) {
        
        id = paramid;
        var params = {
            id: paramid            
        };
        dataFactory.DiseaseSpecialityList(params).then(function (response) {
            var result = response.data;
            var list = result.diseaseSpecialityList;
            $scope.ddlDepartment = list[0].departmentID;
            $scope.txtSpecialityName = list[0].specialityName;
            $scope.txtSpecialityClinical = list[0].specialityDepartment;
            $scope.txtSpecialist = list[0].specialist;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };
    $scope.clr = function () {
        $scope.txtSpecialist = '';
        $scope.txtSpecialityName = '';
        $scope.txtSpecialityClinical = '';
        id = 0;
        $scope.ddlDepartment = 0;
    };
    $scope.initControls();
    $scope.GetDiseaseSpeciality();
});