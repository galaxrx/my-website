// app/components/AIPlayground.tsx
'use client';

import CommandBar from '@/app/components/ui/CommandBar';    // CORRECTED PATH
import ResultPane from '@/app/components/ui/ResultPane';    // CORRECTED PATH
import { useCommandBar } from '@/app/hooks/useCommandBar';  // CORRECTED PATH

export default function AIPlayground() {
  const {
    query,
    setQuery,
    status,
    result,
    error,
    handleSubmit,
    inputRef,
  } = useCommandBar();

  return (
    <div className="py-8 px-4">
      <CommandBar
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        inputRef={inputRef}
      />
      <div className="mt-8">
        <ResultPane status={status} data={result} error={error} />
      </div>
    </div>
  );
}