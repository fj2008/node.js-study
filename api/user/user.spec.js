const app = require('../../index');
const request = require('supertest');
const should = require('should');
const models = require('../../bin/models');
//api테스트 코드를 만들때 테스트수트에 api이름을사용한다.
describe('GET /users는', () => {
    describe('성공시', () => {
        before(() => models.sequelize.sync({ force: true })); //db싱크는 비동기로작동}); //it이 실행되기전에 실행되는
        it('유저 객체를 담은 배열로 응답한다', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                });
        });
    });
    it('최대 limit 갯수 만큼 응답한다', (done) => {
        request(app)
            .get('/users?limit=2')
            .end((err, res) => {
                res.body.should.have.lengthOf(2);
                done();
            });
    });
    describe('실패시', () => {
        it('limit의 숫자형이 아니면 400을 응답한다', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end((err, res) => {
                    done();
                });
        });
    });
});

describe('get /user/1 ', () => {
    describe('성공시', () => {
        it('id가 1인 함수를 돌려준다.', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400 으로 응답한다.', (done) => {
            request(app).get('/users/one').expect(400).end(done);
        });
    });
});
describe('delete /user/1', () => {
    describe('성공시', () => {
        it('204를 응답한다', (done) => {
            request(app).delete('/users/1').expect(204).end(done);
        });
    });
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다.', (done) => {
            request(app).delete('/users/one').expect(400).end(done);
        });
    });
});

describe('POST /users는 ', () => {
    let name = 'danial',
        body;
    describe('성공시', () => {
        before((done) => {
            request(app)
                .post('/users')
                .send({ name })
                .expect(201)
                .end((err, res) => {
                    body = res.body;
                    done();
                });
        }); //실제 요청의 post매서드를 실행해서 넣어놓는다
        it('생성된 유저객체를 반환한다.', () => {
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다', () => {
            body.should.have.property('name', name);
        });
    });
    describe('실패시', () => {
        it('name 파라메터 누락시 400을 반환한다.', (done) => {
            request(app).post('/users').send({}).end(done);
        });
        it('name 중복일경우에 409를 반환한다.', (done) => {
            request(app).post('/users').send({ name: 'alice' }).expect(409).end(done);
        });
    });
});

describe('PUT /users/:id는', () => {
    describe('성공시', () => {
        it('변경된 name을 응답한다.', (done) => {
            const name = 'chally';
            request(app)
                .put('/users/3')
                .send({ name })
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        });
    });
    describe('실패시', () => {
        it('정수가 아닌 id일 경우 400을 응답한다', (done) => {
            request(app).put('/users/1').expect(400).end(done);
        });
        it('name이 없을 경우 400을 응답하다', (done) => {
            request(app).put('/users/1').send({}).expect(400).end(done);
        });
        it('없을 경우 404을 응답하다', (done) => {
            request(app).put('/users/99').send({ name: 'sdlksd' }).expect(404).end(done);
        });
        it('중복인 이름일 경우 409을 응답하다', (done) => {
            request(app).put('/users/2').send({ name: 'bek' }).expect(409).end(done);
        });
    });
});
