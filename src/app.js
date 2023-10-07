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
require("dotenv").config();
const MongoDBConfig = require("./common/database/mongoDB");
const logger = require("./common/logger/logger");

/**
 * @class ExpressApp
 * @description This class is used to initialize the express application.
 */
class ExpressApp {
  /**
   * @method init
   * @description This method is used to initialize the express application.
   * @returns {void}
   */
  init() {
    this.express = require("express");
    this.app = this.express();

    this.middleware();
    this.services();
    this.routes();

    this.app.listen(3000, () => {
      console.log("Listening on port 3000");
    });

    logger.info(`Environment is ${process.env.ENVIRONMENT}`);
  }

  /**
   * @method middleware
   * @description This method is used to initialize the middleware.
   * @returns {void}
   */
  middleware() {
    const middlewares = require("./middleware");
    this.app.use(middlewares);
  }

  /**
   * @method routes
   * @description This method is used to initialize the routes.
   * @returns {void}
   */
  routes() {
    const routes = require("./routes");
    this.app.use(routes);
  }

  /**
   * @method services
   * @description This method is used to initialize the services.
   * @returns {void}
   */
  services() {
    MongoDBConfig.connect();
  }
}

module.exports = new ExpressApp();
