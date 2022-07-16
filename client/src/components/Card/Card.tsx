import styled, { css } from 'styled-components';
import * as icon from '../../icons';
import React, { useState } from 'react';

export const CardHeader = styled.div<{ dropClicked: boolean }>`
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: ${(props) =>
    props.dropClicked === true ? '12px 12px 0 0' : '12px'};
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0px 24px;
  box-sizing: border-box;
  user-select: none;
`;

const CardContainer = styled.div`
  width: 100%;
`;

const CardBoby = styled.div`
  background: #ffffff;
  border: 1px solid #efefef;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 0 0 12px 12px;
  div:first-child {
    margin-top: 0px;
  }
`;

const Movable = styled.img`
  width: 22px;
  height: 22px;
  margin: auto 0;
  &:hover {
    cursor: pointer;
  }
`;

const TitleBox = styled.div`
  font-weight: 600;
  font-size: 18px;
  display: flex;
  margin-left: 16px;
`;

const Title = styled.span`
  margin: auto 0;
  margin-left: 17px;
  padding-top: 2px;
`;

const TitleIcon = styled.img`
  width: 24px;
  height: 24px;
  margin: auto 0;
`;
const Trash = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  padding: 10px;
  right: 64px;
  top: 9px;
  &:hover {
    cursor: pointer;
  }
`;
const Down = styled.img<{ dropClicked: boolean }>`
  width: 20px;
  height: 20px;
  position: absolute;
  padding: 10px;
  right: 22px;
  top: 9px;
  transition: 0.4s transform;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.dropClicked &&
    css`
      transform: rotate(180deg);
    `}
`;
type title = 'Footer' | 'Navbar' | 'Profile' | 'Hero' | 'Feature';

interface Cardprops {
  title: title;
  children: any;
}

function Icon(title: title) {
  switch (title) {
    case 'Footer':
      return icon.Footer;
    case 'Navbar':
      return icon.Navbar;
    case 'Profile':
      return icon.User;
    case 'Hero':
      return icon.Hero;
    default:
      return icon.Feature;
  }
}

export const Card = (props: Cardprops) => {
  const [dropClicked, setDropClicked] = useState<boolean>(false);
  return (
    <CardContainer>
      <CardHeader dropClicked={dropClicked}>
        <Movable src={icon.Movable} alt='' />
        <TitleBox>
          <TitleIcon src={Icon(props.title)} alt='' />
          <Title>{props.title}</Title>
        </TitleBox>
        <Trash src={icon.Trash} alt='' />
        <Down
          src={icon.Down}
          alt=''
          dropClicked={dropClicked}
          onClick={() => {
            setDropClicked((res) => {
              return !res;
            });
          }}
        />
      </CardHeader>
      {dropClicked && <CardBoby>{props.children}</CardBoby>}
    </CardContainer>
  );
};
