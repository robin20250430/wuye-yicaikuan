import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "物业易催款｜AI物业费催缴文书生成平台",
  description: "3分钟生成专业物业费催缴通知书、催缴函和律师函草稿。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
