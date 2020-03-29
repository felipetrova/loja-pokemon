import styled from "styled-components";
import * as C from "~/styles/Constants";

export const Modal = styled.div`
  align-items: center;
  display: none;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  z-index: 11;

  &.is-active {
    display: flex;
    padding: 0 15px;
  }

  .modal-background {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }

  .modal-content {
    width: 100%;
    background: ${C.WHITE};
    display: block;
    position: relative;
    z-index: 1;
    max-width: 335px;
    margin: 0 20px;
    border-radius: 10px;
    padding: 0 20px;

    .icon-close {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      position: absolute;
      right: 10px;
      top: 10px;
      background: ${C.RED};
      color: ${C.WHITE};
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875em;
      z-index: 1;
    }

    .max-content__modal {
      max-height: 456px;
      width: 100%;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;
