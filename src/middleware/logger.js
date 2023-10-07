/*
==============================================================================
The MIT License (MIT)
==============================================================================

Copyright (c) 2023 Sitharaj Seenivasan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

==============================================================================
*/

const loggers = require("../common/logger/logger");

/**
 * @constant loggerMiddleware
 * @description Logger middleware is used to log the request and response.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next function.
 * @returns {void}
 */
const loggerMiddleware = (req, res, next) => {
  const apiPath = req.path;

  loggers.info(
    `API Name: ${apiPath} | TransactionID: ${
      req.headers["x-transaction-id"]
    } | Request Body: ${JSON.stringify(
      req.body
    )} | Request Params: ${JSON.stringify(
      req.params
    )} | Request Query: ${JSON.stringify(req.query)}`
  );

  const originalSend = res.send;

  res.send = function (data) {
    loggers.info(
      `API Name: ${apiPath} | TransactionID: ${
        req.headers["x-transaction-id"]
      } | Response Body: ${JSON.stringify(data)}`
    );
    originalSend.apply(res, arguments);
  };

  next();
};

module.exports = loggerMiddleware;