<?php 
		

	$conexPDO->conectar();

	header("Content-Type:text/html");

	$conexPDO->Sqlquery = "select nomA,archivo,mime FROM adjuntosn where idNoticia =".$_GET['id'];
	$datos = $conexPDO->executeSelect();

	foreach ($datos as $row) {
		$adjunto = array("mime" => "attachment/".explode("/", $row['mime'])[1],
						 "nombre" => $row['nomA'], "blob"=>base64_encode($row['archivo']));
	}

	 echo json_encode($adjunto);


?>