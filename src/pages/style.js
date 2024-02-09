import styled, { createGlobalStyle, css } from "styled-components";
import fontFile from "../assets/fonts/digital.ttf";
const FontFace = css`
  @font-face {
    font-family: "digital"; /* Choose a suitable name for your font */
    src: local("digital"), url(${fontFile}) format("ttf");
    font-weight: normal;
    font-style: normal;
  }
`;

// Apply the font face globally
const GlobalStyle = createGlobalStyle`${FontFace}`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 230px;
  width: 260px;
  border-radius: 15px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.5);
  @media (min-width: 200px) and (max-width: 550px) {
    transform: scale(0.7);
  }
  @media (max-width: 550px) {
    margin-left: -2.5rem;
  }
`;
export const DealerCard = styled.div`
  height: 45%;
  width: 100%;
`;

export const DealerInfo = styled.div`
  height: calc(100%-40px);
  margin: 20px;
  width: calc(100%-40px);
`;

export const DealerCode = styled.p`
  width: 100%;
  color: #dd1947;
  font-size: 0.9rem;
`;

export const GSTN = styled.p`
  width: 100%;
  font-size: 0.9rem;
  margin-top: -2px;
  color: #288bb1;
`;

export const Zone = styled.p`
  width: 100%;
  padding-top: 2px;
  font-size: 0.8rem;

  color: #288bb1;
`;

export const MarketName = styled.p`
  margin-top: -3px;
  width: 100%;
  font-size: 1rem;
  font-family: "GabrielSans Bold";
  color: #288bb1;
`;

export const DealerName = styled.div`
  height: 20%;
  width: 100%;
  background: #298bb0;
  display: flex;
  align-items: center;

  & > h3 {
    margin-left: 20px;
    width: calc(100% - 40px);
    color: #fff;
    line-height: 1.2rem;
    font-family: "GabrielSans Bold";
  }
`;

export const PriceInfo = styled.div`
  height: 35%;
  width: 100%;
  display: flex;
`;

export const Form = styled.form`
  width: 30%;
  height: 55%;
  background: #ed9cbb;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-radius: 5px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: auto;
`;

export const PriceInput = styled.input`
  font-family: "GabrielSans Bold";
  width: 100%;
  border: none;
  background: none;
  height: 50%;
  text-align: center;
  color: #fff;
  &::placeholder {
    color: #f4c2d4;
    letter-spacing: 2px;
    font-size: 0.7rem;
  }

  &:focus {
    outline: none;
  }
`;

export const UpdateButton = styled.button`
  width: 100%;
  height: 50%;
  background-color: #dd1947;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-family: "GabrielSans Bold";
  font-size: 0.7rem;
`;

export const Price = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #dd1947;

  font-family: "GabrielSans Bold";
`;

export const ViewButton = styled.button`
  border: none;
  background-color: #dc1847;
  padding: 0 20px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  cursor: pointer;
`;

export const ViewCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: center;
`;

export const ViewCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 100px;
  width: 200px;
  border-radius: 15px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.5);
  @media (min-width: 200px) and (max-width: 550px) {
    transform: scale(0.7);
  }
  @media (max-width: 550px) {
    margin-left: -2.5rem;
  }
`;

export const IntervalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const IntervalButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;
  &:hover {
    background-color: #45a049;
  }
`;

export const CurrentPrice = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin-top: 20px;
`;
