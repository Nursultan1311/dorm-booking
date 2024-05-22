import React from 'react';
import { Link } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
    return (
        <footer className='footer mt-5'>
            <div className=' text-center text-md-start p-5'>
                <div className='row h-100 align-items-center px-5'>
                    <div className='col-md-4 col-lg-3 mx-auto mb-4 h-100 align-items-center'>
                        <div className='footer-content h-100 align-items-center'>
                            <p className="h-100 align-items-center">&copy; 2024 DormBooking. All rights reserved</p>
                        </div>
                    </div>
                    <div className='col-md-4 col-lg-4 mx-auto mb-4 p-0'>
                        <div className='subscribe-form d-flex p-0'>
                            <input type='email' placeholder='Email Address*' className='form-control me-2 w-100 bg-light text-dark'/>
                            <button type='button' className='btn btn-dark w-25'>Subscribe</button>
                        </div>
                        <div className='form-check mt-2'>
                            <input className='form-check-input' type='checkbox' value='' id='flexCheckDefault'/>
                            <label className='form-check-label' htmlFor='flexCheckDefault'>
                                Yes, I want to receive emails about products, news, and more from DormBooking*. Read
                                our <Link to='/privacy' className='text-reset'>privacy policy</Link>.
                            </label>
                        </div>
                    </div>
                    <div className='col-md-4 col-lg-2 mx-auto text-center'>
                        <Link to='/privacy' className='text-reset'>Privacy policy</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
