from sqlalchemy import text
from .database import engine


def upgrade() -> None:
    """Minimal idempotent schema upgrade for existing SQLite databases."""
    if engine.url.get_backend_name() != "sqlite":
        return
    with engine.begin() as connection:
        existing = {row[1] for row in connection.execute(text("PRAGMA table_info(documents)"))}
        for column, definition in (("owner_name", "VARCHAR(100) DEFAULT ''"), ("property_address", "VARCHAR(300) DEFAULT ''"), ("overdue_amount", "FLOAT DEFAULT 0")):
            if column not in existing:
                connection.execute(text(f"ALTER TABLE documents ADD COLUMN {column} {definition}"))
