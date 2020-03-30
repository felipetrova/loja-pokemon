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

const Index = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  
  const loadPokType = useCallback(async () => {
    const idPokType = Math.floor(Math.random() * 19);

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

  // eslint-disable-next-line no-unused-vars
  const handleShowModal = component => {
    setShowModal(true);
    setModalComponent(component);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  async function searchProducts(term) {
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
        searchProducts={e => searchProducts(e)}
      />

      <div className="mt-85px">
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
                      />
                    </GridStyle.Col>
                  ))
                }
              </GridStyle.Row>
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
              />
            </GridStyle.Col>
          </GridStyle.Row>
        </GridStyle.Container>
      </div>
    </>
  );
};

export default Index;
