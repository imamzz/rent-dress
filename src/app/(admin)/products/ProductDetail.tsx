"use client";

import { useState } from "react";
import { ProductDetailType } from "./type";
import X from "@/src/components/icons/X";
import ChevronLeft from "@/src/components/icons/ChevronLeft";
import ChevronRight from "@/src/components/icons/ChevronRight";
import Image from "next/image";

interface ProductDetailProps {
    product: ProductDetailType;
    closeDetailModal: () => void;
}

const ProductDetailShow = ({
    product,
    closeDetailModal,
}: ProductDetailProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const totalStock = product.variants.reduce(
        (sum, v) => sum + v.stock,
        0
    );
    console.log(product);

    return (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white">
                    <h3 className="text-lg text-gray-900">Product Detail</h3>
                    <button onClick={closeDetailModal}>
                        <X className="w-5 h-5 text-gray-500 hover:text-gray-900" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Image Gallery */}
                    <div>
                        <div className="relative aspect-4/3 bg-gray-100 rounded-lg overflow-hidden">
                            {product.media.length > 0 ? (
                                <Image
                                    src={product.media[currentImageIndex].url}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                                    Belum ada media gambar/video
                                </div>
                            )}


                            {product.media.length > 1 && (
                                <>
                                    <button
                                        onClick={() =>
                                            setCurrentImageIndex(
                                                (currentImageIndex - 1 + product.media.length) %
                                                product.media.length
                                            )
                                        }
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <button
                                        onClick={() =>
                                            setCurrentImageIndex(
                                                (currentImageIndex + 1) % product.media.length
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>

                        {product.media.length > 1 && (
                            <div className="grid grid-cols-6 gap-2 mt-4">
                                {product.media.map((media, index) => (
                                    <button
                                        key={media.id}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`border-2 rounded-md overflow-hidden aspect-square ${index === currentImageIndex
                                            ? "border-gray-900"
                                            : "border-gray-200"
                                            }`}
                                    >
                                        <img
                                            src={media.url}
                                            alt={`${product.name}-${index}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl text-gray-900">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg shadow-sm">
                            <div>
                                <div className="text-sm text-gray-600">Category</div>
                                <div className="text-xl text-gray-900">{product.category.name}</div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-600">Daily Rate</div>
                                <div className="text-xl text-gray-900">
                                    ${product.price}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-600">Total Stock</div>
                                <div className="text-xl text-gray-900">{totalStock}</div>
                            </div>
                        </div>
                    </div>

                    {/* Variants */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                            Available Variants
                        </h4>

                        <div className="flex flex-wrap gap-2">
                            {product.variants.map((variant) => (
                                <div
                                    key={variant.id}
                                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm"
                                >
                                    <div className="text-sm font-medium text-gray-900">
                                        <span className="text-lg text-gray-900">{variant.size.label}</span> · {variant.color.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Stock: {variant.stock}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button className="flex-1 bg-gray-900 text-white py-2 rounded-md">
                            Edit Product
                        </button>
                        <button
                            onClick={closeDetailModal}
                            className="border px-6 py-2 rounded-md"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailShow;
