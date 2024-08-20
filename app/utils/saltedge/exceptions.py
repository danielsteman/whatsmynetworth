class CustomerAlreadyExists(Exception):
    def __init__(
        self,
        message: str = "Customer already exists in Saltedge",
        status_code: int = 409,
    ) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class CustomerCreationError(Exception):
    def __init__(
        self,
        message: str = "Something went wrong creating a customer in Saltedge",
        status_code: int = 500,
    ) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)
