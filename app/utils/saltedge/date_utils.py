from datetime import datetime, timedelta


def get_timedelta_str(delta: int = 0) -> str:
    today = datetime.today().date()
    result = today - timedelta(days=delta * -1)
    return result.strftime("%Y-%m-%d")
