
import styled from "styled-components";

export const DivPersolalizada = styled.div`
    width: ${props => props.width};
    border: ${props => props.border};
    padding: 25px; //padding fixo de 25 pixel
    margin: ${props => props.margin};
    margin-top: ${props => props.marginTop};
`;

export const NavBar = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--cor-primaria);

    li {
        float: left;
        
        :last-child {
            float:right
        }

        :first-child {
            margin-left: 20px;
        }
    }

    li a {
        display: block;
        color: #fff;
        padding: 15px 17px;
        text-decoration: none;
        text-align: center;

        :hover {
            background-color: var(--cor-secundaria);
        }
    }

`;

{/* <ul>
    <li>
        <a href=""></a>
    </li>
</ul> */}
