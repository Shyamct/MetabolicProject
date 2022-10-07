app.controller('nutrientInteractionRankCtrl', function ($scope, dataFactory, $rootScope, toaster, $state) {

    var problemMasterList = [];
    var bacteriaVirusList = [];
    var medicineMasterList = [];

    $scope.initControls = function () {
        dataFactory.addToxinsInhibitorInitControl().then(function (response) {
            var result = response.data;

            $scope.dockingTypeList = result.dockingTypeList;
            $scope.toxinProteinList = result.toxinProteinList;
            $scope.inhibitorList = result.inhibitorList;

            problemMasterList = result.problemMasterList;
            bacteriaVirusList = result.bacteriaVirusList;
            medicineMasterList = result.medicineMasterList;
            $scope.targetOrganismList = result.bacteriaVirusList;

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    $scope.filterDockingReference = function () {
        if ($scope.ddlDockingType == 1) {
            $scope.dockingReferenceList = problemMasterList;
        }
        else if ($scope.ddlDockingType == 2) {
            $scope.dockingReferenceList = bacteriaVirusList;
        }
        else if ($scope.ddlDockingType == 3) {
            $scope.dockingReferenceList = medicineMasterList;
        }
        else {
            $scope.dockingReferenceList = [];
        }

        $scope.ddlDockingReference = 0;
        $scope.nutrientRankReport();
    };

    $scope.nutrientRankReport = function () {
        var params = {
            dockingTypeId: $scope.ddlDockingType,
            dockingReferenceId: $scope.ddlDockingReference
        };
        dataFactory.nutrientRankReport(params).then(function (response) {
            var result = response.data;
            var nutrientList = result.nutrientList;
            var interactionList = result.interactionList;
            var foodNutrientList = result.foodNutrientList;

            var col = ['SNo.'];
            angular.forEach(foodNutrientList, function (key) {
                if (!col.some(data => data == key.foodName)) {
                    this.push(key.foodName);
                }
            }, col);

            col.push('#');
            angular.forEach(nutrientList, function (key) {
                this.push(key.nutrientName);
            }, col);


            // CREATE DYNAMIC TABLE.
            //var table = document.getElementById("tblNutrientRank"); 
            var table = document.createElement("table");
            table.className = 'table table-bordered tblNutrientRank';
            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            var toxinIndex = col.indexOf('#');
            var index = 0;
            angular.forEach(col, function (key) {
                var th = document.createElement("th");      // TABLE HEADER.  
                if (index == toxinIndex) {
                    $(th).attr('onclick', 'sortTable(0)');
                    $(th).css({ 'cursor': 'pointer' });
                }
                index = index + 1;

                th.innerHTML = key;
                tr.appendChild(th);
            });


            var arrFood = col.slice(1, toxinIndex);

            // ADD JSON DATA TO THE TABLE AS ROWS.
            var sNo = 0;
            angular.forEach(interactionList, function (key) {
                tr = table.insertRow(-1);

                sNo = sNo + 1;
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = sNo;

                angular.forEach(arrFood, function (item) {
                    var tabCell = tr.insertCell(-1);

                    $.each(foodNutrientList, function (i) {
                        if (this.nutrientName == key.interactedNutrientName && this.foodName == item) {
                            tabCell.innerHTML = this.nutrientValue + ' mg/100g';
                            return false;
                        }
                    });
                });

                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = key.interactedNutrientName;
                $(tabCell).css({ 'font-weight': 'bold' });

                angular.forEach(nutrientList, function (list) {
                    var tabCell = tr.insertCell(-1);
                                        
                    var nutrientRankList = JSON.parse(list.nutrientRankList);
                    if (nutrientRankList.some(data => data.interactedNutrientID == key.interactedNutrientID)) {
                        $.each(nutrientRankList, function () {
                            if (this.interactedNutrientID == key.interactedNutrientID) {
                                tabCell.innerHTML = this.interactionRank;

                                tabCell.style.backgroundColor = getColor(this.interactionRank, list.maxRank);
                                return false;
                            }
                        });
                    }
                    else {
                        tabCell.innerHTML = 'NF';
                        $(tabCell).css({ 'color': 'red' });
                    }
                });
            });


            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("divNutrientRank");
            divContainer.innerHTML = '';
            divContainer.appendChild(table);

        }, function (error) {
            toaster.pop('error', "Error", error);
        });
    };

    function getColor(val, len) {       
        var value = val / len;
        var hue = ((1 - value) * 120).toString(10);
        return ["hsl(", hue, ",100%,40%)"].join("");
    }

    $scope.exportData = function () {
        $(".tblNutrientRank").table2excel({
            exclude: ".noExl",
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true,
            name: "Worksheet Name",
            filename: "NutrientRank" //do not include extension
        });
    };

    $scope.initControls();
    $scope.nutrientRankReport();
});


function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementsByClassName("tblNutrientRank");
  
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table[0].rows;    
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}