CREATE VIEW vst_home_acercade
AS
Select idNoticia,tituloN,fechaN,usuarioN,cuerpoN,image,muronoticias.idSeccion,seccionesn.nomSeccion  from muronoticias 
INNER JOIN seccionesn on seccionesn.idSeccion = muronoticias.idSeccion 
WHERE muronoticias.idSeccion = 002
ORDER BY idNoticia DESC LIMIT 3 

CREATE VIEW vst_home_cultura
AS
Select idNoticia,tituloN,fechaN,usuarioN,cuerpoN,image,muronoticias.idSeccion,seccionesn.nomSeccion  from muronoticias 
INNER JOIN seccionesn on seccionesn.idSeccion = muronoticias.idSeccion 
WHERE muronoticias.idSeccion = 001
ORDER BY idNoticia DESC LIMIT 3 

CREATE VIEW vst_noticia_seccion
AS
Select idNoticia,tituloN,fechaN,usuarioN,cuerpoN,muronoticias.idSeccion,image, seccionesn.nomSeccion FROM muronoticias
INNER JOIN seccionesn on seccionesn.idSeccion = muronoticias.idSeccion 

CREATE VIEW vst_noticia_unica
AS
SELECT idNoticia,tituloN,fechaN,usuarioN,image,cuerpoN FROM muronoticias 