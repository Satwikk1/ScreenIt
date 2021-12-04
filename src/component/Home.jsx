import React, { useState } from 'react'
import {Button, Modal} from 'react-bootstrap'
import Screener from './Screener'
import jds from '../jd.js';

import '../main.scss';
const Home = () => {

    const [jd, setjd] = useState(null);
    const [show, setShow] = useState(false);
    const [homeScreen, setHomeScreen] = useState(true);

    return ( 
        <div className="home-container">
            <Screener />
            <div className="app-heading">
                <h1>ScreenIt</h1>
            </div>

            <div className="sub-heading">
                <h3>job descriptions</h3>
            </div>

            <div className="card-columns">
               
               {jds.map(item=>{
                   return <div className="card-container">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.job_title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item['position type']}</h6>
                                <p className="card-text">Required Skills:</p>
                                <div className="card-skills">
                                    {item.skills.map((item, index)=>{
                                        if(index>=5){
                                            return null;
                                        }
                                        if(index<4){
                                            if(item.length>6){
                                                return <span>{item.slice(0,1)+'...'}</span>
                                            }else{
                                                return <span>{item}</span>
                                            }
                                        }else{
                                            return <p>....</p>;
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="card-nav">
                            <Button variant="primary" onClick={()=>{
                                setShow(true);
                                setjd(item);
                            }}>
                                view details
                            </Button>
                            <button>screen resume</button>
                        </div>
                    </div>    
               })}
            </div>
            <>
            <Modal show={show} onHide={()=>setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{jd?jd.job_title:null}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div>
                    <p>{jd?jd['job description']:null}</p>
                  </div>

                  <h4 style={{width: "fit-content"}}>Required skill set:-</h4>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {jd?jd.skills.map(item=>{
                            return <h5 style={{width: "fit-content", margin: "3px 5px", padding: "2px 7px", borderRadius: "10px"}}>{item}</h5>
                        }):null}
                    </div>
                </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>setShow(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </div>
    )
}

export default Home
