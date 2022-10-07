app.controller('studyReferenceReportCtrl', function ($scope, dataFactory, toaster) {

    $scope.initControls = function () {
        dataFactory.InitControlsStudyReference().then(function (response) {
            var result = response.data;
            $scope.problemList = result.problemList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getParameterList = function () {
        var params = {
            diseaseID: $scope.ddlProblem,
            phenomenonID: $scope.ddlPhenomenon
        };
        dataFactory.GetStudyReferenceParameterList(params).then(function (response) {
            var result = response.data;
            $scope.parameterList = result.parameterList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getNutrientBarrierDetails = function () {

        var params = {
            nutrientID: $scope.ddlMarker
        };
        dataFactory.NutrientBarrierList(params).then(function (response) {
            var result = response.data;
            $scope.selectedBloodBarrierList = result.nutrientBarrierList;


        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getAssociatedProblemAndcentralCompound = function () {
        var params = {
            diseaseID: $scope.ddlProblem
        };
        dataFactory.GetAssociatedProblemAndcentralCompound(params).then(function (response) {
            var result = response.data;
            $scope.phenomenonList = result.phenomenonList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getStudyReferenceDetailList = function () {
        var params = {
            diseaseID: $scope.ddlProblem,
            phenomenonID: $scope.ddlPhenomenon,
            process: $scope.ddlParameter
        };
        dataFactory.GetStudyReferenceDetailList(params).then(function (response) {
            var result = response.data;
            $scope.studyReferenceList = result.studyReferenceList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.getStudyReferenceGraph = function () {
        if ($scope.ddlProblem==0) {
            toaster.pop('error', "Error", 'Please Select Disease !!');
            return;
        }
        var obj = {
            diseaseID: $scope.ddlProblem
        };
        dataFactory.getStudyReferenceGraph(obj).then(function (response) {
            $('#content').empty();
            var result = response.data;
            var data = result.studyReferenceGraphList;
            if (data && data.length > 0) {

                $('#agentFactorModal').modal('show');
                //$scope.showGraph = true;

                var category = [];
                var rda = [];

                for (var i = 0; i < data.length; i++) {
                    category.push(data[i].studyFor);
                    rda.push(data[i].studyCount);
                }

                var series = [{
                    name: 'Study Reference Graph',
                    data: rda,
                    color: '#434348'

                }];

                chart(category, series, 'Total Studies', 'No of Studies', 'content');
            }           

        }, function (error) {
            toaster.pop('error', "Error", error.data);
        });
    };

    function chart(categories, series, title, yAxisTitle, divId) {
        // Graph for Study Reference 
        Highcharts.chart(divId, {
            chart: {
                type: 'column'
            },
            title: {
                text: title
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: yAxisTitle
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        inside: false
                    }
                }
            },
            series: series

        });

    }

    $scope.printDiv = function (printDetail) {

        setTimeout(function () {
            docprint = window.open("");
            docprint.document.write('<html><head><title>Print</title>');
            docprint.document.write('</head><body style="background-position:center!important;background-size:50%!important;margin:0">');
            docprint.document.write($('#' + printDetail).html());
            docprint.document.write('</body></html>');
            $scope.$apply(function () {
            });
            setTimeout(function () {
                docprint.print();
                docprint.close();
            }, 500);

        }, 500);
    };


    $scope.initControls();
    $scope.getStudyReferenceDetailList();
});