<?php
    $servidor = "localhost";
    $basedatos = "northwind";
    $usuario = "root";
    $contra = "magna";
    $conex = mysqli_connect($servidor,
        $usuario,
        $contra) or trigger_error(mysqli_error(), E_USER_ERROR);
    mysqli_select_db($conex, $basedatos);

    header("Content-Type:text/html"); //SI NO ES ESTE NO FUNCIONA

    $AuxSql = sprintf("Select Imagen, Mime from categories where CategoryID = %s", $_GET['cod']);
    $Regis = mysqli_query($conex, $AuxSql) or die(mysqli_error());
    $tupla = mysqli_fetch_assoc($Regis); //Consulta común

    if ($_GET['append'] == false){
        $response = array("mime" => "attachment/".explode("/", $tupla['Mime'])[1],
            "nombre" => "hola.pdf",
            "src" => base64_encode($tupla['Imagen']));//No hay nom en base de datos.
    } else {
        $response = array("mime" => $tupla['Mime'],
            "id" => "paraReglaCSS",
            "src" => base64_encode($tupla['Imagen']));
    }

    echo json_encode($response);
