export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">登录</h1>
        <div className="mt-6 space-y-4 text-sm">
          <label className="grid gap-1 font-medium text-slate-700">邮箱<input className="rounded-lg border border-slate-300 px-3 py-2" type="email" /></label>
          <label className="grid gap-1 font-medium text-slate-700">密码<input className="rounded-lg border border-slate-300 px-3 py-2" type="password" /></label>
          <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">登录</button>
        </div>
      </div>
    </main>
  );
}
