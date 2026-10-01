const articleMap: Record<string, { title: string; content: string; keywords: string[] }> = {
  "owner-refuse-pay-property-fee": {
    title: "业主拒交物业费是否合法？",
    keywords: ["物业费", "催缴", "合同", "合法性"],
    content: "物业服务合同中通常约定了业主需要按时缴纳物业费，业主拒交款项不一定意味着具有合法性。若物业公司已提供服务并保留完整的物业服务记录、合同文件、费用明细、催缴记录，通常具备依法主张其权利的基础。\n\n在日常经营中，物业公司更应注意做足证据：费用结算准确、服务内容清楚、催缴通知完整，并避免使用过度威胁性表述。正式书面催缴函与律师函可以帮助形成明确的法律与沟通基础。",
  },
  "how-to-legally-collect": {
    title: "物业公司如何合法催缴物业费？",
    keywords: ["合法催缴", "通知", "欠费"],
    content: "合法催缴物业费的前提是事实清楚、证据齐全、程序合规。通常包括：明确欠费金额与时间，说明服务内容，发出书面催缴通知，保留函件、短信、微信、电话记录等证据，必要时进一步发送律师函或准备起诉前材料。\n\n要特别注意，催缴函和律师函是沟通工具，不等于单方最终裁决；最终的法律效果仍取决于合同、事实和当地法律规定。",
  },
};

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = articleMap[params.slug];
  if (!article) {
    return <main className="mx-auto max-w-3xl px-6 py-16 text-slate-700">未找到该篇文章。</main>;
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">{article.title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {article.keywords.map((keyword) => (
            <span key={keyword} className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">{keyword}</span>
          ))}
        </div>
        <div className="mt-6 whitespace-pre-line text-base leading-8 text-slate-700">{article.content}</div>
      </article>
    </main>
  );
}
