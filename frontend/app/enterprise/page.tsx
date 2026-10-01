"use client";
import { useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function EnterprisePage() {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  async function handleUpload() {
    if (!uploadFile) {
      setError("请选择文件");
      return;
    }

    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      const response = await fetch(`${API_URL}/api/enterprise/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("上传失败");
      const result = await response.json();
      setUploadResult(result);
      setUploadFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "上传失败");
    } finally {
      setUploading(false);
    }
  }

  async function downloadBatch() {
    if (!uploadResult) return;
    try {
      const element = document.createElement("a");
      element.href = `${API_URL}/api/enterprise/download/${uploadResult.batch_id}`;
      element.download = "批量生成结果.zip";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch (err) {
      setError("下载失败");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link href="/" className="mb-6 inline-flex text-sm text-blue-700">返回首页</Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-blue-700">企业版</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">批量催缴与欠费管理</h1>
          <p className="mt-4 text-slate-600">上传 CSV/Excel 欠费名单，AI 自动批量生成催缴函，一键下载成样。</p>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">批量导入欠费名单</h2>
            <p className="mt-2 text-sm text-slate-600">CSV 或 Excel 格式，可压缩推者明细表格结构。</p>

            <div className="mt-4 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <input type="file" accept=".csv,.xlsx,.xls" onChange={(e) => setUploadFile(e.target.files?.[0] || null)} className="hidden" id="file-input" />
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="text-sm text-slate-600">选择 CSV/Excel 文件</div>
                {uploadFile ? <div className="mt-2 text-xs text-blue-700">{uploadFile.name}</div> : null}
              </label>
            </div>

            {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

            <button onClick={handleUpload} disabled={!uploadFile || uploading} className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60">
              {uploading ? "上传中" : "上传批处理"}
            </button>

            {uploadResult ? (
              <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
                <div>批次号: {uploadResult.batch_id}</div>
                <div>总行数: {uploadResult.total_rows}</div>
                <div>已生成: {uploadResult.generated_count} / {uploadResult.total_rows}</div>
                <div>状态: {uploadResult.status}</div>
                <button onClick={downloadBatch} className="mt-3 rounded bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">
                  下载结果文件
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">企业套餐</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">专业版</span>
                <span className="font-bold text-blue-700">¥ 199/月</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">适合小型物业公司，支持批量生成与基础管理。</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">企业版</span>
                <span className="font-bold text-blue-700">¥ 2999/年</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">支持导入、批量处理、记录管理和专家支持。</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
