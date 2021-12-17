import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'
import { getAllArticlePreviewList, getArticalBySlug } from '../../lib/loadFiles'

export default function Post({ post }: any) {
  debugger;
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <div dangerouslySetInnerHTML={{ __html: post.html_content }} />
  }
  return <>ss</>
}

export async function getStaticProps({ params }: any) {
    const content = {slug: params.slug}
    const slug = params.slug
    const article = getArticalBySlug(slug)
    console.log(params)

//   const post = getPostBySlug(params.slug, [
//     'title',
//     'date',
//     'slug',
//     'author',
//     'content',
//     'ogImage',
//     'coverImage',
//   ])
    const html_content = await markdownToHtml(article.content || '')

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

export async function getStaticPaths() {
  const allArticles =  getAllArticlePreviewList()
  return {
    paths: allArticles.map((post) => {
      return {
        params: {
          slug: post.slug,
          abce: post.slug,
        },
      }
    }),
    fallback: false,
  }
}