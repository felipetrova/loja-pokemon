import Link from "next/link";

import * as GridStyle from "~/styles/Grid";

import HeaderComponent from "~/components/Header/Header";

const Index = () => {

  return (
    <>
      <HeaderComponent
        link="/"
        title={`Pokémon Store`}
      />

      <div className="mt-125px">
        <GridStyle.Container>
          <GridStyle.Row>
            <GridStyle.Col general={12}>
              <p className="fn-s30px has-text-centered tx-up tx-blue">
                Where are you going?
              </p>
              <p className="fn-s20px has-text-centered tx-up tx-darkgrey">
                Choose a store and find your favorite pokémon
              </p>
            </GridStyle.Col>
          </GridStyle.Row>

          <GridStyle.Row>
            <GridStyle.Col
              mobile={12}
              tablet={6}
              desktop={3}
            >
              <div className="card has-text-centered">
                <Link
                  href="/stores/store-one"
                >
                  <a>Pokémon Type - Rock</a>
                </Link>
              </div>
            </GridStyle.Col>

            <GridStyle.Col
              mobile={12}
              tablet={6}
              desktop={3}
            >
              <div className="card has-text-centered">
                <Link
                  href="/stores/store-two"
                >
                  <a>Pokémon Type - Flying</a>
                </Link>
              </div>
            </GridStyle.Col>

            <GridStyle.Col
              mobile={12}
              tablet={6}
              desktop={3}
            >
              <div className="card has-text-centered">
                <Link
                  href="/stores/store-three"
                >
                  <a>Pokémon Type - Dark</a>
                </Link>
              </div>
            </GridStyle.Col>

            <GridStyle.Col
              mobile={12}
              tablet={6}
              desktop={3}
            >
              <div className="card has-text-centered">
                <Link
                  href="/stores/store-four"
                >
                  <a>Pokémon Type - Electric</a>
                </Link>
              </div>
            </GridStyle.Col>
          </GridStyle.Row>
        </GridStyle.Container>
      </div>
    </>
  );
};

export default Index;
