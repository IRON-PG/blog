import { css } from '@emotion/react';

const customStyles = css`
  .titleContent {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .descriptionWrapper {
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-bottom: -24px;
  }

  @media (max-width: 767px) {
    .descriptionWrapper {
      margin-bottom: 12px;;
    }
  }
  .date {
    color: grey;
    margin-top: 12px;
  }
  .authorWrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .authorImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

export const styles = [customStyles];
