export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER';
export const SAVE_USER_QUESTION = 'SAVE_USER_QUESTION';

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function userAnswer (answerToQuestion) {
  return {
    type: SAVE_USER_ANSWER,
    authedUser: answerToQuestion.authedUser,
    qid: answerToQuestion.qid,
    answer: answerToQuestion.answer
  }
}

export function userQuestion (question) {
  return {
    type: SAVE_USER_QUESTION,
    question
  }
}
