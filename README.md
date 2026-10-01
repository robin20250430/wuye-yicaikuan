# 最终产品化增强版

## 已实现

- SQLite/PostgreSQL 兼容的 SQLAlchemy 持久化：用户、订单、文书
- PBKDF2 密码哈希与 JWT 登录令牌
- OpenAI-compatible AI 生成接口，未配置密钥时自动使用模板回退
- Stripe Checkout 可选接入；未配置 Stripe 时提供本地 mock 支付
- CSV/XLSX 上传解析与批次下载
- 文书在线生成、复制、TXT 下载
- FastAPI Swagger 文档

## 启动

```bash
cp .env.example .env
docker compose up --build
```

生产环境请至少修改 `JWT_SECRET`，并配置 PostgreSQL、`OPENAI_API_KEY` 与 Stripe 密钥。将 `DATABASE_URL` 设置为例如：

```text
postgresql+psycopg://user:password@db:5432/wuye
```

## 真实 AI

填写 `OPENAI_API_KEY`、`OPENAI_BASE_URL` 和 `OPENAI_MODEL`。DeepSeek 等 OpenAI-compatible 服务可通过修改 `OPENAI_BASE_URL` 与模型名接入。系统调用失败会回退到确定性模板，不会阻塞业务流程。

## 支付

- `STRIPE_SECRET_KEY` 为空：使用 mock 支付，仅适合本地演示。
- 配置 Stripe：调用 `/api/payments/create`，请求 `{"order_id":"...","method":"stripe"}` 获取 Checkout URL。
- 生产环境必须使用 Stripe 官方签名校验处理 webhook，并把支付成功以 webhook 作为最终依据；当前 webhook 入口仅是演示适配层。

## 合规

所有生成文书均为草稿和信息整理参考，不构成法律意见，不保证特定法律效果。上线前应补充隐私政策、数据保留策略、访问控制、审计日志和正式支付 webhook 验签。
