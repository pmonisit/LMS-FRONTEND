import * as accountService from "./admin/AccountService";

const TestPage = () => {
  accountService.getAccountById(1).then((res) => console.log(res));
  accountService.getAdmins().then((res) => console.log(res));

  return <div> test page </div>;
};

export default TestPage;
