 <?php
 include_once('clsConexion.inc');
    


    /* $conex = new mysqlConn("root", "magna", "localhost", "magna");
     $conex->cnxPDO();
      $conex->pdoQuery1 = "call sp_validaToken('*DC2D55E81A17467C84718EE6435203381187EE1F',@est,@info)";
     $conex->pdoQuery2 = "SELECT @est,@info";

     $resul = $conex->spOut();

     if($resul[0]['@est'] == 0){
        echo "token caduco";
     }else{        

      list($user,$correo,$nomC,$isAdmin) = explode(";", $resul[0]['@info']);
      session_start();
      $_SESSION['auten']="Si";
      $_SESSION['user'] = $user;
      $_SESSION['correo'] = $correo;
      $_SESSION['NomC'] = $nomC;
      $_SESSION['isAdm'] = $isAdmin;


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