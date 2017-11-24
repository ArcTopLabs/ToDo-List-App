/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appName = "demo";
var url = 'https://api.masterdatanode.com/' + appName + '/todo/';
var access_token = '######access_token###########';  //'######access_token###########'
var content_type = 'application/json';
var html5todo = {};
html5todo.todos = function (filter) {
    $('#quiz').empty();
    var SendInfo = {
        "filter":
                {
                    "type": filter
                }

    };
    $.ajax({
        url: url + 'find',
        type: 'post',
//                        data: {},
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type
        },
        dataType: 'json',
        success: function (data) {
            var count = 0;
            console.info(JSON.stringify(data));
            //$("#test_div").html(JSON.stringify(data));
//            $("#test_div").show();
//            alert(data.result);
//            var obj = JSON.parse(JSON.stringify(data));
//            
//            var result = $.parseJSON(JSON.stringify(obj.result));
            console.info(JSON.stringify(data.result));

            var identifier, todo;

            $.each(data.result, function (k, jsonObject) {
                identifier = jsonObject.identifier;
                todo = jsonObject.todo;
//                count++;
                if (filter == "started") {
                    var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="' + identifier + '" />' + todo + '</label></div></li>';
                    $('#sortable').append(markup);
                    $('.add-todo').val('');
                    $('.count-todos').html(data.DataCount);

                } else {
                    var markup = '<li id="' + identifier + 'done"><button class="btn btn-default btn-xs pull-left  undo-item"><span class="glyphicon glyphicon-refresh"></span></button> &nbsp;' + todo + ' &nbsp; <button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-trash"></span></button></li>';
                    $('#done-items').append(markup);
                    $('.remove').remove();
                }

            });

            if (filter == "started") {
                $('.count-todos').html(data.DataCount);
            }

            console.info(JSON.stringify(identifier));

            $(".btn-primary").addClass('disabled');
            $(".btn-warning").removeClass('disabled');
            /* for(var i = 0; i < obj.result.length; i++) {
             var obj1 = data[i];
             
             console.log(obj1.id);
             } */
            //var mytable =  $('#example').DataTable();
//            var result = $.parseJSON(JSON.stringify(obj.result));
//            console.info(JSON.stringify(obj.result));

        }

    });
};

html5todo.loadTodo = function (text) {
    html5todo.todos(text);
}

html5todo.add = function (nindex, todo) {


    ////alert(JSON.stringify(SendInfo)); 
    var SendInfo = {"Data": [{"identifier": nindex, "type": "started", "todo": todo}]};
    $.ajax({
        url: url + 'save',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5todo.showMessage('#9BED87', 'black', 'ToDo Item added successfully.');
        },
        error: function (xhr, thrownError) {
            console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            html5todo.showMessage('#9BED87', 'black', 'Quiz added successfully.');
//            alert(thrownError);
        }
    });
};

html5todo.complete = function (identifier, done) {

    ////alert(JSON.stringify(SendInfo)); 
//    var SendInfo = {"Data": [{"type": "completed", "todo": todo}]};
    var SendInfo = {"Data": {"type": "completed"}, "filter": {"identifier": identifier}, "type": "single"};
    $.ajax({
        url: url + 'update',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5todo.showMessage('#9BED87', 'black', 'ToDo Item completed successfully.');
            var markup = '<li id="' + identifier + 'done"><button class="btn btn-default btn-xs pull-left  undo-item"><span class="glyphicon glyphicon-refresh"></span></button> &nbsp;' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-trash"></span></button></li>';
            $('#done-items').append(markup);
            $('.remove').remove();

//                    done(doneItem);
            countTodos();
        },
        error: function (xhr, thrownError) {
            console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            html5todo.showMessage('#9BED87', 'black', 'Quiz added successfully.');
//            alert(thrownError);
        }
    });
};

html5todo.undo = function (identifier, done) {

    ////alert(JSON.stringify(SendInfo)); 
//    var SendInfo = {"Data": [{"type": "completed", "todo": todo}]};
    var SendInfo = {"Data": {"type": "started"}, "filter": {"identifier": identifier}, "type": "single"};
    $.ajax({
        url: url + 'update',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5todo.showMessage('#9BED87', 'black', 'ToDo Item undo successfully.');
//            var markup = '<li id="' + identifier + 'done">' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
//            $('#done-items').append(markup);
//            $('.remove').remove();

//                    done(doneItem);
            countTodos();
        },
        error: function (xhr, thrownError) {
            console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            html5todo.showMessage('#9BED87', 'black', 'Quiz added successfully.');
//            alert(thrownError);
        }
    });
};

html5todo.remove = function (identifier, done) {

    ////alert(JSON.stringify(SendInfo)); 
//    var SendInfo = {"Data": [{"type": "completed", "todo": todo}]};
    var SendInfo = { "filter": {"identifier": identifier}, "type": "one"};
    $.ajax({
        url: url + 'delete',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5todo.showMessage('#9BED87', 'black', 'ToDo Item deleted successfully.');
//            var markup = '<li id="' + identifier + 'done">' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
//            $('#done-items').append(markup);
//            $('.remove').remove();

//                    done(doneItem);
//            countTodos();
        },
        error: function (xhr, thrownError) {
            console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
            html5todo.showMessage('#9BED87', 'black', 'Error while deleting the Item.');
//            alert(thrownError);
        }
    });
};

html5todo.showMessage = function (bgcolor, color, msg) {
    if (!$('#smsg').is(':visible'))
    {
        $('html, body').animate({
            scrollTop: 0
        }, 500, function () {
            if (!$('#smsg').length)
            {
                $('<div id="smsg">' + msg + '</div>').appendTo($('body')).css({
                    position: 'absolute',
                    top: 0,
                    left: 3,
                    width: '98%',
                    height: '50px',
                    lineHeight: '30px',
                    background: bgcolor,
                    color: color,
                    zIndex: 1000,
                    padding: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    opacity: 0.9,
                    margin: 'auto',
                    display: 'none'
                }).slideDown('show');
                setTimeout(function () {
                    $('#smsg').animate({'width': 'hide'}, function () {
                        $('#smsg').remove();
                    });
                }, 4000);
                $(".btn-primary").addClass('disabled');
                $(".btn-warning").removeClass('disabled');
            }
        });
    }
};


// jQuery Play
$(function () {

// initial setup
    $('#general').click(function () {
        html5todo.voteResult("general");
        return false;
    });
    $('#maths').click(function () {
        html5todo.voteResult("maths");
        return false;
    });
    $('#science').click(function () {
        html5todo.voteResult("science");
        return false;
    });

});

