CREATE VIEW vst_home_acercade
AS
Select idNoticia,tituloN,fechaN,usuarioN,cuerpoN,image,muroNoticias.idSeccion,seccionesN.nomSeccion  from muroNoticias
INNER JOIN seccionesN on seccionesN.idSeccion = muroNoticias.idSeccion
WHERE muroNoticias.idSeccion = 002
ORDER BY idNoticia DESC LIMIT 3;

CREATE VIEW vst_home_cultura
AS
Select idNoticia,tituloN,fechaN,usuarioN,cuerpoN,image,muroNoticias.idSeccion,seccionesN.nomSeccion  from muroNoticias
INNER JOIN seccionesN on seccionesN.idSeccion = muroNoticias.idSeccion
WHERE muroNoticias.idSeccion = 001
ORDER BY idNoticia DESC LIMIT 3;

CREATE VIEW vst_noticia_seccion
AS
Select idNoticia,tituloN,fechaN,usuarioN,cuerpoN,muroNoticias.idSeccion,image, seccionesN.nomSeccion FROM muroNoticias
INNER JOIN seccionesN on seccionesN.idSeccion = muroNoticias.idSeccion;

CREATE VIEW vst_noticia_unica
AS
SELECT idNoticia,tituloN,fechaN,usuarioN,image,cuerpoN FROM muroNoticias;