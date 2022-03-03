import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/main-alternative.svg";
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'

const LandingPage = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job <span>tracking</span> app</h1>
          <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <Link to='/register' className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunter' className="img main-img" />
      </div>
    </Wrapper>
  );
};

// const Wrapper = styled.main`

//if we wrap any react component with styled component then all the classes and elements we can access inside of that styled component, for better understanding see following styles

//   nav{
//     width: var(--fluid-width);
//     max-width: var(--max-width);
//     height: var(--nav-height);
//     margin: 0 auto;
//     display: flex;
//     align-items: center;
//   }

//   .page{
//     min-height: calc(100vh - var(--nav-height));
//     display: grid;
//     align-items: center;
//     margin-top: -3rem;
//   }

//   h1{
//     font-weight: 700;
//     //we can also write comment inside css and also can target nested elements
//     span{
//       color: var(--primary-500);
//     }
//   }

//   p{
//     color: var(--grey-500);
//   }

//   .main-img{
//     display: none;
//   }

//   @media screen and (min-width: 992px){

//     .page{
//       grid-template-columns: 1fr 1fr;
//       column-gap: 3rem;
//     }

//     .main-img{
//       display: block;
//     }
//   }
// `

export default LandingPage;
