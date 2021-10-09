import React from 'react';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';
import { Layout, Menu, List, Avatar  } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const NavigationHeader = () => (
    <Header theme='light' style={{
        background: 'white',
        boxShadow: 'inset 0 -1px 0 rgb(230 230 230)'
    }}>
        
        <span
            style={{
                fontSize: '27px',
                fontWeight: '500',
                fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
        >Become a facebook data scientist</span>
        
    </Header>
);

// Title.propTypes = {
//   title: PropTypes.string.isRequired,
// };


export default NavigationHeader;
