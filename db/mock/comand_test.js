// eslint-disable-next-line no-undef
const DB1 = db.getMongo().getDB("test");

for (let i = 1; i <= 100; i += 1) {
  let user = {
    id: 1,
    name: "nanashi_" + i,
    created_on: new Date()
  };

  DB1.users.save(user);
}
