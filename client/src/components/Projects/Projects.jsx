import React, { useContext, useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Tilt from 'react-tilt';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';
import ProjectImg from '../Image/ProjectImg';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Project from './Project';

const Projects = () => {
  const { projects } = useContext(PortfolioContext);

  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
    fetch
  }, []);

  function handleDateSelect() {

  }
  return (
    <mysection id="projects">
      <Container>
        <div className="project-wrapper">
          <Title title="公司面经" />
          <Fade
          right={isDesktop}
          bottom={isMobile}
          duration={1000}
          delay={1000}
          distance="30px"
          >
            <Row>
            {projects.map((project) => {
              return <Project definition={project} />
            })}
            </Row>
          </Fade>
        </div>
      </Container>
    </mysection>
  );
};

export default Projects;
