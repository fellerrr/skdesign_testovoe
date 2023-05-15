import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel, RowData,
} from '@tanstack/react-table'
import {DataType} from "@/types/types";
import {useEffect, useMemo, useState} from "react";
import {DebouncedInput} from "@/components/DebouncedInput";
import {AddRow} from "@/components/AddRow";
import {useSelector} from "react-redux";
import {selectData} from "@/store/table/tableSelectors";

function App() {
  const dataTable:DataType[] = useSelector(selectData).data
  const [data, setData] = useState(() => [...dataTable])
  useEffect(() => {
    setData([...dataTable]);
  }, [dataTable]);

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedRowData, setSelectedRowData] = useState<DataType | RowData | {}>({})

  const columns = useMemo<ColumnDef<DataType>[]>(
    () => [
      {
        accessorKey: 'id',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: 'email',
        header: () => 'email',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'phone',
        header: () => <span>phone</span>,
        footer: props => props.column.id,
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),

    enableRowSelection: true,

    debugTable: true,
  })
  return (
    <div className="p-2 ">
      <AddRow/>
      <div className='mb-4'>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
      <table className='w-full'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan} >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}

                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 50)
            .map(row => {
              return (
                <tr
                  key={row.id}
                  onClick={() => setSelectedRowData(row.original)}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
      <div className="flex items-center gap-2 w-full justify-center mt-4 text-green-800">
        <button
          className="border-2 border-amber-900 rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border-2 border-amber-800 rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border-2 border-amber-700 rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border-2 border-amber-600 rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border-2 border-amber-500 p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>


      {Object.keys(selectedRowData as object).length > 0  &&<div className='px-10 py-4 w-[800px] flex flex-col bg-amber-100 mt-4'>
        <div>
          <h2 className='mb-2 text-amber-950 font-semibold'>
            Выбран пользователь: {selectedRowData.firstName} {selectedRowData.lastName}
          </h2>
          <p>Описание: {selectedRowData.description}</p>
          <p>Адрес проживания: <span className='text-orange-950 font-semibold'>{selectedRowData.address?.streetAddress}</span></p>
          <p>Город: <span className='text-orange-950 font-semibold'>{selectedRowData.address?.city}</span></p>
          <p>Провинция/штат: <span className='text-orange-950 font-semibold'>{selectedRowData.address?.state}</span></p>
          <p>Индекс: <span className='text-orange-950 font-semibold'>{selectedRowData.address?.zip}</span></p>
        </div>
      </div>}
    </div>
  )
}



export default App

