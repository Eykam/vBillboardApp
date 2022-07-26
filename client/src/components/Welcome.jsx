import { AiFillPlayCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfo, BsInfoCircle } from 'react-icons/bs';
import { BillboardContext } from '../context/BillboardContext';
import React, { useContext } from 'react';

import { Loader } from "./";
import { ethers } from 'ethers';

const Input = ( {placeholder, name, type, value, handleChange} ) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e)=> handleChange(e,name)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    const { connectWallet, currentAccount, formData, uploadImg,sendTransaction, handleChange, currPrice, currOwner, billboardCount, isLoading, uploadImage,currImage} = useContext(BillboardContext);

    const handleSubmit = (e) => {
        const { amount, message } = formData;
        const img = uploadImg;

        e.preventDefault();

        if(!amount || !message || !img) return alert("Please Enter All fields!");
        if(amount <= currPrice) return alert("Current Bid Is Higher");

        sendTransaction();
    }

    
    return (
        <div className="block lg:flex w-full justify-left items-center items-stretch mt-10">
            <div className="block lg:flex-col lg:w-2/5 w-full items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
                     <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                        Display whatever you want <br /> across the block
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        A virtual billboard where the current highest bidder decides what image is displayed.
                    </p>
                    {!currentAccount && (<button
                        type="button"
                        onClick={connectWallet}
                        className="w-full justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    >
                        <p className="text-white text-base font-semibold">
                            Connect Wallet
                        </p>
                    </button>)}
                </div>

                <div className="flex-col items-center justify-start w-full md:mt0 mt-10 ">
                    <div className = "p-3 justify-end items-start flex-col rounded-xl h-60 w-full my-5 eth-card white-glassmorphism">
                        <div className = "w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                            <SiEthereum fontSize={21} color="#ffff"/>
                        </div>
                        <BsInfoCircle fontSize={17} color='#ffff'className='fixed top-1 right-1'/>
                        <div className="justify-center text-center pt-5 text-white font-semibold text-3xl">
                            <p>
                                Current Price
                            </p>
                            <p>
                               {currPrice}
                            </p>
                        </div>
                        <div className="fixed bottom-2 left-2">
                            <p className="text-white font-semibold text-2xl mt-1">
                                Ethereum
                            </p>
                            <p className="text-white font-light text-sm mt-2">
                                Owner: {currOwner}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-5 w-full flex flex-col justify-start items-center blue-glassmorphism">
                     <Input placeholder="Amount" name="amount" type="number" handleChange={handleChange} />
                     <Input placeholder="Message" name="message" type="text" handleChange={handleChange} />
                     <input name="image" type="file" accept="image/*" onChange={uploadImage}/>

                     <div className='h-[1px] w-full bg-gray-400 my-2'/>

                    {isLoading ? (
                        <Loader />
                    ): (
                        <button
                        type="button"
                        onClick={handleSubmit}
                        className= "text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                        >
                            Buy Now
                        </button>
                    )}
                </div>


            </div>
            <div id="currImg" className='lg:w-3/5 w-full block items-center justify-center md:p-20 py-12 px-4 bg-black mr-20'>
                <img src={uploadImg} alt="preview image" />
            </div>
        </div>

    )
}

export default Welcome;