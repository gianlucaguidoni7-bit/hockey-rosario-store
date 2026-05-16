copia_de_catalogo_hockey_store.
"use client";

import { useEffect, useState } from "react";


export default function HockeyCatalogTemplate() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [adminMode, setAdminMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [newCategory, setNewCategory] = useState("");

  const [products, setProducts] = useState([
    {
      id: 1,
      category: "Palos",
      name: "CCM 10 Pro",
      price: 145000,
      description: "Descripción del producto",
      images: [
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
      ],
    },
    {
      id: 2,
      category: "Palos",
      name: "CCM FT8 Pro",
      price: 165000,
      description: "Descripción del producto",
      images: [
        "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1200&auto=format&fit=crop",
      ],
    },
    {
      id: 3,
      category: "Palos",
      name: "CCM XF Ghost",
      price: 175000,
      description: "Descripción del producto",
      images: [
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop",
      ],
    },
    {
      id: 4,
      category: "Guantes",
      name: "CCM FT8 Pro Gloves",
      price: 85000,
      description: "Descripción del producto",
      images: [
        "https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200&auto=format&fit=crop",
      ],
    },
    {
      id: 5,
      category: "Guantes",
      name: "CCM XF Pro Gloves",
      price: 92000,
      description: "Descripción del producto",
      images: [
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
      ],
    },
    {
      id: 6,
      category: "Cintas",
      name: "Cintas de Hockey",
      price: 8000,
      description: "Descripción del producto",
      images: [
        "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1200&auto=format&fit=crop",
      ],
    },
  ]);

  useEffect(() => {
    const savedProducts = localStorage.getItem("hockey-store-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hockey-store-products", JSON.stringify(products));
  }, [products]);

  const updateProduct = (id, field, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const dynamicCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const categories = ["Todos", ...dynamicCategories];

  const filteredProducts = products.filter((product) => {
    if (product.hidden) return false;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const addNewProduct = (category = "Nuevo") => {
    const newProduct = {
      id: Date.now(),
      category,
      name: "Nuevo producto",
      price: 0,
      description: "Descripción del producto",
      images: ["https://placehold.co/600x600/png?text=Nuevo+Producto"],
    };

    setProducts((currentProducts) => [newProduct, ...currentProducts]);

    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-6 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">Hockey Store</h1>
              <button
                onClick={() => setAdminMode(!adminMode)}
                className="bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold"
              >
                {adminMode ? "Salir modo edición" : "Modo edición"}
              </button>
            </div>
            <p className="text-gray-300">
              Equipamiento de hockey inline y sobre hielo
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">🔍</div>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-2xl text-black w-72"
              />
            </div>

            <div className="bg-white text-black px-4 py-3 rounded-2xl flex items-center gap-2 font-semibold">
              <span>🛒</span>
              {cart.length}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {adminMode && (
          <div className="mb-6 flex justify-end">
            <div className="flex flex-wrap gap-3">
            {dynamicCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addNewProduct(category);
                }}
                className="bg-black text-white px-5 py-3 rounded-2xl font-bold hover:opacity-90 transition"
              >
                + Agregar en {category}
              </button>
            ))}
          </div>
          </div>
        )}
        {adminMode && (
          <div className="bg-white rounded-3xl p-5 mb-6 shadow">
            <h3 className="text-xl font-bold mb-4">Administrar apartados</h3>

            <div className="flex gap-3 flex-wrap">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nuevo apartado"
                className="border rounded-2xl px-4 py-3"
              />

              <button
                onClick={() => {
                  if (!newCategory.trim()) return;

                  const exists = dynamicCategories.includes(newCategory);

                  if (!exists) {
                    const tempProduct = {
                      id: Date.now(),
                      category: newCategory,
                      name: "",
                      price: 0,
                      description: "",
                      hidden: true,
                      images: [],
                    };

                    setProducts((prev) => [...prev, tempProduct]);
                  }

                  setNewCategory("");
                }}
                className="bg-black text-white px-5 py-3 rounded-2xl font-semibold"
              >
                + Agregar apartado
              </button>
            </div>

            <div className="flex gap-2 flex-wrap mt-4">
              {dynamicCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setProducts((prev) =>
                      prev.filter((p) => p.category !== category)
                    );
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-2xl text-sm"
                >
                  Eliminar {category}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 overflow-x-auto mb-8 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-3 rounded-2xl font-semibold whitespace-nowrap transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const currentImage =
              selectedImages[product.id] || product.images?.[0];

            return (
            <div
              key={product.id}
              onClick={() => {
                if (!adminMode) {
                  setSelectedProduct(product);
                }
              }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              <div>
              <img
                key={String(currentImage || "")}
                src={String(currentImage || "https://placehold.co/600x600?text=Sin+Imagen")}
                alt={product.name}
                className="w-full h-72 object-cover rounded-t-3xl"
              />

              {adminMode && product.images && product.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto p-3 bg-white">
                  {product.images.map((img, index) => (
                    (() => {
                      const moveImage = (direction) => {
                        const updatedImages = [...product.images];
                        const newIndex = index + direction;

                        if (newIndex < 0 || newIndex >= updatedImages.length) {
                          return;
                        }

                        [updatedImages[index], updatedImages[newIndex]] = [
                          updatedImages[newIndex],
                          updatedImages[index],
                        ];

                        updateProduct(product.id, "images", updatedImages);
                      };

                      return (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Miniatura ${index}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImages({
                            ...selectedImages,
                            [product.id]: img,
                          });
                        }}
                        className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition ${
                          currentImage === img
                            ? "border-black"
                            : "border-transparent"
                        }`}
                      />

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          const updatedImages = product.images.filter(
                            (_, i) => i !== index
                          );

                          updateProduct(product.id, "images", updatedImages);

                          if (currentImage === img) {
                            setSelectedImages({
                              ...selectedImages,
                              [product.id]: updatedImages[0] || "",
                            });
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs font-bold"
                      >
                        ✕
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 pb-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveImage(-1);
                          }}
                          className="bg-black/70 text-white w-6 h-6 rounded-full text-xs"
                        >
                          ←
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveImage(1);
                          }}
                          className="bg-black/70 text-white w-6 h-6 rounded-full text-xs"
                        >
                          →
                        </button>
                      </div>
                    </div>
                      );
                    })()
                  ))}
                </div>
              )}

              {!adminMode && product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3 bg-white">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Miniatura ${index}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImages({
                          ...selectedImages,
                          [product.id]: img,
                        });
                      }}
                      className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition ${
                        currentImage === img
                          ? "border-black"
                          : "border-transparent"
                      }`}
                    />
                  ))}
                </div>
              )}

              {adminMode && (
                <div className="p-3 bg-gray-50 border-b space-y-3">
                  <input
                    value={product.images?.[0] || ""}
                    onChange={(e) =>
                      updateProduct(product.id, "images", [e.target.value])
                    }
                    placeholder="Pegar URL directa (.jpg, .png, .webp)"
                    className="border rounded-xl px-3 py-2 w-full text-sm"
                  />

                  <p className="text-xs text-gray-500">Podés subir varias fotos del producto</p>

                  <input
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);

                      const imagePromises = files.map(
                        (file) =>
                          new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result);
                            reader.readAsDataURL(file);
                          })
                      );

                      Promise.all(imagePromises).then((newImages) => {
                        updateProduct(product.id, "images", [
                          ...(product.images || []),
                          ...newImages,
                        ]);
                      });
                    }}
                    className="w-full text-sm"
                  />
                </div>
              )}
            </div>

              <div className="p-5">
                {adminMode ? (
                  <input
                    value={product.name}
                    onChange={(e) =>
                      updateProduct(product.id, "name", e.target.value)
                    }
                    placeholder="Nombre del producto"
                    className="border rounded-xl px-3 py-2 w-full text-2xl font-bold mb-3"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-3 text-black">
                    {product.name}
                  </h2>
                )}
                {adminMode ? (
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      updateProduct(product.id, "price", Number(e.target.value))
                    }
                    className="border rounded-xl px-3 py-2 w-full text-2xl font-bold mb-3"
                  />
                ) : (
                  <p className="text-3xl font-bold mb-3">
                    ${product.price.toLocaleString("es-AR")}
                  </p>
                )}

                {adminMode ? (
                  <>
                    <input
                      value={product.category}
                      onChange={(e) =>
                        updateProduct(product.id, "category", e.target.value)
                      }
                      placeholder="Categoría"
                      className="border rounded-xl px-3 py-2 w-full mb-3"
                    />

                    <textarea
                      value={product.description || ""}
                      onChange={(e) =>
                        updateProduct(product.id, "description", e.target.value)
                      }
                      placeholder="Descripción del producto"
                      className="border rounded-xl px-3 py-3 w-full mb-5 min-h-[100px]"
                    />
                  </>
                ) : (
                  <p className="text-gray-500 mb-5 text-sm">
                    Tocá para ver características
                  </p>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-black text-white rounded-2xl py-3 font-semibold hover:opacity-90 transition"
                  >
                    Agregar al carrito
                  </button>

                  
                </div>
              </div>
            </div>
                      );
          })}
        </div>
      </main>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-black text-white w-10 h-10 rounded-full"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src={selectedImages[selectedProduct.id] || selectedProduct.images?.[0]}
                  alt={selectedProduct.name}
                  className="w-full h-[500px] object-cover rounded-3xl"
                />

                <div className="flex gap-3 mt-4 overflow-x-auto">
                  {selectedProduct.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Imagen ${index}`}
                      onClick={() =>
                        setSelectedImages({
                          ...selectedImages,
                          [selectedProduct.id]: img,
                        })
                      }
                      className={`w-24 h-24 object-cover rounded-2xl cursor-pointer border-2 ${
                        (selectedImages[selectedProduct.id] ||
                          selectedProduct.images?.[0]) === img
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <span className="uppercase text-gray-500 tracking-wider text-sm">
                  {selectedProduct.category}
                </span>

                <h2 className="text-5xl font-bold mt-3 mb-5">
                  {selectedProduct.name}
                </h2>

                <p className="text-4xl font-bold mb-4">
                  ${selectedProduct.price.toLocaleString("es-AR")}
                </p>

                <div className="bg-gray-100 rounded-2xl p-5 mb-8">
                  <h3 className="text-xl font-bold mb-3">
                    Características del producto
                  </h3>

                  <p className="text-gray-700 text-lg whitespace-pre-line leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="w-full bg-black text-white py-4 rounded-2xl text-lg font-bold"
                  >
                    Agregar al carrito
                  </button>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-black text-white mt-12">
        <div className="max-w-7xl mx-auto p-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Hockey Store</h3>
            <p className="text-gray-400">
              Rosario, Santa Fe - Argentina
            </p>
          </div>

          <div className="flex gap-4 items-center">
            <a
              href="https://instagram.com"
              target="_blank" rel="noreferrer"
              className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition"
            >
              <span className="text-2xl">📸</span>
            </a>

            
          </div>
        </div>
      </footer>

      </div>
  );
}
