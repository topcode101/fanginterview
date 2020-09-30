import React, { useContext, useState, useEffect } from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-scroll';
import PortfolioContext from '../../context/context';
import AboutImg from '../Image/AboutImg';

const Header = () => {
  const { hero } = useContext(PortfolioContext);
  const { title, name, subtitle, cta } = hero;

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

  const mobileRender = (
    <section id="hero" className="jumbotron">
      <Container>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
          <h1 className="hero-title">
            {title || 'FANG面经集合'}{' '}
            {/* <span className="text-color-main">{name || 'Your Name'}</span> */}
            <br />
            <span className="text-color-main">{subtitle || "梦想开始的地方"}</span>
          </h1>
        </Fade>
        <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
          <p className="hero-cta">
            <span className="cta-btn cta-btn--hero">
              <Link to="about" smooth duration={1000}>
                {cta || 'Know more'}
              </Link>
            </span>
          </p>
        </Fade>
      </Container>
    </section>
  );

  const desktopRender = (
    <section id="hero" className="jumbotron">
      <Container>
        <Row>
        <Col lg={8}>
          <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={500} distance="30px">
            <h1 className="hero-title">
              {title || 'FANG面经集合'}{' '}
              {/* <span className="text-color-main">{name || 'Your Name'}</span> */}
              <br />
              <span className="text-color-main">{subtitle || "梦想开始的地方"}</span>
            </h1>
          </Fade>
          <Fade left={isDesktop} bottom={isMobile} duration={1000} delay={1000} distance="30px">
            <p className="hero-cta">
              <span className="cta-btn cta-btn--hero">
                <Link to="about" smooth duration={1000}>
                  {cta || 'Know more'}
                </Link>
              </span>
            </p>
          </Fade>
        </Col>
        <Col lg={4}>
          <AboutImg alt="profile picture" filename={'coding.png'}></AboutImg>
        </Col>
        </Row>
      </Container>
    </section>
  );

  return isDesktop ? desktopRender: mobileRender;
};

export default Header;
