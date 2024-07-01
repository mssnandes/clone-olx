import styled from 'styled-components';

export const Item = styled.div`
  a {
    display: block;
    border: 1px solid #ccc;
    margin: 10px;
    text-decoration: none;
    border-radius: 20px;
    color: #000;

    .itemData {
      padding: 20px;
      background-color: #fff;
    }

    &:hover img {
      transform: scale(1.1);
      transition: transform 0.3s ease-in-out;
      border: 1px solid #ccc;
      background-color: #eee;
    }

    .itemImage {
      overflow: hidden;
      margin-bottom: 10px;
    }

    .itemImage img {
      width: 100%;
      border-radius: 5px;
    }

    .itemPrice {
      font-weight: bold;
      margin-bottom: 15px;
    }

    .itemName, .itemState {
      margin-bottom: 20px;
    }

    .itemState {
      display: flex;
      align-items: center;
    }
  }
`;
