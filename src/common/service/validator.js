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

/**
 * @function validate
 * @description validate method is used to validate the request.
 * @param {object} data - The data object.
 * @param {array} requiredParams - The requiredParams array.
 * @param {string} type - The type string.
 * @throws {BadRequestError} - The BadRequestError.
 * @returns {void}
 */
const validate = (data, requiredParams, type) => {
  const { BadRequestError } = require("../utils/errors");
  const message = [];

  requiredParams.forEach((param) => {
    !data?.[param] && message.push(`${param} ${type} is required`);
  });

  if (message.length > 0) {
    throw new BadRequestError(message.join(", "));
  }
};

/**
 * @function validateBody
 * @description validateBody method is used to validate the request body.
 * @param {object} body - The body object.
 * @param {array} requiredParams - The requiredParams array.
 * @throws {BadRequestError} - The BadRequestError.
 * @returns {void}
 */
const validateBody = (body, requiredParams) => {
  validate(body, requiredParams, "body");
};

/**
 * @function validateQuery
 * @description validateQuery method is used to validate the request query.
 * @param {object} query - The query object.
 * @param {array} requiredParams - The requiredParams array.
 * @throws {BadRequestError} - The BadRequestError.
 * @returns {void}
 */
const validateQuery = (query, requiredParams) => {
  validate(query, requiredParams, "query");
};

/**
 * @function validateParams
 * @description validateParams method is used to validate the request params.
 * @param {object} params - The params object.
 * @param {array} requiredParams - The requiredParams array.
 * @throws {BadRequestError} - The BadRequestError.
 * @returns {void}
 */
const validateParams = (params, requiredParams) => {
  validate(params, requiredParams, "params");
};

/**
 * @function validateHeaders
 * @description validateHeaders method is used to validate the request headers.
 * @param {object} headers - The headers object.
 * @param {array} requiredParams - The requiredParams array.
 * @throws {BadRequestError} - The BadRequestError.
 * @returns {void}
 */
const validateHeaders = (headers, requiredParams) => {
  validate(headers, requiredParams, "headers");
};

module.exports = {
  validateBody,
  validateQuery,
  validateParams,
  validateHeaders,
};
