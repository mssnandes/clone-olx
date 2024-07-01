import styled from 'styled-components';

export const HeaderArea = styled.div`
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid #ccc;
  .container {
    max-width: 80%;
    margin: auto;
    display: flex;
  }

  a {
    text-decoration: none;
  }

  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    height: 60px;

    .logo-1,
    .logo-2,
    .logo-3 {
      font-size: 30px;
      font-weight: bold;
    }
    .logo-1 {
      color: #ff0000;
    }
    .logo-2 {
      color: #00ff00;
    }
    .logo-3 {
      color: #0000ff;
    }
  }

  nav {
    padding-top: 10px;
    padding-bottom: 10px;

    ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    ul {
      display: flex;
      align-items: center;
      height: 40px;
    }

    li {
      margin-left: 15px;
      margin-right: 10px;

      a, button {
        border: 0;
        background: none;
        color: #000;
        font-size: 16px;
        cursor: pointer;
        outline: 0;
        &:hover {
          color: #8b3bde;
        }

        &.button {
          background-color: #ff8100;
          border-radius: 4px;
          color: #fff;
          padding: 5px 4px;
        }

        &.button:hover {
          background-color: #e57706;
        }
      }
    }

    .signin {
      border-radius: 30px;
      color: #000;
      outline: 0;
      border: 1px solid #ccc;
      padding: 8px 45px;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #8b3bde;
        border: 1px solid #8b3bde;
      }
    }
    
    .signup {
      border-radius: 30px;
      color: #fff;
      outline: 0;
      border: 1px solid #ccc;
      padding: 8px 25px;
      font-size: 18px;
      cursor: pointer;
      background-color: #ee9637;
      &:hover {
        background-color: #DF7400;
      }
    }
  }
`;

export const HeaderIconLabelContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    color: #8b3bde;
  }
`;

export const HeaderIconLabel = styled.span`
  margin-left: 5px;
`;
