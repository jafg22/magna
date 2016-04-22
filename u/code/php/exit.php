<?php
header ("Cache-Control: no-cache, must-revalidate");
header ("Pragma: no-cache");
session_start();
unset($_SESSION['user']);
unset($_SESSION['auten']);
unset($_SESSION['NomC']);
unset($_SESSION['isAdm']);
unset($_SESSION['tok']);
unset($_SESSION['correo']);
session_destroy();
header("Location: ../../index.php");
exit();