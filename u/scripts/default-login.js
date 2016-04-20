//Login form vars
var loginForm = $("#loginForm");
var txtUser = $("#inputEmail3");
var txtPsswd = $("#inputPassword3");
var recuerdame = $("#recuerdame");
var loginInfo = $("#loginTitle");

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

$(document).ready(function(){
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
                alert("...");
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
});

//ACCIONES LOGIN
//Acciones en submit de form
loginForm.submit(function(evt){
    evt.preventDefault();
    var url = "../rest/rest.php/login";

    var recuerda;
    if (recuerdame[0].checked){
        recuerda = "s";
        var datos = {
            usu:txtUser.val(),
            con:txtPsswd.val(),
            per:recuerda
        };
    } else {
        var datos = {
            usu:txtUser.val(),
            con:txtPsswd.val(),
        };
    }

    $.ajax({
        async:false,
        type:'GET',
        url:url,
        data: datos,
        success: function(data, status, jqXHR){
            if (data.status == 200){
                var token = data.data.token;
                if (token != 0 && token != undefined && token != null){
                    //alert(token);
                    localStorage.removeItem("sst");
                    localStorage.setItem("sst", token);
                }
                loginInfo.html("<i style='color: mediumseagreen' class='fa fa-hand-lizard-o faa-shake animated'>&nbsp;</i>Hola " + data.data.NomC);//Cobra taka taka :v
                setTimeout(function(){location.href = "index.php";}, 1000);
            }
        },
        error: function(jqXHR, status, error){
            var data = $.parseJSON(jqXHR.responseText);
            if (data.data[0] == 2){
                loginInfo.html("<i style='color: red' class='fa fa-warning faa-flash animated'>&nbsp;</i>Contraseña errónea");
                txtPsswd.val("");
                txtPsswd.focus();
                setTimeout(function(){loginInfo.html("Inicio de sesión");}, 3000);
            } else if (data.data[0] == 1){
                loginInfo.html("<i style='color: red' class='fa fa-warning faa-flash animated'>&nbsp;</i>Este usuario no existe");
                txtUser.val("");
                txtUser.focus();
                setTimeout(function(){loginInfo.html("Inicio de sesión");}, 3000);
            }
            console.log("Error en login REST");
        },
        //Validation for different status codes
        statusCode: {
            400: function(){

            }
        }
    });
});
//ACCIONES LOGIN

modal.submit(function(evt){
    evt.preventDefault();
    //alert($("#g-recaptcha-response").val() + " respuesta");
    if ($("#g-recaptcha-response").val() != ""){
        if (modalEmailGroup[0].getAttribute("class") == "form-group has-success"
            && modalUsuGroup[0].getAttribute("class") == "form-group has-success"){
            if (modalPsswd.val() === modalPsswd2.val()){
                var url = "../rest/rest.php/signup";
                var data = {
                    usuario:modalUser.val(),
                    correo:modalEmail.val(),
                    contra:modalPsswd.val(),
                    nom:modalNom.val(),
                    ape:modalApe.val()
                };
                data = JSON.stringify(data);
                $.ajax({
                    async:true,
                    type:'POST',
                    url:url,
                    contentType:'application/json',
                    cache:false,
                    processData:false,
                    data:data,
                    success: function(data, status, jqXHR){
                        if (data.data[0] === "Registro Exitoso"){
                            modalForm.toggle();
                            setTimeout(function(){
                                if (confirm("Enhorabuena " + modalNom.val() + "\n\n¿Desea iniciar sesión ahora?")){
                                    txtUser.val(modalUser.val());
                                    txtPsswd.val(modalPsswd.val());
                                    loginForm.trigger('submit');
                                } else {
                                    location.reload();
                                }
                            }, 1000);
                        }

                    },
                    error: function(jqXHR, status, error){
                        alert("Lo lamentamos.\n\nPor alguna razón su registro ha fallado.\nLo invitamos a intentarlo de nuevo.");
                    },
                    //Validation for different status codes
                    statusCode: {
                        404: function(){
                            //Your code here
                        }
                    }
                });
            } else {alert("Las contraseñas no coinciden.\n Dígítalas de nuevo por favor.");}
        } else if (modalEmailGroup[0].getAttribute("class") == "form-group has-error"){
            alert("Su correo se encuentra ocupado. \nPor favor, escriba otro.");
        } else if(modalUsuGroup[0].getAttribute("class") == "form-group has-error"){
            alert("Su usuario se encuentra ocupado. \nPor favor, escriba otro.");
        } else {
            alert("Lamentamos el inconveniente.\n\nTenemos inconsistencias en la información.\nPor favor, escriba de nuevo su e-mail y usuario.");
        }
    } else {
        alert("Por favor, completa el reCaptcha.");
    }
});

//Busca por email repetido
modalEmail.on("focusout", function(){
    buscaduplicados("email");
});

modalUser.on("focusout", function(){
    buscaduplicados("usu");
});

function buscaduplicados(field){
    var valor = "";
    if (field == "email"){
        valor = modalEmail.val();
    } else {
        valor = modalUser.val();
    }
    if (valor === ""){
        return;
    }
    var data = {tipo:field, valor:valor};
    $.get("../rest/rest.php/buscaDupli", data,
        function(data, status){
            //alert(data.status + status);
            if (status === "success"){
                if (data.status == 200){
                    if (data.data[0] == 'disponible'){
                        //PREGUNTA SI ES EMAIL O USUARIO
                        if (field === "email"){
                            modalEmailGroup[0].setAttribute("class", "form-group has-success");
                            modalTitle.html('<i style="color: lightseagreen" class="fa fa-check faa-flash animated">&nbsp;</i>Correo electrónico disponible.');
                            setTimeout(function(){
                                modalTitle.html('Formulario de registro');
                            }, 5000);
                        } else {
                            modalUsuGroup[0].setAttribute("class", "form-group has-success");
                            modalTitle.html('<i style="color: lightseagreen" class="fa fa-check faa-flash animated">&nbsp;</i>Usuario disponible.');
                            setTimeout(function(){
                                modalTitle.html('Formulario de registro');
                            }, 5000);
                        }
                    } else {
                        //PREGUNTA SI ES EMAIL O USUARIO
                        if (field == "email"){
                            modalEmailGroup[0].setAttribute("class", "form-group has-error");
                            modalTitle.html('<i style="color: red" class="fa fa-warning faa-flash animated">&nbsp;</i>Correo electrónico ya ocupado.');
                            setTimeout(function(){
                                modalTitle.html('Formulario de registro');
                            }, 5000);
                        } else {
                            modalUsuGroup[0].setAttribute("class", "form-group has-error");
                            modalTitle.html('<i style="color: red" class="fa fa-warning faa-flash animated">&nbsp;</i>Usuario ya ocupado.');
                            setTimeout(function(){
                                modalTitle.html('Formulario de registro');
                            }, 5000);
                        }
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


