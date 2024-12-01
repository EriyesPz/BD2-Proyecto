import React, { useState } from 'react';
import styled from "styled-components";
import { Button, Table, Label } from "../../../components/ui";
import { Loader2, FileDown, Printer } from "lucide-react";
import * as XLSX from "xlsx";

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const TableContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

interface Medicamento {
  nombre: string;
  stock: number;
  precio: number;
  proveedor: string;
}

export const ReporteInventarioMedicamentos = () => {
  const [medicamentos] = useState<Medicamento[]>([
    { nombre: "Paracetamol", stock: 100, precio: 5.0, proveedor: "Proveedor A" },
    { nombre: "Ibuprofeno", stock: 50, precio: 7.5, proveedor: "Proveedor B" },
    { nombre: "Amoxicilina", stock: 30, precio: 10.0, proveedor: "Proveedor C" },
  ]);

  const exportToPDF = () => {
    const pdfWindow = window.open("", "_blank");
    if (pdfWindow) {
      pdfWindow.document.write("<html><head><title>Inventario de Medicamentos</title></head><body>");
      pdfWindow.document.write("<h1>Inventario de Medicamentos</h1>");
      pdfWindow.document.write("<table border='1' style='width: 100%; border-collapse: collapse;'>");
      pdfWindow.document.write("<tr><th>Nombre del Medicamento</th><th>Stock Disponible</th><th>Precio</th><th>Proveedor</th></tr>");
      medicamentos.forEach((item) => {
        pdfWindow.document.write(
          `<tr><td>${item.nombre}</td><td>${item.stock}</td><td>$${item.precio.toFixed(2)}</td><td>${item.proveedor}</td></tr>`
        );
      });
      pdfWindow.document.write("</table>");
      pdfWindow.document.write("</body></html>");
      pdfWindow.document.close();
      pdfWindow.print();
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(medicamentos);
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
          `<tr><td>${item.nombre}</td><td>${item.stock}</td><td>$${item.precio.toFixed(2)}</td><td>${item.proveedor}</td></tr>`
        );
      });
      printWindow.document.write("</table>");
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

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
            { header: "Nombre del Medicamento", accessorKey: "nombre" },
            { header: "Stock Disponible", accessorKey: "stock" },
            { header: "Precio", accessorKey: "precio" },
            { header: "Proveedor", accessorKey: "proveedor" },
          ]}
          datos={medicamentos.map((item) => ({
            nombre: item.nombre,
            stock: item.stock,
            precio: `$${item.precio.toFixed(2)}`,
            proveedor: item.proveedor,
          }))}
        />
      </TableContainer>
    </Container>
  );
};
