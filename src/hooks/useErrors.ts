import { useAppSelector } from "@/app/hooks";

const useErrors = () => {
  const error = useAppSelector((state) => state.weather.error);

  return { error };
};

export default useErrors;
