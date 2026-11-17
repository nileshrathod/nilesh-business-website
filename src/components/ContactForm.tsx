import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, Loader2, Mail } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { submitFormspreeInquiry } from '../config/formspree';

interface ContactFormProps {
  defaultService?: string;
}

interface FormValues {
  fullName: string;
  businessEmail: string;
  companyName: string;
  serviceOfInterest: string;
  projectDetails: string;
  consent: boolean;
  honeypot: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

export function ContactForm({ defaultService = '' }: ContactFormProps) {
  const formEndpoint = siteConfig.contact.formEndpoint;
  const isFormConfigured = Boolean(formEndpoint);

  const [values, setValues] = useState<FormValues>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    serviceOfInterest: defaultService || siteConfig.services[0]?.title || '',
    projectDetails: '',
    consent: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionError, setSubmissionError] = useState<string>('');
  const [submittedReference, setSubmittedReference] = useState<string>('');

  useEffect(() => {
    if (defaultService) {
      setValues((prev) => ({ ...prev, serviceOfInterest: defaultService }));
    }
  }, [defaultService]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.businessEmail.trim() || !emailPattern.test(values.businessEmail.trim())) {
      nextErrors.businessEmail = 'Please provide a valid business email address.';
    }
    if (!values.serviceOfInterest) {
      nextErrors.serviceOfInterest = 'Please select a service of interest.';
    }
    if (!values.projectDetails.trim() || values.projectDetails.trim().length < 15) {
      nextErrors.projectDetails =
        'Please share a brief overview of your goals (at least 15 characters).';
    }
    if (!values.consent) {
      nextErrors.consent =
        'Please confirm your consent so we can respond to your inquiry.';
    }
    return nextErrors;
  };

  const handleChange = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (status === 'error') {
      setStatus('idle');
      setSubmissionError('');
    }
  };

  const buildFallbackMailtoHref = (): string => {
    const subject = encodeURIComponent(
      `New Website Inquiry - ${siteConfig.brand.companyName}`
    );
    const bodyLines = [
      `Name: ${values.fullName.trim() || 'Not provided'}`,
      `Business Email: ${values.businessEmail.trim() || 'Not provided'}`,
      `Company: ${values.companyName.trim() || 'Not provided'}`,
      `Service of Interest: ${values.serviceOfInterest || 'Not specified'}`,
      '',
      'Project Details:',
      values.projectDetails.trim() || 'Not provided',
    ];
    return `mailto:${siteConfig.contact.email}?subject=${subject}&body=${encodeURIComponent(
      bodyLines.join('\n')
    )}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (status === 'submitting') {
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      return;
    }

    if (!isFormConfigured) {
      setStatus('error');
      setSubmissionError(
        'Online form delivery is not configured yet (missing VITE_FORMSPREE_ENDPOINT). No email was sent. Please email us directly or call to complete your inquiry.'
      );
      return;
    }

    // If the hidden honeypot field was populated by an automated bot, decline submission silently.
    if (values.honeypot.trim().length > 0) {
      setStatus('error');
      setSubmissionError(
        'Submission could not be verified. Please contact us directly by email or telephone.'
      );
      return;
    }

    setStatus('submitting');
    setSubmissionError('');

    try {
      await submitFormspreeInquiry(formEndpoint, {
        companyBrandName: siteConfig.brand.companyName,
        fullName: values.fullName,
        businessEmail: values.businessEmail,
        companyName: values.companyName,
        serviceOfInterest: values.serviceOfInterest,
        projectDetails: values.projectDetails,
        honeypot: values.honeypot,
      });

      setSubmittedReference(values.serviceOfInterest);
      setStatus('success');
      setValues({
        fullName: '',
        businessEmail: '',
        companyName: '',
        serviceOfInterest: siteConfig.services[0]?.title || '',
        projectDetails: '',
        consent: false,
        honeypot: '',
      });
    } catch (err) {
      const detail =
        err instanceof Error && err.message
          ? err.message
          : 'Network error while reaching the form service.';
      setStatus('error');
      setSubmissionError(
        `We could not send your inquiry (${detail}). Your entered details have been preserved—please try again, or contact us directly by email or phone.`
      );
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-[#00CBA0]/40 bg-[#00CBA0]/10 p-6 sm:p-8 dark:border-[#00CBA0]/30 dark:bg-[#00CBA0]/10"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 h-6 w-6 shrink-0 text-[#00876A] dark:text-[#00CBA0]"
            aria-hidden="true"
          />
          <div className="space-y-3">
            <h3 className="font-display text-lg font-semibold text-[#031634] dark:text-white">
              Inquiry Sent
            </h3>
            <p className="text-sm leading-relaxed text-[#031634]/80 dark:text-zinc-300">
              Thank you for contacting {siteConfig.brand.companyName}. Your inquiry regarding{' '}
              <span className="font-medium text-[#031634] dark:text-white">
                {submittedReference}
              </span>{' '}
              has been submitted and an email notification has been triggered.
            </p>
            <p className="text-xs leading-relaxed text-[#031634]/70 dark:text-zinc-400">
              Need to add urgent context? Email{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-medium text-[#00876A] underline dark:text-[#00CBA0]"
              >
                {siteConfig.contact.email}
              </a>{' '}
              or call{' '}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-medium text-[#00876A] underline dark:text-[#00CBA0]"
              >
                {siteConfig.contact.phone}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-2 inline-flex items-center rounded-lg border border-[#031634]/15 bg-white px-4 py-2 text-sm font-medium text-[#031634] transition-colors hover:bg-[#F3F3FF] dark:border-white/15 dark:bg-black dark:text-white dark:hover:bg-[#141414]"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {!isFormConfigured && (
        <div className="flex items-start gap-3 rounded-xl border border-[#FFC830]/60 bg-[#FFC830]/15 p-4 text-xs leading-relaxed text-[#031634] dark:border-[#FFC830]/35 dark:bg-[#FFC830]/10 dark:text-zinc-200">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-[#9A7100] dark:text-[#FFC830]"
            aria-hidden="true"
          />
          <div className="space-y-1.5">
            <p>
              <span className="font-semibold">Form Endpoint Setup Required:</span>{' '}
              Set <code className="font-mono">VITE_FORMSPREE_ENDPOINT</code> in your build environment to enable automated Formspree email notifications.
            </p>
            <p>
              Until configured, please send inquiries directly to{' '}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold underline hover:text-[#00876A] dark:hover:text-[#00CBA0]"
              >
                {siteConfig.contact.email}
              </a>{' '}
              or call{' '}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-semibold underline hover:text-[#00876A] dark:hover:text-[#00CBA0]"
              >
                {siteConfig.contact.phone}
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {status === 'error' && submissionError && (
        <div
          role="alert"
          className="space-y-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{submissionError}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 pl-6 text-xs">
            <a
              href={buildFallbackMailtoHref()}
              className="inline-flex items-center gap-1.5 rounded-md border border-red-300 bg-white px-3 py-1.5 font-semibold text-red-900 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-black dark:text-red-200 dark:hover:bg-red-950"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Open in Email App ({siteConfig.contact.email})</span>
            </a>
            <a
              href={siteConfig.contact.phoneHref}
              className="font-semibold underline"
            >
              Call {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      )}

      {/* Formspree honeypot field for automated spam filtering */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website-field">Leave this field empty</label>
        <input
          id="contact-website-field"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(e) => handleChange('honeypot', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-fullName"
            className="block text-sm font-medium text-[#031634] dark:text-zinc-200"
          >
            Full name <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="contact-fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={values.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'error-fullName' : undefined}
            placeholder="Alex Morgan"
            className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#031634] placeholder:text-[#031634]/40 transition-colors bg-white dark:bg-black dark:text-white dark:placeholder:text-zinc-500 ${
              errors.fullName
                ? 'border-red-500 dark:border-red-500'
                : 'border-[#031634]/20 hover:border-[#031634]/40 dark:border-white/15 dark:hover:border-white/30'
            }`}
          />
          {errors.fullName && (
            <p
              id="error-fullName"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-businessEmail"
            className="block text-sm font-medium text-[#031634] dark:text-zinc-200"
          >
            Business email <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <input
            id="contact-businessEmail"
            name="businessEmail"
            type="email"
            autoComplete="email"
            required
            value={values.businessEmail}
            onChange={(e) => handleChange('businessEmail', e.target.value)}
            aria-invalid={Boolean(errors.businessEmail)}
            aria-describedby={errors.businessEmail ? 'error-businessEmail' : undefined}
            placeholder="alex@company.com"
            className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#031634] placeholder:text-[#031634]/40 transition-colors bg-white dark:bg-black dark:text-white dark:placeholder:text-zinc-500 ${
              errors.businessEmail
                ? 'border-red-500 dark:border-red-500'
                : 'border-[#031634]/20 hover:border-[#031634]/40 dark:border-white/15 dark:hover:border-white/30'
            }`}
          />
          {errors.businessEmail && (
            <p
              id="error-businessEmail"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.businessEmail}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-companyName"
            className="block text-sm font-medium text-[#031634] dark:text-zinc-200"
          >
            Company name{' '}
            <span className="text-xs font-normal text-[#031634]/55 dark:text-zinc-500">
              (optional)
            </span>
          </label>
          <input
            id="contact-companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            value={values.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            placeholder="Organization or team name"
            className="mt-1.5 block w-full rounded-lg border border-[#031634]/20 bg-white px-3.5 py-2.5 text-sm text-[#031634] placeholder:text-[#031634]/40 transition-colors hover:border-[#031634]/40 dark:border-white/15 dark:bg-black dark:text-white dark:placeholder:text-zinc-500 dark:hover:border-white/30"
          />
        </div>

        <div>
          <label
            htmlFor="contact-service"
            className="block text-sm font-medium text-[#031634] dark:text-zinc-200"
          >
            Service of interest <span className="text-red-600 dark:text-red-400">*</span>
          </label>
          <select
            id="contact-service"
            name="serviceOfInterest"
            required
            value={values.serviceOfInterest}
            onChange={(e) => handleChange('serviceOfInterest', e.target.value)}
            aria-invalid={Boolean(errors.serviceOfInterest)}
            aria-describedby={errors.serviceOfInterest ? 'error-service' : undefined}
            className={`mt-1.5 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#031634] transition-colors dark:bg-black dark:text-white ${
              errors.serviceOfInterest
                ? 'border-red-500 dark:border-red-500'
                : 'border-[#031634]/20 hover:border-[#031634]/40 dark:border-white/15 dark:hover:border-white/30'
            }`}
          >
            {siteConfig.services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="General Inquiry / Multiple Services">
              General Inquiry / Multiple Services
            </option>
          </select>
          {errors.serviceOfInterest && (
            <p
              id="error-service"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.serviceOfInterest}</span>
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-projectDetails"
          className="block text-sm font-medium text-[#031634] dark:text-zinc-200"
        >
          Project details <span className="text-red-600 dark:text-red-400">*</span>
        </label>
        <textarea
          id="contact-projectDetails"
          name="projectDetails"
          rows={5}
          required
          value={values.projectDetails}
          onChange={(e) => handleChange('projectDetails', e.target.value)}
          aria-invalid={Boolean(errors.projectDetails)}
          aria-describedby={errors.projectDetails ? 'error-projectDetails' : undefined}
          placeholder="Briefly describe the workflow, system, or business challenge you would like to discuss..."
          className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm text-[#031634] placeholder:text-[#031634]/40 transition-colors bg-white dark:bg-black dark:text-white dark:placeholder:text-zinc-500 ${
            errors.projectDetails
              ? 'border-red-500 dark:border-red-500'
              : 'border-[#031634]/20 hover:border-[#031634]/40 dark:border-white/15 dark:hover:border-white/30'
          }`}
        />
        {errors.projectDetails && (
          <p
            id="error-projectDetails"
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.projectDetails}</span>
          </p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => handleChange('consent', e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'error-consent' : 'privacy-note'}
            className="mt-1 h-4 w-4 rounded border-[#031634]/30 text-[#00876A] focus:ring-[#00CBA0] dark:border-white/25 dark:bg-black"
          />
          <label
            htmlFor="contact-consent"
            className="text-xs leading-relaxed text-[#031634]/75 dark:text-zinc-400"
          >
            I consent to {siteConfig.brand.companyName} using the information submitted in this form to respond to my inquiry.
          </label>
        </div>
        {errors.consent && (
          <p
            id="error-consent"
            className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.consent}</span>
          </p>
        )}
      </div>

      <div className="pt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#00CBA0] px-6 py-2.5 text-sm font-semibold text-[#031634] transition-colors duration-150 hover:bg-[#00B58E] disabled:cursor-not-allowed disabled:opacity-70 dark:text-black dark:hover:bg-[#19DDB3]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <span>Submit Inquiry</span>
          )}
        </button>

        <p id="privacy-note" className="text-xs text-[#031634]/60 dark:text-zinc-400">
          No submitted data is retained in browser storage.
        </p>
      </div>
    </form>
  );
}
