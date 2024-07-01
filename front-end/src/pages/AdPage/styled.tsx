import styled from "styled-components";

interface FakeProps {
  height?: number;
}

export const Fake = styled.div<FakeProps>`
  background-color: #ddd;
  height: ${(props) => props.height || 20}px;
`;

export const PageArea = styled.div`
  display: flex;
  margin-top: 20px;

  .box {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 4px #999;
    margin-bottom: 20px;
  }

  .box--padding {
    padding: 10px;
  }

  .leftSide {
    flex: 1;
    margin-right: 20px;
    .adImage {
      padding: 20px;
      width: 450px;
      height: 420px;
      margin-right: 20px;
      margin-left: 20px;
    }
    .adName {
      padding: 20px;

      .adCreated {
        color: #3C4453;
      }
    }
    .adInfo {
      padding: 20px;
      .adPrice {
        margin-bottom: 20px;
      }
      .adDescription {
      }
    }
  }

  .rightSide {
    width: 30%;
  }
  
  .adSide {
    width: 100px;
  }
`;

export const PriceArea = styled.div`
  background-color: #6A0DAD;
  border: 1px solid #aaa;
  border-radius: 20px;
  padding: 15px;
  color: #fff;
  font-size: 26px;
`;