from datetime import datetime

from app.utils.saltedge.date_utils import get_timedelta_str


def test_get_timedelta_str(mocker):
    mock_date = datetime(2024, 7, 29)
    mocker.patch(
        "app.utils.saltedge.date_utils.datetime"
    ).today.return_value = mock_date
    assert get_timedelta_str() == "2024-07-29"


def test_get_timedelta_str_yesterday(mocker):
    mock_date = datetime(2024, 7, 29)
    mocker.patch(
        "app.utils.saltedge.date_utils.datetime"
    ).today.return_value = mock_date
    assert get_timedelta_str(-1) == "2024-07-28"
