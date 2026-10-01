export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">个人中心</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">生成记录</div>
          <div className="mt-2 text-3xl font-bold text-blue-700">128</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">下载次数</div>
          <div className="mt-2 text-3xl font-bold text-blue-700">54</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">有效订单</div>
          <div className="mt-2 text-3xl font-bold text-blue-700">12</div>
        </div>
      </div>
    </main>
  );
}
