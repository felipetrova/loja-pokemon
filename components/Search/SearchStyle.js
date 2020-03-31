import styled from "styled-components";
import * as C from "~/styles/Constants";

export const FormSearch = styled.form`
  width: 100%;
  position: fixed;
  top: 45px;
  left: 0;
  z-index: 9;

  height: 40px;
  background: #EEEEEE;
  padding: 10px 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${C.LIGHT_GREY};
  position: relative;
`;