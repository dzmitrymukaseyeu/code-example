import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';

import AreatroutModal from './modal';
import Mock from './mock';

const header = 'Test';

beforeEach(() => {
  const Wrapper = () => {
    const [open, setOpen] = useState<boolean>(true);
    return (
      <>
        <button type="button" aria-label="openModal" onClick={() => setOpen(true)} />
        <button type="button" aria-label="testModal" />
        <AreatroutModal
          header={header}
          className="myClass"
          open={open}
          setOpen={setOpen}
        >
          <Mock />
        </AreatroutModal>
      </>
    );
  };
  render(<Wrapper />);
});

test('open modal window and test empty button', async () => {
  const buttonClose = screen.getByRole('button', {
    name: /close/i,
  });
  fireEvent.click(buttonClose);

  expect(screen.getByText(header)).not.toBeVisible();
  const buttonOpen = screen.getByLabelText('openModal');
  fireEvent.click(buttonOpen);

  expect(screen.getByText(header)).toBeVisible();
  const buttonTestModal = screen.getByLabelText('testModal');
  fireEvent.click(buttonTestModal);

  expect(screen.getByText(header)).toBeVisible();
});

test('modal window children close button', async () => {
  expect(screen.getByText(header)).toBeVisible();
  fireEvent.click(screen.getByLabelText('close'));

  expect(screen.getByText(header)).not.toBeVisible();
});

test('modal window children save button', () => {
  expect(screen.getByTestId('false-element')).toBeInTheDocument();
  const button = screen.getByText(/Сохранить/i);
  fireEvent.click(button);

  expect(screen.getByTestId('true-element')).toBeInTheDocument();
});

test('modal window close icon', () => {
  const button = screen.getByRole('button', {
    name: /close/i,
  });
  fireEvent.click(button);

  expect(screen.queryByText(header)).not.toBeVisible();
});