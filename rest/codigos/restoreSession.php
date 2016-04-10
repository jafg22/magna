<?php 

 	 $conex->cnxPDO();
     $conex->pdoQuery1 = "call sp_validaToken('".$_GET['token']."',@var)";
     $conex->pdoQuery2 = "SELECT @var";

     $resul = $conex->spOut();

     if($resul[0]['@var'] == 0){
        deliver_response(400, "OK", array('Token vencido'));
     }else{
        deliver_response(200, "OK", array('Token vivo'));
     }

?>