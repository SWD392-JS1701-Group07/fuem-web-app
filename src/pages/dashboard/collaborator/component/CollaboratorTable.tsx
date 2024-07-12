import { Collaborator } from "@/constants/models/Collaborator";
import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom";
import { approve, assignTask, reject } from "@/api/collaboratorApi";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

type Props = {
    data: Collaborator[];
}
export const columns: ColumnDef<Collaborator>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "accountId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Collaborator Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("accountId")}</div>
        ),
    },
    {
        accessorKey: "eventName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    EventName
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("eventName")}</div>
        ),
    },
    {
        accessorKey: "task",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Task
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{(row.getValue("task") == null ? "not assign" : row.getValue("task"))}</div>
        ),
    },
    {
        accessorKey: "collabStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("collabStatus")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const collaborator = row.original
            const [isOpen, setIsOpen] = React.useState(false);
            const { toast } = useToast();
            const [state, setState] = React.useState(0);
            const nav = useNavigate();
            const handleUpdateStatus = (mess: string) => {
                if (state === 1) {
                    approve(collaborator.id).then(() => {
                        assignTask(collaborator.eventId, collaborator.accountId, mess).then(() => {
                            toast({
                                title: "Success",
                                description: "Approve collaborator successfully"
                            })
                        }).catch((err) => {
                            console.log(err)
                            toast({
                                title: "Error Task",
                                description: err.message,
                                variant: "destructive"
                            })
                        })
                    }).catch((err) => {
                        console.log(err)
                        toast({
                            title: "Error",
                            description: err.message,
                            variant: "destructive"
                        })
                    })
                } else if (state === 2) {
                    reject(collaborator.id).then(() => {
                        toast({
                            title: "Success",
                            description: "Reject collaborator successfully"
                        })
                    }).catch((err) => {
                        console.log(err)
                        toast({
                            title: "Error",
                            description: err.message,
                            variant: "destructive"
                        })
                    })
                }
            }
            const handleClick = (state: number) => {
                setIsOpen(true)
                setState(state)
            }
            const handleSubmit = (e: any) => {
                e.preventDefault();
                const message = e.target.elements.mess.value;
                handleUpdateStatus(message);
                setIsOpen(false);
            };
            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            {(collaborator.collabStatus === "Pending") ? (<>
                                <DropdownMenuItem
                                    onClick={() => { handleClick(1) }}
                                >Approve</DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => { handleClick(2) }}
                                >Reject</DropdownMenuItem>
                            </>) : (null)}
                            {(collaborator.collabStatus === "Approved") ? (
                                <DropdownMenuItem
                                    onClick={() => { handleClick(2) }}
                                >Reject</DropdownMenuItem>
                            ) : (null)}
                            {(collaborator.collabStatus === "Rejected") ? (<DropdownMenuItem
                                onClick={() => { handleClick(1) }}
                            >Approve</DropdownMenuItem>) : (null)}
                            <DropdownMenuItem onClick={() => { nav(collaborator.id) }}>View</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {(isOpen) ?
                        <div className="fixed inset-0 bg-black bg-opacity-15 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                {state === 1 ? (
                                    <form onSubmit={handleSubmit}>
                                        <h2 className="text-2xl font-bold mb-4">Popup Title</h2>
                                        <div>
                                            <div>Task: </div>
                                            <Input id="mess" placeholder="Enter task" className="mb-4" required />
                                        </div>
                                        <div className="mt-5 flex justify-between">
                                            <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</Button>
                                            <Button onClick={() => setIsOpen(false)} className="">cancel</Button>
                                        </div>

                                    </form>
                                ) : (state === 2) ? (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Warning</h2>
                                        <div>Are you sure you want to reject this collaborator?</div>
                                        <div className="mt-5 flex justify-between">
                                            <Button onClick={() => { handleUpdateStatus(""); setIsOpen(false) }}>yes</Button>
                                            <Button onClick={() => setIsOpen(false)} className="">cancel</Button>
                                        </div>
                                    </div>
                                ) : (null)}
                            </div>
                        </div> :
                        null
                    }
                </>
            )
        },
    },
]
const CollaboratorTable = ({ data }: Props) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })
    console.log("data:" + data)
    console.log(table)
    return (
        <div className="w-full">
            <div className="flex items-center pb-4">
                {/* <div className="flex">
                    <Input
                        placeholder="Filter emails..."
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-2">
                                Filter <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanFilter())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsFiltered()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div> */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border min-h-96">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    //onClick={() => nav(`${row.original.id}`)}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                {/* <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default CollaboratorTable;