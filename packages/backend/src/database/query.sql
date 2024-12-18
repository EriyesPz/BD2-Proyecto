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
    SET EmpleadoID = 'EMP:' + RIGHT('0000' + CAST(NEXT VALUE FOR Usuarios.EmpleadoIDSeq AS VARCHAR), 4)
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



CREATE SCHEMA dbo;
GO

CREATE TABLE dbo.Direcciones (
    DireccionID INT IDENTITY(1,1) PRIMARY KEY,
    Calle VARCHAR(100) NOT NULL,
    Ciudad VARCHAR(50) NOT NULL,
    Estado VARCHAR(50) NOT NULL,
    CodigoPostal VARCHAR(10) NOT NULL,
    Pais VARCHAR(50) NOT NULL,
);


CREATE SCHEMA Medico;
GO

CREATE TABLE Medico.Especialidades (
    EspecialidadID INT IDENTITY(1,1) PRIMARY KEY,
    NombreEspecialidad VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(500) NULL
);

CREATE TABLE Medico.Medicos (
    MedicoID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    EspecialidadID INT NOT NULL FOREIGN KEY REFERENCES Medico.Especialidades(EspecialidadID),
    Interno BIT NOT NULL,
    HonorariosConsulta DECIMAL(10,2) NOT NULL CHECK (HonorariosConsulta >= 0),
    HonorariosCirugia DECIMAL(10,2) NULL CHECK (HonorariosCirugia >= 0),
    DireccionID INT NULL FOREIGN KEY REFERENCES dbo.Direcciones(DireccionID),
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL UNIQUE,
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME()  -- Uso de función avanzada
);

CREATE INDEX IDX_Medicos_Especialidad ON Medico.Medicos(EspecialidadID);


CREATE SCHEMA Paciente;
GO

CREATE TABLE Paciente.SegurosMedicos (
    SeguroID INT IDENTITY(1,1) PRIMARY KEY,
    NombreAseguradora VARCHAR(100) NOT NULL UNIQUE,
    Cobertura VARCHAR(500) NULL,
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL
);

CREATE TABLE Paciente.Pacientes (
    PacienteID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Genero CHAR(1) CHECK (Genero IN ('M', 'F', 'O')),  -- M: Masculino, F: Femenino, O: Otro
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL,
    DireccionID INT NULL FOREIGN KEY REFERENCES dbo.Direcciones(DireccionID),
    NumeroSeguroSocial VARCHAR(50) NULL UNIQUE,
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME()
);

CREATE TABLE Paciente.PacientesSeguros (
    PacienteID INT NOT NULL FOREIGN KEY REFERENCES Paciente.Pacientes(PacienteID),
    SeguroID INT NOT NULL FOREIGN KEY REFERENCES Paciente.SegurosMedicos(SeguroID),
    NumeroPoliza VARCHAR(50) NOT NULL,
    FechaVencimiento DATE NOT NULL,
    PRIMARY KEY (PacienteID, SeguroID)
);

CREATE INDEX IDX_Pacientes_Nombre ON Paciente.Pacientes(Nombre, Apellido);


CREATE SCHEMA Administracion;
GO

CREATE TABLE Administracion.Puestos (
    PuestoID INT IDENTITY(1,1) PRIMARY KEY,
    NombrePuesto VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(500) NULL
);

CREATE TABLE Administracion.Empleados (
    EmpleadoID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    PuestoID INT NOT NULL FOREIGN KEY REFERENCES Administracion.Puestos(PuestoID),
    FechaContratacion DATE NOT NULL,
    DireccionID INT NULL FOREIGN KEY REFERENCES dbo.Direcciones(DireccionID),
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL UNIQUE,
    Salario DECIMAL(10,2) NOT NULL CHECK (Salario >= 0),
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME()
);

CREATE INDEX IDX_Empleados_Puesto ON Administracion.Empleados(PuestoID);


CREATE SCHEMA Hospitalizacion;
GO

CREATE TABLE Hospitalizacion.TiposHabitacion (
    TipoHabitacionID INT IDENTITY(1,1) PRIMARY KEY,
    Tipo VARCHAR(50) NOT NULL UNIQUE,
    PrecioPorDia DECIMAL(10,2) NOT NULL CHECK (PrecioPorDia >= 0)
);

