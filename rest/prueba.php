 <?php
 include_once('clsConexion.inc');
     $conex = new mysqlConn("root", "magna", "localhost", "magna");
     $conex->cnxPDO();
     $conex->pdoQuery1 = "call sp_validaToken('*E41A3DD57E3EBB6B81AB8EE4212959421D316EF1',@var)";
     $conex->pdoQuery2 = "SELECT @var";

     $resul = $conex->spOut();

     if($resul[0]['@var'] == 0){
        echo "token caduco";
     }else{
        echo "token vivo";
     }
   
/*
   $cnPDO = new mysqlConn("root", "magna", "localhost", "magna");
   $cnPDO->cnxPDO();
  
  $cnPDO->pdoQuery1= "CALL sp_login('jflores','12345',@var1,@var2);";
  $cnPDO->pdoQuery2 = "SELECT @var1,@var2;";

  $resul = $cnPDO->spOut();     

     switch ($resul[0]['@var1']) {
      case '1':
        
        break;
      case '2':
        
        break;
      case '3':
        
        break;
      case '4':
        
        list($user,$nomC,$isAdmin) = explode(";", $resul[0]['@var2']);

        $cnPDO->pdoQuery1= "call sp_newToken('".$user."',@variable)";
        $cnPDO->pdoQuery2 = "select @variable";

        $token = $cnPDO->spOut();        

        echo $token[0]['@variable'];
        break;      
      
      default:
        # code...
        break;
     }
  
/* 
  $dbms = 'mysql';
  $host = 'localhost'; 
  $db = 'magna';
  $user = 'root';
  $pass = 'magna';
  $dsn = "$dbms:host=$host;dbname=$db";

  $cn=new PDO($dsn, $user, $pass);


  $q=$cn->exec("call sp_newToken('ssalas',@variable)");
  $res=$cn->query('select @variable')->fetchAll();
  print_r($res);
*/
  ?>