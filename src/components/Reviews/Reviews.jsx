import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
} from "mdb-react-ui-kit";

export default function App() {
    return (
        <MDBContainer className="py-5">
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="10" xl="8" className="text-center">
                    <h1 className="mb-4" style={{fontWeight: 'bolder'}}>What students think of us</h1>
                    <p className="mb-4 pb-2 mb-md-5 pb-md-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
                        error amet numquam iure provident voluptate esse quasi, veritatis
                        totam voluptas nostrum quisquam eum porro a pariatur veniam.
                    </p>
                </MDBCol>
            </MDBRow>
            <MDBRow className="text-center d-flex align-items-stretch">
                <MDBCol md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
                    <MDBCard className="testimonial-card">
                        <div
                            className="card-up"
                            style={{ backgroundColor: "#9d789b" }}
                        ></div>
                        <div className="avatar mx-auto bg-white">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                                className="rounded-circle img-fluid"
                            />
                        </div>
                        <MDBCardBody>
                            <h4 className="mb-4">Maria Smantha</h4>
                            <hr />
                            <p className="dark-grey-text mt-4">
                                <MDBIcon fas icon="quote-left" className="pe-2" />
                                Love the new Student House Booking System for Kazakhstan Universities! Makes finding and reserving housing a breeze. Thanks, team!
                            </p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
                    <MDBCard className="testimonial-card">
                        <div
                            className="card-up"
                            style={{ backgroundColor: "#7a81a8" }}
                        ></div>
                        <div className="avatar mx-auto bg-white">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
                                className="rounded-circle img-fluid"
                            />
                        </div>
                        <MDBCardBody>
                            <h4 className="mb-4">Lisa Cudrow</h4>
                            <hr />
                            <p className="dark-grey-text mt-4">
                                <MDBIcon fas icon="quote-left" className="pe-2" />
                                Love the new Student House Booking System for Kazakhstan Universities! Makes finding and reserving housing a breeze. Thanks, team!
                            </p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol md="4" className="mb-5 mb-md-0 d-flex align-items-stretch">
                    <MDBCard className="testimonial-card">
                        <div
                            className="card-up"
                            style={{ backgroundColor: "#6d5b98" }}
                        ></div>
                        <div className="avatar mx-auto bg-white">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
                                className="rounded-circle img-fluid"
                            />
                        </div>
                        <MDBCardBody>
                            <h4 className="mb-4">John Smith</h4>
                            <hr />
                            <p className="dark-grey-text mt-4">
                                <MDBIcon fas icon="quote-left" className="pe-2" />
                                Love the new Student House Booking System for Kazakhstan Universities! Makes finding and reserving housing a breeze. Thanks, team!
                            </p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}