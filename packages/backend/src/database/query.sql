USE LaPaz

-- ========================================
--  SCHEMA USUARIOS
-- ========================================

CREATE SCHEMA Usuarios;
GO

CREATE SEQUENCE Usuarios.Seq_Usuario START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Usuarios.Usuarios (
    UsuarioID VARCHAR(20) PRIMARY KEY DEFAULT ('USR:' + RIGHT('0000' + CAST(NEXT VALUE FOR Usuarios.Seq_Usuario AS VARCHAR), 4)),
    UUID UNIQUEIDENTIFIER DEFAULT NEWID(),
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Usuario VARCHAR(50),
    Rol VARCHAR(50) NOT NULL,
    Contrasenia VARCHAR(255) NOT NULL,
    Token VARCHAR(255),
    TokenFecha DATETIME,
    Creado DATETIME DEFAULT GETDATE(),
    Actualizado DATETIME DEFAULT GETDATE()
);
GO


CREATE SCHEMA Paciente;
GO

CREATE SEQUENCE Paciente.Seq_Paciente START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Paciente.Pacientes (
    PacienteID VARCHAR(20) PRIMARY KEY DEFAULT ('PAC:' + RIGHT('0000' + CAST(NEXT VALUE FOR Paciente.Seq_Paciente AS VARCHAR), 4)),
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    FechaNacimiento DATE NOT NULL,
    Genero CHAR(1) CHECK (Genero IN ('M', 'F', 'O')),
    Telefono VARCHAR(20),
    Email VARCHAR(100) UNIQUE,
    Direccion VARCHAR(255),
    NumeroSeguroSocial VARCHAR(50) UNIQUE,
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME()
);
GO

CREATE TABLE Paciente.SegurosMedicos (
    SeguroID INT IDENTITY(1,1) PRIMARY KEY,
    NombreAseguradora VARCHAR(100) NOT NULL UNIQUE,
    Cobertura VARCHAR(500)
);
GO

CREATE TABLE Paciente.PacientesSeguros (
    PacienteID VARCHAR(20) NOT NULL,
    SeguroID INT NOT NULL,
    NumeroPoliza VARCHAR(50) NOT NULL,
    FechaVencimiento DATE NOT NULL,
    PRIMARY KEY (PacienteID, SeguroID),
    FOREIGN KEY (PacienteID) REFERENCES Paciente.Pacientes(PacienteID),
    FOREIGN KEY (SeguroID) REFERENCES Paciente.SegurosMedicos(SeguroID)
);
GO


CREATE SCHEMA Medico;
GO

CREATE SEQUENCE Medico.Seq_Medico START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Medico.Especialidades (
    EspecialidadID INT IDENTITY(1,1) PRIMARY KEY,
    NombreEspecialidad VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(500)
);
GO

CREATE TABLE Medico.Medicos (
    MedicoID VARCHAR(20) PRIMARY KEY DEFAULT ('MED:' + RIGHT('0000' + CAST(NEXT VALUE FOR Medico.Seq_Medico AS VARCHAR), 4)),
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    EspecialidadID INT NOT NULL,
    Interno BIT NOT NULL,
    HonorariosConsulta DECIMAL(10,2) NOT NULL CHECK (HonorariosConsulta >= 0),
    HonorariosCirugia DECIMAL(10,2) CHECK (HonorariosCirugia >= 0),
    Email VARCHAR(100) UNIQUE,
    FechaRegistro DATETIME2 DEFAULT SYSDATETIME(),
    FOREIGN KEY (EspecialidadID) REFERENCES Medico.Especialidades(EspecialidadID)
);
GO

CREATE INDEX IDX_Medicos_Especialidad ON Medico.Medicos(EspecialidadID);
GO

CREATE SCHEMA Proveedores;
GO

CREATE SEQUENCE Proveedores.Seq_Proveedor START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Proveedores.Proveedores (
    ProveedorID VARCHAR(20) PRIMARY KEY DEFAULT ('PRV:' + RIGHT('0000' + CAST(NEXT VALUE FOR Proveedores.Seq_Proveedor AS VARCHAR), 4)),
    NombreProveedor VARCHAR(100) NOT NULL UNIQUE,
    Contacto VARCHAR(100),
    Telefono VARCHAR(20),
    Email VARCHAR(100) UNIQUE,
    Direccion VARCHAR(255)
);
GO

CREATE SCHEMA Insumos;
GO

CREATE SEQUENCE Insumos.Seq_Insumo START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Insumos.Insumos (
    InsumoID VARCHAR(20) PRIMARY KEY DEFAULT ('INS:' + RIGHT('0000' + CAST(NEXT VALUE FOR Insumos.Seq_Insumo AS VARCHAR), 4)),
    NombreInsumo VARCHAR(100) NOT NULL UNIQUE,
    Descripcion VARCHAR(255),
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio >= 0),
    Stock INT NOT NULL CHECK (Stock >= 0),
    ProveedorID VARCHAR(20),
    FOREIGN KEY (ProveedorID) REFERENCES Proveedores.Proveedores(ProveedorID)
);
GO

CREATE INDEX IDX_Insumos_Proveedor ON Insumos.Insumos(ProveedorID);
GO



CREATE SCHEMA Alimentos;
GO

CREATE SEQUENCE Alimentos.Seq_Alimento START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Alimentos.Alimentos (
    AlimentoID VARCHAR(20) PRIMARY KEY DEFAULT ('ALI:' + RIGHT('0000' + CAST(NEXT VALUE FOR Alimentos.Seq_Alimento AS VARCHAR), 4)),
    NombreAlimento VARCHAR(100) NOT NULL UNIQUE,
    Tipo VARCHAR(50) NOT NULL CHECK (Tipo IN ('Desayuno', 'Almuerzo', 'Cena', 'Merienda')),
    PrecioUnitario DECIMAL(10,2) NOT NULL CHECK (PrecioUnitario >= 0),
    Stock INT NOT NULL CHECK (Stock >= 0),
    ProveedorID VARCHAR(20),
    FOREIGN KEY (ProveedorID) REFERENCES Proveedores.Proveedores(ProveedorID)
);
GO

CREATE INDEX IDX_Alimentos_Proveedor ON Alimentos.Alimentos(ProveedorID);
GO

-- ========================================
--  SCHEMA FARMACIA
-- ========================================

CREATE SCHEMA Farmacia;
GO

CREATE SEQUENCE Farmacia.Seq_Medicamento START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Farmacia.Medicamentos (
    MedicamentoID VARCHAR(20) PRIMARY KEY DEFAULT ('MED:' + RIGHT('0000' + CAST(NEXT VALUE FOR Farmacia.Seq_Medicamento AS VARCHAR), 4)),
    NombreMedicamento VARCHAR(100) NOT NULL UNIQUE,
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio >= 0),
    Stock INT NOT NULL CHECK (Stock >= 0),
    ProveedorID VARCHAR(20),
    FOREIGN KEY (ProveedorID) REFERENCES Proveedores.Proveedores(ProveedorID)
);
GO

CREATE INDEX IDX_Medicamentos_Proveedor ON Farmacia.Medicamentos(ProveedorID);
GO

-- ========================================
--  SCHEMA HOSPITALIZACION
-- ========================================

CREATE SCHEMA Hospitalizacion;
GO

CREATE SEQUENCE Hospitalizacion.Seq_Habitacion START WITH 1 INCREMENT BY 1;
GO

CREATE SEQUENCE Hospitalizacion.Seq_Hospitalizacion START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Hospitalizacion.TiposHabitacion (
    TipoHabitacionID INT IDENTITY(1,1) PRIMARY KEY,
    Tipo VARCHAR(50) NOT NULL UNIQUE,
    PrecioPorDia DECIMAL(10,2) NOT NULL CHECK (PrecioPorDia >= 0)
);
GO

CREATE TABLE Hospitalizacion.Habitaciones (
    HabitacionID VARCHAR(20) PRIMARY KEY DEFAULT ('HAB:' + RIGHT('0000' + CAST(NEXT VALUE FOR Hospitalizacion.Seq_Habitacion AS VARCHAR), 4)),
    NumeroHabitacion VARCHAR(10) NOT NULL UNIQUE,
    TipoHabitacionID INT NOT NULL,
    Disponible BIT NOT NULL DEFAULT 1,
    Caracteristicas XML,
    FOREIGN KEY (TipoHabitacionID) REFERENCES Hospitalizacion.TiposHabitacion(TipoHabitacionID)
);
GO

CREATE INDEX IDX_Habitaciones_Tipo ON Hospitalizacion.Habitaciones(TipoHabitacionID);
GO

CREATE TABLE Hospitalizacion.Hospitalizaciones (
    HospitalizacionID VARCHAR(20) PRIMARY KEY DEFAULT ('HOS:' + RIGHT('0000' + CAST(NEXT VALUE FOR Hospitalizacion.Seq_Hospitalizacion AS VARCHAR), 4)),
    PacienteID VARCHAR(20) NOT NULL,
    HabitacionID VARCHAR(20) NOT NULL,
    FechaIngreso DATETIME2 NOT NULL,
    FechaAlta DATETIME2,
    Diagnostico VARCHAR(MAX),
    Estado VARCHAR(20) NOT NULL DEFAULT 'Activo' CHECK (Estado IN ('Activo', 'Alta', 'Cancelado')),
    FOREIGN KEY (PacienteID) REFERENCES Paciente.Pacientes(PacienteID),
    FOREIGN KEY (HabitacionID) REFERENCES Hospitalizacion.Habitaciones(HabitacionID),
    CONSTRAINT CK_Hospitalizaciones_Fechas CHECK (FechaAlta IS NULL OR FechaAlta >= FechaIngreso)
);
GO

CREATE INDEX IDX_Hospitalizaciones_Paciente ON Hospitalizacion.Hospitalizaciones(PacienteID);
GO

CREATE INDEX IDX_Hospitalizaciones_Habitacion ON Hospitalizacion.Hospitalizaciones(HabitacionID);
GO

-- ========================================
--  SCHEMA CONSULTORIOS
-- ========================================

CREATE SCHEMA Consultorios;
GO

CREATE SEQUENCE Consultorios.Seq_Consultorio START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Consultorios.Consultorios (
    ConsultorioID VARCHAR(20) PRIMARY KEY DEFAULT ('CON:' + RIGHT('0000' + CAST(NEXT VALUE FOR Consultorios.Seq_Consultorio AS VARCHAR), 4)),
    Tipo VARCHAR(50) NOT NULL CHECK (Tipo IN ('Interno', 'Externo')),
    NumeroConsultorio VARCHAR(10) NOT NULL UNIQUE,
    MedicoID VARCHAR(20),
    Estado VARCHAR(20) NOT NULL DEFAULT 'Disponible' CHECK (Estado IN ('Disponible', 'Ocupado', 'Mantenimiento')),
    FOREIGN KEY (MedicoID) REFERENCES Medico.Medicos(MedicoID)
);
GO

CREATE INDEX IDX_Consultorios_Medico ON Consultorios.Consultorios(MedicoID);
GO

-- ========================================
--  SCHEMA QUIROFANOS
-- ========================================

CREATE SCHEMA Quirofanos;
GO

CREATE SEQUENCE Quirofanos.Seq_Quirofano START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Quirofanos.Quirofanos (
    QuirofanoID VARCHAR(20) PRIMARY KEY DEFAULT ('QUI:' + RIGHT('0000' + CAST(NEXT VALUE FOR Quirofanos.Seq_Quirofano AS VARCHAR), 4)),
    NombreQuirofano VARCHAR(100) NOT NULL UNIQUE,
    Estado VARCHAR(20) NOT NULL DEFAULT 'Disponible' CHECK (Estado IN ('Disponible', 'Ocupado', 'Mantenimiento')),
    Capacidad INT NOT NULL CHECK (Capacidad > 0)
);
GO

-- ========================================
--  SCHEMA FACTURA
-- ========================================

CREATE SCHEMA Factura;
GO

CREATE SEQUENCE Factura.Seq_Factura START WITH 1 INCREMENT BY 1;
GO

