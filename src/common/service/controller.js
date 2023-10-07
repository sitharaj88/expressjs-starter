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

const { successResponse, errorResponse } = require("./responseHandler");
const Error = require("../utils/errors");

/**
 * @function controller
 * @description controller method is used to handle the request and response.
 * @param {function} validate - The validate function.
 * @param {function} process - The process function.
 * @returns {function} - The controller function.
 */
const controller = (validate, process) => {
  return async (req, res) => {
    try {
      // Validation Stage - Request Validation
      if (validate) {
        validate(req);
      }

      // Processing Stage - Business Logic
      const result = await process(req);

      // Response Handling Stage using the centralized handler
      successResponse(res, result.data, result.statusCode);
    } catch (err) {
      // Error Handling Stage using the centralized handler
      errorResponse(res, err);
    }
  };
};

module.exports = controller;
