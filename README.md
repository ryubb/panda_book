## 起動の仕方
### nodeの起動
DEBUG=my-application ./node/bin/www
→yarn start:node

### reactの起動
yarn start:front

### sequelize-cliの使い方
npx sequelize-cli [コマンド]

### DEの作成の仕方
npx sequelize db:create
ex) npx sequelize model:create --underscored --name user --attributes "user_name:string,age:integer"

### migration
npx sequelize db:migrate