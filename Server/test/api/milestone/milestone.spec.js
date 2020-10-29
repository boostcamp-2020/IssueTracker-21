const request = require("supertest");
const should = require("should");
const app = require("../../../app");

/* 마일스톤 조회 테스트*/
describe("GET /api/milestone - 마일스톤 조회", () => {
  //마일스톤 조회 200 상태코드 리턴 확인
  it("should return 200 status code", (done) => {
    request(app)
      .get("/api/milestone")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
  // 마일스톤 조회 success인지 확인
  it("should return success", (done) => {
    request(app)
      .get("/api/milestone")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.properties({ success: true });
        done();
      });
  });
});
