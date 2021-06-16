import styled from "styled-components";

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0.5rem;

    @media (max-width: 720px) {
      thead {
        display: none;
      }
      tbody tr {
        display: flex;
        flex-direction: column;

        & + tr {
          margin-top: 8px;
        }
      }
    }

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);
      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }
    }

    @media (max-width: 720px) {
      border-spacing: 0rem;
    }
  }
`;
