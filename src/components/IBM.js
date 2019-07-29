import React from "react";
import styled from "styled-components";
import Search from "@material-ui/icons/Search";
import {Searchengin} from "styled-icons/fa-brands/Searchengin";
import DynamicTable from "./DynamicTable";

const Div = styled.div`
  background-color: white;
  border: 1px solid rgb(0, 0, 0, 0.2);
  border-radius: 5px;
  height: 100%;
  margin: 1em;
  padding: 1em;
`;
const DivSearch = styled.div`
  display: flex;
  align-items: center;
`;
const SearchIcon = styled(Search)`
  height: 100%;
  width: 100%;
  font-size: 14px;
  &:hover {
  }
  cursor: pointer;
`;

const Input = styled.input`
  outline: none;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  color: #262626;

  padding: 7px 33px;
  border-radius: 3px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;

  &:active,
  &:focus {
    text-align: left;
  }
`;

function Ibm(props) {
    return (
        <Div>
            <DivSearch>
                <Input type="text" placeholder={"Name Search"}/>
                <SearchIcon>
                    <Searchengin/>
                </SearchIcon>
            </DivSearch>
            <DynamicTable/>
        </Div>
    );
}

export default Ibm;
