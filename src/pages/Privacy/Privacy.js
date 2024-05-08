import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Privacy = () => {
    return (
        <div>
            <Header />
            <div className="privacy-policy-container">
                <h1>Privacy Policy</h1>
                <p>Last Updated: 02.05.2024</p>
                <section>
                    <h2>1. Information We Collect</h2>
                    <ul>
                        <li>Personal Identification Information: Name, date of birth, national identity number, contact information (email, phone number), and address.</li>
                        <li>Booking Information: Dates of stay, preferences, and payment information.</li>
                        <li>Usage Data: Information on how you use our website and services, including IP address, browser type, and device information.</li>
                    </ul>
                </section>
                <section>
                    <h2>2. How We Use Your Information</h2>
                    <ul>
                        <li>To Provide Our Services: Processing your bookings, managing your stay, and communicating with you regarding your booking and our services.</li>
                        <li>Customer Support: Assisting you with your inquiries and ensuring a smooth booking experience.</li>
                        <li>Improvement of Services: Analyzing usage patterns to enhance our website functionality and service offerings.</li>
                        <li>Legal Obligations: Complying with applicable laws and regulations.</li>
                    </ul>
                </section>
                <section>
                    <h2>3. How We Share Your Information</h2>
                    <p>Service Providers: Sharing with third parties who perform services on our behalf, such as payment processing, data analysis, and email delivery.</p>
                    <p>Legal Requirements: Disclosing information when required by law or to protect the rights and safety of our users and ourselves.</p>
                    <p>Business Transfers: Sharing information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p>
                </section>
                <section>
                    <h2>4. Data Security</h2>
                    <p>We implement appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure, or destruction of data. However, no internet-based site can be 100% secure, so we cannot guarantee absolute security.</p>
                </section>
                <section>
                    <h2>5. Your Rights</h2>
                    <p>You have the right to access, correct, or delete your personal data. You can also object to the processing of your data, request data portability, and withdraw consent for data processing at any time.</p>
                </section>
                <section>
                    <h2>6. Cookies and Tracking Technologies</h2>
                    <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information to enhance your user experience.</p>
                </section>
                <section>
                    <h2>7. Changes to This Privacy Policy</h2>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                </section>
                <section>
                    <h2>8. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact email to dormbooking@gmail.com</p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Privacy;
