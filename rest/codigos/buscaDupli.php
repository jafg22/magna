<?php 
 	
 	$conexPDO->conectar();

 	if ($_GET['tipo'] == "email") {
 		$conexPDO->Sqlquery = "select correoU from usuarios where correoU = '".$_GET['valor']."'";
 		$datos =  $conexPDO->ExecuteSelect();
 		if (count($datos) > 0) {
 			deliver_response(200, "OK",array("disponible")); 			
 		}else{
 			deliver_response(200, "OK",array("no disponible"));
 		}

 	}else if($_GET['tipo'] == "usu"){
 		$conexPDO->Sqlquery = "select usuario from usuarios where usuario = '".$_GET['valor']."'";
 		$datos =  $conexPDO->ExecuteSelect();
 		if (count($datos) > 0) {
 			deliver_response(200, "OK",array("disponible")); 			
 		}else {
			deliver_response(200, "OK",array("no disponible"));
 		}
 			
 	}
?>