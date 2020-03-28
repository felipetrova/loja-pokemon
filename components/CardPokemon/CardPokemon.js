import { useState, useEffect, useCallback } from "react";
/* import Router from "next/router"; */
import axios from "axios";
import Link from "next/link";

import * as GridStyle from "~/styles/Grid";
import * as Style from './CardPokemonStyle';

import LoadingComponent from "~/components/Loading/Loading";
import ButtonComponent from '~/components/Button/Button';
import IconSvg from "~/components/Icon/Icon";

const Pokemon = (props) => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonImg, setPokemonImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cartPokemon, setCartPokemon] = useState([]);
  
  const loadPokemon = useCallback(async () => {

    try {
      setLoading(true);
      setErrorMsg("");
      
      const response = await axios.get(props.pokemonUrl);
      console.log(response.data);
      
      setPokemon(response.data);
      setPokemonImg(
        response.data.sprites.front_default && response.data.sprites.front_default !== null ? response.data.sprites.front_default : response.data.sprites.front_shiny
      );

      if (response.data.length === 0) {
        setErrorMsg("Erro ao carregar Pokémon. Favor tentar novamente.");
      }
    } catch (error) {
      setErrorMsg("Erro ao carregar Pokémon. Favor tentar novamente.");
    }

    setLoading(false);
  });

  const addPokemonCart = async (name, id) => {
    if (!cartPokemon.includes(name) && !cartPokemon.includes(id)) {
      cartPokemon.push({
        pokemonId: id,
        pokemonName: name
      });
    }
  }

  /* function goToProduct(id){
    console.log(cartPokemon);

    Router.push({
      pathname: `/product/${id}`,
      query: {
        querySearch,
        filters
      }
    });
  } */

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <>
      {loading && <LoadingComponent />}

      {(errorMsg || pokemon.length === 0) && (
        <div className="flex align-itcenter cont-center h-75vh">
          <p>{errorMsg}</p>
        </div>
      )}

      <Style.CardPokemon className="mb-10px">
        <GridStyle.Row>
          <GridStyle.Col general={12}>
            <img
              src={pokemonImg}
              className="pokemon-sprite"
              alt={pokemon.name}
            />
          </GridStyle.Col>
        </GridStyle.Row>
        
        <GridStyle.Row>
          <GridStyle.Col mobile={12} tablet={4} general={3}>
            <p className="fn-s18px tx-ca">
              <span className="fn-wb tx-up">
                <IconSvg
                  width={20}
                  fill={"#1c1e22"}
                  viewBox={"0 0 640 512"}
                  content="M18.32 255.78L192 223.96l-91.28 68.69c-10.08 10.08-2.94 27.31 11.31 27.31h222.7c-9.44-26.4-14.73-54.47-14.73-83.38v-42.27l-119.73-87.6c-23.82-15.88-55.29-14.01-77.06 4.59L5.81 227.64c-12.38 10.33-3.45 30.42 12.51 28.14zm556.87 34.1l-100.66-50.31A47.992 47.992 0 0 1 448 196.65v-36.69h64l28.09 22.63c6 6 14.14 9.37 22.63 9.37h30.97a32 32 0 0 0 28.62-17.69l14.31-28.62a32.005 32.005 0 0 0-3.02-33.51l-74.53-99.38C553.02 4.7 543.54 0 533.47 0H296.02c-7.13 0-10.7 8.57-5.66 13.61L352 63.96 292.42 88.8c-5.9 2.95-5.9 11.36 0 14.31L352 127.96v108.62c0 72.08 36.03 139.39 96 179.38-195.59 6.81-344.56 41.01-434.1 60.91C5.78 478.67 0 485.88 0 494.2 0 504 7.95 512 17.76 512h499.08c63.29.01 119.61-47.56 122.99-110.76 2.52-47.28-22.73-90.4-64.64-111.36zM489.18 66.25l45.65 11.41c-2.75 10.91-12.47 18.89-24.13 18.26-12.96-.71-25.85-12.53-21.52-29.67z"
                />
                {" "}
                Name:
              </span>

              {" "}
              {pokemon.name}
            </p>
          </GridStyle.Col>
          
          <GridStyle.Col mobile={12} tablet={4} general={3}>
            <p className="fn-s18px tx-ca">
              <span className="fn-wb tx-up">
                <IconSvg
                  width={20}
                  fill={"#1c1e22"}
                  viewBox={"0 0 512 512"}
                  content="M256 416c114.9 0 208-93.1 208-208S370.9 0 256 0 48 93.1 48 208s93.1 208 208 208zM233.8 97.4V80.6c0-9.2 7.4-16.6 16.6-16.6h11.1c9.2 0 16.6 7.4 16.6 16.6v17c15.5.8 30.5 6.1 43 15.4 5.6 4.1 6.2 12.3 1.2 17.1L306 145.6c-3.8 3.7-9.5 3.8-14 1-5.4-3.4-11.4-5.1-17.8-5.1h-38.9c-9 0-16.3 8.2-16.3 18.3 0 8.2 5 15.5 12.1 17.6l62.3 18.7c25.7 7.7 43.7 32.4 43.7 60.1 0 34-26.4 61.5-59.1 62.4v16.8c0 9.2-7.4 16.6-16.6 16.6h-11.1c-9.2 0-16.6-7.4-16.6-16.6v-17c-15.5-.8-30.5-6.1-43-15.4-5.6-4.1-6.2-12.3-1.2-17.1l16.3-15.5c3.8-3.7 9.5-3.8 14-1 5.4 3.4 11.4 5.1 17.8 5.1h38.9c9 0 16.3-8.2 16.3-18.3 0-8.2-5-15.5-12.1-17.6l-62.3-18.7c-25.7-7.7-43.7-32.4-43.7-60.1.1-34 26.4-61.5 59.1-62.4zM480 352h-32.5c-19.6 26-44.6 47.7-73 64h63.8c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8h63.8c-28.4-16.3-53.3-38-73-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32z"
                />
                {" "}
                Price:
              </span>
              
              {" "}
              {pokemon.order}
            </p>
          </GridStyle.Col>
        </GridStyle.Row>

        <GridStyle.Row>
          <GridStyle.Col mobile={12} tablet={6} general={3}>
            <Link
              href={`/product/${pokemon.id}`}
              /* as={`/product/${pokemon.id}`} */
            >
              <ButtonComponent
                txt={'View more'}
                className="fn-s18px tx-white br-10px h-52px w-100 fn-wb"
                /* onClick={() => goToProduct(pokemon.id)} */
              />
            </Link>
          </GridStyle.Col>

          <GridStyle.Col mobile={12} tablet={6} general={6}>
            <ButtonComponent
              txt={'Add to Cart'}
              className="fn-s18px bg-red tx-white br-10px h-52px w-100 fn-wb"
              onClick={() => addPokemonCart(pokemon.name, pokemon.id)}
            />
          </GridStyle.Col>
        </GridStyle.Row>
      </Style.CardPokemon>
    </>
  );
};

export default Pokemon;
