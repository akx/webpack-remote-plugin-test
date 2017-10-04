import React, { Component } from 'react';

export default class Plugin1 extends Component {
  componentDidMount() {
    this.animateInterval = setInterval(() => this.animate(), 100);
  }
  componentWillUnmount() {
    clearInterval(this.animateInterval);
  }
  animate() {
    if (this.span) {
      const x = `${-10 + Math.random() * 20}px`;
      const y = `${-10 + Math.random() * 20}px`;
      const r = `${-20 + Math.random() * 40}deg`;
      this.span.style.transform = `translate(${x},${y}) rotate(${r})`;
    }
  }

  render() {
    const { text } = this.props;
    if (!(text && text.length)) return null;
    return (
      <span
        style={{
          display: 'inline-block',
          transition: '0.05s transform',
        }}
        ref={el => {
          this.span = el;
        }}
      >
        {text}
      </span>
    );
  }
}
