import * as Style from "./HeaderStyle";
import * as GridStyle from "~/styles/Grid";
/* import IconSvg from "~/components/Icon/Icon"; */
import { ArrowLeft } from "~/styles/Icons";

import Link from "next/link";

export default function header({ title, slugPage, directory }) {
  return (
    <Style.Header className="bg-yellow">
      <GridStyle.Row className="no-gutters">
        <GridStyle.Col
          className="flex align-itcenter no-margin no-padding"
          mobile={1}
          tablet={3}
        >
          <Link href={`${directory}`} as={`${slugPage}`}>
            <ArrowLeft className="tx-blue fn-wb" />
            {/* <IconSvg
              width={20}
              fill={"#1b95e0"}
              viewBox={"0 0 320 512"}
              content="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
            /> */}
          </Link>
        </GridStyle.Col>

        <GridStyle.Col
          className="flex align-itcenter cont-center no-margin"
          mobile={10}
          tablet={3}
        >
          <p className="fn-s18px fn-wb tx-blue">{title}</p>
        </GridStyle.Col>
        <GridStyle.Col
          className="flex align-itcenter no-margin"
          mobile={1}
          tablet={3}
        ></GridStyle.Col>
      </GridStyle.Row>
    </Style.Header>
  );
}
