<?php
    date_default_timezone_set("America/Costa_Rica");

    session_start();
    if (isset($_SESSION['user'])){
        unset($_SESSION['user']);
        unset($_SESSION['NomC']);
        unset($_SESSION['isAdm']);
        if (isset($_SESSION['tok'])){
            //Borra token
        }
        session_destroy();
    }
?>
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
    <link href="third-party/font-awesome-animation/dist/font-awesome-animation.min.css" type="text/css" rel="stylesheet">
    <link href="styles/fuentes/alex-br/stylesheet.css" rel="stylesheet">
    <link href="styles/fuentes/bitter/stylesheet.css">
    <link href="styles/fuentes/cinzel/stylesheet.css">
    <!-- SCRIPTS -->
    <script src="third-party/jQuery/jquery.min.js"></script>
    <script src="third-party/bootstrap/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?onload=loadCaptcha&size=compact&hl=es" async defer></script>
    <title>Magna | Login</title>
</head>
<body>
<main>
    <header class="container-fluid"><!--SEMANTICO::HEADER-->
        <div class="row">
            <div id="header" class="col-xs-12"><!--HEADER VISIBLE-->
                <h1 class="h1">Magna</h1><small class="slogan">Más que un proyecto final.-</small>
            </div>
        </div>
    </header>
    <section id="form">
        <div class="container">
            <article class="row">
                <div class="col-md-5 col-lg-6 hidden-xs"><!-- ASIDE LEFT::INFO -->
                    <h1 style="padding-bottom: 25pt; padding-top: 15pt" class="loginSide">Aquí puedes acceder a:</h1>
                    <div>
                        <h1 class="loginSide"><i style="color: grey" class="fa fa-newspaper-o faa-pulse animated-hover">&nbsp;</i>Notas de actualidad</h1>
                    </div>
                    <hr>
                    <div>
                        <h1 class="loginSide"><i style="color: royalblue" class="fa fa-music faa-float animated-hover">&nbsp;</i>Streaming en Vivo</h1>
                    </div>
                    <hr>
                    <div>
                        <h1 class="loginSide"><i style="color: orangered" class="fa fa-soundcloud faa-horizontal animated-hover">&nbsp;</i>Podcasts alojados en Soundcloud</h1>
                    </div>
                </div>
                <?php include_once("code/html/signin-login.html"); ?>
            </article>
        </div>

        <!-- MODAL FORM -->
        <?php include_once('code/html/modal-login.html'); ?>
    </section>
    <footer class="container-fluid hidden-xs">
        <div class="row">
            <div id="footer" class="col-xs-12">
                <h4>Powered by: <a href="mailto:service.desk@magna.com">CRC</a><small>.&nbsp;UTN, Campus Juan Manuel Mora Porras, <?php echo date("Y"); ?> <i class="fa fa-creative-commons"></i></small></h4>
            </div>
        </div>
    </footer>
</main>
<script src="scripts/default-login.js"></script>
<!-- If JS not enabled -->
<?php include_once('code/noscript') ?>
</body>
</html>
