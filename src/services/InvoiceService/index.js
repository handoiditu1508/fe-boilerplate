import axios from "axios";

class InvoiceService {
  constructor(){
    this.client = axios.create({
      baseURL: "http://localhost:3001/api",
      timeout: 5000
    })
  }

  async getInvoices() {
    const response = await this.client.get("/invoices");
    return response.data;
  }

  async getInvoice(id) {
    const response = await this.client.get(`/invoices/${id}`);
    return response.data;
  }

  async deleteInvoice(id) {
    await this.client.delete(`/invoices/${id}`);
  }
}

export default new InvoiceService();