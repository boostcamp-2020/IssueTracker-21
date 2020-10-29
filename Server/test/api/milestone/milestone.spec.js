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
            dueDate: "2020-10-10T00:00:00.000Z",
          });
        });
        done();
      });
  });
});

/* 마일스톤 수정 테스트*/
describe("PUT /api/milestone - 마일스톤 수정", () => {
  let milestone_id;

  //db에 있는 label id 미리 가져오기
  before(() => {
    return new Promise((resolve) => {
      request(app)
        .get("/api/milestone")
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          milestone_id = res.body.milestones[res.body.milestones.length - 1].id;
          resolve();
        });
    });
  });

  // 마일스톤 수정
  it("should return 200 and change data", (done) => {
    request(app)
      .put("/api/milestone")
      .send({
        milestoneId: milestone_id,
        title: "Milestone2",
        description: "test2",
        dueDate: "2020-12-12T00:00:00.000Z",
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  //수정된 마일스톤이 존재하는지 확인
  it("should exist data", (done) => {
    request(app)
      .get("/api/milestone")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.milestones.should.matchAny(function (it) {
          it.should.have.properties({
            id: milestone_id,
            title: "Milestone2",
            description: "test2",
            dueDate: "2020-12-12T00:00:00.000Z",
          });
        });
        done();
      });
  });

  //수정 전 마일스톤이 없는지 확인
  it("should not exist original data", (done) => {
    request(app)
      .get("/api/milestone")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.milestones.should.not.matchAny(function (it) {
          it.should.have.properties({
            id: milestone_id,
            title: "Milestone1",
            description: "test1",
            dueDate: "2020-10-10T00:00:00.000Z",
          });
        });
        done();
      });
  });
});

/* 마일스톤 삭제 테스트*/
describe("DELETE /api/milestone - 마일스톤 삭제", () => {
  let milestone_id;

  //db에 있는 label id 미리 가져오기
  before(() => {
    return new Promise((resolve) => {
      request(app)
        .get("/api/milestone")
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          milestone_id = res.body.milestones[res.body.milestones.length - 1].id;
          resolve();
        });
    });
  });

  // 마일스톤 삭제
  it("should return 200 and change data", (done) => {
    request(app)
      .delete("/api/milestone")
      .send({
        milestoneId: milestone_id,
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  //삭제 된 마일스톤이 존재하는지 확인
  it("should not exist data", (done) => {
    request(app)
      .get("/api/milestone")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.milestones.should.not.matchAny(function (it) {
          it.should.have.properties({
            id: milestone_id,
            title: "Milestone2",
            description: "test2",
            dueDate: "2020-12-12T00:00:00.000Z",
          });
        });
        done();
      });
  });
});
