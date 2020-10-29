const request = require("supertest");
const assert = require("assert");
const should = require("should");
const app = require("../../../app");
const commentModel = require("../../../models").comment;

/* 코멘트 삽입 테스트*/
describe("POST /api/comment - 코멘트 삽입", () => {
  // 코멘트 삽입
  it("should return 200 and insert new data", (done) => {
    request(app)
      .post("/api/comment")
      .send({
        authorId: "test1",
        issueId: 1,
        content: "mocha1",
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  //삽입된 코멘트가 존재하는지 확인
  it("should exist data", async () => {
    const commentDetail = await commentModel.findOne({
      where: {
        authorId: "test1",
        issueId: 1,
        content: "mocha1",
      },
    });
    let authorId = commentDetail.dataValues.authorId;
    let issueId = commentDetail.dataValues.issueId;
    let content = commentDetail.dataValues.content;

    authorId.should.equal("test1");
    issueId.should.equal(1);
    content.should.equal("mocha1");
  });
});

/* 코멘트 수정 테스트*/
describe("PUT /api/comment - 코멘트 수정", () => {
  let comment_id;

  //db에 있는 코멘트 id 미리 가져오기
  before(() => {
    return new Promise(async (resolve) => {
      const commentDetail = await commentModel.findOne({
        where: {
          authorId: "test1",
          issueId: 1,
          content: "mocha1",
        },
      });
      comment_id = commentDetail.dataValues.id;
      resolve();
    });
  });

  //코멘트 수정
  it("should return success and change data", (done) => {
    request(app)
      .put("/api/comment")
      .send({
        commentId: comment_id,
        authorId: "test2",
        issueId: 2,
        content: "mocha2",
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        res.body.should.have.properties({ success: true });
        done();
      });
  });

  //추가한 test 데이터 삭제
  after(() => {
    return new Promise(async (resolve) => {
      const commentDetail = await commentModel.destroy({
        where: {
          id: comment_id,
        },
      });
      resolve();
    });
  });
});
