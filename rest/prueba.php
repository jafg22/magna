 <?php
 include_once('clsConexion.inc');
   

   $cnPDO = new mysqlConn("root", "magna", "localhost", "magna");
   $cnPDO->cnxPDO();
  
  $cnPDO->pdoQuery1= "call sp_newToken('ssalas',@variable)";
  $cnPDO->pdoQuery2 = "select @variable";

  $var = $cnPDO->spOut();

 	print_r($var[0]['@variable']);
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