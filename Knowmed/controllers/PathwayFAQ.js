app.controller('pathwayFAQCtrl', function ($scope, dataFactory, toaster, $rootScope) {
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

    $scope.getPathwayFAQList = function () {
        var params = {
            id: 0 
        };
        dataFactory.getPathwayFAQList(params).then(function (response) {
            var result = response.data;
            $scope.pathwayFAQList = result.pathwayFAQList;
        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    }; 

    $scope.save = function () {
        if ($scope.ddlPathway==0) {
            toaster.pop('error', 'Please Select Disease');
            return false;
        }   
        if ($scope.ddlReceptor == 0) {
            toaster.pop('error', 'Please Select Phenomenon');
            return false;
        }   
        if (isEmpty($scope.txtQuestion)) {       
            toaster.pop('error', 'Please Enter Question');
            return false;
        }    
        if (isEmpty($scope.txtAnswer)) {
            toaster.pop('error', 'Please Enter Answer');
            return false;
        }    
        var params = {
            id: existID,          
            pathwayID: $scope.ddlPathway,
            phenomenonID: $scope.ddlReceptor,
            question: $scope.txtQuestion,
            answer: $scope.txtAnswer,
            userID: Number(UtilsCache.getSession('USERDETAILS').userid)
        };
        dataFactory.savePathwayFAQ(params).then(function (response) {
            var message = existID > 0 ? 'Update Pathway FAQ' : 'Save Pathway FAQ';
            $rootScope.activityLog(response, message, 'Pathway FAQ', '');

            $scope.getPathwayFAQList();
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
        dataFactory.getPathwayFAQList(params).then(function (response) {
            var result = response.data;
            var list = result.pathwayFAQList;           
            if (list.length > 0) {
                $scope.ddlPathway = list[0].pathwayID;
                $scope.ddlReceptor = list[0].receptorID;
                $scope.txtQuestion = list[0].question;
                $scope.txtAnswer = list[0].answer;
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

            dataFactory.deletePathwayFAQ(params).then(function (response) {
                $scope.getPathwayFAQList();
                $scope.clear();
                toaster.pop('success', "Success", 'Deleted Successfully.');
                $rootScope.activityLog(response, 'Delete Pathway FAQ', ' Pathway FAQ', '');
            }, function (error) {
                toaster.pop('error', "Error", error);
            });
        }

    };
    $scope.clear = function () {    

        $scope.txtQuestion = '';
        $scope.txtAnswer = '';
        existID = 0;
    };

    $scope.initControls();
    $scope.getPathwayFAQList();
});