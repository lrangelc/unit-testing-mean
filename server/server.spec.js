it("funciona", () => {
  expect(true).toBeTruthy();
});

const express = require("express");
const logger = require("morgan");
const http = require("http");
const PinsRouter = require("./routes/pins");
const Pins = require("./models/Pins");
const request = require("request");
const app = express();

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
});
