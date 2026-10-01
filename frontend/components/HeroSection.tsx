import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              AI + 法律模板 + 物业催缴自动化
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              3分钟生成专业物业费催缴通知书
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              AI 自动生成符合中国法律规范的物业催缴函、律师函与起诉前告知书草稿，帮助物业公司提高催缴效率。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/generate" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">免费生成催缴函</Link>
              <Link href="/enterprise" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-700">物业企业批量催缴</Link>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">AI 文书生成</span>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">在线可用</span>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="rounded-lg bg-white p-3 shadow-sm">物业费催缴通知书</div>
              <div className="rounded-lg bg-white p-3 shadow-sm">限期缴费通知书</div>
              <div className="rounded-lg bg-white p-3 shadow-sm">律师函草稿</div>
              <div className="rounded-lg bg-white p-3 shadow-sm">起诉前告知书</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
