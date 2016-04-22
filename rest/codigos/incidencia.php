<?php 
		
		$conexPDO->conectar();
		$conexPDO->Sqlquery = "call sp_insIncidencia('".$_GET['usuario']."')";
		$conexPDO->execute();


		$conexPDO->Sqlquery = "select estadoU from usuarios where usuario = '".$_GET['usuario']."'";
		$datos = $conexPDO->executeSelect();

		foreach ($datos as $key) {
			if ($key['estadoU'] == 2) {
				deliver_response(200, "OK", array("baneado" => true));
			}else{
				deliver_response(200, "OK", array("baneado" => false));
			}
		}



		






?>