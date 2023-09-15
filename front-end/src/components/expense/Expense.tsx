import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export type Expense = {
    transaction_id: number;
    date: Date;
    price: number;
    category: string;
    description: string;
};

type ExpenseProps = {
    unusual: boolean,
    expense: Expense;
};

const Container = styled.div<{ $unusual: boolean }>`
    background-color: ${props => props.$unusual?'#f445':'transparent'};
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #222;
`;

const Category = styled.span<{ $color: string }>`
    padding: 2px 15px;
    background-color: ${(props) => props.$color};
    font-weight: bold;
    color: white;
    border-radius: 1000px;
`;

const categoryColors = new Map<string, string>();

function formatDate(date: Date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

function randomDarkHexColor(): string {
    // Define the range for each color component (0-127 for dark-ish colors)
    const min = 0;
    const max = 127;

    // Generate random values for each color component
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;

    // Convert the RGB values to a hexadecimal color representation
    const hexColor = `#${r.toString(16).padStart(2, '0')}${g
        .toString(16)
        .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return hexColor;
}

export default function ExpenseComponent(
    props: PropsWithChildren<ExpenseProps>
) {
    const category = props.expense.category;
    if (!(category in categoryColors)) {
        categoryColors.set(category, randomDarkHexColor());
    }
    const color = categoryColors.get(category);

    return (
        <Container $unusual={props.unusual}>
            <div style={{ opacity: 0.5, marginRight: 50, flexGrow: 0 }}>
                #{props.expense.transaction_id}
            </div>
            <div style={{ flexGrow: 0 }}>{formatDate(props.expense.date)}</div>
            <div style={{ textAlign: 'center', flexGrow: 1 }}>
                <Category $color={color}> {props.expense.category} </Category>
            </div>
            <div style={{ flexGrow: 1 }}>{props.expense.description}</div>
            <div style={{ flexGrow: 0, fontWeight: 'bold' }}>
                {props.expense.price}€
            </div>
        </Container>
    );
}
