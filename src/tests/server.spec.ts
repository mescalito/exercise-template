import * as chai from "chai";
import chaiHttp = require("chai-http");
import Server from "../server";

chai.should();
chai.use(chaiHttp);

let app: Server;
before("Start server", () => {
    app = new Server();
    app.startServer();
})

const SERVER_URL = "http://localhost:5000";

describe("Server Tests", () => {
    describe("Get echo endpoint", () => {
        it("should get 400 when no query parameter 'q' present", (done) => {
            chai.request(SERVER_URL)
                .get('/echo')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it("should return success code with json respose of query parameter 'q'", (done) => {
            chai.request(SERVER_URL)
                .get('/echo')
                .query({ q: "query" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.type.should.equal("application/json")
                    res.text.should.equal(JSON.stringify({ q: 'query' }));
                    done();
                });
        });
    });
});

after("Server process teardown", () => {
    setTimeout(() => process.exit(0), 500);
})
