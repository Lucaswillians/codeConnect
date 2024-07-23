import CardPost from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'
import Link from "next/link";

async function getAllPosts (page) {
  const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`)

  try {
    logger.info('Posts gets with succes!')
    return response.json()
  } 
  catch (error) {
    logger.error('Something went wrong')
    return []
  }
}

export default async function Home({ searchParams }) {
  const currentPage = searchParams?.page || 1
  const {data: posts, prev, next} = await getAllPosts(currentPage)

  return (
    <main className={styles.grid}>
      {posts.map(post => <CardPost key={post.id} post={post}/>)}
      <div className={styles.links}>
        {prev && <Link href={`/?page=${prev}`}>Previous page</Link>}
        {next && <Link href={`/?page=${next}`}>Next page</Link>}
      </div>
    </main>
  );
}
