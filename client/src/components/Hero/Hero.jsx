import React, { useContext, useState, useEffect } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import PortfolioContext from '../../context/context';
import AboutImg from '../Image/AboutImg';
import { Button } from 'antd';

const Header = () => {
  /*
     todo: clean up the code around
     do not use context here, since the is the landign page. we want everything is hardcoded
     to have better user experience. (super quick rendering when first time loading the page)
  */
  const { hero } = useContext(PortfolioContext);
  // const { title, name, subtitle, cta } = hero;

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  const title = 'Become a Facebook Scientist';
  const subtitle = 'Interview Questions';

  const mobileRender = (
    <mysection id="hero" className="jumbotron">
      <Container>
        <Fade left={isDesktop} bottom={isMobile} duration={700} delay={500} distance="30px">
          <h1 className="hero-title">
            {title}{' '}
            {/* <span className="text-color-main">{name || 'Your Name'}</span> */}
            <br />
            <span className="text-color-main">{subtitle}</span>
          </h1>
        </Fade>
        
        <Fade left={isDesktop} bottom={isMobile} duration={700} delay={1000} distance="30px">
            <p className="hero-cta">
              <span className="cta-btn cta-btn--hero">
              <a
                onClick={()=>{
                  window.location.href = 'http://' + window.location.host + '/all-articles'
                  console.log('clicked')
                }}
              >
                Know more
              </a>
              </span>
            </p>
        </Fade>
            
      </Container>
    </mysection>
  );

  const desktopRender = (
    <mysection id="hero" className="jumbotron">
      <Container>
        <Row>
        <Col lg={8}>
          <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
            <h1 className="hero-title">
              {title}{' '}
              {/* <span className="text-color-main">{name || 'Your Name'}</span> */}
              <br />
              <span className="text-color-main">{subtitle}</span>
            </h1>
          </Fade>
          
          <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
            <p className="hero-cta">
              <span className="cta-btn cta-btn--hero">
              <a
                onClick={()=>{
                  window.location.href = 'http://' + window.location.host + '/all-articles'
                  console.log('clicked')
                }}
              >
                Know more
              </a>
              </span>
            </p>
          </Fade>
        </Col>
        <Col lg={4}>
          <AboutImg alt="profile picture" filename={'coding.png'}></AboutImg>
        </Col>
        </Row>
      </Container>
    </mysection>
  );

  return isDesktop ? desktopRender: mobileRender;
};

export default Header;
