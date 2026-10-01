export default function PaymentCancelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
      <div className="rounded-xl bg-white p-8 text-center max-w-md shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">支付已取消</h1>
        <p className="mt-2 text-slate-600">您已取消此次支付，可以随时重新尝试。</p>
        <a href="/pricing" className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          返回定价页
        </a>
      </div>
    </main>
  );
}
