"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface Order {
  id: string;
  plan: string;
  amount: number;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/dashboard/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data.items || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl justify-between items-center px-6 py-4">
          <Link href="/" className="text-xl font-bold text-blue-700">物业易催款</Link>
          <Link href="/dashboard" className="text-sm text-blue-700">返回仪表板</Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">我的订单</h1>
        <p className="mt-2 text-slate-600">查看所有订单和支付状态</p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">订单号</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">套餐</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">金额</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">状态</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">创建时间</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">加载中...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">暂无订单</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-3 font-mono text-slate-700">{order.id}</td>
                    <td className="px-6 py-3">{order.plan}</td>
                    <td className="px-6 py-3 font-semibold text-green-700">¥{order.amount}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.status === "paid" ? "已支付" : "待支付"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-slate-600">{new Date(order.created_at).toLocaleDateString("zh-CN")}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
