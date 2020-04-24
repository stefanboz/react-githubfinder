import React, { useEffect, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import GithubContext from '../../context/github/githubContext';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { getUserAndRepos } from '../../context/github/actions';
import { GET_USER_AND_REPOS, SET_LOADING } from '../../context/types';

const User = ({ match: { params } }) => {
  const {
    user: {
      name,
      avatar_url,
      location,
      bio,
      login,
      html_url,
      followers,
      following,
      public_gists,
      public_repos,
      hireable,
      blog,
      company,
      created_at,
      updated_at,
    },
    loading,
    dispatch,
    repos,
  } = useContext(GithubContext);

  useEffect(() => {
    dispatch({ type: SET_LOADING });
    getUserAndRepos(params.login).then((res) =>
      dispatch({ type: GET_USER_AND_REPOS, payload: res })
    );
  }, [dispatch, params.login]);

  if (loading) return <Spinner />;

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
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-centre">
          <img
            src={avatar_url}
            alt=""
            className="round-img"
            style={{ width: '150px' }}
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
            Visit GitHub profile
          </a>
          <ul>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: {company}</strong>
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>
                    Website: <a href={`http://${blog}`}>{blog}</a>{' '}
                  </strong>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="car text-centre">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public repos: {public_repos}</div>
        <div className="badge badge-dark">Public gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
