import { Link } from "react-router-dom";
import React from "react";
import './Foot.css'
function Foot() {
    return (
        <div>
            <div className="footbar">
                <Link className="footbarMenu" to={'/'}>umc movie</Link>
               
            </div>
        </div>
    )
}
export default Foot