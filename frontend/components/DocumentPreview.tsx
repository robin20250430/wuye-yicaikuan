type Props = {
  document: {
    title: string;
    content: string;
    disclaimer: string;
  } | null;
};

export default function DocumentPreview({ document }: Props) {
  if (!document) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center text-sm text-slate-400">
        填写左侧信息后，文书将在这里显示预览。
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">{document.title}</h3>
        <button
          onClick={() => navigator.clipboard.writeText(document.content)}
          className="rounded border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600"
        >
          复制全文
        </button>
      </div>
      <pre className="max-h-[620px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        {document.content}
      </pre>
      <p className="mt-4 text-xs leading-6 text-slate-500">{document.disclaimer}</p>
    </div>
  );
}
