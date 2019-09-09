// eslint-disable-next-line no-undef
const DB1 = db.getMongo().getDB("chatapp");

const user = DB1.users.findOne();
const timeline = { content: "テスト", user: user._id };

DB1.timelines.save(timeline);
