from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_id: str
    secret: str
    db_user: str
    db_password: str
    db_port: int
    db_server: str
    db_name: str
    debug_mode: bool = False

    class Config:
        env_file = ".env"

    @property
    def database_url(self) -> str:
        return f"postgresql://{self.db_user}:{self.db_password}@{self.db_server}:{self.db_port}/{self.db_name}"

    @property
    def test_database_url(self) -> str:
        return f"postgresql://test_{self.db_user}:test_{self.db_password}@test_{self.db_server}:{self.db_port+1}/test_{self.db_name}"


settings = Settings()
