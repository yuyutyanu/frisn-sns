//var socket = io.connect('http://172.24.50.23:3000');
//var socket = io.connect('http://192.168.1.7:3000');
var socket = io.connect('http://192.168.211.104:3000');
//var socket = io.connect('http://localhost:3000');

//pot text
function submit() {
    var text = $('#post-text').val();
    $('#post-text').val("");
    socket.emit('posttext', {
        data: text
    });
}
$('#post-button').click(function() {
    var text = $('#post-text').val();
    $('#post-text').val("");
    socket.emit('posttext', {
        data: text
    });
});


//response text
socket.on('old-responsetext', function(data) {
    $(function() {
        for (var a = 0; a < data.length; a++) {
            //取得２回め以降(ブラウザ更新)の時に前回DOMに埋め込んだものの削除
            $('.post-content').empty();
        }
        for (var i = 0; i < data.length; i++) {
            //database から　取得してつぶやき
            $('.post-content').prepend('<div id="content' + i + '"' + ' class="content-back"></div>');
            $('#content' + i).append('<div class="comment buttonvalue' + i + '"></div>');
            $('.buttonvalue' + i).append('<button type="button" name="button">comment</button>');
            $('#content' + i).append('<div class="wrap-box' + i + ' wrap-box-css"></div>');
            $('.wrap-box' + i).append('<img src="../nuko/001.jpg" alt="" class="profnuko"/>');
            $('.wrap-box' + i).append('<p>' + data[i]["url"] + '</p>');
            $('#content' + i).css('height', 'auto');


            // content　height size 可変長処理;
            var contentheight = $('#content' + i).height() / $(window).height() * 100;
            if (contentheight <= 13) {
                $('#content' + i).css('height', '13%');
            }
        }
    });
});

//new responsetext
socket.on('new-responsetext', function(data) {
    console.log(data);

    var newdata = data.length - 1;

    //database から　取得してつぶやき
    $('.post-content').prepend('<div id="content' + newdata + '"' + ' class="content-back"></div>');
    $('#content' + newdata).append('<div class="comment buttonvalue' + newdata + '"></div>');
    $('.buttonvalue' + newdata).append('<button type="button" name="button">comment</button>');
    $('#content' + newdata).append('<div class="wrap-box' + newdata + ' wrap-box-css"></div>');
    $('.wrap-box' + newdata).append('<img src="../nuko/001.jpg" alt="" class="profnuko"/>');
    $('.wrap-box' + newdata).append('<p>' + data[newdata]["url"] + '</p>');
    $('#content' + newdata).css('height', 'auto');

    // content　height size 可変長処理;
    var contentheight = $('#content' + newdata).height() / $(window).height() * 100;
    if (contentheight <= 13) {
        $('#content' + newdata).css('height', '13%');
    }
});

var comment;
//comment 処理

//comment送信
$('#commentbox-button').click(function() {
    comment = $('#commentbox-text').val();
    $('#commentbox-text').val();
    console.log(comment);
    socket.emit('comment-req', {
        comment: comment,id :comment_content
    });
    $('.commentbox').fadeOut();
});
var comment_content;
$(document).on("click", ".comment", function() {
    //comment画面表示
    $('.commentbox').fadeIn();

    //comment するコンテンツのclassを取得
    var classname = this.className;
    var this_buttonclass = classname.split(" ");
    comment_content = $('.' + this_buttonclass[1]).parent().attr('id');
    console.log(comment_content);

    //commentを画面に表示
});
socket.on('comment-res', function(data) {
      console.log(data);
    $('#' + data["id"]).after('<p class="comment-design">' + data["comment"] + '</p>');
});
//shortcat key
$('#post-text').keydown(function(e) {

    if (e.ctrlKey && e.keyCode == 13) {
        submit();
    }
});
