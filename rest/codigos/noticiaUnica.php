<?php 

 		$conexPDO->conectar();

 		if (isset($_GET['isAdmin'])) {

 			$conexPDO->Sqlquery = "SELECT * FROM vst_noticia_unica WHERE idNoticia =".$_GET['id'];
 			$datos = $conexPDO->executeSelect();
 			$pila_Adj=array();

 			if (empty($datos)) {
 			  deliver_response(400, "OK", array("Noticia No Existe"));
 			 }else{ 			

 			foreach ($datos as $row) {
 				if (is_null($row['image'])) {
 					$row['image'] = false;
 				}else{
 					$row['image'] = base64_encode($row['image']);
 				} 				 	
 			   $noticia = array("id"=>$row['idNoticia'],"titulo"=>$row['tituloN'],"fecha"=>$row['fechaN'],
 			   					"autor"=>$row['usuarioN'],"cuerpo"=>$row['cuerpoN'],"imagen"=>$row['image'],"adjuntos" => "");

 			}           
 			$conexPDO->Sqlquery = "SELECT idNoticia,nomA,mime from adjuntosN WHERE idNoticia = ".$noticia['id'];
 			$datosAdj = $conexPDO->executeSelect();
 			
 			 if (empty($datosAdj)) { 			 	
 				array_push($pila_Adj,false);	 				
 			  }else {
 			  	foreach ($datosAdj as $key) { 				 			
 				array_push($pila_Adj,array("id" => $key['idNoticia'],"nombre"=>$key['nomA'],"mime" => $key['mime'])); 				 			 				 				
 			}
 			  	
 			}

 			
            $noticia['adjuntos'] = $pila_Adj;

            deliver_response(200, "OK", $noticia);             						

 			}

 			 			 			
 		}else {

 			$conexPDO->Sqlquery = "SELECT * FROM vst_noticia_unica WHERE idNoticia =".$_GET['id'];
 			$datos = $conexPDO->executeSelect();
 			$pila_Adj=array();

 			if (empty($datos)) {
 			  deliver_response(400, "OK", array("Noticia No Existe"));
 			 }else{ 	 			

 			foreach ($datos as $row) {
 				if (is_null($row['image'])) {
 					$row['image'] = false;
 				}else{
 					$row['image'] = base64_encode($row['image']);
 				} 			 	
 			   $noticia = array("id"=>$row['idNoticia'],"titulo"=>$row['tituloN'],"fecha"=>$row['fechaN'],
 			   					"autor"=>$row['usuarioN'],"cuerpo"=>$row['cuerpoN'],"imagen"=>$row['image'],"adjuntos" => "");


 			}           
 			$conexPDO->Sqlquery = "SELECT idNoticia,nomA,mime from adjuntosN WHERE idNoticia = ".$noticia['id'];
 			$datosAdj = $conexPDO->executeSelect();
 			
 			 if (empty($datosAdj)) { 			 	
 				array_push($pila_Adj,false);	 				
 			  }else {
 			  	foreach ($datosAdj as $key) { 				 			
 				array_push($pila_Adj,array("id" => $key['idNoticia'],"nombre"=>$key['nomA'],"mime" => $key['mime'])); 				 			 				 				
 			}
 			  	
 			}

 			
            $noticia['adjuntos'] = $pila_Adj;

            deliver_response(200, "OK", $noticia);    
 		}
}



?>