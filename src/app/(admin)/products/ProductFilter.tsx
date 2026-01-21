import { CreateProductInput } from "./type";

interface ProductFilterProps {
    filterCategory: string;
    setFilterCategory: (category: string) => void;
    filterSize: string;
    setFilterSize: (size: string) => void;
    filterColor: string;
    setFilterColor: (color: string) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
    filterType: "single" | "range";
    setFilterType: (type: "single" | "range") => void;
    singleDate: string;
    setSingleDate: (date: string) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    // filteredProducts: CreateProductInput[];
    // products: CreateProductInput[];
    // hasActiveFilters: boolean;
    clearAllFilters: () => void;
};

const ProductFilter = ({ 
    filterCategory, 
    setFilterCategory, 
    filterSize, 
    setFilterSize, 
    filterColor, 
    setFilterColor, 
    filterStatus, 
    setFilterStatus, 
    filterType, 
    setFilterType, 
    singleDate, 
    setSingleDate, 
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate, 
    // filteredProducts, 
    // products, 
    // hasActiveFilters, 
    clearAllFilters 
}: ProductFilterProps) => {
    return (
        <div className="border-t border-gray-100 pt-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        value={filterCategory}
                        onChange={(e) => {
                            setFilterCategory(e.target.value);
                            // setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                    >
                        <option value="">All Categories</option>
                        {/* {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))} */}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-700 mb-2">Size</label>
                    <select
                        value={filterSize}
                        onChange={(e) => {
                            setFilterSize(e.target.value);
                            // setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                    >
                        <option value="">All Sizes</option>
                        {/* {sizes.map((size) => (
                  <option key={size.id} value={size.name}>
                    {size.name}
                  </option>
                ))} */}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-700 mb-2">Color</label>
                    <select
                        value={filterColor}
                        onChange={(e) => {
                            setFilterColor(e.target.value);
                            // setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                    >
                        <option value="">All Colors</option>
                        {/* {colors.map((color) => (
                  <option key={color.id} value={color.name}>
                    {color.name}
                  </option>
                ))} */}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-700 mb-2">Status</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => {
                            setFilterStatus(e.target.value);
                            // setCurrentPage(1);
                        }}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                    >
                        <option value="">All Status</option>
                        <option value="available">Available</option>
                        <option value="rented">Fully Rented</option>
                    </select>
                </div>
            </div>

            {/* Date Filters */}
            <div className="border-t border-gray-100 pt-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-2">
                            Filter Type
                        </label>
                        <select
                            value={filterType}
                            onChange={(e) => {
                                setFilterType(e.target.value as "single" | "range");
                                setSingleDate("");
                                setStartDate("");
                                setEndDate("");
                            }}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                        >
                            <option value="single">Single Date</option>
                            <option value="range">Date Range</option>
                        </select>
                    </div>

                    {filterType === "single" ? (
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Unavailable On
                            </label>
                            <input
                                type="date"
                                value={singleDate}
                                onChange={(e) => {
                                    setSingleDate(e.target.value);
                                    // setCurrentPage(1);
                                }}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">
                                    From
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        // setCurrentPage(1);
                                    }}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">
                                    Until
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                        // setCurrentPage(1);
                                    }}
                                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-gray-500">
                    {filteredProducts.length} of {products.length} products
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        Clear filters
                    </button>
                )}
            </div> */}
        </div>
    )
}

export default ProductFilter
