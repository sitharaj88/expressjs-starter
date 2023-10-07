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

const winston = require("winston");

/**
 * @constant logFormat
 * @description logFormat constant is used to format the log.
 */
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

/**
 * @constant logger
 * @description logger constant is used to create a logger.
 */
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.timestamp(), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

/**
 * @function handleExceptions
 * @description handleExceptions method is used to handle the exceptions.
 * @param {object} logger - The logger object.
 * @param {object} transport - The transport object.
 * @returns {void}
 */
logger.handleExceptions(
  new winston.transports.Console({ colorize: true, prettyPrint: true }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

/**
 * @function handleRejections
 * @description handleRejections method is used to handle the rejections.
 * @param {object} logger - The logger object.
 * @param {object} transport - The transport object.
 * @returns {void}
 */
process.on("unhandledRejection", (ex) => {
  throw ex;
});

module.exports = logger;
