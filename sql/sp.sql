
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
tok  varchar(25),

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