CREATE SEQUENCE Factura.Seq_FacturaDetalle START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Factura.Facturas (
    FacturaID VARCHAR(20) PRIMARY KEY DEFAULT ('FAC:' + RIGHT('0000' + CAST(NEXT VALUE FOR Factura.Seq_Factura AS VARCHAR), 4)),
    PacienteID VARCHAR(20) NOT NULL,
    FechaFactura DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    TotalFactura DECIMAL(18,2) NOT NULL CHECK (TotalFactura >= 0),
    EstadoPago VARCHAR(20) NOT NULL CHECK (EstadoPago IN ('Pagado', 'Pendiente', 'Anulado')),
    FOREIGN KEY (PacienteID) REFERENCES Paciente.Pacientes(PacienteID)
);
GO

CREATE TABLE Factura.Pagos (
    PagoID INT IDENTITY(1,1) PRIMARY KEY,
    FacturaID VARCHAR(20) NOT NULL,
    FechaPago DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    MontoPagado DECIMAL(18,2) NOT NULL CHECK (MontoPagado >= 0),
    MetodoPago VARCHAR(20) NOT NULL CHECK (MetodoPago IN ('Efectivo', 'Tarjeta', 'Transferencia')),
    FOREIGN KEY (FacturaID) REFERENCES Factura.Facturas(FacturaID)
);
GO

CREATE TABLE Factura.FacturaDetalle (
    FacturaDetalleID VARCHAR(20) PRIMARY KEY DEFAULT ('FAD:' + RIGHT('0000' + CAST(NEXT VALUE FOR Factura.Seq_FacturaDetalle AS VARCHAR), 4)),
    FacturaID VARCHAR(20) NOT NULL,
    Servicio VARCHAR(100) NOT NULL, -- Puede ser Consulta, Cirugía, Medicamento, etc.
    Descripcion VARCHAR(255),
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    PrecioUnitario DECIMAL(10,2) NOT NULL CHECK (PrecioUnitario >= 0),
    FOREIGN KEY (FacturaID) REFERENCES Factura.Facturas(FacturaID)
);
GO

CREATE INDEX IDX_FacturaDetalle_Factura ON Factura.FacturaDetalle(FacturaID);
GO

CREATE INDEX IDX_Facturas_Paciente ON Factura.Facturas(PacienteID);
GO

-- ========================================
--  SCHEMA CONSULTAS
-- ========================================

CREATE SCHEMA Consultas;
GO

CREATE SEQUENCE Consultas.Seq_Consulta START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE Consultas.Consultas (
    ConsultaID VARCHAR(20) PRIMARY KEY DEFAULT ('CNS:' + RIGHT('0000' + CAST(NEXT VALUE FOR Consultas.Seq_Consulta AS VARCHAR), 4)),
    PacienteID VARCHAR(20) NOT NULL,
    MedicoID VARCHAR(20) NOT NULL,
    FechaConsulta DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    MotivoConsulta VARCHAR(MAX),
    Diagnostico VARCHAR(MAX),
    Prescripcion XML,
    FOREIGN KEY (PacienteID) REFERENCES Paciente.Pacientes(PacienteID),
    FOREIGN KEY (MedicoID) REFERENCES Medico.Medicos(MedicoID)
);
GO

CREATE INDEX IDX_Consultas_Medico ON Consultas.Consultas(MedicoID);
GO

CREATE INDEX IDX_Consultas_Paciente ON Consultas.Consultas(PacienteID);
GO

-- ========================================
--  SCHEMA ALIMENTOS_DETALLE
-- ========================================

CREATE SCHEMA AlimentosDetalle;
GO

CREATE SEQUENCE AlimentosDetalle.Seq_AlimentoDetalle START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE AlimentosDetalle.AlimentosDetalle (
    AlimentoDetalleID VARCHAR(20) PRIMARY KEY DEFAULT ('ALD:' + RIGHT('0000' + CAST(NEXT VALUE FOR AlimentosDetalle.Seq_AlimentoDetalle AS VARCHAR), 4)),
    AlimentoID VARCHAR(20) NOT NULL,
    HospitalizacionID VARCHAR(20) NOT NULL,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    FechaServicio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (AlimentoID) REFERENCES Alimentos.Alimentos(AlimentoID),
    FOREIGN KEY (HospitalizacionID) REFERENCES Hospitalizacion.Hospitalizaciones(HospitalizacionID)
);
GO

CREATE INDEX IDX_AlimentosDetalle_Alimento ON AlimentosDetalle.AlimentosDetalle(AlimentoID);
GO

CREATE INDEX IDX_AlimentosDetalle_Hospitalizacion ON AlimentosDetalle.AlimentosDetalle(HospitalizacionID);
GO

-- ========================================
--  SCHEMA INSUMOS_MOVIMIENTOS
-- ========================================

CREATE SCHEMA InsumosMovimientos;
GO

CREATE SEQUENCE InsumosMovimientos.Seq_InsumoMovimiento START WITH 1 INCREMENT BY 1;
GO

CREATE TABLE InsumosMovimientos.InsumosMovimientos (
    MovimientoID VARCHAR(20) PRIMARY KEY DEFAULT ('INM:' + RIGHT('0000' + CAST(NEXT VALUE FOR InsumosMovimientos.Seq_InsumoMovimiento AS VARCHAR), 4)),
    InsumoID VARCHAR(20) NOT NULL,
    TipoMovimiento VARCHAR(20) NOT NULL CHECK (TipoMovimiento IN ('Ingreso', 'Salida')),
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    FechaMovimiento DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    Descripcion VARCHAR(255),
    FOREIGN KEY (InsumoID) REFERENCES Insumos.Insumos(InsumoID)
);
GO

CREATE INDEX IDX_InsumosMovimientos_Insumo ON InsumosMovimientos.InsumosMovimientos(InsumoID);
GO

-- ========================================
--  SCHEMA FACTURADETALLE
-- ========================================



-- ========================================
--  SCHEMA HISTORIAL
-- ========================================

CREATE SCHEMA Historial;
GO

-- ========================================
--  TABLAS DE HISTORIAL
-- ========================================


CREATE SEQUENCE Historial.Seq_MedicamentoHistorial
AS INT
START WITH 1
INCREMENT BY 1;


-- Tabla de historial para Medicamentos
CREATE TABLE Historial.MedicamentosHistorial (
    MedicamentoHistorialID VARCHAR(20) PRIMARY KEY DEFAULT ('MH:' + RIGHT('0000' + CAST(NEXT VALUE FOR MedicosHistorial.Seq_MedicamentoHistorial AS VARCHAR), 4)),
    MedicamentoID VARCHAR(20) NOT NULL,
    CambioTipo VARCHAR(20) NOT NULL, -- Ejemplo: 'Stock', 'Precio'
    ValorAnterior DECIMAL(10,2),
    ValorNuevo DECIMAL(10,2),
    FechaCambio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (MedicamentoID) REFERENCES Farmacia.Medicamentos(MedicamentoID)
);
GO

CREATE INDEX IDX_Historial_MedicamentosHistorial_Medicamento ON Historial.MedicamentosHistorial(MedicamentoID);
GO

CREATE SEQUENCE Historial.Seq_InsumoHistorial
AS INT
START WITH 1
INCREMENT BY 1;


-- Tabla de historial para Insumos
CREATE TABLE Historial.InsumosHistorial (
    InsumoHistorialID VARCHAR(20) PRIMARY KEY DEFAULT ('IH:' + RIGHT('0000' + CAST(NEXT VALUE FOR Historial.Seq_InsumoHistorial AS VARCHAR), 4)),
    InsumoID VARCHAR(20) NOT NULL,
    CambioTipo VARCHAR(20) NOT NULL, -- Ejemplo: 'Stock', 'Precio'
    ValorAnterior DECIMAL(10,2),
    ValorNuevo DECIMAL(10,2),
    FechaCambio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (InsumoID) REFERENCES Insumos.Insumos(InsumoID)
);
GO

CREATE INDEX IDX_Historial_InsumosHistorial_Insumo ON Historial.InsumosHistorial(InsumoID);
GO

CREATE SEQUENCE Historial.Seq_HospitalizacionHistorial
AS INT
START WITH 1
INCREMENT BY 1;


-- Tabla de historial para Hospitalizaciones
CREATE TABLE Historial.HospitalizacionesHistorial (
    HospitalizacionHistorialID VARCHAR(20) PRIMARY KEY DEFAULT ('HH:' + RIGHT('0000' + CAST(NEXT VALUE FOR Historial.Seq_HospitalizacionHistorial AS VARCHAR), 4)),
    HospitalizacionID VARCHAR(20) NOT NULL,
    CampoModificado VARCHAR(50) NOT NULL,
    ValorAnterior VARCHAR(MAX),
    ValorNuevo VARCHAR(MAX),
    FechaModificacion DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (HospitalizacionID) REFERENCES Hospitalizacion.Hospitalizaciones(HospitalizacionID)
);
GO

CREATE INDEX IDX_Historial_HospitalizacionesHistorial_Hospitalizacion ON Historial.HospitalizacionesHistorial(HospitalizacionID);
GO

CREATE SEQUENCE Historial.Seq_ConsultorioHistorial
AS INT
START WITH 1
INCREMENT BY 1;

-- Tabla de historial para Consultorios
CREATE TABLE Historial.ConsultoriosHistorial (
    ConsultorioHistorialID VARCHAR(20) PRIMARY KEY DEFAULT ('CH:' + RIGHT('0000' + CAST(NEXT VALUE FOR Historial.Seq_ConsultorioHistorial AS VARCHAR), 4)),
    ConsultorioID VARCHAR(20) NOT NULL,
    CampoModificado VARCHAR(50) NOT NULL,
    ValorAnterior VARCHAR(MAX),
    ValorNuevo VARCHAR(MAX),
    FechaModificacion DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (ConsultorioID) REFERENCES Consultorios.Consultorios(ConsultorioID)
);
GO

CREATE INDEX IDX_Historial_ConsultoriosHistorial_Consultorio ON Historial.ConsultoriosHistorial(ConsultorioID);
GO

CREATE SEQUENCE Historial.Seq_AlimentoHistorial
AS INT
START WITH 1
INCREMENT BY 1;

-- Tabla de historial para Alimentos
CREATE TABLE Historial.AlimentosHistorial (
    AlimentoHistorialID VARCHAR(20) PRIMARY KEY DEFAULT ('AH:' + RIGHT('0000' + CAST(NEXT VALUE FOR Historial.Seq_AlimentoHistorial AS VARCHAR), 4)),
    AlimentoID VARCHAR(20) NOT NULL,
    CambioTipo VARCHAR(20) NOT NULL, -- Ejemplo: 'Stock', 'Precio'
    ValorAnterior DECIMAL(10,2),
    ValorNuevo DECIMAL(10,2),
    FechaCambio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (AlimentoID) REFERENCES Alimentos.Alimentos(AlimentoID)
);
GO

CREATE INDEX IDX_Historial_AlimentosHistorial_Alimento ON Historial.AlimentosHistorial(AlimentoID);
GO

-- Tabla de historial para FacturaDetalle

CREATE SEQUENCE Historial.Seq_FacturaDetalleHistorial
AS INT
START WITH 1
INCREMENT BY 1;

CREATE TABLE Historial.FacturaDetalleHistorial (
    FacturaDetalleHistorialID VARCHAR(20) PRIMARY KEY DEFAULT ('FDH:' + RIGHT('0000' + CAST(NEXT VALUE FOR Historial.Seq_FacturaDetalleHistorial AS VARCHAR), 4)),
    FacturaDetalleID VARCHAR(20) NOT NULL,
    CampoModificado VARCHAR(50) NOT NULL,
    ValorAnterior VARCHAR(MAX),
    ValorNuevo VARCHAR(MAX),
    FechaModificacion DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    FOREIGN KEY (FacturaDetalleID) REFERENCES Factura.FacturaDetalle(FacturaDetalleID)
);
GO

