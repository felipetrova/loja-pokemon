import { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";

import * as GridStyle from "~/styles/Grid";
import * as Style from './ProductStyle';

import LoadingComponent from "~/components/Loading/Loading";
import HeaderComponent from "~/components/Header/Header";
import ButtonComponent from '~/components/Button/Button';
import SideBarComponent from "~/components/SideBar/SideBar";
import { Money } from "~/styles/Icons";

import ModalComponent from "~/components/Modal/Modal";
import ModalCheckout from "~/components/Modal/ModalCheckout";

import API from "~/Services/Api";

const PokemonInfo = ({ id }) => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonImg, setPokemonImg] = useState();
  const [pokemonImgShiny, setPokemonImgShiny] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cartPokemon, setCartPokemon] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [setUpdateCart, setUpdateCartState] = useState([]);
  
  const loadPokemon = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      
      const response = await API.get(`pokemon/${id}/`);
      console.log(response.data);
      
      setPokemon(response.data);
      setPokemonImg(
        response.data.sprites.front_default && response.data.sprites.front_default !== null ? response.data.sprites.front_default : response.data.sprites.front_female
      );
      setPokemonImgShiny(
        response.data.sprites.front_shiny && response.data.sprites.front_shiny !== null ? response.data.sprites.front_shiny : response.data.sprites.front_shiny_female
      );

      if (response.data.length === 0) {
        setErrorMsg("Erro ao carregar Pokémon. Favor tentar novamente.");
      }
    } catch (error) {
      setErrorMsg("Erro ao carregar Pokémon. Favor tentar novamente.");
    }

    setLoading(false);
  });

  const slide = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const addPokemonCart = async (id, name, value) => {
    if (!cartPokemon.includes(name) && !cartPokemon.includes(id)) {
      cartPokemon.push({
        pokemonId: id,
        pokemonName: name,
        pokemonValue: value
      });

      localStorage.setItem('Cart', JSON.stringify(cartPokemon));

      setUpdateCartState(JSON.parse(localStorage.getItem('Cart')));
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleShowModal = component => {
    setShowModal(true);
    setModalComponent(component);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <>
      {loading && <LoadingComponent />}

      <ModalComponent
        activeModal={showModal}
        iconCloseModal={true}
        closeModal={() => handleHideModal()}
      >
        {modalComponent}
      </ModalComponent>

      <HeaderComponent
        directory="/"
        slugPage={`/`}
        title={`Pokémon ${pokemon.name}`}
      />

      {(errorMsg || pokemon.length === 0) && (
        <div className="flex align-itcenter cont-center h-75vh">
          <p>{errorMsg}</p>
        </div>
      )}

      <GridStyle.Container className="mt-125px">
        <GridStyle.Row>
          <GridStyle.Col
            mobile={12}
            tablet={8}
            desktop={9}
          >
            <Style.CardPokemon>
              <Style.CarouselPokemon>
                <Slider {...slide}>
                  <img
                    src={pokemonImg}
                    className="pokemon-sprite flex"
                    alt={pokemon.name}
                  />
                  <img
                    src={pokemonImgShiny}
                    className="pokemon-sprite flex"
                    alt={`${pokemon.name} Shiny`}
                  />
                </Slider>
              </Style.CarouselPokemon>
              
              <GridStyle.Row>
                <GridStyle.Col mobile={6} tablet={3} desktop={3}>
                  <p className="tx-ca">
                    <strong>
                      Pokemon name:
                    </strong>
                    <br />
                    {pokemon.name}
                  </p>
                </GridStyle.Col>
                
                <GridStyle.Col mobile={6} tablet={3} desktop={3}>
                  <p>
                    <strong>
                      Base experience:
                    </strong>
                    <br />
                    {pokemon.base_experience}
                  </p>
                </GridStyle.Col>

                <GridStyle.Col mobile={6} tablet={3} desktop={3}>
                  <p>
                    <strong>
                      Height:
                    </strong>
                    <br />
                    {pokemon.height}
                  </p>
                </GridStyle.Col>

                <GridStyle.Col mobile={6} tablet={3} desktop={3}>
                  <p>
                    <strong>
                      Weight:
                    </strong>
                    <br />
                    {pokemon.weight}
                  </p>
                </GridStyle.Col>
              </GridStyle.Row>

              <GridStyle.Row>
                <GridStyle.Col general={12}>
                  <Style.PokemonList className="mt-10px mb-10px">
                    <p className="fn-s18px fn-wb tx-red">
                      Abilities:
                    </p>
                    <ul>
                      {pokemon.abilities && pokemon.abilities.length > 0 &&
                        pokemon.abilities.map((item, index) => (
                          <li
                            key={index + 1}
                            className="ln-h24px"
                          >
                            <p>
                              <strong>{item.ability.name}</strong>
                            </p>
                          </li>
                        ))
                      }
                    </ul>
                  </Style.PokemonList>
                </GridStyle.Col>
              </GridStyle.Row>

              <GridStyle.Row>
                <GridStyle.Col general={12}>
                  <Style.PokemonList className="mt-10px mb-10px">
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
                  </Style.PokemonList>
                </GridStyle.Col>
              </GridStyle.Row>

              <GridStyle.Row>
                <GridStyle.Col tablet={3} desktop={3}/>
                <GridStyle.Col mobile={12} tablet={6} desktop={6}>
                  <ButtonComponent
                    txt={'Add to Cart'}
                    className="fn-s18px bg-red tx-white br-10px h-52px w-100 fn-wb"
                    onClick={() => addPokemonCart(pokemon.id, pokemon.name, pokemon.order)}
                  >
                    {" - "}
                    <Money />
                    {`${pokemon.order}`}
                  </ButtonComponent>
                </GridStyle.Col>
                <GridStyle.Col tablet={3} desktop={3}/>
              </GridStyle.Row>
            </Style.CardPokemon>
          </GridStyle.Col>

          <GridStyle.Col
            tablet={4}
            desktop={3}
          >
            <SideBarComponent
              modalCheckout={() =>
                handleShowModal(
                  <ModalCheckout
                    closeModal={() => handleHideModal()}
                  />
                )
              }
              updateCart={setUpdateCart}
            />
          </GridStyle.Col>
        </GridStyle.Row>
      </GridStyle.Container>

    </>
  );
}

PokemonInfo.getInitialProps = async ({ query }) => {
  return {
    id: query.id
  };
};

export default PokemonInfo;