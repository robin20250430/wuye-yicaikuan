"use client";
import { useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function CalculatorPage() {
  const [form, setForm] = useState({ monthly_fee: 0, overdue_months: 0, late_fee_rate: 0.1, overdue_days: 0 });
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function calculate() {
    if (!form.monthly_fee || !form.overdue_months) {
      setError("请填写完整信息");
      return;
    }
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/calculator/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("计算失败");
      setResult(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "计算失败");
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link href="/" className="mb-6 inline-flex text-sm text-blue-700">返回首页</Link>
      <h1 className="text-3xl font-bold text-slate-900">物业费欠费计算器</h1>
      <p className="mt-2 text-slate-600">快速预估欠费金额、违约金与总额。</p>

      <div className="mt-8 grid gap-8 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <div className="space-y-4 text-sm">
          <label className="grid gap-1 font-medium text-slate-700">每月物业费（元）
            <input type="number" value={form.monthly_fee} onChange={(e) => setForm({...form, monthly_fee: Number(e.target.value)})} className="rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="grid gap-1 font-medium text-slate-700">欠费月数
            <input type="number" value={form.overdue_months} onChange={(e) => setForm({...form, overdue_months: Number(e.target.value)})} className="rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="grid gap-1 font-medium text-slate-700">违约金比例
            <input type="number" step="0.01" min="0" max="1" value={form.late_fee_rate} onChange={(e) => setForm({...form, late_fee_rate: Number(e.target.value)})} className="rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <button onClick={calculate} className="mt-4 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">计算</button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-700">
          <h2 className="text-lg font-bold">预估结果</h2>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between"><span>本金</span><span>¥ {result?.principal?.toFixed(2) || "0.00"}</span></div>
            <div className="flex justify-between"><span>违约金</span><span>¥ {result?.late_fee?.toFixed(2) || "0.00"}</span></div>
            <div className="flex justify-between"><span>总金额</span><span className="font-bold text-blue-700">¥ {result?.total_amount?.toFixed(2) || "0.00"}</span></div>
          </div>
          {result ? <p className="mt-5 text-xs leading-6 text-slate-500">{result.note}</p> : null}
        </div>
      </div>
    </main>
  );
}
