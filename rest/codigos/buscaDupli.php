<?php 
 	
 	$conexPDO->conectar();

 	if ($_GET['tipo'] == "email") {
 		$conex->Sqlquery = "select usuario from usuarios where correoU = '".$_GET['valor']."'";
 		$datos =  $conex->ExecuteSelect();
 		if (count($datos) > 0) {
 			deliver_response(200, "OK",array("Existe")); 			
 		}else {
 			deliver_response(200, "OK",array("No Existe"));
 		}

 	}else{
 		$conex->Sqlquery = "select correoU from usuarios where usuario = '".$_GET['valor']."'";
 		$datos =  $conex->ExecuteSelect();
 		if (count($datos) > 0) {
 			deliver_response(200, "OK",array("Existe")); 			
 		}else {
			deliver_response(200, "OK",array("No Existe"));
 		}
 			
 	}
?>