import { Component } from "react";
import { withRouter } from 'react-router'


class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    if (!this.props.children) return null;
    return this.props.children;
  }
}

export default withRouter(ScrollToTop)