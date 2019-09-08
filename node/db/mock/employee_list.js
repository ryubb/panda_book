// eslint-disable-next-line no-undef
const DB1 = db.getMongo().getDB("test");
const nameList = ["田村", "山田", "中山", "佐藤", "佐々木", "吉田"];
const ageList = [30, 31, 37, 23, 33, 35];
const salaryList = [400000, 350000, 300000, 250000, 350000, 350000];

const employee1 = {
  employeeID: "emp001",
  divisionID: "ka001",
  positionID: "yaku001",
  employeeName: nameList[0],
  age: ageList[0],
  salary: salaryList[0]
};

const employee2 = {
  employeeID: "emp002",
  divisionID: "ka001",
  positionID: "yaku002",
  employeeName: nameList[1],
  age: ageList[1],
  salary: salaryList[1]
};

const employee3 = {
  employeeID: "emp003",
  divisionID: "ka002",
  positionID: "yaku003",
  employeeName: nameList[2],
  age: ageList[2],
  salary: salaryList[2]
};

const employee4 = {
  employeeID: "emp004",
  divisionID: "ka002",
  positionID: "yaku004",
  employeeName: nameList[3],
  age: ageList[3],
  salary: salaryList[3]
};

const employee5 = {
  employeeID: "emp005",
  divisionID: "ka003",
  positionID: "yaku002",
  employeeName: nameList[4],
  age: ageList[4],
  salary: salaryList[4]
};

const employee6 = {
  employeeID: "emp006",
  divisionID: "ka004",
  positionID: "yaku002",
  employeeName: nameList[5],
  age: ageList[5],
  salary: salaryList[5]
};

DB1.employee.save(employee1);
DB1.employee.save(employee2);
DB1.employee.save(employee3);
DB1.employee.save(employee4);
DB1.employee.save(employee5);
DB1.employee.save(employee6);

const division1 = {
  divisionID: "ka001",
  departmentID: "bu001",
  divisitionName: "営業１課"
};
const division2 = {
  divisionID: "ka002",
  departmentID: "bu002",
  divisitionName: "営業２課"
};
const division3 = {
  divisionID: "ka003",
  departmentID: "bu003",
  divisitionName: "企画課"
};
const division4 = {
  divisionID: "ka004",
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
