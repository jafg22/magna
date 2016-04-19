DROP TRIGGER IF EXISTS banea_usuario;
CREATE TRIGGER `banea_usuario` BEFORE UPDATE ON `usuarios`
 FOR EACH ROW BEGIN 

select CAST((select incidencia from usuarios where usuario = NEW.usuario) AS UNSIGNED) into @contadas;

SET @dateTo = NOW();

SET @dateEnd = DATE_ADD(@dateTo, INTERVAL 3 DAY);


IF @contadas >= 3 THEN
 
    INSERT INTO baneos 
    
    VALUES(NEW.usuario,@dateTo,@dateEnd); 

END IF; 
END