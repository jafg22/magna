//GLOBALES
var wsUri = "ws://localhost:1024/magna/u/code/wsserver/server.php";

//DOM
var chat = $("#chatF");
var home = $("#navHome");
var diferido = $("#navDiferido");
var cultura = $("#navCultura");
var nosotros = $("#navNosotros");

$(document).ready(function(){
    descargaCuerpo();
});

//FUNCIONES DUMP DATA
function descargaCuerpo(){
    var path = window.location.search.split("/");
    alert(path + " " + path.length);
    switch (path.length){
        case 1:
            if (path[0] === ""){
                alert("Soy home!!!");
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
                        alert("Quiero diferido");
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
        window.history.pushState("Magna", "Magna || Home", "index.php");
        descargaCuerpo();
    });
    diferido.on("click", function(){
        window.history.pushState("Magna", "Magna || Home", "index.php?/section/diferido");
        descargaCuerpo();
    });
    cultura.on("click", function(){
        window.history.pushState("Magna", "Magna || Home", "index.php?/section/cultura");
        descargaCuerpo();
    });
    nosotros.on("click", function(){
        window.history.pushState("Magna", "Magna || Home", "index.php?/section/nosotros");
        descargaCuerpo();
    });
//ACCIONES NAVBAR

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
