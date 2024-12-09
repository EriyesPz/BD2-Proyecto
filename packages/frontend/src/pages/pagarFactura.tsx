import React, { useState, useEffect } from "react";
import { pagarFactura, getFactura } from "../lib";
import { useNavigate, useLocation } from "react-router-dom";

interface Factura {
  FacturaID: string;
  PacienteID: string;
  PacienteNombreCompleto: string;
  PacienteTelefono: string;
  PacienteEmail: string;
  PacienteDireccion: string;
  PacienteSeguroSocial: string;
  FechaFactura: string;
  TotalFactura: number;
  EstadoPago: "Pagado" | "Pendiente" | "Anulado";
  Servicio: string;
  Descripcion: string;
  Cantidad: number;
  PrecioUnitario: number;
  TotalServicio: number;
}

const PagarFacturaPage: React.FC = () => {
  const [facturaID, setFacturaID] = useState("");
  const [montoPagado, setMontoPagado] = useState<number>(0);
  const [metodoPago, setMetodoPago] = useState<string>("Efectivo");
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("facturaID");
    if (id) {
      setFacturaID(id);
      const fetchFactura = async () => {
        try {
          const data: Factura = await getFactura(id);
          setMontoPagado(data.TotalFactura);
          setCargando(false);
        } catch (error) {
          console.error("Error al obtener factura:", error);
          alert("No se pudo obtener la factura. Por favor, inténtalo más tarde.");
          navigate("/facturas");
        }
      };
      fetchFactura();
    } else {
      alert("No se proporcionó facturaID en la URL.");
      navigate("/facturas");
    }
  }, [location.search, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!facturaID || montoPagado === 0 || !metodoPago) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const pagoData = {
      facturaID,
      montoPagado,
      metodoPago,
    };

    try {
      await pagarFactura(pagoData);
      alert("Factura pagada exitosamente.");
      navigate("/facturas");
    } catch (error) {
      console.error("Error al pagar factura:", error);
      alert("Ocurrió un error al procesar el pago de la factura.");
    }
  };

  // Estilos
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const labelStyle: React.CSSProperties = {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    fontSize: "14px",
  };

  const labelSpanStyle: React.CSSProperties = {
    marginBottom: "4px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: "#fff",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 14px",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    fontSize: "14px",
  };

  if (cargando) {
    return (
      <div style={containerStyle}>
        Cargando información de la factura...
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Pagar Factura</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          <span style={labelSpanStyle}>FacturaID*:</span>
          <input
            type="text"
            value={facturaID}
            readOnly
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Monto a Pagar (Total Factura)*:</span>
          <input
            type="number"
            step="0.01"
            value={montoPagado}
            readOnly
            style={inputStyle}
            title="Debe pagar el monto total de la factura"
          />
        </label>

        <label style={labelStyle}>
          <span style={labelSpanStyle}>Método de Pago*:</span>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            style={selectStyle}
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </label>

        <button type="submit" style={buttonStyle}>
          Pagar
        </button>
      </form>
    </div>
  );
};

export { PagarFacturaPage };
