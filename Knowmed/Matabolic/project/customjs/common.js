$(function () {
    var CurrentUrl = document.URL;
    var CurrentUrlEnd = CurrentUrl.split('/').filter(Boolean).pop();

    $("#headerNav .nav li a").each(function () {
        var ThisUrl = $(this).attr('href');
        var ThisUrlEnd = ThisUrl.split('/').filter(Boolean).pop();
        if (ThisUrlEnd == CurrentUrlEnd) {
            $("#headerNav .nav li").removeClass('active');
            $(this).parent().addClass('active');
        }
    });
});

function maketoast(priority, title, message) {
    //evt.preventDefault();

    var options =
    {
        priority: priority,
        title: title,
        message: message
    };

    if (options.priority === '<use default>') {
        options.priority = null;
    }

    var codeobj = [];
    var codestr = [];

    var labels = ['message', 'title', 'priority'];
    for (var i = 0, l = labels.length; i < l; i += 1) {
        if (options[labels[i]] !== null) {
            codeobj.push([labels[i], "'" + options[labels[i]] + "'"].join(' : '));
        }

        codestr.push((options[labels[i]] !== null) ? "'" + options[labels[i]] + "'" : 'null');
    }

    if (codestr[2] === 'null') {
        codestr.pop();
        if (codestr[1] === 'null') {
            codestr.pop();
        }
    }

    codeobj = "$.toaster({ " + codeobj.join(", ") + " });"
    codestr = "$.toaster(" + codestr.join(", ") + ");"
    $.toaster(options);
}