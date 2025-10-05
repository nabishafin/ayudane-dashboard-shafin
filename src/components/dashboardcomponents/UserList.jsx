"use client";

import { useState } from "react";
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

// Generate fake user data
const generateUsers = () => {
  const names = [
    "Rokey",
    "Sakib",
    "Halima",
    "Sonia",
    "Nabil",
    "Tuhin",
    "Ayman",
    "Sarah",
    "David",
    "John",
  ];
  const emails = [
    "fzaaaa@gmail.com",
    "dric@gmail.com",
    "ziar@gmail.com",
    "xeno@yandex.ru",
    "zhks@mail.ru",
    "bertou@yandex.ru",
    "rrlan@yandex.ru",
    "hamil@gmail.com",
    "xterris@gmail.com",
    "abc@gmail.com",
  ];

  return Array.from({ length: 150 }).map((_, i) => ({
    id: i + 1,
    userName: names[i % names.length],
    email: emails[i % emails.length],
    number: `(+33)${Math.floor(Math.random() * 90 + 10)} ${Math.floor(
      Math.random() * 90 + 10
    )} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(
      Math.random() * 90 + 10
    )}`,
    date: `${Math.floor(Math.random() * 28 + 1)} Apr 2024`,
    address: `South Dakota ${83400 + i}`,
    joiningDate: `${Math.floor(Math.random() * 28 + 1)} Jun 2025`,
  }));
};

export default function UserList() {
  const [users] = useState(generateUsers());
  const [filteredData, setFilteredData] = useState(users);
  const [searchDate, setSearchDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 8;

  // Filter search results
  const handleSearch = () => {
    const filtered = users.filter((user) => {
      return (
        user.userName.toLowerCase().includes(searchName.toLowerCase()) &&
        user.date.toLowerCase().includes(searchDate.toLowerCase())
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // View user details
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIdx, startIdx + itemsPerPage);

  // Generate visible page numbers (show current ±1 pages)
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-5">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">
              User List
            </CardTitle>

            {/* Search Fields */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="w-32 pr-8 border-gray-300"
                />
                <Calendar className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="User Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-40 border-gray-300"
              />
              <Button
                className="bg-[#165039]"
                size="icon"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 " />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#165039] hover:bg-[#165039]">
                  <TableHead className="text-white font-semibold text-center">
                    #SI
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center">
                    User Name
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center">
                    Email
                  </TableHead>
                  <TableHead className="text-white font-semibold text-center">
                    Number
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
                  currentItems.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className={index % 2 === 0 ? "" : "bg-white"}
                    >
                      <TableCell className="text-center font-medium">
                        {startIdx + index + 1}
                      </TableCell>
                      <TableCell className="text-center">
                        {user.userName}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {user.number}
                      </TableCell>
                      <TableCell className="text-center">{user.date}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#165039] hover:text-[#165039] hover:bg-blue-50"
                            onClick={() => handleViewDetails(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
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
                      className="text-center py-8 text-gray-500"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* User Details Modal */}
          <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-lg bg-[#f5f5f0] border-4">
              <DialogHeader className="relative pb-4">
                <DialogTitle className="text-center text-lg font-semibold text-gray-800">
                  User Details
                </DialogTitle>
              </DialogHeader>

              {selectedUser && (
                <div className="space-y-0 py-4">
                  <div className="flex justify-between items-center py-4 border-b-2">
                    <p className="text-sm font-medium text-gray-700">
                      User name :
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.userName}
                    </p>
                  </div>

                  <div className="flex justify-between items-center py-4 border-b-2">
                    <p className="text-sm font-medium text-gray-700">Email :</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.email}
                    </p>
                  </div>

                  <div className="flex justify-between items-center py-4 border-b-2">
                    <p className="text-sm font-medium text-gray-700">
                      Phone Number
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.number}
                    </p>
                  </div>

                  <div className="flex justify-between items-center py-4 border-b-2">
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.address}
                    </p>
                  </div>

                  <div className="flex justify-between items-center py-4">
                    <p className="text-sm font-medium text-gray-700">
                      Joining Date
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedUser.joiningDate}
                    </p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Pagination */}
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
    </div>
  );
}
