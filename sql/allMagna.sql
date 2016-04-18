CREATE DATABASE magna CHARACTER SET utf8 COLLATE utf8_general_ci;

use magna;

/*table estadoUsuario*/
/*when the user is banned */
DROP TABLE IF EXISTS estado;
 CREATE TABLE estado
(
idEstado tinyint NOT NULL,
estado varchar(50) NOT NULL,
PRIMARY KEY (idEstado)
);

 /*table usuarios, correou pk*/
 DROP TABLE IF EXISTS usuarios;
 CREATE TABLE usuarios
(
usuario varchar(15) NOT NULL,
correoU varchar(50) NOT NULL,
contraU varchar(80) NOT NULL,
nomU varchar(50) NOT NULL,
apeU varchar(255) NOT NULL,
isAdmin boolean NOT NULL,
incidencia tinyint NOT NULL,
estadoU tinyint NOT NULL,
PRIMARY KEY (usuario),
FOREIGN KEY (estadoU) REFERENCES estado(idEstado)
);

DROP TABLE IF EXISTS baneos;
 CREATE TABLE baneos
(
usuBaneo varchar(15) NOT NULL,
fechaBaneo date NOT NULL,
fechaCaduca date NOT NULL,
FOREIGN KEY (usuBaneo) REFERENCES usuarios(usuario)
);



 /*table sessionToken*/
 /* for persistent sessions */
 DROP TABLE IF EXISTS sessionToken;
 CREATE TABLE sessionToken
(
usuario varchar(15) NOT NULL,
token varchar(100) NOT NULL,
caducidad date NOT NULL,
FOREIGN KEY (usuario) REFERENCES usuarios(usuario)
);

 /*table seccionesN*/
 /* sections for news */
 DROP TABLE IF EXISTS seccionesN;
 CREATE TABLE seccionesN
(
idSeccion varchar(100) NOT NULL,
nomSeccion varchar(200) NOT NULL,
descripSeccion varchar(1000) NOT NULL,
color varchar(50) NOT NULL,
estado tinyint NOT NULL,
PRIMARY KEY (idSeccion),
FOREIGN KEY (estado) REFERENCES estado(idEstado)
);

/*table muroNoticias*/
 /* a wall to news */
 DROP TABLE IF EXISTS muroNoticias;
 CREATE TABLE muroNoticias
(
idNoticia int auto_increment NOT NULL,
tituloN varchar(100) NOT NULL,
fechaN date NOT NULL,
usuarioN varchar(100) NOT NULL,
cuerpoN varchar(5000) NOT NULL,
idSeccion varchar(100) NOT NULL,
image longblob varchar(100),
PRIMARY KEY (idNoticia), 
FOREIGN KEY (usuarioN) REFERENCES usuarios(usuario),
FOREIGN KEY (idSeccion) REFERENCES seccionesN(idSeccion)
);
ALTER TABLE `muronoticias` ADD `image` LONGBLOB ;

/*table adjuntosN*/
 /* attachments to news */
 DROP TABLE IF EXISTS adjuntosN;
 CREATE TABLE adjuntosN
(
idNoticia int NOT NULL,
archivo longblob NOT NULL,
mime varchar(100) NOT NULL,
comentario varchar(1000) NOT NULL UNIQUE,
FOREIGN KEY (idNoticia) REFERENCES muroNoticias(idNoticia)
);

/*table comentariosMuro*/
 /* to comment on the news */
 DROP TABLE IF EXISTS comentariosMuro;
 CREATE TABLE comentariosMuro
(
idNoticia int NOT NULL,
usuario varchar(100) NOT NULL,
comentario varchar(1000) NOT NULL,
FOREIGN KEY (idNoticia) REFERENCES muroNoticias(idNoticia),
FOREIGN KEY (usuario) REFERENCES usuarios(usuario)
);


/*bitacora de movimientos*/
 DROP TABLE IF EXISTS bitaMovimientos;
 CREATE TABLE bitaMovimientos
