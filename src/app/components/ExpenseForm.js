import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Button, Form } from 'react-bootstrap';

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
    const [uploadMethod, setUploadMethod] = useState('camera');  // 'camera' o 'file'
    const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID
    const sheetName = 'Hoja1'
    
    const handlePhotoUploaded = (url) => {
        setImageURL(url);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('https://upload-expenses-app.rj.r.appspot.com/upload', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    setImageURL(data.url);  // Notifica al formulario la URL de la imagen subida
                })
                .catch(err => {
                    console.error('Error uploading file:', err);
                });
        }
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
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to add data to the sheet!');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='d-flex justify-content-center'>
             <ToggleButtonGroup className="mb-4" type="radio" name="uploadMethod" value={uploadMethod} onChange={setUploadMethod}>
                <ToggleButton id="tbg-radio-1" value={'camera'} variant="secondary">
                    Usar Cámara
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={'file'} variant="secondary">
                    Subir Archivo
                </ToggleButton>
            </ToggleButtonGroup>
            </div>
            {uploadMethod === 'camera' ? (
                <Camera onPhotoUploaded={handlePhotoUploaded} />
            ) : (
                <Form.Control className='mb-3' type="file" size="lg" accept="image/*,application/pdf" onChange={handleFileChange} />
            )}
            <DateInput value={date} onChange={e => setDate(e.target.value)} />
            <CategoryDropdown value={category} onChange={e => setCategory(e.target.value)} />
            <DescriptionInput value={description} onChange={e => setDescription(e.target.value)} />
            <AmountInput value={amount} onChange={e => setAmount(e.target.value)} />
            <Button type="submit" disabled={!isFormValid()}>Submit</Button>
        </form>
    );
};

export default ExpenseForm;
