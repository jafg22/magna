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

    <!-- SCRIPTS -->
    <script src="third-party/jQuery/jquery.min.js"></script>
    <script src="third-party/bootstrap/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
    <script src="scripts/default-index.js"></script>
    <title></title>
</head>
<body>
    <header class="container"><!--SEMANTICO::HEADER-->
        <div class="row">
            <div id="header" class="col-xs-12"><!--HEADER VISIBLE-->

            </div>
        </div>
    </header>
    <main class="container-fluid"><!--PARTE PRINCIPAL DE PAGINA-->
        <section class="row">
            <div id="menuSecciones" class="col-xs-12"><!--SECCIONES RADIO-->

            </div>
        </section>

        <section class="row">
            <div id="noticias" class="col-md-9"><!--MURO DE NOTICIAS-->
                <article>Esto es una noticia</article><!--PREVIEW DE NOTICIA-->
            </div>
            <aside class="col-md-3 hidden-xs hidden-sm"><!--LATERAL::CHAT Y PLAYER SC-->
                <!--PLAYER SC-->

                <!-- CHAT -->
                <aside class="col-xs-12">
                    <div class="chat_wrapper">
                        <i class="fa fa-minus fa-1x chat_controls" data-toggle="tooltip" data-placement="left" title="Minimizar"></i>
                        <i class="fa fa-close fa-1x chat_controls" data-toggle="tooltip" data-placement="left" title="Cerrar"></i>
                        <div class="message_box" id="message_box"></div>
                        <div class="panel">
                            <input type="text" name="message" id="message" placeholder="Mensaje" maxlength="500"/>
                        </div>
                </aside>
            </aside>
        </section>
    </main>
    <footer></footer>
</body>
</html>
