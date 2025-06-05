import axios from 'axios';
import { CharacterResponse, Character } from '@/types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page: number = 1, filters?: { status?: string; species?: string; gender?: string }) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      ...filters,
    }).toString();

    const url = params ? `${BASE_URL}/character?${params}` : `${BASE_URL}/character`;
    const response = await axios.get<CharacterResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/character/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    throw error;
  }
};

export const getManyCharacters = async (minCount = 250) => {
  let all: Character[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    const response = await getCharacters(page);
    all = all.concat(response.results);
    totalPages = response.info.pages;
    page++;
  } while (all.length < minCount && page <= totalPages);
  return all.slice(0, minCount);
}; 