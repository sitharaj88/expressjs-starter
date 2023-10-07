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
 * @function successResponse
 * @description successResponse method is used to send the success response.
 * @param {object} res - The response object.
 * @param {object} data - The data object.
 * @param {number} statusCode - The status code.
 * @returns {void}
 * */
exports.successResponse = (res, data, statusCode) => {
  statusCode = statusCode || 200;
  res.status(statusCode).json({
    success: true,
    data: data,
  });
};

/**
 * @function errorResponse
 * @description errorResponse method is used to send the error response.
 * @param {object} res - The response object.
 * @param {object} applicationError - The application error object.
 * @returns {void}
 * */
exports.errorResponse = (res, applicationError) => {
  const error = applicationError.error;
  res.status(error.statusCode).json({
    success: false,
    errorCode: error.code,
    errorMessage: error.message,
  });
};
