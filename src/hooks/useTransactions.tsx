import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction(transaction: TransactionInput): Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

const TransactionContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(
    [] as Transaction[]
  );
  useEffect(() => {
    api
      .get<{ transactions: Transaction[] }>(`/transactions`)
      .then(({ data }) => {
        setTransactions(
          data.transactions.map((tr) => ({
            ...tr,
            formattedAmount: new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(tr.amount),
            formattedDate: new Intl.DateTimeFormat("pt-BR").format(
              new Date(tr.createdAt)
            ),
          }))
        );
      });
  }, []);

  async function createTransaction(transaction: TransactionInput) {
    await api
      .post("/transactions", { ...transaction, createdAt: new Date() })
      .then(({ data }) => {
        setTransactions([...transactions, { ...data.transaction }]);
      });
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  return context;
}
