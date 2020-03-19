import React from 'react';
import { connect } from 'react-redux';
import { addArticle } from '../redux/actions/index';

const mapDispatchToProps = (dispatch: any) => {
  return {
    addArticle: (article: any) => dispatch(addArticle(article))
  };
};

const ConnectedForm = (props: any) => {
  const [title, setTitle] = React.useState('');

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.addArticle({ title });
  };

  return (
    <>
      <h3>form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' value={title} onChange={handleChange} />
        </div>
        <button type='submit'>SAVE</button>
      </form>
    </>
  );
};

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;
