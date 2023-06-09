import React from "react";
import styled from "styled-components";
import {useState } from "react";
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';

const element_style = {
    fontSize: "2.5rem",
    textAlign: "center",
};
function Income() {

 
    const [tableData, setTableData] = useState([]);
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        type: '',
        date: '',
        category: '',
        description: '',
    });
     const [showAlert,setShowAlert] = useState(false); 
    const handleOnChange = (event) => {
        setInputState({ ...inputState, [event.target.name]: event.target.value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if(validateform()){
        try {
          console.log(inputState);
          const response = await axios.post('http://localhost:5000/transactions/add-income', inputState, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            withCredentials: true, // Include credentials in the request
          });
          if (response.status === 200) {
            setTableData((prev) => [...prev, inputState]);
            console.log('Income added successfully');
            console.log(response.data);
            // navigate('/')
    
          } else {
            console.log('Income addition failed');
          }
        } 
        catch (err) {
          console.error('Error:', err);
        }
      }
      else{
         setShowAlert(true)
      }
        setInputState({ title: "", amount: "", type: "", category: "", description: "", })
    };
    const validateform=()=>{
       const{title,amount,type,category,description} = inputState;
      if (
        title.trim() === "" ||
        amount.trim() === "" ||
        type.trim() === "" ||
        category.trim() === "" ||
        description.trim() === "" 
      ) {
        return false;
      }
      return true;


    }
   
    return (

        <div className="form">
            <h1 className=" text-orange-500 font-semibold" style={element_style}>Add Incomes</h1>
            {showAlert && (
        <AlertStyled>
          Please fill in all the fields before submitting!!
        </AlertStyled>
      )}
            <FormStyled onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        value={inputState.title}
                        type="text"
                        className="form-control w-96"
                        name="title"
                        id="title"
                        placeholder="Title"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        value={inputState.amount}
                        type="number"
                        className="form-control w-96"
                        name="amount"
                        id="amount"
                        placeholder="Amount"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Type</label>
                    <input
                        value={inputState.type}
                        type="text"
                        className="form-control w-96"
                        name="type"
                        id="type"
                        placeholder="Type"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        value={inputState.date}
                        type="date"
                        className="form-control w-96"
                        name="date"
                        id="date"
                        placeholder="Date"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        value={inputState.category}
                        className="form-control w-96"
                        name="category"
                        id="category"
                        onChange={handleOnChange}
                    >
                        <option value="disabled">Select options</option>
                        <option value="salary">Salary</option>
                        <option value="freelancing">Freelancing</option>
                        <option value="investment">Investment</option>
                        <option value="bank">Bank</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="textarea">Description</label>
                    <textarea
                        value={inputState.description}
                        className="form-control w-96"
                        name="description"
                        id="description"
                        rows="3"
                        onChange={handleOnChange}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary border font-semibold text-lg mx-auto"> Submit
                </button>
            </FormStyled>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((user, index) => (
                        <tr key={index.id}>
                            <td>{index + 1}</td>
                            <td>{user.title}</td>
                            <td>{user.amount}</td>
                            <td>{user.date}</td>
                            <td>{user.category}</td>
                            <td>{user.description}</td>
                            <td>
                                <button className="btn btn-warning">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  margin-bottom: 15px;
  .form-group {
    margin-bottom: 1rem;
  }

  .form-control {
    padding: 0.5rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      outline: none;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    border-radius: 12px;
    margin-bottom: 4px;
    width: 20vh;
    &:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }
  }
`;
const AlertStyled = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;
export default Income;
