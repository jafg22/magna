<?php
// php para el inicio de sesión de los usuarios.
 	 $conex->cnxPDO();
     $conex->pdoQuery1 = "CALL sp_login('".$_GET['usu']."','".$_GET['con']."',@var1,@var2)";
     $conex->pdoQuery2 = "SELECT @var1,@var2";

     $resul = $conex->spOut();     

     switch ($resul[0]['@var1']) {
     	case '1':
     			deliver_response(400, "ERROR", array(1,"Usuario no existe"));     		
     		break;
     	case '2':
     			deliver_response(400, "ERROR", array(2,"Contraseña erronea"));     		
     		break;
     	case '3':
     			deliver_response(400, "ERROR", array(3,"Usuario baneado"));     		
     		break;
     	case '4':
     		
     			list($user,$nomC,$isAdmin) = explode(";", $resul[0]['@var2']);

     			if (isset($_GET['per'])) {
     		
     				$conex->pdoQuery1= "call sp_newToken('".$user."',@variable)";
  					$conex->pdoQuery2 = "select @variable";

					$token = $conex->spOut();

    	       		$data = array("usuario" => $user, "NomC" => $nomC, "isAdmin" => $isAdmin, "token" => $token[0]['@variable']);
        	    	deliver_response(200, "OK", $data);

            	}else{

            		$data = array("usuario" => $user, "NomC" => $nomC, "isAdmin" => $isAdmin);
            		deliver_response(200, "OK", $data);
            	}        

     		break;			
     	
     	default:
     			deliver_response(400, "ERROR", array("Error de consulta"));
     		break;
     }


?>

