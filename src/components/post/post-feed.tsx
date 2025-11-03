import Fallback from "../fallback";
import Loader from "../loader";
import PostItem from "./post-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts-data";

export default function PostFeed() {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostsData();
  const { ref, inView } = useInView(); // 브라우저 최하단에 도달 시, true 반환

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      <div ref={ref}>
        {data.pages.map((page) =>
          page.map((post) => <PostItem key={post.id} {...post} />),
        )}
        {isFetchingNextPage && <Loader />}
      </div>
    </div>
  );
}
