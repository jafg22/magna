//GLOBALES
var wsUri = "ws://127.0.0.1:845/magna/u/code/wsserver/server.php";
var icecastSrv = "http://127.0.0.1:8000/";
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

});

function init(){
    dumpData();
    buscaStr();
}

function dumpData(){//FUNCIONES DUMP DATA
    noticias.html('<div style="display: none;" id="status" class="col-xs-12"><i class="fa fa-circle-thin faa-flash animated">&nbsp;</i><small>Cargando...</small></div>');
    estado = $("#status");
    estado.slideDown(500);
    var path = window.location.search.split("/");
    //alert(path + " " + path.length);
    switch (path.length){
        case 1:
            if (path[0] === ""){
                master("home", 1);
                //estado.slideUp(500);
            }
            break;
        case 2:

            break;
        case 3:
            if (path[1] === "section"){
                switch (path[2]){
                    case "home":
                        master("home", 1);
                        break;
                    case "diferido":
                        SCinit(10);
                        break;
                    case "cultura":
                        master("cultura", 1);
                        break;
                    case "nosotros":
                        master("acerca de", 1);
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
        dumpData();
    });
    diferido.on("click", function(){
        window.history.pushState({"pageTitle":"Magna | Diferido"}, "Magna | Home", "index.php?/section/diferido");
        document.title = "Magna | Diferido";
        dumpData();
    });
    cultura.on("click", function(){
        window.history.pushState({"pageTitle":"Magna | Cultura"}, "Magna | Home", "index.php?/section/cultura");
        document.title = "Magna | Cultura";
        dumpData();
    });
    nosotros.on("click", function(){
        window.history.pushState({"pageTitle":"Magna | Acerca de"}, "Magna | Home", "index.php?/section/nosotros");
        document.title = "Magna | Acerca de";
        dumpData();
    });//ACCIONES NAVBAR

function SCinit(frames){//SOUNDCLOUD
    SC.initialize({
        client_id: 'a23f4aab06d0713719783b97bfe94794'
    });

    SC.get('/users/219630919/tracks', null, function(tracks) {//Obtiene pistas de magna radio
        var count = 0;
        noticias.append("<div class='col-xs-12 container'>" +
            "<div class='row'>" +
            "<h2 class='aviso'>Últimos podcasts</h2>" +
            "</div>" +
            "</div>");
        $(tracks).each(function(index, track) {
            if (count === frames){return;}//Solo descarga los ultimos 10 audios
            ++count;
            $.ajax({
                async:true,
                type:'GET',
                url:'https://soundcloud.com/oembed',
                data: {url:track.permalink_url, format:'json', maxheight:230},
                success: function(data, status, jqXHR){
                    estado.slideUp(500);
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
        $.get(icecastSrv, function(data, status){
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
                    console.log("Sesion iniciada correctamente con token");
                    //alert(JSON.stringify(data));
                    if (data.data.info == "Token vivo"){
                        location.reload();
                    }
                },
                error: function(jqXHR, status, error){
                    var data = $.parseJSON(jqXHR.responseText);
                    alert(data.data[0]);
                    if (data.data[0] == "Token vencido"){
                        console.log("Sesion expirada");
                        borraToken();
                        init();
                    }
                },
                statusCode: {
                    400: function(){

                    }
                }
            });
        } else {
            console.log("No hay token."); //No hay token en localStorage.
            init();
        }
    } else {
        console.log("Sesión registrada.");
        init();
    }
});
/*RESTAURA SESION*/

//BORRA TOKEN
function borraToken(){
    var token = localStorage.getItem("sst");
    if (token != 0 && token != undefined && token != null){
        var url = "../rest/rest.php/bortoken";
        var data = {tok:token};
        data = JSON.stringify(data);
        $.ajax({
            async:false,
            type:'POST',
            url:url,
            contentType:'application/json',
            cache:false,
            processData:false,
            data:data,
            success: function(data, status, jqXHR){
                //alert(JSON.stringify(data) + ": " + status + "\n");
                //Your code on success here
            },
            error: function(jqXHR, status, error){
                //alert(status + ": " + error);
                //Your code on error here
            },
            //Validation for different status codes
            statusCode: {
                404: function(){
                    //Your code here
                }
            }
        });
        localStorage.removeItem("sst");
    }
}
//BORRA TOKEN

/*FUNCION DE DESCARGA DE DATOS*/
function master(action, page){
    url = "../rest/rest.php/noticias";
    data = {
        seccion:action,
        pag:page
    };
    $.ajax({
        async:true,
        type:'GET',
        url:url,
        data: data,
        success: function(data, status, jqXHR){
            estado.slideUp(500);
            //alert(JSON.stringify(data) + " " + status);
            if (data.data.cultura != undefined){//PONE HEADER DE NOTICIAS Y DESCARGA
                noticias.append("<div class='col-xs-12 container'>" +
                    "<div class='row'>" +
                    "<h2 class='aviso'>Cultura</h2>" +
                    "</div>" +
                    "</div>");

                $(data.data.cultura).each(function(data, seccion){
                    //alert(JSON.stringify(seccion) + " CULTURA");
                    var final = "";
                    if (seccion.adjunto == false){
                        final = '</article>';
                    } else {
                        final = '<div class="row"> <i data-toggle="tooltip" title="Hay adjuntos en este artículo" class="col-xs-12 fa fa-clipboard"></i> </div> </article>';
                    }
                    noticias.append('<article id="' + seccion.id + '" class="col-xs-12 container"> ' +
                        '<div class="row"> <em class="col-sm-6">' + seccion.autor + '</em> ' +
                        '<small class="col-sm-6"><i class="fa fa-clock-o">&nbsp;</i>' + seccion.fecha + '</small> ' +
                        '</div> ' +
                        '<div class="row"> ' +
                        '<h1 class="col-xs-12 tituNoti">' + seccion.titulo + '</h1> ' +
                        '</div> ' +
                        '<div class="row"> ' +
                        '<p class="col-xs-12 text-justify">  ' +
                        seccion.cuerpo +
                        '</p> ' +
                        '</div>' + final);
                });
            }
            if (data.data.acercaDe != undefined){
                noticias.append("<div class='col-xs-12 container'>" +
                    "<div class='row'>" +
                    "<h2 class='aviso'>Nosotros</h2>" +
                    "</div>" +
                    "</div>");
                $(data.data.acercaDe).each(function(data, seccion){
                    //alert(JSON.stringify(seccion)  + " ACERCADE");
                    var final = "";
                    if (seccion.adjunto == false){
                        final = '</article>';
                    } else {
                        final = '<div class="row"> <i data-toggle="tooltip" title="Hay adjuntos en este artículo" class="col-xs-12 fa fa-clipboard"></i> </div> </article>';
                    }
                    noticias.append('<article id="' + seccion.id + '" class="col-xs-12 container"> ' +
                        '<div class="row"> <em class="col-sm-6">' + seccion.autor + '</em> ' +
                        '<small class="col-sm-6"><i class="fa fa-clock-o">&nbsp;</i>' + seccion.fecha + '</small> ' +
                        '</div> ' +
                        '<div class="row"> ' +
                        '<h1 class="col-xs-12 tituNoti">' + seccion.titulo + '</h1> ' +
                        '</div> ' +
                        '<div class="row"> ' +
                        '<p class="col-xs-12 text-justify">  ' +
                        seccion.cuerpo +
                        '</p> ' +
                        '</div>' + final);
                });
            }
            if (action === "home"){
                SCinit(2);
            }
        },
        error: function(jqXHR, status, error){
            var data = $.parseJSON(jqXHR.responseText);
            alert(JSON.stringify(data) + ": " + error);
            //Your code on error here
        },
        //Validation for different status codes
        statusCode: {
            404: function(){
                //Your code here
            }
        }
    });
}
/*FUNCION DE DESCARGA DE DATOS*/


//AL HACER CLICK EN HEADER
$("header h1").click(function(){
    location.href = "index.php";
});