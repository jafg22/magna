//Modal vars
var modal = $("#myModal");
var modalForm = $("#modalForm");
var modalTitle = $("#tituModal");
var modalEmailGroup = $("#modalEmailgroup");
var modalUsuGroup = $("#modalUsugroup");
var modalEmail = $("#txtEmail");
var modalUser = $("#txtUser");
var modalNom = $("#txtNom");
var modalApe = $("#txtApe");
var modalPsswd = $("#txtPasswd");
var modalPsswd2 = $("#txtPasswd2");

//VALIDA CAPTCHA
var captchResponse = "";

modal.submit(function(evt){
    evt.preventDefault();
    //alert($("#g-recaptcha-response").val() + " respuesta");

    /*if (modalEmailGroup[0].getAttribute("class") == "form-group has-success" && modalUsuGroup[0].getAttribute("class") == "form-group has-success"){
        if (modalPsswd.val() === modalPsswd2.val()){
            var data = {
                email:modalEmail.val(),
                nombre:modalNom.val(),
                contra:modalPsswd.val()
            };
            $.post("../rest/rest.php/signup", data,
                function(data, status){
                    if (status === "success"){
                        if (data.status == 200){
                            alert("Gracias por registrarse\n\n" +
                                "Datos de usuario:\n" +
                                "Nombre: " + data.data.nombre + "\n" +
                                "E-mail: " + data.data.email + "\n" +
                                "Contaseña: *****" +
                                "\n\n" +
                                "Llave para usuarios avanzados: " + data.data.token + "\n\n" +
                                "Puede proceder a iniciar sesión");
                            modalEmailGroup[0].setAttribute("class", "form-group");
                            modalTitle.html("<i class='fa fa-user'>&nbsp;</i>¡Aloha " + data.data.nombre + "!");
                            modalForm[0].reset();
                        }
                    }
                });
        } else {alert("Las contraseñas no coinciden.\n Dígítalas de nuevo por favor.");}
    } else if (modalEmailGroup[0].getAttribute("class") == "form-group has-error"){
        alert("Su correo ya está ocupado en nuestra Base de Datos. \nPor favor, escriba otro.");
    } else {
        alert("Lamentamos el inconveniente.\n\nTenemos inconsistencias en la información.\nPor favor, escriba de nuevo su e-mail.");
    }*/
});

//Busca por email repetido
modalEmail.on("focusout", function(){
    buscaduplicados("email");
});

modalUser.on("focusout", function(){
    buscaduplicados("user");
});

function buscaduplicados(field){
    var email = modalEmail.val();
    if (field === "email"){
        //data con email
    } else {
        //data con user
    }
    var data = {campo:field, data:"123"};
    $.get("../rest/rest.php/buscadupli", data,
        function(data, status){
            if (status === "success"){
                if (data.status == 200){
                    if (data.data.info == 'disponible'){
                        //PREGUNTA SI ES EMAIL O USUARIO


                        modalEmailGroup[0].setAttribute("class", "form-group has-success");
                        modalTitle.html('<i style="color: lightseagreen" class="fa fa-check faa-flash animated">&nbsp;</i>Correo electrónico disponible.');
                        setTimeout(function(){
                            modalTitle.html('Formulario de registro');
                        }, 5000);
                    } else {
                        //PREGUNTA SI ES EMAIL O USUARIO


                        modalEmailGroup[0].setAttribute("class", "form-group has-error");
                        modalTitle.html('<i style="color: red" class="fa fa-warning faa-flash animated">&nbsp;</i>Correo electrónico ya ocupado.');
                        setTimeout(function(){
                            modalTitle.html('Formulario de registro');
                        }, 5000);
                    }
                }
            }
        });
}

function loadCaptcha(){
    grecaptcha.render('captcha', {
        'sitekey' : '6LeWuB0TAAAAAA_5eaCxLHKLmwU68DclQPSgKhN3',
        'size' : 'compact',
    });
}


