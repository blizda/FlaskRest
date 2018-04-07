$(document).ready(function () {
        $("#search_button").click(function(){
            var searcVal = $("#main_form").val().trim();
            if (searcVal !== ''){
                $("#search_list").empty();
                $("#result_list").empty();
                startSearch(searcVal);
            }
        });
        $('.con_list').on('click', '.cick_ser', function(){
            var dbsearc = $(this).text();
            takeSimular(dbsearc);
            $("#search_list").empty();
            $("#result_list").empty();
        });
});
function startSearch(searcVal) {
    $.ajax({
    url:"http://127.0.0.1:5000/search",
    type:"POST",
    data: JSON.stringify({formVal: searcVal}),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(callback){
        var obj = $.parseJSON(callback);
            for(var objVal in obj) {
                $("#search_list").append("<div class='cick_ser'><p id=\"" + obj[objVal] + "\">" + obj[objVal] + "</p></div>");
            }
    }
    });
}
function takeSimular(searcVal) {
    $.ajax({
    url:"http://127.0.0.1:5000/getsimular",
    type:"POST",
    data: JSON.stringify({serName: searcVal}),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(callback){
        var obj = $.parseJSON(callback);
            for(var objVal in obj) {
                $("#result_list").append("<div class='cick_ser'><p id=\"" + obj[objVal] + "\">" + obj[objVal] + "</p></div>");
            }
    }
    });
}