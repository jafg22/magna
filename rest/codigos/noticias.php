<?php 

 	$conexPDO->conectar();

 	
 	switch ($_GET['seccion']) {
 		case 'home': 			

 			$conexPDO->Sqlquery = 'SELECT * FROM vst_home_cultura';
 			$datos =  $conexPDO->ExecuteSelect(); 				
 			$pilaCultura = array();
 			$pila_Adj_cultura=array();

 			foreach ($datos as $rows){ 								 				
 					$conexPDO->Sqlquery = "SELECT * FROM adjuntosN WHERE idNoticia = ".$rows['idNoticia'];
 					$datosAdj = $conexPDO->executeSelect(); 			
 			 	if (empty($datosAdj)) {
	 				array_push($pilaCultura,array("id" => $rows['idNoticia'], "titulo" => utf8_encode($rows['tituloN']), "fecha" => $rows['fechaN'],
 				           "autor" => $rows['usuarioN'], "cuerpo" => utf8_encode(substr($rows['cuerpoN'],0,-70))."...",
 				           "adjunto" => false));	 				
 				} else {
 				  	array_push($pilaCultura,array("id" => $rows['idNoticia'], "titulo" => utf8_encode($rows['tituloN']), "fecha" => $rows['fechaN'],
 				           "autor" => $rows['usuarioN'], "cuerpo" => utf8_encode(substr($rows['cuerpoN'],0,-70))."...",
 				           "adjunto" => true));	 				 			  	 			  	
 				   }	 				
 			
 				}
 			

 			$conexPDO->Sqlquery = 'SELECT * from vst_home_acercade';
 			$datos =  $conexPDO->ExecuteSelect();

 			$pilaAcercade = array();

 			foreach ($datos as $rows){
 								 				
 					$conexPDO->Sqlquery = "SELECT * FROM adjuntosN WHERE idNoticia = ".$rows['idNoticia'];
 					$datosAdj = $conexPDO->executeSelect(); 			
 			 	if (empty($datosAdj)) {
	 				array_push($pilaAcercade,array("id" => $rows['idNoticia'], "titulo" => utf8_encode($rows['tituloN']), "fecha" => $rows['fechaN'],
 				           "autor" => $rows['usuarioN'], "cuerpo" => utf8_encode(substr($rows['cuerpoN'],0,-70))."...",
 				           "adjunto" => false));	 				
 				} else {
 				  	array_push($pilaAcercade,array("id" => $rows['idNoticia'], "titulo" => utf8_encode($rows['tituloN']), "fecha" => $rows['fechaN'],
 				           "autor" => $rows['usuarioN'], "cuerpo" => utf8_encode(substr($rows['cuerpoN'],0,-70))."...",
 				           "adjunto" => true));	 				
 				   } 	
 			 			  			
 			}

 			$home["cultura"] = $pilaCultura;
 			$home["acercaDe"] = $pilaAcercade; 		
            
 			deliver_response(200, "OK", $home); 				 	

 			break;
 		
 		case 'acerca de':
            
           $max = $_GET['pag'] * 10;
            $min = $max - 10;

            $conexPDO->Sqlquery = "select * from vst_noticia_seccion where idSeccion = 002"; 			
 			$dato =  $conexPDO->ExecuteSelect();
 			$limite =count($dato); 			
            
 			$conexPDO->Sqlquery = "select * from vst_noticia_seccion where idSeccion = 002  ORDER BY idNoticia DESC LIMIT ".$min.",".$max; 			
 			$datos =  $conexPDO->ExecuteSelect(); 			

 			$pila_acercade = array();


 			foreach ($datos as $rows){
 															
				array_push($pila_acercade,array("id" => $rows['idNoticia'],"titulo"=>utf8_encode($rows['tituloN']),
							"fecha" => $rows['fechaN'] ,"autor"=>$rows['usuarioN'],"cuerpo"=>utf8_encode(substr($rows['cuerpoN'],0,-70)."..."),
							"adjunto" => array()));								
 			}
 			 			
 			$i=0; 			 			
 			foreach ($pila_acercade as $pila) { 				
 				
 				$conexPDO->Sqlquery = "SELECT idNoticia,nomA,mime from adjuntosN WHERE idNoticia = ".$pila['id'];
				$datos2 = $conexPDO->ExecuteSelect();

				if (empty($datos2)) {
					array_push($pila_acercade[$i]['adjunto'],false);
				}							
					foreach ($datos2 as $key) {					
			  		if ($key['idNoticia'] == $pila_acercade[$i]['id'] ) {			  		   
			  		   array_push($pila_acercade[$i]['adjunto'],array("id"=>$key['idNoticia'],"nombre" => $key['nomA'],"mime" => $key['mime']));			  		  			  		 			  		  ;
			  		}				
				}
                			
				$i=$i+1;				
 			}

      	 		$acerca_de['acercaDe'] = $pila_acercade;
      	 		$acerca_de['pagina'] = array($min,$max,$limite);
 				deliver_response(200, "OK", $acerca_de);
 			 			 				 	
 			break;

 			case 'cultura':

            $max = $_GET['pag'] * 10;
            $min = $max - 10;

            $conexPDO->Sqlquery = "select * from vst_noticia_seccion where idSeccion = 001"; 			
 			$dato =  $conexPDO->ExecuteSelect();
 			$limite =count($dato); 			
            
 			$conexPDO->Sqlquery = "select * from vst_noticia_seccion where idSeccion = 001  ORDER BY idNoticia DESC LIMIT ".$min.",".$max; 			
 			$datos =  $conexPDO->ExecuteSelect(); 			

 			$pila_cultura = array();

 			foreach ($datos as $rows){
 															
				array_push($pila_cultura,array("id" => $rows['idNoticia'],"titulo"=>utf8_encode($rows['tituloN']),
							"fecha" => $rows['fechaN'] ,"autor"=>$rows['usuarioN'],"cuerpo"=>utf8_encode(substr($rows['cuerpoN'],0,-70)."..."),
							"adjunto" => array()));								
 			}
 			 			
 			$i=0; 			 			
 			foreach ($pila_cultura as $pila) { 				
 				
 				$conexPDO->Sqlquery = "SELECT idNoticia,nomA,mime from adjuntosN WHERE idNoticia = ".$pila['id'];
				$datos2 = $conexPDO->ExecuteSelect();

				if (empty($datos2)) {
					array_push($pila_cultura[$i]['adjunto'],false);
				}							
					foreach ($datos2 as $key) {					
			  		if ($key['idNoticia'] == $pila_cultura[$i]['id'] ) {			  		   
			  		   array_push($pila_cultura[$i]['adjunto'],array("id"=>$key['idNoticia'],"nombre" => $key['nomA'],"mime" => $key['mime']));			  		  			  		 			  		  ;
			  		}				
				}
                			
				$i=$i+1;				
 			}

      	 		$cultura['cultura'] = $pila_cultura;
      	 		$cultura['pagina'] = array($min,$max,$limite);
 				deliver_response(200, "OK", $cultura);
 				
 				break;
 		default:
 			
 			break;
 	}




?>