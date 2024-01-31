import Step3Inputs from "../components/Step3Inputs";
import RegisterWords from "../components/common/RegisterWords.jsx";
import TabSteps from "../components/common/TabSteps.jsx";

function RegisterPage3() {
  return (
    <>
      <div className="flex">
        <RegisterWords />
        <TabSteps />
      </div>
      <Step3Inputs />
    </>
  );
}

export default RegisterPage3;
