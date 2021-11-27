import React from 'react';
import images from '../../assets/images';
import NavbarItem from './componets/Navbaritem/Navitem';
import Cookies from 'universal-cookie'

const Navbar = ({ isLogin, navitem_list }) => {
    
    const navarItems = navitem_list.map((item, index) => (
        <NavbarItem key={index} hreference={item.href} title={item.title} />
    ));
    
    
    function desLogear() {
        const cookies = new Cookies();
        cookies.set('isLogin', false, { path: '/' });
        window.location.href = '/';
    }


    return (
        <>

            <header className="p-3 border-bottom bg-ligth mb-3">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <img src={images.t_icon} alt="TOTONET_icon" className="img-fluid me-2" style={{ height: "50px" }}></img>
                            <span className="fs-4 ml-4">TOTONET</span>
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            {navarItems}
                        </ul>


                        <div className="text-end">
                            {isLogin ?
                                (<button onClick={e => desLogear()} type="button" className="btn btn-warning">Logout</button>) :
                                (<button type="button" className="btn btn-warning"><a href='/login '>Login</a></button>)}
                        </div>

                    </div>
                </div>
            </header>

        </>
    )
}

export default Navbar;