import { LoanModel } from '../models/loanModel.js';

export const LoanController = {
  async createLoan(req, res) {
    const { book_id, member_id, due_date } = req.body;
    try {
      const loan = await LoanModel.createLoan(book_id, member_id, due_date);
      res.status(201).json({ message: "Peminjaman berhasil dicatat!", data: loan });
    } catch (err) {
      res.status(400).json({ error: err.message || "Gagal" });
    }
  },

  async getLoans(req, res) {
    try {
      const loans = await LoanModel.getAllLoans();
      res.json(loans);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // TUGAS: Pesan disamakan dengan kating
  async getTopBorrowers(req, res) {
    try {
      const topBorrowers = await LoanModel.getTopBorrowers();
      res.status(200).json({
        message: "Top 3 peminjam buku berhasil diambil", // Sama persis sama gambar kating
        data: topBorrowers
      });
    } catch (err) {
      // Biar nggak error "" lagi, kita kasih pesan default kalau err.message kosong
      res.status(500).json({ error: err.message || "Terjadi kesalahan pada server" });
    }
  }
};