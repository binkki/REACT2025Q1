import React from 'react';
import { MainPage } from '../src/components/MainPage';
import { getCards, getDetails } from './api/rickApi';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; search: string; details: string }>;
}) {
  const { page, search, details } = await searchParams;
  const cardsData = await getCards(page, search);
  const detailsData = details ? await getDetails(details) : undefined;

  return (
    <MainPage
      cardsData={cardsData}
      detailsData={detailsData}
      page={page}
      searchTerm={search}
      detailsId={details}
    />
  );
}
