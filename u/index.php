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
            <div id="header" class="col-xs-12"><!--HEADER VISIBLE-->
                <h1 class="h1">Magna</h1><small class="slogan">Más que un proyecto final.-</small>
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
                <!--PREVISTA SIN IMAGEN-->
                <article class="col-xs-12 container">
                    <div class="row">
                        <em class="col-sm-6">egonzalezm24</em>
                        <small class="col-sm-6"><i class="fa fa-clock-o">&nbsp;</i>24/04/2016</small>
                    </div>
                    <div class="row">
                        <h1 class="col-xs-12 tituNoti">Titulo de noticia</h1>
                    </div>
                    <div class="row">
                        <p class="col-xs-12 text-justify">
                            Nunc a sodales nulla. Aliquam eu urna quis purus aliquet ultrices non sed ante. Maecenas fermentum eu metus sed vulputate. Suspendisse justo arcu, viverra nec massa a, rutrum finibus enim. Aliquam molestie sapien non tellus sollicitudin scelerisque. In fringilla nibh in nibh posuere euismod. Praesent eu porta urna.
                        </p>
                    </div>
                    <div class="row">
                        <i data-toggle="tooltip" title="Hay adjuntos en este artículo" class="col-xs-12 fa fa-clipboard"></i>
                    </div>
                </article>
                <!--PREVISTA SIN IMAGEN-->

                <!--VISTA COMPLETA-->
                <article class="col-xs-12 container">
                    <div class="row">
                        <em class="col-sm-6">egonzalezm24</em>
                        <small class="col-sm-6"><i class="fa fa-clock-o">&nbsp;</i>24/04/2016</small>
                    </div>
                    <div class="row">
                        <h1 class="col-xs-12 tituNoti">Titulo de noticia</h1>
                    </div>
                    <div class="row">
                        <p class="col-xs-12 text-justify">
                            Praesent gravida felis vulputate, vulputate nunc eget, consequat dui. Aliquam justo sem, sagittis quis congue eu, porta eu turpis. Sed non nunc tellus. Nulla in iaculis tellus. Aenean dictum commodo accumsan. In faucibus, sapien varius tincidunt ultrices, est eros imperdiet massa, eleifend sagittis lectus lorem viverra libero. Maecenas leo ante, mollis et faucibus et, convallis sed turpis. Morbi lectus erat, commodo a arcu pellentesque, molestie iaculis neque. Sed nibh nibh, bibendum aliquet nibh id, ultrices viverra erat. Fusce tincidunt vestibulum tempus. In dignissim convallis nibh, sed sagittis magna lacinia et. Etiam in ornare quam. Suspendisse eu vestibulum ex. Maecenas eu ultrices tellus, eu posuere ligula. In iaculis, lectus consequat finibus laoreet, urna dolor lobortis turpis, nec semper odio augue ac lorem. Maecenas accumsan, nisi nec porttitor fringilla, ligula erat rutrum lacus, quis gravida metus nisi eget ex.
                            <br><br>
                            Aliquam quis consectetur turpis. Ut nec ante tellus. Pellentesque orci enim, blandit sit amet efficitur nec, eleifend quis diam. Etiam at justo eu leo malesuada tristique eget nec dolor. Sed accumsan pulvinar turpis sit amet euismod. Morbi sed massa vel neque facilisis efficitur a vitae lacus. Nullam euismod a sapien eget ultrices. Fusce rutrum est eget magna convallis, pellentesque finibus ipsum volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut magna rutrum, finibus elit non, vulputate metus. Aenean ornare orci leo, nec rhoncus eros feugiat ut. Nulla libero sapien, aliquam non faucibus eget, pharetra in arcu. Suspendisse ultricies nibh enim, quis rhoncus ipsum sagittis id. Phasellus lacus erat, faucibus et pharetra vel, volutpat at sem.
                            <br><br>
                            Curabitur leo diam, egestas vitae ornare at, posuere sollicitudin purus. Duis gravida, urna ut dignissim eleifend, ipsum massa volutpat turpis, at rhoncus lorem lectus semper eros. Aenean dapibus, ipsum pulvinar scelerisque dignissim, nisl nibh dignissim eros, sed consequat ex lorem iaculis mauris. Nunc sed diam eget neque imperdiet lobortis. Vestibulum tristique convallis diam id interdum. Nam risus eros, pulvinar in dui vitae, pulvinar facilisis lorem. Praesent luctus ultrices massa, et bibendum arcu accumsan quis. Donec aliquet augue et dui congue, dictum aliquet risus rutrum. Vestibulum dignissim faucibus urna sed elementum. Aenean lacinia aliquet sem eu hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas vitae accumsan risus. Aenean tristique porta nulla, eget gravida nisi condimentum in. Phasellus sed mauris imperdiet, congue velit at, eleifend urna. Duis eget odio a velit hendrerit commodo.
                        </p>
                    </div>
                    <div class="row" id="adjuntos">
                        <a><i class="fa fa-clipboard">&nbsp;</i>Adjunto 1</a>&nbsp;
                        <a><i class="fa fa-clipboard">&nbsp;</i>Adjunto 2</a>&nbsp;
                        <a><i class="fa fa-clipboard">&nbsp;</i>Adjunto 3</a>
                    </div>
                </article>
                <!--VISTA COMPLETA-->
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
