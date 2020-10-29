const request = require("supertest");
const should = require("should");
const app = require("../../../app");

/* 라벨 조회 테스트*/
describe("GET /api/label - 라벨 조회", () => {
  //라벨 조회 200 상태코드 리턴 확인
  it("should return 200 status code", (done) => {
    request(app)
      .get("/api/label")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });
  // 라벨 조회 success인지 확인
  it("should return success", (done) => {
    request(app)
      .get("/api/label")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.properties({ success: true });
        done();
      });
  });
});

/* 라벨 삽입 테스트*/
describe("POST /api/label - 라벨 삽입", () => {
  // 라벨 삽입
  it("should return 200 and insert new data", (done) => {
    request(app)
      .post("/api/label")
      .send({
        name: "testLabel1",
        description: "testDescription1",
        color: "test1",
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  //삽입된 라벨이 존재하는지 확인
  it("should exist data", (done) => {
    request(app)
      .get("/api/label")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.labels.should.matchAny(function (it) {
          it.should.have.properties({
            name: "testLabel1",
            description: "testDescription1",
            color: "test1",
          });
        });
      });

    done();
  });
});

/* 라벨 수정 테스트*/
describe("PUT /api/label - 라벨 수정", () => {
  let label_id;

  //db에 있는 label id 미리 가져오기
  before(() => {
    return new Promise((resolve) => {
      request(app)
        .get("/api/label")
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          label_id = res.body.labels[res.body.labels.length - 1].id;
          resolve();
        });
    });
  });

  //db 수정
  it("should return success and change data", (done) => {
    request(app)
      .put("/api/label")
      .send({
        labelId: label_id,
        name: "testLabel2",
        description: "testDescription2",
        color: "test2",
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.properties({ success: true });
        done();
      });
  });

  //수정되었는지 확인
  it("should exist changed data", (done) => {
    request(app)
      .get("/api/label")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.labels.should.matchAny(function (it) {
          it.should.have.properties({
            name: "testLabel2",
            description: "testDescription2",
            color: "test2",
          });
        });
      });

    done();
  });

  // 수정 전 데이터가 없어졌는지 확인
  it("should not exist original data", (done) => {
    request(app)
      .get("/api/label")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.labels.should.not.matchAny(function (it) {
          it.should.have.properties({
            name: "testLabel1",
            description: "testDescription1",
            color: "test1",
          });
        });
      });
    done();
  });
});

/* 라벨 삭제 테스트*/
describe("DELETE /api/label - 라벨 수정", () => {
  let label_id;

  //db에 있는 label id 미리 가져오기
  before(() => {
    return new Promise((resolve) => {
      request(app)
        .get("/api/label")
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          label_id = res.body.labels[res.body.labels.length - 1].id;
          resolve();
        });
    });
  });

  //db label 삭제
  it("should return success and delete label", (done) => {
    request(app)
      .delete("/api/label")
      .send({
        labelId: label_id,
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.properties({ success: true });
        done();
      });
  });

  // 지운 데이터가 없어졌는지 확인
  it("should not exist original data", (done) => {
    request(app)
      .get("/api/label")
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.labels.should.not.matchAny(function (it) {
          it.should.have.properties({
            id: label_id,
          });
        });
      });
    done();
  });
});
