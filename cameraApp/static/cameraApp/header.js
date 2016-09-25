function getCookie(c_name) {
    if(document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if(c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if(c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function getQuestions(){
    var returnMe = "none";
    $.ajax({
        type:"GET",
        async:false,
        url:"/getQuestions",
        headers : {
            "X-CSRFToken": getCookie("csrftoken")
        },
        success: function(data){
            console.log(data);
            returnMe = data;
        }
    });
    return returnMe;
}

function sendNewEntry(sendThis){
    $.ajax({
        type:"POST",
        async:false,
        url:"/sendNewEntry",
        data: {'data[]': sendThis},
        headers : {
            "X-CSRFToken": getCookie("csrftoken")
        },
        success: function(data){
            console.log(data);
        }
    });
}

$("#addNewEntry").click(function(e){
    e.preventDefault();
    var entryForm = $("#newEntryForm");
    var questionData = getQuestions();
    if((entryForm).is(':visible')){ //Remove Form

        //Submit data
        if($("#newFormList").length > 0){
            var sendThis = [];
            var questionName = "";
            var questionNumber = "";
            var questionDesc = "";
            for(var i=0; i < questionData.length; i++){
                questionName = questionData[i].fields.name.replace(" ","-");
                questionNumber = $("#" + questionName + "-val").val() || "None";
                questionDesc = $("#" + questionName + "-name").val();
                //sendThis.push([questionData[i].pk, questionNumber, questionDesc]);
                sendThis.push({"pk": questionData[i].pk, "val": questionNumber, "desc": questionDesc});
            }
            console.log("sendThis = ", sendThis);
            sendNewEntry(sendThis);
        }
        entryForm.hide();
        $("#addNewEntry").text("Add New Entry")
    }
    else{ //Display Form
        entryForm.show();
        $("#addNewEntry").text("Submit");


        console.log("question data = ", questionData);
        var newEntry = "";
        for(var i=0; i < questionData.length; i++){
            console.log(questionData[i]);
            if(document.getElementById(questionData[i].fields.name.replace(" ","-") +"-outer") == null){
                newEntry = "<a href='#' class='list-group-item' id='"+ questionData[i].fields.name.replace(" ","-") +"-outer'>"
                    + "<i class='fa fa-fw fa-calendar'></i>"
                    + "<form class='form-horizontal'>"
                        + "<div class='form-group'>"
                            + "<label class='col-sm-2 control-label'>" + questionData[i].fields.name.replace(" ","-") + "</label>"
                            + "<div class='col-sm-10'>"
                                + "<input type='number' id='"+ questionData[i].fields.name.replace(" ","-") +"-val' min='0' max='10' step='1' />"
                            + "</div>"
                        + "</div>"
                        + "<div class='form-group'>"
                            + "<label class='col-sm-2 control-label'>description(optional)</label>"
                            + "<div class='col-sm-10'>"
                                + "<textarea class='form-control' id='"+ questionData[i].fields.name.replace(" ","-") +"-name' rows='3'></textarea>"
                            + "</div>"
                        + "</div>"
                    + "</form>"
                + "</a>";
                $("#newFormList").append(newEntry);
            }

        }
        
    }
});