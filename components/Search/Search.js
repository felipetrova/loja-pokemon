import * as GridStyle from '~/styles/Grid';
import {
  FormSearch
} from "./SearchStyle";

const SearchPokemon = (props) => {
  console.log(props);
  
  return (
    <>
      <FormSearch className="w-100 flex">
        <GridStyle.Row className="no-gutters w-100">
          <GridStyle.Col className="no-margin no-padding" general={12}>
            
          </GridStyle.Col>
        </GridStyle.Row>
      </FormSearch>
    </>
  )
};

export default SearchPokemon;
