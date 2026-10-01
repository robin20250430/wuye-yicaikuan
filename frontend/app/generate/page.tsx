"use client";
import { useState } from "react";
import Link from "next/link";
import { generateDocument, type GeneratePayload, type GeneratedDocument } from "../lib/api";

const initial: GeneratePayload = {
  document_type: "notice",
  property_company: "",
  community_name: "",
  owner_name: "",
  property_address: "",
  overdue_amount: 0,
  overdue_period: "",
  contract_status: "已签订物业服务合同",
  payment_deadline: "",
  contact_phone: "",
};

export default function GeneratePage() {
  const [form, setForm] = useState<GeneratePayload>(initial);
  const [doc, setDoc] = useState<GeneratedDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const updateField = (key: keyof GeneratePayload, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await generateDocument(form);
      setDoc(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl justify-between px-6 py-4">
          <Link href="/" className="font-bold text-blue-700">物业易催款</Link>
          <Link href="/" className="text-sm text-slate-500">返回首页</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">免费生成催缴文书</h1>
          <p className="mt-2 text-sm text-slate-500">请填写准确信息，文书会按模板生成草稿。</p>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-1 text-sm font-medium text-slate-700">物业公司名称
              <input value={form.property_company} onChange={(e) => updateField("property_company", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500" required />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">小区名称
              <input value={form.community_name} onChange={(e) => updateField("community_name", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500" required />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">业主姓名
              <input value={form.owner_name} onChange={(e) => updateField("owner_name", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500" required />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">房屋地址
              <input value={form.property_address} onChange={(e) => updateField("property_address", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500" required />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">欠费金额（元）
              <input type="number" min="0.01" step="0.01" value={form.overdue_amount || ""} onChange={(e) => updateField("overdue_amount", Number(e.target.value))} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500" required />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">欠费时间
              <input value={form.overdue_period} onChange={(e) => updateField("overdue_period", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500" required />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">文书类型
              <select value={form.document_type} onChange={(e) => updateField("document_type", e.target.value as GeneratePayload["document_type"])} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500">
                <option value="notice">物业费催缴通知书</option>
                <option value="deadline_notice">限期缴费通知书</option>
                <option value="lawyer_letter">律师函草稿</option>
                <option value="litigation_notice">起诉前告知书草稿</option>
              </select>
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">服务合同情况
              <textarea value={form.contract_status} onChange={(e) => updateField("contract_status", e.target.value)} rows={3} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">支付期限（可选）
              <input value={form.payment_deadline ?? ""} onChange={(e) => updateField("payment_deadline", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500" />
            </label>
            <label className="grid gap-1 text-sm font-medium text-slate-700">联系电话（可选）
              <input value={form.contact_phone ?? ""} onChange={(e) => updateField("contact_phone", e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500" />
            </label>
          </div>

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

          <button type="submit" disabled={loading} className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60">
            {loading ? "生成中…" : "生成文书"}
          </button>
        </form>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">文书预览</h2>
          {doc ? (
            <>
              <div className="mt-4 flex justify-end">
                <button onClick={() => navigator.clipboard.writeText(doc.content)} className="rounded border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600">复制全文</button>
              </div>
              <pre className="mt-3 max-h-[620px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-700">{doc.content}</pre>
              <p className="mt-4 text-xs leading-6 text-slate-500">{doc.disclaimer}</p>
            </>
          ) : (
            <div className="mt-6 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-400">填写左侧信息后，文书将在这里显示</div>
          )}
        </section>
      </div>
    </main>
  );
}
