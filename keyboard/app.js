var k = new Keyboard("#keyboard", "#content");


$(document).ready(function(){
    var clipboard = new Clipboard("#copy");
    $("#copy").hover(
      function(){
        $("#content").css("color", "#4fbc61");
        $("#content").css("border-bottom", "1px solid #4fbc61");
      },
      function(){
        $("#content").css("color", "black");
        $("#content").css("border-bottom", "1px solid black");
      }
    )
    $("#copy").mousedown(function(){
      $("#content").css("color", "#91c69a");
      $("#content").css("border-bottom", "1px solid #91c69a");
    })
    $("#copy").mouseup(function(){
      $("#content").css("color", "#4fbc61");
      $("#content").css("border-bottom", "1px solid #4fbc61");
    })
    k.show();
//    var i = 0;
//    var exampleType = setInterval(function(){
//            if(i < k.sampleText.length){
//                $("#k"+ k.sampleText[i]).addClass("clicked");
//                k.update(k.sampleText[i]);
//                i++
//            }
//            else {
//              clearInterval(exampleType);
//            }
//      }, 500)
//
//
//     var j = $(k.content).html().length;
//     var exampleBackspace = setInterval(function(){
//        if(j >= 0){
//            k.update(8);
//             j--
//            }
//            else{
//                clearInterval(exampleBackspace)
//            }
//}, 200)

$(document).keydown(function(event){
    k.clicked(event.which);
    $("#k"+ event.which).addClass("clicked");
})

$(document).keyup(function(event){
    k.unclicked(event.which);
    $("#k"+ event.which).removeClass("clicked");


})

$("#keyboard").mousedown(function(event){
    k.mouseClicked(event.target);
    var keyId = $(event.target).attr("id")
    $(keyId).addClass("clicked");

})


})
