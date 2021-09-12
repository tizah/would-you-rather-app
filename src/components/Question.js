// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Utils
import { formatDate } from '../utils/helperFunctions';
import { theme } from '../utils/theme';
// Material UI
import Avatar from '@material-ui/core/Avatar';
import { sarah, johndoe , tylermcginnis } from './Images'
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';

class Question extends Component {

  render() {

    const { authorName, authorAvatar, date, optionPreview, id, authedUser } = this.props;
    //TODO path to avatar

    return (
      <div className='question'>
        <Avatar alt='avatar' src={ [sarah, johndoe, tylermcginnis].find(x => x.includes(authorAvatar)) }/>
        <div className='question-info'>
          <span className='author'>{authorName}</span>
          <div className='date'>{date}</div>
          <h3>Would you rather</h3>
          <span className='option-preview'>{optionPreview} ...</span>
        </div>
        <div className='view-button-container'>
          <MuiThemeProvider theme={theme}>
            <Button
              variant='outlined'
              size='small'
              color='primary'
              component={Link}
              to={`/questions/${id}`}
            >
              View
            </Button>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({authedUser, questions, users }, { id }) => {
  const question = questions[id];
  return {
    authorName: users[question['author']]['name'],
    authorAvatar: users[question['author']]['avatarURL'],
    date: formatDate(question['timestamp']),
    optionPreview: question['optionOne']['text'],
    authedUser
  }
};

export default connect(mapStateToProps)(Question);
