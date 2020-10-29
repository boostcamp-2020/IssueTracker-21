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

/* 마일스톤 삽입 테스트*/
describe("POST /api/milestone - 마일스톤 삽입", () => {
  // 마일스톤 삽입
  it("should return 200 and insert new data", (done) => {
    request(app)
      .post("/api/milestone")
      .send({
        title: "Milestone1",
        description: "test1",
        dueDate: "2020-10-10T00:00:00.000Z",
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  //삽입된 마일스톤이 존재하는지 확인
  it("should exist data", (done) => {
    request(app)
      .get("/api/milestone")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.milestones.should.matchAny(function (it) {
          it.should.have.properties({
            title: "Milestone1",
            description: "test1",
          });
        });
        done();
      });
  });
});
