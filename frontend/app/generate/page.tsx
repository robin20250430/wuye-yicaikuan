"use client";
import { useState } from "react";
import Link from "next/link";
import { generateDocument, type GeneratePayload, type GeneratedDocument } from "../lib/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const initial: GeneratePayload = { document_type: "notice", property_company: "", community_name: "", owner_name: "", property_address: "", overdue_amount: 0, overdue_period: "", contract_status: "已签订物业服务合同", payment_deadline: "", contact_phone: "" };

export default function GeneratePage() {
  const [form, setForm] = useState<GeneratePayload>(initial);
  const [doc, setDoc] = useState<GeneratedDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const update = (key: keyof GeneratePayload, value: string | number) => setForm((prev) => ({ ...prev, [key]: value }));
  async function submit(e: React.FormEvent) { e.preventDefault(); setLoading(true); setError(""); try { setDoc(await generateDocument(form)); } catch (err) { setError(err instanceof Error ? err.message : "生成失败"); } finally { setLoading(false); } }
  function download(format: "pdf" | "docx" | "txt") { if (!doc) return; window.open(`${API_URL}/api/documents/${doc.id}/download?format=${format}`, "_blank"); }

  return <main className="min-h-screen bg-slate-50"><header className="border-b bg-white"><div className="mx-auto flex max-w-6xl justify-between px-6 py-4"><Link href="/" className="font-bold text-blue-700">物业易催款</Link><Link href="/" className="text-sm text-slate-500">返回首页</Link></div></header><div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-2">
    <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold text-slate-900">生成催缴文书</h1><p className="mt-2 text-sm text-slate-500">请填写准确信息，生成结果将保存到数据库。</p><div className="mt-6 grid gap-4">
      {([ ["property_company","物业公司名称"], ["community_name","小区名称"], ["owner_name","业主姓名"], ["property_address","房屋地址"], ["overdue_period","欠费时间"] ] as const).map(([key,label]) => <label key={key} className="grid gap-1 text-sm font-medium text-slate-700">{label}<input required value={String(form[key])} onChange={(e) => update(key, e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2" /></label>)}
      <label className="grid gap-1 text-sm font-medium text-slate-700">欠费金额（元）<input required type="number" min="0.01" step="0.01" value={form.overdue_amount || ""} onChange={(e) => update("overdue_amount", Number(e.target.value))} className="rounded-lg border border-slate-300 px-3 py-2" /></label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">文书类型<select value={form.document_type} onChange={(e) => update("document_type", e.target.value as GeneratePayload["document_type"])} className="rounded-lg border border-slate-300 px-3 py-2"><option value="notice">物业费催缴通知书</option><option value="deadline_notice">限期缴费通知书</option><option value="lawyer_letter">律师函草稿</option><option value="litigation_notice">起诉前告知书草稿</option></select></label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">服务合同情况<textarea value={form.contract_status} onChange={(e) => update("contract_status", e.target.value)} rows={2} className="rounded-lg border border-slate-300 px-3 py-2" /></label>
    </div>{error && <p className="mt-4 text-sm text-red-600">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60">{loading ? "生成中…" : "生成文书"}</button></form>
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">文书预览</h2>{doc ? <><div className="mt-4 flex flex-wrap justify-end gap-2"><button onClick={() => navigator.clipboard.writeText(doc.content)} className="rounded border px-3 py-2 text-xs">复制全文</button>{([ ["pdf","下载 PDF"], ["docx","下载 Word"], ["txt","下载 TXT"] ] as const).map(([format,label]) => <button key={format} onClick={() => download(format)} className="rounded bg-blue-600 px-3 py-2 text-xs font-medium text-white">{label}</button>)}</div><pre className="mt-3 max-h-[620px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-7">{doc.content}</pre><p className="mt-4 text-xs leading-6 text-slate-500">{doc.disclaimer}</p></> : <div className="mt-6 rounded-lg border-2 border-dashed p-10 text-center text-sm text-slate-400">填写左侧信息后，文书将在这里显示</div>}</section>
  </div></main>;
}
