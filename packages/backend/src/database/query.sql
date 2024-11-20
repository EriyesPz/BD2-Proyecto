USE Hospital

CREATE SCHEMA Usuarios;


CREATE SEQUENCE Usuarios.EmpleadoIDSeq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CACHE 1


CREATE TABLE Usuarios.Usuarios (
    UUID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    EmpleadoID VARCHAR(100),
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Usuario VARCHAR(50),
    Rol VARCHAR(50) NOT NULL,
    Contrasenia TEXT NOT NULL,
    Token TEXT,
    TokenFecha DATETIME,
    Creado DATETIME DEFAULT GETDATE(),
    Actualizado DATETIME DEFAULT GETDATE()
);


SELECT * FROM Usuarios.Usuarios WHERE Email = 'erick.reyes@gmail.com'

ALTER TABLE Usuarios.Usuarios ALTER COLUMN TokenFecha DATETIME

CREATE TRIGGER Usuarios.GenerarEmpleadoIDTrigger
ON Usuarios.Usuarios
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Usuarios.Usuarios
    SET EmpleadoID = 'EMP:' + RIGHT('0000' + CAST(NEXT VALUE FOR Usuarios.EmpleadoIDSeq AS NVARCHAR), 4)
    FROM Usuarios.Usuarios U
    INNER JOIN inserted I ON U.UUID = I.UUID;
END;


SELECT * FROM Usuarios.Usuarios;

INSERT INTO Usuarios.Usuarios (
    Nombre, Email, Usuario, Rol, Contrasenia
) VALUES (
    'Erick Reyes',
    'erick.reyes@gmail.com',
    'ereyes',
    'Admin',
    '12345'
);




SELECT * 
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_NAME = 'Usuarios';
