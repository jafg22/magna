<?php
header("charset:utf-8");
//Guarda archivo de texto en variable
$archivo = file_get_contents('EULA.txt');

//Formatea primer letra a mayuscula
$archivo = ucfirst($archivo);

//Hace los saltos de linea "enter" en tag <br/>
$archivo = nl2br($archivo);

echo '<p style="width: 100%; padding-left: 20%; padding-right: 20%;" align="justify">'.$archivo.'</p>';