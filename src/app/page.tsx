import Link from 'next/link';
import Date from '@/components/date';
import DarkLightToggle from "@/components/DarkLightToggle";
import { getSortedPostsData } from '@/lib/posts';
import utilStyles from '@/styles/utils.module.css';

type Post = {
  id: string;
  date: string;
  title: string;
};

export default async function Home() {
  const allPostsData = getSortedPostsData() as Post[];
  
  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <DarkLightToggle />
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date}/>
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}