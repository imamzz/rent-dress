import Edit from '@/src/components/icons/Edit';
import Trash from '@/src/components/icons/Trash';
import { Size } from './type';

interface SizeListProps {
  sizes: Size[];
  openModal: (size: Size) => void;
  handleDelete: (id: string) => void;
}

const SizeList = ({ sizes, openModal, handleDelete }: SizeListProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Size</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Bust</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Waist</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Hips</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sizes.map((size) => (
              <tr key={size.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-gray-900">{size.label}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{size.bust}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{size.waist}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{size.hips}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openModal(size)}
                      className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(size.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default SizeList