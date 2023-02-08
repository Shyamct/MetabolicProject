

$(document).ready(function () {
    getUserVMenu();
    showUserAssignMenuList();
});

function getUserVMenu() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    }
    $.ajax({
        type: "POST",
        url: "WebService/assignMenu.asmx/getUserVMenu",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;

            $("#ddlUsers option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlUsers").append('<option value="' + this.id + '">' + this.userName + '</option>');
            });

            $("#ddlParent option:not(:first)").remove();
            $.each(r.Table1, function () {
                $("#ddlParent").append('<option value="' + this.id + '">' + this.menuName + '</option>');
            });
        },
        error: function (error) {

        }
    });
}

function getSubMenuList() {
    var menuList;
    var parentID = $("#ddlParent").val();

    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "parentID": parentID,
        
    }
    $.ajax({
        type: "POST",
        url: "WebService/assignMenu.asmx/getSubMenu",
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

            $("#tblMenu tbody tr").remove();
            $.each(result.Table, function (i) {
                menuList = menuList + "<tr><td>" + (i + 1) + "</td><td> <input type='checkbox' id='chkID' value=" + this.id + "/></td><td>" + this.menuName + "</td></tr>";
            });
            $("#tblMenu tbody").append(menuList);
        },
        error: function (error) {

        }
    });
}

function showUserAssignMenuList() {
    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    };

    $.ajax({
        type: "POST",
        url: "WebService/assignMenu.asmx/getUserMenuList",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {
            var disease = '';

            var result = JSON.parse(data.d).responseValue;// class='icon-trash
            $.each(result.Table, function (i) {
                disease = disease + "<tr><td style='display:none;'>" + this.Id + "</td><td>" + (i + 1) + "</td><td>" + this.userName + "</td><td>" + this.menuName + "</td><td>" + this.subMenu + "</td><td><i class='icon-trash' style='cursor:pointer;' onclick='deleteAssignUser(" + this.UserID + "," + this.parentMenuID + "," + this.subMenuID + ")'></i></td></tr>";

                // disease = disease + "<tr><td style='display:none;'>" + this.Id + "</td><td>" + (i + 1) + "</td><td>" + this.userName + "</td><td>" + this.menuName + "</td><td>" + this.subMenu + "</td><td><i class='icon-trash' style='cursor:pointer;' onclick='demo(" + this.subMenuID + ")'></i></td></tr>";
            });

            $('#tblUser tbody').append(disease);
        },
        error: function (error) {

        }
    });
}

function saveMenuData() {
    var userID = $("#ddlUsers").val();
    var parentID = $("#ddlParent").val();
   
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
   
    if ($("#ddlUsers option:selected").val() == null || $("#ddlUsers option:selected").val() =='-- Select User --') {
        alert('Please Select User');
        return;
    }
    if ($("#ddlParent option:selected").val() == null || $("#ddlParent option:selected").val() == '-- Parent Menu --') {
        alert('Please Select Parent Menu');
        return;
    }

    var myString = '';
    $("input[id='chkID']:checked").each(function () {
        var checked = $(this).val();
        myString += checked + ',';
    });

    var FinalArray = myString.replace(/\//g, "");

    if (FinalArray == null || FinalArray == "") {
        FinalArray = '0';
    }

    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "userID": userID,
        "parentID": parentID,
        "FinalArray": FinalArray,
    };
    $.ajax({
        type: "POST",
        url: "WebService/assignMenu.asmx/assignMenuDate",
        data: JSON.stringify(obj),
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            showUserAssignMenuList();

          var result = JSON.parse(data.d);

            if (result.responseCode == 1)
            {
            $("#ddlUsers").val('-- Select User --');
            $("#ddlParent").val('-- Parent Menu --');
            }

        },
        error: function (data) {
        }
    });
}



function deleteAssignUser(UserID, parentMenuID, subMenuID) {
    var UserID = UserID;
    var parentMenuID = parentMenuID;
    var subMenuID = subMenuID;

    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),      
        "parentID": parentMenuID,
        "userID": UserID,
        "subMenuID": subMenuID

    };
    $.ajax({
        type: "POST",
        url: "WebService/assignMenu.asmx/deleteUserAssignMenu",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            alert("Delete Sucessfull...");

        },
        error: function (error) {

        }
    });
}


function demo( ) {
   
    var myString = '';
    $("input[id='chkID']:checked").each(function () {
        var checked = $(this).val();
        myString += checked + ',';
    });

    var FinalArray = myString.replace(/\//g, "");

    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "skp": FinalArray

    };
    $.ajax({
        type: "POST",
        url: "WebService/assignMenu.asmx/demo",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            alert("Delete Sucessfull...");

        },
        error: function (error) {

        }
    });
}
