import styled, { css } from 'styled-components';

type ColorProps = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
};

const ContentBox = styled.div<ColorProps>`
  position: relative;
  width: 280px;
  height: 165px;
  background-color: #fff;
  border: 1px solid #f5f5f5;
  border-radius: 7px;
  box-sizing: border-box;
  box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.07);
  margin: 1rem;
  user-select: none;
  transition: 0.3s;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }

  .circle {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    border: 7px solid #3f3f3f;
    border-radius: 100px;
    box-sizing: border-box;
  }

  ${({ color1, color2, color3, color4 }) => {
    return css`
      .circle1 {
        top: 30px;
        left: 30px;
        background-color: ${color1};
      }
      .circle2 {
        top: 30px;
        left: 53px;
        background-color: ${color2};
      }
      .circle3 {
        top: 30px;
        left: 76px;
        background-color: ${color3};
      }
      .circle4 {
        top: 30px;
        left: 99px;
        background-color: ${color4};
      }
    `;
  }}

  .contentTitle {
    position: absolute;
    top: 90px;
    left: 30px;
    font-size: 20px;
    font-weight: bold;
  }

  .contentDesc {
    position: absolute;
    top: 120px;
    left: 30px;
    font-size: 14px;
    font-weight: regular;
    color: #7a7b9b;
  }
`;

type TemplateCardProps = {
  title: string;
  description: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  className: string;
  onClick?: () => void;
};

TemplateCard.defaultProps = {
  title: 'black',
  description: 'small',
  color1: '#5754de',
  color2: '#aba9ff',
  color3: '#ffffff',
  color4: '#e2e2e2',
  className: '',
  onClick: () => {},
};

export function TemplateCard({
  title,
  description,
  color1,
  color2,
  color3,
  color4,
  className,
  onClick,
}: TemplateCardProps) {
  return (
    <ContentBox
      className={className}
      color1={color1}
      color2={color2}
      color3={color3}
      color4={color4}
      onClick={onClick}
    >
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
      <div className="circle circle4"></div>
      <div className="contentTitle">{title}</div>
      <div className="contentDesc">{description}</div>
    </ContentBox>
  );
}
