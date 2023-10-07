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

const MongoDBConfig = require("./mongoDB");

/**
 * @class MongoHelper
 * @description MongoHelper class is used to perform the database operations.
 * @param {string} dbName - The database name.
 * */
class MongoHelper {
  /**
   * @constructor
   * @description constructor method is used to initialize the MongoDBConfig.
   * */
  constructor(dbName) {
    this.dbName = dbName;
    this.client = MongoDBConfig.client;
  }

  /**
   * @memberof MongoHelper
   * @method createCollection
   * @description createCollection method is used to create a collection.
   * @param {string} collectionName - The collection name.
   * @returns {Promise} - The result.
   * */
  async createCollection(collectionName) {
    const db = this.client.db(this.dbName);
    const result = await db.createCollection(collectionName);
    return result;
  }

  /**
   * @memberof MongoHelper
   * @method dropCollection
   * @description dropCollection method is used to drop a collection.
   * @param {string} collectionName - The collection name.
   * @returns {Promise} - The result.
   * */
  async dropCollection(collectionName) {
    const db = this.client.db(this.dbName);
    const result = await db.dropCollection(collectionName);
    return result;
  }

  /**
   * @memberof MongoHelper
   * @method isCollectionExists
   * @description isCollectionExists method is used to check whether the collection exists or not.
   * @param {string} collectionName - The collection name.
   * @returns {Promise} - The result.
   * */
  async isCollectionExists(collectionName) {
    const db = this.client.db(this.dbName);
    const collections = await db.listCollections().toArray();
    const collection = collections.find((c) => c.name === collectionName);
    return collection !== undefined;
  }

  /**
   * @memberof MongoHelper
   * @method getCollection
   * @description getCollection method is used to get the collection.
   * @param {string} collectionName - The collection name.
   * @returns {Promise} - The result.
   * */
  getCollection(collectionName) {
    if (!this.isCollectionExists(collectionName)) {
      this.createCollection(collectionName);
    }
    return this.client.db(this.dbName).collection(collectionName);
  }

  /**
   * @memberof MongoHelper
   * @method insert
   * @description insert method is used to insert a document.
   * @param {string} collectionName - The collection name.
   * @param {object} data - The data.
   * @returns {Promise} - The result.
   * */
  async insert(collectionName, data) {
    const collection = this.getCollection(collectionName);
    const result = await collection.insertOne(data);
    return result;
  }

  /**
   * @memberof MongoHelper
   * @method insertMany
   * @description insertMany method is used to insert many documents.
   * @param {string} collectionName - The collection name.
   * @param {object} data - The data.
   * @returns {Promise} - The result.
   * */
  async insertMany(collectionName, data) {
    const collection = this.getCollection(collectionName);
    const result = await collection.insertMany(data);
    return result;
  }

  /**
   * @memberof MongoHelper
   * @method delete
   * @description delete method is used to delete a document.
   * @param {string} collectionName - The collection name.
   * @param {object} query - The query.
   * @returns {Promise} - The result.
   * */
  async delete(collectionName, query) {
    const collection = this.getCollection(collectionName);
    const result = await collection.deleteOne(query);
    return result;
  }

  /**
   * @memberof MongoHelper
   * @method deleteMany
   * @description deleteMany method is used to delete many documents.
   * @param {string} collectionName - The collection name.
   * @param {object} query - The query.
   * @returns {Promise} - The result.
   * */
  async deleteMany(collectionName, query) {
    const collection = this.getCollection(collectionName);
    const result = await collection.deleteMany(query);
    return result;
  }

  /**
   * @memberof MongoHelper
   * @method find
   * @description find method is used to find the documents.
   * @param {string} collectionName - The collection name.
   * @param {object} query - The query.
   * @returns {Promise} - The result.
   * */
  async find(collectionName, query) {
    const collection = this.getCollection(collectionName);
    const result = await collection.find(query).toArray();
    return result;
  }

  /**
   * @memberof MongoHelper
   * @method findOne
   * @description findOne method is used to find a document.
   * @param {string} collectionName - The collection name.
   * @param {object} query - The query.
   * @returns {Promise} - The result.
   * */
  async findOne(collectionName, query) {
    const collection = this.getCollection(collectionName);
    const result = await collection.findOne(query);
    return result;
  }

  /**
   * @memberof MongoHelper
   * @method update
   * @description update method is used to update a document.
   * @param {string} collectionName - The collection name.
   * @param {object} query - The query.
   * @param {object} data - The data.
   * @returns {Promise} - The result.
   * */
  async update(collectionName, query, data) {
    const collection = this.getCollection(collectionName);
    const result = await collection.updateOne(query, { $set: data });
    return result;
  }

  /**
   * @memberof MongoHelper
   * @method updateMany
   * @description updateMany method is used to update many documents.
   * @param {string} collectionName - The collection name.
   * @param {object} query - The query.
   * @param {object} data - The data.
   * @returns {Promise} - The result.
   * */
  async updateMany(collectionName, query, data) {
    const collection = this.getCollection(collectionName);
    const result = await collection.updateMany(query, { $set: data });
    return result;
  }
}

module.exports = MongoHelper;
