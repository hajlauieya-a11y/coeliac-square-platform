import React, { useEffect, useState } from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import { getMyOrders } from "../services/marketplace.service";
import "./orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrders()
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load orders.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="cs-app">
      <Header />

      <main className="orders-page">
        <div className="orders-shell">
          <div className="orders-head">
            <div>
              <span>Order History</span>
              <h1>My Orders</h1>
            </div>
          </div>

          {error && <div className="orders-error">{error}</div>}

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <section className="orders-empty">
              <h2>No orders yet</h2>
              <p>Your marketplace orders will appear here after checkout.</p>
            </section>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <article key={order._id} className="order-card">
                  <div className="order-card-head">
                    <div>
                      <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
                      <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                    <strong>{order.total?.toFixed(2)} DT</strong>
                  </div>

                  <div className="order-sections">
                    {order.vendorSections?.map((section) => (
                      <div key={section.seller} className="order-vendor-section">
                        <div className="order-vendor-head">
                          <span>Vendor section</span>
                          <strong className={`order-status order-status-${section.status}`}>
                            {section.status}
                          </strong>
                        </div>

                        {section.items.map((item) => (
                          <div key={item._id || item.product} className="order-item">
                            <span>{item.name}</span>
                            <span>{item.qty} x {item.price} DT</span>
                            <strong className={`order-status order-status-${item.vendorStatus || "pending"}`}>
                              {item.vendorStatus || "pending"}
                            </strong>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
