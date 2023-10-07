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

const TodoDao = require("../../models/todo");
const {
  successResponse,
  errorResponse,
} = require("../../common/service/responseHandler");

const { BadRequestError } = require("../../common/utils/errors");

/**
 * @function processAddTodo
 * @description This function is used to process the add todo request.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The processed response object.
 */
const processAddTodo = async (req, res) => {
  const { id, title, description } = req.body;
  const todo = {
    id,
    title,
    description,
  };

  const result = await TodoDao.addToDoItem(todo);

  if (!result) {
    throw new BadRequestError("Todo not added");
  }
  return { statusCode: 201, data: result };
};

/**
 * @function processUpdateTodo
 * @description This function is used to process the update todo request.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The processed response object.
 */
const processUpdateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const todo = {
    title,
    description,
  };

  const result = await TodoDao.updateToDoItem(id, todo);

  if (!result) {
    throw new BadRequestError("Todo not updated");
  }

  return { data: result };
};

module.exports = { processAddTodo, processUpdateTodo };
