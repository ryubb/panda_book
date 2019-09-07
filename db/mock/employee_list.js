// eslint-disable-next-line no-undef
const DB1 = db.getMongo().getDB("test");
const nameList = ["田村", "山田", "中山", "佐藤", "佐々木", "吉田"];
const ageList = [30, 31, 37, 23, 33, 35];
const salaryList = [400000, 350000, 300000, 250000, 350000, 350000];

for (let i = 1; i <= 6; i += 1) {
  let employee = {
    employeeID: "emp00" + i,
    divisitionID: "ka00" + i,
    positionID: "yaku00" + i,
    employeeName: nameList[i - 1],
    age: ageList[i - 1],
    salary: salaryList[i - 1]
  };
  DB1.employee.save(employee);
}

const division1 = {
  divisitionID: "ka001",
  departmentID: "bu001",
  divisitionName: "営業１課"
};
const division2 = {
  divisitionID: "ka002",
  departmentID: "bu002",
  divisitionName: "営業２課"
};
const division3 = {
  divisitionID: "ka003",
  departmentID: "bu003",
  divisitionName: "企画課"
};
const division4 = {
  divisitionID: "ka004",
  departmentID: "bu004",
  divisitionName: "経理課"
};

DB1.division.save(division1);
DB1.division.save(division2);
DB1.division.save(division3);
DB1.division.save(division4);

const department1 = { departmentID: "bu001", departmentName: "営業部" };
const department2 = { departmentID: "bu002", departmentName: "企画部" };
const department3 = { departmentID: "bu003", departmentName: "経理部" };

DB1.department.save(department1);
DB1.department.save(department2);
DB1.department.save(department3);

const position1 = { positionID: "yaku001", positionName: "社長" };
const position2 = { positionID: "yaku002", positionName: "部長" };
const position3 = { positionID: "yaku003", positionName: "課長" };
const position4 = { positionID: "yaku004", positionName: "一般社員" };

DB1.position.save(position1);
DB1.position.save(position2);
DB1.position.save(position3);
DB1.position.save(position4);
