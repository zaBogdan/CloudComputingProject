class CustomStatusCodeError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "CustomStatusCodeError";
    this.statusCode = statusCode;
  }
}

module.exports = CustomStatusCodeError;
