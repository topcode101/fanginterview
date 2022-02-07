import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { gql } from "@apollo/client";
import client from "../apollo-client";
import { GetStaticProps} from 'next'
import * as React from 'react';
import {Paper} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import { useSession, signIn, signOut } from "next-auth/react"

import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getAllArticlePreviewList, Article } from '../lib/loadFiles'
import Link from 'next/link'
import { stringify } from 'remark';

export const getServerSideProps = async(context: any) =>{
  const articles = getAllArticlePreviewList()
  
  return {
    props: {
      data: articles
    },
 };
}

const AllArticles: NextPage<{data: any}> = (props) => {
  const { data: session } = useSession()
  return (
    <>
  
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={1} lg={2}>
          xs
        </Grid>
        <Grid item xs={10} lg={8}>
          <List sx={{ width: '100%',  bgcolor: 'background.paper', marginTop: '10px' }}>
            { 
              props.data.map((item: Article, ind: number, data: Array<Article>)=>{
                 let x = [ <ListItem key={String(ind)} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <Link href="/posts/[slug]" as={`/posts/${item.slug}`}>
                              <a className="hover:underline">{item.description}</a>
                            </Link>
                          </Typography>
                          {/* {" — I'll be in your neighborhood doing errands this…"} */}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                 ]
                if (ind + 1 != data.length) {
                  x.push(<Divider variant="inset" component="li" />)
                }
                return x;
            })
          }
          </List>
        </Grid>
        <Grid item xs={1} lg={2}>
          xs
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default AllArticles
