import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AcademicErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Academic module error caught:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] flex items-center justify-center p-4">
          <div className="folio-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-[#FAF7F2] border-2 border-deckle shadow-book-md text-center space-y-4 max-w-lg w-full animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center mx-auto shadow-2xs">
              <AlertTriangle className="w-6 h-6 text-amber-700" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-claret font-bold">
                Scholarly Session Notice
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                {this.props.fallbackTitle || 'Section Temporarily Interrupted'}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed font-reading max-w-md mx-auto">
                An unexpected condition was caught in this section. Your underlying session credentials and purchases remain completely secure.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-claret hover:bg-claret-light text-white text-xs font-mono font-medium shadow-xs transition-all inline-flex items-center gap-2 min-h-[42px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recover Section</span>
              </button>

              <button
                type="button"
                onClick={() => window.location.href = '/'}
                className="px-4 py-2.5 rounded-xl bg-white border border-deckle text-ink-muted hover:text-ink text-xs font-mono font-medium transition-all inline-flex items-center gap-1.5 min-h-[42px]"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Foyer</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
