import styled, {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        --main-background-color: #fff;
    }

    @media only screen and (max-width: 767px) {
        #main {
            .section-primary {
                .gem {
                    canvas {
                        width: 200px;
                        height: 200px;
                    }
                }
            }
        }
    }
`;

const Main = styled.main`
    width: 100%;
    background-color: var(--main-background-color);

    .section-primary {
        box-sizing: content-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(#000 0%, #1d1d1f 100%);
        text-align: center;

        .gem {
            canvas {
                width: 300px;
                height: 300px;
            }
        }
    }
`;

export { GlobalStyle, Main };