CREATE TABLE Hospitalizacion.Habitaciones (
    HabitacionID INT IDENTITY(1,1) PRIMARY KEY,
    NumeroHabitacion VARCHAR(10) NOT NULL UNIQUE,
    TipoHabitacionID INT NOT NULL FOREIGN KEY REFERENCES Hospitalizacion.TiposHabitacion(TipoHabitacionID),
    Disponible BIT NOT NULL DEFAULT 1,
    Caracteristicas XML NULL  -- Uso de tipo de dato XML
);

CREATE TABLE Hospitalizacion.Hospitalizaciones (
    HospitalizacionID INT IDENTITY(1,1) PRIMARY KEY,
    PacienteID INT NOT NULL FOREIGN KEY REFERENCES Paciente.Pacientes(PacienteID),
    FechaIngreso DATETIME2 NOT NULL,
    FechaAlta DATETIME2 NULL,
    HabitacionID INT NOT NULL FOREIGN KEY REFERENCES Hospitalizacion.Habitaciones(HabitacionID),
    Diagnostico VARCHAR(MAX) NULL,
    Estado VARCHAR(20) NOT NULL DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Alta', 'Cancelado')),
    CONSTRAINT CK_Hospitalizaciones_Fechas CHECK (FechaAlta IS NULL OR FechaAlta >= FechaIngreso)
);

CREATE INDEX IDX_Hospitalizaciones_Paciente ON Hospitalizacion.Hospitalizaciones(PacienteID);
CREATE INDEX IDX_Hospitalizaciones_Habitacion ON Hospitalizacion.Hospitalizaciones(HabitacionID);


CREATE SCHEMA Factura;
GO

CREATE TABLE Factura.Facturas (
    FacturaID INT IDENTITY(1,1) PRIMARY KEY,
    PacienteID INT NOT NULL FOREIGN KEY REFERENCES Paciente.Pacientes(PacienteID),
    FechaFactura DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    TotalFactura DECIMAL(18,2) NOT NULL CHECK (TotalFactura >= 0),
    EstadoPago VARCHAR(20) NOT NULL CHECK (EstadoPago IN ('Pagado', 'Pendiente', 'Anulado')),
    Detalles XML NULL
);

CREATE TABLE Factura.Pagos (
    PagoID INT IDENTITY(1,1) PRIMARY KEY,
    FacturaID INT NOT NULL FOREIGN KEY REFERENCES Factura.Facturas(FacturaID),
    FechaPago DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    MontoPagado DECIMAL(18,2) NOT NULL CHECK (MontoPagado >= 0),
    MetodoPago VARCHAR(20) NOT NULL CHECK (MetodoPago IN ('Efectivo', 'Tarjeta', 'Transferencia'))
);

CREATE INDEX IDX_Facturas_Paciente ON Factura.Facturas(PacienteID);


CREATE TABLE Medico.Consultas (
    ConsultaID INT IDENTITY(1,1) PRIMARY KEY,
    PacienteID INT NOT NULL FOREIGN KEY REFERENCES Paciente.Pacientes(PacienteID),
    MedicoID INT NOT NULL FOREIGN KEY REFERENCES Medico.Medicos(MedicoID),
    FechaConsulta DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    MotivoConsulta VARCHAR(MAX) NULL,
    Diagnostico VARCHAR(MAX) NULL,
    Prescripcion XML NULL  -- Uso de XML para prescripciones
);

CREATE INDEX IDX_Consultas_Medico ON Medico.Consultas(MedicoID);
CREATE INDEX IDX_Consultas_Paciente ON Medico.Consultas(PacienteID);


CREATE SCHEMA Farmacia;
GO

CREATE TABLE Farmacia.Proveedores (
    ProveedorID INT IDENTITY(1,1) PRIMARY KEY,
    NombreProveedor VARCHAR(100) NOT NULL UNIQUE,
    Contacto VARCHAR(100) NULL,
    Telefono VARCHAR(20) NULL,
    Email VARCHAR(100) NULL,
    DireccionID INT NULL FOREIGN KEY REFERENCES dbo.Direcciones(DireccionID)
);

