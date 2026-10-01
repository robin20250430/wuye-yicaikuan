import Link from "next/link";

const plans = [
  { name: "基础版", price: "¥29.9", description: "下载 Word/PDF 文书", btn: "立即购买" },
  { name: "工具包", price: "¥199", description: "100 份批量催缴通知 + 短信话术", btn: "选择方案" },
  { name: "企业版", price: "¥2999/年", description: "批量导入、AI 批量生成、管理后台", btn: "联系商务" },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">定价与套餐</h1>
      <p className="mt-2 text-slate-600">按现金流优先原则，先实现低门槛单次付费，再扩展企业服务。</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <div className="mt-4 text-3xl font-bold text-blue-700">{plan.price}</div>
            <p className="mt-3 text-sm text-slate-600">{plan.description}</p>
            <button className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">{plan.btn}</button>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-xl bg-slate-50 p-6 text-sm text-slate-600">
        支付支持：订单生成与支付入口接入。MVP 可先落地订单创建和支付页，后续接入微信支付、支付宝、Stripe 等渠道。
      </div>
    </main>
  );
}
