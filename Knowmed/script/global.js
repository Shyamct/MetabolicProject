function isEmpty(value) { if (value === "" || value === undefined) { return true; } else { return false; } }

function isEmptyValue(value) { if (value === "" || value === 0 || value === undefined || value === null) { return true; } else { return false; } }

function getPageName(url) {
   
    var page = url.match(/[^\/]+$/)[0];
    var parameterStartIndex = page.indexOf('?');
    
    if (parameterStartIndex > -1) {
        return page.substr(0, parameterStartIndex);
    }
    else {
        return page;
    }    
}

function isEmptyObject(obj, key) {
    if (isEmptyValue(obj) || isEmptyValue(key))
        return false;

    var keyArray = key.split(".");
    for (var i = 0, ln = keyArray.length; i < ln; i++) {
        if (!obj || !obj.hasOwnProperty(keyArray[i])) {
            return false;
        }
    }

    return true;
}

function emptyArray(array) {
    if (array && array.length > 0) {
        for (var i = 0, n = array.length; i < n; ++i) {
            array.shift();
        }
        return array;
    }
    else {
        return [];
    }
}

function isEmail(value) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
};

function isUrl(value) {
    var re = "/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/";
    return re.test(value);
};

function verifyToken() {
    var token = UtilsCache.get("AUTHTOKEN") ? UtilsCache.get("AUTHTOKEN") : -1;
    return (token > 0) ? true : false;
};

function getParameterByName(name, url) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results === null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
};

function replaceQueryString(url, param, value) {
    var re = new RegExp("([?|&])" + param + "=.*?(&|$)", "i");
    if (url.match(re))
        return url.replace(re, '$1' + param + "=" + value + '$2');
    else
        return url + '&' + param + "=" + value;
};

function randomNumber() {
    var date = new Date();
    var ticks = date.getTime();

    return ticks;
};

function checkToken(ErrorMessage, localize, dialogService) {
    var isValidToken = true;
    if (ErrorMessage != undefined) {
        if (ErrorMessage.indexOf("Token") > 0) {
            isValidToken = false;
        } else if (ErrorMessage.indexOf("TCP")) {
            isValidToken = true;
        } else {
            isValidToken = true;
        }
    } else {
        isValidToken = false;
    }
    return isValidToken;
};

function dotdotString(str, len) {
    return (str != null && str.length > len) ? str.substring(0, len) + "..." : str;
};

function getCurrentDate(date) {
    var today = date != null ? new Date(date) : new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return dd + '/' + mm + '/' + yyyy;
};

function getCurrentDateSQL(date, interval) {
    var today = date != null ? date : new Date();
    var dd = today.getDate() + interval;
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return yyyy + '-' + mm + '-' + dd;
};

function getCurrentDateTime(date) {
    var today = date != null ? new Date(date) : new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var hh = today.getHours();
    var min = today.getMinutes();

    var yyyy = today.getFullYear();
    if (dd < 10)
        dd = '0' + dd
    if (mm < 10)
        mm = '0' + mm
    if (hh < 10)
        hh = '0' + hh
    if (min < 10)
        min = '0' + min

    return dd + '.' + mm + '.' + yyyy + ' ' + hh + ':' + min;
};

function addYear(date, year) {
    var arrStartDate = date.split("/");
    var dt = new Date(arrStartDate[2], arrStartDate[1] - 1, arrStartDate[0]);
    return (getCurrentDate(dt.setFullYear(dt.getFullYear() + year)));
};

function CheckHHMMTime(time) {
    var re = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return re.test(time);
};

function htmlEncode(value) {
    if (value) {
        return $('<div />').text(value).html();
    } else {
        return '';
    }
};

function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
};

function isValidUrl(value) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(value);
};

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
};

function base64EncodeOrDecode(str, type) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    function encode(input) {
        input = utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    };

    function decode(input) {
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = utf8Decode(output);
        return output;
    };

    function utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };

    function utf8Decode(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };

    if (type == "ENCODE")
        return encode(str);
    else if (type == "DECODE")
        return decode(str);
};

