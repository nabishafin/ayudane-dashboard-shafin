"use client";

import React, { useState } from "react";
import { Eye, Trash2, X, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([
    {
      id: "12345678",
      userName: "Rosey",
      providerName: "XYZ",
      amount: "$280",
      date: "01-24-2024",
      accountNumber: "**** **** **** 1645",
      accountHolder: "Rosey",
    },
    {
      id: "12345679",
      userName: "Rosey",
      providerName: "John Doe",
      amount: "$250",
      date: "16 Apr 2024",
      accountNumber: "**** **** **** 1645",
      accountHolder: "Rosey",
    },
    {
      id: "12345680",
      userName: "Rosey",
      providerName: "John Doe",
      amount: "$250",
      date: "16 Apr 2024",
      accountNumber: "**** **** **** 1645",
      accountHolder: "Rosey",
    },
    {
      id: "12345681",
      userName: "Rosey",
      providerName: "John Doe",
      amount: "$250",
      date: "16 Apr 2024",
      accountNumber: "**** **** **** 1645",
      accountHolder: "Rosey",
    },
    {
      id: "12345682",
      userName: "Rosey",
      providerName: "John Doe",
      amount: "$250",
      date: "16 Apr 2024",
      accountNumber: "**** **** **** 1645",
      accountHolder: "Rosey",
    },
  ]);

  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [viewDialog, setViewDialog] = useState({
    open: false,
    transaction: null,
  });

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    setDeleteDialog({ open: false, id: null });
  };

  const handleView = (transaction) => {
    setViewDialog({ open: true, transaction });
  };

  const handleDownload = () => {
    alert("Downloading transaction details...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm mt-5">
      {/* Header Section - OverviewDataTableSection এর style অনুযায়ী */}

      {/* Table Section */}
      <div className="border rounded-b-lg overflow-hidden rounded-t-lg">
        <Table>
          <TableHeader className="text-white bg-[#1C5941]">
            <TableRow className="hover:bg-[#1C5941]">
              <TableHead className="text-center text-white hover:bg-[#1C5941] text-xs">
                #Tr.ID
              </TableHead>
              <TableHead className="text-center text-white hover:bg-[#1C5941] text-xs">
                User Name
              </TableHead>
              <TableHead className="text-center text-white hover:bg-[#1C5941] text-xs">
                Provider Name
              </TableHead>
              <TableHead className="text-center text-white hover:bg-[#1C5941] text-xs">
                Amount
              </TableHead>
              <TableHead className="text-center text-white hover:bg-[#1C5941] text-xs">
                Date
              </TableHead>
              <TableHead className="text-center text-white hover:bg-[#1C5941] text-xs">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-gray-50">
                <TableCell className="text-center text-sm">
                  {transaction.id}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {transaction.userName}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {transaction.providerName}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {transaction.amount}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {transaction.date}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(transaction)}
                      className="h-8 w-8 text-[#1C5941] hover:text-[#1C5941] hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setDeleteDialog({ open: true, id: transaction.id })
                      }
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, id: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(deleteDialog.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Transaction Dialog */}
      <Dialog
        open={viewDialog.open}
        onOpenChange={(open) => setViewDialog({ open, transaction: null })}
      >
        <DialogContent className="sm:max-w-md bg-gradient-to-b from-blue-50 to-white">
          <button
            onClick={() => setViewDialog({ open: false, transaction: null })}
            className="absolute right-4 top-4 rounded-full bg-red-600 text-white p-1.5 hover:bg-red-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Transaction Details
            </DialogTitle>
          </DialogHeader>

          {viewDialog.transaction && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm">Transaction ID :</span>
                <span className="font-medium text-gray-800">
                  #{viewDialog.transaction.id}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="text-gray-600 text-sm">Date :</span>
                <span className="font-medium text-gray-800">
                  {viewDialog.transaction.date}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="text-gray-600 text-sm">User name :</span>
                <span className="font-medium text-gray-800">
                  {viewDialog.transaction.userName}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="text-gray-600 text-sm">A/C number :</span>
                <span className="font-medium text-gray-800">
                  {viewDialog.transaction.accountNumber}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="text-gray-600 text-sm">A/C holder name :</span>
                <span className="font-medium text-gray-800">
                  {viewDialog.transaction.accountHolder}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="text-gray-600 text-sm">
                  Transaction amount :
                </span>
                <span className="font-semibold text-gray-800">
                  {viewDialog.transaction.amount}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-t">
                <span className="text-gray-600 text-sm">Provider name :</span>
                <span className="font-medium text-gray-800">
                  {viewDialog.transaction.providerName}
                </span>
              </div>

              <div className="flex gap-3 pt-6">
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={handlePrint}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
