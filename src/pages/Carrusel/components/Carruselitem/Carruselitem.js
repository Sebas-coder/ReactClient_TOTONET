import React, { forwardRef } from 'react';
import { Carousel } from 'react-bootstrap'

const Carruselitem = forwardRef(({atributes}, ref) => {
    console.log('RENDERIZO', atributes)

    return (
        <>
            <Carousel.Item>
                <img
                    className="rounded mx-auto d-block" style={{ height: "980px" }}
                    src={atributes.img}
                    alt={atributes.title}
                />
                <Carousel.Caption>
                    <h1>Si entraaaa</h1>
                    <h3>{atributes.title}</h3>
                    <p>{atributes.description} </p>
                </Carousel.Caption>
            </Carousel.Item>
        </>
    )
})


export default Carruselitem;