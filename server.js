var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var pg = require('pg');


server.listen(3000);

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/html/index.html');
});
app.get('/public/css/style.css', function(req, res) {
    res.sendfile(__dirname + '/public/css/style.css');
});
app.get('/nuko/001.jpg', function(req, res) {
    res.sendfile(__dirname + '/nuko/001.jpg');
});
app.get('/public/js/background-color.js', function(req, res) {
    res.sendfile(__dirname + '/public/js/background-color.js');
});
app.get('/public/js/client.js', function(req, res) {
    res.sendfile(__dirname + '/public/js/client.js');
});



var con = "postgres://chanu:chanu@localhost/scraping_history";
var client = new pg.Client(con);
// connect to our database
client.connect(function(err) {
    if (err) throw err;


    //new posttext in database
    io.on('connection', function(socket) {
        socket.on('posttext', function(data) {

            client.query("insert into history (category,title,midasi,url)values('a','a','a','" + data["data"] + "');");
            client.query("select * from history;", function(err, result) {
                if (err) throw err;
                var dbdata = result.rows;
                io.sockets.emit('new-responsetext', dbdata);
                console.log(dbdata);
            });
        });
    });

    io.on('connection', function(socket) {
        // execute a query on our database
        client.query('select * from history;', function(err, result) {
            if (err) throw err;
            var dbdata = result.rows;
            io.on('connection', function(socket) {
                socket.emit('old-responsetext', dbdata);
            });
        });

        // disconnect the client
        //  client.end(function(err) {
        //      if (err) throw err;
        //  });
    });
});

//comment
io.on('connection', function(socket) {
    socket.on('comment-req', function(data) {
        var comment = data["comment"];
        console.log(comment);
        socket.emit('comment-res', {
            comment: comment
        });
    });
});
