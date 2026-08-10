import { getPilotApiUrl } from '../lib/pilot-api';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

function setStatus(root: HTMLElement, status: FormStatus) {
  root.dataset.pilotStatus = status;
}

function getFormData(form: HTMLFormElement) {
  return {
    name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
    email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
    centerName: (form.elements.namedItem('centerName') as HTMLInputElement).value.trim(),
    location: (form.elements.namedItem('location') as HTMLInputElement).value.trim(),
    classrooms: (form.elements.namedItem('classrooms') as HTMLSelectElement).value.trim(),
    message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
  };
}

export function initPilotForm() {
    const root = document.querySelector<HTMLElement>('[data-pilot-form]');
    if (!root) return;

    const form = root.querySelector<HTMLFormElement>('form');
    const errorEl = root.querySelector<HTMLElement>('[data-pilot-error]');
    const submitBtn = root.querySelector<HTMLButtonElement>('[data-pilot-submit]');
    if (!form || !submitBtn) return;

    const apiUrl = root.dataset.apiUrl || getPilotApiUrl();
    const fallbackError = root.dataset.errorGeneric || 'Something went wrong.';
    const requestFailed = root.dataset.errorFailed || 'Request failed';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (root.dataset.pilotStatus === 'loading') return;

    setStatus(root, 'loading');
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = '';
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getFormData(form)),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || requestFailed);
      }

      form.reset();
      setStatus(root, 'success');
    } catch (error) {
      setStatus(root, 'error');
      if (errorEl) {
        const message = error instanceof Error ? error.message : fallbackError;
        errorEl.textContent = message;
        errorEl.hidden = false;
      }
    }
  });

  root.querySelector<HTMLButtonElement>('[data-pilot-reset]')?.addEventListener('click', () => {
    setStatus(root, 'idle');
    if (errorEl) errorEl.hidden = true;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPilotForm);
} else {
  initPilotForm();
}

document.addEventListener('astro:page-load', initPilotForm);
