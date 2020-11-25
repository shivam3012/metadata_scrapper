/* eslint-disable object-shorthand,max-len */
function response(res, data, message, status, error) {
  const responseData = {
    status,
    message,
    data: data,
    error: error || null,
  };
  res.status(status);
  res.format({
    json: () => {
      res.json(responseData);
    },
  });
}


module.exports = {
  response
};
