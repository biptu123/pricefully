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
  width: 18rem;
  min-height: 20rem;
  overflow: hidden;
  border-radius: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 -8px 5px #444444;
  border-bottom: 0.1em solid #444444;
  @media (min-width: 200px) and (max-width: 550px) {
    transform: scale(0.7);
  }
  @media (max-width: 550px) {
    margin-left: -2.5rem;
  }
`;
export const DealerCard = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: #f5dfe8;
`;

export const DealerCode = styled.p`
  width: 100%;
  padding-bottom: 5px;
  font-family: monospace;
  font-size: 1.1rem;
  color: #dc1847;
  font-weight: 600;
`;

export const GSTN = styled.p`
  width: 100%;
  font-size: 1rem;
  padding-bottom: 5px;
  font-family: monospace;
  font-weight: 600;

  color: #288bb1;
`;

export const Zone = styled.p`
  width: 100%;
  padding-top: 5px;
  /* padding-bottom: 2px; */
  font-weight: 600;
  font-family: monospace;
  color: #288bb1;
`;

export const MarketName = styled.p`
  width: 100%;
  font-weight: 600;
  font-size: 1.5rem;
  font-family: monospace;
  color: #288bb1;
`;

export const DealerInfo = styled.div`
  padding-top: 20px;
  padding-left: 20px;
`;

export const DealerName = styled.p`
  padding-left: 20px;
  width: 100%;
  font-size: 1.5rem;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: monospace;
  font-weight: 700;
  background-color: #288bb1;
  color: #ffff;
`;

export const PriceInfo = styled.div`
  padding-left: 20px;

  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #f5e0e8;
  /* height: 30%; */
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Form = styled.form`
  width: 27%;
  aspect-ratio: 3/2;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: #ed9cbb;
  height: fit-content;
  overflow: hidden;
`;

export const PriceInput = styled.input`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  border: none;
  background: none;
  width: 50%;
  height: 50%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  color: #ffffff;
  letter-spacing: 1.5px;
  font-weight: 700;

  &::placeholder {
    color: #ffffff;
  }

  &:focus {
    outline: none;
  }
`;

export const UpdateButton = styled.button`
  border: none;
  background-color: #dc1847;
  padding: 0;
  border-radius: 5px;
  width: 100%;
  margin: 0;
  height: 50% !important;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  font-family: monospace;
`;

export const Price = styled.p`
  width: 60%;
  height: fit-content;
  padding-left: 20px;
  font-size: 3rem;
  font-weight: 700;
  color: #dc1847;
  font-family: "digital", sans-serif;
`;

export const ViewButton = styled.button`
  border: none;
  background-color: #dc1847;
  box-shadow: 0 -13px #ed9cbb;
  padding: 5px 20px;
  border-radius: 5px;
  margin-right: auto;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  font-family: monospace;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 -5px #ed9cbb;
    transition: box-shadow 0.5s ease-in-out;
  }
`;

export const ViewCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #f5dfe8;
`;
