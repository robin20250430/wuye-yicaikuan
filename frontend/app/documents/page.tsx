"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface Document {
  id: string;
  document_type: string;
  title: string;
  owner_name: string;
  property_address: string;
  overdue_amount: number;
  status: string;
  created_at: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/dashboard/documents`)
      .then((res) => res.json())
      .then((data) => setDocuments(data.items || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl justify-between items-center px-6 py-4">
          <Link href="/" className="text-xl font-bold text-blue-700">物业易催款</Link>
          <Link href="/dashboard" className="text-sm text-blue-700">返回仪表板</Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">生成的文档</h1>
        <p className="mt-2 text-slate-600">查看所有生成的催款文书</p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">标题</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">文档类型</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">欠费金额</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">创建时间</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-900">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">加载中...</td>
                </tr>
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">暂无文档</td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-3 font-semibold text-slate-900">{doc.title}</td>
                    <td className="px-6 py-3 text-slate-600">{doc.document_type}</td>
                    <td className="px-6 py-3 font-semibold text-green-700">¥{doc.overdue_amount}</td>
                    <td className="px-6 py-3 text-slate-600">{new Date(doc.created_at).toLocaleDateString("zh-CN")}</td>
                    <td className="px-6 py-3">
                      <button className="text-blue-700 hover:underline">查看</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
