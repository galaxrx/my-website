// app/components/ui/ResultPane.tsx
'use client';

import { useState } from 'react';
import { AIResponse } from '../../types/ai';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, BarChart, Table, FileDown, MessageSquare } from 'lucide-react';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import Papa from 'papaparse';

type ResultPaneProps = {
  status: 'idle' | 'loading' | 'ok' | 'error';
  data: AIResponse | null;
  error: string | null;
};

type View = 'summary' | 'table' | 'chart' | 'export';

// --- Helper Components for Rendering Specific Data ---

const DataCard = ({ label, value }: { label: string, value: string | number }) => (
    <div className="rounded-lg bg-slate-800 p-4">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
);

const renderSummary = (data: AIResponse) => {
    switch (data.task) {
        case 'analyzeBusiness':
            return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DataCard label="Revenue" value={`$${data.kpis.revenue.toLocaleString()}`} />
                    <DataCard label="Gross Margin" value={`${data.kpis.gross_margin_pct}%`} />
                    <DataCard label="Stock Turns" value={data.kpis.stock_turns.toFixed(1)} />
                    <DataCard label="Service Level" value={`${data.kpis.service_level_pct}%`} />
                </div>
            );
        case 'askAssistant':
            return <p className="text-slate-300 leading-relaxed">{data.answer}</p>
        default:
            return <p className="text-slate-400">This view provides a high-level summary. Switch to the Table or Chart view for more details.</p>
    }
}

const renderTable = (data: AIResponse) => {
    let headers: string[] = [];
    let rows: any[][] = [];

    switch (data.task) {
        case 'forecastDemand':
            headers = ["ILC", "Store", "Week", "Forecast Qty", "Low CI", "High CI", "Uplift"];
            rows = data.forecast.map(f => [f.ilc, f.store, f.week, f.qty, f.lo, f.hi, `${f.uplift_pct || 0}%`]);
            break;
        case 'optimizeStock':
            headers = ["ILC", "Store", "WOC", "OM", "OP", "ROP", "Safety Stock", "Note"];
            rows = data.recommendations.map(r => [r.ilc, r.store, r.woc, r.om, r.op, r.rop, r.safety_stock, r.note]);
            break;
        case 'planPromotions':
            headers = ["ILC", "Current Price", "Discount", "Suggested Price", "Expected Uplift", "Baseline Units"];
            rows = data.promos.map(p => [
                p.ilc, 
                `$${p.current_price.toFixed(2)}`, 
                `${p.recommended_discount}%`, 
                `$${p.suggested_price.toFixed(2)}`, 
                `+${p.uplift_pct}%`, 
                p.baseline
            ]);
            break;
        // Add other cases here...
        default:
             return <p className="text-slate-400">Table view is not available for this result.</p>
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-700 text-slate-400">
                    <tr>{headers.map(h => <th key={h} className="p-2">{h}</th>)}</tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} className="border-b border-slate-800">
                            {row.map((cell, j) => <td key={j} className="p-2 text-slate-300">{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const renderChart = (data: AIResponse) => {
    if (data.task !== 'forecastDemand') {
        return <p className="text-slate-400">Chart view is only available for forecasts.</p>;
    }
    const chartData = data.forecast.map(f => ({ name: `ILC ${f.ilc}`, qty: f.qty }));
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <RechartsBarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                    <Bar dataKey="qty" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
}

const handleExport = (data: AIResponse | null) => {
    if (!data) return;
    let csvData: any[] = [];
    if ('forecast' in data) csvData = data.forecast;
    if ('recommendations' in data) csvData = data.recommendations;
    if ('promos' in data) csvData = data.promos;
    // ... add other exportable data types

    if (csvData.length > 0) {
        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `${data.task}_export.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}


export default function ResultPane({ status, data, error }: ResultPaneProps) {
  const [view, setView] = useState<View>('summary');

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="space-y-4">
            <div className="w-full h-16 rounded-lg bg-slate-800 animate-pulse"></div>
            <div className="w-full h-48 rounded-lg bg-slate-800 animate-pulse"></div>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="text-center text-red-400">
          <AlertTriangle className="mx-auto h-8 w-8" />
          <p className="mt-2 font-semibold">An Error Occurred</p>
          <p className="text-sm text-red-300">{error}</p>
        </div>
      );
    }

    if (status === 'ok' && data) {
      return (
        <div>
          <div className="flex items-center gap-2 border-b border-slate-800 mb-4">
            {(['summary', 'table', 'chart', 'export'] as View[]).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`capitalize p-2 text-sm transition-colors ${view === v ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
              >
                {v}
              </button>
            ))}
          </div>
          <div>
            {view === 'summary' && renderSummary(data)}
            {view === 'table' && renderTable(data)}
            {view === 'chart' && renderChart(data)}
            {view === 'export' && (
                <div className="text-center">
                    <button onClick={() => handleExport(data)} className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400 hover:bg-cyan-500/20">
                        <FileDown className="h-4 w-4" />
                        Download CSV
                    </button>
                </div>
            )}
          </div>
        </div>
      );
    }
    
    return null; // Idle state
  };

  return (
    <AnimatePresence>
      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-lg"
        >
          {renderContent()}
        </motion.div>
      )}
    </AnimatePresence>
  );
}