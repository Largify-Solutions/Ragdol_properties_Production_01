'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SaleRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Build the new URL with all existing params
    const params = new URLSearchParams(searchParams.toString());
    
    // Ensure action is set to buy for properties for sale
    if (!params.has('action') || params.get('action') === 'buy') {
      params.set('action', 'buy');
    }
    
    // Redirect to unified properties page
    router.replace(`/properties?${params.toString()}`);
  }, [router, searchParams]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to properties...</p>
      </div>
    </div>
  );
}

export default function SalePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SaleRedirectContent />
    </Suspense>
  );
}
