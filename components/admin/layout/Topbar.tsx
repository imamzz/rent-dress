import Bell from "@/components/icons/Bell"
import LogOut from "@/components/icons/LogOut"

const Topbar = () => {
  return (
    <header className="border-b border-gray-100">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-gray-900">Dress Rental</h1>
          <div className="flex items-center gap-2">
            <button
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
            >
              <Bell/>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
            >
              <LogOut/>
            </button>
          </div>
        </div>
      </header>
  )
}

export default Topbar