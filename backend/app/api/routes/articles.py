from fastapi import APIRouter, HTTPException
from ...schemas.common import ArticleDetail, ArticleSummary
from ...services.article_service import get_article_by_slug, list_articles

router = APIRouter()

@router.get("/", response_model=list[ArticleSummary])
def list_article_summaries() -> list[ArticleSummary]:
    return list_articles()

@router.get("/{slug}", response_model=ArticleDetail)
def get_article(slug: str) -> ArticleDetail:
    article = get_article_by_slug(slug)
    if not article:
        raise HTTPException(status_code=404, detail="文章不存在")
    return article
