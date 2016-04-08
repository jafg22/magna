<?php 

	include_once('clsConexion.inc');
	include_once('codigos/isAjax.php');

	$conex = new mysqlConn("root", "magna", "localhost", "magna");    

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
                	}
				}					
				break;
			
			case 'POST':
			
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

			if (sizeof($request == 1)){
					if ($request[0] == 'login'){//Solicitud de login
                    	include_once("codigos/notAjax/login.inc");
                	}
				}
			
				break;
			
			case 'POST':
			
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