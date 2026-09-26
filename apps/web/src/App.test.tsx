import { render } from 'vitest-browser-react';

import App from './App.tsx';

it('renders the app', async () => {
    const page = await render(<App />);

    await expect
        .element(
            page.getByRole('heading', {
                level: 1,
                name: 'Hello world',
            })
        )
        .toBeInTheDocument();
});
