import * as GridStyle from "~/styles/Grid";
import * as Style from './SideBarStyle';
import { Money } from "~/styles/Icons";

import ButtonComponent from '~/components/Button/Button';

const SideBar = ({modalCheckout, updateCart}) => {

  return (
    <>
      <Style.SideBar>
        <GridStyle.Row>
          <GridStyle.Col
            general={12}
            className="border-bottom-1px-lightgrey has-text-centered"
          >
            <p className="fn-s18px tx-up fn-wb">
              Cart
            </p>
          </GridStyle.Col>
        </GridStyle.Row>
        
        {(updateCart === null || updateCart.length == 0) && (
          <GridStyle.Row>
            <GridStyle.Col general={12}>
              <div className="flex align-itcenter cont-center">
                <p>
                  No pokémon added to cart. Please add a Pokémon in the cart.
                </p>
              </div>
            </GridStyle.Col>
          </GridStyle.Row>
        )}

        {updateCart && updateCart.length >= 1 &&
          <div>  
            <GridStyle.Row>
              <GridStyle.Col general={12}>
                <ul>
                  {updateCart.map((item, index) => (
                    <li
                      key={index + 1}
                      className="flex cont-spbet mb-15px"
                    >
                      <p className="tx-ca">{item.pokemonName}</p>
                      <p>
                        <strong>
                          <Money />
                          {item.pokemonValue ? item.pokemonValue : 'Free'}
                        </strong>
                      </p>
                    </li>
                  ))}
                </ul>
              </GridStyle.Col>
            </GridStyle.Row>

            <GridStyle.Row>
              <GridStyle.Col general={12}>
                <ButtonComponent
                  txt={'Checkout'}
                  className="fn-s18px bg-yellow tx-darkgrey br-4px h-52px w-100 fn-wb bntCheckout"
                  onClick={modalCheckout}
                />
              </GridStyle.Col>
            </GridStyle.Row>
          </div>
        }
      </Style.SideBar>
    </>
  );
};

export default SideBar;
