IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Hospital')
BEGIN
    CREATE DATABASE Hospital;
END
GO

USE Hospital;
GO


CREATE SCHEMA Usuarios;
GO

CREATE SEQUENCE Usuarios.EmpleadoIDSeq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CACHE 1;
GO


CREATE TABLE Usuarios.Usuarios (
    UUID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    EmpleadoID VARCHAR(100),
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Usuario VARCHAR(50),
    Rol VARCHAR(50) NOT NULL,
    Contrasenia VARCHAR(255) NOT NULL,
    Token VARCHAR(256),
    TokenFecha DATETIME2,
    Creado DATETIME2 DEFAULT SYSDATETIME(),
    Actualizado DATETIME2 DEFAULT SYSDATETIME()
);
GO

CREATE INDEX IDX_Usuarios_Email ON Usuarios.Usuarios(Email);
GO


CREATE OR ALTER TRIGGER Usuarios.GenerarEmpleadoIDTrigger
ON Usuarios.Usuarios
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE U
    SET EmpleadoID = 'EMP:' + RIGHT('0000' + CAST(NEXT VALUE FOR Usuarios.EmpleadoIDSeq AS VARCHAR(4)), 4)
    FROM Usuarios.Usuarios U
    INNER JOIN inserted I ON U.UUID = I.UUID;
END;
GO


CREATE SCHEMA dbo;
GO

CREATE TABLE dbo.Direcciones (
    DireccionID INT IDENTITY(1,1) PRIMARY KEY,
    Calle VARCHAR(100) NOT NULL,
    Ciudad VARCHAR(50) NOT NULL,
    Estado VARCHAR(50) NOT NULL,
    CodigoPostal VARCHAR(10) NOT NULL,
    Pais VARCHAR(50) NOT NULL
);
GO


CREATE SCHEMA Medico;
GO

CREATE TABLE Medico.Especialidades (
    EspecialidadID INT IDENTITY(1,1) PRIMARY KEY,
    NombreEspecialidad VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(500) NULL
);
GO

CREATE TABLE Medico.Medicos (
    MedicoID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    EspecialidadID INT NOT NULL,
    Interno BIT NOT NULL,
    HonorariosConsulta DECIMAL(10,2) NOT NULL CHECK (HonorariosConsulta >= 0),
    HonorariosCirugia DECIMAL(10,2) NULL CHECK (HonorariosCirugia >= 0),
    DireccionID INT NULL,
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL UNIQUE,
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME()
);
GO

ALTER TABLE Medico.Medicos
ADD CONSTRAINT FK_Medicos_Especialidades
FOREIGN KEY (EspecialidadID) REFERENCES Medico.Especialidades(EspecialidadID);

ALTER TABLE Medico.Medicos
ADD CONSTRAINT FK_Medicos_Direcciones
FOREIGN KEY (DireccionID) REFERENCES dbo.Direcciones(DireccionID);

CREATE INDEX IDX_Medicos_Especialidad ON Medico.Medicos(EspecialidadID);
GO


CREATE SCHEMA Paciente;
GO

CREATE TABLE Paciente.SegurosMedicos (
    SeguroID INT IDENTITY(1,1) PRIMARY KEY,
    NombreAseguradora VARCHAR(100) NOT NULL UNIQUE,
    Cobertura VARCHAR(500) NULL,
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL
);
GO

CREATE TABLE Paciente.Pacientes (
    PacienteID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Genero CHAR(1) CHECK (Genero IN ('M', 'F', 'O')),
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL,
    DireccionID INT NULL,
    NumeroSeguroSocial VARCHAR(50) NULL UNIQUE,
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME()
);
GO

ALTER TABLE Paciente.Pacientes
ADD CONSTRAINT FK_Pacientes_Direcciones
FOREIGN KEY (DireccionID) REFERENCES dbo.Direcciones(DireccionID);

CREATE TABLE Paciente.PacientesSeguros (
    PacienteID INT NOT NULL,
    SeguroID INT NOT NULL,
    NumeroPoliza NVARCHAR(50) NOT NULL,
    FechaVencimiento DATE NOT NULL,
    PRIMARY KEY (PacienteID, SeguroID)
);
GO

ALTER TABLE Paciente.PacientesSeguros
ADD CONSTRAINT FK_PacientesSeguros_Pacientes
FOREIGN KEY (PacienteID) REFERENCES Paciente.Pacientes(PacienteID);

