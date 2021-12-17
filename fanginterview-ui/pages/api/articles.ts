// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllArticlePreviewList } from '../../lib/loadFiles'


type Article = {
    title: string
    description: string,
    slug: string
}



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Article>>
) {

  res.status(200).json(getAllArticlePreviewList())
}
