import RegisterWords from "../components/common/RegisterWords.jsx";
import TabSteps from "../components/common/TabSteps.jsx";

const RegisterPage = () => {
  return (
    <>
      <div className="flex">
        <RegisterWords />
        <TabSteps />
      </div>
    </>
  );
};

export default RegisterPage;
