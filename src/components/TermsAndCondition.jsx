import React from "react";

const TermsAndCondition = () => {
  return (
    <div className="pt-20 text-justify">
      <h1 className="bg-[#e2e2e2] text-center font-heading text-3xl leading-18 font-semibold md:leading-24">
        Terms and Conditions
      </h1>
      <div className="my-10 px-6 md:px-16 lg:px-24 xl:px-36">
        <h3 className="py-4 text-base leading-7 font-semibold text-neutral-700 lg:text-[17px]">
          When accessing and using the website and services supplied by QFX
          Cinemas, the users agree to be bound by the Terms and Conditions. The
          users need to be updated with our Terms and Conditions.
        </h3>
        <div className="space-y-2 px-8 py-4 text-sm leading-7 text-neutral-600 sm:text-base">
          <li>
            Tickets once purchased cannot be cancelled, exchanged or refunded.
          </li>
          <li>
            Tickets reservations get deactivated 45 minutes prior to the show.
            Customers need to collect their tickets 45 minutes prior to the show
            from the Box Office.
          </li>
          <li>Children above 3 ft. height will requires a separate ticket.</li>
          <li>
            The 3D glasses will be available at the cinema for 3D films and must
            be returned before you exit the premises.
          </li>
          <li>
            In case of loss or damage of 3D Glasses, customers are chargeable as
            per One Cinemas policies.
          </li>
          <li>
            Children below the age of 16 years cannot be admitted for movies
            certified 'A'. Customers need to carry a proof of age for movies
            certified 'A'.
          </li>
          <li>
            Outside food and beverages are not allowed inside the cinema
            premise.
          </li>
          <li>Entry is allowed only for valid ticket holders.</li>
          <li>
            One Cinemas management is not responsible for the theft or loss of
            personal belongings.
          </li>
          <li>
            Unauthorized filming of movies using a camera, mobile phones,
            tablets, etc. is strictly prohibited inside the theatres.
          </li>
          <li>Decisions taken by One Cinemas shall be final and binding.</li>
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
