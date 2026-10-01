from datetime import datetime, timezone

from .schemas.common import ArticleDetail, ArticleSummary

ARTICLES = [
    {
        "id": "article-1",
        "slug": "owner-refuse-pay-property-fee",
        "title": "业主拒交物业费是否合法？",
        "summary": "从合同、服务、程序和证据四个层面，解析物业公司合法催缴的标准。",
        "category": "物业法规",
        "updated_at": "2026-10-01",
        "keywords": ["物业费", "欠费", "催缴", "合同"],
        "content": "物业服务合同通常约定业主应按时缴纳物业费。若业主确实欠费，物业公司原则上可以依据合同和法律规定发出催缴通知、限期缴费通知，并保留进一步沟通或法律解决的权利。\n\n但在任何催缴过程中都需注意：事实准确、金额清晰、程序规范，以及保留完整证据。",
    },
    {
        "id": "article-2",
        "slug": "how-to-legally-collect",
        "title": "物业公司如何合法催缴物业费？",
        "summary": "合法催缴的关键是事实清楚、金额准确、程序合规、证据完整。",
        "category": "催缴流程",
        "updated_at": "2026-10-01",
        "keywords": ["合法催缴", "通知", "欠费"],
        "content": "物业公司合法催缴物业费通常需要做到：1. 先核对合同及费用明细；2. 确认欠费事实和归属；3. 发出书面催缴通知；4. 保存催缴记录、短信和电话记录；5. 如必要，再发律师函或准备诉前材料。",
    },
]


def list_articles() -> list[ArticleSummary]:
    return [ArticleSummary(**{k: v for k, v in item.items() if k in ArticleSummary.model_fields}) for item in ARTICLES]


def get_article_by_slug(slug: str) -> ArticleDetail | None:
    for item in ARTICLES:
        if item["slug"] == slug:
            return ArticleDetail(**item)
    return None
