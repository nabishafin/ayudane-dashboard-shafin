"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// 🔹 Fake API simulation
const fetchTransactions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 45 }).map((_, i) => ({
          id: `${10000000 + i}`,
          userName: ["Rokey", "Sakib", "Halima", "Sonia", "Nabil"][i % 5],
          providerName: ["John Doe", "David", "Sarah", "Ayman", "Tuhin"][i % 5],
          amount: `$${(Math.random() * 500).toFixed(2)}`,
          date: `${10 + (i % 20)} Sep 2025`,
          acNumber: `**** **** **** ${(5000 + i).toString().slice(-4)}`,
          acHolderName: ["Rokey", "Sakib", "Halima", "Sonia", "Nabil"][i % 5],
        }))
      );
    }, 400);
  });
};

export function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchProvider, setSearchProvider] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 8;

  // 🔹 Fetch data dynamically
  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data);
      setFilteredData(data);
    });
  }, []);

  // 🔹 Filter search results
  const handleSearch = () => {
    const filtered = transactions.filter((t) => {
      return (
        t.userName.toLowerCase().includes(searchUser.toLowerCase()) &&
        t.providerName.toLowerCase().includes(searchProvider.toLowerCase()) &&
        t.date.toLowerCase().includes(searchDate.toLowerCase())
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // 🔹 View transaction details
  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // 🔹 Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  // 🔹 Pagination slice
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIdx, startIdx + itemsPerPage);

  // 🔹 Generate visible page numbers
  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).slice(0, 5);

  return (
    <Card className="mt-5">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl font-semibold">
            Recent Transactions
          </CardTitle>

          {/* Search Fields */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="w-32 pr-8"
              />
              <Calendar className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="User Name"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="w-32"
            />
            <Input
              type="text"
              placeholder="Provider Name"
              value={searchProvider}
              onChange={(e) => setSearchProvider(e.target.value)}
              className="w-36"
            />
            <Button
              size="icon"
              onClick={handleSearch}
              className="bg-[#1C5941] hover:bg-[#174a36]"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#1C5941] hover:bg-[#1C5941]">
                <TableHead className="text-white font-semibold text-center">
                  #Tr. ID
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  User Name
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  Provider Name
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  Amount
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  Date
                </TableHead>
                <TableHead className="text-white font-semibold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((transaction, index) => (
                  <TableRow
                    key={transaction.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-white"}
                  >
                    <TableCell className="font-medium text-center">
                      #{transaction.id}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.userName}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.providerName}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.amount}
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.date}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1">
                        {/* Eye Icon for View Details */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#1C5941]  "
                          onClick={() => handleViewDetails(transaction)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* Delete Icon */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan="6"
                    className="text-center py-6 text-gray-500"
                  >
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Transaction Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-sm bg-[#f5f5f0]">
            <DialogHeader className="relative pb-4 border-b border-gray-300">
              <DialogTitle className="text-center text-base font-medium">
                Transaction Details
              </DialogTitle>
            </DialogHeader>

            {selectedTransaction && (
              <div className="space-y-3 py-4">
                {/* Transaction ID */}
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <p className="text-sm text-gray-600">Transaction ID :</p>
                  <p className="text-sm font-medium">
                    #{selectedTransaction.id}
                  </p>
                </div>

                {/* Date */}
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <p className="text-sm text-gray-600">Date :</p>
                  <p className="text-sm font-medium">
                    {selectedTransaction.date}
                  </p>
                </div>

                {/* User Name */}
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <p className="text-sm text-gray-600">User name :</p>
                  <p className="text-sm font-medium">
                    {selectedTransaction.userName}
                  </p>
                </div>

                {/* A/C Number */}
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <p className="text-sm text-gray-600">A/C number :</p>
                  <p className="text-sm font-medium">
                    {selectedTransaction.acNumber}
                  </p>
                </div>

                {/* A/C Holder Name */}
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <p className="text-sm text-gray-600">A/C holder name :</p>
                  <p className="text-sm font-medium">
                    {selectedTransaction.acHolderName}
                  </p>
                </div>

                {/* Transaction Amount */}
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <p className="text-sm text-gray-600">Transaction amount :</p>
                  <p className="text-sm font-semibold">
                    {selectedTransaction.amount}
                  </p>
                </div>

                {/* Provider Name */}
                <div className="flex justify-between items-center py-2 border-b border-gray-300">
                  <p className="text-sm text-gray-600">Provider name :</p>
                  <p className="text-sm font-medium">
                    {selectedTransaction.providerName}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#1C5941] text-[#1C5941] hover:bg-gray-100"
                    onClick={handleCloseModal}
                  >
                    Download
                  </Button>
                  <Button className="flex-1 bg-[#1C5941] hover:bg-[#174a36] text-white">
                    Print
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* ✅ Dynamic Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>

            {visiblePages.map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-[#1C5941] hover:bg-[#1C5941]"
                    : "hover:bg-gray-100"
                }
              >
                {page}
              </Button>
            ))}

            {totalPages > 5 && (
              <span className="px-2 text-muted-foreground">...</span>
            )}

            {totalPages > 5 && (
              <Button
                variant={currentPage === totalPages ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                className={
                  currentPage === totalPages
                    ? "bg-[#1C5941] hover:bg-[#1C5941]"
                    : "hover:bg-gray-100"
                }
              >
                {totalPages}
              </Button>
            )}

            <Button
              variant="default"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="bg-[#1C5941] hover:bg-[#1C5941]"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
