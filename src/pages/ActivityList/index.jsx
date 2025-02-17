import './activitylist.scss';
import { useState , useEffect , useRef } from 'react';
import * as bootstrap from "bootstrap"; 
import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
 ? 'https://taiwancultureproject.onrender.com'
 : 'http://localhost:3001'

const About = () => {



  return (
    <>...開發中</>
    )
}


export default About;