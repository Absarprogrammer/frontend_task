
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../store/cartSlice";
import "./Cart.css";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getDiscountedPrice = (product) =>
    product.price -
    (product.price * product.discountPercentage) / 100;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + getDiscountedPrice(item) * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-header">
        <Link to="/" >
          <h1>ShopZone</h1>
        </Link>

        <button className="conti"><Link to="/">Continue Shopping</Link></button>
      </div>

      <h2>Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>You haven't added any products yet.</p>
          <Link to="/" className="checkout-button">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => {
              const price = getDiscountedPrice(item);

              return (
                <article className="cart-item" key={item.id}>
                  <img src={item.images[0]} alt={item.title} />

                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p>${price.toFixed(2)} each</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          dispatch(decreaseQuantity(item.id))
                        }
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          dispatch(increaseQuantity(item.id))
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <p>
                      Line total: $
                      {(price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      className="remove-button"
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}

            <button
              className="clear-cart-button"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </section>

          <aside className="order-summary">
            <h3>Order Summary</h3>

            <p>Total items: {totalItems}</p>

            <div className="summary-total">
              <span>Total</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <button
              className="checkout-button"
              onClick={() =>
                alert("Order Placed.")
              }
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Cart;
