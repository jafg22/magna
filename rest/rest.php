<?php 

	include_once('clsConexion.inc');
	include_once('pdoClassConex.inc');
	include_once('codigos/isAjax.php');

	$conex = new mysqlConn("root", "magna", "localhost", "magna");
	$conexPDO = new pdoConexion("localhost","mysql","root","magna","magna");	    

	header("Content-Type:application/json");
	header("Accept:application/json");

	$method = $_SERVER['REQUEST_METHOD'];
	$request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

	if (is_ajax()){

		switch ($method) {
			case 'GET':
			 	if (sizeof($request == 1)){
					if ($request[0] == 'login'){//Solicitud de login
                    	include_once("codigos/login.php");
                	}else if($request[0] == 'restore'){
                		include_once("codigos/restoreSession.php");
                	}else if ($request[0] == 'noticias') {
                		include_once("codigos/noticias.php");
                	}else if ($request[0] == 'buscaDupli') {
                		include_once("codigos/buscaDupli.php");
                	}else if ($request[0] == 'noticias') {
                		include_once("codigos/noticias.php");
                	}else if ($request[0] == 'noticiaunica') {                		
                		include_once("codigos/noticiaUnica.php");
                	}else if ($request[0] == 'getfile') {                		
                		include_once("codigos/descargas.php");
                	}else if ($request[0] == 'inicidencia') {                		
                		include_once("codigos/incidencia.php");
                	}
				}					
				break;
			
			case 'POST':
				if (sizeof($request == 1)){
					if ($request[0] == 'signup'){//Solicitud de login
                    	include_once("codigos/signup.php");
                	}if ($request[0] == 'bortoken'){//Solicitud de login
                    	include_once("codigos/bortoken.php");
                	}

				}
			
				break;
			
			case 'DELETE':
			
				break;
			
			case "PUT":
			
				break;
			
			default:
		}

	}else{

		switch ($method) {
			case 'GET':

			if (sizeof($request == 0)){
					if ($request[0] == 'login'){//Solicitud de login
                    	include_once("codigos/notAjax/login.inc");
                	}
				}
			
				break;
			
			case 'POST':

			if (sizeof($request == 1)){
					if ($request[0] == 'signup'){//Solicitud de login
                    	include_once("codigos/signup.php");
                	}

				}
			
				break;
			
			case 'DELETE':
			
				break;
			
			case "PUT":
			
				break;
			
			default:
		}

	}

/*----------------------------------------------------------------------*/
/*
/*----------------------------------------------------------------------*/

	function deliver_response($status, $status_message,$data){
    header("HTTP/1.1 $status $status_message");

    $response["status"]=$status;
    $response["status_message"]=$status_message;
    $response["data"]=$data;

    $json_response=json_encode($response);
    echo $json_response;
}



?>