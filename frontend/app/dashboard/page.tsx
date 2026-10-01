"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface DashboardStats {
  total_documents: number;
  total_orders: number;
  total_revenue: number;
  active_users: number;
  this_month_revenue: number;
  this_month_documents: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/dashboard/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">加载中...</div>;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl justify-between items-center px-6 py-4">
          <Link href="/" className="text-xl font-bold text-blue-700">物业易催款</Link>
          <div className="flex gap-4">
            <Link href="/orders" className="text-sm text-slate-600 hover:text-blue-700">订单</Link>
            <Link href="/documents" className="text-sm text-slate-600 hover:text-blue-700">文档</Link>
            <Link href="/profile" className="text-sm text-slate-600 hover:text-blue-700">个人中心</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">企业仪表板</h1>
        <p className="mt-2 text-slate-600">实时监控业务指标</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-slate-500">总文档数</div>
            <div className="mt-2 text-4xl font-bold text-blue-700">{stats?.total_documents || 0}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-slate-500">总订单数</div>
            <div className="mt-2 text-4xl font-bold text-blue-700">{stats?.total_orders || 0}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-slate-500">总收入</div>
            <div className="mt-2 text-4xl font-bold text-green-700">¥{stats?.total_revenue || 0}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-slate-500">活跃用户</div>
            <div className="mt-2 text-4xl font-bold text-purple-700">{stats?.active_users || 0}</div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">本月统计</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-600">本月收入</span><span className="font-semibold text-green-700">¥{stats?.this_month_revenue || 0}</span></div>
              <div className="flex justify-between"><span className="text-slate-600">本月文档</span><span className="font-semibold text-blue-700">{stats?.this_month_documents || 0}</span></div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">快速操作</h2>
            <div className="mt-4 space-y-2">
              <Link href="/generate" className="block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white text-center hover:bg-blue-700">
                免费生成文书
              </Link>
              <Link href="/enterprise" className="block rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 text-center hover:border-blue-500">
                批量上传
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
