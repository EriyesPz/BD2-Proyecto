USE Hospital

SELECT * FROM dbo.Direcciones

INSERT INTO dbo.Direcciones (Calle, Ciudad, Estado, CodigoPostal, Pais) VALUES
('Av. Principal 123', 'Ciudad A', 'Estado A', '10001', 'País X'),
('Calle Secundaria 456', 'Ciudad B', 'Estado B', '20002', 'País Y'),
('Boulevard Central 789', 'Ciudad C', 'Estado C', '30003', 'País Z'),
('Camino Real 101', 'Ciudad D', 'Estado D', '40004', 'País X'),
('Ruta Nacional 202', 'Ciudad E', 'Estado E', '50005', 'País Y');
GO

INSERT INTO Usuarios.Usuarios (Nombre, Email, Usuario, Rol, Contrasenia)
VALUES
('Administrador General', 'admin@hospital.com', 'admin', 'Admin', 'admin123'),
('Juana Pérez', 'juana.perez@hospital.com', 'jperez', 'Recepción', 'password1'),
('María López', 'maria.lopez@hospital.com', 'mlopez', 'Enfermería', 'password2'),
('Carlos Gómez', 'carlos.gomez@hospital.com', 'cgomez', 'Médico', 'password3'),
('Ana Torres', 'ana.torres@hospital.com', 'atorres', 'Farmacia', 'password4');
GO

INSERT INTO Medico.Especialidades (NombreEspecialidad, Descripcion)
VALUES
('Cardiología', 'Especialidad en enfermedades del corazón y sistema circulatorio'),
('Neurología', 'Especialidad en trastornos del sistema nervioso'),
('Pediatría', 'Atención médica de niños y adolescentes'),
('Dermatología', 'Especialidad en afecciones de la piel'),
('Ginecología', 'Salud reproductiva femenina');
GO

INSERT INTO Paciente.SegurosMedicos (NombreAseguradora, Cobertura, Telefono, Email)
VALUES
('Seguro Salud Plus', 'Cobertura completa en hospitalización y cirugías', '555-1234', 'contacto@segurosaludplus.com'),
('Vida Segura', 'Cobertura en consultas y medicamentos', '555-5678', 'info@vidasegura.com'),
('Protección Médica', 'Cobertura básica en emergencias', '555-8765', 'atencion@proteccionmedica.com');
GO

SELECT * FROM Administracion.Puestos

INSERT INTO Administracion.Puestos (NombrePuesto, Descripcion)
VALUES
('Recepcionista', 'Atiende a los pacientes y gestiona citas'),
('Enfermero/a', 'Brinda cuidados y asistencia médica a los pacientes'),
('Farmacéutico/a', 'Gestiona el suministro y dispensación de medicamentos'),
('Administrador/a', 'Gestiona las operaciones administrativas del hospital'),
('Técnico de Laboratorio', 'Realiza análisis y exámenes de laboratorio');
GO

INSERT INTO Hospitalizacion.TiposHabitacion (Tipo, PrecioPorDia)
VALUES
('Estándar', 100.00),
('Privada', 200.00),
('Suite', 300.00);
GO

SELECT * FROM Hospitalizacion.TiposHabitacion


INSERT INTO Farmacia.Proveedores (NombreProveedor, Contacto, Telefono, Email, DireccionID)
VALUES
('Proveedor Medicamentos SA', 'Luis Martínez', '555-1122', 'ventas@proveedormedicamentos.com', 1),
('Distribuidora FarmaPlus', 'Sofía Ramírez', '555-3344', 'contacto@farmaplus.com', 2),
('Medicamentos Globales', 'Andrés García', '555-5566', 'info@medglobal.com', 3);
GO

SELECT * FROM Farmacia.Proveedores

INSERT INTO Laboratorio.Examenes (NombreExamen, Descripcion, Precio)
VALUES
('Hemograma Completo', 'Análisis de células sanguíneas', 50.00),
('Radiografía de Tórax', 'Imagen del tórax para evaluar pulmones y corazón', 75.00),
('Resonancia Magnética', 'Imagen detallada de órganos y tejidos', 300.00),
('Análisis de Orina', 'Evaluación química y microscópica de la orina', 25.00),
('Prueba de Glucosa', 'Medición de niveles de azúcar en sangre', 20.00);
GO

