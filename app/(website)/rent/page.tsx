'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function RentRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Build the new URL with all existing params
    const params = new URLSearchParams(searchParams.toString());
    
    // Set action to rent for rental properties
    params.set('action', 'rent');
    
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

export default function RentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <RentRedirectContent />
    </Suspense>
  );
}
