app.directive('tabHighlight', [function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var x, y, initial_background = '#c3d5e6';

            element
                .removeAttr('style')
                .mousemove(function (e) {
                    // Add highlight effect on inactive tabs
                    if (!element.hasClass('active')) {
                        x = e.pageX - this.offsetLeft;
                        y = e.pageY - this.offsetTop;

                        element
                            .css({ background: '-moz-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background })
                            .css({ background: '-webkit-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background })
                            .css({ background: 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background });
                    }
                })
                .mouseout(function () {
                    element.removeAttr('style');
                });
        }
    };
}]).directive('dynamic', ['$compile', function ($c) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function (html) {
                ele.html(html);
                $c(ele.contents())(scope);
            });
        }
    };
}]).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]).directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    }

    return {
        link: fn_link
    };
}]).directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            isBackDate: "="
        },
        link: function (scope, element, attrs, ngModelCtrl) {
            if (scope.isBackDate) {
                element.datepicker({
                    dateFormat: 'dd/mm/yy',
                    changeMonth: true,
                    changeYear: true,
                    maxDate: new Date()
                });
            } else {
                element.datepicker({
                    dateFormat: 'dd/mm/yy',
                    minDate: new Date(),
                    changeMonth: true,
                    changeYear: true
                });
            }
        }
    };
}).directive('jqdatepicker2', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true
            });
        }
    };
}).directive('medicineAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        medicineName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.getMedicineBySearch(obj).then(function (r) {
                        resultFilter = r.data.medicineMasterList;
                        var data = resultFilter;
                        if (data) {
                            angular.forEach(resultFilter, function (item) {

                                item['value'] = item['medicineName'];
                            });
                        }
                        response(resultFilter);
                    }, function (error) {

                    });

                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.medicineID = ui.item.id;
                        scope.medicineName = ui.item.medicineName;
                    });
                }

            });
        }
    };
}]).directive('foodfamilyAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;

                    var obj = {
                        foodFamilyName: request.term
                    };

                    var resultFilter = [];
                    dataFactory.getFoodFamilyBySearch(obj).then(function (r) {
                        resultFilter = r.data.foodFamilyMaster;
                        var data = resultFilter;
                        if (data) {

                            angular.forEach(resultFilter, function (item) {

                                item['value'] = item['foodFamily'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.foodFamilyID = ui.item.id;
                        scope.foodFamilyName = ui.item.foodFamilyName;
                    });
                }

            });
        }

    };
}]).directive('nutrientAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                autoFocus: true,
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        nutrientName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.getNutrientBySearch(obj).then(function (r) {
                        resultFilter = r.data.nutrientMasterList;
                        var data = resultFilter;
                        if (data) {

                            angular.forEach(resultFilter, function (item) {

                                item['value'] = item['nutrientName'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.id = ui.item.id;
                        scope.nutrientName = ui.item.nutrientName;
                    });
                }

            });
        }

    };
}]).directive('diseaseDetailsAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        diseaseName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.getDiseaseDetailsByName(obj).then(function (r) {
                        resultFilter = r.data.diseaseDetailsDiseaseNameList;
                        var data = resultFilter;
                        if (data) {

                            angular.forEach(resultFilter, function (item) {
                                item['value'] = item['diseaseName'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.diseaseID = ui.item.id;
                        scope.diseaseName = ui.item.diseaseName;
                    });
                }

            });
        }

    };
}]).directive('diseaseDepartmentAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        diseaseName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.getDiseaseDepartmentByName(obj).then(function (r) {
                        resultFilter = r.data.diseaseDepartmentList;
                        var data = resultFilter;

                        if (data) {

                            angular.forEach(resultFilter, function (item) {
                                item['value'] = item['diseaseName'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.diseaseDepartmentID = ui.item.id;
                        scope.departmentID = ui.item.departmentID;
                        scope.diseaseID = ui.item.diseaseID;
                        scope.diseaseName = ui.item.diseaseName;
                    });
                }

            });
        }

    };
}]).directive('ionLoader', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div id="fadeLoder"><div class="ion-loader"><svg class="ion-loader-circle"> <circle class="ion-loader-path" cx="50%" cy="50%" r="20" fill="none" stroke-miterlimit="10"/></svg></div></div>',
        link: function (scope, element) {
            angular.element(element).addClass('ion-hide');
            scope.$on('globalLoadingStart', function () {
                $("#fadeLoder").show();
                angular.element(element).toggleClass('ion-show ion-hide');
            });
            scope.$on('globalLoadingEnd', function () {
                $("#fadeLoder").hide();
                angular.element(element).toggleClass('ion-hide ion-show');
            });
        }
    };
}).directive('techniqueAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {

    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    var obj = {
                        searchKey: request.term
                    };
                    var resultFilter = [];
                    dataFactory.getTechniqueBySearch(obj).then(function (r) {
                        resultFilter = r.data.researchTechniqueList;
                        var data = resultFilter;
                        log(data);
                        if (data) {
                            angular.forEach(resultFilter, function (item) {
                                item['value'] = item['technique'];
                            });
                        }
                        response(resultFilter);
                    }, function (error) {

                    });

                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.techniqueID = ui.item.id;
                        scope.techniqueName = ui.item.technique;
                    });
                }

            });
        }
    };
}]).directive('foodNameAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;

                    var obj = {
                        foodName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.getFoodBySearch(obj).then(function (r) {
                        resultFilter = r.data.foodList;
                        var data = resultFilter;
                        if (data) {

                            angular.forEach(resultFilter, function (item) {

                                item['value'] = item['foodName'];
                            });
                        }
                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.foodID = ui.item.foodID;
                        scope.foodName = ui.item.foodName;
                    });
                }

            });
        }
    };
}]).directive('problemAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        diseaseName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.GetProblemByName(obj).then(function (r) {
                        resultFilter = r.data.problemNameList;
                        var data = resultFilter;
                        if (data) {

                            angular.forEach(resultFilter, function (item) {
                                item['value'] = item['problemName'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.problemID = ui.item.id;
                        scope.problemName = ui.item.problemName;
                    });
                }

            });
        }

    };
}]).directive('complicationAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        diseaseName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.GetProblemByName(obj).then(function (r) {
                        resultFilter = r.data.problemNameList;
                        var data = resultFilter;
                        if (data) {

                            angular.forEach(resultFilter, function (item) {
                                item['value'] = item['problemName'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.complicationID = ui.item.id;
                        scope.complicationName = ui.item.problemName;
                    });
                }

            });
        }

    };
}]).directive('brandAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        scope: {
            getUnitByBrandFn: "&"
        },
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        brandName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.BrandAutoComplete(obj).then(function (r) {
                        resultFilter = r.data.brandList;
                        var data = resultFilter;
                        log(data);
                        if (data) {

                            angular.forEach(resultFilter, function (item) {
                                item['value'] = item['brandName'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.getUnitByBrandFn({ id: ui.item.id, dosageFormID: ui.item.dosageFormID, dose: ui.item.dose, doseUnitID: ui.item.doseUnitID });
                    });
                }

            });
        }
    };
}]).directive('companyAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        companyName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.CompanyAutoComplete(obj).then(function (r) {
                        resultFilter = r.data.companyList;
                        var data = resultFilter;
                        log(data);
                        if (data) {

                            angular.forEach(resultFilter, function (item) {
                                item['value'] = item['companyName'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.companyID = ui.item.id;
                        scope.companyName = ui.item.company;
                    });
                }

            });
        }
    };
}]).directive('icdAutoComplete', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        ICDCode: request.term
                    };
                    var resultFilter = [];
                    dataFactory.GetProblemICDByName(obj).then(function (r) {
                        resultFilter = r.data.problemICDList;
                        var data = resultFilter;
                        log(data);
                        if (data) {
                            angular.forEach(resultFilter, function (item) {
                                item['value'] = item['icdCode'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.ICDCodeId = ui.item.icdid;
                        log(scope.ICDCodeId);
                        //scope.companyName = ui.item.company;
                    });
                }

            });
        }
    };
}]).directive('diseaseDetailsAutoCompleteForDifferentialDiagnosis', ['$filter', 'dataFactory', function ($filter, dataFactory) {
    return {
        restrict: 'A',

        link: function (scope, elem, attrs) {
            elem.autocomplete({
                source: function (request, response) {
                    //term has the data typed by the user
                    var params = request.term;
                    var obj = {
                        diseaseName: request.term
                    };
                    var resultFilter = [];
                    dataFactory.getDiseaseDetailsByName(obj).then(function (r) {
                        resultFilter = r.data.diseaseDetailsDiseaseNameList;
                        var data = resultFilter;
                        if (data) {

                            angular.forEach(resultFilter, function (item) {
                                item['value'] = item['diseaseName'];
                            });
                        }

                        response(resultFilter);
                    }, function (error) {

                    });
                },
                minLength: 2,
                select: function (event, ui) {
                    scope.$apply(function () {
                        scope.ddDiseaseID = ui.item.id;
                        scope.ddDiseaseName = ui.item.diseaseName;
                    });
                }
            });
        }
    }
}]);