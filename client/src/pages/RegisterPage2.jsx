import Step2Inputs from "../components/Step2Inputs";
import RegisterWords from "../components/common/RegisterWords.jsx";
import TabSteps from "../components/common/TabSteps.jsx";

function RegisterPage2() {
  return (
    <>
      <div className="flex">
        <RegisterWords />
        <TabSteps />
      </div>
      <Step2Inputs />
    </>
  );
}

export default RegisterPage2;
