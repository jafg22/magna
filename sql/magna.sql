/*table estadoUsuario*/
/*when the user is banned */
 CREATE TABLE estado
(
idEstado tinyint NOT NULL,
estado varchar(50) NOT NULL,
PRIMARY KEY (idEstado)
);

 /*table usuarios, correou pk*/
 CREATE TABLE usuarios
(
usuario varchar(15) NOT NULL,
correoU varchar(50) NOT NULL,
contraU varchar(40) NOT NULL,
nomU varchar(50) NOT NULL,
apeU varchar(255) NOT NULL,
isAdmin boolean NOT NULL,
incidencia tinyint NOT NULL,
estadoU tinyint NOT NULL,
PRIMARY KEY (usuario),
FOREIGN KEY (estadoU) REFERENCES estado(idEstado)
);

 CREATE TABLE baneos
(
usuBaneo varchar(15) NOT NULL,
fechaBaneo date NOT NULL,
fechaCaduca date NOT NULL,
FOREIGN KEY (usuBaneo) REFERENCES usuarios(usuario)
);



 /*table sessionToken*/
 /* for persistent sessions */
 CREATE TABLE sessionToken
(
usuario varchar(15) NOT NULL,
token varchar(100) NOT NULL,
caducidad date NOT NULL,
FOREIGN KEY (usuario) REFERENCES usuarios(usuario)
);

 /*table seccionesN*/
 /* sections for news */
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
 CREATE TABLE muroNoticias
(
idNoticia int auto_increment NOT NULL,
tituloN varchar(100) NOT NULL,
fechaN date NOT NULL,
usuarioN varchar(100) NOT NULL,
cuerpoN varchar(5000) NOT NULL,
idSeccion varchar(100) NOT NULL,
PRIMARY KEY (idNoticia), 
FOREIGN KEY (usuarioN) REFERENCES usuarios(usuario),
FOREIGN KEY (idSeccion) REFERENCES seccionesN(idSeccion)
);

/*table adjuntosN*/
 /* attachments to news */
 CREATE TABLE adjuntosN
(
idNoticia int NOT NULL,
archivo longblob NOT NULL,
mime varchar(100) NOT NULL,
comentario varchar(1000) NOT NULL,
FOREIGN KEY (idNoticia) REFERENCES muroNoticias(idNoticia)
);

/*table comentariosMuro*/
 /* to comment on the news */
 CREATE TABLE comentariosMuro
(
idNoticia int NOT NULL,
usuario varchar(100) NOT NULL,
comentario varchar(1000) NOT NULL,
FOREIGN KEY (idNoticia) REFERENCES muroNoticias(idNoticia),
FOREIGN KEY (usuario) REFERENCES usuarios(usuario)
);