SELECT * FROM  Medico.Medicos

INSERT INTO Medico.Medicos (Nombre, Apellido, EspecialidadID, Interno, HonorariosConsulta, HonorariosCirugia, DireccionID, Telefono, Email)
VALUES
('José', 'Rodríguez', 1, 1, 150.00, 500.00, 1, '555-1111', 'jose.rodriguez@hospital.com'),
('Laura', 'Martínez', 2, 0, 140.00, 480.00, 2, '555-2222', 'laura.martinez@hospital.com'),
('Miguel', 'Hernández', 3, 1, 130.00, NULL, 3, '555-3333', 'miguel.hernandez@hospital.com'),
('Sandra', 'García', 4, 0, 120.00, NULL, 4, '555-4444', 'sandra.garcia@hospital.com'),
('Ana', 'López', 5, 1, 160.00, 550.00, 5, '555-4444', 'ana.lopez@hospital.com');
GO

INSERT INTO Paciente.Pacientes (Nombre, Apellido, FechaNacimiento, Genero, Telefono, Email, DireccionID, NumeroSeguroSocial)
VALUES
('Luis', 'Pérez', '1980-05-15', 'M', '555-5555', 'luis.perez@gmail.com', 1, 'SSN12345'),
('María', 'Sánchez', '1992-08-22', 'F', '555-6666', 'maria.sanchez@gmail.com', 2, 'SSN23456'),
('Carlos', 'Ramírez', '1975-12-30', 'M', '555-7777', 'carlos.ramirez@gmail.com', 3, 'SSN34567'),
('Elena', 'Torres', '1985-03-10', 'F', '555-8888', 'elena.torres@gmail.com', 4, 'SSN45678'),
('Jorge', 'Vargas', '1990-07-25', 'M', '555-9999', 'jorge.vargas@gmail.com', 5, 'SSN56789');
GO

SELECT * FROM Paciente.Pacientes

INSERT INTO Administracion.Empleados (Nombre, Apellido, PuestoID, FechaContratacion, DireccionID, Telefono, Email, Salario)
VALUES
('Lucía', 'Mendoza', 1, '2018-01-10', 1, '555-1212', 'lucia.mendoza@hospital.com', 2000.00),
('Fernando', 'Silva', 2, '2019-05-15', 2, '555-1313', 'fernando.silva@hospital.com', 2200.00),
('Sofía', 'Díaz', 3, '2017-09-20', 3, '555-1414', 'sofia.diaz@hospital.com', 2500.00),
('Ricardo', 'Gómez', 4, '2016-02-28', 4, '555-1515', 'ricardo.gomez@hospital.com', 3000.00),
('Natalia', 'Fernández', 5, '2020-11-05', 5, '555-1616', 'natalia.fernandez@hospital.com', 2300.00);
GO

SELECT * FROM Administracion.Empleados

INSERT INTO Farmacia.Medicamentos (NombreMedicamento, Descripcion, Precio, Stock, ProveedorID)
VALUES
('Paracetamol', 'Analgésico y antipirético', 5.00, 100, 1),
('Ibuprofeno', 'Analgésico y antiinflamatorio', 8.00, 80, 2),
('Amoxicilina', 'Antibiótico de amplio espectro', 12.00, 50, 3),
('Loratadina', 'Antihistamínico para alergias', 7.00, 60, 1),
('Omeprazol', 'Inhibidor de la bomba de protones', 15.00, 70, 2);
GO

SELECT * FROM Farmacia.Medicamentos

INSERT INTO Hospitalizacion.Habitaciones (NumeroHabitacion, TipoHabitacionID, Disponible, Caracteristicas)
VALUES
('101', 1, 1, '<Caracteristicas><TV>Si</TV><Baño>Compartido</Baño></Caracteristicas>'),
('102', 1, 1, '<Caracteristicas><TV>No</TV><Baño>Compartido</Baño></Caracteristicas>'),
('201', 2, 1, '<Caracteristicas><TV>Si</TV><Baño>Privado</Baño></Caracteristicas>'),
('202', 2, 1, '<Caracteristicas><TV>Si</TV><Baño>Privado</Baño></Caracteristicas>'),
('301', 3, 1, '<Caracteristicas><TV>Si</TV><Baño>Privado</Baño><Sala>Si</Sala></Caracteristicas>');
GO

