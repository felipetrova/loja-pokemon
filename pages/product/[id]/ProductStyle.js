import styled from 'styled-components';
import * as C from '~/styles/Constants';

export const CardPokemon = styled.div`
  color: ${C.DARK_GREY};
  display: block;
  padding: 0 1.25rem;
  overflow: scroll;

  .pokemon-sprite {
    max-width: 96px;
    width: 100%;
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

export const CarouselPokemon = styled.div`
  width: 100%;
  margin-bottom: 50px;

  /* SLICK */
  .slick-dots {
    bottom: 0;
    width: 100%;
    margin: 0;
    list-style: none;
    text-align: center;

    li {
      position: relative;
      display: inline-block;
      width: 10px;
      height: 10px;
      margin: 0 7px 0 0;
      padding: 0;
      cursor: pointer;

      &.slick-active {
        button {
          &:before {
            background: ${C.YELLOW};
          }
        }
      }
      button {
        font-size: 0;
        line-height: 0;
        display: block;
        width: 10px;
        height: 10px;
        padding: 5px;
        cursor: pointer;
        color: transparent;
        border: 0;
        outline: 0;
        background: ${C.LIGHT_GREY};
        border-radius: 50%;

        &:before {
          font-size: 8px;
          line-height: 8px;
          position: absolute;
          top: 0;
          left: 0;
          width: 8px;
          height: 8px;
          content: "";
          text-align: center;
          opacity: 1;
          border-radius: 50%;
          color: ${C.LIGHT_GREY};
          border: 1px solid transparent;
        }
      }
    }
  }
`;
