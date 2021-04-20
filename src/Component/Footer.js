import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
//import logo from '../logoPoly.png';
import logo2 from '../inriaLogo.png'

export const Footer = () => (
    <div className="panelFooter">

        <div className="footer-wrap">
            <div className="widgetFooter">
                <h4 className="uppercase">useful links</h4>
                <ul id="footerUsefulLink">
                    <li title="About US">
                        <a href="www.google.fr">Github</a>
                    </li>
                    <li title="Our Team">
                        <a href="www.google.fr">Report</a>
                    </li>
                    <li title="Gallery">

                        <a href="www.google.fr">Base de donnée</a>
                    </li>
                    <li title="Contact Us">

                        <a href="www.google.fr">links</a>
                    </li>
                </ul>
            </div>

            <div className="widgetFooter">
                <h4 className="uppercase">Social media links</h4>
                <ul id="footerMediaLinks">
                    <li className="media1" title="Facebook">
                        <a className="fb" href="www.google.fr">facebook</a>
                    </li>
                    <li className="media2" title="Twitter">

                        <a className="twit" href="www.google.fr">Twitter</a>
                    </li>
                    <li className="media3" title="Instagram">

                        <a className="insta" href="www.google.fr">instagram</a>
                    </li>
                    <li className="media4" title="Github">

                        <a className="git" href="www.google.fr">Github</a>
                    </li>
                </ul>
            </div>

            <div className="footer-wrap">
                <div className="widgetFooter">
                    <h4 className="uppercase">Member of the project</h4>
                    <ul id="footerMediaLinks">
                        <li>Youssef Mekouar</li>
                    </ul>
                </div>
            </div>

            <div className="footer-wrap">
                <img src={logo2} height={150} width={150} alt="Polytech" />
            </div>

        </div>
    </div>
);
