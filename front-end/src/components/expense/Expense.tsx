import { PropsWithChildren } from "react";
import styled from 'styled-components';

export type Expense = {
    transaction_id: number;
    date: Date;
    price: number;
    category: string;
    description: string;
};

type ExpenseProps = {
    expense: Expense
};

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #222;
`;

function formatDate(date: Date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

export default function ExpenseComponent(props: PropsWithChildren<ExpenseProps>) {
    return <Container>
        <div style={{ opacity: .5, marginRight: 50, flexGrow: 0 }}>#{props.expense.transaction_id}</div>
        <div style={{ flexGrow: 0 }}>{formatDate(props.expense.date)}</div>
        <div style={{ flexGrow: 1 }}>{props.expense.category}</div>
        <div style={{ flexGrow: 1 }}>{props.expense.description}</div>
        <div style={{ flexGrow: 0, fontWeight: 'bold' }}>{props.expense.price}€</div>
    </Container>
}
