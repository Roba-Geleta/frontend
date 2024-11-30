export type PortfolioGet = {
  id: number;
  symbol: string;
  companyName: string;
  currentPrice: number;
  exchangeShortName: string;
  purchasePrice: number;
  stockExchange: string;
  stockId: string;
  favourite: boolean;
};

export type PortfolioPost = {
  symbol: string;
};

export type PortfolioDelete = {
  symbol: string;
};

export interface PortfolioPut {
  symbol: string;
  favourite?: boolean;
  purchasePrice?: number;
}
