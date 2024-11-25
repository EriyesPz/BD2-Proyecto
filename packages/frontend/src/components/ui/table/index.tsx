import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  ContenedorTabla,
  TablaEstilizada,
  EncabezadoTabla,
  FilaTabla,
  CeldaTabla,
  ContenedorPaginacion,
  BotonPaginacion,
} from "./styled";
import { PropsTabla } from "./types";

const Table: React.FC<PropsTabla> = ({ columnas, datos }) => {
  const table = useReactTable({
    data: datos,
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <ContenedorTabla>
      <TablaEstilizada>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <FilaTabla key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <EncabezadoTabla key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : typeof header.column.columnDef.header === "function"
                    ? (header.column.columnDef.header as Function)(header.getContext())
                    : header.column.columnDef.header}
                </EncabezadoTabla>
              ))}
            </FilaTabla>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <FilaTabla key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <CeldaTabla key={cell.id}>
                    {cell.renderValue() !== undefined ? String(cell.renderValue()) : null}
                  </CeldaTabla>
                ))}
              </FilaTabla>
            ))
          ) : (
            <FilaTabla>
              <CeldaTabla colSpan={columnas.length} style={{ textAlign: "center" }}>
                No se encontraron resultados.
              </CeldaTabla>
            </FilaTabla>
          )}
        </tbody>
      </TablaEstilizada>
      <ContenedorPaginacion>
        <BotonPaginacion
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </BotonPaginacion>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <BotonPaginacion
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </BotonPaginacion>
      </ContenedorPaginacion>
    </ContenedorTabla>
  );
};

export { Table };
