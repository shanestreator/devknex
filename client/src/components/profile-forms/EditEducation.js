import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, addEducation, deleteEducation } from '../../redux/actions/profile';

const EditEducation = ({
  profile: { profile, loading },
  deleteEducation,
  addEducation,
  getCurrentProfile,
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    id: '',
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    if (profile) {
      const edu = profile.education.find(el => el._id === match.params.id)

      setFormData({
        id: edu._id,
        school: edu.school,
        degree: edu.degree,
        fieldofstudy: edu.fieldofstudy,
        from: edu.from,
        to: edu.to,
        current: edu.current,
        description: edu.description
      })
    }

  }, [loading]);
  
  const {
    id,
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any school or bootcamp that you
        have attended
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addEducation(formData, history, id);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={moment(from).format('YYYY-MM-DD')}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current School
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={moment(to).format('YYYY-MM-DD')}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="edit-button">
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
          <button
            type='button'
            onClick={() => deleteEducation(id, history)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </form>
    </Fragment>
  );
};

EditEducation.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, addEducation, deleteEducation }
)(withRouter(EditEducation));
