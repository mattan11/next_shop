export interface RatingProps {
  rate: number;
  count: number;
}

export const Rating = ({ rating }: { rating: RatingProps }) => {
  return <div className="text-blue-500 font-bold px-4">{rating.rate}</div>;
};
