## 起動の仕方
### nodeの起動
DEBUG=my-application ./node/bin/www

### reactの起動
yarn start:front

### 他
yarn start:node:replace

### mockデータのimport
mongoimport -h localhost:27017 --db chatapp --collection saketypes --drop --jsonArray --file node/db/mock/sake-types.json
