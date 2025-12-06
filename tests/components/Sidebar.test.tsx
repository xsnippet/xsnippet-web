import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from '../../src/components/Sidebar';

describe('Sidebar', () => {
  it('should have three items', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(3);
  });

  it('should have correct routes on sidebar items', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/recent');
    expect(links[2]).toHaveAttribute('href', '/about');
  });

  it('should have correct icons on sidebar items', () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const icons = container.querySelectorAll('i');
    expect(icons[0]).toHaveClass('icon-new');
    expect(icons[1]).toHaveClass('icon-recent');
    expect(icons[2]).toHaveClass('icon-about');
  });

  it('should have correct titles on sidebar items', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('title', 'New Snippet');
    expect(links[1]).toHaveAttribute('title', 'Recent Snippets');
    expect(links[2]).toHaveAttribute('title', 'About');
  });
});
