import { useState, useEffect, useCallback } from "react";

import * as GridStyle from '~/styles/Grid';
import {
  FormSearch,
  InputSearch,
  FlagSearch
} from "./SearchStyle";

import Suggestions from '~/components/Search/Suggestions';

import API from "~/Services/Api";

const SearchPokemon = (props) => {
  const [textSearch, setText] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [inFocus, setFocus] = useState(false);

  const [pokemonSearch, pokemonSearchState] = useState({
    query: '',
    results: []
  });

  const handleSearch = useCallback(async (text) => {
    if(text.length > 2) {
      await API.get(`/pokemon/${text}/`)
        .then(({ data }) => {
          console.log(data);
          pokemonSearchState({
            results: data
          })
        })
    }
  });

  const onClickSearch = () => {
		redirectSearch(textSearch);
  };
  
	const redirectSearch = (text) => {
		if (!text || text.length < 3) return;
    setVisible(false);
    handleSearch(text);
	};

  useEffect(() => {
    let searchTimer = setTimeout(() => {
      handleSearch(textSearch);
    }, 150);
    return () => clearTimeout(searchTimer);
  }, [textSearch]);

  return (
    <>
      <FormSearch className="w-100 flex">
        <GridStyle.Row className="no-gutters w-100">
          <GridStyle.Col className="no-margin no-padding" general={12}>
            <GridStyle.Row>
              <GridStyle.Col mobile={1} tablet={3} desktop={3} />

              <GridStyle.Col className="no-margin" mobile={8} tablet={6} desktop={6}>
                <InputSearch
                  placeholder="Search your Pokemon"
                  value={textSearch}
                  name="query"
                  className="fn-s14px ln-h19px"
                  onKeyPress={e => e.key === 'Enter' && onClickSearch()}
                  onChange={e => setText(e.target.value)}
                  onBlur={() => !inFocus && setVisible(false)}
                  onFocus={() => setVisible(true)}
                />
              </GridStyle.Col>

              <GridStyle.Col className="no-margin" general={3}>
                <FlagSearch />
              </GridStyle.Col>
            </GridStyle.Row>

          </GridStyle.Col>

          <div className="black-block" onClick={() => setVisible(false)}/>

          {pokemonSearch && pokemonSearch.results && isVisible &&
            <GridStyle.Col
              className="no-margin no-padding"
              general={12}
              onMouseEnter={() => setFocus(true)}
              onMouseLeave={() => setFocus(false)}
            >
                
              <Suggestions
                results={pokemonSearch.results}
                searchPokemons={props.searchPokemons}
                textSearch={textSearch}
              />
            </GridStyle.Col>
          }
        </GridStyle.Row>
      </FormSearch>
    </>
  )
};

export default SearchPokemon;
