'use client';
/**
 * components/CallLogsTable.jsx
 * Admin table showing VAPI call history — data from /api/call-logs
 * Usage: <CallLogsTable /> or <CallLogsTable contactId="ghl-contact-id" />
 */

import { useState, useEffect } from 'react';

const STATUS_COLORS = {
    ended: 'bg-green-100 text-green-700',
    missed: 'bg-red-100 text-red-700',
    busy: 'bg-yellow-100 text-yellow-700',
    default: 'bg-gray-100 text-gray-600',
};

const REASON_LABELS = {
    'customer-ended-call': '✅ Completed',
    'customer-did-not-answer': '📵 No Answer',
    'voicemail': '📬 Voicemail',
    'assistant-ended-call': '✅ Completed',
    'exceeded-max-duration': '⏱ Timeout',
};

function formatDuration(s) {
    if (!s) return '—';
    const m = Math.floor(s / 60);
    return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
}

function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('en-PH', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function CallLogsTable({ contactId = null }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const url = contactId ? `/api/call-logs?contactId=${contactId}` : '/api/call-logs';
                const res = await fetch(url);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                setLogs(data.logs || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [contactId]);

    if (loading) return <div className="py-12 text-center text-gray-400 text-sm">Loading call logs...</div>;
    if (error) return <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">Failed to load: {error}</div>;
    if (!logs.length) return <div className="py-12 text-center text-gray-400 text-sm">No call logs yet.</div>;

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        {['Date', 'Duration', 'Outcome', 'Summary', 'Recording', 'Transcript'].map(h => (
                            <th key={h} className="px-4 py-3 font-semibold text-gray-600">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {logs.map(log => {
                        const isExpanded = expanded === log.callId;
                        const statusColor = STATUS_COLORS[log.status] || STATUS_COLORS.default;
                        return (
                            <>
                                <tr key={log.callId} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">{formatDate(log.startedAt)}</td>
                                    <td className="px-4 py-3 text-gray-700">{formatDuration(log.duration)}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
                                            {REASON_LABELS[log.endedReason] || log.endedReason || '—'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{log.summary || '—'}</td>
                                    <td className="px-4 py-3">
                                        {log.recordingUrl
                                            ? <a href={log.recordingUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">🎙 Play</a>
                                            : <span className="text-gray-300 text-xs">—</span>}
                                    </td>
                                    <td className="px-4 py-3">
                                        {log.transcript
                                            ? <button onClick={() => setExpanded(isExpanded ? null : log.callId)} className="text-blue-600 hover:underline text-xs">{isExpanded ? 'Hide ▲' : 'View ▼'}</button>
                                            : <span className="text-gray-300 text-xs">—</span>}
                                    </td>
                                </tr>
                                {isExpanded && (
                                    <tr key={`${log.callId}-t`} className="bg-gray-50">
                                        <td colSpan={6} className="px-6 py-4">
                                            <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Full Transcript</div>
                                            <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono bg-white border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                                                {log.transcript}
                                            </pre>
                                        </td>
                                    </tr>
                                )}
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
