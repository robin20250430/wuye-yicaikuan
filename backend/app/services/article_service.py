from ...schemas.common import ArticleDetail, ArticleSummary

ARTICLES = [
    {
        "id": "article-1",
        "slug": "owner-refuse-pay-property-fee",
        "title": "业主拒交物业费是否合法？",
        "summary": "从合同、物业服务、法定程序和催缴方式四个角度，说明物业公司合法催缴的常见边界。",
        "category": "物业法规",
        "updated_at": "2026-10-01",
        "keywords": ["物业费", "欠费", "催缴", "合同"],
        "content": "物业服务合同通常约定业主应按时缴纳物业费。若业主确实欠费，物业公司原则上可依合同和法律规定发出催缴通知、限期缴费通知，并保留进一步法律措施的权利。\n\n但是，物业公司在催缴过程中需要注意：第一，依法进行通知，说明欠费事实和金额；第二，依据合同约定说明违约责任；第三，不得单方面擅自停止提供服务以外的违法手段；第四，必要时保留起诉或申请仲裁等法律渠道。",
    },
    {
        "id": "article-2",
        "slug": "how-to-legally-collect",
        "title": "物业公司如何合法催缴物业费？",
        "summary": "合法催缴的关键在于事实清楚、金额准确、程序合规、证据完整。",
        "category": "催缴流程",
        "updated_at": "2026-10-01",
        "keywords": ["合法催缴", "欠费通知", "物业费"],
        "content": "物业公司合法催缴物业费，通常需要具备以下基础：\n\n1. 明确欠费事实；\n2. 明确欠费金额；\n3. 依据合同或者相关规定发出催缴通知；\n4. 借助合理手段进行沟通与催缴；\n5. 保存通话、短信、催缴函和付款记录。",
    },
]


def list_articles() -> list[ArticleSummary]:
    return [ArticleSummary(**{k: v for k, v in item.items() if k in ArticleSummary.model_fields}) for item in ARTICLES]


def get_article_by_slug(slug: str) -> ArticleDetail | None:
    for item in ARTICLES:
        if item["slug"] == slug:
            return ArticleDetail(**item)
    return None
