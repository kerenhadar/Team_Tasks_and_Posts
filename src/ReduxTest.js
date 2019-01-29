import React, { Component } from "react";
class Comp1 extends Component {
  constructor() {
    super();
    this.state = {
                    articles:   [   
                                    { title: "hello", id: 1 },
                                    { title: "goodbye", id: 2 }
                                ]
    };
  }
  render() {
    const { articles } = this.state;
    return <ul>{articles.map(el => <li key={el.id}>{el.title}</li>)}</ul>;
  }
}
