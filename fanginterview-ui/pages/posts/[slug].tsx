import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import {replaceMembership, markdownToHtml } from '../../lib/markdownToHtml'
import { getAllArticlePreviewList, getArticalBySlug } from '../../lib/loadFiles'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { getSession } from "next-auth/react"
import Paper from '@mui/material/Paper';

export default function Post({ post }: any) {
  
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    const title = post.article.title;
    return <Container maxWidth="lg">
      <Box>
        <Paper sx={
          {
            padding: '15px'
          }
        }>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html_content }} />
        </Paper>
      </Box>
    </Container>
    
  }
  return <>ss</>
}

export async function getServerSideProps(ctx: any) {
    const {params} = ctx;
    const content = {slug: params.slug};
    const slug = params.slug;
    const article = getArticalBySlug(slug);
    console.log('[slug].tsx: getServerSideProps' ,params);

//   const post = getPostBySlug(params.slug, [
//     'title',
//     'date',
//     'slug',
//     'author',
//     'content',
//     'ogImage',
//     'coverImage',
//   ])
    let html_content = await markdownToHtml(article.content || '');
    replaceMembership(html_content)
    const session = await getSession(ctx);
    if (!session) {
      // const regex = /<p>\[membership.*\/membership\]<\/p>/igms;
      // html_content = html_content.replace(regex, '<div class="secret"> Please Sign in to unlock this.</div>')
      html_content = replaceMembership(html_content);
      return {
        props: {
          post: {
            params,
            html_content,
            article
          },
        },
      }
    } else {
      const regex = /<p>.*\[?membership\].*<\/p>/igm;
      html_content = html_content.replace(regex, '')
      return {
        props: {
          post: {
            params,
            html_content,
            article
          },
        },
      }
    }
    
}

// export async function getStaticPaths() {
//   const allArticles =  getAllArticlePreviewList()
//   return {
//     paths: allArticles.map((post) => {
//       return {
//         params: {
//           slug: post.slug,
//           abce: post.slug,
//         },
//       }
//     }),
//     fallback: false,
//   }
// }