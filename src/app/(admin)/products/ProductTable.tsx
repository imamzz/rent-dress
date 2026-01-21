// import ChevronLeft from '@/src/components/icons/ChevronLeft'
// import ChevronRight from '@/src/components/icons/ChevronRight'
import Edit from '@/src/components/icons/Edit'
import Eye from '@/src/components/icons/Eye'
import { TableProduct } from './type'
import Trash from '@/src/components/icons/Trash';

interface ProductTableProps {
  products: TableProduct[] | [];
  openDetailModal: (id: string) => void;
  openModal: (id: string) => void;
  setDeleteConfirmId: (id: string) => void;
}

const ProductTable = ({products, openDetailModal, openModal, setDeleteConfirmId}: ProductTableProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                Rate
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${product.availabilityStatus == "AVAILABLE"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                        }`}
                    >
                      {product.availabilityStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openDetailModal(product.id)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 cursor-pointer" />
                      </button>
                      <button
                        onClick={() => openModal(product.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 cursor-pointer" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash className="w-4 h-4 cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Show:</label>
          <select
            value={itemsPerPage}
            onChange={(e) =>
              handleItemsPerPageChange(parseInt(e.target.value))
            }
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1.5 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default ProductTable