import React, { useContext, useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import Tilt from 'react-tilt';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';
import ProjectImg from '../Image/ProjectImg';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function triggerDownload(url) {
  let a = document.createElement('a')
  a.href = url
  a.download = url;
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

async function handleDownloadButton(type, company/*, start_date, end_date*/) {
  await axios.get(`/api/downloadFile?company=${company}&type=${type}`).then((response)=>{
    triggerDownload(response.data.href);
  })
}

const Project = ({definition}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [a, b] = useState(0);
  
  const [btnAhover, setBtnAHover] = useState(false);
  const [btnBhover, setBtnBHover] = useState(false);

  const [numOfRecordsForSoftware, setNumOfRecordsForSoftware] = useState(0);
  const [lastestPostTimeForSoftware, setLastestPostTimeForSoftware] = useState('');

  const [numOfRecordsForDataEng, setNumOfRecordsForDataEng] = useState(0);
  const [lastestPostTimeForDataEng, setLastestPostTimeForDataEng] = useState('');

  useEffect(() => {
    let fetchData = async ()=>{
      axios.get(`/api/interviews?company=${definition.company}&type=SoftwareEng`)
        .then(response => {
          if (response.data && response.data.found) {
            setNumOfRecordsForSoftware(response.data.totalRecords);
            let t = new Date(response.data.latestPublishTime).toDateString();
            setLastestPostTimeForSoftware(t);
          }
        }, error => {
          console.log(error);
        });
    }

    let fetchData1 = async ()=>{
      axios.get(`/api/interviews?company=${definition.company}&type=DataEng`)
        .then(response => {
          if (response.data && response.data.found) {
            setNumOfRecordsForDataEng(response.data.totalRecords);
            let t = new Date(response.data.latestPublishTime).toDateString();
            setLastestPostTimeForDataEng(t);
          }
        }, error => {
          console.log(error);
        });
    }
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
    fetchData();fetchData1();
  }, []);

  function handleDateSelect() {

  }
  const { title, info, info2, url, repo, img, id } = definition;

  return (
    <Col key={id} lg={3} sm={12}>
      <Row>

          <div className="project-wrapper__image">
            <a
              href={url || '#!'}
              target="_blank"
              aria-label="Project Link"
              rel="noopener noreferrer"
            >
              <Tilt
                options={{
                  reverse: false,
                  max: 8,
                  perspective: 1000,
                  scale: 1,
                  speed: 300,
                  transition: true,
                  axis: null,
                  reset: true,
                  easing: 'cubic-bezier(.03,.98,.52,.99)',
                }}
              >
                <div data-tilt className="thumbnail rounded">
                  <ProjectImg alt={title} filename={img} />
                </div>
              </Tilt>
            </a>
          </div>
      </Row>
      <Row>
          <Container>
          <Row>
            <div
               onMouseEnter={()=>setBtnAHover(true)}
               onMouseLeave={()=>setBtnAHover(false)} // should use ...
            >
              <Button variant="outline-primary" 
                style={{'whiteSpace': 'break-spaces' }}
                size='lg'
                onClick={handleDownloadButton.bind(null, 'SoftwareEng', definition.company)}
                >
                {btnAhover? `点击下载\nSoftware Engineer 面经 (${numOfRecordsForSoftware})` : `${lastestPostTimeForSoftware} 更新\nSoftware Engineer 面经`}
              </Button>
            </div>
          </Row>
          <Row>
            <div
               onMouseEnter={()=>setBtnBHover(true)}
               onMouseLeave={()=>setBtnBHover(false)} // should use ...
            >
              <Button variant="outline-success" 
                style={{'whiteSpace': 'break-spaces', 'width':'100%' }}
                size='lg'
                onClick={handleDownloadButton.bind(null, 'DataEng', definition.company)}
                >
                {btnBhover? `点击下载\nData Engineer 面经 (${numOfRecordsForDataEng})` : `${lastestPostTimeForDataEng} 更新\nData Engineer 面经`}
              </Button>
            </div>
          </Row>
          </Container>
      </Row>
    </Col>
  );
};

export default Project;
