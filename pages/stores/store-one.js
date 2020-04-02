import { useState, useEffect, useCallback } from "react";

import * as GridStyle from "~/styles/Grid";

import HeaderComponent from "~/components/Header/Header";
import LoadingComponent from "~/components/Loading/Loading";
import SideBarComponent from "~/components/SideBar/SideBar";
import PokemonComponent from "~/components/CardPokemon/CardPokemon";
import SearchComponent from "~/components/Search/Search";

import ModalComponent from "~/components/Modal/Modal";
import ModalCheckout from "~/components/Modal/ModalCheckout";

import API from "~/Services/Api";

const StoreOne = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [cartPokemon, setCartPokemon] = useState([]);
  const [setUpdateCart, setUpdateCartState] = useState([]);
  
  const loadPokType = useCallback(async () => {
    /* const idPokType = Math.floor(Math.random() * 19); */
    const idPokType = 6;

    if(idPokType !== 0) {
      try {
        setLoading(true);
        setErrorMsg("");
        
        const response = await API.get(`type/${idPokType}/?offset=0&limit=20`);
        console.log(response.data.pokemon);
        
        setPokemon(response.data);
  
        if (response.data.length === 0) {
          setErrorMsg("Nenhum Pokémon encontrado. Favor tentar novamente.");
        }
      } catch (error) {
        setErrorMsg("Nenhum Pokémon encontrado. Favor tentar novamente.");
      }
    }

    setLoading(false);
  });

  const addPokemonCart = async (id, name, value) => {
    console.log(id, name, value);
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

  async function searchPokemons(term) {
    console.log(term);
  }

  useEffect(() => {
    loadPokType();
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
        link="/"
        title={`Pokémon Type - ${pokemon.name}`}
      />

      <SearchComponent
        searchPokemons={e => searchPokemons(e)}
      />

      <div className="mt-125px">
        {(errorMsg || pokemon.length === 0) && (
          <div className="flex align-itcenter cont-center h-75vh">
            <p>{errorMsg}</p>
          </div>
        )}

        <GridStyle.Container>
          <GridStyle.Row>
            <GridStyle.Col
              mobile={12}
              tablet={8}
              desktop={9}
            >
              <GridStyle.Row>
                {pokemon.pokemon && pokemon.pokemon.length > 0 &&
                  pokemon.pokemon.map((item, index) => (
                    <GridStyle.Col
                      key={index + 1}
                      mobile={12}
                      tablet={6}
                      desktop={4}
                    >
                      <PokemonComponent
                        pokemonName={item.pokemon.name}
                        pokemonUrl={item.pokemon.url}
                        addPokemonCart={() => addPokemonCart()}
                      />
                    </GridStyle.Col>
                  ))
                }
              </GridStyle.Row>
            </GridStyle.Col>

            <GridStyle.Col
              mobile={12}
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
      </div>
    </>
  );
};

export default StoreOne;
