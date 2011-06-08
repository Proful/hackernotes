jQuery.template("popup","<div id='popupContact'><a id='popupContactClose'>x</a><div id='contactArea'><p id='selectedtext' ></p><p id='hnshow'></p><textarea  rows='10' cols='45' id='hnnotes'></textarea><br /><button id='hnsave'>Save</button></div></div><div id='backgroundPopup'></div>");
jQuery.tmpl("popup").appendTo("body");


if(!window.Kolich){
  Kolich = {};
}

Kolich.Selector = {};
Kolich.Selector.getSelected = function(){
  var t = '';
  if(window.getSelection){
    t = window.getSelection();
  }else if(document.getSelection){
    t = document.getSelection();
  }else if(document.selection){
    t = document.selection.createRange().text;
  }
  return t;
}

$('#hnsave').click(function(){
  var quote = $('#selectedtext').html();
  var mynote = $('#hnnotes').val();

  chrome.extension.sendRequest({ link: window.location.href, title: document.title,quote: quote,mynote:mynote });

  disablePopup();
  
  // cleanup
  $('#hnnotes').attr('value','');
  $('#selectedtext').empty();
});

var myData = new Array();
Kolich.Selector.mouseup = function(e){
  var st = Kolich.Selector.getSelected();
  if(st!=''){
    var selectedtext = st.toString();
    $('#selectedtext').empty();
    $('#selectedtext').css('display','none');
    $('#selectedtext').append(st.toString());

    if(selectedtext.length > 140){
      selectedtext = selectedtext.substring(0,140);
      selectedtext = selectedtext + "...";
    }

    $('#hnshow').empty();
    $('#hnshow').append(selectedtext);

    centerPopup(e.pageY - e.screenX);
    loadPopup();
  }
}

$(document).bind("mouseup", Kolich.Selector.mouseup);
