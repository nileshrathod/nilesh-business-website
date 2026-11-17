import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, Loader2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

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
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

export function ContactForm({ defaultService = '' }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    serviceOfInterest: defaultService || siteConfig.services[0]?.title || '',
    projectDetails: '',
    consent: false,
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
      nextErrors.projectDetails = 'Please share a brief overview of your goals (at least 15 characters).';
    }
    if (!values.consent) {
      nextErrors.consent = 'Please confirm that you understand how this prototype handles your inquiry.';
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
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      return;
    }

    setStatus('submitting');
    setSubmissionError('');

    try {
      if (siteConfig.contact.formEndpoint) {
        const response = await fetch(siteConfig.contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: values.fullName.trim(),
            businessEmail: values.businessEmail.trim(),
            companyName: values.companyName.trim(),
            serviceOfInterest: values.serviceOfInterest,
            projectDetails: values.projectDetails.trim(),
          }),
        });
        if (!response.ok) {
          throw new Error('Unable to deliver inquiry to the configured endpoint.');
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 350));
      }

      setSubmittedReference(values.serviceOfInterest);
      setStatus('success');
      setValues({
        fullName: '',
        businessEmail: '',
        companyName: '',
        serviceOfInterest: siteConfig.services[0]?.title || '',
        projectDetails: '',
        consent: false,
      });
    } catch {
      setStatus('error');
      setSubmissionError(
        'Submission could not be completed. Please try again or reach out directly by phone.'
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
              {siteConfig.contact.formEndpoint
                ? 'Inquiry Submitted'
                : 'Prototype Form Validation Complete (Demo Mode)'}
            </h3>
            <p className="text-sm leading-relaxed text-[#031634]/80 dark:text-zinc-300">
              {siteConfig.contact.formEndpoint
                ? `Thank you for your inquiry regarding ${submittedReference}. Your message has been sent.`
                : `Your form input for "${submittedReference}" passed validation. Because this website is currently running in prototype mode without a connected email service, no email was transmitted and no personal information was saved in browser storage.`}
            </p>
            {!siteConfig.contact.formEndpoint && (
              <p className="text-xs leading-relaxed text-[#031634]/70 dark:text-zinc-400">
                To connect a live backend later, add an endpoint URL in{' '}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[#031634] dark:bg-black dark:text-zinc-200">
                  siteConfig.contact.formEndpoint
                </code>{' '}
                or email{' '}
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
            )}
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
      {!siteConfig.contact.formEndpoint && (
        <div className="flex items-start gap-3 rounded-xl border border-[#031634]/10 bg-[#F3F3FF] p-4 text-xs leading-relaxed text-[#031634]/80 dark:border-white/10 dark:bg-black dark:text-zinc-300">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#00876A] dark:text-[#00CBA0]" aria-hidden="true" />
          <p>
            <span className="font-semibold text-[#031634] dark:text-white">
              Prototype Demo Notice:
            </span>{' '}
            This form demonstrates full validation and submission states without storing personal data in browser storage or sending live emails. Connect an API endpoint in{' '}
            <code className="font-mono">siteConfig.ts</code> when deploying to production.
          </p>
        </div>
      )}

      {status === 'error' && submissionError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{submissionError}</span>
        </div>
      )}

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
            <p id="error-fullName" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
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
            <p id="error-businessEmail" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
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
            Company name <span className="text-xs font-normal text-[#031634]/55 dark:text-zinc-500">(optional)</span>
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
            <p id="error-service" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
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
          <p id="error-projectDetails" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
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
            I acknowledge that this prototype form validates inquiries locally without storing personal information in browser storage.
          </label>
        </div>
        {errors.consent && (
          <p id="error-consent" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{errors.consent}</span>
          </p>
        )}
      </div>

      <div className="pt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#00CBA0] px-6 py-2.5 text-sm font-semibold text-[#031634] transition-colors duration-150 hover:bg-[#00B58E] disabled:cursor-not-allowed disabled:opacity-70 dark:text-black dark:hover:bg-[#19DDB3]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Validating Inquiry...</span>
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
