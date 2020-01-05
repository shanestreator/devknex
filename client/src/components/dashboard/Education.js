import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../redux/actions/profile';

const Education = ({ education, deleteEducation, history }) => {
  const educations = education ? education.map(edu => (
    <tr className='tr-style' key={edu._id} onClick={() => history.push(`/education/edit/${edu._id}`)}>
      <td>{edu.school}</td>
      <td className="">{edu.degree}</td>
      <td>
        <Moment format="MM/DD/YYYY">{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="MM/DD/YYYY">{moment.utc(edu.to)}</Moment>
        )}
      </td>
    </tr>
  )) : null;

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <small>* Click education row to edit or delete</small>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="">Degree</th>
            <th className="">Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
      <Link to='/education/add' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary' /> Add Education
      </Link>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(withRouter(Education));
