import styled, { createGlobalStyle } from 'styled-components'

import Colors from './colors'
// import Fonts from "../styles/fonts";

export const responsiveDesktop = '1000px'
export const responsiveTablet = '760px'
export const responsiveMobile = '500px'

// export const adminHeader = '50px'
// export const adminMenu = '200px'
export const pagePadding = '15px'
export const adminViewHeader = '50px'

const GlobalStyle = createGlobalStyle`

  /* html {
    min-height: 100%;
    min-width: 600px;
  } */
  :root {
    font-size: 14px;

    @media screen and (min-width: 1024px) {
      font-size: 16px;
    }

    --primary-color: ${Colors.primary};
    --secondary-color: ${Colors.secondary};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-family: "Anton", 'Roboto', sans-serif;
    /* font-family: "Montserrat", sans-serif; */
    /* font-family: "Baloo Paaji 2", sans-serif; */
    /* font-family: "Barlow", sans-serif; */
    /* font-family: "Open Sans", sans-serif; */
    text-decoration: none;
    user-select: none;

    -webkit-tap-highlight-color: transparent !important;

  }

  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    width: 4px;
    border-radius: 10px;
    z-index: 1000;
  }

  ::-webkit-scrollbar-track {
    background: ${Colors.scrollbarTrack};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${Colors.scrollbarThumb};
  }


  footer {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;
    color: #FFF;
    padding-bottom: 100px;
    
    a {
      color: #ee7720;
    }
    
    .logos {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap-reverse;
      justify-content: center;
      align-items: center;
      
      img {
        height: 60px;
      }
    }
  }
`

export default GlobalStyle

export const Screen = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  min-height: 100vh;
`

export interface IEditorSelection {
  width?: number
  height?: number
  top?: number
  right?: number
  bottom?: number
  left?: number
  iscircle?: number
  bordertopleft?: number
  bordertopright?: number
  borderbottomright?: number
  borderbottomleft?: number
  bordercolor?: string
  bordersize?: string
}
