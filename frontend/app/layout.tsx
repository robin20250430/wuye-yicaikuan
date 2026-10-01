import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "物业易催款｜AI物业费催缴文书生成平台",
  description: "3分钟生成专业物业费催缴通知书、律师函和催缴文书草稿。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="bg-slate-50 text-slate-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
