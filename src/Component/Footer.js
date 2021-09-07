import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import logo from './images/logo_inria.png'
import logo_uca from './images/logo_uca.png'

export const Footer = () => (
    <div className="panelFooter">
        <div className="footer-wrap">
            <div className="widgetFooter">
                <h4 className="">Useful links</h4>
                <ul id="footerUsefulLink">
                    <li>
                        <a href="https://issa.cirad.fr/">Project website</a>
                    </li>
                    <li>
                        <a href="https://github.com/issa-project">Github</a>
                    </li>
                    <li>
                        <a href="mailto:anne.toulet@cirad.fr">Contact</a>
                    </li>
                </ul>
            </div>

            <div className="widgetFooter">
                <img src={logo} width={150} alt="Inria"/>

            </div>

            <div className="widgetFooter">
                <img src={logo_uca} width={100} alt="Inria"/>
            </div>
        </div>
    </div>
);
