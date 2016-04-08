<?php 
	
	$data = file_get_contents("php://input");
    $valores = json_decode($data,TRUE);

    $conex->conectar();
    $conex->sqlQuery = sprintf("SELECT `usuario`,`nomU`,`apeU`,`isAdmin` 
	FROM `usuarios` WHERE `contraU`= PASSWORD('%s') AND `usuario` = '%s'",$_GET['con'],$_GET['usu']);

	$rst = $conex->executeQuery();

	if ($rst->num_rows > 0) {	
		$row = $rst->fetch_array(MYSQLI_ASSOC);
		session_start();			
			if (isset($_GET['per'])) {

				$conex->sqlQuery = sprintf("SELECT `token` FROM `sessiontoken` WHERE `usuario` = '%s'",$row['usuario']);
				$rst = $conex->executeQuery();
            	$rowT = $rst->fetch_array(MYSQLI_ASSOC);

            	$data = array("usuario" => $row["usuario"], "nomU" => $row["nomU"], "apeU" => $row["apeU"], "isAdmin" => $row["isAdmin"], "token" => $rowT["token"]);
            	deliver_response(200, "OK", $data);

			
			}else{

				$data = array("usuario" => $row["usuario"], "nomU" => $row["nomU"], "apeU" => $row["apeU"], "isAdmin" => $row["isAdmin"]);
            	deliver_response(200, "OK", $data);

			}
	
	} else {

			deliver_response(400, "Error", array("Datos Erroneos"));
	}



?>




?>