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

    const handlePhotoUploaded = (url) => {
        setImageURL(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ date, category, description, amount, imageURL });
        // Aquí agregarías la lógica para enviar todos los datos del formulario junto con la URL de la imagen
    };

    return (
        <form onSubmit={handleSubmit}>
            <DateInput value={date} onChange={e => setDate(e.target.value)} />
            <CategoryDropdown value={category} onChange={e => setCategory(e.target.value)} />
            <DescriptionInput value={description} onChange={e => setDescription(e.target.value)} />
            <AmountInput value={amount} onChange={e => setAmount(e.target.value)} />
            <Camera onPhotoUploaded={handlePhotoUploaded} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ExpenseForm;
