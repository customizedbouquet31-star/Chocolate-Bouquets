import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } else {
      alert(error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-plum-950">Orders</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-lavender-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-plum-900/60">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-plum-900/60">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-lavender-50/50 border-b border-lavender-100 text-sm">
                <tr>
                  <th className="px-6 py-4 font-bold text-plum-950">Order ID</th>
                  <th className="px-6 py-4 font-bold text-plum-950">Customer</th>
                  <th className="px-6 py-4 font-bold text-plum-950">Amount</th>
                  <th className="px-6 py-4 font-bold text-plum-950">Date</th>
                  <th className="px-6 py-4 font-bold text-plum-950">Status</th>
                  <th className="px-6 py-4 font-bold text-plum-950 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-lavender-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-lavender-50/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-plum-900/60">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-plum-950">{order.customer_name}</div>
                      <div className="text-sm text-plum-900/60">{order.customer_phone}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-plum-900">
                      ₹{order.total_amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-plum-900/70">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="bg-white border border-lavender-200 text-sm rounded-lg focus:ring-primary focus:border-primary px-3 py-2 outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
