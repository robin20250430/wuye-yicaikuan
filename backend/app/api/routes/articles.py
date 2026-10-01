from datetime import datetime, timezone
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from ...schemas.common import ArticleDetail, ArticleSummary
from ...services.article_service import get_article_by_slug, list_articles

router = APIRouter()


class ArticleCreateRequest(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    summary: str = Field(min_length=1, max_length=500)
    category: str = Field(default="物业法规")
    keywords: list[str] = Field(default_factory=list)
    content: str = Field(min_length=1)


@router.get("/", response_model=list[ArticleSummary])
def list_article_summaries() -> list[ArticleSummary]:
    return list_articles()


@router.get("/{slug}", response_model=ArticleDetail)
def get_article(slug: str) -> ArticleDetail:
    article = get_article_by_slug(slug)
    if not article:
        raise HTTPException(status_code=404, detail="文章不存在")
    return article


@router.post("/admin/create", response_model=ArticleDetail)
def create_article(payload: ArticleCreateRequest) -> ArticleDetail:
    slug = payload.title.strip().replace(" ", "-")
    article = ArticleDetail(
        id=f"article-{datetime.now(timezone.utc).timestamp()}",
        slug=slug,
        title=payload.title,
        summary=payload.summary,
        category=payload.category,
        updated_at=datetime.now(timezone.utc).date().isoformat(),
        content=payload.content,
        keywords=payload.keywords or [payload.category],
    )
    return article