CREATE TABLE Consultas.ExamenesMedicos (
    ExamenID VARCHAR(20) PRIMARY KEY,
    NombreExamen VARCHAR(100) NOT NULL
);
GO


CREATE TABLE Consultas.ExamenesRealizados (
    ExamenRealizadoID INT IDENTITY(1,1) PRIMARY KEY,
    HospitalizacionID VARCHAR(20) NOT NULL,
    ExamenID VARCHAR(20) NOT NULL,
    Resultado VARCHAR(MAX) NOT NULL,
    FechaExamen DATETIME2 NOT NULL,
    FOREIGN KEY (HospitalizacionID) REFERENCES Hospitalizacion.Hospitalizaciones(HospitalizacionID),
    FOREIGN KEY (ExamenID) REFERENCES Consultas.ExamenesMedicos(ExamenID)
);
GO



INSERT INTO Proveedores.Proveedores (NombreProveedor, Contacto, Telefono, Email, Direccion)
VALUES
('Proveedor Salud S.A.', 'Juan Pérez', '555-0101', 'contacto@proveedorsalud.com', 'Calle Salud #123, Ciudad'),
('Medicamentos Unidos', 'María López', '555-0102', 'ventas@medicamentosunidos.com', 'Avenida Medicina #456, Ciudad'),
('Insumos Médicos Ltda.', 'Carlos García', '555-0103', 'info@insumosmedicos.com', 'Boulevard Hospitalario #789, Ciudad'),
('Alimentos Nutritivos', 'Ana Martínez', '555-0104', 'contacto@alimentonutritivos.com', 'Calle Nutrición #321, Ciudad'),
('Farmacia Central', 'Luis Rodríguez', '555-0105', 'ventas@farmaciacentral.com', 'Avenida Farmacia #654, Ciudad'),
('Proveedores Quirúrgicos', 'Sofía Hernández', '555-0106', 'info@proveedoresquirurgicos.com', 'Calle Quirófano #987, Ciudad'),
('Distribuciones Médicas', 'Pedro Sánchez', '555-0107', 'ventas@distribucionesmedicas.com', 'Avenida Saludable #159, Ciudad'),
('Alimentos Hospitalarios', 'Laura Díaz', '555-0108', 'contacto@alimentoshospitalarios.com', 'Calle Hospitalaria #753, Ciudad'),
('Insumos Clínicos', 'Miguel Torres', '555-0109', 'info@insumosclinicos.com', 'Boulevard Clínico #852, Ciudad'),
('Medicamentos Avanzados', 'Isabel Ramírez', '555-0110', 'ventas@medicamentosavanzados.com', 'Avenida Avanzada #963, Ciudad');
GO


INSERT INTO Medico.Especialidades (NombreEspecialidad, Descripcion)
VALUES
('Cardiología', 'Especialidad enfocada en el corazón y sistema circulatorio.'),
('Neurología', 'Diagnóstico y tratamiento de enfermedades del sistema nervioso.'),
('Pediatría', 'Atención médica a niños y adolescentes.'),
('Ginecología', 'Salud reproductiva femenina y sistema genital.'),
('Ortopedia', 'Tratamiento de enfermedades y lesiones del sistema musculoesquelético.'),
('Oncología', 'Diagnóstico y tratamiento del cáncer.'),
('Dermatología', 'Tratamiento de enfermedades de la piel, cabello y uñas.'),
('Oftalmología', 'Cuidado de los ojos y visión.'),
('Psiquiatría', 'Diagnóstico y tratamiento de trastornos mentales.'),
('Gastroenterología', 'Enfermedades del sistema digestivo.');
GO

INSERT INTO Medico.Medicos (Nombre, Apellido, EspecialidadID, Interno, HonorariosConsulta, HonorariosCirugia, Email)
VALUES
('Carlos', 'González', 1, 1, 150.00, 500.00, 'carlos.gonzalez@lapaz.com'),
('María', 'Fernández', 2, 1, 160.00, 550.00, 'maria.fernandez@lapaz.com'),
('Luis', 'Martínez', 3, 1, 140.00, NULL, 'luis.martinez@lapaz.com'),
('Ana', 'López', 4, 1, 155.00, 520.00, 'ana.lopez@lapaz.com'),
('Jorge', 'Ramírez', 5, 1, 145.00, 510.00, 'jorge.ramirez@lapaz.com'),
('Sofía', 'García', 6, 1, 170.00, 600.00, 'sofia.garcia@lapaz.com'),
('Pedro', 'Hernández', 7, 1, 130.00, NULL, 'pedro.hernandez@lapaz.com'),
('Laura', 'Díaz', 8, 1, 135.00, NULL, 'laura.diaz@lapaz.com'),
('Miguel', 'Torres', 9, 1, 160.00, NULL, 'miguel.torres@lapaz.com'),
('Isabel', 'Sánchez', 10, 1, 150.00, NULL, 'isabel.sanchez@lapaz.com');
GO


INSERT INTO Usuarios.Usuarios (Nombre, Email, Usuario, Rol, Contrasenia)
VALUES
('Admin Sistema', 'admin@lapaz.com', 'admin', 'Admin', 'password1'),
('Dr. Carlos Gonzalez', 'carlos.gonzalez@lapaz.com', 'carlosg', 'Médico', 'password2'),
('Dr. María Fernández', 'maria.fernandez@lapaz.com', 'mariaf', 'Médico', 'password3'),
('Recepcionista Ana', 'ana.recepcion@lapaz.com', 'recan', 'Recepcionista', 'password4'),
('Enfermera Laura', 'laura.enfermera@lapaz.com', 'enferlaura', 'Enfermera', 'password5'),
('Contador Pedro', 'pedro.contador@lapaz.com', 'pedroc', 'Contador', 'password6'),
('Tecnico Miguel', 'miguel.tecnico@lapaz.com', 'tecmiguel', 'Técnico', 'password7'),
('Dr. Luis Martínez', 'luis.martinez@lapaz.com', 'luism', 'Médico', 'password8'),
('Dr. Ana López', 'ana.lopez@lapaz.com', 'anal', 'Médico', 'password9'),
('Gerente Sofía', 'sofia.gerente@lapaz.com', 'sofia', 'Gerente', 'password10');
GO

INSERT INTO Paciente.Pacientes (Nombre, Apellido, FechaNacimiento, Genero, Telefono, Email, Direccion, NumeroSeguroSocial)
VALUES
('Juan', 'Pérez', '1985-05-15', 'M', '555-0201', 'juan.perez@example.com', 'Calle 1 #100, Ciudad', 'SSN001'),
('María', 'González', '1990-07-22', 'F', '555-0202', 'maria.gonzalez@example.com', 'Calle 2 #200, Ciudad', 'SSN002'),
('Luis', 'Ramírez', '1978-03-10', 'M', '555-0203', 'luis.ramirez@example.com', 'Calle 3 #300, Ciudad', 'SSN003'),
('Ana', 'López', '1982-11-05', 'F', '555-0204', 'ana.lopez@example.com', 'Calle 4 #400, Ciudad', 'SSN004'),
('Carlos', 'Martínez', '1995-01-18', 'M', '555-0205', 'carlos.martinez@example.com', 'Calle 5 #500, Ciudad', 'SSN005'),
('Laura', 'Díaz', '1988-09-30', 'F', '555-0206', 'laura.diaz@example.com', 'Calle 6 #600, Ciudad', 'SSN006'),
('Miguel', 'Torres', '1975-12-12', 'M', '555-0207', 'miguel.torres@example.com', 'Calle 7 #700, Ciudad', 'SSN007'),
('Isabel', 'Sánchez', '1992-04-25', 'F', '555-0208', 'isabel.sanchez@example.com', 'Calle 8 #800, Ciudad', 'SSN008'),
('Pedro', 'Hernández', '1980-08-08', 'M', '555-0209', 'pedro.hernandez@example.com', 'Calle 9 #900, Ciudad', 'SSN009'),
('Sofía', 'García', '1998-02-14', 'F', '555-0210', 'sofia.garcia@example.com', 'Calle 10 #1000, Ciudad', 'SSN010');
GO

INSERT INTO Paciente.SegurosMedicos (NombreAseguradora, Cobertura)
VALUES
('Seguro Vida', 'Cobertura completa en hospitalización y consultas.'),
('Salud Total', 'Incluye medicamentos y tratamientos especializados.'),
('MedSalud', 'Cobertura básica con opciones de ampliación.'),
('VidaPlus', 'Cobertura extendida para emergencias.'),
('SaludMax', 'Cobertura completa con servicios adicionales.'),
('Seguro Familiar', 'Cobertura para toda la familia con beneficios.'),
('SaludSeguro', 'Cobertura estándar con descuentos en medicamentos.'),
('VidaSalud', 'Cobertura integral en servicios médicos.'),
('Medicina Avanzada', 'Cobertura para tratamientos avanzados y quirúrgicos.'),
('Seguro Médico Premium', 'Cobertura premium con atención personalizada.');
GO


INSERT INTO Paciente.PacientesSeguros (PacienteID, SeguroID, NumeroPoliza, FechaVencimiento)
VALUES
('PAC:0001', 1, 'POL001', '2025-05-15'),
('PAC:0002', 2, 'POL002', '2024-07-22'),
('PAC:0003', 3, 'POL003', '2026-03-10'),
('PAC:0004', 4, 'POL004', '2023-11-05'),
('PAC:0005', 5, 'POL005', '2025-01-18'),
('PAC:0006', 6, 'POL006', '2024-09-30'),
('PAC:0007', 7, 'POL007', '2026-12-12'),
('PAC:0008', 8, 'POL008', '2025-04-25'),
('PAC:0009', 9, 'POL009', '2024-08-08'),
('PAC:0010', 10, 'POL010', '2025-02-14');
GO


INSERT INTO Insumos.Insumos (NombreInsumo, Descripcion, Precio, Stock, ProveedorID)
VALUES
('Guantes de Látex', 'Guantes estériles de látex para procedimientos médicos.', 5.50, 500, 'PRV:0001'),
('Jeringas 10ml', 'Jeringas de 10ml para inyecciones.', 1.20, 1000, 'PRV:0002'),
('Mascarillas Quirúrgicas', 'Mascarillas de uso quirúrgico de alta filtración.', 2.00, 800, 'PRV:0003'),
('Desinfectante', 'Desinfectante de manos al 70%.', 3.75, 300, 'PRV:0004'),
('Termómetro Digital', 'Termómetro digital para medir la temperatura corporal.', 15.00, 150, 'PRV:0005'),
('Suturas Absorbibles', 'Suturas absorbibles para cierre de heridas.', 8.00, 200, 'PRV:0006'),
('Catéter Venoso', 'Catéter venoso central para tratamientos prolongados.', 25.00, 100, 'PRV:0007'),
('Oxígeno Medido', 'Equipo de medición de oxígeno para pacientes.', 45.00, 50, 'PRV:0008'),
('Equipo de ECG', 'Equipo portátil para electrocardiogramas.', 200.00, 30, 'PRV:0009'),
('Cama Hospitalaria', 'Cama ajustable para pacientes hospitalizados.', 5000.00, 20, 'PRV:0010');
GO


INSERT INTO Alimentos.Alimentos (NombreAlimento, Tipo, PrecioUnitario, Stock, ProveedorID)
VALUES
('Desayuno Continental', 'Desayuno', 12.50, 100, 'PRV:0004'),
('Almuerzo Vegetariano', 'Almuerzo', 15.00, 80, 'PRV:0005'),
('Cena Ligera', 'Cena', 13.75, 90, 'PRV:0006'),
('Merienda Saludable', 'Merienda', 8.00, 120, 'PRV:0007'),
('Desayuno Proteico', 'Desayuno', 14.00, 70, 'PRV:0008'),
('Almuerzo Mediterráneo', 'Almuerzo', 16.50, 60, 'PRV:0009'),
('Cena Gourmet', 'Cena', 18.00, 50, 'PRV:0010'),
('Merienda Frutas', 'Merienda', 7.50, 130, 'PRV:0001'),
('Desayuno Integral', 'Desayuno', 11.00, 110, 'PRV:0002'),
('Almuerzo Rico en Proteínas', 'Almuerzo', 17.00, 65, 'PRV:0003');
GO


