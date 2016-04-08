--cuando la incidencia llega a 3 agrega un baneo de 3 dias
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