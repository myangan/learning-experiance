// need to combine all the data together depends on connections
const formatReviewId = (review, user, comment, category) => {
  const newObject = { ...review };
  let commentCount = 0;
  comment.forEach((x) => x.review_id === newObject.review_id);
  newObject.comment_count = comment.votes;

  return newObject;
};

module.exports = formatReviewId;

//     review_id: 0,
//     comment_count: 0,
