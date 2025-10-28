'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadFile, UploadResult } from '@/lib/storage'

interface FileUploadProps {
  bucket: string
  path?: string
  currentUrl?: string
  onUploadComplete: (url: string) => void
  onUploadError: (error: string) => void
  accept?: string
  maxSize?: number // in MB
  previewSize?: 'sm' | 'md' | 'lg'
  label?: string
}

export default function FileUpload({
  bucket,
  path,
  currentUrl,
  onUploadComplete,
  onUploadError,
  accept = 'image/*',
  maxSize = 5,
  previewSize = 'md',
  label = 'Upload Image'
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-32 h-20'
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      onUploadError(`File size must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    if (accept === 'image/*' && !file.type.startsWith('image/')) {
      onUploadError('Please select an image file')
      return
    }

    setUploading(true)

    try {
      const result: UploadResult = await uploadFile(file, bucket, path)
      
      if (result.success && result.url) {
        setPreview(result.url)
        onUploadComplete(result.url)
      } else {
        onUploadError(result.error || 'Upload failed')
      }
    } catch (error) {
      onUploadError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onUploadComplete('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClick = () => {
    if (!uploading) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-primary mb-2">
        {label}
      </label>
      
      <div className="flex items-center gap-4">
        {/* Preview */}
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className={`${sizeClasses[previewSize]} rounded-lg object-cover border border-gray-300`}
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              disabled={uploading}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className={`${sizeClasses[previewSize]} border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50`}>
            <Upload className="w-6 h-6 text-gray-400" />
          </div>
        )}

        {/* Upload Button */}
        <div className="flex flex-col gap-2">
          <motion.button
            onClick={handleClick}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-light rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50"
            whileHover={{ scale: uploading ? 1 : 1.05 }}
            whileTap={{ scale: uploading ? 1 : 0.95 }}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                {preview ? 'Change Image' : 'Upload Image'}
              </>
            )}
          </motion.button>
          
          <p className="text-xs text-gray-500">
            Max size: {maxSize}MB
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}