(
idB int auto_increment NOT NULL,
fecha dateTime NOT NULL,
tabla varchar(12) NOT NULL,
movimiento varchar(12) NOT NULL,
usuario varchar(40) NOT NULL,
PRIMARY KEY (idB) 
);

/*tabla para uso de consultas*/
 DROP TABLE IF EXISTS dinamic;
 CREATE TABLE dinamic
(
idS varchar(100) NOT NULL,
nomS varchar(200) NOT NULL,
descripS varchar(1000) NOT NULL,
colorS varchar(50) NOT NULL,
estadoS tinyint NOT NULL,
idN int,
tituloN varchar(100),
fechaN date,
usuarioN varchar(100),
cuerpoN varchar(5000),
imageA longblob,
idNoticiaA int,
archivoA longblob,
mimeA varchar(100),
comentarioA varchar(1000) 
);



/*-------------------------------------------sp ---------------------------------------------------*/



/*agregaincidencia
solo se hace un call('usuario')
agrega la incidencia y cuando llega a trs limpia y banea

 automatico a 2 pero se puede en un IN! ?
*/
DROP PROCEDURE IF EXISTS sp_insIncidencia;
CREATE PROCEDURE sp_insIncidencia
(
IN usu VARCHAR(15))	
BEGIN

SET @incide =  CAST((SELECT incidencia FROM usuarios WHERE usuario = usu) AS UNSIGNED);
set @incide = @incide + 1;

 UPDATE usuarios SET incidencia = @incide WHERE usuario = usu;

 IF @incide >= 3 THEN 
 UPDATE usuarios SET incidencia = '0', estadoU = '2' WHERE usuario = usu;
 END IF;

End;

/*creaestado*/

DROP PROCEDURE IF EXISTS sp_insEstado;
CREATE PROCEDURE sp_insEstado
(
IN idE tinyint(4),
IN estado varchar(50)
)	

BEGIN

INSERT INTO estado VALUES (idE, estado);

End;





/*creausuarios*/

DROP PROCEDURE IF EXISTS sp_insUsuario;
CREATE PROCEDURE sp_insUsuario
(
IN usu VARCHAR(15),
IN correo VARCHAR(50),
IN contra VARCHAR(80),
IN nom VARCHAR(50),
IN ape VARCHAR(255),
IN admi boolean,
IN incide tinyint(4),
IN estado tinyint(4))	

BEGIN

INSERT INTO usuarios VALUES (usu, correo, password(contra), nom, ape, admi, incide, estado);

End;

/*creaseccion*/
DROP PROCEDURE IF EXISTS sp_insSeccion;
CREATE PROCEDURE sp_insSeccion
(
IN idS VARCHAR(100),
IN nomS VARCHAR(200),
IN descS VARCHAR(1000),
IN colS VARCHAR(50),
IN estadoS tinyint(4))	

BEGIN

INSERT INTO seccionesn VALUES (idS, nomS, descS, colS, estadoS);

End;



/*crea token*/
/*se ejecuta asi: call('usuario',@variable); select @variable*/
DROP PROCEDURE IF EXISTS sp_newToken;
CREATE PROCEDURE sp_newToken(
usuario  varchar(15),
OUT pret varchar(100)
)
BEGIN

set @token = PASSWORD(DATE_FORMAT(NOW(6),'%Y-%M-%D %h:%i:%s:%f')); 
set @caduca = DATE_ADD(NOW(), INTERVAL 7 DAY);
SET pret = @token;
insert into sessiontoken value(usuario,@token,@caduca);

END;



/*para login
1 = usuario no existe
2 = mala contra
3 = banneado
4 = login correcto
*/
DROP PROCEDURE IF EXISTS sp_login;
CREATE PROCEDURE sp_login(
usua  varchar(15),
contra  varchar(50),
OUT login int(4),
OUT info varchar(500)
)
BEGIN
SET @contra = PASSWORD(contra); 
SELECT CAST((SELECT contraU FROM usuarios WHERE usuario = usua) AS UNSIGNED ) INTO @contraIn;
SELECT CAST((SELECT COUNT(contraU) FROM usuarios WHERE usuario = usua) AS UNSIGNED ) INTO @exis;
SELECT CAST((SELECT estadoU FROM usuarios WHERE usuario = usua) AS UNSIGNED ) INTO @estado;

