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
npx sequelize db:migrate:undo:all

### seedファイルの作り方
npx sequelize seed:create --name my-seed-file
npx sequelize db:seed:all

### 魔法のコマンド
npx sequelize db:migrate:undo:all && npx sequelize db:migrate && npx sequelize db:seed:all

#### メモ
$ sequelize db:drop # dbを落とす
$ sequelize db:create # dbを作成
$ sequelize db:migrate # migrate実行
$ sequelize db:migrate:undo:all # 実行されたmigrateを全て取り消し
$ sequelize db:seed:all # 設定されていたseedファイルをmigrate
$ seqeulize db:seed:undo:all # seedファイルのmigrateを全て取り消し