ALTER TABLE Paciente.PacientesSeguros
ADD CONSTRAINT FK_PacientesSeguros_SegurosMedicos
FOREIGN KEY (SeguroID) REFERENCES Paciente.SegurosMedicos(SeguroID);

CREATE INDEX IDX_Pacientes_Nombre ON Paciente.Pacientes(Nombre, Apellido);
GO



CREATE SCHEMA Administracion;
GO

CREATE TABLE Administracion.Puestos (
    PuestoID INT IDENTITY(1,1) PRIMARY KEY,
    NombrePuesto VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(500) NULL
);
GO

CREATE TABLE Administracion.Empleados (
    EmpleadoID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    PuestoID INT NOT NULL,
    FechaContratacion DATE NOT NULL,
    DireccionID INT NULL,
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL UNIQUE,
    Salario DECIMAL(10,2) NOT NULL CHECK (Salario >= 0),
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME()
);
GO

ALTER TABLE Administracion.Empleados
ADD CONSTRAINT FK_Empleados_Puestos
FOREIGN KEY (PuestoID) REFERENCES Administracion.Puestos(PuestoID);

ALTER TABLE Administracion.Empleados
ADD CONSTRAINT FK_Empleados_Direcciones
FOREIGN KEY (DireccionID) REFERENCES dbo.Direcciones(DireccionID);

CREATE INDEX IDX_Empleados_Puesto ON Administracion.Empleados(PuestoID);
GO


CREATE SCHEMA Hospitalizacion;
GO

CREATE TABLE Hospitalizacion.TiposHabitacion (
    TipoHabitacionID INT IDENTITY(1,1) PRIMARY KEY,
    Tipo VARCHAR(50) NOT NULL UNIQUE,
    PrecioPorDia DECIMAL(10,2) NOT NULL CHECK (PrecioPorDia >= 0)
);
GO

CREATE TABLE Hospitalizacion.Habitaciones (
    HabitacionID INT IDENTITY(1,1) PRIMARY KEY,
    NumeroHabitacion VARCHAR(10) NOT NULL UNIQUE,
    TipoHabitacionID INT NOT NULL,
    Disponible BIT NOT NULL DEFAULT 1,
    Caracteristicas XML NULL
);
GO

ALTER TABLE Hospitalizacion.Habitaciones
ADD CONSTRAINT FK_Habitaciones_TiposHabitacion
FOREIGN KEY (TipoHabitacionID) REFERENCES Hospitalizacion.TiposHabitacion(TipoHabitacionID);

CREATE TABLE Hospitalizacion.Hospitalizaciones (
    HospitalizacionID INT IDENTITY(1,1) PRIMARY KEY,
    PacienteID INT NOT NULL,
    FechaIngreso DATETIME2 NOT NULL,
    FechaAlta DATETIME2 NULL,
    HabitacionID INT NOT NULL,
    Diagnostico TEXT NULL,
    Estado VARCHAR(20) NOT NULL DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Alta', 'Cancelado')),
    CONSTRAINT CK_Hospitalizaciones_Fechas CHECK (FechaAlta IS NULL OR FechaAlta >= FechaIngreso)
);
GO

ALTER TABLE Hospitalizacion.Hospitalizaciones
ADD CONSTRAINT FK_Hospitalizaciones_Pacientes
FOREIGN KEY (PacienteID) REFERENCES Paciente.Pacientes(PacienteID);

ALTER TABLE Hospitalizacion.Hospitalizaciones
ADD CONSTRAINT FK_Hospitalizaciones_Habitaciones
FOREIGN KEY (HabitacionID) REFERENCES Hospitalizacion.Habitaciones(HabitacionID);

CREATE INDEX IDX_Hospitalizaciones_Paciente ON Hospitalizacion.Hospitalizaciones(PacienteID);
CREATE INDEX IDX_Hospitalizaciones_Habitacion ON Hospitalizacion.Hospitalizaciones(HabitacionID);
GO


CREATE SCHEMA Factura;
GO