IF @exis = 0 THEN
 SET login = 1;
 SET info = 'user does not exist';
ELSEIF @contra != @contraIn THEN 
 SET login = 2; 
 SET info = 'password incorrect';
ELSEIF @estado = 2 THEN 
SET login = 3;
 SET info = 'user is banned';
ELSE 
SET login = 4;
SELECT concat(usuario,';', nomU,' ',apeU,';',isAdmin,';') INTO info from usuarios where usuario = usua;
END IF;
END;


/*sp de validar si el token ya caduco*/

DROP PROCEDURE IF EXISTS sp_validaToken;
CREATE PROCEDURE sp_validaToken(
tok  varchar(100),

OUT info boolean
)
BEGIN
select caducidad into @caduca from sessionToken where token = tok;
SELECT CAST((SELECT COUNT(usuario) FROM sessionToken WHERE token = tok) AS UNSIGNED ) INTO @exis;
select date(now()) into @actual;

IF @exis = 0 THEN
SET info = 1;
ELSEIF @caduca >= @actual THEN
SET info = 1;
ELSE
SET info = 0;
END IF;
END;


DROP PROCEDURE IF EXISTS sp_insNoticia;
CREATE PROCEDURE `sp_insNoticia`(

IN titU VARCHAR(100),
IN fechaN date,
IN usuarioN VARCHAR(15),
IN cuerpoN VARCHAR(5000),
IN seccion VARCHAR(100)
)
BEGIN

INSERT INTO muronoticias VALUES (titU, fechaN, usuarioN, cuerpoN, seccion);

End;

DROP PROCEDURE IF EXISTS sp_home;
CREATE PROCEDURE sp_home(
in alu int
)
BEGIN
delete from dinamic where 1;

INSERT INTO dinamic
SELECT
seccionesN.idSeccion, seccionesN.nomSeccion, seccionesN.descripSeccion, seccionesN.color, seccionesN.estado,

muroNoticias.idNoticia, muroNoticias.tituloN, muroNoticias.fechaN, muroNoticias.usuarioN,
muroNoticias.cuerpoN, muroNoticias.image,

adjuntosN.idNoticia, adjuntosN.archivo, adjuntosN.mime, adjuntosN.comentario

FROM seccionesN JOIN muroNoticias ON seccionesN.idSeccion  = muroNoticias.idSeccion
JOIN adjuntosN ON muroNoticias.idNoticia = adjuntosN.idNoticia group BY(adjuntosN.comentario) order by(muroNoticias.idNoticia);

set alu=0;
select count(idNoticia) from muroNoticias into @con;
  my_for: LOOP
  
            SET alu=alu+1;
            
            insert into dinamic select 
            seccionesN.idSeccion, seccionesN.nomSeccion, seccionesN.descripSeccion, seccionesN.color, seccionesN.estado,
            muroNoticias.idNoticia, muroNoticias.tituloN, muroNoticias.fechaN, muroNoticias.usuarioN,
            muroNoticias.cuerpoN, muroNoticias.image, null,null,null,null
            from muroNoticias JOIN seccionesN ON seccionesN.idSeccion=muroNoticias.idSeccion  
            where muroNoticias.idNoticia = alu and (select count(idN) from dinamic where idN = alu) = 0 order by (muroNoticias.idNoticia); 
            
            IF alu = @con THEN
                  LEAVE my_for;
            END IF;
            
  END LOOP my_for;
END;



/*-----------------------------------------------------trigger------------------------------------*/
/*cuando la incidencia llega a 3 agrega un baneo de 3 dias*/
DROP TRIGGER IF EXISTS banea_usuario;
CREATE TRIGGER banea_usuario 
BEFORE UPDATE ON usuarios
FOR EACH ROW 
BEGIN 