function isNumeric(isAcceptDecimal) {
    var key = window.event ? event.keyCode : event.which;

    if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39) {
        return true;
    }
    else {
        var pattern = isAcceptDecimal ? /^[0-9.,/]+$/ : /^[0-9]+$/;
        if (pattern.test(event.key))
            return true;
        else
            event.preventDefault();
    }
};

function isAlphaNumeric(e) {
    var key = window.event ? event.keyCode : event.which;
    //8=backspace, 9=tab, 46=delete, 37=left arrow, 39=right arrow, 32=space
    if (event.keyCode == 32) {
        e.preventDefault();
        return false;
    }
    else if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
        return true;
    }
    else {
        if (/^[0-9a-zA-Z]+$/.test(e.key))
            return true;
        else
            return false;
    }
};



function setFocusOnElement(selecter) {
    setTimeout(function () {
        angular.element(selecter).focus();
    }, 200);
}

function getTokenFromURL(callback) {
    var currentUrl = window.location.href;
    var findToken = (currentUrl.indexOf("token") > -1) ? (currentUrl.substr(currentUrl.indexOf("token") + 6)) : undefined;

    callback(findToken);
}

function log(msg) {
    if (true) {
        console.log(msg);
    }
};

function generateMenus() {
    var obj = UtilsCache.getSession('MENUASSIGN');
    var showModule = [];
    $.each(obj, function () {
        if (this.parentID == 0) {
            var parentId = this.menuID;
            var children = [];
            $.each(obj, function () {
                if (this.parentID == parentId) {
                    children.push({
                        id: this.menuID,
                        label: this.menuName,
                        url: this.url || 'javascript:;'
                    });
                }
            });
            showModule.push({
                id: this.menuID,
                label: this.menuName,
                url: this.url || 'javascript:;',
                children: children
            });

        };
    });
    var htm = '';
    if (showModule.length > 0) {
       // htm = "<nav class='navbar navbar-inverse'><div class='container-fluid'><ul class='nav navbar-nav collapse navbar-collapse'>"
        for (var i = 0; i < showModule.length; i++) {
            if (typeof showModule[i].children == 'undefined' || showModule[i].children.length == 0) {
                if (showModule[i].label == 'Metabolic') {
                    //htm += "<li><a href='http://localhost:51564/Matabolic/project/Default.aspx'>" + showModule[i].label + "</a></li>";  
                    htm += "<li><a href='../Matabolic/project/pathways.aspx'>" + showModule[i].label + "</a></li>";
                }
                else {
                    htm += "<li><a ui-sref='" + showModule[i].url + "'>" + showModule[i].label + "</a></li>";
                }
            }
            else {
                htm += "<li class='dropdown'><a class='dropdown-toggle' data-toggle='dropdown' ui-sref='" + showModule[i].url + "'>" + showModule[i].label + "<span class='caret'></span></a>";
                htm += "<ul class='dropdown-menu' align='left'>";
                for (var j = 0; j < showModule[i].children.length; j++) {
                    htm += "<li><a ui-sref='" + showModule[i].children[j].url + "'>" + showModule[i].children[j].label + "</a></li>";
                }
                htm += "</ul></li>";
            }
        }
       // htm += "</ul></div></nav>";
    }
    return htm;
}

function Reset() {
    alert('Test');
    $window.location.reload();
}
function moveItems(origin, dest) {
    $(origin).find(':selected').appendTo(dest);
}
function uniq(a, param) {
    return a.filter(function (item, pos, array) {
        return array.map(function (mapItem) { return mapItem[param]; }).indexOf(item[param]) === pos;
    })
}

function uploadImage(files) {
    var fileName = '';
    var imageFile = new FormData();
    imageFile.append(files[0].name, files[0]);
    var timeStamp = event.timeStamp;
    $.ajax({
        url: "FileUploadHandler.ashx?timestamp=" + timeStamp,
        data: imageFile,
        processData: false,
        contentType: false,
        async: false,
        type: 'POST',
        success: function (data) {
            console.log(data);
            image = data[0];
            fileName = image;
        },
        error: function (errorData) {
            maketoast('error', 'Error', "there was a problem uploading the file.");
        }
    });

    return fileName
}



