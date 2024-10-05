const API_KEY = "b5012636c81dde3475ff4c99dba14ec9";

export type Observation = {
  date: string;
  value: string;
};

export type Series = {
  observation_end: string;
  popularity: number;
};

export const getSeriesObservations = async (): Promise<Observation[]> => {
  const response =
    await fetch(`/api/fred/series/observations?series_id=GNPCA&api_key=${API_KEY}&file_type=json
`);

  const data = await response.json();
  return data.observations;
};

export const searchSeries = async (searchText: string): Promise<Series[]> => {
  const response =
    await fetch(`/api/fred/series/search?search_text=${searchText}&api_key=${API_KEY}&file_type=json
`);
  const data = await response.json();
  return data.seriess;
};
