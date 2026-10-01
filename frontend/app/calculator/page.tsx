export default function CalculatorPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">物业费欠费计算器</h1>
      <p className="mt-2 text-slate-600">快速预估欠费金额、违约金与总额，便于填写催缴函。</p>

      <div className="mt-8 grid gap-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="space-y-4 text-sm">
          <label className="grid gap-1 font-medium text-slate-700">每月物业费<input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="例如：1200" /></label>
          <label className="grid gap-1 font-medium text-slate-700">欠费月份数<input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="例如：6" /></label>
          <label className="grid gap-1 font-medium text-slate-700">违约金比例<input className="rounded-lg border border-slate-300 px-3 py-2" placeholder="例如：0.1" /></label>
        </div>

        <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-700">
          <h2 className="text-lg font-bold">预估结果</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between"><span>本金</span><span>￥0.00</span></div>
            <div className="flex justify-between"><span>违约金</span><span>￥0.00</span></div>
            <div className="flex justify-between"><span>总金额</span><span className="font-bold text-blue-700">￥0.00</span></div>
          </div>
          <p className="mt-5 text-xs leading-6 text-slate-500">仅用于快速估算，具体金额以合同约定及实际结算数据为准。</p>
        </div>
      </div>
    </main>
  );
}
