"use client";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl justify-between items-center px-6 py-4">
          <Link href="/" className="text-xl font-bold text-blue-700">物业易催款</Link>
          <Link href="/dashboard" className="text-sm text-blue-700">返回仪表板</Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">个人中心</h1>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">账户信息</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">邮箱地址</label>
              <input type="email" value="demo@example.com" disabled className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">公司名称</label>
              <input type="text" value="示例物业公司" disabled className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">用户角色</label>
              <input type="text" value="普通用户" disabled className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2" />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">修改密码</h2>
          <div className="mt-6 space-y-4">
            <input type="password" placeholder="当前密码" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            <input type="password" placeholder="新密码" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            <input type="password" placeholder="确认密码" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">更新密码</button>
          </div>
        </div>
      </div>
    </main>
  );
}
