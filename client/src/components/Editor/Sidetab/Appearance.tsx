import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ColorSetExample from "../../ColorSetExample";

const Container = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
  display: flex;
  justify-content: center;
`;

export default function Appearance() {
  const [colorSet, setColorSet] = useState('');
  const [font, setFont] = useState('');

  const FontExample = styled.div`
    font-family: ${font};
    font-size: 40px;
  `;

  const getStyleInfo = async () => {
    axios.get("/site/2").then((res): void => {
      const data = res.data.sites[0];
      setColorSet(data.colorSet);
      setFont(data.font);
    });
  };

  useEffect(() => {
    getStyleInfo();
  }, []);

  return (
    <>
      <Container><ColorSetExample colorSet={colorSet} /></Container>
      <Container><FontExample>{font}</FontExample></Container>
      <Container></Container>
    </>
  );
}
