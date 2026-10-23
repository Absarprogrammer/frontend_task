
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Loading from "../components/loading";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/")}>
          Back to Shop
        </button>
      </div>
    );
  }

  const discountedPrice =
    product.price -
    (product.price * product.discountPercentage) / 100;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    alert("Product added to cart!");
  };

  return (
    <div className="product-details-page">
        <div className="navbar2">
        <Link to="/" className="brand">
          <h1>ShopZone</h1>
        </Link></div>

      <div className="product-details">
        <div className="product-gallery">
          <img
            className="main-product-image"
            src={selectedImage}
            alt={product.title}
          />

          <div className="thumbnail-list">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className={
                  selectedImage === image ? "selected-thumbnail" : ""
                }
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="product-category">{product.category}</p>

          <h1>{product.title}</h1>

          <p className="product-rating">
            ⭐ {product.rating} / 5
          </p>

          <div className="details-price">
            <h2>${discountedPrice.toFixed(2)}</h2>
            <del>${product.price.toFixed(2)}</del>
            <span>
              {Math.round(product.discountPercentage)}% OFF
            </span>
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <p>
            <strong>Brand:</strong> {product.brand || "Unbranded"}
          </p>

          <p>
            <strong>Availability:</strong>{" "}
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </p>

          {product.stock > 0 && (
            <>
              <div className="details-quantity">
                <strong>Quantity:</strong>

                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  disabled={quantity >= product.stock}
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(product.stock, q + 1)
                    )
                  }
                >
                  +
                </button>
              </div>

              <button
                className="details-add-button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </>
          )}

          <button
            className="details-cart-button"
            onClick={() => navigate("/cart")}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
