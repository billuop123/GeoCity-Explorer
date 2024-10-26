import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error loading map component. Please try again later.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
