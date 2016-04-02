<?php
    $servidor = "localhost";
    $basedatos = "northwind";
    $usuario = "root";
    $contra = "4565";
    $conex = mysql_connect($servidor,
        $usuario,
        $contra) or trigger_error(mysql_error(), E_USER_ERROR);
    mysql_select_db($basedatos, $conex);