CREATE TABLE Factura.Facturas (
    FacturaID INT IDENTITY(1,1) PRIMARY KEY,
    PacienteID INT NOT NULL,
    FechaFactura DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    TotalFactura DECIMAL(18,2) NOT NULL CHECK (TotalFactura >= 0),
    EstadoPago VARCHAR(20) NOT NULL CHECK (EstadoPago IN ('Pagado', 'Pendiente', 'Anulado')),
    Detalles XML NULL
);
GO

ALTER TABLE Factura.Facturas
ADD CONSTRAINT FK_Facturas_Pacientes
FOREIGN KEY (PacienteID) REFERENCES Paciente.Pacientes(PacienteID);

CREATE TABLE Factura.Pagos (
    PagoID INT IDENTITY(1,1) PRIMARY KEY,
    FacturaID INT NOT NULL,
    FechaPago DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    MontoPagado DECIMAL(18,2) NOT NULL CHECK (MontoPagado >= 0),
    MetodoPago VARCHAR(20) NOT NULL CHECK (MetodoPago IN ('Efectivo', 'Tarjeta', 'Transferencia'))
);
GO

ALTER TABLE Factura.Pagos
ADD CONSTRAINT FK_Pagos_Facturas
FOREIGN KEY (FacturaID) REFERENCES Factura.Facturas(FacturaID);

CREATE INDEX IDX_Facturas_Paciente ON Factura.Facturas(PacienteID);
GO


CREATE TABLE Medico.Consultas (
    ConsultaID INT IDENTITY(1,1) PRIMARY KEY,
    PacienteID INT NOT NULL,
    MedicoID INT NOT NULL,
    FechaConsulta DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    MotivoConsulta TEXT NULL,
    Diagnostico TEXT NULL,
    Prescripcion XML NULL
);
GO

ALTER TABLE Medico.Consultas
ADD CONSTRAINT FK_Consultas_Pacientes
FOREIGN KEY (PacienteID) REFERENCES Paciente.Pacientes(PacienteID);

ALTER TABLE Medico.Consultas
ADD CONSTRAINT FK_Consultas_Medicos
FOREIGN KEY (MedicoID) REFERENCES Medico.Medicos(MedicoID);

CREATE INDEX IDX_Consultas_Medico ON Medico.Consultas(MedicoID);
CREATE INDEX IDX_Consultas_Paciente ON Medico.Consultas(PacienteID);
GO


CREATE SCHEMA Farmacia;
GO

CREATE TABLE Farmacia.Proveedores (
    ProveedorID INT IDENTITY(1,1) PRIMARY KEY,
    NombreProveedor VARCHAR(100) NOT NULL UNIQUE,
    Contacto VARCHAR(100) NULL,
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL,
    DireccionID INT NULL
);
GO

ALTER TABLE Farmacia.Proveedores
ADD CONSTRAINT FK_Proveedores_Direcciones
FOREIGN KEY (DireccionID) REFERENCES dbo.Direcciones(DireccionID);

CREATE TABLE Farmacia.Medicamentos (
    MedicamentoID INT IDENTITY(1,1) PRIMARY KEY,
    NombreMedicamento VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(500) NULL,
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio >= 0),
    Stock INT NOT NULL CHECK (Stock >= 0),
    ProveedorID INT NULL,
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME()
);
GO

ALTER TABLE Farmacia.Medicamentos
ADD CONSTRAINT FK_Medicamentos_Proveedores
FOREIGN KEY (ProveedorID) REFERENCES Farmacia.Proveedores(ProveedorID);

CREATE INDEX IDX_Medicamentos_Nombre ON Farmacia.Medicamentos(NombreMedicamento);
GO


CREATE SCHEMA Laboratorio;
GO

CREATE TABLE Laboratorio.Examenes (
    ExamenID INT IDENTITY(1,1) PRIMARY KEY,
    NombreExamen VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(500) NULL,
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio >= 0)
);
GO

CREATE TABLE Laboratorio.Resultados (
    ResultadoID INT IDENTITY(1,1) PRIMARY KEY,
    ExamenID INT NOT NULL,
    PacienteID INT NOT NULL,
    FechaExamen DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    Resultados XML NULL,
    Observaciones TEXT NULL
);
GO

ALTER TABLE Laboratorio.Resultados
ADD CONSTRAINT FK_Resultados_Examenes
FOREIGN KEY (ExamenID) REFERENCES Laboratorio.Examenes(ExamenID);

