import { API_SERVER, HEADERS } from '../config/api';

export default class DeliveryService {
    path = 'deliveries.php';

    // Get list of deliveries
    async getDeliveries() {
      const response = await fetch(`${API_SERVER}${this.path}`, {
        headers: HEADERS
      });

      return await response.json();
    };

    // Get delivery detail
    async getDelivery({ id }: any) {
      const response = await fetch(`${API_SERVER}${this.path}?id=${id}`, {
        headers: HEADERS
      });

      return await response.json();
    };

    // Create new delivery
    async newDelivery({ date, name, driver_id }: any) {
      const response = await fetch(`${API_SERVER}${this.path}`,
        {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify({ date, name, driver_id })
        }
      );

      return await response.json();
    }

    // Update delivery
    async updateDelivery({ id, payload }: any) {
      const { date, name, driver_id } = payload;

      const response = await fetch(`${API_SERVER}${this.path}?id=${id}`,
        {
          method: 'PUT',
          headers: HEADERS,
          body: JSON.stringify({ date, name, driver_id })
        }
      );

      return await response.json();
    }

    // Delete delivery
    async deleteDelivery({ id, payload }: any) {
      const response = await fetch(`${API_SERVER}${this.path}?id=${id}`,
        {
          method: 'DELETE',
          headers: HEADERS
        }
      );

      return await response.json();
    }
};
