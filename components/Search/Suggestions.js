import Link from "next/link";

import { SuggestionsSearch } from "./SearchStyle";

const Suggestions = (props) => {
  return (
    <SuggestionsSearch>
      <li>
        <Link
          href={`/product/${props.results.id}`}
        >
          <p className="mt-6px bg-none tx-darkgrey fn-s14px ln-h19px tx-dn">
            {props.results.name}
          </p>
        </Link>
      </li>
    </SuggestionsSearch>
  )
}

export default Suggestions
