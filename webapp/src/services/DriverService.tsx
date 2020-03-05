import { API_SERVER, HEADERS } from '../config/api';

export default class DriverService {
    path = 'drivers.php';

    // Get list of drivers
    async getDrivers() {
      const response = await fetch(`${API_SERVER}${this.path}`, {
        headers: HEADERS
      });

      return await response.json();
    };

    // Get driver detail
    async getDriver({ id }: any) {
      const response = await fetch(`${API_SERVER}${this.path}?id=${id}`, {
        headers: HEADERS
      });

      return await response.json();
    };
};
