const express = require('express');
const { destroy, update } = require('./user.ctrl');
const router = express.Router(); //라우터 객체
const ctrl = require('./user.ctrl');
const app = express();
//컨트롤러 함수 바인딩
//책임분리
router.get('/', ctrl.index);

router.get('/:id', ctrl.show);

router.delete('/:id', ctrl.destroy);

router.post('/', ctrl.create);

router.put('/:id', ctrl.update);

module.exports = router;
module.exports = app;
