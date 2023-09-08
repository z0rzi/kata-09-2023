import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import ExpenseComponent, { Expense } from './components/expense/Expense';

const categories = [
    'Education',
    'Clothing',
    'Entertainment',
    'Healthcare',
    'Housing',
    'Insurance',
    'Technology',
    'Investment',
    'Travel',
    'Food'
];

function createRandomExpenses() {
    const expenses = [] as Expense[];

    const date = new Date('2022-01-01');

    let id = 0;
    while (expenses.length < 1000) {
        const category =
            categories[Math.floor(Math.random() * categories.length)];

        expenses.push({
            transaction_id: id++,
            category: category,
            date: new Date(date),
            price: Math.floor(Math.random() * 1000) / 10,
            description: `Spending in category ${category}`
        });

        // Increasing the date by anywhere between 0 and 24h
        date.setUTCMinutes(
            date.getUTCMinutes() + Math.floor(Math.random() * 60 * 24)
        );
    }

    console.log(expenses);

    return expenses;
}

const Container = styled.div`
    margin: auto;
    width: 900px;
    height: 100%;
    text-align: center;
`;

const ExpensesContainer = styled.div`
    height: 70%;
    overflow-y: auto;
`;

const CheckButton = styled.button`
    width: 300px;
    border-radius: 5px;
    border: 0;
    outline: 0;
    background: #A1CCD1;
    padding: 3px;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
`;

export default function App() {
    const [expenses, setExpenses] = useState(createRandomExpenses);
    const [apiMessage, setApiMessage] = useState('');

    function onCheck() {
        axios.post('http://localhost:8000/validate', expenses).then((message) => {
            setApiMessage(JSON.stringify(message));
        });
    }

    return (
        <Container>
            <h1 style={{textAlign: 'center', paddingBottom: 40}}>Expenses app</h1>
            <ExpensesContainer>
                { expenses.map(exp => <ExpenseComponent expense={exp}></ExpenseComponent>) }
            </ExpensesContainer>
            <CheckButton onClick={onCheck}>Check for unusual spendings</CheckButton>
            <pre>{ apiMessage }</pre>
        </Container>
    );
}
