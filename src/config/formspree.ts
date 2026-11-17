export const DEFAULT_FORMSPREE_ENDPOINT = 'https://formspree.io/f/meaggvpy';

export interface FormspreeErrorPayload {
  error?: string;
  errors?: Array<{ message?: string }>;
}

export interface ContactInquiryInput {
  companyBrandName: string;
  fullName: string;
  businessEmail: string;
  companyName?: string;
  serviceOfInterest: string;
  projectDetails: string;
  honeypot?: string;
  submittedAt?: Date;
}

export interface FormspreeInquiryPayload {
  _subject: string;
  _replyto: string;
  _gotcha: string;
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  submittedAt: string;
  submittedAtLocal: string;
  consentConfirmed: 'Yes';
}

export function resolveFormspreeEndpoint(raw?: string): string {
  const trimmed = raw?.trim() ?? '';
  if (
    !trimmed ||
    trimmed.includes('your_form_id') ||
    trimmed.includes('MY_FORMSPREE')
  ) {
    return '';
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' ? parsed.toString() : '';
  } catch {
    return '';
  }
}

export function getConfiguredFormspreeEndpoint(
  envEndpoint?: string,
  fallbackEndpoint = DEFAULT_FORMSPREE_ENDPOINT
): string {
  const trimmedEnv = envEndpoint?.trim();
  if (trimmedEnv) {
    return resolveFormspreeEndpoint(trimmedEnv);
  }
  return resolveFormspreeEndpoint(fallbackEndpoint);
}

export function buildFormspreePayload(
  input: ContactInquiryInput
): FormspreeInquiryPayload {
  const submittedAt = input.submittedAt ?? new Date();
  const submittedAtLocal = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(submittedAt);

  return {
    _subject: `New Website Inquiry - ${input.companyBrandName}`,
    _replyto: input.businessEmail.trim(),
    _gotcha: input.honeypot ?? '',
    name: input.fullName.trim(),
    email: input.businessEmail.trim(),
    company: input.companyName?.trim() || 'Not provided',
    service: input.serviceOfInterest,
    message: input.projectDetails.trim(),
    submittedAt: submittedAt.toISOString(),
    submittedAtLocal,
    consentConfirmed: 'Yes',
  };
}

export async function submitFormspreeInquiry(
  endpoint: string,
  input: ContactInquiryInput,
  fetchImpl: typeof fetch = fetch
): Promise<void> {
  const validatedEndpoint = resolveFormspreeEndpoint(endpoint);
  if (!validatedEndpoint) {
    throw new Error('Form endpoint is missing or invalid.');
  }

  const payload = buildFormspreePayload(input);
  const response = await fetchImpl(validatedEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as FormspreeErrorPayload | null;

  if (!response.ok) {
    const apiDetail =
      data?.errors
        ?.map((item) => item.message)
        .filter(Boolean)
        .join(' ') || data?.error;

    throw new Error(
      apiDetail || `Form service returned an error (HTTP ${response.status}).`
    );
  }
}
