import React, {useEffect, useState} from "react";
import "../../App.css";
import Header from "../../components/Header/Header";
import photo from "./popular-card.png";
import providers from "./providers.png";
import Footer from "../../components/Footer/Footer";
import {Link} from "react-router-dom";
const Main = () => {
  //   const navigate = useNavigate();
  //   let [user, setUser] = useState({
  //     email: "",
  //     first_name: "",
  //     last_name: "",
  //   });
  const [universities, setUniversities] = useState([1,2,3]);
  const [showSupport, setShowSupport] = useState();
  const [showLanguage, setShowLanguage] = useState();
  useEffect(() => {
    fetch('http://localhost:8000/api/universities', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
        .then((response) => {
          return response.json()
        }).then(data => {
          console.log(data)
      setUniversities(data)
    })
        .catch((error) => {
          console.log(error)
        })
  }, [])
  return (
    <div className="app-main">
      <Header/>
      <div className="welcome py-[120px] w-[100%]">
        <div className="container">
          <h2 className="welcome__title">
            Booking Student <br /> Dorms in Kazakhstan
          </h2>
          <div className="welcome__input-container mt-10 mb-3">
            <input
              placeholder="Search by University"
              className="welcome__input"
            />
            <button className="welcome__input-btn">Get Started</button>
          </div>
          <div className="flex gap-10">
            <div className="welcome__btn">SDU University</div>
            <div className="welcome__btn">KBTU</div>
            <div className="welcome__btn">AITU</div>
            <div className="welcome__btn">AUES</div>
          </div>
        </div>
      </div>
      <div className="container py-14">
        <div className="popular__title">
          Dormitories of popular Universities
        </div>
        <div>
          <div>Almaty</div>
        </div>

        <div className="popular__list">
          {universities.map((el) => (
            <div className="popular__card">
              <div className="popular__time">7 day 23:59:59</div>
              <div className="popular__img">
                <img src={'http://localhost:8000/' + el.image}  alt="popular card"/>
              </div>
              <div className="popular__texts">
                <div className="flex__custom">
                <div className="popular__text">
                    From <span className="popular__accent">{el.price} ₸</span>/ year
                  </div>
                  <div className="popular__places">{el.places} places left</div>
                </div>
                <div className="popular__name mt-3 mb-2">{el.name}</div>
                <div className="flex__custom">
                  <div className="popular__text">
                    {el.address}
                  </div>
                  <div className="popular__text">{el.distance}</div>
                </div>
              </div>
              <div className="container__btn">
                <button className="popular__btn"><Link style={{color: 'white'}} to={'/university/' + el.slug}>Reserve
                  now</Link></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="flex__custom">
          <div className="w-[70%]">
            <h2 className="providers__subtitle">ACCOMMODATION PROVIDERS</h2>
            <h1 className="providers__title">Add a university dormitory</h1>
            <h5 className="providers__span">(for university residents only)</h5>
            <p className="providers__description">
              Would you like to add a university dormitory? Please fill out the
              application below and we will contact you to discuss details and
              terms of cooperation. Thank you for your interest in our site!
            </p>
            <button className="providers__btn">Partner with us</button>
          </div>
          <div className="w-[30%]">
            <img className="providers__img" src={providers} alt="providers"/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Main;