INSERT INTO Farmacia.Medicamentos (NombreMedicamento, Precio, Stock, ProveedorID)
VALUES
('Paracetamol', 0.50, 1000, 'PRV:0001'),
('Ibuprofeno', 0.75, 800, 'PRV:0002'),
('Amoxicilina', 1.00, 600, 'PRV:0003'),
('Cetirizina', 0.65, 700, 'PRV:0004'),
('Omeprazol', 0.90, 500, 'PRV:0005'),
('Metformina', 1.20, 400, 'PRV:0006'),
('Aspirina', 0.55, 900, 'PRV:0007'),
('Loratadina', 0.80, 650, 'PRV:0008'),
('Azitromicina', 1.50, 300, 'PRV:0009'),
('Enalapril', 1.10, 350, 'PRV:0010');
GO


INSERT INTO Hospitalizacion.TiposHabitacion (Tipo, PrecioPorDia)
VALUES
('Individual', 200.00),
('Doble', 350.00),
('Suite', 500.00),
('UCI', 1000.00),
('Quirófano Adicional', 750.00),
('Sala de Recuperación', 400.00),
('Habitación VIP', 800.00),
('Habitación Pediátrica', 300.00),
('Habitación Geriátrica', 250.00),
('Habitación con Jacuzzi', 600.00);
GO


INSERT INTO Hospitalizacion.Habitaciones (NumeroHabitacion, TipoHabitacionID, Disponible, Caracteristicas)
VALUES
('101', 1, 1, '<Caracteristicas><Vista>Ciudad</Vista></Caracteristicas>'),
('102', 2, 1, '<Caracteristicas><Balcon>No</Balcon></Caracteristicas>'),
('103', 3, 1, '<Caracteristicas><Jacuzzi>Si</Jacuzzi></Caracteristicas>'),
('104', 4, 1, '<Caracteristicas><Monitoreo>Avanzado</Monitoreo></Caracteristicas>'),
('105', 5, 1, '<Caracteristicas><Equipamiento>Completo</Equipamiento></Caracteristicas>'),
('106', 6, 1, '<Caracteristicas><Área>Recuperación</Área></Caracteristicas>'),
('107', 7, 1, '<Caracteristicas><Vista>Mar</Vista></Caracteristicas>'),
('108', 8, 1, '<Caracteristicas><Equipamiento>Pediátrico</Equipamiento></Caracteristicas>'),
('109', 9, 1, '<Caracteristicas><Accesibilidad>Mejorada</Accesibilidad></Caracteristicas>'),
('110', 10, 1, '<Caracteristicas><Jacuzzi>Si</Jacuzzi></Caracteristicas>');
GO


INSERT INTO Hospitalizacion.Hospitalizaciones (PacienteID, HabitacionID, FechaIngreso, Diagnostico)
VALUES
('PAC:0001', 'HAB:0001', '2024-01-15', 'Apendicitis'),
('PAC:0002', 'HAB:0002', '2024-02-20', 'Fractura de brazo'),
('PAC:0003', 'HAB:0003', '2024-03-10', 'Infección respiratoria'),
('PAC:0004', 'HAB:0004', '2024-04-05', 'Crisis hipertensiva'),
('PAC:0005', 'HAB:0005', '2024-05-18', 'Cirugía de rodilla'),
('PAC:0006', 'HAB:0006', '2024-06-22', 'Recuperación postoperatoria'),
('PAC:0007', 'HAB:0007', '2024-07-30', 'Hipertensión'),
('PAC:0008', 'HAB:0008', '2024-08-14', 'Bronquitis crónica'),
('PAC:0009', 'HAB:0009', '2024-09-09', 'Diabetes tipo 2'),
('PAC:0010', 'HAB:0010', '2024-10-25', 'Descompensación cardíaca');
GO


INSERT INTO Consultorios.Consultorios (Tipo, NumeroConsultorio, MedicoID, Estado)
VALUES
('Interno', 'C001', 'MED:0001', 'Disponible'),
('Externo', 'C002', 'MED:0002', 'Ocupado'),
('Interno', 'C003', 'MED:0003', 'Disponible'),
('Externo', 'C004', 'MED:0004', 'Mantenimiento'),
('Interno', 'C005', 'MED:0005', 'Disponible'),
('Externo', 'C006', 'MED:0006', 'Disponible'),
('Interno', 'C007', 'MED:0007', 'Ocupado'),
('Externo', 'C008', 'MED:0008', 'Disponible'),
('Interno', 'C009', 'MED:0009', 'Disponible'),
('Externo', 'C010', 'MED:0010', 'Ocupado');
GO


INSERT INTO Quirofanos.Quirofanos (NombreQuirofano, Estado, Capacidad)
VALUES
('Quirofano A', 'Disponible', 2),
('Quirofano B', 'Ocupado', 1),
('Quirofano C', 'Mantenimiento', 3),
('Quirofano D', 'Disponible', 2),
('Quirofano E', 'Disponible', 1),
('Quirofano F', 'Ocupado', 2),
('Quirofano G', 'Disponible', 3),
('Quirofano H', 'Mantenimiento', 1),
('Quirofano I', 'Disponible', 2),
('Quirofano J', 'Ocupado', 1);
GO


INSERT INTO Factura.Facturas (PacienteID, FechaFactura, TotalFactura, EstadoPago)
VALUES
('PAC:0001', '2024-01-16', 1500.00, 'Pendiente'),
('PAC:0002', '2024-02-21', 800.00, 'Pagado'),
('PAC:0003', '2024-03-11', 1200.00, 'Pendiente'),
('PAC:0004', '2024-04-06', 950.00, 'Anulado'),
('PAC:0005', '2024-05-19', 2000.00, 'Pendiente'),
('PAC:0006', '2024-06-23', 1100.00, 'Pagado'),
('PAC:0007', '2024-07-31', 700.00, 'Pendiente'),
('PAC:0008', '2024-08-15', 1300.00, 'Pendiente'),
('PAC:0009', '2024-09-10', 1600.00, 'Pagado'),
('PAC:0010', '2024-10-26', 1800.00, 'Pendiente');
GO


INSERT INTO Factura.Pagos (FacturaID, FechaPago, MontoPagado, MetodoPago)
VALUES
('FAC:0001', '2024-01-17', 500.00, 'Tarjeta'),
('FAC:0002', '2024-02-22', 800.00, 'Efectivo'),
('FAC:0003', '2024-03-12', 1200.00, 'Transferencia'),
('FAC:0005', '2024-05-20', 1000.00, 'Tarjeta'),
('FAC:0006', '2024-06-24', 1100.00, 'Efectivo'),
('FAC:0009', '2024-09-11', 1600.00, 'Transferencia');
GO




-- Factura FAC:0001
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0001', 'Hospitalización', '5 días en habitación individual', 5, 200.00),
('FAC:0001', 'Medicamento', 'Paracetamol', 20, 0.50),
('FAC:0001', 'Consulta', 'Consulta con cardiología', 1, 150.00);

-- Factura FAC:0002
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0002', 'Fractura Tratamiento', 'Cirugía de brazo', 1, 800.00);

-- Factura FAC:0003
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0003', 'Infección Respiratoria', 'Tratamiento con antibióticos', 1, 1200.00);

-- Factura FAC:0004 - Anulada (posiblemente no requiere detalles, pero insertaremos algunos)
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0004', 'Consulta', 'Consulta con neurología', 1, 950.00);

-- Factura FAC:0005
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0005', 'Cirugía', 'Cirugía de rodilla', 1, 2000.00);

-- Factura FAC:0006
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0006', 'Recuperación', 'Recuperación postoperatoria', 3, 366.67);

-- Factura FAC:0007
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0007', 'Hipertensión Tratamiento', 'Tratamiento continuo', 1, 700.00);

-- Factura FAC:0008
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0008', 'Bronquitis Tratamiento', 'Tratamiento con inhaladores', 1, 1300.00);

-- Factura FAC:0009
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0009', 'Diabetes Tratamiento', 'Insulina y consultas', 1, 1600.00);

-- Factura FAC:0010
INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
VALUES
('FAC:0010', 'Descompensación Cardíaca', 'Tratamiento intensivo', 1, 1800.00);
GO


INSERT INTO Consultas.Consultas (PacienteID, MedicoID, MotivoConsulta, Diagnostico, Prescripcion)
VALUES
('PAC:0001', 'MED:0001', 'Dolor torácico', 'Angina de pecho', '<Prescripcion><Medicamento>Nitroglicerina</Medicamento></Prescripcion>'),
('PAC:0002', 'MED:0002', 'Dolor de cabeza', 'Migraña', '<Prescripcion><Medicamento>Ibuprofeno</Medicamento></Prescripcion>'),
('PAC:0003', 'MED:0003', 'Fiebre alta', 'Infección viral', '<Prescripcion><Medicamento>Paracetamol</Medicamento></Prescripcion>'),
('PAC:0004', 'MED:0004', 'Dolor abdominal', 'Gastritis', '<Prescripcion><Medicamento>Omeprazol</Medicamento></Prescripcion>'),
('PAC:0005', 'MED:0005', 'Fractura', 'Fractura de pierna', '<Prescripcion><Medicamento>Analgesicos</Medicamento></Prescripcion>'),
('PAC:0006', 'MED:0006', 'Dificultad para respirar', 'Asma', '<Prescripcion><Medicamento>Inhalador</Medicamento></Prescripcion>'),
('PAC:0007', 'MED:0007', 'Fatiga', 'Anemia', '<Prescripcion><Medicamento>Hierro</Medicamento></Prescripcion>'),
('PAC:0008', 'MED:0008', 'Visión borrosa', 'Miopía', '<Prescripcion><Medicamento>Lentes Correctivos</Medicamento></Prescripcion>'),
('PAC:0009', 'MED:0009', 'Estrés', 'Ansiedad', '<Prescripcion><Medicamento>Ansiedad</Medicamento></Prescripcion>'),
('PAC:0010', 'MED:0010', 'Dolor de espalda', 'Hernia discal', '<Prescripcion><Medicamento>Analgesicos</Medicamento></Prescripcion>');
GO


INSERT INTO AlimentosDetalle.AlimentosDetalle (AlimentoID, HospitalizacionID, Cantidad, FechaServicio)
VALUES
('ALI:0001', 'HOS:0001', 5, '2024-01-16'),
('ALI:0002', 'HOS:0002', 3, '2024-02-21'),
('ALI:0003', 'HOS:0003', 4, '2024-03-11'),
('ALI:0004', 'HOS:0004', 2, '2024-04-06'),
('ALI:0005', 'HOS:0005', 6, '2024-05-19'),
('ALI:0006', 'HOS:0006', 3, '2024-06-23'),
('ALI:0007', 'HOS:0007', 2, '2024-07-31'),
('ALI:0008', 'HOS:0008', 4, '2024-08-15'),
('ALI:0009', 'HOS:0009', 5, '2024-09-10'),
('ALI:0010', 'HOS:0010', 3, '2024-10-26');
GO

INSERT INTO InsumosMovimientos.InsumosMovimientos (InsumoID, TipoMovimiento, Cantidad, Descripcion)
VALUES
('INS:0001', 'Ingreso', 100, 'Compra de guantes'),
('INS:0002', 'Ingreso', 200, 'Compra de jeringas'),
('INS:0003', 'Ingreso', 150, 'Compra de mascarillas'),
('INS:0004', 'Ingreso', 80, 'Compra de desinfectante'),
('INS:0005', 'Ingreso', 50, 'Compra de termómetros'),
('INS:0006', 'Ingreso', 60, 'Compra de suturas'),
('INS:0007', 'Ingreso', 40, 'Compra de catéteres'),
('INS:0008', 'Ingreso', 30, 'Compra de equipo de ECG'),
('INS:0009', 'Ingreso', 20, 'Compra de camas hospitalarias'),
('INS:0010', 'Salida', 10, 'Uso en cirugías');
GO