CREATE TABLE Farmacia.Medicamentos (
    MedicamentoID INT IDENTITY(1,1) PRIMARY KEY,
    NombreMedicamento VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(500) NULL,
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio >= 0),
    Stock INT NOT NULL CHECK (Stock >= 0),
    ProveedorID INT NULL FOREIGN KEY REFERENCES Farmacia.Proveedores(ProveedorID),
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME()
);

CREATE INDEX IDX_Medicamentos_Nombre ON Farmacia.Medicamentos(NombreMedicamento);


CREATE SCHEMA Laboratorio;
GO

CREATE TABLE Laboratorio.Examenes (
    ExamenID INT IDENTITY(1,1) PRIMARY KEY,
    NombreExamen VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(500) NULL,
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio >= 0)
);

CREATE TABLE Laboratorio.Resultados (
    ResultadoID INT IDENTITY(1,1) PRIMARY KEY,
    ExamenID INT NOT NULL FOREIGN KEY REFERENCES Laboratorio.Examenes(ExamenID),
    PacienteID INT NOT NULL FOREIGN KEY REFERENCES Paciente.Pacientes(PacienteID),
    FechaExamen DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    Resultados XML NULL,
    Observaciones VARCHAR(MAX) NULL
);

CREATE INDEX IDX_Resultados_Paciente ON Laboratorio.Resultados(PacienteID);


CREATE VIEW Medico.vw_MedicosConsultas
AS
SELECT 
    m.MedicoID,
    CONCAT(m.Nombre, ' ', m.Apellido) AS NombreCompleto,
    e.NombreEspecialidad,
    COUNT(c.ConsultaID) AS NumeroConsultas,
    SUM(cast(c.Prescripcion.value('(//CostoMedicamento)[1]', 'decimal(10,2)') AS DECIMAL(10,2))) AS TotalPrescripciones
FROM Medico.Medicos m
LEFT JOIN Medico.Especialidades e ON m.EspecialidadID = e.EspecialidadID
LEFT JOIN Medico.Consultas c ON m.MedicoID = c.MedicoID
GROUP BY m.MedicoID, m.Nombre, m.Apellido, e.NombreEspecialidad;


CREATE VIEW Paciente.vw_PacientesHospitalizaciones
AS
SELECT 
    p.PacienteID,
    CONCAT(p.Nombre, ' ', p.Apellido) AS NombreCompleto,
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


CREATE VIEW Factura.vw_FacturasDetalle
AS
SELECT 
    f.FacturaID,
    CONCAT(p.Nombre, ' ', p.Apellido) AS Paciente,
    f.FechaFactura,
    f.TotalFactura,
    f.EstadoPago,
    pg.MontoPagado,
    pg.FechaPago,
    pg.MetodoPago,
    f.Detalles
FROM Factura.Facturas f
INNER JOIN Paciente.Pacientes p ON f.PacienteID = p.PacienteID
LEFT JOIN Factura.Pagos pg ON f.FacturaID = pg.FacturaID;


CREATE FUNCTION Medico.fn_HonorariosMedicos (@FechaInicio DATETIME2, @FechaFin DATETIME2)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        m.MedicoID,
        CONCAT(m.Nombre, ' ', m.Apellido) AS NombreCompleto,
        e.NombreEspecialidad,
        COUNT(c.ConsultaID) AS NumeroConsultas,
        SUM(m.HonorariosConsulta) AS TotalHonorariosConsultas
    FROM Medico.Medicos m
    INNER JOIN Medico.Especialidades e ON m.EspecialidadID = e.EspecialidadID
    INNER JOIN Medico.Consultas c ON m.MedicoID = c.MedicoID
    WHERE c.FechaConsulta BETWEEN @FechaInicio AND @FechaFin
    GROUP BY m.MedicoID, m.Nombre, m.Apellido, e.NombreEspecialidad
);


CREATE FUNCTION Farmacia.fn_StockMedicamentos ()
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


CREATE FUNCTION Paciente.fn_CalcularEdad (@FechaNacimiento DATE)
RETURNS INT
AS
BEGIN
    RETURN DATEDIFF(YEAR, @FechaNacimiento, GETDATE()) - 
           CASE WHEN DATEADD(YEAR, DATEDIFF(YEAR, @FechaNacimiento, GETDATE()), @FechaNacimiento) > GETDATE() THEN 1 ELSE 0 END;
