import React from "react";

const terms = [
  {
    name: "Privacy:",
    description: `To connect with the public, QFX Cinemas runs the website. QFX Cinemas values the privacy of your personal information and content stored in our service by the public. We only use your Personal Information to provide and use the website. By using the website, you as the customer, agree for collection and use of information in accordance with our policy. We ask you to provide us with certain personally identifiable information when using our website that can be used to contact or recognize you.`,
  },
  {
    name: "How collected Information is used?",
    description:
      "The gathered personal information can be used to communicate with you, to send you information about our services, and promotions and also to provide you with information about One Cinemas and its products and services and provide newsletters or email updates to you. The data can  also be used to help us address problems and improve our website design, products and services and to respond to your requests and to contact you if necessary.In addition, the gathered data will be used to better comprehend our clients and provide enhanced services",
  },
  {
    name: "Changes to Privacy Policy:",
    description:
      "Privacy Policy may be altered at any moment, at our discretion, and any changes will take effect instantly upon publishing the changes to our website or notice board.Therefore, we humbly request all our audiences to review our Privacy Policy from time to time.",
  },
];
const PrivacyPolicy = () => {
  return (
    <div className="pt-20 text-justify">
      <h1 className="bg-[#e2e2e2] text-center font-heading text-3xl leading-18 font-semibold md:leading-24">
        Privacy Policy
      </h1>
      <div className="my-10 px-6 md:px-16 lg:px-24 xl:px-36">
        {terms.map((term) => (
          <div key={term.name}>
            <h2 className="py-4 text-lg font-semibold text-neutral-800 lg:text-xl">
              {term.name}
            </h2>
            <p className="pb-4 text-sm leading-7 text-neutral-600 sm:text-[15px] md:leading-7.5 lg:text-base">
              {term.description}
            </p>
          </div>
        ))}
      </div>

      {/* <div>
        <h2></h2>
        <p></p>
      </div> */}
    </div>
  );
};

export default PrivacyPolicy;
