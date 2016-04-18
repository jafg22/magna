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

    <!-- SCRIPTS -->
    <script src="third-party/jQuery/jquery.min.js"></script>
    <script src="third-party/bootstrap/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?onload=loadCaptcha&size=compact&hl=es" async defer></script>
    <title>Magna | Login</title>
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
                <?php include_once("code/html/signup-login.html"); ?>
            </article>
        </div>

        <!-- MODAL FORM -->
        <?php include_once('code/html/modal-login.html'); ?>
    </section>
    <footer>
        <h4>Powered by: <a href="mailto:emilio.gm00@gmail.com">CRC</a><small>.&nbsp;UTN, Campus Juan Manuel Mora Porras, 2015 <i class="fa fa-creative-commons"></i></small></h4>
    </footer>
    <div id="qStatus">
    </div>
</main>
<script src="scripts/default-login.js"></script>
<!-- If JS not enabled -->
<?php include_once('code/noscript') ?>
</body>
</html>
