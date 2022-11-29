$(document).ready(function () {
    getUser();
    showUserDiseaseList();
});


function getUser() {
    var disease = '';
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: "WebService/assignUser.asmx/getUserDisease",
        contentType: 'application/json',
        dataType: 'json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            var r = JSON.parse(data.d).responseValue;
         
            $("#ddlUser option:not(:first)").remove();
            $.each(r.Table, function () {
                $("#ddlUser").append('<option value="' + this.id + '">' + this.userName + '</option>');
            });


            var row = $("#tblDisease thead tr").clone();
            $("#tblDisease tbody tr").remove();

            $.each(r.Table1, function (i) {
                
                disease = disease + "<tr><td>" + (i + 1) + "</td><td> <input type='checkbox' id='chk' value=" + this.id + "/></td><td>" + this.headName + "</td></tr>";
            });
            $('#tblDisease tbody').append(disease);

        },
        error: function (error) {

        }
    });
}




function saveDiseaseUser() {

    
    var userID = $("#ddlUser").val();
    console.log("id", userID);

    var pathway = [];
    $.each($("input[id='chk']:checked"), function () {
        pathway.push($(this).val());
    });

    
   
    var myString = '';
    $("input[id='chk']:checked").each(function () {
        var checked = $(this).val();
        myString += checked + ',';
    });

    var FinalArray = myString.replace(/\//g, "");




    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }

    obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "userID": userID,
        "FinalArray": FinalArray,
    };
   
    $.ajax({
        type: "POST",
        url: "WebService/assignUser.asmx/seveDisease",
        data: JSON.stringify(obj),
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {

        },
        error: function (data) {
        }
    });
};

function showUserDiseaseList() {
    var forBind;
    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    };

    $.ajax({
        type: "POST",
        url: "WebService/assignUser.asmx/showUserDiseaseList",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {

            var result = JSON.parse(data.d).responseValue;// class='icon-trash
            $.each(result.Table, function (i) {

                forBind = forBind + "<tr><td>" + (i + 1) + "</td><td>" + this.headName + "</td><td>" + this.userName + "</td><td><i class='icon-trash' onclick='deleteUser(" +this.UserID+"," +this.DiseaseID+")'></i></td></tr>";
            });

            $('#tblUser tbody').append(forBind);
        },
        error: function (error) {

        }
    });
}


function deleteUser(UserID, diseaseID) {
    
    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
        "UserID": UserID,
        "diseaseID": diseaseID

    };
    
    $.ajax({
        type: "POST",
        url: "WebService/assignUser.asmx/deleteUserAssignDisease",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),
       
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (data) {
            
        },
        error: function (error) {

        }
    });
}

//$("#ddlUser").select2({
//    placeholder: "Select User",
//    allowClear: true
//});
//$("#ddlUser").select2({
//    placeholder: "Select User",
//    allowClear: true
//});