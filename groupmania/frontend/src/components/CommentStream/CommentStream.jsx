// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Form from 'next/form';
// import { useSession } from 'next-auth/react';
// import { useTheme } from '../../context/theme-context';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faThumbsUp,
//   faThumbsDown,
//   faComment,
// } from '@fortawesome/free-solid-svg-icons';

// import './commentstream.scss';
// import Comments from '../Comments/Comments';

// // Ensure component is mounted before using theme

// const CommentStream = ({ posts, postComment }) => {
//   const [hasErrorFetching, setHasErrorFetching] = useState('');
//   const { data: session, status, update } = useSession();
//   const [isComplete, setIsComplete] = useState(false);
//   const { theme } = useTheme();
//   const [postsStream, setPostsStream] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   // State to track like/dislike status for each post
//   const [postReactions, setPostReactions] = useState({});

//   // State to track comment input visibility per post
//   const [openComments, setOpenComments] = useState({});

//   // Handle thumbs up click
//   const handleThumbsUp = (postId) => {
//     setPostReactions((prev) => ({
//       ...prev,
//       [postId]: {
//         ...prev[postId],
//         thumbsUp: !prev[postId]?.thumbsUp,
//         thumbsDown: false, // Reset thumbs down when thumbs up is clicked
//       },
//     }));
//   };

//   // Handle thumbs down click
//   const handleThumbsDown = (postId) => {
//     setPostReactions((prev) => ({
//       ...prev,
//       [postId]: {
//         ...prev[postId],
//         thumbsDown: !prev[postId]?.thumbsDown,
//         thumbsUp: false, // Reset thumbs up when thumbs down is clicked
//       },
//     }));
//   };

//   const handleToggleComments = (postId) => {
//     setOpenComments((prev) => ({
//       ...prev,
//       [postId]: !prev[postId],
//     }));
//   };

//   return (
//     <div className="poststream">
//       {posts.map((item, index) => {
//         const {
//           description,
//           post_content,
//           uploadedImage,
//           post_img,
//           comment: itemComment,
//           id,
//           post_id,
//           comments,
//           timestamp,
//         } = item;

//         const postId = id ?? post_id;
//         const descriptionText = description ?? post_content ?? '';
//         const imageSrc = uploadedImage ?? post_img;
//         return (
//           <div key={index} className="poststream__container">
//             <Image
//               src="/assets/profile_image.jpg"
//               alt="icon"
//               width={80}
//               height={80}
//               className="poststream__profileImg"
//             />
//             <div className="poststream__content">
//               <div className="poststream__name">
//                 <h4>Username</h4>
//               </div>
//               <div className="poststream__upperBlock">
//                 <p>{descriptionText}</p>
//               </div>
//               <span>
//                 {imageSrc && (
//                   <Image
//                     src={imageSrc}
//                     alt="icon"
//                     width={500}
//                     height={500}
//                     className="poststream__uploadedImg"
//                   />
//                 )}
//               </span>
//               {timestamp && (
//                 <div
//                   className="poststream__timestamp"
//                   style={{
//                     color: mounted && theme === 'dark' ? 'white' : 'black',
//                   }}
//                 >
//                   <span>{timestamp}</span>
//                 </div>
//               )}
//               <span>
//                 <p>{itemComment}</p>
//               </span>
//               <div className="poststream__bottom">
//                 {/* <FontAwesomeIcon
//                   icon={faThumbsUp}
//                   className={`poststream__icon poststream__icon--thumbs-up ${
//                     postReactions[postId]?.thumbsUp ? 'active' : ''
//                   }`}
//                   width="30px"
//                   height="30px"
//                   onClick={() => handleThumbsUp(postId)}
//                   style={{
//                     cursor: 'pointer',
//                     color: postReactions[postId]?.thumbsUp
//                       ? '#007bff'
//                       : 'inherit',
//                   }}
//                 />
//                 <FontAwesomeIcon
//                   icon={faThumbsDown}
//                   className={`poststream__icon poststream__icon--thumbs-down ${
//                     postReactions[postId]?.thumbsDown ? 'active' : ''
//                   }`}
//                   width="30px"
//                   height="30px"
//                   onClick={() => handleThumbsDown(postId)}
//                   style={{
//                     cursor: 'pointer',
//                     color: postReactions[postId]?.thumbsDown
//                       ? '#dc3545'
//                       : 'inherit',
//                   }}
//                 />
//                 <FontAwesomeIcon
//                   icon={faComment}
//                   className={`poststream__icon poststream__icon--comment ${
//                     openComments[postId] ? 'active' : ''
//                   }`}
//                   width="30px"
//                   height="30px"
//                   onClick={() => handleToggleComments(postId)}
//                   style={{ cursor: 'pointer' }}
//                 /> */}
//               </div>
//               <label htmlFor="fname"></label>
//               {/* Display submitted comments */}
//               {Array.isArray(comments) && comments.length > 0 && (
//                 <div className="poststream__comments">
//                   <h4>Comments:</h4>
//                   {comments.map((commentItem, commentIndex) => (
//                     <div key={commentIndex} className="poststream__comment">
//                       <p>{commentItem.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {openComments[postId] && (
//                 <Comments postComment={postComment} id={postId} />
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default CommentStream;
