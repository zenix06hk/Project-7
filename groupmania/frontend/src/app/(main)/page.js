'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import CreatePost from '@/components/CreatePost/CreatePost';
import PostStream from '@/components/PostStream/PostStream';

function HomePage() {
  //user create form
  const [userPost, setUserPost] = useState({
    username: '',
    img: '',
    description: '',
    uploadedImage: '',
    comments: [],
    id: 1,
  });
  //published posts on the page
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrorFetching, setHasErrorFetching] = useState('');

  useEffect(() => {
    // the method used to fetch my profile
    if (!isComplete) {
      if (status == 'loading') {
        {
          //if status is loading, wait to loading
          return;
        }
      }
      if (status === 'authenticated') {
        fetchPost();
      } else {
        // console.log('user not authenticated');
      }
    }
  }, [session]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/posts/get-posts`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      // Check if the response is actually JSON
      const data = await res.json();
      if (!data.success) {
        setIsLoading(false);
        setHasErrorFetching(data.error || 'something has gone wrong.');
        return <></>;
      }
      // console.log(data.data.post);
      setPosts(data.data.post);
      setIsComplete(true);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // console.log(error);
      setHasErrorFetching('error has occurred');
    }
  };

  //update description to post stream content

  // Prevent posting if both uploadedImage and description are empty
  const canPost =
    userPost.description.trim() !== '' ||
    (userPost.uploadedImage && userPost.uploadedImage !== '');

  //create new post item
  const newPostItem = (e) => {
    fetchPost();
  };

  const postComment = (value, id) => {
    fetchPost();
  };

  return (
    <div className="homePage_content">
      <CreatePost userPost={userPost} newPostItem={newPostItem} />
      <PostStream posts={posts} postComment={postComment} />
    </div>
  );
}

export default HomePage;
