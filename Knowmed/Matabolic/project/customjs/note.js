function saveNote() {
    var pageUrlnew = $(location).attr("href").split('?');
    var pageURL = pageUrlnew[pageUrlnew.length - 1];
    var note = CKEDITOR.instances['editor1'].getData();
    var obj = {
        "pageName": pageURL,
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid),
        "note": note
    }

    $.ajax({
        type: "post",
        url: "WebService/pageDescription.asmx/insertNote",
        data: JSON.stringify(obj),
        contentType: "application/json;",
        //contenttype: "application/json;",
        datatype: "json",
        success: function (data) {
            alert('save successfull');
        },
        error: function (data) {

        }
    });
}

function showNote() {
    var pageUrlnew = $(location).attr("href").split('?');
    var pageURL = pageUrlnew[pageUrlnew.length - 1];
    var obj = {
        "pageName": pageURL,
        "userID": Number(UtilsCache.getSession('USERDETAILS').userid)
    }
    $.ajax({
        type: "post",
        url: "WebService/pageDescription.asmx/showNote",
        data: JSON.stringify(obj),
        contentType: "application/json;",
        //contenttype: "application/json;",
        datatype: "json",
        success: function (data) {
            //console.log(data);
            var r = JSON.parse(data.d).responseValue;
          //  console.log(r);
            $.each(r.Table, function (i) {
              
                CKEDITOR.instances['editor1'].setData(this.note);
            });
        },
        error: function (data) {

        }
    });
}


$(function () {
    /* Start     Note              Editor*/
    $('[name="editor1"]').on('change', function () {
        //extract code from processing part to create default.php
        //var ajaxMethod = "default.php";
        var ajaxMethod = CKEDITOR.instances.editor1;
        switch ($(this).value()) {
            case "1":
                ajaxMethod = "simpletext.txt";
                break;
            case "2":
                ajaxMethod = "http://m.uploadedit.com/bbtc/154756641995.txt";
                break;
            case "3":
                ajaxMethod = "http://m.uploadedit.com/bbtc/154756641995.txt";
                break;
            case "4":
                ajaxMethod = "http://m.uploadedit.com/bbtc/154756641995.txt";
                break;
        }
        $("#editor1").load(ajaxMethod);
    });

    CKEDITOR.on('instanceReady', function (ev) {
        document.getElementById('select').style.display = 'block';
    });
    function InsertHTML() {
        var editor = CKEDITOR.instances.editor1;fbgn
        var value = document.getElementById('htmlArea2').value;
        if (editor.mode == 'wysiwyg') {
            editor.insertHtml(value);
        }
        else
            alert('You must be in WYSIWYG mode!');
    }
       showNote();
    $("#saveNote").click(function () {
        saveNote();
    });
});

    