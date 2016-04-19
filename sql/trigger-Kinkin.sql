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



/*para actualizar noticias*/

DROP TRIGGER IF EXISTS IdinamicN;
CREATE TRIGGER IdinamicN 
BEFORE INSERT ON muroNoticias
FOR EACH ROW 
BEGIN 
call sp_home(1);
END; 



DROP TRIGGER IF EXISTS UdinamicN;
CREATE TRIGGER UdinamicN 
BEFORE UPDATE ON muroNoticias
FOR EACH ROW 
BEGIN 
call sp_home(1);
END; 


DROP TRIGGER IF EXISTS DdinamicN;
CREATE TRIGGER DdinamicN 
BEFORE DELETE ON muroNoticias
FOR EACH ROW 
BEGIN 
call sp_home(1);
END; 


/*---------------------para adjuntos-------------------------*/
DROP TRIGGER IF EXISTS IdinamicA;
CREATE TRIGGER IdinamicA 
BEFORE INSERT ON adjuntosN
FOR EACH ROW 
BEGIN 
call sp_home(1);
END; 

DROP TRIGGER IF EXISTS UdinamicA;
CREATE TRIGGER UdinamicA 
BEFORE UPDATE ON adjuntosN
FOR EACH ROW 
BEGIN 
call sp_home(1);
END; 


DROP TRIGGER IF EXISTS DdinamicA;
CREATE TRIGGER DdinamicA 
BEFORE DELETE ON adjuntosN
FOR EACH ROW 
BEGIN 
call sp_home(1);
END; 
