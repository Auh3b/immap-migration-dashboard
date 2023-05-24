import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  fallback: ReactNode
}

interface ErrorState {
  hasError: Boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError(error: Error) {
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true };
  // }
  componentDidMount(): void {
    console.log(this.props.children)
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    this.setState({hasError: true})
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children; 
  }
}
