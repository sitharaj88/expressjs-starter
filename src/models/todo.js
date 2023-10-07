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

const MongoHelper = require("../common/database/mongoHelper");

/**
 * @constant TODO_DATABASE
 * @description The database name.
 * @type {string}
 * */
const TODO_DATABASE = "todo";

/**
 * @constant TODO_COLLECTION
 * @description The collection name.
 * @type {string}
 * */
const TODO_COLLECTION = "todos";

/**
 * @class TodoDao
 * @description This class is used to handle the database operations.
 * */
class TodoDao {
    /**
     * @constructor
     * @description The Constructor to initialize the MongoHelper.
     */
    constructor() {
        this.mongoHelper = new MongoHelper(TODO_DATABASE);
    }

    /**
     * @method addToDoItem
     * @description This method is used to add the todo item.
     * @param {object} todoItem - The todo item.
     * @returns {Promise<object>} The result.
     */
    async addToDoItem(todoItem) {
        const result = await this.mongoHelper.insert(TODO_COLLECTION, todoItem);
        return result;
    }

    /**
     * @method getToDoItem
     * @description This method is used to get the todo item.
     * @param {object} todoItem - The todo item.
     * @returns {Promise<object>} The result.
     */
    async getToDoItem() {
        const query = {};
        const result = await this.mongoHelper.find(TODO_COLLECTION, query);
        return result;
    }

    /**
     * @method deleteToDoItem
     * @description This method is used to delete the todo item.
     * @param {object} todoItem - The todo item.
     * @returns {Promise<object>} The result.
     * */
    async deleteToDoItem(id) {
        const query = { _id: id };
        const result = await this.mongoHelper.delete(TODO_COLLECTION, query);
        return result;
    }

    /**
     * @method updateToDoItem
     * @description This method is used to update the todo item.
     * @param {object} todoItem - The todo item.
     * @returns {Promise<object>} The result.
     */
    async updateToDoItem(id, todoItem) {
        const query = { _id: id };
        const result = await this.mongoHelper.update(TODO_COLLECTION, query, todoItem);
        return result;
    }

    /**
     * @method deleteAllToDoItem
     * @description This method is used to delete all the todo item.
     * @param {object} todoItem - The todo item.
     * @returns {Promise<object>} The result.
     */
    async deleteAllToDoItem() {
        const query = {};
        const result = await this.mongoHelper.deleteMany(TODO_COLLECTION, query);
        return result;
    }

    /**
     * @method updateAllToDoItem
     * @description This method is used to update all the todo item.
     * @param {object} todoItem - The todo item.
     * @returns {Promise<object>} The result.
     */
    async updateAllToDoItem(todoItem) {
        const query = {};
        const result = await this.mongoHelper.updateMany(TODO_COLLECTION, query, todoItem);
        return result;
    }

    /**
     * @method getToDoItemById
     * @description This method is used to get the todo item by id.
     * @param {object} todoItem - The todo item.
     * @returns {Promise<object>} The result.
     */
    async getToDoItemById(id) {
        const query = { _id: id };
        const result = await this.mongoHelper.findOne(TODO_COLLECTION, query);
        return result;
    }
}

module.exports = new TodoDao();
