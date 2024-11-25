import { ColumnDef } from "@tanstack/react-table";

export interface PropsTabla {
  columnas: ColumnDef<any>[];
  datos: any[];
}
