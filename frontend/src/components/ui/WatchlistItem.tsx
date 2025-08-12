interface WatchlistItemProps {
  id: number;
}

export default function WatchlistItem({ id }: WatchlistItemProps) {
  return <li>{id}</li>;
}
