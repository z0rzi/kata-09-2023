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

        let price = Math.floor(Math.random() * 1000) / 10;

        if (expenses.length === 666) {
            price = 1000000;
        }

        expenses.push({
            transaction_id: id++,
            category: category,
            date: new Date(date),
            price,
            description: `Spending in category ${category}`
        });

        // Increasing the date by anywhere between 0 and 24h
        date.setUTCMinutes(
            date.getUTCMinutes() + Math.floor(Math.random() * 60 * 24 * 30)
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
    background: #a1ccd1;
    padding: 3px;
    text-align: center;
    margin-top: 30px;
    cursor: pointer;
`;

const data = [
  {
    "transaction_id": 0,
    "category": "Technology",
    "date": "2022-01-01",
    "price": 66.3,
    "description": "Spending in category Technology"
  },
  {
    "transaction_id": 1,
    "category": "Entertainment",
    "date": "2022-01-05",
    "price": 11.7,
    "description": "Spending in category Entertainment"
  },
  {
    "transaction_id": 2,
    "category": "Insurance",
    "date": "2022-01-18",
    "price": 24.6,
    "description": "Spending in category Insurance"
  },
  {
    "transaction_id": 3,
    "category": "Food",
    "date": "2022-01-27",
    "price": 30.1,
    "description": "Spending in category Food"
  },
  {
    "transaction_id": 4,
    "category": "Travel",
    "date": "2022-02-04",
    "price": 31.8,
    "description": "Spending in category Travel"
  },
  {
    "transaction_id": 5,
    "category": "Travel",
    "date": "2022-02-17",
    "price": 12.2,
    "description": "Spending in category Travel"
  },
  {
    "transaction_id": 6,
    "category": "Clothing",
    "date": "2022-03-06",
    "price": 93.5,
    "description": "Spending in category Clothing"
  },
  {
    "transaction_id": 7,
    "category": "Travel",
    "date": "2022-03-15",
    "price": 87.6,
    "description": "Spending in category Travel"
  },
  {
    "transaction_id": 8,
    "category": "Insurance",
    "date": "2022-03-26",
    "price": 46.8,
    "description": "Spending in category Insurance"
  },
  {
    "transaction_id": 9,
    "category": "Clothing",
    "date": "2022-04-15",
    "price": 67.6,
    "description": "Spending in category Clothing"
  }
]

export default function App() {
    const [expenses] = useState(createRandomExpenses());
    const [apiMessage, setApiMessage] = useState('');
    const [unusualIds, setUnusualIds] = useState(new Set<number>());

    function onCheck() {
        axios
            .post(
                'http://localhost:8000/validate',
                expenses.map((exp) => ({
                    ...exp,
                    date: exp.date.toISOString().slice(0, 10)
                }))
            )
            .then((message) => {
                const messageText = message.data['email_text'] as string;
                setApiMessage(messageText);

                const ids = new Set<number>();
                messageText.match(/(?<=transaction_id: )\d+/g).forEach((match) => {
                    ids.add(+match);
                });
                setUnusualIds(ids);
            })
            .catch(() => {});
    }

    return (
        <Container>
            <h1 style={{ textAlign: 'center', paddingBottom: 40 }}>
                💸 Expenses App 💸
            </h1>
            <ExpensesContainer>
                {expenses.map((exp) => (
                    <ExpenseComponent unusual={unusualIds.has(exp.transaction_id)} expense={exp}></ExpenseComponent>
                ))}
            </ExpensesContainer>
            <CheckButton onClick={onCheck}>
                Check for unusual spendings
            </CheckButton>
            <pre>{apiMessage}</pre>
        </Container>
    );
}
