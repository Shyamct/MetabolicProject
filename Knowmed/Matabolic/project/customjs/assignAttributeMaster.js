
$(document).ready(function () {
    getUserList();
    getAttributeList();
    showAssignattributeList();
});

function getUserList() {
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
        },
        error: function (error) {

        }
    });
}


function getAttributeList() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
   
     obj = {
          empid: Number(UtilsCache.getSession('USERDETAILS').userid),
         // pathwayID: pathwayID
           }

    $.ajax({
        type: "POST",
        url: "WebService/assignAttribute.asmx/getAttributeList",
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
            $("#ddlParent option:not(:first)").remove();
            $.each(result.Table, function () {
                $("#ddlParent").append('<option value="' + this.id + '">' + this.attributesName + '</option>');
            });
           
        },
        error: function (error) {

        }
    });
}



function getChildAttributeList() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    parentID = $("#ddlParent").val();

    obj = {
        empid: Number(UtilsCache.getSession('USERDETAILS').userid),
        parentID: Number(parentID),
    }

    $.ajax({
        type: "POST",
        url: "WebService/assignAttribute.asmx/getAttributeChild",
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
            var subAttribute = '';
            $.each(result.Table, function (i) {
                subAttribute = subAttribute + "<tr><td>" + (i + 1) + "</td><td> <input type='checkbox' id='chkID' value=" + this.id + "/></td><td>" + this.attributesName + "</td></tr>";
            });
            $("#tblMenu tbody").append(subAttribute);

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

    if ($("#ddlUsers option:selected").val() == null || $("#ddlUsers option:selected").val() == '-- Select User --') {
        alert('Please Select User');
        return;
    }
    if ($("#ddlParent option:selected").val() == null || $("#ddlParent option:selected").val() == '-- Parent Attribute --') {
        alert('Please Select Parent Attribute');
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
        "parentID": Number(parentID),
        "FinalArray": FinalArray,
    };

    console.log("obj", obj);
    $.ajax({
        type: "POST",
        url: "WebService/assignAttribute.asmx/saveAttributeWITHuser",
        data: JSON.stringify(obj),
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            var result = JSON.parse(data.d);
            if (result.responseCode == 1) {
                $("#ddlUsers").val('-- Select User --');
                $("#ddlParent").val('-- Parent Attribute --');
            }
        },
        error: function (data) {
        }
    });
}


function showAssignattributeList() {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    obj = {
        empid: Number(UtilsCache.getSession('USERDETAILS').userid),
    }

    $.ajax({
        type: "POST",
        url: "WebService/assignAttribute.asmx/getAssignList",
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
            var tr;
            $("#tblUser tbody tr").remove();
            $.each(result.Table, function (i) {

                //console.log("result", result);
                tr = tr + "<tr><td>" + (i + 1) + "</td><td>" + this.userName + "</td><td>" + this.parentAttributesName + "</td><td>" + this.attributesName + "</td><td><i class='icon-trash' style='cursor:pointer;' onclick='deleteAssignUser(" + this.ID + ")'></i></td></tr>";
            });
            $('#tblUser tbody').append(tr);

        },
        error: function (error) {

        }
    });
}

function deleteAssignUser(rowID) {
    
    var ID = rowID;

    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "ID": ID,
        

    };
    $.ajax({
        type: "POST",
        url: "WebService/assignAttribute.asmx/deleteAssignUser",
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