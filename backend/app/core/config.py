from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str

    SUPABASE_JWT_SECRET: Optional[str] = None

    MQTT_BROKER: str = "localhost"
    MQTT_PORT: int = 1883

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()