const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class ApiService {
  private getHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async get(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async delete(endpoint: string) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders()
    });
    return response.json();
  }
}

export const api = new ApiService();
