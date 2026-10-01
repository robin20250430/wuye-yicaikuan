export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
      <div className="rounded-xl bg-white p-8 text-center max-w-md shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">支付成功</h1>
        <p className="mt-2 text-slate-600">感谢您的购买，订单已完成支付。</p>
        <a href="/dashboard" className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          返回仪表板
        </a>
      </div>
    </main>
  );
}
