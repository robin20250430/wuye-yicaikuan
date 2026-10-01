import Link from "next/link";

const articles = [
  {
    slug: "owner-refuse-pay-property-fee",
    title: "业主拒交物业费是否合法？",
    summary: "从合同、服务与法定程序角度说明物业公司可合法采取的措施。",
    category: "物业法规",
  },
  {
    slug: "how-to-legally-collect",
    title: "物业公司如何合法催缴物业费？",
    summary: "合法催缴的关键在于事实清楚、金额准确、程序合规。",
    category: "催缴流程",
  },
];

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-blue-700">法律知识库</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">物业费催缴法律知识库</h1>
      </div>

      <div className="space-y-5">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{article.category}</span>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">{article.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{article.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
