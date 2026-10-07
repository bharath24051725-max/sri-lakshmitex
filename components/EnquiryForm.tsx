'use client';

import React, { useState } from 'react';
import { EnquiryFormData } from '@/types/product';
import { submitEnquiry } from '@/lib/supabase';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface EnquiryFormProps {
  initialProduct?: string;
}

function resolveInitialProduct(productName?: string): string {
  if (!productName) return 'General Enquiry';
  if (productName.includes('Shimmer')) return 'Shimmer Ankle Leggings';
  if (productName.includes('Legging')) return 'Lycra Anklefit Leggings';
  if (productName.includes('Palazzo')) return 'Palazzo Pants with Pockets & Rope';
  if (productName.includes('Patiala')) return 'Patiala Pant with Rope';
  if (productName.includes('Pajama') || productName.includes('Pyjama')) return 'Ladies Pyjama Set';
  if (productName.includes('Kids') || productName.includes('Coord')) return 'Kids Coord Set';
  return 'General Enquiry';
}

export default function EnquiryForm({ initialProduct }: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    companyName: '',
    phoneNumber: '',
    email: '',
    productInterestedIn: resolveInitialProduct(initialProduct),
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Please provide your contact phone number.';
    } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number (digits and standard symbols).';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.productInterestedIn) {
      newErrors.productInterestedIn = 'Please select a product of interest.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message or enquiry requirements.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await submitEnquiry(formData);
      if (result.success) {
        setSubmitStatus('success');
        setFeedbackMessage(result.message);
        // Reset form
        setFormData({
          name: '',
          companyName: '',
          phoneNumber: '',
          email: '',
          productInterestedIn: 'General Enquiry',
          message: '',
        });
        setErrors({});
      } else {
        setSubmitStatus('error');
        setFeedbackMessage('Unable to send enquiry at this moment. Please try calling or messaging via WhatsApp.');
      }
    } catch {
      setSubmitStatus('error');
      setFeedbackMessage('A network issue occurred. Please reach out to us directly via WhatsApp or phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
        Send Business Enquiry
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Fill out the details below. Our sales team will get back to you promptly with product specs and quotation.
      </p>

      {/* Success Banner */}
      {submitStatus === 'success' && (
        <div
          className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-md flex items-start gap-3 text-emerald-800"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold">Enquiry Sent Successfully</h4>
            <p className="text-xs text-emerald-700 mt-1">{feedbackMessage}</p>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {submitStatus === 'error' && (
        <div
          className="mt-6 p-4 bg-rose-50 border border-rose-200 rounded-md flex items-start gap-3 text-rose-800"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold">Submission Notice</h4>
            <p className="text-xs text-rose-700 mt-1">{feedbackMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {/* Name and Company Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="enquiry-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Your Name <span className="text-rose-600">*</span>
            </label>
            <input
              id="enquiry-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 ${
                errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900'
              }`}
              placeholder="e.g. Ramesh Kumar"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-rose-600">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="enquiry-company" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Company / Shop Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="enquiry-company"
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
              placeholder="e.g. Sri Textiles & Garments"
            />
          </div>
        </div>

        {/* Phone and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Phone Number <span className="text-rose-600">*</span>
            </label>
            <input
              id="enquiry-phone"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 ${
                errors.phoneNumber ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900'
              }`}
              placeholder="e.g. +91 98765 43210"
              aria-invalid={!!errors.phoneNumber}
              aria-describedby={errors.phoneNumber ? 'phone-error' : undefined}
            />
            {errors.phoneNumber && (
              <p id="phone-error" className="mt-1 text-xs text-rose-600">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="enquiry-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              id="enquiry-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 ${
                errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900'
              }`}
              placeholder="e.g. name@company.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-rose-600">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Product Selection Dropdown */}
        <div>
          <label htmlFor="enquiry-product" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Product Interested In <span className="text-rose-600">*</span>
          </label>
          <select
            id="enquiry-product"
            value={formData.productInterestedIn}
            onChange={(e) =>
              setFormData({
                ...formData,
                productInterestedIn: e.target.value as EnquiryFormData['productInterestedIn'],
              })
            }
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
          >
            <option value="Lycra Anklefit Leggings">Lycra Anklefit Leggings</option>
            <option value="Palazzo Pants with Pockets & Rope">Palazzo Pants with Pockets & Rope</option>
            <option value="Patiala Pant with Rope">Patiala Pant with Rope</option>
            <option value="Shimmer Ankle Leggings">Shimmer Ankle Leggings</option>
            <option value="Ladies Pyjama Set">Ladies Pyjama Set</option>
            <option value="Kids Coord Set">Kids Coord Set</option>
            <option value="General Enquiry">General Enquiry / Multiple Products</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="enquiry-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Enquiry Message <span className="text-rose-600">*</span>
          </label>
          <textarea
            id="enquiry-message"
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 ${
              errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:ring-slate-900 focus:border-slate-900'
            }`}
            placeholder="Please mention your approximate required quantity, colors, or destination city for wholesale shipment..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-rose-600">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 disabled:opacity-70 transition-colors shadow-xs"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Enquiry...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Product Enquiry
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
