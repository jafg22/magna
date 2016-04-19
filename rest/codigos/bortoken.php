<?php 

	$conexPDO->conectar();	
 	$conexPDO->Sqlquery = "call delToken('".$_GET['tok']."')"; 	
 	$conexPDO->execute();

?>