// import {Link} from "react-router-dom";

import "./Contract.css";
import Header from "../../components/Header/Header";
import {Link} from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function Contract() {
    return (
    <div>
        <Header/>
        <div className="contractContainer">
            <form>
                <h1>Contact Details</h1>
                <label form="place_of_residence">Place of residence (Attach a certificate from Egov)</label>
                <select id="place_of_residence" name="place_of_residence" >
                    <option value="atyrau">Atyrau</option>
                </select>
                <div className="file-input">
                    <input type="file" id="residence_certificate" name="residence_certificate" accept=".pdf" />
                </div>

                <label form="family_status">Family status (Attach a certificate from Egov)</label>
                <select id="family_status" name="family_status" >
                    <option value="orphans">Orphans and children left without parental care</option>
                </select>
                <div className="file-input">
                    <input type="file" id="status_certificate" name="status_certificate" accept=".pdf" />
                </div>

                <label form="number_of_children">Number of children per family (Under-23)</label>
                <input type="number" id="number_of_children" name="number_of_children" min="0" />

                <div className="file-input">
                    <input type="file" id="children_document" name="children_document" accept=".pdf" />
                </div>
                <label form="number_of_children">Number of children per family (Under-23)</label>
                <input type="number" id="number_of_children" name="number_of_children" min="0" />

                <div className="file-input">
                    <input type="file" id="children_document" name="children_document" accept=".pdf" />
                </div>
                <label form="number_of_children">Number of children per family (Under-23)</label>
                <input type="number" id="number_of_children" name="number_of_children" min="0" />

                <div className="file-input">
                    <input type="file" id="children_document" name="children_document" accept=".pdf" />
                </div>

                <Link to="/profile"><input type="submit" value="Continue"/></Link>
            </form>
        </div>
        <Footer/>
    </div>
    );
}

export default Contract;
