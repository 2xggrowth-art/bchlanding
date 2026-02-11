import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit3,
  Check,
  X,
  MoreVertical,
  Package,
  PackageCheck,
  PackageX
} from 'lucide-react';

/**
 * Excel-like Data Grid for Product Management
 * Features: Inline editing, sorting, filtering, bulk actions
 */
export default function ProductDataGrid({
  products,
  categories,
  onEdit,
  onDelete,
  onBulkDelete,
  onUpdateProduct,
  loading
}) {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Define columns
  const columns = useMemo(
    () => [
      // Checkbox column for bulk selection
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
          />
        ),
        size: 40,
      },
      // Name column
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting()}
              className="flex items-center gap-2 hover:text-primary transition-colors font-bold"
            >
              Name
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-40" />
              )}
            </button>
          );
        },
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium text-dark">{row.original.name}</span>
            <span className="text-xs text-gray-text">ID: {row.original.id}</span>
          </div>
        ),
        size: 250,
      },
      // Image column
      {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-12 h-12 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
            }}
          />
        ),
        size: 80,
        enableSorting: false,
      },
      // Category column
      {
        accessorKey: 'category',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting()}
              className="flex items-center gap-2 hover:text-primary transition-colors font-bold"
            >
              Category
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-40" />
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          const category = categories.find(c => c.slug === row.original.category);
          return (
            <div className="flex flex-col gap-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium w-fit">
                {category?.name || row.original.category}
              </span>
              {row.original.subCategory && (
                <span className="text-[10px] text-gray-text uppercase tracking-wider pl-1">
                  {row.original.subCategory}
                </span>
              )}
            </div>
          );
        },
        size: 150,
      },
      // Colors column
      {
        id: 'colors',
        header: 'Colors',
        cell: ({ row }) => {
          const colors = row.original.colors || [];
          if (colors.length === 0) return <span className="text-xs text-gray-text">—</span>;
          return (
            <div className="flex items-center gap-1 flex-wrap">
              {colors.slice(0, 5).map((c, i) => (
                <span
                  key={i}
                  title={`${c.name}${c.inStock === false ? ' (Out of stock)' : ''}`}
                  className="w-5 h-5 rounded-full border border-gray-300 shrink-0"
                  style={{
                    background: c.hex?.startsWith('linear') ? c.hex : c.hex || '#ccc',
                    opacity: c.inStock === false ? 0.4 : 1,
                  }}
                />
              ))}
              {colors.length > 5 && (
                <span className="text-[10px] text-gray-text font-bold">+{colors.length - 5}</span>
              )}
            </div>
          );
        },
        size: 120,
        enableSorting: false,
      },
      // Price column (inline editable)
      {
        accessorKey: 'price',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting()}
              className="flex items-center gap-2 hover:text-primary transition-colors font-bold"
            >
              Price (₹)
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-40" />
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          const isEditing = editingCell === `${row.id}-price`;

          if (isEditing) {
            return (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(row.original, 'price');
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  className="w-24 px-2 py-1 border-2 border-primary rounded text-sm focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveEdit(row.original, 'price')}
                  className="p-1 hover:bg-green-100 rounded text-green-600"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1 hover:bg-red-100 rounded text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          }

          return (
            <div
              onDoubleClick={() => handleStartEdit(`${row.id}-price`, row.original.price)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded group"
              title="Double-click to edit"
            >
              <span className="font-bold text-primary">₹{row.original.price.toLocaleString()}</span>
              <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
            </div>
          );
        },
        size: 130,
      },
      // MRP column
      {
        accessorKey: 'mrp',
        header: 'MRP (₹)',
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-sm text-gray-text line-through">₹{row.original.mrp.toLocaleString()}</span>
            <span className="text-xs font-bold text-green-600">
              {Math.round((1 - row.original.price / row.original.mrp) * 100)}% OFF
            </span>
          </div>
        ),
        size: 120,
      },
      // Stock column (inline editable, supports both stock object and inStock boolean)
      {
        accessorKey: 'stock.quantity',
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting()}
              className="flex items-center gap-2 hover:text-primary transition-colors font-bold"
            >
              Stock
              {column.getIsSorted() === 'asc' ? (
                <ArrowUp className="w-4 h-4" />
              ) : column.getIsSorted() === 'desc' ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUpDown className="w-4 h-4 opacity-40" />
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          const product = row.original;
          const stock = product.stock;
          const hasStockObj = stock && typeof stock.quantity === 'number';

          // For products with only inStock boolean (e.g. EMotorad API data)
          if (!hasStockObj) {
            const isInStock = product.inStock !== false;
            return (
              <div className="px-2 py-1">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                  isInStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isInStock ? <PackageCheck className="w-3 h-3" /> : <PackageX className="w-3 h-3" />}
                  <span>{isInStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
              </div>
            );
          }

          // For products with full stock object (editable)
          const isEditing = editingCell === `${row.id}-stock`;

          if (isEditing) {
            return (
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit(row.original, 'stock');
                    if (e.key === 'Escape') handleCancelEdit();
                  }}
                  className="w-20 px-2 py-1 border-2 border-primary rounded text-sm focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveEdit(row.original, 'stock')}
                  className="p-1 hover:bg-green-100 rounded text-green-600"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1 hover:bg-red-100 rounded text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          }

          const statusConfig = {
            in_stock: { color: 'bg-green-100 text-green-800', icon: PackageCheck },
            low_stock: { color: 'bg-yellow-100 text-yellow-800', icon: Package },
            out_of_stock: { color: 'bg-red-100 text-red-800', icon: PackageX },
          };

          const config = statusConfig[stock.status] || statusConfig.out_of_stock;
          const Icon = config.icon;

          return (
            <div
              onDoubleClick={() => handleStartEdit(`${row.id}-stock`, stock.quantity)}
              className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded group"
              title="Double-click to edit"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
                <Icon className="w-3 h-3" />
                <span>{stock.quantity}</span>
              </div>
              <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity inline ml-2" />
            </div>
          );
        },
        size: 150,
      },
      // Actions column
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(row.original)}
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
              title="Edit Product"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(row.original.id, row.original.name)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
              title="Delete Product"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
        size: 100,
        enableSorting: false,
      },
    ],
    [editingCell, editValue, categories, onEdit, onDelete]
  );

  // Handle inline edit start
  const handleStartEdit = (cellId, currentValue) => {
    setEditingCell(cellId);
    setEditValue(currentValue.toString());
  };

  // Handle inline edit save
  const handleSaveEdit = async (product, field) => {
    try {
      const newValue = parseFloat(editValue);
      if (isNaN(newValue) || newValue < 0) {
        alert('Please enter a valid positive number');
        return;
      }

      if (field === 'price') {
        await onUpdateProduct(product.id, { price: newValue });
      } else if (field === 'stock') {
        // Auto-calculate stock status
        let status = 'out_of_stock';
        if (newValue > 10) status = 'in_stock';
        else if (newValue > 0) status = 'low_stock';

        await onUpdateProduct(product.id, {
          stock: {
            ...product.stock,
            quantity: Math.floor(newValue),
            status
          }
        });
      }

      setEditingCell(null);
      setEditValue('');
    } catch (error) {
      console.error('Failed to update:', error);
      alert('Failed to update. Please try again.');
    }
  };

  // Handle inline edit cancel
  const handleCancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  // Initialize table
  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
  });

  // Get selected rows
  const selectedRows = table.getSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;

  // Handle bulk delete
  const handleBulkDelete = () => {
    const selectedIds = selectedRows.map(row => row.original.id);
    const selectedNames = selectedRows.map(row => row.original.name).join(', ');

    if (window.confirm(`Delete ${selectedRows.length} products?\n\n${selectedNames}`)) {
      onBulkDelete(selectedIds);
      setRowSelection({});
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center bg-white rounded-[20px]">
        <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-text font-medium">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-200">
      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {hasSelection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border-b border-blue-200 px-6 py-3 flex items-center justify-between"
          >
            <span className="text-sm font-bold text-blue-900">
              {selectedRows.length} product{selectedRows.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRowSelection({})}
                className="px-4 py-2 rounded-full border-2 border-blue-300 text-blue-700 hover:bg-blue-100 transition-all duration-300 font-bold text-sm uppercase tracking-wide"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all duration-300 font-bold text-sm uppercase tracking-wide"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Data Grid */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="px-4 py-3 text-left text-xs font-bold text-gray-text uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-text font-medium">No products found</p>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`hover:bg-gray-50 transition-colors ${row.getIsSelected() ? 'bg-blue-50' : ''
                    }`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-dark"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with row count */}
      <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between text-sm text-gray-text">
        <span>
          Showing {table.getRowModel().rows.length} of {products.length} products
        </span>
        <span>
          {hasSelection && `${selectedRows.length} selected`}
        </span>
      </div>
    </div>
  );
}
