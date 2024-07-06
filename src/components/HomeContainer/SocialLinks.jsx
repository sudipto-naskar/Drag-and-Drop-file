import React from 'react';
import './SocialLinks.css';

import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const SocialLinks = () => {
    return (
        <div class="social-links">
            <ul style={{ listStyleType: 'none' }}>

                <a href='https://github.com/sudipto-naskar' target='_blank' rel="noopener noreferrer"> <FaLinkedin /> </a>
                <a href='https://github.com/sudipto-naskar' target='_blank' rel="noopener noreferrer"> <FaGithub /> </a>
                <a href='https://github.com/sudipto-naskar' target='_blank' rel="noopener noreferrer"> <RiInstagramFill /> </a>

            </ul>
        </div>
    )
}

export default SocialLinks