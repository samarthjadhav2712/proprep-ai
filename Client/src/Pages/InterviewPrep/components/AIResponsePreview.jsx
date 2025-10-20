import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// --- Self-contained SVG Icons (replaces react-icons) ---
const CopyIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);
const CheckIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);
const CodeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

const AIResponsePreview = ({ content }) => {
    if (!content) return null;

    return (
        <div className='text-[17px] prose prose-slate max-w-none prose-p:leading-relaxed prose-headings:font-semibold'>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const language = match ? match[1] : "";
                        return match ? (
                            <CodeBlock code={String(children).replace(/\n$/, '')} language={language} />
                        ) : (
                            <code className="px-1.5 py-0.5 bg-gray-100 rounded text-[13px] font-mono" {...props}>{children}</code>
                        );
                    },
                    // FIX: Corrected `ref` to `href` in anchor tag
                    a({ children, href }) {
                        return <a href={href} className='text-blue-600 hover:underline' target="_blank" rel="noopener noreferrer">{children}</a>
                    },
                    // FIX: `td` was incorrectly rendering a `thead` tag
                    td({children}) {
                        return <td className='px-3 py-2 whitespace-nowrap text-sm'>{children}</td>
                    },
                    // FIX: `table` was rendering `className` instead of `children`
                    table({children}) {
                        return (
                            <div className='overflow-x-auto my-4 border border-gray-200 rounded-lg'>
                                <table className='min-w-full divide-y divide-gray-200'>{children}</table>
                            </div>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

function CodeBlock({ code, language }) {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        // FIX: Increased timeout for better UX
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className='relative my-4 rounded-lg bg-gray-50 border border-gray-200 text-sm'>
            <div className='flex items-center justify-between px-4 py-1.5 bg-gray-100 border-b border-gray-200'>
                <div className='flex items-center gap-2'>
                    <CodeIcon className='text-gray-500' />
                    <span className='text-xs font-semibold text-gray-600 uppercase'>{language || 'Code'}</span>
                </div>
                <button onClick={copyCode} className='text-gray-500 hover:text-gray-800' aria-label="Copy Code">
                    {copied ? <CheckIcon className="text-green-600" /> : <CopyIcon />}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={oneLight}
                customStyle={{ fontSize: '13px', margin: 0, padding: '1rem', backgroundColor: 'transparent' }}
                wrapLines={true}
                wrapLongLines={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

export default AIResponsePreview;