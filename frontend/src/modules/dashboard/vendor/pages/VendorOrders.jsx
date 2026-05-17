import React, { useEffect, useState } from "react";
import {
  getVendorOrders,
  updateVendorOrderItemStatus,
} from "../../../marketplace/services/marketplace.service";
import "../index.css";

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    getVendorOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load orders.");
        setLoading(false);
      });
  };

  const changeItemStatus = async (orderId, itemId, status) => {
    setError("");

    try {
      await updateVendorOrderItemStatus(orderId, itemId, status);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                items: order.items.map((item) =>
                  item._id === itemId ? { ...item, vendorStatus: status } : item
                ),
              }
            : order
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Could not update order status.");
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell dashboard-shell-wide">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Vendor Dashboard</div>
            <h1 className="dashboard-title">Product Orders</h1>
            <p className="dashboard-subtitle">
              Orders appear here when customers checkout with products you added.
            </p>
          </div>
        </div>

        {error && <div className="dashboard-message error">{error}</div>}

        <section className="dashboard-card">
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders for your products yet.</p>
          ) : (
            <div className="vendor-orders">
              {orders.map((order) => (
                <article key={order._id} className="vendor-order-card">
                  <div className="vendor-order-head">
                    <div>
                      <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
                      <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <span>{order.status}</span>
                  </div>

                  <div className="vendor-order-customer">
                    <strong>{order.contact?.firstName} {order.contact?.lastName}</strong>
                    <span>{order.contact?.email}</span>
                    <span>{order.shippingAddress?.address}, {order.shippingAddress?.city}</span>
                  </div>

                  <div className="vendor-order-items">
                    {order.items.map((item) => (
                      <div key={item._id || item.product} className="vendor-order-item">
                        <div>
                          <strong>{item.name}</strong>
                          <span className={`vendor-status vendor-status-${item.vendorStatus || "pending"}`}>
                            {item.vendorStatus || "pending"}
                          </span>
                        </div>
                        <span>{item.qty} x {item.price} DT</span>
                        <div className="vendor-status-actions">
                          <button
                            className="dashboard-btn dashboard-btn-secondary"
                            onClick={() => changeItemStatus(order._id, item._id, "pending")}
                          >
                            Pending
                          </button>
                          <button
                            className="dashboard-btn dashboard-btn-primary"
                            onClick={() => changeItemStatus(order._id, item._id, "confirmed")}
                          >
                            Confirm
                          </button>
                          <button
                            className="dashboard-btn dashboard-btn-danger"
                            onClick={() => changeItemStatus(order._id, item._id, "refused")}
                          >
                            Refuse
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="vendor-order-total">
                    Vendor subtotal: {order.vendorSubtotal?.toFixed(2)} DT
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
