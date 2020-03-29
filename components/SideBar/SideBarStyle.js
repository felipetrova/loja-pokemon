import styled from 'styled-components';
import * as C from '~/styles/Constants';

export const SideBar = styled.div`
  background-color: #f9f9f9;
  color: ${C.DARK_GREY};
  display: block;
  height: 500px;
  padding: 1.25rem;
  overflow: scroll;
  position: relative;

  button.bntCheckout {
    position: absolute;
    z-index: 1;
    bottom: 1.25rem;
    left: 1.25rem;
    width: calc(100% - 2.5rem);
    margin: 0 auto;
  }
`;
