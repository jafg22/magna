//GLOBALES
var wsUri = "ws://10.40.60.254:845/magna/u/code/wsserver/server.php";
var icecastSrv = "http://10.40.60.254:8000/";
var colores = ['royalblue', 'indianred', 'pink', 'orange', 'lightgray'];

//DOM
var chat = $("#chatF");
var noticias = $("#noticias");
var lateral = $("#side");
var estado = $("#status");
var playerMagna = $("#playerMagna");

//Dropdown
var logout = $("#drlogout");
var user = $("#user").html();

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
            } else {
                location.href = "index.php";
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
                    default :
                        location.href = "index.php";
                        break;
                }
            } else if (path[1] === "noticia"){
                //alert("quiero noticia" + path[2]);
                noticiaunica($.trim(path[2]));
            } else {
                location.href = "index.php";
            }
            break;
        default:
            location.href = "index.php";
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
    });
    $(document).on("click", "article div h1", function(){
        //alert($(this).attr('id'));
        window.history.pushState({"pageTitle":"Magna | Nota"}, "Magna | Nota", "index.php?/noticia/" + $.trim($(this).attr('id')));
        document.title = "Magna | Nota";
        dumpData();
    });
$(document).on("click", "article div .a", function(){
    descarga($(this).attr('id'), $(this).html());
});//ACCIONES NAVBAR Y NOTICIA

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
    var color = colores[Math.floor(Math.random() * colores.length)];

    websocket.onopen = function(ev) { //Conexion abierta
        $('#message_box').append("<div class='system_msg'><i class='fa fa-server'>&nbsp;</i>Conectado.</div>"); //notify user
        /*var hist = sessionStorage.getItem("historial");
        if (hist != 0 && hist != undefined && hist != null){
            //hist = JSON.parse(hist);
            $(hist).each(function(index, msg){
                $('#message_box').append("<div><span class='user_name' style='color:" +msg.ucolor+"'>"+msg.uname+"</span> : <span class='user_message'>"+msg.umsg+"</span></div>");
            });
        }*/
    };
    $('#message').on("keyup", function(evt){ //use clicks message send button
        if (evt.which == 13){
            var mymessage = $('#message').val(); //get message text
            var myname = user; //get user name

            if(mymessage == ""){ //emtpy message?
                alert("Escriba un mensaje.");
                return;
            }

            //Prepara json
            var msg = {
                message: mymessage,
                name: myname,
                color : color //Por el momento
            };
            //convert and send data to server
            if (mymessage.includes(' caca ') || mymessage.includes(' caca') || mymessage.includes('caca ')){
                //alert('enviando xhr')
                $.get("../rest/rest.php/incidencia", {usuario:user}, function(data){
                    if (data.data.baneado){
                        alert('Usted acaba de ser baneado debido a\ndebido a vocabulario soez.');
                        borraToken(true);
                    }
                })
            }
            websocket.send(JSON.stringify(msg));
            $('#message').val(''); //reset text
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
            if (uname != null && umsg != null){
                $('#message_box').append("<div><span class='user_name' style='color:"+ucolor+"'>"+uname+"</span> : <span class='user_message'>"+umsg+"</span></div>");
                sessionStorage.setItem("historial", JSON.stringify(ev.data));
            }
        }
        if(type == 'system') {
            //$('#message_box').append("<div class='system_msg'><i class='fa fa-server'>&nbsp;</i>"+umsg+"</div>");
        }

        $("#message_box").animate({ scrollTop: $('#message_box').prop("scrollHeight")}, 200);
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
                    //alert(data.data[0]);
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
function borraToken(logout){
    var token = localStorage.getItem("sst");
    localStorage.removeItem("sst");
    if (token != 0 && token != undefined && token != null){
        var url = "../rest/rest.php/bortoken";
        var data = {tok:token};
        data = JSON.stringify(data);
        console.log("iniciando ajax");
        $.ajax({
            async:false,
            type:'POST',
            url:url,
            contentType:'application/json',
            cache:false,
            processData:false,
            data:data,
            success: function(data, status, jqXHR){
                alert(JSON.stringify(data) + ": " + status + "\n");
                //Your code on success here
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
    }
    if (logout){
        console.log("saliendo");
        location.href = "code/php/exit.php"
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
                    noticias.append('<article class="col-xs-12 container"> ' +
                        '<div class="row"> <em class="col-sm-6">' + seccion.autor + '</em> ' +
                        '<small class="col-sm-6"><i class="fa fa-clock-o">&nbsp;</i>' + seccion.fecha + '</small> ' +
                        '</div> ' +
                        '<div class="row"> ' +
                        '<h1 id="' + seccion.id + '" class="col-xs-12 tituNoti">' + seccion.titulo + '</h1> ' +
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
                    noticias.append('<article class="col-xs-12 container"> ' +
                        '<div class="row"> <em class="col-sm-6">' + seccion.autor + '</em> ' +
                        '<small class="col-sm-6"><i class="fa fa-clock-o">&nbsp;</i>' + seccion.fecha + '</small> ' +
                        '</div> ' +
                        '<div class="row"> ' +
                        '<h1 id="' + seccion.id + '" class="col-xs-12 tituNoti">' + seccion.titulo + '</h1> ' +
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
            //alert(JSON.stringify(data) + ": " + error);
            console.log("Ha habido un error en el dump de noticias.");
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

/*FUNCION PARA ACCEDER A NOTICIA UNICA*/
function noticiaunica(id){
    var url = "../rest/rest.php/noticiaunica";
    var datos = {id:id};
    $.ajax({
        async:false,
        type:'GET',
        url:url,
        data: datos,
        success: function(data, status, jqXHR){
            var adj = '';
            var img = '';
            estado.slideUp(500);
            if (data.status_message == "OK"){
                //alert(data.data.adjuntos);
                if(data.data.adjuntos != "false"){
                    adj = '<div class="row" id="adjuntos">';
                    $(data.data.adjuntos).each(function(id, adjunto){
                        adj = adj.concat('<i class="fa fa-clipboard">&nbsp;</i><a class="a" id="' + adjunto.id + '">' + adjunto.nombre + '</a>&nbsp;');
                    });
                    adj = adj.concat('</div>');
                }
                if (data.data.imagen != false){
                    img = '<div class="row"><img class="col-xs-12" src="data:image/jpg;base64, ' + encodeURI(data.data.imagen) + '" alt="Imagen noticia"> </div>';
                }

                noticias.append('<article class="col-xs-12 container"> ' +
                    '<div class="row"> ' +
                    '<em class="col-sm-6">' + data.data.autor + '</em> ' +
                    '<small class="col-sm-6"><i class="fa fa-clock-o">&nbsp;</i>' + data.data.fecha + '</small> ' +
                    '</div> ' +
                    '<div class="row"> ' +
                    '<h1 class="col-xs-12 tituNoti">' + data.data.titulo + '</h1> ' +
                    '</div> ' +
                        img +
                    '<div class="row"> ' +
                    '<p class="col-xs-12 text-justify">' + data.data.cuerpo + '</p> ' +
                    '</div> ' +
                        adj +
                    '</article>');
            }
        },
        error: function(jqXHR, status, error){
            //alert(JSON.stringify(data));
            estado.slideUp(500);
            try{
                var data = $.parseJSON(jqXHR.responseText);
                if (data.data[0] == "Noticia No Existe"){
                    noticias.append("<div class='col-xs-12 container'>" +
                        "<div class='row'>" +
                        "<h2 class='aviso'>Artículo no existe</h2>" +
                        "</div>" +
                        "</div>");
                } else {
                    noticias.append("<div class='col-xs-12 container'>" +
                        "<div class='row'>" +
                        "<h2 class='aviso'>Error al desplegar artículo</h2>" +
                        "</div>" +
                        "</div>");
                }
            } catch (e){
                location.href = "index.php";
            }
            console.log("Fallo al descargar noticia");
        },
        statusCode: {
            400: function(){

            }
        }
    });
}
/*FUNCION PARA ACCEDER A NOTICIA UNICA*/

/*FUNCION PARA DESCARGAR ADJUNTO*/
function descarga(id, nom){
    var url = "../rest/rest.php/getfile";
    var datos = {id:id,
                nom:nom};
    $.ajax({
        async:false,
        type:'GET',
        url:url,
        data: datos,
        success: function(data, status, jqXHR){
            //alert(JSON.stringify(data));
            data = JSON.parse(data);
            var obj = document.createElement('a'); //Crea elemento a
            obj.href = 'data:'+ data.mime +';base64,' + encodeURI(data.blob); //Agregada meta href
            obj.target = '_blank'; //Objetivo -> nueva pestaña
            obj.download = data.nombre; //Nombre para descarga
            document.body.appendChild(obj); //Agrega a DOM
            obj.click(); //Genera click
        },
        error: function(jqXHR, status, error){
            var data = $.parseJSON(jqXHR.responseText);
            //alert(data.data[0]);
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
}
/*FUNCION PARA DESCARGAR ADJUNTO*/

//AL HACER CLICK EN HEADER
$("header #titulo").click(function(){
    location.href = "index.php";
});

//AL HACER CLICK EN CERRAR SESION
logout.click(function(){
    borraToken(true);
});