SELECT * FROM Hospitalizacion.Habitaciones

INSERT INTO Paciente.PacientesSeguros (PacienteID, SeguroID, NumeroPoliza, FechaVencimiento)
VALUES
(1, 1, 'POL12345', '2024-12-31'),
(2, 2, 'POL23456', '2023-06-30'),
(3, 3, 'POL34567', '2025-09-15'),
(4, 1, 'POL45678', '2024-03-20'),
(5, 2, 'POL56789', '2023-11-05');
GO

SELECT * FROM Paciente.PacientesSeguros

EXEC Hospitalizacion.sp_RegistrarHospitalizacion
    @PacienteID = 2,
    @HabitacionID = 2,
    @FechaIngreso = '2022-02-20 14:00:00',
    @Diagnostico = 'Apendicitis';

EXEC Hospitalizacion.sp_RegistrarHospitalizacion
    @PacienteID = 3,
    @HabitacionID = 3,
    @FechaIngreso = '2022-03-05 09:30:00',
    @Diagnostico = 'Fractura de pierna';

EXEC Hospitalizacion.sp_RegistrarHospitalizacion
    @PacienteID = 5,
    @HabitacionID = 5,
    @FechaIngreso = '2022-05-22 11:15:00',
    @Diagnostico = 'Infarto';
GO

EXEC Hospitalizacion.sp_DarAltaHospitalizacion
    @HospitalizacionID = 1,
    @FechaAlta = '2022-02-25 10:00:00';
GO

INSERT INTO Medico.Consultas (PacienteID, MedicoID, FechaConsulta, MotivoConsulta, Diagnostico, Prescripcion)
VALUES
(1, 1, '2022-01-12 10:00:00', 'Dolor en el pecho', 'Angina de pecho', NULL),
(2, 2, '2022-02-22 15:00:00', 'Dolor de cabeza', 'Migraña', NULL),
(3, 3, '2022-03-07 11:30:00', 'Tos persistente', 'Bronquitis', NULL),
(4, 4, '2022-04-14 09:00:00', 'Erupción en la piel', 'Dermatitis', NULL),
(5, 5, '2022-05-24 16:00:00', 'Dolor abdominal', 'Gastritis', NULL);
GO

INSERT INTO Laboratorio.Resultados (ExamenID, PacienteID, FechaExamen, Resultados, Observaciones)
VALUES
(1, 1, '2022-01-13 09:00:00', '<Resultados><Hemoglobina>14</Hemoglobina></Resultados>', 'Valores normales'),
(2, 2, '2022-02-23 10:00:00', '<Resultados><Imagen>Radiografía normal</Imagen></Resultados>', 'Sin anomalías'),
(3, 3, '2022-03-08 14:00:00', '<Resultados><RM>Cambios inflamatorios</RM></Resultados>', 'Requiere seguimiento'),
(4, 4, '2022-04-15 08:00:00', '<Resultados><Proteínas>Negativo</Proteínas></Resultados>', 'Valores dentro de rango'),
(5, 5, '2022-05-25 12:00:00', '<Resultados><Glucosa>110 mg/dL</Glucosa></Resultados>', 'Ligeramente elevado');
GO

INSERT INTO Factura.Facturas (PacienteID, FechaFactura, TotalFactura, EstadoPago, Detalles)
VALUES
(1, '2022-01-16 13:00:00', 1000.00, 'Pagado', NULL),
(2, '2022-02-24 17:00:00', 1500.00, 'Pendiente', NULL),
(3, '2022-03-09 15:30:00', 2000.00, 'Pendiente', NULL),
(4, '2022-04-19 11:00:00', 1200.00, 'Pagado', NULL),
(5, '2022-05-26 14:30:00', 2500.00, 'Pendiente', NULL);
GO

INSERT INTO Factura.Pagos (FacturaID, FechaPago, MontoPagado, MetodoPago)
VALUES
(1, '2022-01-16 14:00:00', 1000.00, 'Tarjeta'),
(4, '2022-04-19 12:00:00', 1200.00, 'Efectivo');
GO