ALTER TABLE Laboratorio.Resultados
ADD CONSTRAINT FK_Resultados_Pacientes
FOREIGN KEY (PacienteID) REFERENCES Paciente.Pacientes(PacienteID);

CREATE INDEX IDX_Resultados_Paciente ON Laboratorio.Resultados(PacienteID);
GO


CREATE OR ALTER VIEW Medico.vw_MedicosConsultas
WITH SCHEMABINDING
AS
SELECT 
    m.MedicoID,
    m.Nombre + ' ' + m.Apellido AS NombreCompleto,
    e.NombreEspecialidad,
    COUNT_BIG(c.ConsultaID) AS NumeroConsultas,
    SUM(ISNULL(c.Prescripcion.value('(//CostoMedicamento)[1]', 'decimal(10,2)'), 0)) AS TotalPrescripciones
FROM Medico.Medicos m
INNER JOIN Medico.Especialidades e ON m.EspecialidadID = e.EspecialidadID
LEFT JOIN Medico.Consultas c ON m.MedicoID = c.MedicoID
GROUP BY m.MedicoID, m.Nombre, m.Apellido, e.NombreEspecialidad;
GO

CREATE UNIQUE CLUSTERED INDEX IDX_vw_MedicosConsultas ON Medico.vw_MedicosConsultas(MedicoID);
GO


CREATE OR ALTER VIEW Paciente.vw_PacientesHospitalizaciones
WITH SCHEMABINDING
AS
SELECT 
    p.PacienteID,
    p.Nombre + ' ' + p.Apellido AS NombreCompleto,
    h.HospitalizacionID,
    h.FechaIngreso,
    h.FechaAlta,
    th.Tipo,
    DATEDIFF(DAY, h.FechaIngreso, ISNULL(h.FechaAlta, SYSDATETIME())) AS DiasHospitalizado,
    th.PrecioPorDia,
    DATEDIFF(DAY, h.FechaIngreso, ISNULL(h.FechaAlta, SYSDATETIME())) * th.PrecioPorDia AS CostoEstancia,
    h.Estado
FROM Paciente.Pacientes p
INNER JOIN Hospitalizacion.Hospitalizaciones h ON p.PacienteID = h.PacienteID
INNER JOIN Hospitalizacion.Habitaciones ha ON h.HabitacionID = ha.HabitacionID
INNER JOIN Hospitalizacion.TiposHabitacion th ON ha.TipoHabitacionID = th.TipoHabitacionID;
GO


CREATE OR ALTER FUNCTION Medico.fn_HonorariosMedicos (@FechaInicio DATETIME2, @FechaFin DATETIME2)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        m.MedicoID,
        m.Nombre + ' ' + m.Apellido AS NombreCompleto,
        e.NombreEspecialidad,
        COUNT(c.ConsultaID) AS NumeroConsultas,
        SUM(m.HonorariosConsulta) AS TotalHonorariosConsultas
    FROM Medico.Medicos m
    INNER JOIN Medico.Especialidades e ON m.EspecialidadID = e.EspecialidadID
    INNER JOIN Medico.Consultas c ON m.MedicoID = c.MedicoID
    WHERE c.FechaConsulta BETWEEN @FechaInicio AND @FechaFin
    GROUP BY m.MedicoID, m.Nombre, m.Apellido, e.NombreEspecialidad
);
GO


CREATE OR ALTER FUNCTION Farmacia.fn_StockMedicamentos ()
RETURNS TABLE
AS
RETURN
(
    SELECT 
        m.MedicamentoID,
        m.NombreMedicamento,
        m.Stock,
        m.Precio,
        p.NombreProveedor
    FROM Farmacia.Medicamentos m
    LEFT JOIN Farmacia.Proveedores p ON m.ProveedorID = p.ProveedorID
    WHERE m.Stock > 0
);
GO


CREATE OR ALTER FUNCTION Paciente.fn_CalcularEdad (@FechaNacimiento DATE)
RETURNS INT
AS
BEGIN
    RETURN DATEDIFF(YEAR, @FechaNacimiento, GETDATE()) - 
           CASE WHEN DATEADD(YEAR, DATEDIFF(YEAR, @FechaNacimiento, GETDATE()), @FechaNacimiento) > GETDATE() THEN 1 ELSE 0 END;
END;
GO


