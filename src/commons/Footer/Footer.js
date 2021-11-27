import React from 'react'
import images from '../../assets/images';

const Footer = () => {
    return (
        <>
            <div className="bg-dark text-white">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top ">
                    
                    <p className="col-md-4 d-flex align-items-center justify-content-center mb-0 text-muted fs-4">© 2021 TOTONET</p>

                    <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <img src={images.t_icon} alt="TOTONET_icon" className="img-fluid" style={{ height: "50px" }}></img>
                    </a>

                    <ul className="nav col-md-4 d-flex align-items-center justify-content-center">
                        <li className="nav-item fs-4"><a href="http://github.com" className="nav-link px-2 text-muted">Github</a></li>
                    </ul>

                </footer>
            </div>
        </>
    )

}
export default Footer;