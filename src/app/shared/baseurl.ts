import { environment } from '../../environments/environment';

export const fbUrl = () => {
  let url: string;
  if (url = localStorage.getItem('fbUrl')) {
    return url;
  }
  return environment.FbDbUrl;
};
