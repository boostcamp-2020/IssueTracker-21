const request = require("supertest");
const should = require("should");
const app = require("../../../app");

/* 로그인 테스트*/
describe("POST /api/user/login - 로그인", () => {
  //로그인 200 상태코드 리턴 확인
  it("should return 200 status code", (done) => {
    request(app)
      .post("/api/user/login")
      .send({ userId: "test1", password: "password" })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  // 로그인 success인지 확인
  it("should return success", (done) => {
    request(app)
      .post("/api/user/login")
      .send({ userId: "test1", password: "password" })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.properties({ success: true });
        done();
      });
  });

  // 없는 아이디 로그인 false 인지 확인
  it("should return false", (done) => {
    request(app)
      .post("/api/user/login")
      .send({ userId: "noId", password: "nonono" })
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.properties({ success: false });
        done();
      });
  });
});
