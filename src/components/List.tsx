// src/js/components/List.js

import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  return { articles: state.articleReducer.articles };
};

const ConnectedList = ({ articles }: any) => (
  <>
    <h3>articles</h3>
    <ul>
      {articles.map((el: any) => (
        <li key={el.id}>{el.title}</li>
      ))}
    </ul>
  </>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
