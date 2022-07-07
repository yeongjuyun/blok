import styled from 'styled-components';
import Block from './Article/Block';
import Appearance from './Article/Appearance';
import Setting from './Article/Setting'
import React, { useState } from 'react';


const Container = styled.div`
    min-width: 560px;
    height: 100%;
    border-right: 1px solid #D1D1D1;
    flex-shrink: 0;
`;

const Header = styled.div`
    min-width: 560px;
    height: 80px;
    background-color: white;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const unclicked = '#999999';
const clicked = '#000000';

const Item = styled.div`
    width: 33.3%;
    text-align: center;
    font-weight: 650;
    color: ${unclicked};

    :hover {
        cursor: pointer;
    }
`;

const Article = styled.div`
    width: 560px;
    height: 100%;
`

export default Nav;
function Nav() {
    const [block, setBlock] = useState(false);
    const [appearance, setAppearance] = useState(false);
    const [setting, setSetting] = useState(false);

    function clickHandler(e: React.MouseEvent<HTMLElement>) {
        const target = e.target as HTMLElement;
        
        const list = ['block', 'appearance', 'setting'];
        for (let i = 0; i < list.length; i++) {
            const tmp = document.getElementById(list[i]);
            if (tmp !== null)
                tmp.style.color = unclicked;
        }

        if (target.id === 'block') {
            setBlock(true);
            setAppearance(false);
            setSetting(false);
        } else if (target.id === 'appearance') {
            setBlock(false);
            setAppearance(true);
            setSetting(false);
        } else {
            setBlock(false);
            setAppearance(false);
            setSetting(true);
        }

        target.style.color = clicked;
    }

    return <Container>
        <Header>
            <Item id="block" onClick={clickHandler}>Block</Item>
            <Item id="appearance" onClick={clickHandler}>Appearance</Item>
            <Item id="setting" onClick={clickHandler}>Setting</Item>
        </Header>
        <Article>
            { block ? <Block /> : '' }
            { appearance ? <Appearance /> : '' }
            { setting ? <Setting /> : ''}
        </Article>
    </Container>
}