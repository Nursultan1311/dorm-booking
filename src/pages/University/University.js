import Header from "../../components/Header/Header";
import React, {useEffect, useState} from "react";
import Footer from "../../components/Footer/Footer";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import image from "./img.png"
import location from "./location.png"
import calendar from "./calendar.png"
import places from "./places.png"
import facilities from "./facilities.png"
import { load } from '@2gis/mapgl';
import {useParams} from "react-router-dom";
import PlacePicker from "../PlacePicker/PlacePicker";
import SeatPicker from "react-seat-picker";

const University = () => {
    const [loading, setLoading] = useState(false);

    const processSeatAction = async (action, callback, row, number, id) => {
        setLoading(true);
        console.log(`${action} seat ${number}, row ${row}, id ${id}`);
        callback(row, number, id, `tooltip for id-${id} added by callback`);
        setLoading(false);
    };
    const addSeatCallbackContinousCase =  (
        {row, number, id},
        addCb,
        params,
        removeCb
    ) => {
        setPlace(true)
        setLoading(true)
        if (removeCb) {
            console.log(
                `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
            );
            removeCb(params.row, params.number);
        }
        console.log(`Added seat ${number}, row ${row}, id ${id} ${place}`);
        const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id, newTooltip);
        setLoading(false)

    };

    const addSeatCallback = ({ row, number, id }, addCb) => {
        processSeatAction("Added", addCb, row, number, id );
    };

    const removeSeatCallback = ({ row, number, id }, removeCb) => {
        processSeatAction("Removed", removeCb, row, number, id);
    };

    const rows = [
        [
            { id: 1, number: 1, tooltip: "Free" },
            { id: 2, number: 2, tooltip: "Free" },
            null,
            {
                id: 3,
                number: "3",
                isReserved: true,
                orientation: "east",
                tooltip: "Reserved by Rogger"
            },
            { id: 4, number: "4", orientation: "west" },
            null,
            { id: 5, number: 5 },
            { id: 6, number: 6 }
        ],
        [
            {
                id: 7,
                number: 1,
                isReserved: true,
                tooltip: "Reserved by Matthias Nadler"
            },
            { id: 8, number: 2, isReserved: true },
            null,
            { id: 9, number: "3", isReserved: true, orientation: "east" },
            { id: 10, number: "4", orientation: "west" },
            null,
            { id: 11, number: 5 },
            { id: 12, number: 6 }
        ],
        [
            { id: 13, number: 1 },
            { id: 14, number: 2 },
            null,
            { id: 15, number: 3, isReserved: true, orientation: "east" },
            { id: 16, number: "4", orientation: "west" },
            null,
            { id: 17, number: 5 },
            { id: 18, number: 6 }
        ],
        [
            { id: 19, number: 1, tooltip: "Free" },
            { id: 20, number: 2 },
            null,
            { id: 21, number: 3, orientation: "east" },
            { id: 22, number: "4", orientation: "west" },
            null,
            { id: 23, number: 5 },
            { id: 24, number: 6 }
        ],
        [
            { id: 25, number: 1, isReserved: true },
            { id: 26, number: 2, orientation: "east" },
            null,
            { id: 27, number: "3", isReserved: true },
            { id: 28, number: "4", orientation: "west" },
            null,
            { id: 29, number: 5, tooltip: "Free" },
            { id: 30, number: 6, isReserved: true }
        ]
    ];
    const [place, setPlace] = useState(false)
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://widget.cloudpayments.kz/bundles/cloudpayments.js';
        script.async = true;
        script.onload = () => {
            window.pay = () => {
                const widget = new window.cp.CloudPayments();
                widget.pay('auth', {
                    publicId: 'test_api_00000000000000000000002',
                    description: 'Оплата за общежитие',
                    amount: 400000,
                    currency: 'KZT',
                    accountId: 'user@example.com',
                    invoiceId: '1234567',
                    email: 'user@example.com',
                    skin: 'mini',
                    autoClose: 3,
                    data: {
                        myProp: 'myProp value'
                    },
                    payer: {
                        firstName: 'Тест',
                        lastName: 'Тестов',
                        middleName: 'Тестович',
                        birth: '1955-02-24',
                        address: 'тестовый проезд дом тест',
                        street: 'Lenina',
                        city: 'MO',
                        country: 'KZ',
                        phone: '123',
                        postcode: '345'
                    }
                }, {
                    onSuccess: (options) => {
                        console.log({'jwt': localStorage.getItem('accessToken'), 'university': university.slug})
                        fetch('https://dorm-booking.up.railway.app/api/approve', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({'jwt': localStorage.getItem('accessToken'), 'university': university.slug})
                        })
                            .catch(error => console.error('Error fetching documents', error));
                    },
                    onFail: (reason, options) => {
                        //действие при неуспешной оплате
                    },
                    onComplete: (paymentResult, options) => {
                        //например вызов вашей аналитики
                    }
                });
            };
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const [university, setUniversity] = useState({})
    useEffect( () => {
        fetch('https://dorm-booking.up.railway.app/api/university/' + id)
            .then((response) => {
                return response.json()
            }).then(data => {
                console.log(data)
                setUniversity(data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, []);
    const MapWrapper = React.memo(
        () => {
            return <div id="map-container" style={{ width: '100%', height: '100%' }}></div>;
        },
        () => true,
    );

    const { id} = useParams();

    return(
        <div className="app-main">
            <Header/>
            <div className="detail-main">
                <div className="main-left">
                    <Splide
                        options={{
                            type: 'loop',
                            drag: 'free',
                            focus: 'start',
                            perPage: 1,
                            arrows: true,
                            pagination: true,
                        }}
                    >
                        <SplideSlide key={0}>
                            <img width="100%" src={'https://dorm-booking.up.railway.app' + university.image} alt="Slide"/>
                        </SplideSlide>
                        <SplideSlide key={1}>
                            <img width="100%" src={image} alt="Slide"/>
                        </SplideSlide>
                    </Splide>
                    <div className="images">
                        <Splide
                            options={{
                                type: 'loop',
                                drag: 'free',
                                focus: 'start',
                                perPage: 4,
                                arrows: true,
                                pagination: true,
                                width: '100%',
                                gap: '20px',
                            }}
                        >
                            <SplideSlide key={0}>
                                <img width="100%" src={image} alt="Slide"/>
                            </SplideSlide>
                            <SplideSlide key={1}>
                                <img width="100%" src={image} alt="Slide"/>
                            </SplideSlide>
                            <SplideSlide key={2}>
                                <img width="100%" src={image} alt="Slide"/>
                            </SplideSlide>
                        </Splide>
                    </div>
                    <h5 style={{paddingTop: '50px', paddingBottom: '10px'}}>Overview</h5>
                    <p>
                        {university.description}
                    </p>
                    <h5 style={{paddingTop: '50px', paddingBottom: '10px'}}>Online</h5>
                    <SeatPicker
                        addSeatCallback={addSeatCallbackContinousCase}
                        removeSeatCallback={removeSeatCallback}
                        rows={rows}
                        maxReservableSeats={3}
                        alpha
                        visible
                        selectedByDefault
                        loading={loading}
                        tooltipProps={{ multiline: true }}
                        continuous
                    />                    <h5 style={{paddingTop: '50px', paddingBottom: '10px'}}>Location</h5>
                    <div className="location-info">
                        <p className="location"><img src={location}/>{university.address} </p>
                    </div>
                    <div style={{width: '100%', height: 400}}>
                        <div style={{width: '100%', height: '100%'}}>
                            <MapWrapper/>
                        </div>
                    </div>
                    <h5 style={{paddingTop: '50px', paddingBottom: '10px'}}>Amenities</h5>
                    <img src={facilities}/>
                </div>

                <div className="main-right">
                    <h1>{university.name}</h1>
                    <h5 className="places">{university.places} places available</h5>
                    <div className="location-info">
                        <p className="location"><img src={location}/>{university.address} </p>
                        <p className="distance"> {university.distance} </p>
                    </div>
                    <p className="location"><img src={calendar}/>Start date: {university.start} <br/> End
                        date: {university.end}.</p>
                    <div className="price__card">
                        <div className="popular__time">7 day 23:59:59</div>
                        <div className="price__info">
                            <div className="price">
                                <p>Rent from</p>
                                <h5>₸{university.price}</h5>
                                <h>per year</h>
                            </div>
                            <h2>+</h2>
                            <div className="price">
                                <p>Deposit</p>
                                <h5>₸40 000</h5>
                                <h>one-off payment</h>
                            </div>
                        </div>
                        <p style={{width: '100%', textAlign: 'center', marginBottom: '50px'}}>Dinner included</p>
                        <div className="container__btn">
                            <button className="popular__btn" onClick={() => window.pay()} >Reserve now</button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer/>
        </div>
    )
};

export default University;