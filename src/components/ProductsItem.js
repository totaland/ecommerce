import React, {useContext, useState} from "react";
import styled from "styled-components";
import * as _ from 'lodash'
import tallyUp from "../images/TallyUp.JPG";
import gridLock from "../images/GridLock.JPG";
import matchingFaces from "../images/MatchingFaces.JPG";
import numbbles from "../images/Numbbles.JPG";
import resemble from "../images/Resemble1.JPG";
import shortCuts from "../images/shortCuts.JPG";
import emotionalTies from "../images/EmotionalTies.JPG";
import Avatar from "../components/Avatar";
import Search from "@material-ui/core/SvgIcon/SvgIcon";
import {Searchengin} from "styled-icons/fa-brands/Searchengin";
import {Auth} from "aws-amplify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AppContext} from "../context/AppContext";

// other constance
const products = [
    {name: "Tally Up", desc: "A nice thing", price: "$9.99", time: 1, id: 0},
    {name: "Grid Lock", desc: "Another thing", price: "$3.45", time: 1, id: 1},
    {name: "Matching Faces", desc: "Something else", price: "$6.51", time: 1, id: 2},
    {name: "Numbblers", desc: "Best thing of all", price: "$14.11", time: 1, id: 3},
    {name: "Resemble", desc: "resemble something", price: "$10.90", time: 1, id: 4},
    {name: "Short Cuts", desc: "short cuts something", price: "$11.00", time: 1, id: 5},
    {name: "Emotional Ties", desc: "emotional ties something", price: "$9.90", time: 1, id: 6}
];
const imageName = ["Tally Up", "Grid Lock", "Matching Faces", "Numbblers", "Resemble", "Short Cuts", "Emotional Ties"];

const imageArray = [];

imageArray.push(tallyUp);
imageArray.push(gridLock);
imageArray.push(matchingFaces);
imageArray.push(numbbles);
imageArray.push(resemble);
imageArray.push(shortCuts);
imageArray.push(emotionalTies);

// CSS-in-JS

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Div = styled.div`
  background-color: white;
  width: 260px;
  height: 350px;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(119, 119, 119, 1);
  -moz-box-shadow: 0px 2px 5px 0px rgba(119, 119, 119, 1);
  box-shadow: 0px 2px 5px 0px rgba(119, 119, 119, 1);
  margin-top: 2rem;
  border-radius: 5px;
`;

const TopCard = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  background-color: white;
  &:hover {
    background-color: lightgrey;
    color: white;
    text-transform: uppercase;
  }
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  color: gray;
  text-transform: uppercase;
  font-size: 1.5em;
`;

const BottomCard = styled.div`
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
`;

const Button = styled.button`
  border-radius: 8px;
  background-color: #4dd0e1;
  text-transform: uppercase;
  font-size: 1em;
  color: white;
  border: none;
  padding: 1em 2em;
  width: 80%;
  -webkit-box-shadow: 0px 1px 1px 0px rgba(153, 153, 153, 1);
  -moz-box-shadow: 0px 1px 1px 0px rgba(153, 153, 153, 1);
  box-shadow: 0px 1px 1px 0px rgba(153, 153, 153, 1);
  cursor: pointer;
  outline: none;
  &:active {
    transform: translateY(2px);
  }
`;

// Search
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

const FormStyled = styled(Form)``;
const FieldStyled = styled(Field)`
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
const productList =[];
// main function
function ProductsItem(props) {

    const [signOut, state2, dispatch] = useContext(AppContext);
    const [search, setSearch] = useState("");
    const handleChange = event => {
        event.preventDefault();
        setSearch(event.target.value);
    };

    let filteredProducts = products.filter(product => {
        return product.name.toLowerCase().indexOf(search) !== -1;
    });

    const addTo =  (e) => {
        console.log(e);
        if(!state2.orderDetails.includes(products[e])){
            dispatch({type: "ADD", payload: products[e], children:Number(products[e].price.split("$")[1])});
        } else {
            products[e].time = products[e].time +1
            dispatch({type: "ADDTOTOTAL", children:Number(products[e].price.split("$")[1])})
        }

    };
    console.log(state2);

    return (
        <>
            <DivSearch>
                <Input
                    type="text"
                    placeholder={"Name Search"}
                    onChange={handleChange}
                    name={"search"}
                />
                <SearchIcon>
                    <Searchengin />
                </SearchIcon>
            </DivSearch>
            <Container>
                {filteredProducts.map(value => (
                    <Div key={value.id}>
                        <TopCard>
                            <Avatar src={imageArray[Number(value.id)]} size={"200px"}/>
                            {imageName[value.id]}
                        </TopCard>
                        <BottomCard>
                            <Button onClick={() => addTo(value.id)}>Add to Cart</Button>
                        </BottomCard>
                    </Div>
                ))}
            </Container>
        </>
    );
}

export default ProductsItem;
