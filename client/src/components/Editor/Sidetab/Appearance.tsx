import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ColorSetExample from "../../ColorSetExample";
import { CustomSelect, Label, Required } from "../../Input";

const Container = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
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
      <Container>
      <Label required={true}>
        폰트
        <Required>*</Required>
        </Label>
        <FontExample>{font}</FontExample>
        <CustomSelect/>
      </Container>
      <Container></Container>
    </>
  );
}
