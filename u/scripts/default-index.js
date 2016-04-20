//GLOBALES
var wsUri = "ws://localhost:1024/magna/u/code/wsserver/server.php";

//DOM
var chat = $("#chatF");
var noticias = $("#noticias");
var lateral = $("#side");
var estado = $("#status");
var playerMagna = $("#playerMagna");

//NAV
var home = $("#navHome");
var diferido = $("#navDiferido");
var cultura = $("#navCultura");
var nosotros = $("#navNosotros");

//CHAT
var closeChat = $("#chatClose");
var minChat = $("#chatMin");

$(document).ready(function(){
    descargaCuerpo();
    buscaStr();
});

function descargaCuerpo(){//FUNCIONES DUMP DATA
    noticias.html('<div style="display: none;" id="status" class="col-xs-12"><i class="fa fa-circle-thin faa-flash animated">&nbsp;</i><small>Cargando...</small></div>');
    estado = $("#status");
    estado.slideDown(500);
    var path = window.location.search.split("/");
    //alert(path + " " + path.length);
    switch (path.length){
        case 1:
            if (path[0] === ""){
                //alert("Soy home!!!");
                estado.slideUp(500);
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
}//FUNCIONES DUMP DATA

    home.on("click", function(){//ACCIONES NAVBAR
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
    });//ACCIONES NAVBAR

function SCinit(){//SOUNDCLOUD
    SC.initialize({
        client_id: 'a23f4aab06d0713719783b97bfe94794'
    });

    SC.get('/users/219630919/tracks', null, function(tracks) {//Obtiene pistas de magna radio
        var count = 0;
        $(tracks).each(function(index, track) {
            ++count;
            $.ajax({
                async:true,
                type:'GET',
                url:'http://soundcloud.com/oembed',
                data: {url:track.permalink_url, format:'json', maxheight:230},
                success: function(data, status, jqXHR){
                    estado.slideUp(500);
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
            if (count === 10){return;}//Solo descarga los ultimos 10 audios
        });
    });
}//SOUNDCLOUD

chat.ready(function(){//FUNCION CHAT
    if ($(window).width() >= 992){ws(true);}//Implementa acciones websocket
});//FUNCION CHAT

// FUNCIONES WEBSOCKETS INICIO

/*Acciones botones chat*/
closeChat.click(function(){
    ws(false);
});

minChat.click(function(){
    var chatContext = $("#message_box");
    var chatTxt = $("#textChat");
    if (chatContext.hasClass("occult")){
        chatContext.removeClass("occult");
        chatTxt.removeClass("occult");
        chat.css('margin-top', '-225px');
    } else {
        chatContext.addClass("occult");
        chatTxt.addClass("occult");
        chat.css('margin-top', '-21px');
    }
});
/*Acciones botones chat*/
function ws(open){
    if (!open){
        websocket.close();
        chat.remove();
        return;
    }
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
}//FUNCIONES WEBSOCKETS FIN

//INICIO BUSCA STREAM
    function buscaStr(){
        $.get("http://localhost:8000/", function(data, status){
            data = new XMLSerializer().serializeToString(data);
            if (data.includes('/magna')){
                //alert("magna mounted");
                    playerMagna.html('<div class="player-container"> ' +
                        '<div class="player-wrap"> <div class="play-pause"></div> ' +
                        '<section class="song-meta"> ' +
                        '<div class="artist">Magna Radio</div> ' +
                        '<div style="color: red; font-weight: bold" class="song">VIVO</div> ' +
                        '<div class="timeline"></div> ' +
                        '<span class="pcast-currenttime pcast-time"></span> ' +
                        '</section> ' +
                        '<audio onended="buscaStr(true);" id="main-audio" preload="metadata" width="100%" src="http://127.0.0.1:8000/magna"> ' +
                        '</audio> </div> </div>');
                        console.log("Radio encendida, inicializando...");
            } else {
                //alert("magna umounted");
                console.log("Radio apagada... intentando de nuevo en 15 sec.");
                playerMagna.html('<div class="player-container"> ' +
                    '<div class="player-wrap"> ' +
                    '<section class="song-meta"> ' +
                    '<div class="artist">Magna Radio</div> ' +
                    '<div style="color: grey" class="song">Fuera de línea</div> ' +
                    '<div class="timeline"></div> ' +
                    '<span class="pcast-currenttime pcast-time"></span> ' +
                    '</section>' +
                    '</div> </div>');
                    setTimeout(function(){buscaStr()}, 15000);
            }
        }).fail(function(){
            console.log("Icecast apagado... intentando de nuevo en 1 min.");
            playerMagna.html('<div class="player-container"> ' +
                '<div class="player-wrap"> ' +
                '<section class="song-meta"> ' +
                '<div class="artist">Magna Radio</div> ' +
                '<div style="color: grey" class="song">Fuera de línea</div> ' +
                '<div class="timeline"></div> ' +
                '<span class="pcast-currenttime pcast-time"></span> ' +
                '</section>' +
                '</div> </div>');
            setTimeout(function(){buscaStr()}, 60000);
        });
    }
//FIN BUSCA STREAM

/*RESTAURA SESION*/
$("#restoreSession").ready(function(){ //Elemento html que es insertado en cuerpo de index si no hay $_SESSION['auth']
    if ($("#restoreSession").val() == "noauth"){
        //alert("Sin sesion!!!");
        var token = localStorage.getItem("sst");
        if (token != 0 && token != undefined && token != null){ //Si hay token en localStorage
            var url = "../rest/rest.php/restore";
            var datos = {token:token};
            console.log("Intentando recuperar sesion");
            $.ajax({
                async:false,
                type:'GET',
                url:url,
                data: datos,
                success: function(data, status, jqXHR){
                  alert(status);
                    //Error unexpected token
                },
                error: function(jqXHR, status, error){
                    var data = $.parseJSON(jqXHR.responseText);
                    alert(JSON.stringify(data));
                    //Fallo rest
                },
                statusCode: {
                    400: function(){

                    }
                }
            });
        } else {
            console.log("No hay token."); //No hay token en localStorage, redireccionado a login
            //location.href = "login.php";
        }
    } else {
        //Hay una $_SESSION['auth']
    }
});
/*RESTARUA SESION*/