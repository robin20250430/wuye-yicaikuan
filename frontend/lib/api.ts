export type GeneratePayload = {
  document_type: "notice" | "deadline_notice" | "lawyer_letter" | "litigation_notice";
  property_company: string; community_name: string; owner_name: string; property_address: string;
  overdue_amount: number; overdue_period: string; contract_status: string; payment_deadline?: string; contact_phone?: string;
};

export type GeneratedDocument = { id: string; title: string; content: string; disclaimer: string; created_at: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
export async function generateDocument(payload: GeneratePayload): Promise<GeneratedDocument> {
  const response = await fetch(`${API_URL}/api/documents/generate`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  if (!response.ok) throw new Error("文书生成失败，请检查填写内容");
  return response.json();
}
