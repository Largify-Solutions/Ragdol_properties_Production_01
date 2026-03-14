'use client'

import { useState } from 'react'
import { XMarkIcon, DocumentTextIcon, CheckCircleIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

interface Document {
  name: string
  url: string
}

interface DocumentDownloadModalProps {
  isOpen: boolean
  onClose: () => void
  documents: Document[]
  propertyTitle: string
  downloadType: 'floor_plan' | 'brochure'
  userEmail: string
}

export default function DocumentDownloadModal({
  isOpen,
  onClose,
  documents,
  propertyTitle,
  downloadType,
  userEmail
}: DocumentDownloadModalProps) {
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set())

  const handleDownload = (url: string, name: string) => {
    try {
      // Open document in new tab
      window.open(url, '_blank', 'noopener,noreferrer')
      
      // Track downloaded item
      setDownloadedItems(prev => new Set(prev).add(url))
    } catch (error) {
      console.error('Error downloading document:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[2.5rem] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 rounded-t-[2.5rem]">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  {downloadType === 'floor_plan' ? 'Floor Plan Request Received!' : 'Brochure Request Received!'}
                </h2>
              </div>
              <p className="text-slate-600">{propertyTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Confirmation Message */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
            <h3 className="font-bold text-green-900 mb-2">✓ Request Submitted Successfully</h3>
            <p className="text-green-700 text-sm">
              Thank you! Your download request has been received. Our agents will contact you shortly at <span className="font-bold">{userEmail}</span>
            </p>
          </div>

          {/* Available Documents */}
          {documents && documents.length > 0 ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <DocumentTextIcon className="w-5 h-5 text-primary" />
                  Available Documents
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  You can download these documents immediately:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, index) => {
                  const isDownloaded = downloadedItems.has(doc.url)
                  return (
                    <button
                      key={index}
                      onClick={() => handleDownload(doc.url, doc.name)}
                      className={`group p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                        isDownloaded
                          ? 'bg-green-50 border-green-300 hover:border-green-400'
                          : 'bg-slate-50 border-slate-200 hover:bg-primary hover:border-primary hover:text-white'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          isDownloaded
                            ? 'bg-green-200'
                            : 'bg-primary/10 group-hover:bg-white/20'
                        }`}>
                          {isDownloaded ? (
                            <CheckCircleIcon className={`w-6 h-6 ${isDownloaded ? 'text-green-600' : 'text-primary group-hover:text-white'}`} />
                          ) : (
                            <ArrowDownIcon className="w-6 h-6 text-primary group-hover:text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-sm truncate ${
                            isDownloaded
                              ? 'text-green-900'
                              : 'text-slate-900 group-hover:text-white'
                          }`}>
                            {doc.name}
                          </h4>
                          <p className={`text-xs mt-1 ${
                            isDownloaded
                              ? 'text-green-700'
                              : 'text-slate-600 group-hover:text-white/80'
                          }`}>
                            {isDownloaded ? '✓ Downloaded' : 'Click to download'}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
              <DocumentTextIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-medium">
                Documents will be available soon
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Our agents will send you the requested materials
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
            <h4 className="font-bold text-slate-900">What's Next?</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-700">Our agents will review your inquiry and contact you shortly</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-700">You'll receive additional information and property details via email</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-700">Schedule a viewing or ask questions directly with our team</span>
              </li>
            </ul>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full btn-primary py-4 text-lg font-bold rounded-2xl"
          >
            Got It! Continue Browsing
          </button>
        </div>
      </div>
    </div>
  )
}
