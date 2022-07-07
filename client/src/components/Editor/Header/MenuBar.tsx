import React, { MouseEvent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    min-width: 560px;
    border-right: 1px solid #D1D1D1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const unclicked = '#999999';
const clicked = '#000000';

const Items = styled.div`
    width: 33.3%;
    text-align: center;
    font-weight: 650;
    color: ${unclicked};

    :hover {
        cursor: pointer;
    }
`;

function clickHandler(e: React.MouseEvent<HTMLElement>) {
    const block = document.getElementById('block');
    block!.style.color = unclicked;

    const appearance = document.getElementById('appearance');
    appearance!.style.color = unclicked;

    const setting= document.getElementById('setting');
    setting!.style.color = unclicked;
    const target = e.target as HTMLElement;
    target.style.color = clicked;
}

export default MenuBar;
function MenuBar() {
    return <Container>
        <Items id="block" onClick={clickHandler}>Block</Items>
        <Items id="appearance" onClick={clickHandler}>Appearance</Items>
        <Items id="setting" onClick={clickHandler}>Setting</Items>
    </Container>
}