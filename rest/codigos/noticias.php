<?php 

	include_once("clsConexion.inc"); 	
 	$conexPDO->conectar();

 	
 	switch ($_GET['seccion']) {
 		case 'home': 			

 			$conexPDO->Sqlquery = 'select * from vst_cultura';
 			$datos =  $conexPDO->ExecuteSelect(); 				
 			$pilaCultura = array();

 			foreach ($datos as $rows){
 				if (is_null($rows['imageA'])) {
 					$rows['imageA'] = false;
 				}else{
 					$rows['imageA'] = true;
 				}
 				if (is_null($rows['archivoA'])) {
 					$rows['archivoA'] = false;
 				}else{
 					$rows['archivoA'] = true;
 				}
 				array_push($pilaCultura,array("id" => $rows['idN'], "titulo" => $rows['tituloN'], "fecha" => $rows['fechaN'],
 				           "autor" => $rows['usuarioN'], "cuerpo" => $rows['cuerpoN'],"image" => $rows['imageA'],
 				            "adjunto" => $rows['archivoA'])); 				
 			
 			}

 			$conexPDO->Sqlquery = 'select * from vst_acercade';
 			$datos =  $conexPDO->ExecuteSelect();

 			$pilaAcercade = array();

 			foreach ($datos as $rows){

 				if (is_null($rows['imageA'])) {
 					$rows['imageA'] = false;
 				}else{
 					$rows['imageA'] = true;
 				}
 				if (is_null($rows['archivoA'])) {
 					$rows['archivoA'] = false;
 				}else{
 					$rows['archivoA'] = true;
 				}
 				array_push($pilaAcercade,array("id" => $rows['idN'], "titulo" => $rows['tituloN'], "fecha" => $rows['fechaN'],
 				           "autor" => $rows['usuarioN'], "cuerpo" => $rows['cuerpoN'],"image" => $rows['imageA'],
 				            "adjunto" => $rows['archivoA'])); 	
 			 			  			
 			}

 			$home["cultura"] = $pilaCultura;
 			$home["acercaDe"] = $pilaAcercade; 			  			
            
 			deliver_response(200, "OK", $home); 				 	

 			break;
 		
 		case 'acerca de':
            
            $max = $_GET['pag'] * 10;
            $min = $max - 10;

            $conexPDO->Sqlquery = "select * from vst_acerca_de"; 			
 			$dato =  $conexPDO->ExecuteSelect();
 			$limite =count($dato); 			
            
 			$conexPDO->Sqlquery = "select * from vst_acerca_de limit ".$min.",".$max; 			
 			$datos =  $conexPDO->ExecuteSelect(); 			

 			$pila_acercade = array();


 			foreach ($datos as $rows){
 				if (is_null($rows['imageA'])) {
 					$rows['imageA'] = false;
 				} 											
				array_push($pila_acercade,array("id" => $rows['idN'],"titulo"=>$rows['tituloN'],
							"fecha" => $rows['fechaN'] ,"autor"=>$rows['usuarioN'],"cuerpo"=>$rows['cuerpoN'],
							"imagen"=>$rows['imageA'],"adjunto" => array()));								
 			}
 			 			
 			$i=0; 			
 			foreach ($pila_acercade as $pila) {
 				
 				$conexPDO->Sqlquery = "SELECT idNoticia,archivo,mime,comentario FROM dinamic 
 									INNER JOIN adjuntosn on dinamic.idN = adjuntosn.idNoticia
									WHERE dinamic.idN = ".$pila['id'];
				$datos2 = $conexPDO->ExecuteSelect();
                
			  	foreach ($datos2 as $key) {			  		
			  		if ($key['idNoticia'] == $pila['id'] ) {
			  		  array_push($pila_acercade[$i]['adjunto'],array("id"=>$key['idNoticia'],"nombre" => $key['comentario'],"mime" => $key['mime']));
			  		  			  		 			  		  ;
			  		}				
				}
				$i=+1;													 
 			}
      	 		$acerca_de['acercaDe'] = $pila_acercade;
      	 		$acerca_de['pagina'] = array($min,$max,$limite);
 				deliver_response(200, "OK", $acerca_de);

 			 			 				 	

 			break;

 			case 'cultura':

            $max = $_GET['pag'] * 10;
            $min = $max - 10;

            $conexPDO->Sqlquery = "SELECT * FROM vst_sec_cultura"; 			
 			$dato =  $conexPDO->ExecuteSelect();
 			$limite =count($dato); 			
            
 			$conexPDO->Sqlquery = "SELECT * FROM vst_sec_cultura limit ".$min.",".$max; 			
 			$datos =  $conexPDO->ExecuteSelect(); 			

 			$pila_cultura = array();


 			foreach ($datos as $rows){
 				if (is_null($rows['imageA'])) {
 					$rows['imageA'] = false;
 				} 											
				array_push($pila_cultura,array("id" => $rows['idN'],"titulo"=>$rows['tituloN'],
							"fecha" => $rows['fechaN'] ,"autor"=>$rows['usuarioN'],"cuerpo"=>$rows['cuerpoN'],
							"imagen"=>$rows['imageA'],"adjunto" => array()));								
 			}
 			 			
 			$i=0; 			
 			foreach ($pila_cultura as $pila) {
 				
 				$conexPDO->Sqlquery = "SELECT idNoticia,archivo,mime,comentario FROM dinamic 
 									INNER JOIN adjuntosn on dinamic.idN = adjuntosn.idNoticia
									WHERE dinamic.idN = ".$pila['id'];
				$datos2 = $conexPDO->ExecuteSelect();
                
			  	foreach ($datos2 as $key) {			  		
			  		if ($key['idNoticia'] == $pila['id'] ) {
			  		  array_push($pila_acercade[$i]['adjunto'],array("id"=>$key['idNoticia'],"nombre" => $key['comentario'],"mime" => $key['mime']));
			  		  			  		 			  		  
			  		}				
				}
				$i=+1;													 
 			}
      	 		$cultura['cultura'] = $pila_cultura;
      	 		$cultura['pagina'] = array($min,$max,$limite);
 				deliver_response(200, "OK", $cultura);
 				
 				break;
 		default:
 			
 			break;
 	}




?>