// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Utils
import { prepareLeaderBoard } from '../utils/helperFunctions';
// Components
import Nav from './Navbar';
import LoginRedirect from './LoginRedirect';
import { sarah, johndoe , tylermcginnis } from './Images'
// Material UI
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Customised Material UI Table Cell
const LeaderboardTableRow = withStyles(theme => ({
  head: {
    backgroundColor: '#00897B',
    color: theme.palette.common.white,
    fontWeight: 400,
    fontSize: 17
  },
  body: {
    fontSize: 16
  }
}))(TableCell);

class Leaderboard extends Component {

  render() {

    // Redirect to login page if app is in logged out state
    if (this.props.loggedOut) {
      return <LoginRedirect afterLogin='/leaderboard'/>
    }

    const { leaderboard } = this.props;

    return (
      <div className='leaderboard'>
        <Nav />
        <div className='leaderboard-table'>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <LeaderboardTableRow>Leader</LeaderboardTableRow>
                  <LeaderboardTableRow numeric>Questions</LeaderboardTableRow>
                  <LeaderboardTableRow numeric>Answers</LeaderboardTableRow>
                  <LeaderboardTableRow numeric>Score</LeaderboardTableRow>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map(leader => {
                  return (
                    <TableRow key={leader.id}>
                      <LeaderboardTableRow component="th" scope="row">
                        <img
                          alt='avatar'
                          src={ [sarah, johndoe, tylermcginnis].find(x => x.includes(leader.avatarURL)) }
                          className='small-avatar'
                        />
                        <span className='leader-name'>{leader.name}</span>
                      </LeaderboardTableRow>
                      <LeaderboardTableRow numeric>{leader.questions.length}</LeaderboardTableRow>
                      <LeaderboardTableRow numeric>{Object.keys(leader.answers).length}</LeaderboardTableRow>
                      <LeaderboardTableRow numeric>{leader.score}</LeaderboardTableRow>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => ({
    loggedOut: authedUser === null ,
    leaderboard : prepareLeaderBoard(users)
});

export default connect(mapStateToProps)(Leaderboard);