END;


CREATE FUNCTION Hospitalizacion.fn_CostoEstancia (@HospitalizacionID INT)
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


CREATE FUNCTION Farmacia.fn_VerificarStock (@MedicamentoID INT)
RETURNS BIT
AS
BEGIN
    DECLARE @Stock INT;
    SELECT @Stock = Stock FROM Farmacia.Medicamentos WHERE MedicamentoID = @MedicamentoID;

    RETURN CASE WHEN @Stock > 0 THEN 1 ELSE 0 END;
END;


CREATE FUNCTION Factura.fn_TotalPagado (@FacturaID INT)
RETURNS DECIMAL(18,2)
AS
BEGIN
    DECLARE @TotalPagado DECIMAL(18,2);
    SELECT @TotalPagado = SUM(MontoPagado) FROM Factura.Pagos WHERE FacturaID = @FacturaID;

    RETURN ISNULL(@TotalPagado, 0);
END;


CREATE FUNCTION Laboratorio.fn_ObtenerResultados (@ResultadoID INT)
RETURNS VARCHAR(MAX)
AS
BEGIN
    DECLARE @Resultados XML;
    SELECT @Resultados = Resultados FROM Laboratorio.Resultados WHERE ResultadoID = @ResultadoID;

    RETURN (SELECT @Resultados FOR XML RAW, ROOT('Resultados'), TYPE).value('.', 'VARCHAR(MAX)');
END;


CREATE PROCEDURE Hospitalizacion.sp_RegistrarHospitalizacion 
    @PacienteID INT,
    @HabitacionID INT,
    @FechaIngreso DATETIME2,
    @Diagnostico VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Verificar disponibilidad de la habitación
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Habitaciones WHERE HabitacionID = @HabitacionID AND Disponible = 1)
        BEGIN
            RAISERROR('La habitación no está disponible.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Registrar hospitalización
        INSERT INTO Hospitalizacion.Hospitalizaciones (PacienteID, HabitacionID, FechaIngreso, Diagnostico, Estado)
        VALUES (@PacienteID, @HabitacionID, @FechaIngreso, @Diagnostico, 'Activo');

        -- Actualizar disponibilidad de la habitación
        UPDATE Hospitalizacion.Habitaciones SET Disponible = 0 WHERE HabitacionID = @HabitacionID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage VARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;



CREATE PROCEDURE Hospitalizacion.sp_DarAltaHospitalizacion 
    @HospitalizacionID INT,
    @FechaAlta DATETIME2
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        -- Verificar que la hospitalización está activa
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID AND Estado = 'Activo')
        BEGIN
            RAISERROR('La hospitalización no está activa o no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        DECLARE @HabitacionID INT;
        SELECT @HabitacionID = HabitacionID FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID;

        -- Actualizar hospitalización
        UPDATE Hospitalizacion.Hospitalizaciones 
        SET FechaAlta = @FechaAlta, Estado = 'Alta' 
        WHERE HospitalizacionID = @HospitalizacionID;

        -- Actualizar disponibilidad de la habitación
        UPDATE Hospitalizacion.Habitaciones SET Disponible = 1 WHERE HabitacionID = @HabitacionID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage VARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;


CREATE PROCEDURE Factura.sp_GenerarFacturaHospitalizacion 
    @HospitalizacionID INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;
    BEGIN TRY
        DECLARE @PacienteID INT, @TotalEstancia DECIMAL(18,2), @TotalFactura DECIMAL(18,2);

        SELECT @PacienteID = PacienteID FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID;

        -- Calcular costo de estancia
        SELECT @TotalEstancia = Hospitalizacion.fn_CostoEstancia(@HospitalizacionID);

        -- Otros cargos pueden ser agregados aquí (medicamentos, exámenes, etc.)

        SET @TotalFactura = @TotalEstancia;  -- Sumar otros cargos si existen

        -- Crear factura
        INSERT INTO Factura.Facturas (PacienteID, TotalFactura, EstadoPago)
        VALUES (@PacienteID, @TotalFactura, 'Pendiente');

        -- Actualizar estado de hospitalización si es necesario

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage VARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
