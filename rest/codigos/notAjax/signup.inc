<?php 
//php para el registro de usuarios.

	$data = file_get_contents("php://input");
    $valores = json_decode($data,TRUE);

    $conex->conectar();

    $conex->sqlQuery = "call sp_insUsuario('".$valores['usuario']."','".$valores['correo']."','".$valores['contra']."',
    				'".$valores['nom']."','".$valores['ape']."','".$valores['isAdm']."','".$valores['inciden']."','".$valores['est']."')";


	 if ($conex->execute()){
	 	deliver_response(200, "OK", array("Registro Exitoso"));
	 }else{
        deliver_response(400, "OK", array("Registro Fallido"));
	 }






?>