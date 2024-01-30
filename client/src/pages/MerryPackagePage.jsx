import logo from "../img/logo.svg";
import bell from "../img/frame.svg";
import basic from "../img/basic.svg";
import fillCheckbox from "../img/checkbox-circle-fill.svg";
import platinum from "../img/platinum.svg";
import premium from "../img/premium.svg";
import person01 from "../img/person01.png";

function MarryPackagePage() {
  return (
    <>
      <navbar className="">
        <ul className="nav-container flex justify-between items-center  text-red-400 text-xl  text-center m-[20px]">
          <li className="merry-math-logo ml-[160px]">
            <img src={logo} />
          </li>

          <li className="start-matching-link ml-[469px] font-nunito text-[16px] text-[#191C77] font-bold">
            <a href="">Start Matching</a>
          </li>
          <li className="merry-membership-link font-nunito text-[16px] text-[#191C77] font-bold">
            <a href="">Merry Membership</a>
          </li>
          <div className="flex ">
            <div className="flex mr-[12px] justify-center items-center w-[48px] h-[48px] bg-[#F6F7FC] rounded-[999px] object-fit object-cover">
              <li>
                <img
                  className="flex-shrink-0 w-[24px] h-[24px] "
                  src={bell}
                  alt=""
                />
              </li>
            </div>
            <li className="mr-[160px]">
              <img
                className="w-[48px] h-[48px] rounded-[999px] object-fit object-cover"
                src={person01}
                alt=""
              />
            </li>
          </div>
        </ul>
      </navbar>

      <section>
        <p className="merry-membership-title font-nunito text-[14px] text-[#7B4429]">
          MERRY MEMBERSHIP
        </p>
        <div className="merry-membership-ads">
          <p className="font-nunito text-[46px]  text-purple-500">
            Be part of Merry Membership
          </p>
          <p className="font-nunito text-[46px]  text-purple-500">
            to make more Merry!
          </p>
        </div>

        <div className="card-package-con flex flex-col items-start w-[357px] p-[40px] gap-[24px]">
          <ul>
            <li className="card-icon mb-[24px]">
              <img
                src={basic}
                alt=""
                className="w-[36px] h-[36px] flex-shrink-0"
              />
            </li>
            <li className="card-category font-nunito text-[32px] font-bold text-purple-800">
              Basic
            </li>
            <li className="card-paid-condition mb-[24px]">
              <span className="card-package-price font-nunito text-[20px] font-bold text-gray-900">
                THB 59.00
              </span>
              <span className="card-package-period font-nunito text-[16px] font-bold text-gray-600">
                /month
              </span>
            </li>

            <li className="fill-checkbox-icon">
              <img src={fillCheckbox} alt="" />
              <p>‘Merry’ more than a daily limited </p>
              <img src={fillCheckbox} alt="" />
              <p>Up to 25 Merry per day</p>
            </li>
            <botton>Choose Package</botton>
          </ul>
        </div>
      </section>
    </>
  );
}

export default MarryPackagePage;
