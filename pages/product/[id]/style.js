import styled from 'styled-components';
import * as C from '~/styles/Constants';

export const CardPokemon = styled.div`
  color: ${C.DARK_GREY};
  display: block;
  padding: 0 1.25rem;
  overflow: scroll;

  .pokemon-sprite {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;

export const PokemonList = styled.div`

  ul {
    margin-top: 0.625rem;
    column-count: 2;
    column-gap: 30px;
    column-rule-style: solid;
    column-rule-width: 1px;
    column-rule-color: ${C.YELLOW};
  }
`;