-- Procedimiento almacenado para insertar usuario

CREATE PROCEDURE Usuarios.usp_InsertUsuario
    @Nombre VARCHAR(100),
    @Email VARCHAR(100),
    @Usuario VARCHAR(50),
    @Rol VARCHAR(50),
    @Contrasenia VARCHAR(255),
    @Token VARCHAR(255) = NULL,
    @TokenFecha DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM Usuarios.Usuarios WHERE Email = @Email)
    BEGIN
        RAISERROR('El correo electrónico ya está registrado.', 16, 1);
        RETURN;
    END

    INSERT INTO Usuarios.Usuarios (Nombre, Email, Usuario, Rol, Contrasenia, Token, TokenFecha)
    VALUES (@Nombre, @Email, @Usuario, @Rol, @Contrasenia, @Token, @TokenFecha);
END;
GO

-- Obtener usuario por ID
SELECT UsuarioID,
        UUID,
        Nombre,
        Email,
        Usuario,
        Rol,
        Contrasenia,
        Token,
        TokenFecha,
        Creado,
        Actualizado
    FROM Usuarios.Usuarios


-- Insertar paciente

CREATE PROCEDURE Paciente.usp_InsertPaciente
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @FechaNacimiento DATE,
    @Genero CHAR(1),
    @Telefono VARCHAR(20) = NULL,
    @Email VARCHAR(100) = NULL,
    @Direccion VARCHAR(255) = NULL,
    @NumeroSeguroSocial VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (SELECT 1 FROM Paciente.Pacientes WHERE Email = @Email)
    BEGIN
        RAISERROR('El correo electrónico ya está registrado.', 16, 1);
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM Paciente.Pacientes WHERE NumeroSeguroSocial = @NumeroSeguroSocial)
    BEGIN
        RAISERROR('El número de seguro social ya está registrado.', 16, 1);
        RETURN;
    END

    -- Insertar el paciente
    INSERT INTO Paciente.Pacientes (Nombre, Apellido, FechaNacimiento, Genero, Telefono, Email, Direccion, NumeroSeguroSocial)
    VALUES (@Nombre, @Apellido, @FechaNacimiento, @Genero, @Telefono, @Email, @Direccion, @NumeroSeguroSocial);
END;
GO


-- Obtener paciente por id

SELECT 
        PacienteID,
        Nombre,
        Apellido,
        FechaNacimiento,
        Genero,
        Telefono,
        Email,
        Direccion,
        NumeroSeguroSocial,
        FechaRegistro
FROM Paciente.Pacientes
WHERE PacienteID = ' ' ;


-- Actualizar paciente

CREATE PROCEDURE Paciente.usp_UpdatePaciente
    @PacienteID VARCHAR(20),
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @FechaNacimiento DATE,
    @Genero CHAR(1),
    @Telefono VARCHAR(20) = NULL,
    @Email VARCHAR(100) = NULL,
    @Direccion VARCHAR(255) = NULL,
    @NumeroSeguroSocial VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (
        SELECT 1 FROM Paciente.Pacientes 
        WHERE Email = @Email AND PacienteID <> @PacienteID
    )
    BEGIN
        RAISERROR('El correo electrónico ya está registrado por otro paciente.', 16, 1);
        RETURN;
    END

    IF EXISTS (
        SELECT 1 FROM Paciente.Pacientes 
        WHERE NumeroSeguroSocial = @NumeroSeguroSocial AND PacienteID <> @PacienteID
    )
    BEGIN
        RAISERROR('El número de seguro social ya está registrado por otro paciente.', 16, 1);
        RETURN;
    END

    -- Actualizar el paciente
    UPDATE Paciente.Pacientes
    SET 
        Nombre = @Nombre,
        Apellido = @Apellido,
        FechaNacimiento = @FechaNacimiento,
        Genero = @Genero,
        Telefono = @Telefono,
        Email = @Email,
        Direccion = @Direccion,
        NumeroSeguroSocial = @NumeroSeguroSocial
    WHERE PacienteID = @PacienteID;
END;
GO


-- Eliminar Paciente

DELETE FROM Paciente.Pacientes
WHERE PacienteID = @PacienteID;


-- Insertar Medico

CREATE PROCEDURE Medico.usp_InsertMedico
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @EspecialidadID INT,
    @Interno BIT,
    @HonorariosConsulta DECIMAL(10,2),
    @HonorariosCirugia DECIMAL(10,2) = NULL,
    @Email VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF @Email IS NOT NULL AND EXISTS (SELECT 1 FROM Medico.Medicos WHERE Email = @Email)
    BEGIN
        RAISERROR('El correo electrónico ya está registrado.', 16, 1);
        RETURN;
    END

    -- Insertar el médico
    INSERT INTO Medico.Medicos (Nombre, Apellido, EspecialidadID, Interno, HonorariosConsulta, HonorariosCirugia, Email)
    VALUES (@Nombre, @Apellido, @EspecialidadID, @Interno, @HonorariosConsulta, @HonorariosCirugia, @Email);
END;
GO


-- Obtener Medico por ID

SELECT 
        MedicoID,
        Nombre,
        Apellido,
        EspecialidadID,
        Interno,
        HonorariosConsulta,
        HonorariosCirugia,
        Email,
        FechaRegistro
FROM Medico.Medicos
WHERE MedicoID = @MedicoID;


-- Obtener todos los medicos

SELECT 
        MedicoID,
        Nombre,
        Apellido,
        EspecialidadID,
        Interno,
        HonorariosConsulta,
        HonorariosCirugia,
        Email,
        FechaRegistro
FROM Medico.Medicos;


-- Actualizar medico

CREATE PROCEDURE Medico.usp_UpdateMedico
    @MedicoID VARCHAR(20),
    @Nombre VARCHAR(50),
    @Apellido VARCHAR(50),
    @EspecialidadID INT,
    @Interno BIT,
    @HonorariosConsulta DECIMAL(10,2),
    @HonorariosCirugia DECIMAL(10,2) = NULL,
    @Email VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF @Email IS NOT NULL AND EXISTS (
        SELECT 1 FROM Medico.Medicos 
        WHERE Email = @Email AND MedicoID <> @MedicoID
    )
    BEGIN
        RAISERROR('El correo electrónico ya está registrado por otro médico.', 16, 1);
        RETURN;
    END

    -- Actualizar el médico sin la columna 'Actualizado'
    UPDATE Medico.Medicos
    SET 
        Nombre = @Nombre,
        Apellido = @Apellido,
        EspecialidadID = @EspecialidadID,
        Interno = @Interno,
        HonorariosConsulta = @HonorariosConsulta,
        HonorariosCirugia = @HonorariosCirugia,
        Email = @Email
    WHERE MedicoID = @MedicoID;
END;
GO




-- Eliminar medico

DELETE FROM Medico.Medicos
WHERE MedicoID = @MedicoID;


-- Insertar Proveedor:

CREATE PROCEDURE Proveedores.usp_InsertProveedor
    @NombreProveedor VARCHAR(100),
    @Contacto VARCHAR(100) = NULL,
    @Telefono VARCHAR(20) = NULL,
    @Email VARCHAR(100) = NULL,
    @Direccion VARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (SELECT 1 FROM Proveedores.Proveedores WHERE NombreProveedor = @NombreProveedor)
    BEGIN
        RAISERROR('El proveedor ya está registrado.', 16, 1);
        RETURN;
    END

    IF @Email IS NOT NULL AND EXISTS (SELECT 1 FROM Proveedores.Proveedores WHERE Email = @Email)
    BEGIN
        RAISERROR('El correo electrónico ya está registrado.', 16, 1);
        RETURN;
    END

    -- Insertar el proveedor
    INSERT INTO Proveedores.Proveedores (NombreProveedor, Contacto, Telefono, Email, Direccion)
    VALUES (@NombreProveedor, @Contacto, @Telefono, @Email, @Direccion);
END;
GO


-- Proveedor por iD:

SELECT 
        ProveedorID,
        NombreProveedor,
        Contacto,
        Telefono,
        Email,
        Direccion
FROM Proveedores.Proveedores
WHERE ProveedorID = @ProveedorID;


-- Proveedores

SELECT 
     ProveedorID,
     NombreProveedor,
     Contacto,
     Telefono,
     Email,
     Direccion
FROM Proveedores.Proveedores;


-- Actualizar proveedor

CREATE PROCEDURE Proveedores.usp_UpdateProveedor
    @ProveedorID VARCHAR(20),
    @NombreProveedor VARCHAR(100),
    @Contacto VARCHAR(100) = NULL,
    @Telefono VARCHAR(20) = NULL,
    @Email VARCHAR(100) = NULL,
    @Direccion VARCHAR(255) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (
        SELECT 1 FROM Proveedores.Proveedores 
        WHERE NombreProveedor = @NombreProveedor AND ProveedorID <> @ProveedorID
    )
    BEGIN
        RAISERROR('El proveedor ya está registrado.', 16, 1);
        RETURN;
    END

    IF @Email IS NOT NULL AND EXISTS (
        SELECT 1 FROM Proveedores.Proveedores 
        WHERE Email = @Email AND ProveedorID <> @ProveedorID
    )
    BEGIN
        RAISERROR('El correo electrónico ya está registrado por otro proveedor.', 16, 1);
        RETURN;
    END

    -- Actualizar el proveedor
    UPDATE Proveedores.Proveedores
    SET 
        NombreProveedor = @NombreProveedor,
        Contacto = @Contacto,
        Telefono = @Telefono,
        Email = @Email,
        Direccion = @Direccion
    WHERE ProveedorID = @ProveedorID;
END;
GO

--Eliminar Proveedor

DELETE FROM Proveedores.Proveedores
WHERE ProveedorID = @ProveedorID;



-- Insertar Insumos:

CREATE PROCEDURE Insumos.usp_InsertInsumo
    @NombreInsumo VARCHAR(100),
    @Descripcion VARCHAR(255) = NULL,
    @Precio DECIMAL(10,2),
    @Stock INT,
    @ProveedorID VARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (SELECT 1 FROM Insumos.Insumos WHERE NombreInsumo = @NombreInsumo)
    BEGIN
        RAISERROR('El insumo ya está registrado.', 16, 1);
        RETURN;
    END

    IF @ProveedorID IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM Proveedores.Proveedores WHERE ProveedorID = @ProveedorID
    )
    BEGIN
        RAISERROR('El proveedor especificado no existe.', 16, 1);
        RETURN;
    END

    -- Insertar el insumo
    INSERT INTO Insumos.Insumos (NombreInsumo, Descripcion, Precio, Stock, ProveedorID)
    VALUES (@NombreInsumo, @Descripcion, @Precio, @Stock, @ProveedorID);
END;
GO

-- Obtener Insumo por ID
SELECT 
        InsumoID,
        NombreInsumo,
        Descripcion,
        Precio,
        Stock,
        ProveedorID
FROM Insumos.Insumos
WHERE InsumoID = @InsumoID;




-- Insertar medicamento

CREATE PROCEDURE Farmacia.usp_InsertMedicamento
    @NombreMedicamento VARCHAR(100),
    @Precio DECIMAL(10,2),
    @Stock INT,
    @ProveedorID VARCHAR(20) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (SELECT 1 FROM Farmacia.Medicamentos WHERE NombreMedicamento = @NombreMedicamento)
    BEGIN
        RAISERROR('El medicamento ya está registrado.', 16, 1);
        RETURN;
    END

    IF @ProveedorID IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM Proveedores.Proveedores WHERE ProveedorID = @ProveedorID
    )
    BEGIN
        RAISERROR('El proveedor especificado no existe.', 16, 1);
        RETURN;
    END

    -- Insertar el medicamento
    INSERT INTO Farmacia.Medicamentos (NombreMedicamento, Precio, Stock, ProveedorID)
    VALUES (@NombreMedicamento, @Precio, @Stock, @ProveedorID);
END;
GO


-- Obtener medicamentos

    SELECT 
        MedicamentoID,
        NombreMedicamento,
        Precio,
        Stock,
        ProveedorID
    FROM Farmacia.Medicamentos;


