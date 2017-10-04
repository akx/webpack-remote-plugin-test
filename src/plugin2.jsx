import React, { Component } from 'react';

export default ({ text }) => (
  <blockquote>
    {`${text}`.toUpperCase()}
    <br />&mdash;Albert Einstein, probably
  </blockquote>
);
