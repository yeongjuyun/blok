import styled from "styled-components";

const Container = styled.div`
  width: 220px;
  height: 70px;
  display: flex;
`;

function drawCircle(len: number, background: string, index: number) {
  const Circle = styled.div`
    width: 60px;
    height: 60px;
    border: 6px solid #3f3f3f;
    border-radius: 50%;
    margin-right: -25px;
    background-color: ${background};
    z-index: ${len - index};
  `;

  return <Circle key={index} />;
}

export default function ColorSetExample(props: any) {
  const colorList = [];
  const circleList = [];
  console.log(props.center);

  for (let color in props.colorSet) {
    if (props.colorSet.hasOwnProperty(color)) {
      colorList.push(props.colorSet[color]);
    }
  }

  for (let i = 0; i < colorList.length; i++) {
    circleList.push(drawCircle(colorList.length, colorList[i], i));
  }

  return <Container>{circleList}</Container>;
}
