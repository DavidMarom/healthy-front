import React, { Component } from "react";
export class About extends Component {

    render() {
        return (
            <div className="main-container">
                <h2 className="team">THE TEAM</h2>
                <div className="section-about">
                  <div className="about-1">
                        <div >
                            <img className="img-about" src="https://res.cloudinary.com/dygtul5wx/image/upload/v1601334459/73008855_10221388445607068_9020790098928599040_o.jpg_hlrxea.jpg" alt="#" />
                        </div>
                        <div class="info">
                            <p>Hi, I'm Chen Edri, 29 years old originally from Eilat.I have B.Sc Nutriotion degree from the Hebrew University
                            and I'm a reggistered dietitian. I'm also a junior Full Stack developer- specialized in Node JS. and React
                            </p>
                        </div>
                    </div>
                    <div className="about-1">
                        <div>
                            <img className="img-about" src="https://res.cloudinary.com/dygtul5wx/image/upload/v1601334459/73008855_10221388445607068_9020790098928599040_o.jpg_hlrxea.jpg" alt="https://res.cloudinary.com/dygtul5wx/image/upload/v1601334459/73008855_10221388445607068_9020790098928599040_o.jpg_hlrxea.jpg" />
                        </div>
                        <div class="info">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident fuga alias deleniti ducimus expedita odit magnam dolor eius placeat quidem numquam atque omnis voluptate iste amet, quas modi libero deserunt?</p>
                        </div>
                    </div>
                    <div className="about-1">
                        <div >
                            <img className="img-about" src="https://res.cloudinary.com/dygtul5wx/image/upload/v1601334459/73008855_10221388445607068_9020790098928599040_o.jpg_hlrxea.jpg" alt="https://res.cloudinary.com/dygtul5wx/image/upload/v1601334459/73008855_10221388445607068_9020790098928599040_o.jpg_hlrxea.jpg" />
                        </div>
                        <div class="info">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam fuga illum ipsam nisi qui laboriosam, a consequuntur vero expedita, consectetur repellendus vel harum perspiciatis. Sed eveniet possimus voluptatibus dolorem rem.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}