<?php 
//php para el registro de usuarios.

	$data = file_get_contents("php://input");
    $valores = json_decode($data,TRUE);

    $conex->conectar();

    $conex->sqlQuery = "call sp_insUsuario('".$valores['usuario']."','".$valores['correo']."','".$valores['contra']."',
    				'".ucwords(strtolower($valores['nom']))."','".ucwords(strtolower($valores['ape']))."')";


	 if ($conex->execute()){
	 	deliver_response(200, "OK", array("Registro Exitoso"));
	 }else{
        deliver_response(400, "OK", array("Registro Fallido"));
	 }






?>