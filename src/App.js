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
                <div className='data' key={item.medicine_name}>
                    <div>

                        <div>
                            <div>
                                <img src={item['medicine_image_url']} style={{ height: '32vh', width: '32vh', border: '3px groove rgb(36, 67, 56)', padding: '5px', boxShadow: 'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px'}} alt='' />
                            </div>
                        </div>

                        <div >
                            <div className='res' style={{ marginRight: '70px', padding: '15px 22px 15px 22px', width: '46%' }}>

                                <div style={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', padding: '12px 15px', background: 'darkgoldenrod', marginBottom: '15px' }}>
                                    <span>{item['medicine_name']}</span>
                                </div>

                                <div style={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', padding: '12px 15px', background: 'darkgoldenrod' }}>
                                    <span>{item['medicine_genre']}</span>
                                </div>

                            </div>


                            <div style={{ boxShadow: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset', background: 'linear-gradient(rgb(216 150 137), rgb(143 203 170))' , padding: '6px', borderRadius: '10px' }}>
                                <p>{item['medicine_text']}</p>

                                <div style={{ margin: '10px' }}>
                                    {item['medicine_buy_link'] && (
                                        <a href={item['medicine_buy_link']} target="_blank" rel="noopener noreferrer"><button className='buynow'>Buy Now</button></a>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>


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
                                    <div style={{ border: '2px solid #85d34c', color: 'white' }}>
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