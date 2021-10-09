import React from "react"
import { graphql } from "gatsby"
import { Button } from 'antd'
import { Layout, Menu } from 'antd';
import NavigationHeader from "../components/Header/NavigationHeader";

const { Content, Sider } = Layout;
// import Layout from "../components/layout"
export default ({ data, pageContext }) => {
    console.log(JSON.stringify(data, null, 4))
    console.log(JSON.stringify(pageContext, null, 4))
    const allnodes = pageContext.allnodes
    const post = data.markdownRemark
    return (
        <Layout>
            <NavigationHeader></NavigationHeader>

            <Layout >
            <Sider
                theme='light'
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                    {
                        allnodes.map((node, index)=>{
                            return <Menu.Item key={index}
                                onClick={({ item, key, keyPath })=>{window.location.href = node.fields.slug;
                            }}
                            >
                                {node.frontmatter.title}
                            </Menu.Item>
                        })
                    }
                    {/* <Menu.Item key="1" icon={<UserOutlined />}>
                    nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UserOutlined />}>
                    nav 4
                    </Menu.Item> */}
                </Menu>
            </Sider>
            {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
                {/* <Header>Header</Header> */}
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div style={{textAlign: 'left', margin: '5px'}}>
                        <Button> This is a test button</Button>
                        <div>
                            <h1>{post.frontmatter.title}</h1>
                            <div dangerouslySetInnerHTML={{ __html: post.html }} />
                        </div>
                        </div>
                    </div>
                </Content>
                <Sider 
                    theme='light'
                    breakpoint="lg"
                    collapsedWidth="0"
                    trigger={null}
                >
                    right sider
                </Sider>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        </Layout>
    )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`