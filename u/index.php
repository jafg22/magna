<?php
    //BD CONEXION
    include_once("../rest/clsConexion.inc");
    $cnx = new mysqlConn("root", "magna", "localhost", "magna");
    if ($cnx->conectar()){ echo "Conectado a BD"; } else { echo "No conectado a BD"; }
    //BD CONEXION

    $_SERVER['DOCUMENT_ROOT']."magna/u/code/wsserver/server.php "
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" http-equiv="content-type">

    <!-- ESTILOS CSS -->
    <link href="styles/default-global.css" type="text/css" rel="stylesheet">
    <link href="third-party/bootstrap/bootstrap-3.3.5-dist/css/bootstrap.css" type="text/css" rel="stylesheet">
    <link href="third-party/fontAwesome/font-awesome-4.4.0/css/font-awesome.css" type="text/css" rel="stylesheet">

    <!-- SCRIPTS -->
    <script src="third-party/jQuery/jquery.min.js"></script>
    <script src="scripts/default-index.js"></script>
    <title></title>
</head>
<body>
    <header></header>
    <main>
        <aside>
            <!-- CHAT -->
            <div class="chat_wrapper">
                <div class="message_box" id="message_box"></div>
                <div class="panel">
                    <input type="text" name="name" id="name" placeholder="Your Name" maxlength="10" style="width:20%"  />
                    <input type="text" name="message" id="message" placeholder="Message" maxlength="80" style="width:60%" />
                    <button id="send-btn">Send</button>
                </div>
        </aside>
    </main>
    <footer></footer>
</body>
</html>
