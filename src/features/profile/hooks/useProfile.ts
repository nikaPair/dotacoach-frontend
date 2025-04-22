import {
  useGetProfileQuery,
  useGetPlayerStatsQuery,
} from '../../../shared/api';

export const useProfile = () => {
  const profileQuery = useGetProfileQuery();

  const steamId = profileQuery.data?.user?.steamId || '';

  const statsQuery = useGetPlayerStatsQuery(steamId, {
    skip: !steamId,
  });

  return {
    user: profileQuery.data?.user,
    stats: statsQuery.data?.stats,
    recentMatches: statsQuery.data?.recentMatches || [],

    isLoading: profileQuery.isLoading || (steamId && statsQuery.isLoading),
    isStatsLoading: statsQuery.isLoading,

    error: profileQuery.error,
    statsError: statsQuery.error,

    hasStatsData: Boolean(statsQuery.data),
    hasMatches: Boolean(statsQuery.data?.recentMatches?.length),
  };
};
