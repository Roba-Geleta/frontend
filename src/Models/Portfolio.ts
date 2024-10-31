export type PortfolioGet = {
  id: number;
  symbol: string;
  companyName: string;
  purchase: number;
  lastDiv: number;
  industry: string;
  marketCap: number;
  comments: unknown;
};

export type PortfolioPost = {
  symbol: string;
};
