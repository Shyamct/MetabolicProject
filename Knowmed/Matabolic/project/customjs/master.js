var data = [
    //{ "id": "ajson1", "parent": "#", "text": "Simple root node" },
    //{ "id": "ajson2", "parent": "#", "text": "Root node 2" },
    //{ "id": "ajson3", "parent": "ajson2", "text": "Child 1" },
    //{ "id": "ajson4", "parent": "ajson2", "text": "Child 2" },
]

var baseUrl ="WebService/HeadMaster.asmx/"
var getHeadList = function () {
    if (!UtilsCache.getSession('USERDETAILS')) {
        window.location.href = "../../index.html";
        return;
    }
    $.ajax({
        method: "Post",
        url: baseUrl + 'getHeadList',
        dataType: 'json',
        data: "{'empid':'" + Number(UtilsCache.getSession('USERDETAILS').userid) + "'}",
        contentType: 'application/json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                $.each(result.responseValue.Table, function () {
                    data.push({
                        id: this.id,
                        parent: this.parentId == "0" ? "#" : this.parentId,
                        text: this.headName
                    });
                });
                var to = false;
                $('#demo_q').keyup(function () {
                    if (to) { clearTimeout(to); }
                    to = setTimeout(function () {
                        var v = $('#demo_q').val();
                        $('#jstree_demo').jstree(true).search(v);
                    }, 250);
                });

                $('#jstree_demo')
                    .jstree({
                        "core": {
                            "animation": 0,
                            "check_callback": true,
                            'force_text': true,
                            "themes": { "stripes": true },
                            'data': data
                        },
                        "types": {
                            "#": { "max_children": 1, "max_depth": 4, "valid_children": ["root"] },
                            "root": { "icon": "/static/3.3.7/assets/images/tree_icon.png", "valid_children": ["default"] },
                            "default": { "valid_children": ["default", "file"] },
                            "file": { "icon": "glyphicon glyphicon-file", "valid_children": [] }
                        },
                        "plugins": ["contextmenu", "dnd", "search", "state", "types", "wholerow"],
                        "contextmenu": {
                            "items": function ($node) {
                                var tree = $("#jstree_demo").jstree(true);
                                return {
                                    "Create": {
                                        "label": "Create",
                                        "action": function (obj) {
                                            $node = tree.create_node($node);
                                            tree.edit($node);
                                        }
                                    },
                                    "Rename": {
                                        "label": "Rename",
                                        "action": function (obj) {
                                            tree.edit($node);
                                        }
                                    },
                                    
                                };
                            }
                        }
                    }).bind('rename_node.jstree', function (e, data) {                       
                        var obj = {
                            parentId: data.node.parent,
                            headName: data.text,
                            id: data.node.id
                        };                        
                        $.ajax({
                            method: "Post",
                            url: baseUrl + 'insertNewNode',
                            dataType: 'json',
                            contentType: 'application/json',
                            data: "{'dataValue':'" + JSON.stringify(obj) + "'}",
                            statusCode: {
                                401: function (xhr) {
                                    window.location.href = "../../index.html";
                                }
                            },
                            success: function (response) {
                                var result = JSON.parse(response.d);
                                if (result.responseCode == 1) {
                                    maketoast('success', 'Success', 'Save Successfully.');
                                    getHeadList();
                                }
                            },
                            error: function (error) {

                            },
                            failure: function (error) {

                            }
                        });                        
                    });
            }
        },
        error: function (error) {

        },
        failure: function (error) {

        },

    })
}

var saveNewNode = function (parentId, headName, id) {
    var obj = {
        parentId: parentId,
        headName: headName,
        id: id
    }
    $.ajax({
        method: "Post",
        url: baseUrl + 'getHeadList',
        dataType: 'json',
        contentType: 'application/json',
        statusCode: {
            401: function (xhr) {
                window.location.href = "../../index.html";
            }
        },
        success: function (response) {
            var result = JSON.parse(response.d);
            if (result.responseCode == 1) {
                getHeadList();
            }
        },
        error: function (error) {

        },
        failure: function (error) {

        }
    });
}

function demo_create() {
    var ref = $('#jstree_demo').jstree(true),
        sel = ref.get_selected();
    console.log(sel);
    if (!sel.length) { return false; }
    sel = sel[0];
    sel = ref.create_node(sel, { "type": "file" });
    console.log(sel);
    if (sel) {
        ref.edit(sel);
    }
};
function demo_rename() {
    var ref = $('#jstree_demo').jstree(true),
        sel = ref.get_selected();
    if (!sel.length) { return false; }
    sel = sel[0];
    ref.edit(sel);
};
function demo_delete() {
    var ref = $('#jstree_demo').jstree(true),
        sel = ref.get_selected();
    if (!sel.length) { return false; }
    ref.delete_node(sel);
};

$(function () {
    getHeadList();   
});

