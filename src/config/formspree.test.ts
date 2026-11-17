import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  DEFAULT_FORMSPREE_ENDPOINT,
  buildFormspreePayload,
  getConfiguredFormspreeEndpoint,
  resolveFormspreeEndpoint,
  submitFormspreeInquiry,
} from './formspree';

describe('Formspree endpoint validation', () => {
  it('accepts valid HTTPS Formspree URLs and trims whitespace', () => {
    assert.equal(
      resolveFormspreeEndpoint(`  ${DEFAULT_FORMSPREE_ENDPOINT}  `),
      DEFAULT_FORMSPREE_ENDPOINT
    );
  });

  it('rejects empty, placeholder, malformed, and non-HTTPS URLs', () => {
    assert.equal(resolveFormspreeEndpoint(undefined), '');
    assert.equal(resolveFormspreeEndpoint(''), '');
    assert.equal(resolveFormspreeEndpoint('   '), '');
    assert.equal(resolveFormspreeEndpoint('https://formspree.io/f/your_form_id'), '');
    assert.equal(resolveFormspreeEndpoint('https://formspree.io/f/MY_FORMSPREE_ID'), '');
    assert.equal(resolveFormspreeEndpoint('http://formspree.io/f/meaggvpy'), '');
    assert.equal(resolveFormspreeEndpoint('not-a-valid-url'), '');
  });

  it('falls back to the configured default endpoint when env var is unset or blank', () => {
    assert.equal(getConfiguredFormspreeEndpoint(undefined), DEFAULT_FORMSPREE_ENDPOINT);
    assert.equal(getConfiguredFormspreeEndpoint('   '), DEFAULT_FORMSPREE_ENDPOINT);
  });

  it('uses valid env overrides and exposes invalid overrides for setup warning display', () => {
    assert.equal(
      getConfiguredFormspreeEndpoint('https://formspree.io/f/custom123'),
      'https://formspree.io/f/custom123'
    );
    assert.equal(
      getConfiguredFormspreeEndpoint('http://insecure.example.com/f/abc'),
      ''
    );
    assert.equal(
      getConfiguredFormspreeEndpoint('https://formspree.io/f/your_form_id'),
      ''
    );
    assert.equal(getConfiguredFormspreeEndpoint('', ''), '');
  });
});

describe('Formspree inquiry submission', () => {
  it('builds a clean payload and submits successfully on HTTP 200', async () => {
    let capturedUrl = '';
    let capturedInit: RequestInit | undefined;

    const mockFetch: typeof fetch = async (input, init) => {
      capturedUrl = String(input);
      capturedInit = init;
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };

    const fixedDate = new Date('2026-01-15T18:30:00.000Z');
    await submitFormspreeInquiry(
      DEFAULT_FORMSPREE_ENDPOINT,
      {
        companyBrandName: 'AASTRA Digital',
        fullName: '  Jordan Taylor  ',
        businessEmail: ' jordan@example.com ',
        companyName: '',
        serviceOfInterest: 'AI Integration and Intelligent Automation',
        projectDetails: 'Looking to automate document intake workflows.',
        honeypot: '',
        submittedAt: fixedDate,
      },
      mockFetch
    );

    assert.equal(capturedUrl, DEFAULT_FORMSPREE_ENDPOINT);
    assert.equal(capturedInit?.method, 'POST');
    const parsedBody = JSON.parse(String(capturedInit?.body));
    assert.equal(parsedBody._subject, 'New Website Inquiry - AASTRA Digital');
    assert.equal(parsedBody._replyto, 'jordan@example.com');
    assert.equal(parsedBody.name, 'Jordan Taylor');
    assert.equal(parsedBody.email, 'jordan@example.com');
    assert.equal(parsedBody.company, 'Not provided');
    assert.equal(parsedBody.submittedAt, fixedDate.toISOString());
    assert.equal(parsedBody.consentConfirmed, 'Yes');
  });

  it('throws descriptive API errors when Formspree returns a non-OK response', async () => {
    const mockFetch: typeof fetch = async () =>
      new Response(
        JSON.stringify({
          error: 'Validation failed',
          errors: [{ message: 'Email address is invalid.' }],
        }),
        {
          status: 422,
          headers: { 'Content-Type': 'application/json' },
        }
      );

    await assert.rejects(
      () =>
        submitFormspreeInquiry(
          DEFAULT_FORMSPREE_ENDPOINT,
          {
            companyBrandName: 'AASTRA Digital',
            fullName: 'Jordan Taylor',
            businessEmail: 'bad-email',
            serviceOfInterest: 'Custom Application Development',
            projectDetails: 'Automate internal approvals and reporting.',
          },
          mockFetch
        ),
      /Email address is invalid\./
    );
  });

  it('rejects invalid endpoints before sending any network request', async () => {
    let called = false;
    const mockFetch: typeof fetch = async () => {
      called = true;
      return new Response('{}', { status: 200 });
    };

    await assert.rejects(
      () =>
        submitFormspreeInquiry(
          '',
          {
            companyBrandName: 'AASTRA Digital',
            fullName: 'Jordan Taylor',
            businessEmail: 'jordan@example.com',
            serviceOfInterest: 'Custom Application Development',
            projectDetails: 'Automate internal approvals and reporting.',
          },
          mockFetch
        ),
      /missing or invalid/
    );
    assert.equal(called, false);
  });

  it('formats payload fields cleanly via buildFormspreePayload', () => {
    const payload = buildFormspreePayload({
      companyBrandName: 'AASTRA Digital',
      fullName: 'Alex Morgan',
      businessEmail: 'alex@company.com',
      companyName: 'Northwind Logistics',
      serviceOfInterest: 'Power Platform and Workflow Automation',
      projectDetails: 'Need approval automation in Microsoft 365.',
      honeypot: '',
    });
    assert.equal(payload.company, 'Northwind Logistics');
    assert.equal(payload._replyto, 'alex@company.com');
    assert.ok(payload.submittedAt.length > 0);
    assert.ok(payload.submittedAtLocal.length > 0);
  });
});
