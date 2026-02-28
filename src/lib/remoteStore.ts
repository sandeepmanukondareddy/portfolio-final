type RemoteGetResponse = {
  ok: boolean;
  value?: any;
  updated_at?: string;
  error?: string;
};

const GET_ENDPOINT = '/.netlify/functions/get';
const SAVE_ENDPOINT = '/.netlify/functions/save';

export async function getRemotePortfolio(): Promise<RemoteGetResponse> {
  try {
    const res = await fetch(GET_ENDPOINT, { method: 'GET' });
    const json = (await res.json()) as RemoteGetResponse;
    return json;
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) };
  }
}

export async function saveRemotePortfolio(value: any): Promise<RemoteGetResponse> {
  try {
    const res = await fetch(SAVE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'portfolio', value }),
    });
    const json = (await res.json()) as RemoteGetResponse;
    return json;
  } catch (e: any) {
    return { ok: false, error: e?.message || String(e) };
  }
}
