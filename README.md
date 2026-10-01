# 真实文档导出与数据库

当前版本增加：

- 生成文书持久化到 SQLAlchemy 数据库
- 真实 Word（DOCX）导出
- 真实 PDF 导出，使用 `STSong-Light` 支持中文
- TXT 导出
- 文档列表显示真实业主、地址和金额
- SQLite 旧库启动时自动补列；生产可使用 PostgreSQL

## 数据库配置

本地演示：

```env
DATABASE_URL=sqlite:///./app.db
```

生产 PostgreSQL：

```env
DATABASE_URL=postgresql+psycopg://user:password@host:5432/wuye
```

首次启动执行 SQLAlchemy `create_all`；SQLite 旧数据库启动时执行幂等补列。生产环境建议改用 Alembic 迁移流程。

## 导出接口

生成文书后使用返回的 `id`：

- `GET /api/documents/{id}/download?format=pdf`
- `GET /api/documents/{id}/download?format=docx`
- `GET /api/documents/{id}/download?format=txt`

## 启动

```bash
cp .env.example .env
docker compose up --build
```
