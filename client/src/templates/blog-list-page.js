import React from "react"
// import { graphql } from "gatsby"

import { Layout, List  } from 'antd';
import NavigationHeader from "../components/Header/NavigationHeader";
const { Content, Sider } = Layout;
// import Layout from "../components/layout"
export default ({ data, pageContext }) => {
    console.log(JSON.stringify(data, null, 4))
    console.log(JSON.stringify(pageContext, null, 4))
    const allnodes = pageContext.allnodes

    data = allnodes.map((node, index)=>{
        return {
            title: node.frontmatter.title,
            description: node.frontmatter.description,
            slug: node.fields.slug,
        }
    })

    return (
        <Layout>
            
            <NavigationHeader></NavigationHeader>
            <Layout 
                style={{background: 'white'}}
            >

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
            </Sider>
            {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
                {/* <Header>Header</Header> */}
                <Content 
                    style={{ margin: '24px 16px 0', background: 'white' }}
                >
                    <div style={{ padding: 24, minHeight: 360, textAlign: 'start' }}>

                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href={item.slug}>{item.title}</a>}
                            description={item.description}
                            />
                        </List.Item>
                        )}
                    />
                    {/* <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
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
                    </Menu> */}
                    </div>
                </Content>
                <Sider theme='light'
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
// export const query = graphql`
//   query($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
// `