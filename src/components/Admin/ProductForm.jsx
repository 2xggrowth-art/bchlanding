import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { AdminAPI } from '../../utils/auth-api';

export default function ProductForm({ product, categories = [], onClose }) {
  const isEditing = !!product;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    id: product?.id || '',
    name: product?.name || '',
    category: product?.category || 'kids',
    price: product?.price || 0,
    mrp: product?.mrp || 0,
    image: product?.image || '',
    badge: product?.badge || '',
    shortDescription: product?.shortDescription || '',
    specs: product?.specs || {},
    stock: product?.stock || { quantity: 0, status: 'out_of_stock' },
    sizeGuide: product?.sizeGuide || null,
    warranty: product?.warranty || null,
    accessories: product?.accessories || []
  });

  const { getIdToken } = useAuth();
  const adminAPI = new AdminAPI(getIdToken);

  // Update stock status based on quantity
  useEffect(() => {
    const quantity = formData.stock.quantity;
    let status = 'out_of_stock';
    if (quantity > 10) status = 'in_stock';
    else if (quantity > 0) status = 'low_stock';

    setFormData(prev => ({
      ...prev,
      stock: { ...prev.stock, status }
    }));
  }, [formData.stock.quantity]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [field]: value }
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await adminAPI.uploadProductImage(file);
      handleChange('image', imageUrl);
    } catch (error) {
      setError('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.category || !formData.price || !formData.mrp || !formData.image) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.price > formData.mrp) {
        throw new Error('Price cannot be greater than MRP');
      }

      let response;
      if (isEditing) {
        response = await adminAPI.updateProduct(formData.id, formData);
      } else {
        response = await adminAPI.createProduct(formData);
      }

      if (response.success) {
        onClose();
      }
    } catch (error) {
      setError(error.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'specs', label: 'Specifications', icon: '⚙️' },
    { id: 'stock', label: 'Stock & Pricing', icon: '📦' },
    { id: 'additional', label: 'Additional', icon: '➕' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[20px] w-full max-w-4xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="font-display text-2xl text-dark uppercase tracking-wide">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-[20px] flex items-center gap-3">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Tabs */}
          <div className="flex border-b border-gray-200 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-bold text-sm uppercase tracking-wider transition-all border-b-2 ${activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-text hover:text-dark'
                  }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g., Sparrow 12T Kids Cycle"
                    className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                    required
                  />
                </div>

                {isEditing && (
                  <div>
                    <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                      Product ID (Read-only)
                    </label>
                    <input
                      type="text"
                      value={formData.id}
                      disabled
                      className="w-full px-4 py-2 rounded-full border-2 border-dark/10 bg-gray-50 text-sm font-medium"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                    Product Image <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {/* Image Preview */}
                    {formData.image && (
                      <div className="relative w-full h-48 rounded-[20px] overflow-hidden bg-gray-100">
                        <img
                          src={formData.image}
                          alt="Product preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Image URL Input */}
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => handleChange('image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                    />

                    {/* File Upload */}
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="image-upload"
                        className={`flex-1 px-4 py-2 rounded-full border-2 border-dark/10 text-center text-sm font-bold text-dark cursor-pointer hover:bg-gray-50 transition-all ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                      >
                        {uploading ? 'Uploading...' : '📤 Upload Image'}
                      </label>
                    </div>
                    <p className="text-xs text-gray-text">
                      Paste an image URL or upload a file (max 5MB, JPG/PNG/WebP)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                    Badge (Optional)
                  </label>
                  <select
                    value={formData.badge || ''}
                    onChange={(e) => handleChange('badge', e.target.value || null)}
                    className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                  >
                    <option value="">No Badge</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Top Pick">Top Pick</option>
                    <option value="Value Pick">Value Pick</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                    Short Description
                  </label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => handleChange('shortDescription', e.target.value)}
                    placeholder="Brief description of the product..."
                    rows={3}
                    className="w-full px-4 py-2 rounded-[20px] border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium resize-none"
                  />
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-text mb-4">
                  Add technical specifications for this product. Fields vary by category.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                      Wheel Size
                    </label>
                    <input
                      type="text"
                      value={formData.specs.wheelSize || ''}
                      onChange={(e) => handleSpecChange('wheelSize', e.target.value)}
                      placeholder='e.g., 26"'
                      className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                      Frame Type
                    </label>
                    <input
                      type="text"
                      value={formData.specs.frameType || ''}
                      onChange={(e) => handleSpecChange('frameType', e.target.value)}
                      placeholder="e.g., Steel, Alloy"
                      className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                      Gear Count
                    </label>
                    <input
                      type="text"
                      value={formData.specs.gearCount || ''}
                      onChange={(e) => handleSpecChange('gearCount', e.target.value)}
                      placeholder="e.g., 21 Speed, Single Speed"
                      className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                      Brake Type
                    </label>
                    <input
                      type="text"
                      value={formData.specs.brakeType || ''}
                      onChange={(e) => handleSpecChange('brakeType', e.target.value)}
                      placeholder="e.g., Disc, V-Brake"
                      className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                      Weight
                    </label>
                    <input
                      type="text"
                      value={formData.specs.weight || ''}
                      onChange={(e) => handleSpecChange('weight', e.target.value)}
                      placeholder="e.g., 15 kg"
                      className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                    />
                  </div>

                  {formData.category === 'kids' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                        Age Range
                      </label>
                      <input
                        type="text"
                        value={formData.specs.ageRange || ''}
                        onChange={(e) => handleSpecChange('ageRange', e.target.value)}
                        placeholder="e.g., 5-8 years"
                        className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                      />
                    </div>
                  )}

                  {formData.category === 'electric' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                          Motor
                        </label>
                        <input
                          type="text"
                          value={formData.specs.motor || ''}
                          onChange={(e) => handleSpecChange('motor', e.target.value)}
                          placeholder="e.g., 250W Hub Motor"
                          className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                          Battery
                        </label>
                        <input
                          type="text"
                          value={formData.specs.battery || ''}
                          onChange={(e) => handleSpecChange('battery', e.target.value)}
                          placeholder="e.g., 36V 10Ah Li-ion"
                          className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                          Range
                        </label>
                        <input
                          type="text"
                          value={formData.specs.range || ''}
                          onChange={(e) => handleSpecChange('range', e.target.value)}
                          placeholder="e.g., 35-40 km"
                          className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Stock & Pricing Tab */}
            {activeTab === 'stock' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleChange('price', parseInt(e.target.value) || 0)}
                      placeholder="9999"
                      min="0"
                      className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                      MRP (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.mrp}
                      onChange={(e) => handleChange('mrp', parseInt(e.target.value) || 0)}
                      placeholder="14999"
                      min="0"
                      className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {formData.mrp > 0 && formData.price > 0 && (
                  <div className="p-4 bg-primary/5 rounded-[20px] border border-primary/20">
                    <p className="text-sm font-bold text-primary">
                      Discount: {Math.round((1 - formData.price / formData.mrp) * 100)}% OFF
                    </p>
                    <p className="text-xs text-gray-text mt-1">
                      Savings: ₹{(formData.mrp - formData.price).toLocaleString()}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stock.quantity}
                    onChange={(e) => handleChange('stock', {
                      ...formData.stock,
                      quantity: parseInt(e.target.value) || 0
                    })}
                    placeholder="10"
                    min="0"
                    className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
                  />
                  <p className="text-xs text-gray-text mt-2">
                    Stock Status: <span className="font-bold">{formData.stock.status.replace('_', ' ').toUpperCase()}</span>
                    <br />
                    • 0 = Out of Stock
                    <br />
                    • 1-10 = Low Stock
                    <br />
                    • 11+ = In Stock
                  </p>
                </div>
              </div>
            )}

            {/* Additional Tab */}
            {activeTab === 'additional' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-text">
                  Size guide, warranty, and accessories are optional. You can add them later.
                </p>

                <div className="p-4 bg-gray-50 rounded-[20px]">
                  <p className="text-sm font-bold text-dark mb-2">🚧 Advanced Features</p>
                  <ul className="text-xs text-gray-text space-y-1">
                    <li>• Size Guide: Add sizing chart and fit tips</li>
                    <li>• Warranty: Define warranty coverage and terms</li>
                    <li>• Accessories: Link compatible accessories</li>
                  </ul>
                  <p className="text-xs text-gray-text mt-3">
                    These can be configured by editing the product after creation.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-full border-2 border-dark/10 text-dark hover:bg-gray-50 transition-all duration-300 font-bold text-sm uppercase tracking-wide disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-bold text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
