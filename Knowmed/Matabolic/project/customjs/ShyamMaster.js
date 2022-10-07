
$(document).ready(function () {
    //SetMenu();
    showUserDiseaseList();
   
});

function SetMenu() {

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
       return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    }
    
    $.ajax({
     type: "POST",
     url: "WebService/assignMenu.asmx/getUserMenuList",
     contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
        tatusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
            console.log(r);
            $.each(r.Table, function (i, value) {
                var myUrl = "";
                if (value.URL.indexOf('.aspx') != -1) {

                    myUrl = '<a href="' + value.URL + '"><span class="text">' + value.menuName + '</span></a>'
                }
                else {
                    myUrl = '<a href="#"><span class="text">' + value.menuName + '</span></a>'
                }
              
                var li = $("#menu").append('<li id=' + value.parentMenuID + '>' + myUrl + '</li>');
                if (value.subMenu == null) {
                   
                }
                else {
                  
                    var parID = value.parentMenuID;
                    $("#" + parID).addClass("dropdown");
                    var subMenuID = "sub_" + parID;
                    $("#" + parID).append('<ul class= "dropdown-menu" id=' + subMenuID + '>'); //#17
                    var r2 = JSON.parse(value.subMenu);

            
                    $.each(r2, function (i2, value2) {

                        var mySubUrl = "";
                        if (value2.subUrl.indexOf('.aspx') != -1) {
                         
                            mySubUrl = '<a href="' + value2.URL + '"><span class="text">' + value2.menuName + '</span></a>'
                        }
                        else {
                            mySubUrl = '<a href="#"><span class="text">' + value2.menuName + '</span></a>'
                        }
                        
                        $("#" + subMenuID).append('<li id=' + value2.menuID + '>' + mySubUrl + '</li>');
             
                         });
                        $("#" + parID).append('</ul>');


                    $(".dropdown").click(function (e) {
                        $(this).toggleClass("open");
                    });
                }
              
            });
           
        },
        error: function (error) {

        }
    });

   
}





function showUserDiseaseList() {
   /// console.log('hhhh');
    var IIIIIIIDS = [];
    var forBind;
    var urls = ".aspx";
    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    };

    $.ajax({
        type: "POST",
        url: "WebService/assignMenu.asmx/forBindMenu",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {

            var result = JSON.parse(data.d).responseValue;
            
            
           
            var parentTable = result.Table1;
            var allData = result.Table;
            
            var showModule = [];
            $.each(parentTable, function () {
                     var parentId = this.parentMenuID;
                    var children = [];
                     $.each(allData, function () {
                         if (this.parentMenuID == parentId) {
                            children.push({
                                id: this.subMenuID,
                                label: this.subMenu,
                                url: this.URL || 'javascript:;'
                            });
                        }
                    });
                    showModule.push({
                        id: parentId,
                        label: this.menuName,
                        url:  'javascript:;',
                        children: children
                    });

            });
               var htm = '';
            if (showModule.length > 0) {
                for (var i = 0; i < showModule.length; i++) {
                    if (typeof showModule[i].children == 'undefined' || showModule[i].children.length == 0) {

                            htm += "<li><a ui-sref='" + showModule[i].url + "'>" + showModule[i].label + "</a></li>";
                        
                    }
                    else {
                        htm += "<li class='dropdown'><a class='dropdown-toggle' data-toggle='dropdown' href='" + showModule[i].url + "'>" + showModule[i].label + "<span class='caret'></span></a>";
                        htm += "<ul class='dropdown-menu' align='left'>";
                        for (var j = 0; j < showModule[i].children.length; j++) {
                            console.log("showModule[i].url", showModule[i].url);

                            htm += "<li><a href='" + showModule[i].children[j].url + "'>" + showModule[i].children[j].label + "</a></li>";
                        }
                        htm += "</ul></li>";
                    }
                }
            }

            $('nav .mainH').append(htm);

                //$.each(result.Table1, function (i) {
                //    var ID = this.parentMenuID;
                //    var Name = this.subMenu;

                //    $.each(IIIIIIIDS, function (i, val) {
                //        if (val.id == ID) {
                //            console.log("IDs", ID);
                //            console.log("Names", Name);
                //            forBind = forBind + "<ul><li><a href='" + urls + "'>" + Name + "<li></ul>";
                //        }
                //    });
                //});
            //$('.dropdown1').append(forBind);
         
        },
        error: function (error) {

        }
    });
}

