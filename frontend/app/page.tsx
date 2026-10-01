import Link from "next/link";

export default function Home() {
  return <main className="min-h-screen">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <Link href="/" className="text-xl font-bold text-blue-700">物业易催款</Link>
      <div className="flex gap-5 text-sm text-slate-600"><Link href="/generate">免费生成</Link><a href="#features">产品能力</a><a href="#notice">合规说明</a></div>
    </nav>
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-20"><div className="max-w-3xl">
      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">AI + 法律模板 + 催缴自动化</span>
      <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight">3分钟生成专业物业费催缴通知书</h1>
      <p className="mt-6 text-lg leading-8 text-slate-600">帮助物业公司快速整理欠费信息，生成催缴通知书、限期缴费通知书及律师函草稿，减少重复文书工作。</p>
      <div className="mt-8 flex gap-4"><Link href="/generate" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">免费生成催缴函</Link><a href="#features" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold">了解产品能力</a></div>
    </div></section>
    <section id="features" className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3">{[["模板化生成","固定字段与文书模板结合，结果更稳定"],["批量处理","后续支持 Excel 导入与批量生成"],["合规提醒","生成内容明确标注参考性质，避免过度承诺"]].map(([title, text]) => <div key={title} className="rounded-xl bg-white p-6 shadow-sm"><h2 className="font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}</section>
    <section id="notice" className="mx-auto max-w-6xl px-6 pb-12 text-sm text-slate-500">生成内容仅供文书草拟和信息整理参考，不构成法律意见。正式使用前请核验合同、欠费事实及当地法规，必要时咨询执业律师。</section>
  </main>;
}
