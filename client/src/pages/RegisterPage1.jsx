import Step1Inputs from "../components/Step1Inputs.jsx";
import RegisterWords from "../components/common/RegisterWords.jsx";
import TabSteps from "../components/common/TabSteps.jsx";

const RegisterPage1 = () => {
  return (
    <>
      <div className="flex">
        <RegisterWords />
        <TabSteps />
      </div>
      <Step1Inputs />
    </>
  );
};

export default RegisterPage1;
