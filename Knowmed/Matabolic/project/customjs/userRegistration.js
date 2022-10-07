
var registerUser = function () {
    if ($("#password").val() != $("#confirmPassword").val()) {
        alert('Password does not match.');
        return;
    }
    var obj = {
        userName: $("#name").val(),
        mobileNo: $("#mobileNo").val(),
        password: $("#password").val(),
        emailID: $("#email").val(),
        address: $("#address").val(),
        cityID: $("#ddlCity").val(),
        countryID: $("#ddlCountry").val(),
        profession: $("#profession").val()
    };  
    $.ajax({
        method: "Post",
        url: 'WebService/userRegistration.asmx/registerUser',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                alert('Registered Successfully.');
            } else {
                alert('Error.');
            }
        },
        error: function (error) {

        },
        failure: function (error) {

        }
    });
};

var checkLogin = function () {
    
    var obj = {
        mobileNo: $("#txtMobileNo").val(),
        password: $("#txtPassword").val()
    };
    $.ajax({
        method: "Post",
        url: 'WebService/Login.asmx/checkLogin',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(obj),
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                window.location.href = "Default.aspx";
            } else {
                alert('Invalid username and password.');
            }
        },
        error: function (error) {
            alert(error.responseJSON.d);
        },
        failure: function (error) {

        }
    });
};