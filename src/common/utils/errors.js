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
 * @constant Errors
 * @description Errors constant is used to store the error details.
 * @returns {object}
 */
const Errors = {
  BAD_REQUEST: {
    statusCode: 400,
    code: 1001,
    message: "Bad Request",
  },
  NOT_FOUND: {
    statusCode: 404,
    code: 1002,
    message: "Resource Not Found",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    code: 1003,
    message: "Internal Server Error",
  },
  UNAUTHORIZED: {
    statusCode: 401,
    code: 1004,
    message: "Unauthorized",
  },
};

/**
 *
 * @class ApplicationError
 * @description ApplicationError class is used to handle the application error.
 * @extends Error
 * */
class ApplicationError extends Error {
  /**
   * @constructor
   * @param {object} error - The error object.
   * @param {string} additionalInfo - The additional information about error.
   * */
  constructor(error, additionalInfo = "") {
    super(error.message);
    this.error = {
      ...error,
      message: error.message + (additionalInfo ? `: ${additionalInfo}` : ""),
    };
  }
}

/**
 * @class BadRequestError
 * @description BadRequestError class is used to handle the bad request error.
 * @extends ApplicationError
 * */
class BadRequestError extends ApplicationError {
  /**
   * @constructor
   * @param {string} additionalInfo - The additional information about bad request error.
   * */
  constructor(additionalInfo) {
    super(Errors.BAD_REQUEST, additionalInfo);
  }
}

/**
 * @class NotFoundError
 * @description NotFoundError class is used to handle the not found error.
 * @extends ApplicationError
 */
class NotFoundError extends ApplicationError {
  /**
   * @constructor
   * @param {string} additionalInfo - The additional information about not found error.
   * */
  constructor(additionalInfo) {
    super(Errors.NOT_FOUND, additionalInfo);
  }
}

/**
 * @class InternalServerError
 * @description InternalServerError class is used to handle the internal server error.
 * @extends ApplicationError
 */
class InternalServerError extends ApplicationError {
  /**
   * @constructor
   * @param {string} additionalInfo - The additional information about internal server error.
   * */
  constructor(additionalInfo) {
    super(Errors.INTERNAL_SERVER_ERROR, additionalInfo);
  }
}

/**
 * @class UnauthorizedError
 * @description UnauthorizedError class is used to handle the unauthorized error.
 * @extends ApplicationError
 */
class UnauthorizedError extends ApplicationError {
  /**
   * @constructor
   * @param {string} additionalInfo - The additional information about unauthorized error.
   * */
  constructor(additionalInfo) {
    super(Errors.UNAUTHORIZED, additionalInfo);
  }
}

module.exports = {
  Errors,
  ApplicationError,
  BadRequestError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
};
