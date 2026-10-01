"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  experience_years: number;
  phone: string;
  office_address: string;
  bio: string;
  success_rate: number;
  hourly_rate: number;
  total_cases: number;
}

export default function LawyersPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/lawyers/`)
      .then((res) => res.json())
      .then((data) => setLawyers(data.lawyers || []))
      .finally(() => setLoading(false));
  }, []);

  async function handleContact() {
    if (!selectedLawyer || !message) return;
    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/lawyers/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lawyer_id: selectedLawyer.id, message }),
      });
      if (response.ok) {
        alert("咨询请求已发送，两小时内将收到律师回复");
        setMessage("");
        setSelectedLawyer(null);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl justify-between items-center px-6 py-4">
          <Link href="/" className="text-xl font-bold text-blue-700">物业易催款</Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-blue-700">返回首页</Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">专业律师推荐</h1>
        <p className="mt-2 text-slate-600">遇到复杂欠费纠纷？咨询专业律师帮助催讨</p>

        {loading ? (
          <div className="text-center py-10">加载中...</div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lawyers.map((lawyer) => (
              <div key={lawyer.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{lawyer.name}</h2>
                    <p className="mt-1 text-sm text-blue-700 font-semibold">{lawyer.specialty}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>执业年限</span>
                    <span className="font-semibold text-slate-900">{lawyer.experience_years}年</span>
                  </div>
                  <div className="flex justify-between">
                    <span>成功率</span>
                    <span className="font-semibold text-green-700">{(lawyer.success_rate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>办理案件</span>
                    <span className="font-semibold text-slate-900">{lawyer.total_cases}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>咨询费</span>
                    <span className="font-semibold text-slate-900">¥{lawyer.hourly_rate}/小时</span>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-6 text-slate-600">{lawyer.bio}</p>

                <div className="mt-4 space-y-2">
                  <button onClick={() => setSelectedLawyer(lawyer)} className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                    咨询律师
                  </button>
                  <a href={`tel:${lawyer.phone}`} className="block w-full rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-700 text-center hover:bg-blue-50">
                    直接拨号
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedLawyer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="rounded-xl bg-white p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-slate-900">咨询 {selectedLawyer.name} 律师</h2>
              <p className="mt-2 text-sm text-slate-600">{selectedLawyer.specialty}</p>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="请描述您的情况..."
                className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2 min-h-[120px] outline-none focus:border-blue-500"
              />

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedLawyer(null)}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  取消
                </button>
                <button
                  onClick={handleContact}
                  disabled={submitting}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {submitting ? "发送中..." : "发送咨询"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
