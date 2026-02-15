import { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ErrorBoundary.css';

/**
 * Error Boundary component to catch React errors and display fallback UI
 * Prevents the entire app from crashing due to component errors
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error('ErrorBoundary caught an error:', error);
        console.error('Component stack:', errorInfo.componentStack);

        this.setState({
            error,
            errorInfo,
        });

        // Here you could send error to logging service
        // Example: sendToErrorTracking(error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            return (
                <div className="error-boundary">
                    <div className="error-boundary-content">
                        <div className="error-icon">⚠️</div>
                        <h2 className="error-title">Something went wrong</h2>
                        <p className="error-message">
                            {this.props.fallbackMessage || "We're sorry, but something unexpected happened."}
                        </p>

                        <div className="error-actions">
                            <button
                                onClick={() => window.location.reload()}
                                className="error-button error-button-primary"
                            >
                                Reload Page
                            </button>

                            {this.props.showReset && (
                                <button
                                    onClick={this.handleReset}
                                    className="error-button error-button-secondary"
                                >
                                    Try Again
                                </button>
                            )}
                        </div>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-details">
                                <summary>Error Details (Development Only)</summary>
                                <pre className="error-stack">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallbackMessage: PropTypes.string,
    showReset: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
    fallbackMessage: null,
    showReset: false,
};

export default ErrorBoundary;
