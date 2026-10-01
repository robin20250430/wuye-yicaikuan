export default function EnterprisePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-blue-700">企业版</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">批量催缴与欠费管理平台</h1>
          <p className="mt-4 text-slate-600">适用于物业管理公司批量导入欠费名单、生成文书、跟踪催缴进度和下载记录。</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>• 批量导入 Excel 欠费名单</li>
            <li>• AI 批量生成催缴函、律师函和诉前告知书</li>
            <li>• 统一查看催缴记录和下载历史</li>
            <li>• 支持企业管理员与成员权限管理</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">企业套餐</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between"><span className="font-semibold">专业版</span><span className="font-bold text-blue-700">¥ 199/月</span></div>
              <p className="mt-2 text-sm text-slate-500">适合小型物业公司，支持批量生成与基础管理。</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between"><span className="font-semibold">企业版</span><span className="font-bold text-blue-700">¥ 2999/年</span></div>
              <p className="mt-2 text-sm text-slate-500">支持导入、批量处理、记录管理和专家支持。</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
