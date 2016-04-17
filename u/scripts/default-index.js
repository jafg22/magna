//GLOBALES
var wsUri = "ws://localhost:1024/magna/u/code/wsserver/server.php";

//DOM
var chat = $("#chatF");
var noticias = $("#noticias");
var lateral = $("#side");
var estado = $("#status");

var home = $("#navHome");
var diferido = $("#navDiferido");
var cultura = $("#navCultura");
var nosotros = $("#navNosotros");

$(document).ready(function(){
    descargaCuerpo();
});

//FUNCIONES DUMP DATA
function descargaCuerpo(){
    noticias.html("");
    estado.hide(500);
    estado.html("<i class='fa fa-circle-thin faa-flash animated'>&nbsp;</i><h2>Cargando</h2>");
    estado.show(500);
    var path = window.location.search.split("/");
    //alert(path + " " + path.length);
    switch (path.length){
        case 1:
            if (path[0] === ""){
                //alert("Soy home!!!");
            }
            break;
        case 2:

            break;
        case 3:
            if (path[1] === "section"){
                switch (path[2]){
                    case "home":
                        alert("Quiero home");
                        break;
                    case "diferido":
                        //alert("Quiero diferido");
                        SCinit();
                        break;
                    case "cultura":
                        alert("Quiero cultura");
                        break;
                    case "nosotros":
                        alert("Quiero acerca de");
                        break;
                }
            }
            break;
        default:

            break;
    }
}
//FUNCIONES DUMP DATA

//ACCIONES NAVBAR
    home.on("click", function(){
        window.history.pushState({"pageTitle":"Magna | Home"}, "Magna | Home", "index.php");
        document.title = "Magna | Home";
        descargaCuerpo();
    });
    diferido.on("click", function(){
        window.history.pushState({"pageTitle":"Magna | Diferido"}, "Magna | Home", "index.php?/section/diferido");
        document.title = "Magna | Diferido";
        descargaCuerpo();
    });
    cultura.on("click", function(){
        window.history.pushState({"pageTitle":"Magna | Cultura"}, "Magna | Home", "index.php?/section/cultura");
        document.title = "Magna | Cultura";
        descargaCuerpo();
    });
    nosotros.on("click", function(){
        window.history.pushState({"pageTitle":"Magna | Acerca de"}, "Magna | Home", "index.php?/section/nosotros");
        document.title = "Magna | Acerca de";
        descargaCuerpo();
    });
//ACCIONES NAVBAR

//SOUNDCLOUD
function SCinit(){
    SC.initialize({
        client_id: 'a23f4aab06d0713719783b97bfe94794'
    });

    SC.get('/users/219630919/tracks', null, function(tracks) {//Obtiene pistas de magna radio
        $(tracks).each(function(index, track) {
            $.ajax({
                async:true,
                type:'GET',
                url:'http://soundcloud.com/oembed',
                data: {url:track.permalink_url, format:'json', maxheight:230},
                success: function(data, status, jqXHR){
                    estado.hide(500);
                    estado.html("");
                    noticias.append("<h1 class='h1 tituSC'>"+ track.title +"</h1>");
                    noticias.append("<div>"+ data.html +"</div>");
                    noticias.append("<hr><tr><hr>");
                },
                error: function(jqXHR, status, error){
                    alert(status + ": " + error);
                    //Your code on error here
                },
                //Validation for different status codes
                statusCode: {
                    404: function(){
                        //Your code here
                    }
                }
            });
            //jQuery ajax function End
            //END AJAX
        });
        /*SC.oEmbed('http://soundcloud.com/user-22267088/rec-prueba-1604161754', {
            element: document.getElementById('noticia')
        }).then(function(embed){
            alert('oEmbed response: ', embed);
        });*/
    });
}
//SOUNDCLOUD
chat.ready(function(){//FUNCION CHAT
    if ($(window).width() >= 992){ws();}//Implementa acciones websocket
});//FUNCION CHAT

// FUNCIONES WEBSOCKETS INICIO
function ws(){
    //Crea a new WebSocket object.
    websocket = new WebSocket(wsUri);

    websocket.onopen = function(ev) { //Conexion abierta
        $('#message_box').append("<div class='system_msg'><i class='fa fa-server'>&nbsp;</i>Conectado.</div>"); //notify user
    };

    $('#message').on("keyup", function(evt){ //use clicks message send button
        if (evt.which == 13){
            var mymessage = $('#message').val(); //get message text
            var myname = "Sin definir"; //get user name

            if(mymessage == ""){ //emtpy message?
                alert("Escriba un mensaje.");
                return;
            }

            //Prepara json
            var msg = {
                message: mymessage,
                name: myname,
                color : 'black' //Por el momento
            };
            //convert and send data to server
            websocket.send(JSON.stringify(msg));
        }
    });

//#### Message received from server?
    websocket.onmessage = function(ev) {
        var msg = JSON.parse(ev.data); //PHP sends Json data
        var type = msg.type; //message type
        var umsg = msg.message; //message text
        var uname = msg.name; //user name
        var ucolor = msg.color; //color

        if(type == 'usermsg') {
            $('#message_box').append("<div><span class='user_name' style='color:"+ucolor+"'>"+uname+"</span> : <span class='user_message'>"+umsg+"</span></div>");
        }
        if(type == 'system') {
            $('#message_box').append("<div class='system_msg'><i class='fa fa-server'>&nbsp;</i>"+umsg+"</div>");
        }

        $("#message_box").animate({ scrollTop: $('#message_box').prop("scrollHeight")}, 200);
        $('#message').val(''); //reset text
    };

    websocket.onerror	= function(ev){$('#message_box').append("<div class='system_error'>Ha ocurrido un error.</div>");};
    websocket.onclose 	= function(ev){$('#message_box').append("<div class='system_msg'>Conexión cerrada</div>");};
}
//FUNCIONES WEBSOCKETS FIN
