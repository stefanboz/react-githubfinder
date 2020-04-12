import React, { useEffect, useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';

import GithubContext from '../../context/github/githubContext';

import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, user, loading, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const {
    name,
    login,
    avatar_url,
    location,
    bio,
    blog,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
    company,
    created_at,
    updated_at,
  } = user;

  const formatDate = (dateString) => {
    let accountCreatedMonth = new Date(dateString).getMonth();
    accountCreatedMonth += 1;

    const accountCreatedDay = new Date(dateString).getDate();

    const accountCreatedYear = new Date(dateString).getFullYear();

    return `${accountCreatedMonth}/${accountCreatedDay}/${accountCreatedYear}`;
  };

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className="fas fa-check text-success"></i>
      ) : (
        <i className="fas fa-times-circle text-danger"></i>
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt={`GitHub user ${name} AKA @${login}`}
            style={{
              width: '150px',
              borderRadius: '10px',
              filter: 'drop-shadow(1px 1px 2px black)',
            }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <ul>
            <li>
              <strong>Username: </strong> {login}
            </li>
            <li>
              <strong>Github member since: </strong> {formatDate(created_at)}
            </li>
            <li>
              <strong>Last activity: </strong> {formatDate(updated_at)}
            </li>
          </ul>
          <a href={html_url} className="btn btn-dark my-1">
            Visit @{login}'s GitHub profile
          </a>
          <ul>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>

            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
