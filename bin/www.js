const app = require('../api/user/index');

const syncDb = require('./sync-db');

syncDb().then((_) => {
    console.log('sync database');

    app.listen(3000, () => {
        console.log('서버구동완료');
    });
});
