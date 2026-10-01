# 物业易催款

AI 物业费催缴通知书与律师函自动生成平台 MVP。

## 技术栈

- `frontend`: Next.js 14 + TypeScript + Tailwind CSS
- `backend`: FastAPI + Pydantic
- `docker-compose`: 一键启动前后端服务

## 本地运行

### 方式一：Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

- 前端：http://localhost:3000
- 后端 API：http://localhost:8000
- API 文档：http://localhost:8000/docs

### 方式二：分别运行

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

另开终端：

```bash
cd frontend
npm install
npm run dev
```

## 当前 MVP 能力

- SEO 友好的产品首页
- 物业费催缴文书生成表单
- 催缴通知书、限期缴费通知书、律师函、起诉前告知书四种文书类型
- 后端模板化生成服务（未配置 AI 时可直接运行）
- 在线预览、复制文书内容
- 物业费欠费计算器
- FastAPI Swagger 接口文档

## 环境变量

复制 `.env.example` 为 `.env`，生产环境请替换密钥。AI 接口为可选配置；未配置时使用安全的模板生成逻辑。

## 合规说明

本项目生成内容仅供信息整理和文书草拟参考，不构成法律意见，也不保证特定法律效果。正式发函或提起诉讼前，应由物业公司核验合同、欠费事实及当地法规，必要时咨询执业律师。
