import { Money } from "~/styles/Icons";

import * as GridStyle from "~/styles/Grid";

const ModalCheckout = ({closeModal}) => {
  const valueOff = Math.floor(Math.random() * 303);

  return (
    <>
      <p className="fn-wb tx-blue fn-s18px ln-h18px mt-16px mb-12px has-text-centered">
        Thanks for shopping with us!!!
      </p>

      <p className="fn-s14px ln-h14px tx-darkgrey mb-6px">
        You won
        {" "}

        <strong>
          <Money />
          {valueOff}
        </strong>
        {" "}
        back
      </p>

      <p className="fn-s14px ln-h14px tx-darkgrey mb-6px">
        You will be directed to the home page...
      </p>

      <GridStyle.Col general={12} className="mt-40px mb-12px">
        <GridStyle.Row className="h-52px">
          <GridStyle.Col
            className="no-margin pl-2-5px pr-0"
            general={12}
          >
            <button
              className="fn-s14px bg-red-outlined br-10px h-52px w-100"
              onClick={closeModal}
            >
              Close
            </button>
          </GridStyle.Col>
        </GridStyle.Row>
      </GridStyle.Col>
    </>
  );
}

export default ModalCheckout;
