CREATE VIEW vst_acercade 
AS
Select idS,nomS,idN,tituloN,fechaN,usuarioN,cuerpoN,imageA,archivoA from dinamic WHERE idS = 2 LIMIT 0,3; 

CREATE VIEW vst_acerca_de 
AS
Select idS,idN,tituloN,fechaN,usuarioN,cuerpoN,imageA FROM dinamic WHERE idS = 002; 

CREATE VIEW vst_cultura
AS
Select idS,nomS,idN,tituloN,fechaN,usuarioN,cuerpoN,imageA,archivoA from dinamic WHERE idS = 1 LIMIT 0,3; 

CREATE VIEW vst_sec_cultura
AS
Select idS,idN,tituloN,fechaN,usuarioN,cuerpoN,imageA FROM dinamic WHERE idS = 001;

CREATE VIEW vst_uninoti
AS
SELECT idN,tituloN,fechaN,usuarioN,cuerpoN,imageA FROM dinamic;  

INSERT INTO `magna`.`seccionesn` (`idSeccion`, `nomSeccion`, `descripSeccion`, `color`, `estado`) VALUES ('001', 'cultura', 'un resumen de las ultimas noticias en algunas secciones', 'red', '1');
INSERT INTO `magna`.`seccionesn` (`idSeccion`, `nomSeccion`, `descripSeccion`, `color`, `estado`) VALUES ('002', 'acerca de', 'trata temas populares de el ambito recreativo', 'blue', '1');
