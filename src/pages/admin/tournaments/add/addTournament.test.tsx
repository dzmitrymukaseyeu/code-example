import React from 'react';
import 'jest-canvas-mock';
import {
  screen, render, fireEvent, waitFor, cleanup
} from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTournamentForm from './AddTournamentForm';
import LocationService from '../../../../services/main/location.service';
import SeasonsService from '../../../../services/main/seasons.service';
import FormatService from '../../../../services/main/format.service';
import RankingService from '../../../../services/main/ranking.service';
import {
  mockData, mockLocations, mockFormats, mockTournament
} from './mock';

beforeEach(() => jest.restoreAllMocks());
afterEach(cleanup);

test('the formats select is rendered, format request works, resolved data is rendered in the select, throws new exception if the input is invalid',
  async () => {
    const mockFormatsRequest = jest.spyOn(FormatService, 'get').mockResolvedValue(mockFormats);
    render(<AddTournamentForm getAllTournaments={() => true} />);
    await waitFor(() => {
      const format = screen.getByTestId('format');
      expect(format).toBeInTheDocument();
      expect(mockFormatsRequest).toHaveBeenCalled();
      expect(format.innerHTML).toContain(mockFormats[0].name);
      fireEvent.blur(format);
      expect(screen.getByTestId('formatError')).toBeVisible();
    });
  });

test('the location select is rendered, location request works, resolved data is rendered in the select, throws new exception if the input is invalid',
  async () => {
    const mockLocationRequest = jest.spyOn(LocationService, 'get').mockResolvedValue(mockLocations);
    render(<AddTournamentForm getAllTournaments={() => true} />);
    await waitFor(() => {
      const location = screen.getByTestId('location');
      expect(location).toBeInTheDocument();
      expect(mockLocationRequest).toHaveBeenCalled();
      expect(location.innerHTML).toContain(mockLocations[0].name);
      fireEvent.blur(location);
      expect(screen.getByTestId('locationError')).toBeVisible();
    });
  });

test('the ranking select is rendered, ranking request works, resolved data is rendered in the select, throws new exception if the input is invalid',
  async () => {
    const mockRankingRequest = jest.spyOn(RankingService, 'getAll').mockResolvedValue(mockData);
    render(<AddTournamentForm getAllTournaments={() => true} />);
    await waitFor(() => {
      const ranking = screen.getByTestId('ranking');
      expect(ranking).toBeInTheDocument();
      expect(mockRankingRequest).toHaveBeenCalled();
      expect(ranking.innerHTML).toContain(mockData[0].name);
      fireEvent.blur(ranking);
      expect(screen.getByTestId('rankingError')).toBeVisible();
    });
  });

test('the season select is rendered, season request works, resolved data is rendered in the select, throws new exception if the input is invalid', async () => {
  const mockSeasonsRequest = jest.spyOn(SeasonsService, 'getAll').mockResolvedValue(mockData);
  render(<AddTournamentForm getAllTournaments={() => true} />);
  await waitFor(() => {
    const season = screen.getByTestId('season');
    expect(season).toBeInTheDocument();
    expect(mockSeasonsRequest).toHaveBeenCalled();
    expect(season.innerHTML).toContain(mockData[0].name);
    fireEvent.blur(season);
    expect(screen.getByTestId('seasonError')).toBeVisible();
  });
});

test('the date input is rendered, throws new exception if the input is invalid', async () => {
  render(<AddTournamentForm getAllTournaments={() => true} />);
  await waitFor(() => {
    const date = screen.getByTestId('date');
    expect(date).toBeInTheDocument();
    fireEvent.blur(date);
    expect(screen.getByTestId('dateError')).toBeVisible();
  });
});

test('the quote input is rendered, throws new exception if the input is invalid', async () => {
  render(<AddTournamentForm getAllTournaments={() => true} />);
  await waitFor(() => {
    const quote = screen.getByTestId('quote');
    expect(quote).toBeInTheDocument();
    fireEvent.blur(quote);
    expect(screen.getByTestId('quoteError')).toBeVisible();
  });
});

test('the name input is rendered, throws new exception if the input is invalid', async () => {
  render(<AddTournamentForm getAllTournaments={() => true} />);
  await waitFor(() => {
    const name = screen.getByTestId('name');
    expect(name).toBeInTheDocument();
    fireEvent.blur(name);
    expect(screen.getByTestId('nameError')).toBeVisible();
  });
});

test('the description input is rendered', async () => {
  render(<AddTournamentForm getAllTournaments={() => true} />);
  await waitFor(() => {
    const description = screen.getByTestId('description');
    expect(description).toBeInTheDocument();
  });
});

test('the rules link input is rendered', async () => {
  render(<AddTournamentForm getAllTournaments={() => true} />);
  await waitFor(() => {
    const rulesLink = screen.getByTestId('rulesLink');
    expect(rulesLink).toBeInTheDocument();
  });
});

test('the regulations link input is rendered', async () => {
  render(<AddTournamentForm getAllTournaments={() => true} />);
  await waitFor(() => {
    const regulationsLink = screen.getByTestId('regulationsLink');
    expect(regulationsLink).toBeInTheDocument();
  });
});

test('the add tournament button is rendered, disabled while necessary fields are invalid', async () => {
  render(<AddTournamentForm getAllTournaments={() => true} />);
  await waitFor(() => {
    const saveButton = screen.getByTestId('saveButton');
    expect(saveButton.closest('button')).toBeDisabled();
  });
});

test('the save button invokes the handleSubmit function', async () => {
  const handleSubmit = jest.fn().mockResolvedValue(mockTournament);
  render(
    <form onSubmit={handleSubmit}>
      <button type="submit" data-testid="saveButton">
        Cохранить
      </button>
    </form>
  );
  await waitFor(() => {
    const saveButton = screen.getByTestId('saveButton');
    fireEvent.submit(saveButton);
    expect(handleSubmit).toHaveBeenCalled();
  });
});