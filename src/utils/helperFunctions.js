export function sortByTime(questions, questionIds) {
    return questionIds
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  }
  
  export function getUnanswered(questionIds, answeredIds) {
    return questionIds
      .filter(questionId => !(answeredIds.includes(questionId)));
  }
  
  export function formatDate (timestamp) {
    const d = new Date(timestamp);
    return d.toLocaleTimeString('en-US') + ' | ' + d.toLocaleDateString();
  }
  
  export function getPercentVotes (optionVotes, totalVotes) {
    return Math.round((optionVotes / totalVotes ) * 100).toString();
  }
  
  export function formatQuestion (question, users, authedUser) {
    const { id } = question;
    const hasAnswered = Object.keys(users[authedUser]['answers']).includes(id);
    const answer = hasAnswered ? users[authedUser]['answers'][id] : '';
    return {
      hasAnswered,
      authorName: users[question['author']]['name'],
      authorAvatar: users[question['author']]['avatarURL'],
      optionOne: question['optionOne']['text'],
      optionTwo: question['optionTwo']['text'],
      answer,
      optionOneVotes: question['optionOne']['votes'].length,
      optionTwoVotes: question['optionTwo']['votes'].length
    }
  }
  
  export function prepareLeaderBoard (users) {
    const leaderboard = Object.keys(users).map((user_id) => {
      let leader = users[user_id];
      leader['score'] = Object.keys(leader['answers']).length + leader['questions'].length;
      return leader;
    });
  
    return leaderboard.sort((a,b) => b.score - a.score);
  }

  export const getUserAnsweredQuestion = (user, questions) => {
    const answeredQuestions = Object.values(questions).filter((question) => {
      return question.optionOne.votes.indexOf(user) > -1 || question.optionTwo.votes.indexOf(user) > -1;
    });
  
    return answeredQuestions.sort((user_a, user_b) => user_b.timestamp - user_a.timestamp);
  };
  

  export const getUserUnansweredQuestion = (user, questions) => {
    const unAnsweredQuestions = Object.values(questions).filter((question) => {
      return question.optionOne.votes.indexOf(user) === -1 && question.optionTwo.votes.indexOf(user) === -1;
    });
  
    return unAnsweredQuestions.sort((user_a, user_b) => user_b.timestamp - user_a.timestamp);
  };