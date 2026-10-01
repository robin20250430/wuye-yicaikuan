export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div>© 2026 物业易催款</div>
        <div className="flex gap-5">
          <span>FAQ</span>
          <span>服务协议</span>
          <span>隐私政策</span>
        </div>
      </div>
    </footer>
  );
}
