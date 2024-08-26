import styled, { css } from 'styled-components'
import {
  IEditorSelection,
  Screen,
  responsiveTablet
} from '@/utils/styles/globals'
import Colors from '@/utils/styles/colors'
import { InputName, LockBtn } from '@/utils/styles/inputs'

export const ParticipanteDashboard = styled(Screen)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 50px;

  background-repeat: no-repeat;
  /* background-image: url('bg-fundo.png'), url('bg-fundo.webp'); */
  background-position: center;
  background-size: cover;

  background: rgba(1,3,45,1);
  background: linear-gradient(180deg, rgba(1,0,36,1) 0%, rgba(1,3,45,1) 35%, rgba(0,46,93,1) 100%);
  background: linear-gradient(170deg, rgb(51, 13, 6) 0%, rgb(21, 8, 53) 20%, rgb(1, 5, 84) 38%, rgb(0, 46, 93) 100%);

  @media (max-width:400px) {
    background: linear-gradient(170deg, rgb(51, 13, 6) 0%, rgb(21, 8, 53) 12%, rgb(1, 5, 84) 38%, rgb(0, 46, 93) 100%);
  }
`

export const ParticipanteDashboardHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 70px;
  padding: 0 20px;

  background-color: #002e5d;
`

export const ParticipanteDashboardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 100%;

  h-logo {
    height: 60px;
  }

  ul {
    display: flex;
    column-gap: 20px;

    li {
      list-style: none;

      a {
        font-size: 13px;
        line-height: 13px;
        font-weight: 500;

        color: white;
      }
    }
  }

  span {
    display: none;

    a {
      svg {
        font-size: 22px;
        color: white;
      }
    }
  }

  @media screen and (max-width: ${responsiveTablet}) {
    ul {
      display: none;
    }

    span {
      display: flex;
    }
  }
`

export const ParticipanteDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  width: 100%;
  max-width: 700px;
  padding: 0 20px;
`

export const ParticipanteDashboardHeadline = styled.h2`
  font-size: 30px;
  line-height: 38px;
  font-weight: 200;
  letter-spacing: 0.5px;
  text-align: center;
  font-style: italic;

  color: ${Colors.primary};

  b {
    font-weight: 600;
    color: white;

  }
`

export const ParticipanteDashboardLabel = styled.h3`
  font-size: 15px;
  line-height: 22px;
  font-weight: 200;
  letter-spacing: 0.5px;
  text-align: center;

  color: white;
`

export const ParticipanteDashboardPost = styled.div`
  position: relative;
  display: flex;
  width: fit-content;
  height: fit-content;
  min-width: 540px;

  img {
    /* width: 100%; */
    max-width: 540px;
    height: auto;
  }
`

export const ParticipanteDashboardPostLoading = styled.div`
  position: relative;
  display: flex;
  width: 540px;
  height: 540px;
  border-radius: 4px;

  border: 2px solid orange;
  background-color: rgba(0, 0, 100, 0.2);
`

export const ParticipanteDashboardPostSelection = styled.div<IEditorSelection>`
  position: absolute;
  display: flex;
  cursor: pointer;
  transition: 0.3s;

  backdrop-filter: blur(5px);

  right: ${({ right }) => `${right}px`};
  bottom: ${({ bottom }) => `${bottom}px`};
  /* left: ${({ left }) => `${left}px`}; 
  top: ${({ top }) => `${top}px`};  */

  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};

  /* aborder: ${({ bordercolor, bordersize }) => `${bordersize || "2px"} solid ${bordercolor}`}; */
  
  border-top-left-radius: ${({ bordertopleft }) => `${bordertopleft}px`};
  border-top-right-radius: ${({ bordertopright }) => `${bordertopright}px`};
  border-bottom-right-radius: ${({ borderbottomright }) => `${borderbottomright}px`};
  border-bottom-left-radius: ${({ borderbottomleft }) => `${borderbottomleft}px`};


  &:hover {
    backdrop-filter: blur(8px);
  }

  .client-image-instructions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 5px;

    font-size: 1.15rem;
    line-height: 18px;
    font-weight: 600;
    text-align: center;
    color: rgba(0, 0, 0, 0.9);

    svg {
      font-size: 30px;
      color: rgba(0, 0, 0, 0.9);
    }
  }
  .ant-upload-select {
    border: ${({ bordercolor, bordersize }) => `${bordersize || "2px"} solid ${bordercolor}`} !important;
  }
  .ant-upload.ant-upload-select {
    overflow: hidden !important;

    width: ${({ width }) => `${width}px`} !important;
    height: ${({ height }) => `${height}px`} !important;
    
    border-top-left-radius: ${({ bordertopleft }) =>
    `${bordertopleft}px`} !important;
    border-top-right-radius: ${({ bordertopright }) =>
    `${bordertopright}px`} !important;
    border-bottom-right-radius: ${({ borderbottomright }) =>
    `${borderbottomright}px`} !important;
    border-bottom-left-radius: ${({ borderbottomleft }) =>
    `${borderbottomleft}px`} !important;
    

    ${({ iscircle }) =>
    iscircle &&
    css`
        border-radius: 100% !important;
      `}
  }

  ${({ iscircle }) =>
    iscircle &&
    css`
      border-radius: 100%;
    `}
`

export const ParticipanteDashboardExport = styled.div<LockBtn>`
  display: flex;
  justify-content: flex-end;
  column-gap: 12px;

  button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    padding: 15px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;

    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;

    svg {
      font-size: 20px;
      color: white;
    }

    color: white;
    background-color: ${({ lock }) => lock ? Colors.secondary : Colors.primary};

    /* &:nth-of-type(1) {
      background-color: #0a605f;
    }

    &:nth-of-type(2) {
      background-color: #0a66c2;
    }

    &:nth-of-type(3) {
      background-color: #0a6662;
    } */

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      cursor: default;
    }
  }
`

export const ExportButtonLock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  border-radius: 100px;

  background-color: #A#F00;

  svg {
    font-size: 15px !important;

    color: rgb(20, 20, 20);
  }
`


export const Input = styled.input<InputName>`
  position: absolute;

  border: none;
  border-radius: 3px;

  background: transparent;
  color: white;

  &:hover, &:focus {
    background: white;
    color: black;
  }

  font-size: 30px;
  line-height: 38px;
  font-weight: 200;
  letter-spacing: 0.5px;
  text-align: center;

  bottom: ${({ bottom }) => bottom || 0}px;
  width: 100%;

`;
export const Texto = styled.span<InputName>`
  position: absolute;
  pointer-events: none;
  user-select: none;

  border: none;
  outline: none;
  background: transparent;
  color: ${(({ color }) => color || "white")};

  /* box-sizing: border-box; */
  font-family: "Anton",'Roboto',sans-serif;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent !important;

  font-size: 30px;
  line-height: 38px;
  font-weight: 200;
  letter-spacing: 0.5px;
  text-align: center;
  bottom: ${({ bottom }) => bottom || 0}px;
  width: 100%;
`;
