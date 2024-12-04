import React, { useState, useEffect } from "react";
import { ButtonGroup, Container, Header, TableContainer } from "./styled";
import { Button, Table } from "../../../components/ui";
import { Loader2, FileDown, Printer } from "lucide-react";
import * as XLSX from "xlsx";
import { getStockMedicamentos } from "../../../lib/api";

interface Medicamento {
  MedicamentoID: number;
  NombreMedicamento: string;
  Stock: number;
  Precio: number;
  NombreProveedor: string | null;
}

export const ReporteInventarioMedicamentos = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const data = await getStockMedicamentos();
        setMedicamentos(data);
      } catch (err) {
        console.error("Error al cargar los medicamentos:", err);
        setError("Hubo un error al cargar los medicamentos.");
      } finally {
        setLoading(false);
      }
    };
    fetchMedicamentos();
  }, []);

  const exportToPDF = () => {
    const pdfWindow = window.open("", "_blank");
    if (pdfWindow) {
      pdfWindow.document.write("<html><head><title>Inventario de Medicamentos</title></head><body>");
      pdfWindow.document.write("<h1>Inventario de Medicamentos</h1>");
      pdfWindow.document.write("<table border='1' style='width: 100%; border-collapse: collapse;'>");
      pdfWindow.document.write("<tr><th>Nombre del Medicamento</th><th>Stock Disponible</th><th>Precio</th><th>Proveedor</th></tr>");
      medicamentos.forEach((item) => {
        pdfWindow.document.write(
          `<tr><td>${item.NombreMedicamento}</td><td>${item.Stock}</td><td>$${item.Precio.toFixed(2)}</td><td>${item.NombreProveedor || "Sin Proveedor"}</td></tr>`
        );
      });
      pdfWindow.document.write("</table>");
      pdfWindow.document.write("</body></html>");
      pdfWindow.document.close();
      pdfWindow.print();
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      medicamentos.map((item) => ({
        NombreMedicamento: item.NombreMedicamento,
        Stock: item.Stock,
        Precio: `$${item.Precio.toFixed(2)}`,
        Proveedor: item.NombreProveedor || "Sin Proveedor",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventario");
    XLSX.writeFile(workbook, "inventario-medicamentos.xlsx");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write("<html><head><title>Inventario de Medicamentos</title></head><body>");
      printWindow.document.write("<h1>Inventario de Medicamentos</h1>");
      printWindow.document.write("<table border='1' style='width: 100%; border-collapse: collapse;'>");
      printWindow.document.write("<tr><th>Nombre del Medicamento</th><th>Stock Disponible</th><th>Precio</th><th>Proveedor</th></tr>");
      medicamentos.forEach((item) => {
        printWindow.document.write(
          `<tr><td>${item.NombreMedicamento}</td><td>${item.Stock}</td><td>$${item.Precio.toFixed(2)}</td><td>${item.NombreProveedor || "Sin Proveedor"}</td></tr>`
        );
      });
      printWindow.document.write("</table>");
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>Cargando...</Header>
        <Loader2 className="animate-spin" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>Error</Header>
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Header>Reporte de Inventario de Medicamentos</Header>
      <ButtonGroup>
        <Button onClick={exportToPDF}>
          <FileDown className="mr-2 h-4 w-4" />
          Exportar a PDF
        </Button>
        <Button onClick={exportToExcel}>
          <FileDown className="mr-2 h-4 w-4" />
          Exportar a Excel
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Imprimir
        </Button>
      </ButtonGroup>
      <TableContainer>
        <Table
          columnas={[
            { header: "Nombre del Medicamento", accessorKey: "NombreMedicamento" },
            { header: "Stock Disponible", accessorKey: "Stock" },
            { header: "Precio", accessorKey: "Precio" },
            { header: "Proveedor", accessorKey: "NombreProveedor" },
          ]}
          datos={medicamentos.map((item) => ({
            NombreMedicamento: item.NombreMedicamento,
            Stock: item.Stock,
            Precio: `$${item.Precio.toFixed(2)}`,
            NombreProveedor: item.NombreProveedor || "Sin Proveedor",
          }))}
        />
      </TableContainer>
    </Container>
  );
};
