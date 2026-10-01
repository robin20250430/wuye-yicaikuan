import Link from "next/link";

const templates = [
  { id: "notice", title: "物业费催缴通知书", description: "适合对欠费业主发出正式提醒。", tag: "通知函" },
  { id: "deadline_notice", title: "限期缴费通知书", description: "适合明确付款期限和后续处理。", tag: "通知函" },
  { id: "lawyer_letter", title: "律师函模板", description: "适合发布正式律师函。", tag: "律师函" },
  { id: "litigation_notice", title: "起诉前告知书", description: "适合诉前提醒和法律风险提示。", tag: "诉讼材料" },
];

export default function TemplatesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-blue-700">模板库</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">物业催缴文书模板中心</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {templates.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">{item.tag}</span>
            <h2 className="mt-4 text-lg font-bold text-slate-800">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            <Link href="/generate" className="mt-5 inline-flex rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white">
              使用模板
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
