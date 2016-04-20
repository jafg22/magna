
DROP PROCEDURE IF EXISTS sp_insUsuario;
CREATE PROCEDURE sp_insUsuario
(
IN usu VARCHAR(15),
IN correo VARCHAR(50),
IN contra VARCHAR(80),
IN nom VARCHAR(50),
IN ape VARCHAR(255)
)	

BEGIN

INSERT INTO usuarios VALUES (usu, correo, password(contra), nom, ape, 0, 0, 1);

End;