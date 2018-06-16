let Hamoni = require("hamoni-sync");

let hamoni = new Hamoni("6c15e4dd-8a3f-4d7c-af3b-42a64cccceff", "91a1c50132ad4d6d8d2652609c95a584");

hamoni
  .connect()
  .then(response => {
    hamoni
      .createList("datagrid", [
        { firstName: "James", lastName: "Darwin" },
        { firstName: "Jimmy", lastName: "August" }
      ])
      .then(() => console.log("create success"))
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
