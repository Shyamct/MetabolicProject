

$(document).ready(function () {
    getDiet();
});

var userID = Number(UtilsCache.getSession('USERDETAILS').userid);

function getDiet() {

    
    var obj = {
        "empid": Number(UtilsCache.getSession('USERDETAILS').userid),
    };
    console.log("uuuuuuuuuuuuu");

    $.ajax({
        type: "POST",
        url: "WebService/principalDiet.asmx/getBestDiet",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(obj),

        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },

        success: function (data) {

            console.log("ff");
        },
        error: function (error) {

        }
    });
}