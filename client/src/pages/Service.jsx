import React from 'react';
import { useAuth } from '../store/Auth';
import "./Service.css";

const Service = () => {

  const { services } = useAuth();
  //console.log(services);


  return (
    <section className='section-services'>
      <div className="container-services">
        <span className='service'> Services</span>
      </div>

      <div className="container-grid-three-cols">
        {services && services.map((curElem, index) => {
          const { price, description, provider, service } = curElem;

          return (
            <div className="serviceCard" key={index}>
              <div>
                <img src="/service_img.avif" alt="image" />
              </div>
              <div className="serviceCard-details">
                <div className="service-grid-two-cols">
                  <p>{provider}</p>
                  <p className='price'>{price}</p>
                </div>
                <h4>{service}</h4>
                <p>{description}</p>
              </div>
            </div>)
        })}

      </div>

    </section>
  )
}

export default Service

