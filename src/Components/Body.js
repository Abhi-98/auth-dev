import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'

 function Body({candidate1,candidate2, vote}) {

    const [candidate, setCandidate] = useState("");

    const onChange = (e) => {
        setCandidate(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(candidate.id != 0){
            vote(Number(candidate));
        }else{
            window.alert("Error in voting");
        }
    };

    let optionsRender = () => {
        if(candidate1 && candidate2){
            return (
                <select name="candidate" id="candidate" onChange={onChange}>
                    <option defaultValue="Select Candidate">Select Candidate</option>
                <option value="1">{candidate1.name}</option>
                  <option value="2">{candidate2.name}</option>
                </select> 
            )
        }else{
            return(
                <div>Error</div>
            )
        }
    }

    let renderOrNot = () => {
        if(candidate1 && candidate2){
            return(
                <tbody>
                <tr>
                  <td>{candidate1.id}</td>
                  <td>{candidate1.name}</td>
                  <td>{candidate1.voteCount}</td>
                </tr>
                <tr>
                  <td>{candidate2.id}</td>
                  <td>{candidate2.name}</td>
                  <td>{candidate2.voteCount}</td>
                </tr>
              </tbody>
            )
        }else{
            return(
                <div>Error</div>
            )
        }
    }

    return (
        <div>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Votes</th>
    </tr>
  </thead>
        {renderOrNot()}
</Table>

<form onSubmit={onSubmit}>
  {optionsRender()}
  <br></br>
  <button>Vote Candidate {candidate}</button>
  </form>
        </div>
    )
}

export default Body
