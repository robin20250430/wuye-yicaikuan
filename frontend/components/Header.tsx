import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/generate", label: "免费生成" },
  { href: "/templates", label: "模板库" },
  { href: "/articles", label: "知识库" },
  { href: "/calculator", label: "计算器" },
  { href: "/enterprise", label: "企业服务" },
  { href: "/pricing", label: "定价" },
  { href: "/dashboard", label: "个人中心" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-blue-700">物业易催款</Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-blue-700">{item.label}</Link>
          ))}
        </nav>
        <div className="flex gap-2">
          <Link href="/login" className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">登录</Link>
          <Link href="/register" className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white">注册</Link>
        </div>
      </div>
    </header>
  );
}
