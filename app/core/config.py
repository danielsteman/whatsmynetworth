from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_id: str
    secret: str
    db_user: str
    db_password: str
    db_server: str
    db_name: str
    debug_mode: bool = False

    class Config:
        env_file = ".env"

    @property
    def database_url(self) -> str:
        return f"postgresql://{self.db_user}:{self.db_password}@{self.db_server}/{self.db_name}"


settings = Settings()
