import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import * as GridStyle from "~/styles/Grid";
import * as Style from './CardPokemonStyle';

import LoadingComponent from "~/components/Loading/Loading";
import ButtonComponent from '~/components/Button/Button';
import IconSvg from "./Icon";

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

  function test123(){
    console.log(cartPokemon);
  }

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
          <GridStyle.Col mobile={6} tablet={3} general={3}>
            <p>
              <strong>
                Pokemon name:
              </strong>
              <br />
              <IconSvg
                width={20}
                fill={"#1c1e22"}
                viewBox={"0 0 496 512"}
                content="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
              />
              {" "}
              {pokemon.name}
            </p>
          </GridStyle.Col>
          
          <GridStyle.Col mobile={6} tablet={3} general={3}>
            <p>
              <strong>
                Base experience:
              </strong>
              <br />
              <IconSvg
                width={20}
                fill={"#1c1e22"}
                viewBox={"0 0 512 512"}
                content="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z"
              />
              {" "}
              {pokemon.base_experience}
            </p>
          </GridStyle.Col>

          <GridStyle.Col mobile={6} tablet={3} general={3}>
            <p>
              <strong>
                Height:
              </strong>
              <br />
              <IconSvg
                width={20}
                fill={"#1c1e22"}
                viewBox={"0 0 576 512"}
                content="M546.2 9.7c-5.6-12.5-21.6-13-28.3-1.2C486.9 62.4 431.4 96 368 96h-80C182 96 96 182 96 288c0 7 .8 13.7 1.5 20.5C161.3 262.8 253.4 224 384 224c8.8 0 16 7.2 16 16s-7.2 16-16 16C132.6 256 26 410.1 2.4 468c-6.6 16.3 1.2 34.9 17.5 41.6 16.4 6.8 35-1.1 41.8-17.3 1.5-3.6 20.9-47.9 71.9-90.6 32.4 43.9 94 85.8 174.9 77.2C465.5 467.5 576 326.7 576 154.3c0-50.2-10.8-102.2-29.8-144.6z"
              />
              {" "}
              {pokemon.height}
            </p>
          </GridStyle.Col>

          <GridStyle.Col mobile={6} tablet={3} general={3}>
            <p>
              <strong>
                Weight:
              </strong>
              <br />
              <IconSvg
                width={20}
                fill={"#1c1e22"}
                viewBox={"0 0 640 512"}
                content="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
              />
              {" "}
              {pokemon.weight}
            </p>
          </GridStyle.Col>
        </GridStyle.Row>

        <GridStyle.Row>
          <GridStyle.Col general={12}>
            <Style.PokemonStats className="mt-10px mb-10px">
              <p className="fn-s18px fn-wb tx-red">
                Stats:
              </p>
              <ul>
                {pokemon.stats && pokemon.stats.length > 0 &&
                  pokemon.stats.map((item, index) => (
                    <li
                      key={index + 1}
                      className="ln-h24px"
                    >
                      <p>
                        <strong>{item.stat.name}</strong>
                        {" - "} {item.base_stat}
                      </p>
                    </li>
                  ))
                }
              </ul>
            </Style.PokemonStats>
          </GridStyle.Col>
        </GridStyle.Row>

        <GridStyle.Row>
          <GridStyle.Col mobile={12} tablet={6} general={3}>
            <ButtonComponent
              txt={'View more'}
              className="fn-s18px tx-white br-10px h-52px w-100 fn-wb"
              onClick={() => test123()}
            />
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
