import { useMemo } from "react";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const totals = useMemo(() => {
    const result = transactions.reduce(
      (accumulator, transaction) => {
        if (transaction.type === "deposit") {
          accumulator.deposits += transaction.amount;
          accumulator.total += transaction.amount;
        } else {
          accumulator.withdraws += transaction.amount;
          accumulator.total -= transaction.amount;
        }
        return accumulator;
      },
      { deposits: 0, withdraws: 0, total: 0 }
    );

    return {
      deposits: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(result.deposits),
      withdraws: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(result.withdraws),
      total: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(result.total),
    };
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{totals.deposits}</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="Entradas" />
        </header>
        <strong>-{totals.withdraws}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>{totals.total}</strong>
      </div>
    </Container>
  );
}
