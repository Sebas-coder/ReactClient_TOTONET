import React from 'react'
import images from '../../assets/images'
import './FailPage.css'

const FailPage = () => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center minh-100">
                    <div className="col-lg-12">
                        <div>
                            <img className="img-fluid rounded mx-auto d-block" src={images.t_icon} alt="logo" width="20%" height="20%" />
                        </div>

                        <div className="mt-4">
                            <p style={{ fontSize: "50px" }} className="text-center">
                                <i className="text-danger"> 
                                    ERRROR 404
                                </i>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default FailPage
