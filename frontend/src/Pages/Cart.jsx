import axios from "axios";
import { useEffect, useState, useContext, useMemo } from "react";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function getCartItems() {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) return toast.error("Session expired. Please login again.");

        const result = await axios.get("/api/cart", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (result.data.success) {
          const validCart = result.data.cart.filter((item) => item?.itemId);
          setCart(validCart);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load cart items.");
      }
    }

    getCartItems();
  }, [user]);

  if (!user) return <p className="m-5">Please login to view your cart.</p>;

  const handleRemove = async (itemId) => {
    try {
      setLoadingId(itemId);
      const token = localStorage.getItem("userToken");
      const res = await axios.post(
        "/api/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        const validCart = res.data.cart.filter((item) => item?.itemId);
        setCart(validCart);
        toast.success("Item removed from cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error removing item");
    } finally {
      setLoadingId(null);
    }
  };

  const updateQuantity = async (itemId, qty) => {
    try {
      if (qty < 1) {
        handleRemove(itemId);
        return;
      }

      setLoadingId(itemId);
      const token = localStorage.getItem("userToken");
      await axios.post(
        `/api/cart/update/${itemId}`,
        { quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart((prev) =>
        prev.map((item) =>
          item?.itemId?._id === itemId ? { ...item, quantity: qty } : item
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    } finally {
      setLoadingId(null);
    }
  };

  async function handleBuy(id, quantity, name, price, company,maxQuantity) {
    try {
      if (quantity > maxQuantity) {
      return toast.error("Quantity exceeds available stock");
    }
      setLoadingId(id);
      const token = localStorage.getItem("userToken");
      const totalPrice = price * quantity;

      const result = await axios.post(
        `/api/order/user/${id}`,
        { quantity, name, totalPrice, company },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (result.data.success) {
        setCart((prev) => prev.filter((c) => c?.itemId?._id !== id));
        toast.success(result.data.msg);
      } else {
        toast.error(result.data.msg || "Purchase failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while processing your purchase.");
    } finally {
      setLoadingId(null);
    }
  }

  const totalCartValue = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + (item?.itemId?.price || 0) * (item?.quantity || 0),
      0
    );
  }, [cart]);

  return (
    <div className="cart-container p-4">
      <h1 className="cart-title mb-4 text-primary">Your Shopping Cart</h1>

      {cart?.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={item?.itemId?._id || index}
              className="cart-item shadow-sm p-3 mb-3 rounded d-flex align-items-center flex-wrap"
            >
              <div className="cart-img me-3">
                <img
                  src={item?.itemId?.image}
                  alt={item?.itemId?.name || "Item image"}
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  className="rounded"
                />
              </div>

              <div className="cart-info flex-grow-1">
                <h5 className="fw-semibold">{item?.itemId?.name || "Unnamed Item"}</h5>
                <p className="cart-price text-success fw-bold">
                  ₹{(item?.itemId?.price || 0).toFixed(2)}
                </p>

                <div className="cart-actions d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2 mt-2">
                  <div className="quantity-control d-flex align-items-center border rounded px-2">
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() =>
                        updateQuantity(item?.itemId?._id, item?.quantity - 1)
                      }
                      disabled={loadingId === item?.itemId?._id}
                    >
                      -
                    </button>
                    <span className="px-3">{item?.quantity || 0}</span>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() =>
                        updateQuantity(item?.itemId?._id, item?.quantity + 1)
                      }
                      disabled={loadingId === item?.itemId?._id}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-muted pt-3 px-3">
                    Total Price: ₹
                    {((item?.itemId?.price || 0) * (item?.quantity || 0)).toFixed(2)}
                  </p>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleRemove(item?.itemId?._id)}
                    disabled={loadingId === item?.itemId?._id}
                  >
                    Remove
                  </button>

                  <button
                    onClick={() =>
                      handleBuy(
                        item?.itemId?._id,
                        item?.quantity,
                        item?.itemId?.name,
                        item?.itemId?.price,
                        item?.itemId?.company,
                        item?.itemId?.maxQuantity
                      )
                    }
                    className="btn btn-outline-success btn-sm"
                    disabled={loadingId === item?.itemId?._id}
                  >
                    Buy item
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-end mt-4">
            <h4>Total Cart Value: ₹{totalCartValue.toFixed(2)}</h4>
          </div>
        </>
      )}
    </div>
  );
}
