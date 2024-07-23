import logger from "@/logger"
import { remark } from 'remark';
import html from 'remark-html';
import styles from './page.module.css'
import CardPost from "@/components/CardPost";

async function getPostBySlug(slug) {
    const url = `http://localhost:3042/posts?slug=${slug}`
    const response = await fetch(url)
   
    try {
    logger.info('Posts gets with succes!')

    const data = await response.json()
    
    if (data.length) {
      const post = data[0];
      const processedContent = await remark().use(html).process(post.markdown);
      const contentHtml = processedContent.toString();

      post.markdown = contentHtml

    return post
    }
  } 
  catch (error) {
    logger.error('Something went wrong')
    return {}
  }
}

const PagePost = async ({ params }) => {
  const post = await getPostBySlug(params.slug)
  return (
    <div>
      <CardPost post={post} highlight />
        <h3 className={styles.subtitle}>Código:</h3>
         <div className={styles.code}>
          <div dangerouslySetInnerHTML={{ __html: post.markdown }} />
         </div>
    </div>
  )
}

export default PagePost