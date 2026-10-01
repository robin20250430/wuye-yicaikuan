import Link from "next/link";
import HeroSection from "../components/HeroSection";

const featureCards = [
  { title: "AI文书生成", text: "模板+变量+AI润色，快速生成专业文书草稿。" },
  { title: "批量处理", text: "支持Excel导入与批量生成，提升催缴效率。" },
  { title: "合规提醒", text: "生成内容保留参考性质，强调事实核验和法律风险提示。" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <section id="features" className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3">
        {featureCards.map((item) => (
          <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <h3 className="text-2xl font-bold">适合物业公司快速处理欠费问题</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50">
            面向中小物业公司，帮助减少人工文书重复劳动，提升通知效率和催缴沟通质量。
          </p>
          <div className="mt-6 flex gap-4">
            <Link href="/generate" className="rounded-lg bg-white px-4 py-3 font-semibold text-blue-700">免费生成</Link>
            <Link href="/enterprise" className="rounded-lg border border-white/50 px-4 py-3 font-semibold text-white">企业服务</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
