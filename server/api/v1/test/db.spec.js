
import chai from "chai";
import pool from "../database/db_con";

const { expect } = chai;

describe("DB test", () => {
  describe("/Create table test and drop it", () => {
    it("It is expected for a table to be created", done => {
      const queryText = `CREATE TABLE IF NOT EXISTS test( id SERIAL)`;
      pool(queryText)
        .then(res => {
          expect(res).to.have.property("command").eql("CREATE");
          expect(res).to.have.property("rowCount").eql(null);
          done();
        })
        .catch(err => {
          done();
        });
    });

    it("It is expected for a table to be dropped", done => {
      const queryText = "DROP TABLE IF EXISTS test";
      pool(queryText)
        .then(res => {
          const {length} = res
          expect(res).to.be.an("array");
          expect(length).to.be.eql(0);
          done();
        })
        .catch(err => {
          done();
        });
    });
  });
});