import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "react-modal";
import { useTransactions } from "../../hooks/useTransactions";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose(): void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [type, setType] = useState("deposit");
  const [data, setData] = useState({
    title: "",
    amount: 0,
    type,
    category: "",
  });

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();
    await createTransaction(data);
    setData({
      title: "",
      amount: 0,
      type,
      category: "",
    });
    setType("deposit");
    onRequestClose();
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value: number | string =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setData({ ...data, [e.target.name]: value });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        type="button"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="close" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Nova Transação</h2>

        <input
          type="text"
          placeholder="Titulo"
          name="title"
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Valor"
          name="amount"
          onChange={handleInputChange}
        />

        <TransactionTypeContainer>
          <RadioBox
            isActive={type === "deposit"}
            activeColor="green"
            type="button"
            onClick={() => setType("deposit")}
          >
            <img src={incomeImg} alt="income" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            isActive={type === "withdraw"}
            activeColor="red"
            type="button"
            onClick={() => setType("withdraw")}
          >
            <img src={outcomeImg} alt="outcome" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          name="category"
          onChange={handleInputChange}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
