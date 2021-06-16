import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 2rem;
  margin-top: -10rem;

  @media (max-width: 720px) {
    overflow: hidden;
    overflow-x: scroll;
  }

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    @media (max-width: 720px) {
      width: 300px;
      height: 200px;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      line-height: 3rem;
      font-weight: 500;

      @media (max-width: 720px) {
        margin-top: 50px;
      }
    }
    &.highlight-background {
      background: var(--green);
      color: #fff;
    }
  }
`;