select CAST((select NEW.incidencia from usuarios) AS UNSIGNED) into @contadas;

SET @dateTo = NOW();

SET @dateEnd = DATE_ADD(@dateTo, INTERVAL 3 DAY);


IF @contadas >= 3 THEN
 
    INSERT INTO baneos 
    
    VALUES(NEW.usuario,@dateTo,@dateEnd); 

END IF; 
END; 



/*--------------------------------------insert---------------------------------------------------*/




/* Insertar de antemano el estado con código 1 en tabla estados */
call sp_insSeccion('001','home','un resumen de las ultimas noticias en algunas secciones','red',1);
call sp_insSeccion('002','cultura','trata temas populares de el ambito recreativo','blue',1);
call sp_insSeccion('003','social','expresa temas de indole social y politico, situaciones de gobiernos, cambios de leyes, etc','gray',1);
call sp_insSeccion('004','magna','informacion acerca de magna','purple',1);




call sp_insNoticia(1,'cambio administrativo',date(now()),'dmorera','Magna radio ha vendido parte de sus acciones a imbersionistas extranjeros, lo que ha obligado a la empresa a hacer un fuerte cambio administrativo','004');
call sp_insNoticia(2,'La Fertilización In Vitro ',date(now()),'achavez','del latín In vitro: En cristal-, es una técnica de reproducción asistida aplicada actualmente en gran parte de la población mundial, por diversas razones. Suele ser utilizada como última instancia para tratar la infertilidad.','003');
call sp_insNoticia(3,'Estimulación Ovárica',date(now()),'eorias','Se trata de tratamientos hormonales aplicados sobre la paciente en determinada fase de su ciclo menstrual con el fin de obtener ovulación ','001');
call sp_insNoticia(4,'Recuperación de ovocitos',date(now()),'farguedas','El proceso de ovulación tiene lugar 36 horas después de aplicadas las dosis de medicamentos en la fase anterior, por esto, la extracción de ovocitos debe darse antes de que esto ocurra.','002');
call sp_insNoticia(5,'Maduración de ovocitos',date(now()),'da','Proceso posterior a la extracción de los ovocitos. Estas células son muy sensibles, principalmente a la temperatura y la sangre –anticuerpos-','002');
call sp_insNoticia(6,'Fecundación (In Vitro – ICSI)',date(now()),'dmorera','Si la cifra de conteo brinda una relación 75000:1, espermatozoides respecto a ovocitos, el procedimiento suele ser llevado a cabo in vitro, de lo contrario se opta por la inyección de espermatozoides.','004');
call sp_insNoticia(7,'Transferencia de embriones',date(now()),'dmorera','Según el criterio de un embriólogo se puntúan los embriones y transfieren a la madre.','004');


call sp_insNoticia(8,'Lorem ipsum ',date(now()),'dmorera','tincidunt elit ex nec est. Donec condimentum a magna id venenatis. Aliquam porta eget odio id iaculis. Donec eget odio dignissim, scelerisque lectus eget, luctus lor','001');
call sp_insNoticia(9,'quam urna,  ',date(now()),'dmorera',' Fusce ut interdum velit. Sed vestibulum, libero et interdum tempus, urna est tempor eros, ut lacin','002');
call sp_insNoticia(10,' iaculis sed',date(now()),'dmorera','Duis nec malesuada tellus. Curabitur maximus quis odio in semper. Cras posuere ex a dignissim dictum','003');
call sp_insNoticia(11,'ipsum Lorem ',date(now()),'dmorera','nulla in, fringilla vehicula nisl. Nunc ex sem, porta nec egestas vitae, hendrerit sed ante. Nullam in odio quis sem','001');
call sp_insNoticia(12,'quam iaculis',date(now()),'dmorera',' Mauris non commodo elit. Nulla viverra nisl velit','001');
call sp_insNoticia(13,'iaculis Lorem',date(now()),'dmorera','Maecenas sed facilisis ante. Duis nec malesuada tellus. Curabitur maximus quis odio in semper. Cras posuere ex a dignissim dictum.','003');







