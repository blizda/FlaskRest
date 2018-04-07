$(document).ready(function () {
    getSerialsList();
});

function getSerialsList() {
    $.post(
        "http://127.0.0.1:5000/getserlist",
        function(callback){
            var obj = $.parseJSON(callback);
            for(var objVal in obj) {
                $(".main").append("<div><p>" + objVal + " " + obj[objVal] + "</p></div>");
            }
        }
    );
}