import { useState, useEffect, useCallback } from "react";
/* import Link from "next/link"; */

import * as GridStyle from "~/styles/Grid";
import * as Style from './SideBarStyle';
import { Money } from "~/styles/Icons";

import LoadingComponent from "~/components/Loading/Loading";
import ButtonComponent from '~/components/Button/Button';

const SideBar = () => {
  const [setCart, setCartState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      console.log('Cart: ', localStorage.getItem('Cart'));
      setCartState(JSON.parse(localStorage.getItem('Cart')));
      console.log('Cart: ', JSON.parse(setCart));

      if (localStorage.getItem('Cart') === null) {
        console.log("Erro ao carregar carrinho. Favor tentar novamente.");
      }
    } catch (error) {
      console.log("Erro ao carregar carrinho. Favor tentar novamente.");
    }

    setLoading(false);
  });

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      {loading && <LoadingComponent />}


      <Style.SideBar>
        {(errorMsg || setCart.length === 0) && (
          <div className="flex align-itcenter cont-center h-75vh">
            <p>{errorMsg}</p>
          </div>
        )}
        
        <GridStyle.Row>
          <GridStyle.Col
            general={12}
            className="border-bottom-1px-lightgrey has-text-centered"
          >
            <p className="fn-s18px tx-up fn-wb">
              Carrinho
            </p>
          </GridStyle.Col>
        </GridStyle.Row>

        <GridStyle.Row>
          <GridStyle.Col general={12}>
            <ul>
              {setCart && setCart.length > 0 &&
                setCart.map((item, index) => (
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
                ))
              }
            </ul>
          </GridStyle.Col>
        </GridStyle.Row>

        <GridStyle.Row>
          <GridStyle.Col general={12}>
            <ButtonComponent
              txt={'Checkout'}
              className="fn-s18px bg-yellow tx-darkgrey br-4px h-52px w-100 fn-wb bntCheckout"
            />
          </GridStyle.Col>
        </GridStyle.Row>
      </Style.SideBar>
    </>
  );
};

export default SideBar;
