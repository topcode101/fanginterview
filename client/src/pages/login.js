import React from "react"
// import { graphql } from "gatsby"
// import loadScript from '../lib/loadscript'
import { GoogleLogin } from 'react-google-login';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { Row } from 'antd';
import {
    ApolloClient,
    InMemoryCache,
    gql
  } from "@apollo/client";

import {setCookie} from '../services/auth';

const GOOGLE_LOGIN_MUTAION = gql`
mutation Mutation($source: UserSource!, $googleIdToken: String) {
    login(source: $source, googleIdToken: $googleIdToken) {
      user {
        username,
        email,
        id
      },
      token
    }
  }
`;
const AUTH_TOKEN = 'AuthenticationToken';
const USER_NAME = 'UserName';
const USER_EMAIL = 'UserEmail';
const USER_ID = 'UserId';
// https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
export default () => {
    const client = new ApolloClient({
        uri: 'http://localhost:10010/graphql',
        cache: new InMemoryCache()
    });
    
    client
    .query({
        query: gql`
        query TestQuery {
            hello
        }
        `
    })
    .then(result => console.log(result));
      const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
      const googleLoginOnSuccess = function(response) {
        console.log('on success')
        console.log('responseGoogle', response)
        client.mutate({
            mutation: GOOGLE_LOGIN_MUTAION,
            variables: {
                source: 'GOOGLE',
                googleIdToken: response.tokenId }
            }
        ).then(res=>{
            console.log('mutate', res)
            localStorage.setItem(AUTH_TOKEN, res.data.login.token);
            localStorage.setItem(USER_NAME, res.data.login.user.username);
            localStorage.setItem(USER_EMAIL, res.data.login.user.email);
            localStorage.setItem(USER_ID, res.data.login.user.id);
            setCookie('Authentication', res.data.login.token)
        })
     }
    
    return (
    <>
        <Row 
            type="flex" 
            justify="center" 
            align="middle" 
            style={{marginTop:'50px', marginBottom: '30px'}}
        >
            <GoogleLogin
                clientId="166022609644-uu2o5cscof0vd9rbisdv34pc3or837c7.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={googleLoginOnSuccess}
                onFailure={(respponse) => {
                    console.error(respponse);
                }}
                cookiePolicy={'single_host_origin'}
                redirectUri='http://localhost:8000/login/'
            />
            <Divider />
        </Row>
        <Row type="flex" justify="center" align="middle" >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >

                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username">
                    </Input>

                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        
        </Row>
    </>
    );
   
}
  

// export const query = graphql`
//   query {
//     allFile {
//       edges {
//         node {
//           relativePath
//           prettySize
//           extension
//           birthTime(fromNow: true)
//         }
//       }
//     }
//   }
// `