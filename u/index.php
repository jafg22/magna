<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" http-equiv="content-type">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- ESTILOS CSS Y FAVICON-->
    <link rel="icon" type="image/png" href="media/images/favicon/magna-icon.png"/>
    <link href="styles/default-global.css" type="text/css" rel="stylesheet">
    <link href="styles/default-index.css" type="text/css" rel="stylesheet">
    <link href="third-party/bootstrap/bootstrap-3.3.5-dist/css/bootstrap.min.css" type="text/css" rel="stylesheet">
    <link href="third-party/bootstrap/bootstrap-3.3.5-dist/css/bootstrap-theme.min.css" type="text/css" rel="stylesheet">
    <link href="third-party/fontAwesome/font-awesome-4.5.0/css/font-awesome.min.css" type="text/css" rel="stylesheet">
    <link href="third-party/font-awesome-animation/dist/font-awesome-animation.min.css" type="text/css" rel="stylesheet">
    <link href="styles/fuentes/bitter/stylesheet.css">
    <link href="styles/fuentes/alex-br/stylesheet.css" rel="stylesheet">
    <link href="styles/fuentes/cinzel/stylesheet.css">
    <link href="styles/magna-player.css" rel="stylesheet">

    <!-- SCRIPTS -->
    <script src="third-party/jQuery/jquery.min.js"></script>
    <script src="https://connect.soundcloud.com/sdk.js"></script>
    <script src="https://w.soundcloud.com/player/api.js"></script>
    <script src="third-party/bootstrap/bootstrap-3.3.5-dist/js/bootstrap.min.js"></script>
    <title>Magna | Home</title>
</head>
<body>
    <?php
    session_start();
    if (isset($_SESSION['user'])){
        $sesion = true;
    } else {
        $sesion = false;
        echo "<input type='hidden' id='restoreSession' value='noauth'>";
    } ?>
    <header class="container-fluid"><!--SEMANTICO::HEADER-->
        <div class="row">
            <div id="header" class="col-xs-12 container"><!--HEADER VISIBLE-->
                <h1 id="titulo" class="col-xs-12">Magna</h1><small class="slogan col-sm-10">Más que un proyecto final.-</small>
                <div class="col-sm-2">
                    <p class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-users"></i></p>
                    <ul class="dropdown-menu">
                        <?php
                            if ($sesion){
                                echo "<li><a id='user'><i class='fa fa-user'>&nbsp;</i>".explode(" ", $_SESSION['NomC'])[0]."</a></li>";
                                echo "<li role='separator' class='divider'></li>";
                                echo "<li><a id='drlogout'><i class='fa fa-sign-out'>&nbsp;</i>Cerrar sesión</a></li>";
                            } else {
                                echo "<li><a href='login.php'><i class='fa fa-sign-in'>&nbsp;</i>Iniciar sesión/Registrarse</a></li>";
                            }
                        ?>
                        <!--<li role="separator" class="divider"></li>
                        <li><a>One more separated link</a></li>-->
                    </ul>
                </div>
            </div>
        </div>
    </header>
    <main class="container-fluid"><!--PARTE PRINCIPAL DE PAGINA-->
        <section class="row">
            <div id="menuSecciones" class="col-xs-12"><!--SECCIONES RADIO-->
                <?php include_once("code/html/navbar.html"); ?>
            </div>
        </section>

        <section class="row">
            <div id="noticias" class="col-md-9"><!--MURO DE NOTICIAS-->

            </div>
            <aside class="col-md-3 hidden-xs hidden-sm" id="side"><!--LATERAL::CHAT Y PLAYER SC-->
                <!--PLAYER MAGNA-->
                <div id="playerMagna"></div>
                <!-- CHAT -->
                <?php if ($sesion){include_once("code/html/chat.html");}?>
            </aside>
        </section>
    </main>
    <footer></footer>
    <script src="scripts/default-index.js"></script>
    <script src="scripts/magna-player.js"></script>
</body>
</html>
