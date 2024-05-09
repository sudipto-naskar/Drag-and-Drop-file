import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';          // Import axios for making HTTP requests

import DropFileInput from './components/drop-file-input/DropFileInput';

import SocialLinks from './components/HomeContainer/SocialLinks';
import Navbar from './components/Navbar/Navbar';

import Plant from './images/plant.png';

const App = () => {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [output, setOutput] = useState();      // State to store output from API

    const onFileChange = (files) => {
        console.log(files);
        setUploadedFiles(files);
    }


    const [showMainPage, setShowMainPage] = useState(false);

    const handleEnterClick = () => {
        setShowMainPage(true);
    };


    useEffect(() => {
        const spans = document.querySelectorAll('.word span');

        spans.forEach((span, idx) => {
            // Initial animation
            setTimeout(() => {
                span.classList.add('active');
            }, 750 * (idx + 1));
        });
    }, []); // Empty dependency array ensures this effect runs only once after initial render


    const uploadImages = async () => {
        if (uploadedFiles.length === 0) {
            console.error('No files uploaded.');
            return;
        }

        const formData = new FormData();
        formData.append('image', uploadedFiles[0]);

        try {
            const response = await axios.post('http://127.0.0.1:8000/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('API Response:', response.data);

            const vari = response.data

            // Map each item in vari['data'] to HTML elements
            const outputData = vari['data'].map(item => (
                <div key={item.medicine_name}>
                    <div>Medicine Name: {item['medicine_name']}</div>
                    <div>Medicine Genre: {item['medicine_genre']}</div>
                    <div>Medicine Text: {item['medicine_text']}</div>
                    <div>Medicine Image URL: <a href={item['medicine_image_url']}>Link</a></div>
                    {item['medicine_buy_link'] && (
                        <div>Medicine Buy Link: <a href={item['medicine_buy_link']} target="_blank" rel="noopener noreferrer"> <button className='buynow'>Buy Now </button></a></div>
                    )}
                </div>
            ));

            // Set the concatenated data as the output
            setOutput(outputData);

            // console.log(vari['data'][0]);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }



    return (

        <div className="app">
            <div className={`welcome-page ${showMainPage ? 'slide-up' : ''}`}>
                <div class="word">
                    <span>W</span>
                    <span>E</span>
                    <span>L</span>
                    <span>C</span>
                    <span>O</span>
                    <span>M</span>
                    <span>E</span>
                </div>
                <div className='side'>
                    <button className='button' onClick={handleEnterClick}><h1>Enter</h1></button>
                </div>

            </div>

            {showMainPage && (

                <div className="main-page" id='Home'>

                    <Navbar />

                    <div className='main' >
                        <div className="box">
                            <div className='image'>
                                <img src="" alt='' />
                            </div>

                            <div className='drop'>

                                <DropFileInput
                                    onFileChange={(files) => onFileChange(files)}
                                />

                                <div className='u-button' >
                                    <button class="upload-btn" onClick={uploadImages}>
                                        Upload
                                    </button>
                                </div>

                                {/* <div>
                                <input type="file" id="file-upload" accept="image/*" capture="setImage" />
                                </div> */}

                            </div>
                        </div>

                        <div id='Output'>
                            <h3><u>OUTPUT</u></h3>
                        </div>

                        <div className='output' >
                            <div className='child'>
                                {output &&
                                    <div style={{ border: '2px solid black', color: 'white' }}>
                                        {output}
                                    </div>}
                            </div>
                        </div>

                        <div id='Team'>
                            <h3><u>OUR TEAMS</u></h3>
                        </div>

                        <div class="home-container" >
                            <div class="profile-card">
                                <div class="img">
                                    <img src={Plant} alt='' />
                                </div>
                                <div class="caption">
                                    <h3>Sudipto Naskar</h3>
                                    <p>Full Stack Developer</p>
                                    <SocialLinks />
                                </div>
                            </div>
                            <div class="profile-card">
                                <div class="img">
                                    <img src={Plant} alt='' />
                                </div>
                                <div class="caption">
                                    <h3>Om Ghosal</h3>
                                    <p>Front End Developer</p>
                                    <SocialLinks />
                                </div>
                            </div>
                            <div class="profile-card">
                                <div class="img">
                                    <img src={Plant} alt='' />
                                </div>
                                <div class="caption">
                                    <h3>Saikat Dey</h3>
                                    <p>Back End Developer</p>
                                    <SocialLinks />
                                </div>
                            </div>
                            <div class="profile-card">
                                <div class="img">
                                    <img src={Plant} alt='' />
                                </div>
                                <div class="caption">
                                    <h3>Partiksha Hazra</h3>
                                    <p>Front End Developer </p>
                                    <SocialLinks />
                                </div>
                            </div>
                        </div>

                        <div style={{ height: "8vh" }}>
                        </div>

                    </div>
                </div>

            )}
        </div>
    );
}

export default App;