-- Insertar Hospitalizacion

CREATE PROCEDURE Hospitalizacion.usp_InsertHospitalizacion
    @PacienteID VARCHAR(20),
    @HabitacionID VARCHAR(20),
    @FechaIngreso DATETIME2,
    @Diagnostico VARCHAR(MAX) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validaciones
        IF NOT EXISTS (SELECT 1 FROM Paciente.Pacientes WHERE PacienteID = @PacienteID)
        BEGIN
            RAISERROR('El paciente no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Habitaciones WHERE HabitacionID = @HabitacionID AND Disponible = 1)
        BEGIN
            RAISERROR('La habitación no está disponible.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Insertar la hospitalización y obtener HospitalizacionID
        DECLARE @HospitalizacionIDTable TABLE (HospitalizacionID VARCHAR(20));

        INSERT INTO Hospitalizacion.Hospitalizaciones (PacienteID, HabitacionID, FechaIngreso, Diagnostico)
        OUTPUT inserted.HospitalizacionID INTO @HospitalizacionIDTable
        VALUES (@PacienteID, @HabitacionID, @FechaIngreso, @Diagnostico);

        DECLARE @HospitalizacionID VARCHAR(20);
        SELECT @HospitalizacionID = HospitalizacionID FROM @HospitalizacionIDTable;

        -- Actualizar la disponibilidad de la habitación
        UPDATE Hospitalizacion.Habitaciones
        SET Disponible = 0
        WHERE HabitacionID = @HabitacionID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO

-- Hospitalizacion por ID
SELECT 
        HospitalizacionID,
        PacienteID,
        HabitacionID,
        FechaIngreso,
        FechaAlta,
        Diagnostico,
        Estado
FROM Hospitalizacion.Hospitalizaciones
WHERE HospitalizacionID = @HospitalizacionID;



-- Actualizar hospitalizacion

CREATE PROCEDURE Hospitalizacion.usp_UpdateHospitalizacion
    @HospitalizacionID VARCHAR(20),
    @PacienteID VARCHAR(20),
    @HabitacionID VARCHAR(20),
    @FechaIngreso DATETIME2,
    @FechaAlta DATETIME2 = NULL,
    @Diagnostico VARCHAR(MAX),
    @Estado VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validaciones
        IF NOT EXISTS (SELECT 1 FROM Paciente.Pacientes WHERE PacienteID = @PacienteID)
        BEGIN
            RAISERROR('El paciente no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Habitaciones WHERE HabitacionID = @HabitacionID)
        BEGIN
            RAISERROR('La habitación no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF @Estado NOT IN ('Activo', 'Alta', 'Cancelado')
        BEGIN
            RAISERROR('Estado de hospitalización inválido.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF @Estado = 'Alta' AND @FechaAlta IS NULL
        BEGIN
            RAISERROR('Fecha de alta debe ser proporcionada cuando el estado es Alta.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF @Estado = 'Cancelado' AND @FechaAlta IS NOT NULL
        BEGIN
            RAISERROR('Fecha de alta debe ser NULL cuando el estado es Cancelado.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Obtener la habitación actual
        DECLARE @HabitacionActual VARCHAR(20);
        SELECT @HabitacionActual = HabitacionID FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID;

        -- Si la habitación ha cambiado, actualizar la disponibilidad
        IF @HabitacionActual <> @HabitacionID
        BEGIN
            -- Liberar la habitación anterior
            UPDATE Hospitalizacion.Habitaciones
            SET Disponible = 1
            WHERE HabitacionID = @HabitacionActual;

            -- Verificar disponibilidad de la nueva habitación
            IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Habitaciones WHERE HabitacionID = @HabitacionID AND Disponible = 1)
            BEGIN
                RAISERROR('La nueva habitación no está disponible.', 16, 1);
                ROLLBACK TRANSACTION;
                RETURN;
            END

            -- Ocultar la nueva habitación
            UPDATE Hospitalizacion.Habitaciones
            SET Disponible = 0
            WHERE HabitacionID = @HabitacionID;
        END

        -- Actualizar la hospitalización
        UPDATE Hospitalizacion.Hospitalizaciones
        SET 
            PacienteID = @PacienteID,
            HabitacionID = @HabitacionID,
            FechaIngreso = @FechaIngreso,
            FechaAlta = @FechaAlta,
            Diagnostico = @Diagnostico,
            Estado = @Estado
        WHERE HospitalizacionID = @HospitalizacionID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


-- ELiminar hospitalizacion

CREATE PROCEDURE Hospitalizacion.usp_DeleteHospitalizacion
    @HospitalizacionID VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar si la hospitalización existe
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID)
        BEGIN
            RAISERROR('La hospitalización no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Obtener la habitación asignada
        DECLARE @HabitacionID VARCHAR(20);
        SELECT @HabitacionID = HabitacionID FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID;

        -- Liberar la habitación si la hospitalización está activa
        IF EXISTS (SELECT 1 FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID AND Estado = 'Activo')
        BEGIN
            UPDATE Hospitalizacion.Habitaciones
            SET Disponible = 1
            WHERE HabitacionID = @HabitacionID;
        END

        -- Eliminar la hospitalización
        DELETE FROM Hospitalizacion.Hospitalizaciones
        WHERE HospitalizacionID = @HospitalizacionID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


-- Insertar consultorio


CREATE PROCEDURE Consultorios.usp_InsertConsultorio
    @Tipo VARCHAR(50),
    @NumeroConsultorio VARCHAR(10),
    @MedicoID VARCHAR(20) = NULL,
    @Estado VARCHAR(20) = 'Disponible'
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (SELECT 1 FROM Consultorios.Consultorios WHERE NumeroConsultorio = @NumeroConsultorio)
    BEGIN
        RAISERROR('El número de consultorio ya está registrado.', 16, 1);
        RETURN;
    END

    IF @MedicoID IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM Medico.Medicos WHERE MedicoID = @MedicoID
    )
    BEGIN
        RAISERROR('El médico especificado no existe.', 16, 1);
        RETURN;
    END

    IF @Estado NOT IN ('Disponible', 'Ocupado', 'Mantenimiento')
    BEGIN
        RAISERROR('Estado de consultorio inválido.', 16, 1);
        RETURN;
    END

    -- Insertar el consultorio
    INSERT INTO Consultorios.Consultorios (Tipo, NumeroConsultorio, MedicoID, Estado)
    VALUES (@Tipo, @NumeroConsultorio, @MedicoID, @Estado);
END;
GO


-- Actualizar consultorio

CREATE PROCEDURE Consultorios.usp_UpdateConsultorio
    @ConsultorioID VARCHAR(20),
    @Tipo VARCHAR(50),
    @NumeroConsultorio VARCHAR(10),
    @MedicoID VARCHAR(20) = NULL,
    @Estado VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (
        SELECT 1 FROM Consultorios.Consultorios 
        WHERE NumeroConsultorio = @NumeroConsultorio AND ConsultorioID <> @ConsultorioID
    )
    BEGIN
        RAISERROR('El número de consultorio ya está registrado.', 16, 1);
        RETURN;
    END

    IF @MedicoID IS NOT NULL AND NOT EXISTS (
        SELECT 1 FROM Medico.Medicos WHERE MedicoID = @MedicoID
    )
    BEGIN
        RAISERROR('El médico especificado no existe.', 16, 1);
        RETURN;
    END

    IF @Estado NOT IN ('Disponible', 'Ocupado', 'Mantenimiento')
    BEGIN
        RAISERROR('Estado de consultorio inválido.', 16, 1);
        RETURN;
    END

    -- Actualizar el consultorio
    UPDATE Consultorios.Consultorios
    SET 
        Tipo = @Tipo,
        NumeroConsultorio = @NumeroConsultorio,
        MedicoID = @MedicoID,
        Estado = @Estado
    WHERE ConsultorioID = @ConsultorioID;
END;
GO


-- Eliminar consultorio


CREATE PROCEDURE Consultorios.usp_DeleteConsultorio
    @ConsultorioID VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar si el consultorio existe
        IF NOT EXISTS (SELECT 1 FROM Consultorios.Consultorios WHERE ConsultorioID = @ConsultorioID)
        BEGIN
            RAISERROR('El consultorio no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Verificar si el consultorio está asignado a algún médico
        IF EXISTS (SELECT 1 FROM Consultorios.Consultorios WHERE ConsultorioID = @ConsultorioID AND MedicoID IS NOT NULL)
        BEGIN
            RAISERROR('El consultorio está asignado a un médico y no puede ser eliminado.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Eliminar el consultorio
        DELETE FROM Consultorios.Consultorios
        WHERE ConsultorioID = @ConsultorioID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


-- Insertar quirofanos:

CREATE PROCEDURE Quirofanos.usp_InsertQuirofano
    @NombreQuirofano VARCHAR(100),
    @Estado VARCHAR(20) = 'Disponible',
    @Capacidad INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (SELECT 1 FROM Quirofanos.Quirofanos WHERE NombreQuirofano = @NombreQuirofano)
    BEGIN
        RAISERROR('El quirófano ya está registrado.', 16, 1);
        RETURN;
    END

    IF @Estado NOT IN ('Disponible', 'Ocupado', 'Mantenimiento')
    BEGIN
        RAISERROR('Estado de quirófano inválido.', 16, 1);
        RETURN;
    END

    IF @Capacidad <= 0
    BEGIN
        RAISERROR('La capacidad debe ser mayor que cero.', 16, 1);
        RETURN;
    END

    -- Insertar el quirófano
    INSERT INTO Quirofanos.Quirofanos (NombreQuirofano, Estado, Capacidad)
    VALUES (@NombreQuirofano, @Estado, @Capacidad);
END;
GO


--Actualizar quirofano

CREATE PROCEDURE Quirofanos.usp_UpdateQuirofano
    @QuirofanoID VARCHAR(20),
    @NombreQuirofano VARCHAR(100),
    @Estado VARCHAR(20),
    @Capacidad INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Validaciones
    IF EXISTS (
        SELECT 1 FROM Quirofanos.Quirofanos 
        WHERE NombreQuirofano = @NombreQuirofano AND QuirofanoID <> @QuirofanoID
    )
    BEGIN
        RAISERROR('El quirófano ya está registrado.', 16, 1);
        RETURN;
    END

    IF @Estado NOT IN ('Disponible', 'Ocupado', 'Mantenimiento')
    BEGIN
        RAISERROR('Estado de quirófano inválido.', 16, 1);
        RETURN;
    END

    IF @Capacidad <= 0
    BEGIN
        RAISERROR('La capacidad debe ser mayor que cero.', 16, 1);
        RETURN;
    END

    -- Actualizar el quirófano
    UPDATE Quirofanos.Quirofanos
    SET 
        NombreQuirofano = @NombreQuirofano,
        Estado = @Estado,
        Capacidad = @Capacidad
    WHERE QuirofanoID = @QuirofanoID;
END;
GO


-- Eliminar quirofano

CREATE PROCEDURE Quirofanos.usp_DeleteQuirofano
    @QuirofanoID VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar si el quirófano existe
        IF NOT EXISTS (SELECT 1 FROM Quirofanos.Quirofanos WHERE QuirofanoID = @QuirofanoID)
        BEGIN
            RAISERROR('El quirófano no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Verificar si el quirófano está ocupado
        IF EXISTS (SELECT 1 FROM Quirofanos.Quirofanos WHERE QuirofanoID = @QuirofanoID AND Estado = 'Ocupado')
        BEGIN
            RAISERROR('El quirófano está ocupado y no puede ser eliminado.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Eliminar el quirófano
        DELETE FROM Quirofanos.Quirofanos
        WHERE QuirofanoID = @QuirofanoID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO



-- Vista de Pacientes con Sus Seguros

CREATE VIEW Vista_PacientesConSeguros
AS
SELECT 
    p.PacienteID,
    p.Nombre,
    p.Apellido,
    p.Email,
    p.Telefono,
    p.Direccion,
    s.NombreAseguradora,
    ps.NumeroPoliza,
    ps.FechaVencimiento
FROM Paciente.Pacientes p
INNER JOIN Paciente.PacientesSeguros ps ON p.PacienteID = ps.PacienteID
INNER JOIN Paciente.SegurosMedicos s ON ps.SeguroID = s.SeguroID;
GO

SELECT * FROM Vista_PacientesConSeguros


-- Vista de Médicos con Sus Especialidades

CREATE VIEW Vista_MedicosConEspecialidades
AS
SELECT 
    m.MedicoID,
    m.Nombre,
    m.Apellido,
    e.NombreEspecialidad,
    m.Interno,
    m.HonorariosConsulta,
    m.HonorariosCirugia,
    m.Email,
    m.FechaRegistro
FROM Medico.Medicos m
INNER JOIN Medico.Especialidades e ON m.EspecialidadID = e.EspecialidadID;
GO

SELECT * FROM Vista_MedicosConEspecialidades

-- Función para Obtener Facturas por Paciente

CREATE FUNCTION fn_GetFacturasPorPaciente
(
    @PacienteID VARCHAR(20)
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        f.FacturaID,
        f.FechaFactura,
        f.TotalFactura,
        f.EstadoPago
    FROM Factura.Facturas f
    WHERE f.PacienteID = @PacienteID
);
GO

SELECT * FROM 


-- Función para Obtener Hospitalizaciones por Paciente
CREATE FUNCTION fn_GetHospitalizacionesPorPaciente
(
    @PacienteID VARCHAR(20)
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        h.HospitalizacionID,
        h.HabitacionID,
        h.FechaIngreso,
        h.FechaAlta,
        h.Diagnostico,
        h.Estado
    FROM Hospitalizacion.Hospitalizaciones h
    WHERE h.PacienteID = @PacienteID
);
GO


-- Crear Hospitalización con Factura Asociada

CREATE PROCEDURE Hospitalizacion.usp_CrearHospitalizacionConFactura
    @PacienteID VARCHAR(20),
    @HabitacionID VARCHAR(20),
    @FechaIngreso DATETIME2,
    @Diagnostico VARCHAR(MAX) = NULL,
    @TotalFactura DECIMAL(18,2)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validaciones
        IF NOT EXISTS (SELECT 1 FROM Paciente.Pacientes WHERE PacienteID = @PacienteID)
        BEGIN
            RAISERROR('El paciente no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Habitaciones WHERE HabitacionID = @HabitacionID AND Disponible = 1)
        BEGIN
            RAISERROR('La habitación no está disponible.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Insertar la hospitalización y obtener HospitalizacionID
        DECLARE @HospitalizacionIDTable TABLE (HospitalizacionID VARCHAR(20));

        INSERT INTO Hospitalizacion.Hospitalizaciones (PacienteID, HabitacionID, FechaIngreso, Diagnostico)
        OUTPUT inserted.HospitalizacionID INTO @HospitalizacionIDTable
        VALUES (@PacienteID, @HabitacionID, @FechaIngreso, @Diagnostico);

        DECLARE @HospitalizacionID VARCHAR(20);
        SELECT @HospitalizacionID = HospitalizacionID FROM @HospitalizacionIDTable;

        -- Actualizar la disponibilidad de la habitación
        UPDATE Hospitalizacion.Habitaciones
        SET Disponible = 0
        WHERE HabitacionID = @HabitacionID;

        -- Insertar la factura y obtener FacturaID
        DECLARE @FacturaIDTable TABLE (FacturaID VARCHAR(20));

        INSERT INTO Factura.Facturas (PacienteID, FechaFactura, TotalFactura, EstadoPago)
        OUTPUT inserted.FacturaID INTO @FacturaIDTable
        VALUES (@PacienteID, @FechaIngreso, @TotalFactura, 'Pendiente');

        DECLARE @FacturaID VARCHAR(20);
        SELECT @FacturaID = FacturaID FROM @FacturaIDTable;

        -- Insertar el detalle de la factura
        INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
        VALUES (@FacturaID, 'Hospitalización', 'Ingreso a hospitalización', 1, @TotalFactura);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


2.2. Procedimiento usp_DarAltaHospitalizacion
Este procedimiento manejará la alta de un paciente, liberando la habitación y calculando los gastos.

CREATE PROCEDURE Hospitalizacion.usp_DarAltaHospitalizacion
    @HospitalizacionID VARCHAR(20),
    @FechaAlta DATETIME2,
    @Gastos DECIMAL(18,2)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar existencia de la hospitalización
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID AND Estado = 'Activo')
        BEGIN
            RAISERROR('La hospitalización no existe o ya ha sido dada de alta.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Actualizar la hospitalización
        UPDATE Hospitalizacion.Hospitalizaciones
        SET FechaAlta = @FechaAlta,
            Estado = 'Alta'
        WHERE HospitalizacionID = @HospitalizacionID;

        -- Liberar la habitación
        DECLARE @HabitacionID VARCHAR(20);
        SELECT @HabitacionID = HabitacionID FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID;

        UPDATE Hospitalizacion.Habitaciones
        SET Disponible = 1
        WHERE HabitacionID = @HabitacionID;

        -- Actualizar la factura total
        DECLARE @FacturaID VARCHAR(20);
        SELECT @FacturaID = FacturaID FROM Factura.Facturas WHERE PacienteID = (SELECT PacienteID FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID) AND EstadoPago = 'Pendiente';

        IF @FacturaID IS NOT NULL
        BEGIN
            UPDATE Factura.Facturas
            SET TotalFactura = TotalFactura + @Gastos
            WHERE FacturaID = @FacturaID;

            INSERT INTO Factura.FacturaDetalle (FacturaID, Servicio, Descripcion, Cantidad, PrecioUnitario)
            VALUES (@FacturaID, 'Gastos Extra', 'Gastos durante hospitalización', 1, @Gastos);
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


2.3. Procedimiento usp_PagarFactura
Este procedimiento registrará el pago de una factura.

CREATE PROCEDURE Factura.usp_PagarFactura
    @FacturaID VARCHAR(20),
    @MontoPagado DECIMAL(18,2),
    @MetodoPago VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar existencia de la factura
        IF NOT EXISTS (SELECT 1 FROM Factura.Facturas WHERE FacturaID = @FacturaID AND EstadoPago = 'Pendiente')
        BEGIN
            RAISERROR('La factura no existe o ya ha sido pagada.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Insertar el pago
        INSERT INTO Factura.Pagos (FacturaID, FechaPago, MontoPagado, MetodoPago)
        VALUES (@FacturaID, GETDATE(), @MontoPagado, @MetodoPago);

        -- Actualizar el estado de la factura si está totalmente pagada
        DECLARE @TotalFactura DECIMAL(18,2);
        DECLARE @TotalPagado DECIMAL(18,2);

        SELECT @TotalFactura = TotalFactura FROM Factura.Facturas WHERE FacturaID = @FacturaID;
        SELECT @TotalPagado = SUM(MontoPagado) FROM Factura.Pagos WHERE FacturaID = @FacturaID;

        IF @TotalPagado >= @TotalFactura
        BEGIN
            UPDATE Factura.Facturas
            SET EstadoPago = 'Pagado'
            WHERE FacturaID = @FacturaID;
        END
        ELSE
        BEGIN
            UPDATE Factura.Facturas
            SET EstadoPago = 'Pendiente'
            WHERE FacturaID = @FacturaID;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


.4. Procedimiento usp_RegistrarVisitaMedica
Este procedimiento registrará las visitas médicas realizadas a un paciente.

CREATE PROCEDURE Consultas.usp_RegistrarVisitaMedica
    @ConsultaID VARCHAR(20),
    @MedicoID VARCHAR(20),
    @PacienteID VARCHAR(20),
    @FechaConsulta DATETIME2,
    @MotivoConsulta VARCHAR(MAX),
    @Diagnostico VARCHAR(MAX),
    @Prescripcion XML
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar existencia de Médico y Paciente
        IF NOT EXISTS (SELECT 1 FROM Medico.Medicos WHERE MedicoID = @MedicoID)
        BEGIN
            RAISERROR('El médico no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM Paciente.Pacientes WHERE PacienteID = @PacienteID)
        BEGIN
            RAISERROR('El paciente no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Registrar la visita médica
        INSERT INTO Consultas.Consultas (ConsultaID, PacienteID, MedicoID, FechaConsulta, MotivoConsulta, Diagnostico, Prescripcion)
        VALUES (@ConsultaID, @PacienteID, @MedicoID, @FechaConsulta, @MotivoConsulta, @Diagnostico, @Prescripcion);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


CREATE PROCEDURE Hospitalizacion.usp_RegistrarMedicamentoAplicado
    @HospitalizacionID VARCHAR(20),
    @MedicamentoID VARCHAR(20),
    @Cantidad INT,
    @FechaAplicacion DATETIME2
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar existencia de Hospitalización y Medicamento
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID AND Estado = 'Activo')
        BEGIN
            RAISERROR('La hospitalización no existe o no está activa.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM Farmacia.Medicamentos WHERE MedicamentoID = @MedicamentoID)
        BEGIN
            RAISERROR('El medicamento no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Registrar el medicamento aplicado
        INSERT INTO MedicamentosAplicados (HospitalizacionID, MedicamentoID, Cantidad, FechaAplicacion)
        VALUES (@HospitalizacionID, @MedicamentoID, @Cantidad, @FechaAplicacion);

        -- Actualizar el stock de medicamentos
        UPDATE Farmacia.Medicamentos
        SET Stock = Stock - @Cantidad
        WHERE MedicamentoID = @MedicamentoID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


 2.6. Procedimiento usp_RegistrarAlimentoSuministrado
Este procedimiento registrará los alimentos suministrados a un paciente durante su hospitalización.

CREATE PROCEDURE Hospitalizacion.usp_RegistrarMedicamentoAplicado
    @HospitalizacionID VARCHAR(20),
    @MedicamentoID VARCHAR(20),
    @Cantidad INT,
    @FechaAplicacion DATETIME2
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar existencia de Hospitalización y Medicamento
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID AND Estado = 'Activo')
        BEGIN
            RAISERROR('La hospitalización no existe o no está activa.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM Farmacia.Medicamentos WHERE MedicamentoID = @MedicamentoID)
        BEGIN
            RAISERROR('El medicamento no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Registrar el medicamento aplicado
        INSERT INTO MedicamentosAplicados (HospitalizacionID, MedicamentoID, Cantidad, FechaAplicacion)
        VALUES (@HospitalizacionID, @MedicamentoID, @Cantidad, @FechaAplicacion);

        -- Actualizar el stock de medicamentos
        UPDATE Farmacia.Medicamentos
        SET Stock = Stock - @Cantidad
        WHERE MedicamentoID = @MedicamentoID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO



 2.6. Procedimiento usp_RegistrarAlimentoSuministrado
Este procedimiento registrará los alimentos suministrados a un paciente durante su hospitalización.

CREATE PROCEDURE Hospitalizacion.usp_RegistrarAlimentoSuministrado
    @HospitalizacionID VARCHAR(20),
    @AlimentoID VARCHAR(20),
    @Cantidad INT,
    @FechaServicio DATETIME2
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar existencia de Hospitalización y Alimento
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID AND Estado = 'Activo')
        BEGIN
            RAISERROR('La hospitalización no existe o no está activa.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM Alimentos.Alimentos WHERE AlimentoID = @AlimentoID)
        BEGIN
            RAISERROR('El alimento no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Registrar el alimento suministrado
        INSERT INTO AlimentosDetalle.AlimentosDetalle (AlimentoID, HospitalizacionID, Cantidad, FechaServicio)
        VALUES (@AlimentoID, @HospitalizacionID, @Cantidad, @FechaServicio);

        -- Actualizar el stock de alimentos
        UPDATE Alimentos.Alimentos
        SET Stock = Stock - @Cantidad
        WHERE AlimentoID = @AlimentoID;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


2.7. Procedimiento usp_RegistrarExamenMedico
Este procedimiento registrará los exámenes médicos realizados a un paciente durante su hospitalización.

CREATE PROCEDURE Hospitalizacion.usp_RegistrarExamenMedico
    @HospitalizacionID VARCHAR(20),
    @ExamenID VARCHAR(20),
    @Resultado VARCHAR(MAX),
    @FechaExamen DATETIME2
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar existencia de Hospitalización y Examen
        IF NOT EXISTS (SELECT 1 FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = @HospitalizacionID AND Estado = 'Activo')
        BEGIN
            RAISERROR('La hospitalización no existe o no está activa.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM ExamenesMedicos WHERE ExamenID = @ExamenID)
        BEGIN
            RAISERROR('El examen médico no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Registrar el examen médico
        INSERT INTO ExamenesRealizados (HospitalizacionID, ExamenID, Resultado, FechaExamen)
        VALUES (@HospitalizacionID, @ExamenID, @Resultado, @FechaExamen);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


EXEC Hospitalizacion.usp_CrearHospitalizacionConFactura
    @PacienteID = 'PAC100',
    @HabitacionID = 'HAB:0027',
    @FechaIngreso = '2024-12-01T10:00:00',
    @Diagnostico = 'Gripe común',
    @TotalFactura = 500.00;


SELECT * FROM Hospitalizacion.Habitaciones


INSERT INTO Paciente.Pacientes (PacienteID, Nombre, Apellido, FechaNacimiento, Genero, Telefono, Email, Direccion, NumeroSeguroSocial)
VALUES ('PAC100', 'Erick', 'Reyes', '1980-05-15', 'M', '555-1234', 'erick.reyes@example.com', 'Calle Falsa 123', 'SSS123456');


-- Insertar 10 habitaciones 'Standard'
INSERT INTO Hospitalizacion.Habitaciones (NumeroHabitacion, TipoHabitacionID, Disponible, Caracteristicas)
VALUES 
    ('111', 1, 1, NULL),
    ('112', 1, 1, NULL),
    ('113', 1, 1, NULL),
    ('114', 1, 1, NULL),
    ('115', 1, 1, NULL),
    ('116', 1, 1, NULL),
    ('117', 1, 1, NULL),
    ('118', 1, 1, NULL),
    ('119', 1, 1, NULL),
    ('120', 1, 1, NULL);

-- Insertar 5 habitaciones 'Suite'
INSERT INTO Hospitalizacion.Habitaciones (NumeroHabitacion, TipoHabitacionID, Disponible, Caracteristicas)
VALUES 
    ('221', 2, 1, NULL),
    ('222', 2, 1, NULL),
    ('223', 2, 1, NULL),
    ('224', 2, 1, NULL),
    ('225', 2, 1, NULL);

-- Insertar 5 habitaciones 'Deluxe'
INSERT INTO Hospitalizacion.Habitaciones (NumeroHabitacion, TipoHabitacionID, Disponible, Caracteristicas)
VALUES 
    ('301', 3, 1, NULL),
    ('302', 3, 1, NULL),
    ('303', 3, 1, NULL),
    ('304', 3, 1, NULL),
    ('305', 3, 1, NULL);
GO


EXEC Hospitalizacion.usp_DarAltaHospitalizacion
    @HospitalizacionID = 'HOS:0011', -- Reemplaza con el ID generado al crear la hospitalización
    @FechaAlta = '2024-12-10T15:30:00',
    @Gastos = 150.00;

	SELECT * FROM Hospitalizacion.Hospitalizaciones

EXEC Factura.usp_PagarFactura
    @FacturaID = 'FAC:0011', -- Reemplaza con el ID de la factura creada
    @MontoPagado = 500.00,
    @MetodoPago = 'Tarjeta';

SELECT * FROM Factura.Facturas
SELECT * FROM Factura.Pagos


CREATE PROCEDURE Consultas.usp_RegistrarVisitaMedica
    @ConsultaID VARCHAR(20),
    @MedicoID VARCHAR(20),
    @PacienteID VARCHAR(20),
    @FechaConsulta DATETIME2,
    @MotivoConsulta VARCHAR(MAX),
    @Diagnostico VARCHAR(MAX),
    @Prescripcion XML
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Validar existencia de Médico y Paciente
        IF NOT EXISTS (SELECT 1 FROM Medico.Medicos WHERE MedicoID = @MedicoID)
        BEGIN
            RAISERROR('El médico no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        IF NOT EXISTS (SELECT 1 FROM Paciente.Pacientes WHERE PacienteID = @PacienteID)
        BEGIN
            RAISERROR('El paciente no existe.', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END

        -- Registrar la visita médica
        INSERT INTO Consultas.Consultas (ConsultaID, PacienteID, MedicoID, FechaConsulta, MotivoConsulta, Diagnostico, Prescripcion)
        VALUES (@ConsultaID, @PacienteID, @MedicoID, @FechaConsulta, @MotivoConsulta, @Diagnostico, @Prescripcion);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END;
GO


EXEC Consultas.usp_RegistrarVisitaMedica
    @ConsultaID = 'CNS:0011',
    @MedicoID = 'MED:0002',
    @PacienteID = 'PAC:0004',
    @FechaConsulta = '2024-12-02T09:30:00',
    @MotivoConsulta = 'Dolor de cabeza',
    @Diagnostico = 'Migraña',
    @Prescripcion = '<Prescripciones><Medicamento ID="MED001" Dosis="500mg" Frecuencia="Cada 8 horas"/></Prescripciones>';


SELECT * FROM Consultas.Consultas
SELECT * FROM Medico.Medicos
SELECT * FROM Paciente.Pacientes


EXEC Hospitalizacion.usp_RegistrarMedicamentoAplicado
    @HospitalizacionID = 'HOS:0001', -- Reemplaza con el ID de hospitalización
    @MedicamentoID = 'MED:0005',
    @Cantidad = 2,
    @FechaAplicacion = '2024-12-03T08:00:00';


SELECT * FROM Farmacia.Medicamentos
SELECT * FROM Hospitalizacion.Hospitalizaciones
SELECT * FROM Hospitalizacion.MedicamentosAplicados

CREATE TABLE Hospitalizacion.MedicamentosAplicados (
    MedicamentoAplicadoID INT IDENTITY(1,1) PRIMARY KEY,
    HospitalizacionID VARCHAR(20) NOT NULL,
    MedicamentoID VARCHAR(20) NOT NULL,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    FechaAplicacion DATETIME2 NOT NULL,
    FOREIGN KEY (HospitalizacionID) REFERENCES Hospitalizacion.Hospitalizaciones(HospitalizacionID),
    FOREIGN KEY (MedicamentoID) REFERENCES Farmacia.Medicamentos(MedicamentoID)
);
GO


EXEC Hospitalizacion.usp_RegistrarAlimentoSuministrado
    @HospitalizacionID = 'HOS:0002', -- Reemplaza con el ID de hospitalización
    @AlimentoID = 'ALI:0001',
    @Cantidad = 3,
    @FechaServicio = '2024-12-03T12:00:00';

SELECT * FROM Hospitalizacion.Hospitalizaciones
SELECT * FROM Alimentos.Alimentos


EXEC Hospitalizacion.usp_RegistrarExamenMedico
    @HospitalizacionID = 'HOS:0006', -- Reemplaza con el ID de hospitalización
    @ExamenID = 'EXM001',
    @Resultado = 'Hemoglobina: 13 g/dL',
    @FechaExamen = '2024-12-04T10:00:00';

SELECT * FROM Hospitalizacion.Hospitalizaciones


SELECT 
    TABLE_SCHEMA,
    TABLE_NAME
FROM 
    INFORMATION_SCHEMA.TABLES
WHERE 
    TABLE_NAME = 'ExamenesMedicos';
GO

-- Crear la tabla 'ExamenesRealizados' en el esquema 'Consultas'
CREATE TABLE Consultas.ExamenesRealizados (
    ExamenRealizadoID INT IDENTITY(1,1) PRIMARY KEY,
    HospitalizacionID VARCHAR(20) NOT NULL,
    ExamenID VARCHAR(20) NOT NULL,
    Resultado VARCHAR(MAX) NOT NULL,
    FechaExamen DATETIME2 NOT NULL,
    FOREIGN KEY (HospitalizacionID) REFERENCES Hospitalizacion.Hospitalizaciones(HospitalizacionID),
    FOREIGN KEY (ExamenID) REFERENCES Consultas.ExamenesMedicos(ExamenID)
);
GO


INSERT INTO Consultas.ExamenesMedicos (ExamenID, NombreExamen)
VALUES 
    ('EXM001', 'Análisis de Sangre'),
    ('EXM002', 'Radiografía de Tórax'),
    ('EXM003', 'Ecografía Abdominal');
GO

SELECT * FROM Consultas.ExamenesRealizados WHERE HospitalizacionID = 'HOS:0006';
GO

SELECT * FROM Consultas.ExamenesMedicos
SELECT * FROM Consultas.ExamenesRealizados



EXEC Hospitalizacion.usp_RegistrarExamenMedico
    @HospitalizacionID = 'HOS:0006', -- Asegúrate de que este ID exista y esté activo
    @ExamenID = 'EXM001',
    @Resultado = 'Hemoglobina: 13 g/dL',
    @FechaExamen = '2024-12-04T10:00:00';
GO

INSERT INTO Consultas.ExamenesRealizados (HospitalizacionID, ExamenID, Resultado, FechaExamen)
VALUES 
    ('HOS:0006', 'EXM002', 'Hemoglobina: 13 g/dL', '2024-12-04T10:00:00');
GO


EXEC Hospitalizacion.usp_RegistrarExamenMedico
    @HospitalizacionID = 'HOS:0006',
    @ExamenID = 'EXM001',
    @Resultado = 'Hemoglobina: 13 g/dL',
    @FechaExamen = '2024-12-04T10:00:00';


SELECT * FROM Consultas.ExamenesRealizados WHERE HospitalizacionID = 'HOS:0006';
GO


CREATE PROCEDURE usp_ObtenerHospitalizacionesDetalladas
AS
BEGIN
    SELECT 
        H.HospitalizacionID,
        H.PacienteID,
        P.Nombre + ' ' + P.Apellido AS NombrePaciente,
        H.HabitacionID,
        HAB.NumeroHabitacion,
        H.FechaIngreso,
        H.FechaAlta,
        H.Diagnostico,
        H.Estado
    FROM Hospitalizacion.Hospitalizaciones H
    INNER JOIN Paciente.Pacientes P ON H.PacienteID = P.PacienteID
    INNER JOIN Hospitalizacion.Habitaciones HAB ON H.HabitacionID = HAB.HabitacionID;
END;
GO


EXEC usp_ObtenerHospitalizacionesDetalladas;


CREATE PROCEDURE usp_ObtenerHospitalizacionesDetalladas
AS
BEGIN
    SELECT 
        H.HospitalizacionID,
        H.PacienteID,
        P.Nombre + ' ' + P.Apellido AS NombrePaciente,
        H.HabitacionID,
        HAB.NumeroHabitacion,
        H.FechaIngreso,
        H.FechaAlta,
        H.Diagnostico,
        H.Estado
    FROM Hospitalizacion.Hospitalizaciones H
    INNER JOIN Paciente.Pacientes P ON H.PacienteID = P.PacienteID
    INNER JOIN Hospitalizacion.Habitaciones HAB ON H.HabitacionID = HAB.HabitacionID
    WHERE H.Estado = 'Activo';
END;
GO


EXEC usp_ObtenerHospitalizacionesDetalladas;


CREATE VIEW Hospitalizacion.ViewHabitacionesDetalle
AS
SELECT 
    H.HabitacionID,
    H.NumeroHabitacion,
    H.TipoHabitacionID,
    TH.Tipo,
    TH.PrecioPorDia,
    H.Disponible,
    H.Caracteristicas
FROM Hospitalizacion.Habitaciones H
INNER JOIN Hospitalizacion.TiposHabitacion TH ON H.TipoHabitacionID = TH.TipoHabitacionID;
GO

SELECT * FROM Hospitalizacion.ViewHabitacionesDetalle