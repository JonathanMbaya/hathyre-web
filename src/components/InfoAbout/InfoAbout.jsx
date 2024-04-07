import React from 'react';
import './InfoAbout.css';

function InfoAbout () {
    return (
        <>

            <div className='block-about-left'>
                <div className='text-about'>
                    <h3>Notre Histoire</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quaerat ab a velit soluta, voluptates esse ex numquam est dolorem, 
                        tempora magni nobis eveniet sit recusandae voluptatum saepe neque 
                        maiores corporis!
                    </p>
                </div>
                <img src={`${process.env.PUBLIC_URL}/img-about/img-about2.png`} alt="" />
            </div>

            <div className='block-about-right'>
                <div className='text-about'>
                    <h3>Secret de fabrication</h3>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Quaerat ab a velit soluta, voluptates esse ex numquam est dolorem, 
                        tempora magni nobis eveniet sit recusandae voluptatum saepe neque 
                        maiores corporis!
                    </p>
                </div>

                <img src={`${process.env.PUBLIC_URL}/img-about/img-about1.png`} alt="" />
                
            </div>

            
        </>
    );
};

export default InfoAbout;