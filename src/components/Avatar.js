import React from "react";
import styled from "styled-components";

let Container = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
`;
export default function Avatar(props) {
    const { src } = props;
    const { size } = props;
    return <Container src={src} size={size} />;
} // all you need to do is pass through the url to make the profile picture