SELECT * FROM Usuarios.Usuarios

SELECT * FROM  Medico.vw_MedicosConsultas

SELECT * FROM Paciente.vw_PacientesHospitalizaciones


DECLARE @FechaInicio DATETIME2 = '2022-01-01';
DECLARE @FechaFin DATETIME2 = '2022-12-31';

SELECT * FROM Medico.fn_HonorariosMedicos(@FechaInicio, @FechaFin);
GO

SELECT * FROM Farmacia.fn_StockMedicamentos();
GO

SELECT 
    PacienteID, 
    Nombre + ' ' + Apellido AS NombreCompleto,
    FechaNacimiento,
    Paciente.fn_CalcularEdad(FechaNacimiento) AS Edad
FROM Paciente.Pacientes;
GO

SELECT 
    h.HospitalizacionID,
    p.Nombre + ' ' + p.Apellido AS Paciente,
    h.FechaIngreso,
    h.FechaAlta,
    Hospitalizacion.fn_CostoEstancia(h.HospitalizacionID) AS CostoEstancia
FROM Hospitalizacion.Hospitalizaciones h
INNER JOIN Paciente.Pacientes p ON h.PacienteID = p.PacienteID;
GO

DECLARE @MedicamentoID INT = 1;

SELECT 
    m.NombreMedicamento,
    m.Stock,
    Farmacia.fn_VerificarStock(@MedicamentoID) AS HayStock
FROM Farmacia.Medicamentos m
WHERE m.MedicamentoID = @MedicamentoID;
GO

DECLARE @FacturaID INT = 1;

SELECT 
    f.FacturaID,
    f.TotalFactura,
    Factura.fn_TotalPagado(@FacturaID) AS TotalPagado,
    f.TotalFactura - Factura.fn_TotalPagado(@FacturaID) AS SaldoPendiente
FROM Factura.Facturas f
WHERE f.FacturaID = @FacturaID;
GO

DECLARE @ResultadoID INT = 1;

SELECT 
    r.ResultadoID,
    e.NombreExamen,
    p.Nombre + ' ' + p.Apellido AS Paciente,
    Laboratorio.fn_ObtenerResultados(@ResultadoID) AS Resultados,
    r.Observaciones
FROM Laboratorio.Resultados r
INNER JOIN Laboratorio.Examenes e ON r.ExamenID = e.ExamenID
INNER JOIN Paciente.Pacientes p ON r.PacienteID = p.PacienteID
WHERE r.ResultadoID = @ResultadoID;
GO

EXEC Hospitalizacion.sp_RegistrarHospitalizacion 
    @PacienteID = 4, 
    @HabitacionID = 4,
    @FechaIngreso = '2022-06-01 10:00:00',
    @Diagnostico = 'Neumonía';
GO

SELECT * FROM Hospitalizacion.Hospitalizaciones WHERE PacienteID = 4;
GO

SELECT HabitacionID, Disponible FROM Hospitalizacion.Habitaciones WHERE HabitacionID = 4;
GO

SELECT HospitalizacionID FROM Hospitalizacion.Hospitalizaciones
WHERE PacienteID = 4 AND Estado = 'Activo';
GO

EXEC Hospitalizacion.sp_DarAltaHospitalizacion 
    @HospitalizacionID = 4,
    @FechaAlta = '2022-06-10 09:00:00';
GO

SELECT * FROM Hospitalizacion.Hospitalizaciones WHERE HospitalizacionID = 4;
GO

SELECT HabitacionID, Disponible FROM Hospitalizacion.Habitaciones WHERE HabitacionID = 4;
GO

EXEC Factura.sp_GenerarFacturaHospitalizacion 
    @HospitalizacionID = 4;
GO

SELECT * FROM Factura.Facturas WHERE PacienteID = 4 ORDER BY FechaFactura DESC;
GO

SELECT 
    f.FacturaID,
    f.TotalFactura,
    Factura.fn_TotalPagado(f.FacturaID) AS TotalPagado,
    f.TotalFactura - Factura.fn_TotalPagado(f.FacturaID) AS SaldoPendiente
FROM Factura.Facturas f
WHERE f.PacienteID = 4;
GO