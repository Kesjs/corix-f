import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Column {
  key: string
  label: string
}

interface DataTableProps {
  columns: Column[]
  data: any[]
}

export default function DataTable({ columns, data }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key} className="font-semibold">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-secondary/50">
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Aucune donnée disponible</p>
        </div>
      )}
    </div>
  )
}