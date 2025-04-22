import {
  useGetProfileQuery,
  useGetPlayerStatsQuery,
} from '../../../shared/api';

export const useProfile = () => {
  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useGetProfileQuery();
  const steamId = profileData?.user?.steamId;

  const { 
    data: statsData, 
    isLoading: isStatsLoading, 
    error: statsError 
  } = useGetPlayerStatsQuery(steamId || '', {
    skip: !steamId,
  });

  return {
    user: profileData?.user,
    stats: statsData?.stats,
    recentMatches: statsData?.recentMatches || [],
    isLoading: isProfileLoading || (steamId && isStatsLoading),
    isStatsLoading,
    error: profileError,
    statsError,
    hasStatsData: Boolean(statsData),
    hasMatches: Boolean(statsData?.recentMatches?.length),
  };
};
