function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      { abortEarly: false, stripUnknown: true }
    );

    if (error) {
      const err = new Error("Validation error");
      err.statusCode = 400;
      err.details = error.details.map((d) => d.message);
      return next(err);
    }

    req.body = value.body || req.body;
    req.query = value.query || req.query;
    req.params = value.params || req.params;

    return next();
  };
}

module.exports = { validate };
