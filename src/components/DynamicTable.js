import React from "react";
import styled from "styled-components";
import * as _ from "lodash";

const Div = styled.div``;

const data = [
    {id: 1, name: "Lea Medhurst", score: "159", error: "No", reset: ""},
    {id: 2, name: "Bill Brown", score: "0", error: "Dropout", reset: ""},
    {id: 3, name: "Jensen Button", score: "56", error: "No", reset: ""},
    {id: 4, name: "Lando Norris", score: "23", error: "No", reset: ""},
    {id: 5, name: "Lewis Hamilton", score: "0", error: "Wrong Order", reset: ""}
];

const Table = styled.table`
  text-align: center;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  border: 3px solid #ddd;
  width: 100%;
`;

const TD = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const TH = styled(TD)`
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #4caf50;
  color: white;
`;

const TR = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const Button = styled.button`
  background-color: rgb(71, 126, 189, 0.8);
  &:hover {
    background: #4178be;
    border-color: #4178be;
    color: #fff;
  }
  border: none;
  padding: 0.5em 1em;
  border-radius: 3px;
  color: white;
  -webkit-box-shadow: 3px 3px 3px -2px rgba(65,120,190,1);
  -moz-box-shadow: 3px 3px 3px -2px rgba(65,120,190,1);
  box-shadow: 3px 3px 3px -2px rgba(65,120,190,1);
`

function DynamicTable(props) {
    function createTable() {
        return data.map((user, index) => {
            const {id, name, score, error} = user;
            return (
                <TR key={id}>
                    <TD>{name}</TD>
                    <TD>{score}</TD>
                    <TD>{error}</TD>
                    <TD>
                        <Button>Reset</Button>
                    </TD>
                </TR>
            );
        });
    }

    function tableHeader() {
        let header = _.drop(Object.keys(data[0]));
        return header.map((key, index) => {
            return <TH key={index}>{key.toUpperCase()}</TH>;
        });
    }

    return (
        <Div>
            <Table>
                <TR>{tableHeader()}</TR>
                {createTable()}
            </Table>
        </Div>
    );
}

export default DynamicTable;