CREATE OR ALTER FUNCTION Hospitalizacion.fn_CostoEstancia (@HospitalizacionID INT)
RETURNS DECIMAL(18,2)
AS
BEGIN
    DECLARE @Costo DECIMAL(18,2);
    SELECT @Costo = DATEDIFF(DAY, h.FechaIngreso, ISNULL(h.FechaAlta, SYSDATETIME())) * th.PrecioPorDia
    FROM Hospitalizacion.Hospitalizaciones h
    INNER JOIN Hospitalizacion.Habitaciones ha ON h.HabitacionID = ha.HabitacionID
    INNER JOIN Hospitalizacion.TiposHabitacion th ON ha.TipoHabitacionID = th.TipoHabitacionID
    WHERE h.HospitalizacionID = @HospitalizacionID;

    RETURN ISNULL(@Costo, 0);
END;
GO


CREATE OR ALTER FUNCTION Farmacia.fn_VerificarStock (@MedicamentoID INT)
RETURNS BIT
AS
BEGIN
    DECLARE @Stock INT;
    SELECT @Stock = Stock FROM Farmacia.Medicamentos WHERE MedicamentoID = @MedicamentoID;

    RETURN CASE WHEN @Stock > 0 THEN 1 ELSE 0 END;
END;
GO


CREATE OR ALTER FUNCTION Factura.fn_TotalPagado (@FacturaID INT)
RETURNS DECIMAL(18,2)
AS
BEGIN
    DECLARE @TotalPagado DECIMAL(18,2);
    SELECT @TotalPagado = SUM(MontoPagado) FROM Factura.Pagos WHERE FacturaID = @FacturaID;

    RETURN ISNULL(@TotalPagado, 0);
END;
GO


CREATE OR ALTER FUNCTION Laboratorio.fn_ObtenerResultados (@ResultadoID INT)
RETURNS NVARCHAR(MAX)
AS
BEGIN
    DECLARE @Resultados XML;
    SELECT @Resultados = Resultados FROM Laboratorio.Resultados WHERE ResultadoID = @ResultadoID;

    RETURN CAST(@Resultados AS NVARCHAR(MAX));
END;
GO


CREATE OR ALTER PROCEDURE Hospitalizacion.sp_RegistrarHospitalizacion 
    @PacienteID INT,
    @HabitacionID INT,
    @FechaIngreso DATETIME2,
    @Diagnostico NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Habitaciones WHERE HabitacionID = @HabitacionID AND Disponible = 1)
        BEGIN
            THROW 50001, 'La habitación no está disponible.', 1;
        END

        INSERT INTO Hospitalizacion.Hospitalizaciones (PacienteID, HabitacionID, FechaIngreso, Diagnostico, Estado)
        VALUES (@PacienteID, @HabitacionID, @FechaIngreso, @Diagnostico, 'Activo');

        UPDATE Hospitalizacion.Habitaciones SET Disponible = 0 WHERE HabitacionID = @HabitacionID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO


CREATE OR ALTER PROCEDURE Hospitalizacion.sp_DarAltaHospitalizacion 
    @HospitalizacionID INT,
    @FechaAlta DATETIME2
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID AND Estado = 'Activo')
        BEGIN
            THROW 50002, 'La hospitalización no está activa o no existe.', 1;
        END

        DECLARE @HabitacionID INT;
        SELECT @HabitacionID = HabitacionID FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID;

        UPDATE Hospitalizacion.Hospitalizaciones 
        SET FechaAlta = @FechaAlta, Estado = 'Alta' 
        WHERE HospitalizacionID = @HospitalizacionID;

        UPDATE Hospitalizacion.Habitaciones SET Disponible = 1 WHERE HabitacionID = @HabitacionID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO



CREATE OR ALTER PROCEDURE Factura.sp_GenerarFacturaHospitalizacion 
    @HospitalizacionID INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        DECLARE @PacienteID INT, @TotalEstancia DECIMAL(18,2), @TotalFactura DECIMAL(18,2);

        SELECT @PacienteID = PacienteID FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID;

        SELECT @TotalEstancia = Hospitalizacion.fn_CostoEstancia(@HospitalizacionID);


        SET @TotalFactura = @TotalEstancia;

        INSERT INTO Factura.Facturas (PacienteID, TotalFactura, EstadoPago)
        VALUES (@PacienteID, @TotalFactura, 'Pendiente');

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;
GO


