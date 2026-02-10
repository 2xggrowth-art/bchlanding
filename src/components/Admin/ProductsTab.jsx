import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { AdminAPI } from '../../utils/auth-api';
import { LayoutGrid, Table } from 'lucide-react';
import ProductForm from './ProductForm';
import CategoryManager from './CategoryManager';
import ProductDataGrid from './ProductDataGrid';
import { categories as localCategories, products as localProducts } from '../../data/products';

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingExcel, setUploadingExcel] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'grid' or 'table'
  const fileInputRef = useRef(null);
  const [filters, setFilters] = useState({
    category: 'all',
    subCategory: 'all',
    status: 'all',
    search: ''
  });

  const { getIdToken } = useAuth();
  const adminAPI = new AdminAPI(getIdToken);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success && data.data?.length > 0) {
        setCategories(data.data);
      } else {
        // Fallback to local categories
        setCategories(localCategories);
      }
    } catch (error) {
      console.error('❌ Error fetching categories, using local fallback:', error);
      setCategories(localCategories);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const filterParams = {};
      if (filters.category !== 'all') filterParams.category = filters.category;
      if (filters.subCategory !== 'all') filterParams.subCategory = filters.subCategory;
      if (filters.status !== 'all') filterParams.status = filters.status;

      let filteredProducts = [];

      try {
        const response = await adminAPI.getProducts(filterParams);
        if (response.success && response.products?.length > 0) {
          filteredProducts = response.products;
        } else {
          // Fallback to local products
          filteredProducts = getLocalFilteredProducts();
        }
      } catch {
        // API failed, use local products
        filteredProducts = getLocalFilteredProducts();
      }

      // Client-side subcategory filter (API doesn't support it)
      if (filters.subCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.subCategory === filters.subCategory);
      }

      // Client-side search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.id.toLowerCase().includes(searchLower)
        );
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      setError(error.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Get filtered products from local data
  const getLocalFilteredProducts = () => {
    let result = [...localProducts];
    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters.subCategory !== 'all') {
      result = result.filter(p => p.subCategory === filters.subCategory);
    }
    return result;
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setLoading(true);
      const response = await adminAPI.deleteProduct(productId);
      if (response.success) {
        await fetchProducts();
        console.log(`✅ Product deleted: ${productId}`);
      }
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      setError(error.message || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleExcelUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv' // .csv
    ];

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload an Excel file (.xlsx, .xls, or .csv)');
      return;
    }

    try {
      setUploadingExcel(true);
      setError(null);
      setSuccess(null);

      const formData = new FormData();
      formData.append('file', file);

      const token = await getIdToken();
      const response = await fetch('/api/products/import-excel', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`✅ Successfully imported ${data.data.created} products!`);
        if (data.data.failed > 0) {
          setError(`⚠️ ${data.data.failed} products failed to import. Check console for details.`);
          console.error('Failed imports:', data.data.errors);
        }
        fetchProducts();
      } else {
        throw new Error(data.error || 'Failed to import Excel file');
      }
    } catch (error) {
      console.error('❌ Excel upload error:', error);
      setError(error.message || 'Failed to upload Excel file');
    } finally {
      setUploadingExcel(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Handle inline product update (for DataGrid)
  const handleUpdateProduct = async (productId, updates) => {
    try {
      const response = await adminAPI.updateProduct(productId, updates);
      if (response.success) {
        setSuccess('Product updated successfully!');
        await fetchProducts();
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      console.error('❌ Error updating product:', error);
      setError(error.message || 'Failed to update product');
    }
  };

  // Handle bulk delete (for DataGrid)
  const handleBulkDelete = async (productIds) => {
    try {
      setLoading(true);
      setError(null);

      // Delete products one by one
      const deletePromises = productIds.map(id => adminAPI.deleteProduct(id));
      await Promise.all(deletePromises);

      setSuccess(`Successfully deleted ${productIds.length} products!`);
      await fetchProducts();
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('❌ Error bulk deleting products:', error);
      setError(error.message || 'Failed to delete products');
    } finally {
      setLoading(false);
    }
  };

  const getStockBadge = (stock) => {
    if (!stock) return { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };

    switch (stock.status) {
      case 'in_stock':
        return { color: 'bg-green-100 text-green-800', label: `In Stock (${stock.quantity})` };
      case 'low_stock':
        return { color: 'bg-yellow-100 text-yellow-800', label: `Low Stock (${stock.quantity})` };
      case 'out_of_stock':
        return { color: 'bg-red-100 text-red-800', label: 'Out of Stock' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: stock.status };
    }
  };

  return (
    <div>
      {/* Header with Action Buttons */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl text-dark uppercase tracking-wide">Product Management</h2>
          <p className="text-sm text-gray-text mt-1">Add, edit, and manage your bicycle catalog</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleExcelUpload}
            className="hidden"
          />

          {/* Import Excel Button */}
          <button
            onClick={handleImportClick}
            disabled={uploadingExcel}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-600 text-white hover:bg-green-700 transition-all duration-300 font-bold text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadingExcel ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Import Excel
              </>
            )}
          </button>

          {/* Add Category Button */}
          <button
            onClick={() => setShowCategoryManager(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-dark text-white hover:bg-dark/90 transition-all duration-300 font-bold text-sm uppercase tracking-wide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Category
          </button>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-bold text-sm uppercase tracking-wide ${viewMode === 'table'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-text hover:text-dark'
                }`}
            >
              <Table className="w-4 h-4" />
              Table
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-bold text-sm uppercase tracking-wide ${viewMode === 'grid'
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-text hover:text-dark'
                }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Grid
            </button>
          </div>

          {/* Add Product Button */}
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-bold text-sm uppercase tracking-wide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-[20px] flex items-center gap-3"
        >
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="font-bold text-green-800">Success</p>
            <p className="text-sm text-green-600">{success}</p>
          </div>
          <button onClick={() => setSuccess(null)} className="text-green-600 hover:text-green-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[20px] flex items-center gap-3"
        >
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="font-bold text-red-800">Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-[20px] p-6 mb-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value, subCategory: 'all' })}
              className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Sub Category Filter - only shows when selected category has subcategories */}
          <div>
            <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
              Sub Category
            </label>
            {(() => {
              const selectedCat = localCategories.find(c => c.slug === filters.category);
              const subCats = selectedCat?.subCategories || [];
              return (
                <select
                  value={filters.subCategory}
                  onChange={(e) => setFilters({ ...filters, subCategory: e.target.value })}
                  disabled={subCats.length === 0}
                  className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="all">{subCats.length > 0 ? 'All Sub Categories' : 'No Sub Categories'}</option>
                  {subCats.map(sub => (
                    <option key={sub.slug} value={sub.slug}>{sub.name}</option>
                  ))}
                </select>
              );
            })()}
          </div>

          {/* Stock Status Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
              Stock Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* Products Display - Table or Grid View */}
      {viewMode === 'table' ? (
        /* Excel-like Data Grid View */
        <ProductDataGrid
          products={products}
          categories={categories}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onBulkDelete={handleBulkDelete}
          onUpdateProduct={handleUpdateProduct}
          loading={loading && products.length === 0}
        />
      ) : (
        /* Card Grid View */
        <>
          {loading && products.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-[20px]">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-text font-medium">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-[20px]">
              <svg className="w-16 h-16 mx-auto text-gray-text mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-text font-medium">No products found</p>
              <button
                onClick={handleAddProduct}
                className="mt-4 px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-bold text-sm uppercase tracking-wide"
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => {
                const stockBadge = getStockBadge(product.stock);

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.badge && (
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-dark text-sm mb-1">{product.name}</h3>
                          <p className="text-xs text-gray-text uppercase tracking-wide">
                            {categories.find(c => c.slug === product.category)?.name || product.category}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-text line-through">₹{product.mrp.toLocaleString()}</span>
                        <span className="text-xs font-bold text-green-600 ml-auto">
                          {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                        </span>
                      </div>

                      {/* Stock Badge */}
                      <div className="mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${stockBadge.color}`}>
                          {stockBadge.label}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="flex-1 px-4 py-2 rounded-full bg-dark text-white hover:bg-dark/90 transition-all duration-300 font-bold text-xs uppercase tracking-wide"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="px-4 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 transition-all duration-300 font-bold text-xs uppercase tracking-wide"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ProductForm
            product={editingProduct}
            categories={categories}
            onClose={handleFormClose}
          />
        )}
      </AnimatePresence>

      {/* Category Manager Modal */}
      <AnimatePresence>
        {showCategoryManager && (
          <CategoryManager
            onClose={() => {
              setShowCategoryManager(false);
              fetchCategories();
              fetchProducts();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
