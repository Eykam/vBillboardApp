import React, { useEffect, useState} from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';
import awsmobile from '../aws-exports';

export const BillboardContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const billboardContract = new ethers.Contract(contractAddress, contractABI, signer);
    return billboardContract;
};


export const BillboardProvider = ({ children }) => {
    const [formData, setFormData] = useState({amount: '', message: ''});
    const [currentAccount, setCurrentAccount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [billboardCount, setBillboardCount] = useState(0);
    const [currPrice, setPrice] = useState(0);
    const [currOwner, setOwner] = useState("");
    const [uploadImg, setUploadImg] = useState(null);
    const [currImage, setCurrImage] = useState(null);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    const uploadImage = (e) => {
        console.log(e.target.files[0]);
        setUploadImg(URL.createObjectURL(e.target.files[0]));
        checkIfWalletIsConnected();
    }

    const awsUpload = async () => {
        
    }

    const getCurrImage = async (imageName) => {
        try{
            const url = "https://isvpizxfah.execute-api.us-east-1.amazonaws.com/download-image?bucketname=vbillboard-images&image="+imageName;

            const res = await fetch(url, {
                method:"POST"
            })
        
            console.log(res)
            
            return res.body
        }catch(error){
            throw new Error("API Call Failed")
        }
    }

    // const callAPI = async () => {
    //     const imgName="/Floorplan.PNG";

    //     //Either create inline policy for bucket or hide these values later
    //     const url = "https://emsj2ovfrc.execute-api.us-east-1.amazonaws.com/v1/key=amplify-vbillboard-dev-40817-deployment" + imgName;
    //     console.log(url);

    //     const options = {
    //         method:"GET",
    //         mode:"no-cors"
    //     }
        
    //     const currImg = await fetch(url,options);
        
    //     console.log(currImg);
    // }

    const checkIfWalletIsConnected = async () => {
        try{
            if(!ethereum) return alert("Please install MetaMask!");

            const accounts = await ethereum.request({ method: "eth_accounts"});

            if(accounts.length){
                setCurrentAccount(accounts[0]);
                const billboardContract = getEthereumContract();
                console.log(billboardContract);
                var price = await billboardContract.getCurrPrice();
                setPrice(price.toNumber() / 1E18);
                var owner = await billboardContract.getCurrOwner();
                setOwner(owner);
                var count = await billboardContract.getBillboardCount();
                setBillboardCount(count);

            } else{
                console.log("No accounts found");
            }

            console.log(accounts);
        } catch (error){
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert("Please install MetaMask!");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);

        } catch (error){
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }

    const sendTransaction = async () => {
        try{
            const { amount, message } = formData;
            if(!ethereum) return alert("Please install MetaMask!");
            if (!amount || !message) return alert("Please fill all fields!")
            if (!uploadImg) return alert("Please upload an image!")
            if (amount <= currPrice) return alert("Current bid is higher!")

            console.log(uploadImg);
            

            const billboardContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            console.log(`Amount: ${amount}`)
            console.log(`Message: ${message}`)

            const transactionHash = await billboardContract.buyBoard(BigInt(parsedAmount),message, {gasLimit:300000, value:BigInt(parsedAmount)});

            billboardContract.on("Transaction", async (from, reciever, billboardID, amountSent,messageSent,timestamp, event)=> {
                console.log('From:', from);
                console.log('Reciever:', reciever);
                console.log('Billboard ID:', billboardID);
                console.log('Price:', amountSent);
                console.log('Url:', messageSent);
                console.log('Timestamp:', timestamp);
                               
            })

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            
            await transactionHash.wait();
            
            setIsLoading(false);


            console.log(`Success - ${transactionHash.hash}`);
            

        } catch(error){
            setIsLoading(false);
            console.log(error);
            throw new Error("No Ethereum Object");
        }
    }

    useEffect(() =>{
        checkIfWalletIsConnected();
        setCurrImage(getCurrImage("ship.png"));

    }, []);

    return (
        <BillboardContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, 
                                            sendTransaction, currPrice, billboardCount, currOwner, isLoading, uploadImage, uploadImg, currImage}}>
            {children}
        </BillboardContext.Provider>
    );
}