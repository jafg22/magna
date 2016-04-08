<?php 
	
	$data = file_get_contents("php://input");
    $valores = json_decode($data,TRUE);

    $conex->conectar();
    $conex->sqlQuery = sprintf("SELECT `usuario`,`nomU`,`apeU`,`isAdmin` 
	FROM `usuarios` WHERE `contraU`= PASSWORD('%s') AND `usuario` = '%s'",$_GET['con'],$_GET['usu']);

	$rst = $conex->executeQuery();

	if ($rst->num_rows > 0) {	
		$row = $rst->fetch_array(MYSQLI_ASSOC);		
			if (isset($_GET['per'])) {

				$conex->cnxPDO();
  				$conex->pdoQuery1= "call sp_newToken('".$row['usuario']."',@variable)";
  				$conex->pdoQuery2 = "select @variable";

			    $token = $conex->spOut();

            	$data = array("usuario" => $row["usuario"], "nomU" => $row["nomU"], "apeU" => $row["apeU"], "isAdmin" => $row["isAdmin"], "token" => $token[0]['@variable']);
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