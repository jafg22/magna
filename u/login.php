<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" http-equiv="content-type">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- ESTILOS CSS Y FAVICON -->
    <link rel="icon" type="image/png" href="media/images/favicon/magna-icon.png"/>
    <link href="styles/default-global.css" type="text/css" rel="stylesheet">
    <link href="third-party/bootstrap/bootstrap-3.3.5-dist/css/bootstrap.min.css" type="text/css" rel="stylesheet">
    <link href="third-party/fontAwesome/font-awesome-4.5.0/css/font-awesome.min.css" type="text/css" rel="stylesheet">

    <!-- SCRIPTS -->
    <script src="third-party/jQuery/jquery.min.js"></script>
    <script src="third-party/bootstrap/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
    <script src="scripts/default-login.js"></script>
    <title>Magna Radio | Login</title>
</head>
<body>
<main>
    <header id="header">
        <h1 </h1>
    </header>
    <section id="form">
        <div class="container">
            <article class="row">
                <div class="col-md-5 col-lg-6"><!-- ASIDE LEFT::INFO -->
                    <h1>HOLA</h1>
                </div>
                <aside class="col-md-7 col-lg-6"><!-- ASIDE RIGH::LOGIN -->
                    <h2 class="h3" id="loginTitle">Inicio de sesión</h2>
                    <form class="form-horizontal col-xs-12 container" method="GET" id="loginForm" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <div class="form-group row">
                            <label for="inputEmail3" class="col-xs-3 control-label">Usuario</label>
                            <div class="col-xs-9 col-xs-offset-2">
                                <input type="text" class="form-control" id="inputEmail3" placeholder="Usuario" required name="txtUser" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="inputPassword3" class="col-xs-3 control-label">Contraseña</label>
                            <div class="col-xs-9 col-xs-offset-2">
                                <input type="password" class="form-control" id="inputPassword3" placeholder="Contraseña" required name="txtPsswd">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-xs-9 col-xs-offset-2">
                                <input id="recuerdame" name="recuerdame" type="checkbox" class="checkbox-inline"><label for="recuerdame" style="padding-left: 5pt;">Mantener sesión iniciada</label>
                            </div>
                            <br><br>
                            <div class="col-xs-6 col-xs-offset-4">
                                <button id="btnEnter" type="submit" class="btn btn-default">Entrar</button>
                            </div>
                            <hr>
                            <h4 id="auxh4" class="h4 col-xs-12">¿No tiene cuenta?</h4>
                            <div class="col-xs-6 col-xs-offset-4">
                                <button id="btnRegis" type="button" id="btnRegis" class="btn btn-primary btn-primary" data-toggle="modal" data-target="#myModal">Registrarse</button>
                            </div >
                        </div>
                    </form>
                </aside>
            </article>
        </div>

        <!-- MODAL FORM -->
        <?php include_once('code/fragments/modal-login.html'); ?>
    </section>
    <footer>
        <h4>Powered by: <a href="mailto:emilio.gm00@gmail.com">CRC</a><small>.&nbsp;UTN, Campus Juan Manuel Mora Porras, 2015 <i class="fa fa-creative-commons"></i></small></h4>
    </footer>
    <div id="qStatus">
    </div>
</main>
<!-- If JS not enabled -->
<?php include_once('code/noscript') ?>
</body>
</html>
