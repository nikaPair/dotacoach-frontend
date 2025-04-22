import { useGetHeroesQuery } from '../../../shared/api';

export const useHeroes = () => {
  const { data: heroesData, isLoading, error } = useGetHeroesQuery();
  
  const getHeroName = (heroId: number): string => {
    if (!heroesData || !heroesData[heroId]) {
      return `Герой ${heroId}`;
    }
    return heroesData[heroId].name;
  };
  
  const getHeroIcon = (heroId: number): string | undefined => {
    return heroesData?.[heroId]?.icon;
  };
  
  const getHeroImage = (heroId: number): string | undefined => {
    return heroesData?.[heroId]?.img;
  };
  
  return {
    heroesData,
    isLoading,
    error,
    getHeroName,
    getHeroIcon,
    getHeroImage
  };
}; 