import  './AboutUs.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Imash from './Imash.png'
import Zhiger from './Zhiger.png'
import Yermurat from './Yermurat.png'
import Galym from './Galym.png'
import Nurs from './Nurs.png'
import linkedin from './img.png'
import inst from './img_1.png'
import whatsapp from './img_2.png'
import Reviews from "../../components/Reviews/Reviews";
import axios from 'axios';
import {useState} from "react";



const AboutUs = () => {
    const [feedbackText, setFeedbackText] = useState('');

    const handleFeedbackSubmit = async () => {
        try {
            const feedback = {
                jwt: localStorage.getItem('accessToken'),
                text: feedbackText,
                rating: 5,
            };
            const response = await axios.post('https://dorm-booking.up.railway.app/api/submit-suggestion', feedback);
            console.log(response.data);
            setFeedbackText('');
            alert('Feedback submitted successfully!');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Please login before submitting');
        }
    };

    return (
        <>
            <Header/>
        <div className="responsive-container-block container1">
            <p className="text-blk team-head-text">
                Meet  the Our team
            </p>
            <div className="responsive-container-block">
                <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                    <div className="card">
                        <div className="team-image-wrapper">
                            <img className="team-member-image" src={Imash}/>
                        </div>
                        <p className="text-blk name">
                            Imangali Zholdas
                        </p>
                        <p className="text-blk position">
                            Designer
                        </p>
                        <p className="text-blk feature-text">
                            7 775 860 2858
                            <br/>
                            200103132@stu.sdu.edu.kz
                        </p>
                        <div className="social-icons">
                            <a href="https://www.twitter.com" target="_blank">
                                <img className="twitter-icon"
                                     src={linkedin}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={inst}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={whatsapp}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                    <div className="card">
                        <div className="team-image-wrapper">
                            <img className="team-member-image" src={Zhiger}/>
                        </div>
                        <p className="text-blk name">
                            Sairan Zhiger
                        </p>
                        <p className="text-blk position">
                            Product Manager
                        </p>
                        <p className="text-blk feature-text">
                            +7 771 256 5124
                            <br/>
                            200113005@stu.sdu.edu.kz
                        </p>
                        <div className="social-icons">
                            <a href="https://www.twitter.com" target="_blank">
                                <img className="twitter-icon"
                                     src={linkedin}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={inst}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={whatsapp}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                    <div className="card">
                        <div className="team-image-wrapper">
                            <img className="team-member-image" src={Yermurat}/>
                        </div>
                        <p className="text-blk name">
                            Nurmukhanov Yermurat
                        </p>
                        <p className="text-blk position">
                            Frontend developer
                        </p>
                        <p className="text-blk feature-text">
                            +7 702 460 3603
                            <br/>
                            200103339@stu.sdu.edu.kz
                        </p>
                        <div className="social-icons">
                            <a href="https://www.twitter.com" target="_blank">
                                <img className="twitter-icon"
                                     src={linkedin}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={inst}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={whatsapp}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                    <div className="card">
                        <div className="team-image-wrapper">
                            <img className="team-member-image" src={Galym}/>
                        </div>
                        <p className="text-blk name">
                            Galymzhan Tolepbergen
                        </p>
                        <p className="text-blk position">
                            Backend Developer
                        </p>
                        <p className="text-blk feature-text">
                            +7 776 208 2442
                            <br/>
                            200103124@stu.sdu.edu.kz
                        </p>
                        <div className="social-icons">
                            <a href="https://www.twitter.com" target="_blank">
                                <img className="twitter-icon"
                                     src={linkedin}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={inst}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={whatsapp}/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container">
                    <div className="card">
                        <div className="team-image-wrapper">
                            <img className="team-member-image" src={Nurs}/>
                        </div>
                        <p className="text-blk name">
                            Nursultan Myrzagulov
                        </p>
                        <p className="text-blk position">
                            Frontend developer
                        </p>
                        <p className="text-blk feature-text">
                            +7 775 047 8610
                            <br/>
                            200103440@stu.sdu.edu.kz
                        </p>
                        <div className="social-icons">
                            <a href="https://www.twitter.com" target="_blank">
                                <img className="twitter-icon"
                                     src={linkedin}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={inst}/>
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img className="facebook-icon"
                                     src={whatsapp}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Reviews/>
            <div className="feedback-form-container">
                <h2 className="feedback-title">Your Feedback</h2>
                <div className="feedback-buttons h-100 align-items-center gap-5">
                    <button className="feedback-button active">Suggestion</button>
                    <div className="rating-stars h-100 align-items-center">
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star half">&#9733;</span>
                    </div>
                    <button className="feedback-button">Compliment</button>
                </div>

                <div className="d-flex gap-3 align-items-center h-100">
                    <input
                        className="feedback-textarea w-80 h-100"
                        placeholder="Please leave your feedback here"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                    />
                    <button className="feedback-submit-button" onClick={handleFeedbackSubmit}>Submit</button>
                </div>

            </div>
            <Footer/>
        </>
    );
};
export default AboutUs;
