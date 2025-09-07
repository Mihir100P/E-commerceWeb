import axios from "axios";
import { useEffect, useState, useContext, useMemo } from "react";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function getCartItems() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:8080/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (result.data.success) setCart(result.data.cart);
      } catch (err) {
        console.error(err);
      }
    }

    getCartItems();
  }, [user]);

  if (!user) return <p className="m-5">Please login to view your cart.</p>;

  const handleRemove = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8080/api/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (itemId, qty) => {
    try {
      const token = localStorage.getItem("token");

      if (qty < 1) {
        handleRemove(itemId);
        return;
      }
      await axios.post(
        `http://localhost:8080/api/cart/update/${itemId}`,
        { quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart((prev) =>
        prev.map((item) =>
          item.itemId._id === itemId ? { ...item, quantity: qty } : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  const { totalItems, totalAmount } = useMemo(() => {
    let items = 0;
    let amount = 0;
    cart.forEach((c) => {
      items += c.quantity;
      amount += c.quantity * c.itemId.price;
    });
    return { totalItems: items, totalAmount: amount };
  }, [cart]);

  const handleBuyAll = () => {
    toast.success(`You purchased ${totalItems} items for $${totalAmount.toFixed(2)}`);
  };

  return (
    <div className="cart-container p-4">
      <h1 className="cart-title mb-4">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.itemId._id} className="cart-item shadow-sm p-3 mb-3 rounded d-flex align-items-center">
              <div className="cart-img me-3">
                <img
                  src={item.itemId.image}
                  alt={item.itemId.name}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  className="rounded"
                />
              </div>
              <div className="cart-info flex-grow-1">
                <h5 className="fw-semibold">{item.itemId.name}</h5>
                <p className="cart-price text-success fw-bold">
                  ${item.itemId.price.toFixed(2)}
                </p>
                <div className="cart-actions d-flex align-items-center gap-3">
                  <div className="quantity-control d-flex align-items-center border rounded px-2">
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() =>
                        updateQuantity(item.itemId._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() =>
                        updateQuantity(item.itemId._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(item.itemId._id)}
                  >
                    Remove
                  </button>
                  <button className="btn btn-success btn-sm">Buy</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary shadow-lg p-4 rounded mt-4 bg-light">
            <h4 className="fw-bold">Order Summary</h4>
            <p>Total Items: <b>{totalItems}</b></p>
            <p>Total Amount: <b>${totalAmount.toFixed(2)}</b></p>
            <button
              className="btn btn-primary w-100 mt-3 rounded-pill"
              onClick={handleBuyAll}
            >
              🛒 Buy All
            </button>
          </div>
        </>
      )}
    </div>
  );
}
