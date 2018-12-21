import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";


chai.use(chaiHttp);
const {expect} = chai;
describe("Express server test", () => {
  it("It is expected to return a message", done => {
    chai
      .request(server)
      .get("/api/v1")
      .end((err, res)  => {
        const {body} = res;
        expect(res).to.have.status(200);
        expect(body).to.be.an("object");
        expect(body).to.have.property("message").eql("SEND IT API base route");
        done();
      });
  });
});