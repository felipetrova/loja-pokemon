import styled from 'styled-components';
import * as C from '~/styles/Constants';

export const CardPokemon = styled.div`
  background-color: ${C.WHITE};
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
  color: ${C.DARK_GREY};
  display: block;
  padding: 1.25rem;
  overflow: scroll;

  .pokemon-sprite {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;

export const PokemonStats = styled.div`

  ul {
    margin-top: 0.625rem;
    column-count: 2;
    column-gap: 30px;
    column-rule-style: solid;
    column-rule-width: 1px;
    column-rule-color: ${C.YELLOW};
  }
`;
