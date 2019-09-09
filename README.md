## 起動の仕方
### nodeの起動
DEBUG=my-application ./node/bin/www

### reactの起動
yarn start:front

### mockデータのimport
mongoimport -h localhost:27017 --db chatapp --collection users --drop --jsonArray --file node/db/mock/users.json
mongoimport -h localhost:27017 --db chatapp --collection saketypes --drop --jsonArray --file node/db/mock/sake-types.json

### mongodbのjsファイル実行
mongo --quiet node/db/mock/comand_test.js
