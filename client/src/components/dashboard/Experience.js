import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { deleteExperience } from '../../redux/actions/profile';

const Experience = ({ experience, deleteExperience, history }) => {
  const experiences = experience ? experience.map(exp => (
    <tr className='tr-style' key={exp._id} onClick={() => history.push(`/experience/edit/${exp._id}`)}>
      <td>{exp.company}</td>
      <td className="">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{moment.utc(exp.from)}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{moment.utc(exp.to)}</Moment>
        )}
      </td>
    </tr>
  )) : null;

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <small>* Click experience row to edit or delete</small>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="">Title</th>
            <th className="">Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
      <Link to='/experience/add' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Add Experience
      </Link>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(withRouter(Experience));
