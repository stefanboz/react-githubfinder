import React, { useContext } from 'react';

import GithubContext from '../../context/github/githubContext';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import zeroMatches from '../../assets/zeromatches.jpg';

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { users, loading, searchMatchesFound } = githubContext;

  if (loading) {
    return <Spinner />;
  } else if (!searchMatchesFound) {
    return (
      <div className="text-center">
        <img src={zeroMatches} alt="No matches found" className="img-info" />
      </div>
    );
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
