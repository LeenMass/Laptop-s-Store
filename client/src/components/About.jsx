import React, { Fragment } from 'react'

export default function About() {
  return (
        <Fragment>
           <section>
              <div className='row'>
                    
                    <div className='product'>
                          <div className='product-thumb'>
                               <a href='# '><img src="" alt="rel"/></a>
                          </div>
                          <div className='product-body'> 
                                  <div className='title'>
                                     <h6>Rolex</h6>
                                  </div>
                                  <div className='price'>
                                     <span>20$</span>
                                  </div>
                                  <div className="rating">
                                     <div className="star">
                                        <li className='fa fa-star'></li>
                                        <li className='fa fa-star'></li>
                                        <li className='fa fa-star'></li>
                                        <li className='fa fa-star'></li>
                                        <li className='fa fa-star'></li>

                                     </div>
                                  </div>
                                  <div className="footer">
                                     <div className="btn">
                                         <a href="#" className="btn-custom primary"> add to cart</a>
                                         <a href="#" className="btn-custom second"> read more</a>

                                     </div>
                                  </div>
                          </div>
                    </div>
              </div>
           </section>
        </Fragment>

  )
}
