import { useGetAnalyticsQuery } from '../../../shared/api';

export default function Dashboard() {
  const { data, error, isLoading } = useGetAnalyticsQuery('12345');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Replay Analytics</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading analytics</p>}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl">Farm Efficiency</h2>
            <p>{data.farmEfficiency}%</p>
          </div>
          <div>
            <h2 className="text-xl">Vision Score</h2>
            <p>{data.visionScore}/100</p>
          </div>
        </div>
      )}
    </div>
  );
}
