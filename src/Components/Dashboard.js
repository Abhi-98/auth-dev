import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Web3 from "web3";
import ElectionAbi from "../contracts/Election.json";
import Navbar from "../Components/Navbar"
import Body  from "../Components/Body";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const [electionContract,setElection] = useState();
  const [candidate1, setCandidate1] = useState();
  const [candidate2, setCandidate2] = useState();
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {

    setLoading(true);

    if (
      typeof window.ethereum == "undefined" ||
      typeof window.web3 == "undefined"
    ) {
      return;
    }
    const web3 = window.web3;

    let url = window.location.href;
    console.log(url);

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    setCurrentAccount(account);

    if (accounts.length == 0) {
      return;
    }
    const networkId = await web3.eth.net.getId();
    const networkData = ElectionAbi.networks[5777];
    console.log(networkData);
    if (networkData) {
      const electionContract = new web3.eth.Contract(ElectionAbi.abi, networkData.address);

      //Candidate 1
      const candidate1 = await electionContract.methods.candidateArray(1).call();
      const candidate1Id = candidate1.id;
      const candidate1Name = candidate1.name;
      const candidate1VoteCount = candidate1.voteCount;

      //Candidate 2
      const candidate2 = await electionContract.methods.candidateArray(2).call();
      const candidate2Id = candidate2.id;
      const candidate2Name = candidate2.name;
      const candidate2VoteCount = candidate2.voteCount;

      setCandidate1(candidate1);
      setCandidate2(candidate2);
      setElection(electionContract);
      setLoading(false);
    } else {
      window.alert("the contract not deployed to detected network.");
    }
  };

  const vote = async (candidateId) => {
    await electionContract.methods
      .castVote(candidateId)
      .send({ from: currentAccount })
      .once("recepient", (recepient) => {
        console.log("success");
      })
      .on("error", () => {
        console.log("error");
      });
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  
  return (
    <>
       <Navbar account={currentAccount} />
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email} <br></br>
          <strong>Address:</strong> {currentAccount}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <Body candidate1={candidate1} candidate2={candidate2} vote={vote}/>
    </>
  );
}

