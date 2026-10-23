
// import { useEffect, useState } from "react";
// import "./App.css";
// import Loading from "./components/loading";
// import {useDispatch,useSelector} from "react-redux"
// import { addToCart } from "./store/cartSlice";

// function App() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [selectedImages, setSelectedImages] = useState({});
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const [status,setStatus]=useState(null)
//   const [error,setError]=useState("");

//   const perpage=20;
//   const[currentPage,setCurrentPage]=useState(1)

//   useEffect(() => {
//     const loader=async()=>{
//       try{
//       const res=await fetch("https://dummyjson.com/products?limit=100")
//       setStatus(res.status);
//       if(!res.ok){
//         setStatus(res.status);
//         throw new Error("Failed to Load");
//       }
//       const result=await res.json();
//       setProducts(result.products);
//     }catch(err){
//       setError(err.message);
//     }
//     finally{
//       setLoading(false);
//     }
//     }
//     loader();
//   }, []);
// console.log(products,"Products");
// console.log(status,"status");
//   const categories = [
//     "all",...new Set(Object.values(products).map((product) => product.category)),
//   ];

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.title
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesCategory =
//       category === "all" || product.category === category;

//     return matchesSearch && matchesCategory;
//   });

//   const totalPages=Math.ceil(filteredProducts.length/perpage);
//   const startIndex=(currentPage-1)*perpage;
//   const currentProduct=filteredProducts.slice(startIndex,startIndex+perpage);
  
//   if(loading){
//     return <Loading />
//   }

//   if(error){
//     return(
//       <>
//       <h1>Something</h1>
//       <p>Status code:{status ?? "Unavailable"}</p>
//       <p>{error}</p>
//       </>
//     )
//   }
  
//   const changeImage = (productId, imageUrl) => {
//     setSelectedImages((previous) => ({
//       ...previous,
//       [productId]: imageUrl,
//     }));
//   };

  

//   const getDiscountedPrice = (product) => {
//     return (
//       product.price -
//       (product.price * product.discountPercentage) / 100
//     );
//   };

//   return (
//     <div className="app">
//       <header className="navbar">
//         <h1>ShopZone</h1>

//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(event) => {setSearch(event.target.value)
//             setCurrentPage(1);
//           }}
//         />

//         <div className="cart-count">
//           🛒 Cart: {cart.length}
//         </div>
//       </header>

//       <section className="hero">
//         <h2>Discover Your Next Favorite</h2>
//         <p>Explore products and grab amazing discounts.</p>
//       </section>

//       <section className="filters">
//         <label htmlFor="category">Category:</label>

//         <select
//           id="category"
//           value={category}
//           onChange={(event) => setCategory(event.target.value)}
//         >
//           {categories.map((item) => (
//             <option key={item} value={item}>
//               {item === "all"
//                 ? "All Categories"
//                 : item.replaceAll("-", " ")}
//             </option>
//           ))}
//         </select>
//       </section>

//       <main className="product-grid">
//         {filteredProducts.length===0?(
//           <p className="message">No products found.</p>):
//           (currentProduct.map((product) => {
//           const mainImage =
//             selectedImages[product.id] || product.images[0];

//           return (
//             <article className="product-card" key={product.id}>
//               <div className="image-container">
//                 <span className="discount-badge">
//                   {Math.round(product.discountPercentage)}% OFF
//                 </span>

//                 <img
//                   className="main-image"
//                   src={mainImage}
//                   alt={product.title}
//                 />
//               </div>

//               <div className="product-info">
//                 <p className="category">
//                   {product.category}
//                 </p>

//                 <h3>{product.title}</h3>

//                 <p className="description">
//                   {product.description}
//                 </p>

//                 <div className="price-row">
//                   <span className="discounted-price">
//                     ${getDiscountedPrice(product).toFixed(2)}
//                   </span>

//                   <del>${product.price.toFixed(2)}</del>
//                 </div>

//                 <p className="rating">
//                   ⭐ {product.rating} / 5
//                 </p>

//                 <div className="thumbnails">
//                   {product.images.slice(0, 4).map((image, index) => (
//                     <button
//                       type="button"
//                       key={`${product.id}-${index}`}
//                       className={
//                         mainImage === image ? "thumbnail active" : "thumbnail"
//                       }
//                       onClick={() => changeImage(product.id, image)}
//                       aria-label={`Show image ${index + 1} of ${product.title}`}
//                     >
//                       <img src={image} alt="" />
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   className="add-button"
//                   onClick={() => dispatch(addToCart(product))}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </article>
//           );
//         }))}
//       </main>

      

//       {filteredProducts.length > 0 && (
//           <div className="page">
//             <button
//               onClick={() => setCurrentPage((prev) => prev - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>

//             <h3>Page {currentPage} of {totalPages}</h3>

//             <button
//               onClick={() => setCurrentPage((prev) => prev + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         )}

//       <footer>
//         <p>ShopZone | Demo E-commerce Store</p>
//         <p>Product data powered by DummyJSON</p>
//       </footer>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/ProductDetails/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
