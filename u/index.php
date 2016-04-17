<?php
    //BD CONEXION
    include_once("../rest/clsConexion.inc");
    $cnx = new mysqlConn("root", "magna", "localhost", "magna");
    $cnx->conectar();
    //BD CONEXION
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" http-equiv="content-type">

    <!-- ESTILOS CSS Y FAVICON-->
    <link rel="icon" type="image/png" href="media/images/favicon/magna-icon.png"/>
    <link href="styles/default-global.css" type="text/css" rel="stylesheet">
    <link href="third-party/bootstrap/bootstrap-3.3.5-dist/css/bootstrap.min.css" type="text/css" rel="stylesheet">
    <link href="third-party/fontAwesome/font-awesome-4.5.0/css/font-awesome.min.css" type="text/css" rel="stylesheet">
    <link href="third-party/font-awesome-animation/dist/font-awesome-animation.min.css" type="text/css" rel="stylesheet">
    <link href="styles/fuentes/bitter/stylesheet.css">

    <!-- SCRIPTS -->
    <script src="third-party/jQuery/jquery.min.js"></script>
    <script src="//connect.soundcloud.com/sdk.js"></script>
    <script src="http://w.soundcloud.com/player/api.js"></script>
    <script src="third-party/bootstrap/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
    <title>Magna | Home</title>
</head>
<body>
    <header class="container"><!--SEMANTICO::HEADER-->
        <div class="row">
            <div id="header" class="col-xs-12"><!--HEADER VISIBLE-->
                <h1 class="h1">Magna</h1>
            </div>
        </div>
    </header>
    <main class="container-fluid"><!--PARTE PRINCIPAL DE PAGINA-->
        <section class="row">
            <div id="menuSecciones" class="col-xs-12"><!--SECCIONES RADIO-->
                <?php include_once("code/fragments/navbar.html"); ?>
            </div>
        </section>

        <section class="row">
            <div id="noticias" class="col-md-9"><!--MURO DE NOTICIAS-->
                <article id="status"></article>
                <article>Esto es una noticia</article><!--PREVIEW DE NOTICIA-->
            </div>
            <aside class="col-md-3 hidden-xs hidden-sm" id="side"><!--LATERAL::CHAT Y PLAYER SC-->
                <!--PLAYER SC-->

                <!-- CHAT -->
                <?php include_once("code/fragments/chat.html"); ?>
            </aside>
        </section>
    </main>
    <footer></footer>
    <script src="scripts/default-index.js"></script>
</body>
</html>
