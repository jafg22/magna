<?php 

	$data = file_get_contents("php://input");
    $valores = json_decode($data,TRUE);

	$conexPDO->conectar();	
 	$conexPDO->Sqlquery = "call delToken('".$valores['tok']."')"; 	
 	$conexPDO->execute();

?>