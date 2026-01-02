'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-8">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong!</h1>
                            <p className="text-slate-600 mb-6">
                                An unexpected error occurred. Please try again.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
                            >
                                Reload Page
                            </button>
                            <button
                                onClick={reset}
                                className="w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium py-3 px-6 rounded-xl transition-colors duration-200"
                            >
                                Retry Action
                            </button>
                        </div>
                        <details className="text-xs text-slate-500 p-3 bg-slate-50 rounded-xl">
                            <summary>Debug info</summary>
                            <pre className="mt-2 p-2 bg-slate-100 rounded text-slate-900 text-xs overflow-auto">
                                {error.digest ?? error.message ?? 'Unknown error'}
                            </pre>
                        </details>
                    </div>
                </div>
            </body>
        </html>
    );
}
