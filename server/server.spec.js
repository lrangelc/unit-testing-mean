it("funciona", () => {
  expect(true).toBeTruthy();
});

const express = require("express");
const logger = require("morgan");
const http = require("http");
const PinsRouter = require("./routes/pins");
const Pins = require("./models/Pins");
const request = require("request");
const axios = require("axios");
const { callbackify } = require("util");
const app = express();
var requestPromise = require("request-promise-native");

app.use(logger("dev"));
app.use(express.json());
app.use("/api", PinsRouter.router);
app.set("port", 3000);

describe("Testing Router", () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  describe("GET", () => {
    // GET 200
    it("200 and find pin", (done) => {
      const data = [{ id: 1, name: "Luis" }];
      spyOn(Pins, "find").and.callFake((callBack) => {
        callBack(false, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{ id: 1, name: "Luis" }]);
        done();
      });
    });

    // GET 500
    it("500", (done) => {
      const data = [{ id: 1, name: "Luis" }];
      spyOn(Pins, "find").and.callFake((callBack) => {
        callBack(true, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });

    // Get 200 FindById
    it("200 and findById pin", (done) => {
      const data = { id: 1 };
      /* Dentro del Objeto Pins queremos espiar el metodo findById y ejecutamos nuestro propio metodo */
      spyOn(Pins, "findById").and.callFake((id, callBack) => {
        data.param = id;
        callBack(false, data);
      });

      request.get(
        "http://localhost:3000/api/21312",
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          expect(error).toBe(null);
          expect(JSON.parse(response.body)).toEqual({ id: 1, param: "21312" });
          expect(JSON.parse(response.body).id).toEqual(1);
          expect(JSON.parse(body).param).toEqual("21312");
          done();
        }
      );
    });

    //GET 500 FindById
    it("500", (done) => {
      const data = [{ id: 1 }];
      /* Dentro del Objeto Pins queremos espiar el metodo find y ejecutamos nuestro propio metodo */
      spyOn(Pins, "findById").and.callFake((id, callBack) => {
        callBack(true, data);
      });

      request.get(
        "http://localhost:3000/api/21312",
        (error, response, body) => {
          expect(response.statusCode).toBe(500);
          done();
        }
      );
    });
  });

  describe("POST", () => {
    it("200", (done) => {
      const post = [
        {
          title: "Platzi",
          author: "Platzi",
          description: "Platzi rules",
          percentage: 0,
          tags: [],
          assets: [
            {
              title: "Platzi",
              description: "description",
              readed: false,
              url: "http://platzi.com",
            },
          ],
        },
      ];

      spyOn(Pins, "create").and.callFake((pin, callBack) => {
        callBack(false, {});
      });

      spyOn(requestPromise, "get").and.returnValue(
        Promise.resolve(
          '<title>Platzi</title><meta name="description" content="Platzi rules">'
        )
      );

      const assets = [{ url: "http://platzi.com" }];

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets,
        })
        .then((res) => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it("200 PDF", (done) => {
      spyOn(Pins, "create").and.callFake((pins, callback) => {
        callback(false, {});
      });

      const assets = [{ url: "http://platzi.pdf" }];

      axios
        .post("htpp://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets,
        })
        .then((res) => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it("llamar a recurso /api/ flujo cuando la url es un .pdf o .png esperando 500", (done) => {
      spyOn(Pins, "create").and.callFake((pins, callback) => {
        callback(true, null);
      });

      request.post(
        "http://localhost:3000/api/",
        { json: { assets: [] } },
        (error, response, body) => {
          expect(response.statusCode).toBe(500);
          done();
        }
      );
    });

    it("llamar a recurso /api/ flujo cuando la url es un .pdf o .png esperando 463", (done) => {
      spyOn(Pins, "create").and.callFake((pins, callback) => {
        callback(false, {});
      });

      request.post(
        "http://localhost:3000/api/",
        { json: { assets: [{ url: "http://prueba.com" }] } },
        (error, response, body) => {
          expect(response.statusCode).toBe(463);
          done();
        }
      );
    });
  });

  describe("Testing PUT", () => {
    it("llamar a recurso /api/:id esperando 200", (done) => {
      spyOn(Pins, "findByIdAndUpdate").and.callFake((id, body, callback) => {
        callback(false, {});
      });

      request.put("http://localhost:3000/api/1005", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("llamar a recurso /api/:id esperando 500", (done) => {
      spyOn(Pins, "findByIdAndUpdate").and.callFake((id, body, callback) => {
        callback(true, null);
      });

      request.put("http://localhost:3000/api/1005", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe("Testing DELETE", () => {
    it("llamar a recurso /api/:id esperando 200", (done) => {
      spyOn(Pins, "findByIdAndRemove").and.callFake((id, body, callback) => {
        callback(false, {});
      });

      request.delete(
        "http://localhost:3000/api/1006",
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    });

    it("llamar a recurso /api/:id esperando 500", (done) => {
      spyOn(Pins, "findByIdAndRemove").and.callFake((id, body, callback) => {
        callback(true, null);
      });

      request.delete(
        "http://localhost:3000/api/1006",
        (error, response, body) => {
          expect(response.statusCode).toBe(500);
          done();
        }
      );
    });
  });
});
