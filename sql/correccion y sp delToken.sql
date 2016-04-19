DROP PROCEDURE IF EXISTS delToken;
CREATE PROCEDURE delToken(
tok  varchar(100)
)
BEGIN
DELETE FROM sessionToken where token = tok;
END;


/*-----------------------------------------------*/




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
SELECT contraU FROM usuarios WHERE usuario = usua INTO @contraIn;
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