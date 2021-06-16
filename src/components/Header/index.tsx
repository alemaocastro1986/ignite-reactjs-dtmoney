import logo from "../../assets/logo.svg";

import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal(): void;
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="dtmoney" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
};
