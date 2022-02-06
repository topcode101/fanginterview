
import { Article } from '@mui/icons-material';
import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path'

const postsDirectory = join(process.cwd(), '..', 'posts')

export type Article = {
    title: string
    description: string,
    slug: string,
    content: string
}

type FileContent = {
    id: string,
    path: string,
    meta: any,
    content: string,
}

type ArticlePreview = Pick<Article, "title" | "description" | "slug">;

const _fileCache : { [key: string]: FileContent} = {}

const _articleCache : { [key: string]: Article} = {}

export function loadAllFileList(dir: string, filenameFilterCb: Function, recursive=true): Array<FileContent> {
    let results: Array<FileContent> = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(filename) {
      const filepath = dir + '/' + filename;
      const stat = fs.statSync(filepath);
      if (stat && stat.isDirectory() && recursive) {
        /* Recurse into a subdirectory */
        results = results.concat(loadAllFileList(filepath,
            filenameFilterCb, recursive));
      } else {
        /* Is a file */
        if (filenameFilterCb(filename, filepath)) {
            if (_fileCache[filename] == null) {
                const filestr = fs.readFileSync(filepath, 'utf8');
                const matter_output = matter(filestr)
                _fileCache[filename] = {
                    id: filename,
                    path: filepath,
                    meta: matter_output.data,
                    content: matter_output.content,
                }
            }
            results.push(_fileCache[filename]);
        }
      }
    });
    return results;
}


// TODO: should return ArticleReview other than Ariticle
export function getAllArticlePreviewList(): Array<Article> {
    let allFiles = loadAllFileList(postsDirectory, (x: string)=>x, true);
    return allFiles.filter(function(f) {
        if (f.meta.draft) {
            console.log("Found draft", f.meta.title)
            return false; // skip
        }
        return true;
      }).map(f=>{
        const slug = f.id.replace(/\.md$/, '')
        
        return {
            title: f.meta.title,
            description: f.meta.description,
            slug: slug,
            content: f.content
        }
        
    });
}

export function getArticalBySlug(slug: string): Article {
    loadAllFileList(postsDirectory, (x: string)=>x, true);
    console.log(slug);
    console.log(Object.keys(_fileCache))
    const fileContent = _fileCache[slug + '.md']; // TODO: slug/filename
    return {
        title: fileContent.meta.title,
        description: fileContent.meta.description,
        slug: slug,
        content: fileContent.content
    }
}
