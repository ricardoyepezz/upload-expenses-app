// ExpenseForm.js
import React, { useState } from 'react';
import Camera from './Camera';
import DateInput from './DateInput';
import CategoryDropdown from './CategoryDropdown';
import DescriptionInput from './DescriptionInput';
import AmountInput from './AmountInput';

const ExpenseForm = () => {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [key, setKey] = useState(0);  
    const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID
    const sheetName = 'Hoja1'
    
    const handlePhotoUploaded = (url) => {
        setImageURL(url);
        setKey(prevKey => prevKey + 1);
    };

    const isFormValid = () => date && category && amount && imageURL;

    const resetForm = () => {
        setDate('');
        setCategory('');
        setDescription('');
        setAmount('');
        setImageURL('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            date,
            category,
            description,
            amount,
            imageURL,
            sheetName,
            spreadsheetId
        };
        const bodyStringify = JSON.stringify(formData)
        console.log(bodyStringify);
        fetch('https://upload-expenses-app.rj.r.appspot.com/sheet', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: bodyStringify
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data.message);
                alert('Data successfully added to the sheet!');
                resetForm();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to add data to the sheet!');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <DateInput value={date} onChange={e => setDate(e.target.value)} />
            <CategoryDropdown value={category} onChange={e => setCategory(e.target.value)} />
            <DescriptionInput value={description} onChange={e => setDescription(e.target.value)} />
            <AmountInput value={amount} onChange={e => setAmount(e.target.value)} />
            <Camera key={key} onPhotoUploaded={handlePhotoUploaded} />
            <button type="submit" disabled={!isFormValid()}>Submit</button>
        </form>
    );
};

export default ExpenseForm;
