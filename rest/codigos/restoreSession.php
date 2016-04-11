<?php 

 	 $conex->cnxPDO();
     $conex->pdoQuery1 = "call sp_validaToken('".$_GET['token']."',@est,@info)";
     $conex->pdoQuery2 = "SELECT @est,@info";

     $resul = $conex->spOut();

     if($resul[0]['@est'] == 0){     	
        deliver_response(400, "OK", array('Token vencido'));
     }else{

     	list($user,$correo,$nomC,$isAdmin) = explode(";", $resul[0]['@info']);
     	session_start();
     	$_SESSION['auten']="Si";
     	$_SESSION['user'] = $user;
     	$_SESSION['correo'] = $correo;
     	$_SESSION['NomC'] = $nomC;
     	$_SESSION['isAdm'] = $isAdmin;

     	$data = array("usuario"=>$user,"correo"=>$correo,"NomC"=>$nomC,"isAdm"=>$isAdmin,"info"=>"Token vivo");

        deliver_response(200, "OK", $data);
     }

?>