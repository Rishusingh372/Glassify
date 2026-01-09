import { useEffect, useState } from "react";
import api from "../services/api";
import { updateProduct, createProduct } from "../services/productService";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    gender: '',
    price: 0,
    description: '',
    newImages: []
  });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products", {
        headers: { Authorization: localStorage.getItem("adminToken") }
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('name', editProduct.name || '');
    formData.append('brand', editProduct.brand || '');
    formData.append('gender', editProduct.gender || '');
    formData.append('price', editProduct.price || 0);
    formData.append('description', editProduct.description || '');

    if (editProduct.newImages) {
      editProduct.newImages.forEach(file => {
        formData.append('images', file);
      });
    }

    try {
      await updateProduct(editProduct._id, formData);
      fetchProducts();
      setShowModal(false);
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.response && error.response.data) {
        console.error('Server error details:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.brand || !newProduct.gender || !newProduct.price) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('brand', newProduct.brand);
    formData.append('gender', newProduct.gender);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description || '');

    if (newProduct.newImages && newProduct.newImages.length > 0) {
      newProduct.newImages.forEach(file => {
        formData.append('images', file);
      });
    }

    try {
      await createProduct(formData);
      fetchProducts();
      setShowAddModal(false);
      setNewProduct({
        name: '',
        brand: '',
        gender: '',
        price: 0,
        description: '',
        newImages: []
      });
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCancel = () => {
    setShowAddModal(false);
    setNewProduct({
      name: '',
      brand: '',
      gender: '',
      price: 0,
      description: '',
      newImages: []
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Products</h2>
        <button
          onClick={() => {
            setShowAddModal(true);
            setNewProduct({
              name: '',
              brand: '',
              gender: '',
              price: 0,
              description: '',
              newImages: []
            });
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add Product
        </button>
        <div className="text-sm text-gray-600">
          {products.length} products
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div 
            key={p._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
          >
            {(p.images && p.images.length > 0) && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={p.images[0]?.url} 
                  alt={p.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{p.brand} • {p.gender}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">₹{p.price}</span>
                <button 
                  onClick={() => {
                    setEditProduct(p);
                    setShowModal(true);
                  }}
                  className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Edit Product</h3>
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editProduct?.name || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    value={editProduct?.brand || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, brand: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Brand</option>
                    <option value="RayBan">RayBan</option>
                    <option value="Titan">Titan</option>
                    <option value="Oakley">Oakley</option>
                    <option value="Gucci">Gucci</option>
                    <option value="Prada">Prada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={editProduct?.gender || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, gender: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    value={editProduct?.price || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editProduct?.description || ''}
                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images (optional, multiple)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setEditProduct({ ...editProduct, newImages: files });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditProduct(null);
                    }}
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Add Product</h3>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Brand</option>
                    <option value="RayBan">RayBan</option>
                    <option value="Titan">Titan</option>
                    <option value="Oakley">Oakley</option>
                    <option value="Gucci">Gucci</option>
                    <option value="Prada">Prada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={newProduct.gender}
                    onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) || 0 })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images (optional, multiple)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setNewProduct({ ...newProduct, newImages: files });
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleAddCancel}
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;